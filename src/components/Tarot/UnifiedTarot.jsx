import { useState, useRef, useCallback, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import css from './Tarot.module.scss'
import { staggerChildren, fadeIn } from '../../utils/motion'
import useTarotDeck from './hooks/useTarotDeck'
import useReading from './hooks/useReading'
import useConversation from './hooks/useConversation'
import { SPREAD_PRESETS } from './data/spreadPresets'
import ModeToggle from './ModeToggle'
import SpreadSelector from './SpreadSelector'
import DeckView from './DeckView'
import Spread from './Spread'
import InterpretationDisplay from './InterpretationDisplay'
import ConversationHistory from './ConversationHistory'
import LoadingIndicator from './LoadingIndicator'
import Tooltip from './Tooltip'
import { analytics, ANALYTICS_EVENTS } from '../../utils/analytics'

const getInitialTextSize = () => {
  try {
    return sessionStorage.getItem('tarot-large-text') === 'true'
  } catch {
    return false
  }
}

const UnifiedTarot = () => {
  const wrapperRef = useRef(null)
  const [searchParams, setSearchParams] = useSearchParams()

  // Mode state with URL param support
  const [mode, setMode] = useState(() => {
    return searchParams.get('mode') === 'ai' ? 'ai' : 'classic'
  })
  const [selectedSpread, setSelectedSpread] = useState('three')
  const [question, setQuestion] = useState('')
  const [largeText, setLargeText] = useState(getInitialTextSize)
  const [error, setError] = useState(null)

  const {
    drawnCards,
    resetAndDraw,
    resetDeck,
    drawCard,
    remainingCount,
    isShuffling
  } = useTarotDeck()

  const {
    interpretation: classicInterpretation,
    isGenerating: classicGenerating,
    analyze,
    clearInterpretation
  } = useReading()

  const {
    turns,
    currentCards,
    isLoading: aiLoading,
    error: aiError,
    submitQuestion,
    retryLastInterpretation
  } = useConversation({ resetAndDraw })

  // Sync mode to URL
  useEffect(() => {
    const currentMode = searchParams.get('mode')
    if (mode === 'ai' && currentMode !== 'ai') {
      setSearchParams({ mode: 'ai' }, { replace: true })
    } else if (mode === 'classic' && currentMode === 'ai') {
      setSearchParams({}, { replace: true })
    }
  }, [mode, searchParams, setSearchParams])

  const scrollToTop = () => {
    wrapperRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const toggleTextSize = useCallback(() => {
    setLargeText(prev => {
      const next = !prev
      try { sessionStorage.setItem('tarot-large-text', String(next)) } catch {}
      return next
    })
  }, [])

  const handleModeChange = (newMode) => {
    setMode(newMode)
    analytics.trackEvent(ANALYTICS_EVENTS.TAROT_MODE_CHANGED, { mode: newMode })
  }

  const handleDraw = async () => {
    const preset = SPREAD_PRESETS[selectedSpread]
    setError(null)

    analytics.trackEvent(ANALYTICS_EVENTS.TAROT_READING_STARTED, {
      mode,
      spread: selectedSpread
    })

    if (mode === 'classic') {
      clearInterpretation()
      const newCards = resetAndDraw(preset.cardCount)
      analyze(newCards, preset, question)
      analytics.trackEvent(ANALYTICS_EVENTS.TAROT_READING_GENERATED, {
        mode: 'classic',
        spread: selectedSpread
      })
      scrollToTop()
    } else {
      // AI mode
      try {
        await submitQuestion(question || 'Please interpret these cards.', preset)
        analytics.trackEvent(ANALYTICS_EVENTS.TAROT_READING_GENERATED, {
          mode: 'ai',
          spread: selectedSpread
        })
      } catch (err) {
        setError(err.message)
      }
      scrollToTop()
    }
  }

  const handleFollowUp = async (followUpText) => {
    if (!followUpText.trim()) return
    analytics.trackEvent(ANALYTICS_EVENTS.FOLLOW_UP_QUESTION_ASKED)
    const preset = SPREAD_PRESETS[selectedSpread]
    await submitQuestion(followUpText, preset)
  }

  const handleReset = () => {
    resetDeck()
    clearInterpretation()
    setQuestion('')
    setError(null)
    scrollToTop()
  }

  const handleQuestionKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleDraw()
    }
  }

  const isLoading = mode === 'classic' ? classicGenerating : aiLoading
  const hasReading = mode === 'classic'
    ? classicInterpretation !== null
    : turns.length > 0
  const displayError = error || aiError

  // Get the latest AI interpretation from the last turn
  const aiInterpretation = turns.length > 0 ? turns[turns.length - 1].interpretation : null

  return (
    <motion.section
      ref={wrapperRef}
      className={css.wrapper}
      variants={staggerChildren}
      initial="hidden"
      whileInView="show"
    >
      <div className={`${css.container} ${largeText ? css.largeText : ''}`}>
        <motion.div className={css.header} variants={fadeIn('up', 'tween', 0, 0.5)}>
          <h1 className={css.title}>TAROT</h1>
          <p className={css.subtitle}>Draw cards for reflection and insight.</p>
        </motion.div>

        <ModeToggle mode={mode} onModeChange={handleModeChange} />
        <SpreadSelector selectedSpread={selectedSpread} onSpreadChange={setSelectedSpread} />

        {/* Question Input */}
        <div className={css.questionArea}>
          <div className={css.inputWrapper}>
            <textarea
              rows={1}
              placeholder={mode === 'ai' ? 'Ask a question for your AI reading...' : 'What would you like to reflect on? (optional)'}
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              onKeyDown={handleQuestionKeyDown}
              aria-label="Tarot question input"
            />
          </div>
          <div className={css.analyzeWrapper}>
            <button
              onClick={handleDraw}
              disabled={isLoading || isShuffling}
              className={css.drawBtn}
            >
              {isLoading ? 'Drawing...' : 'Draw Cards'}
            </button>
            <Tooltip text="Clear everything and start over">
              <button className={css.resetBtn} onClick={handleReset} disabled={isLoading}>
                Reset
              </button>
            </Tooltip>
          </div>
        </div>

        {/* Text Size Toggle */}
        <div className={css.textSizeToggle}>
          <Tooltip text={largeText ? 'Switch to normal text' : 'Switch to large text'}>
            <button onClick={toggleTextSize} aria-label="Toggle text size">
              {largeText ? 'Aa' : 'AA'}
            </button>
          </Tooltip>
        </div>

        {/* Drawn cards message */}
        {drawnCards.length > 0 && mode === 'classic' && (
          <p className={css.pulledMessage}>
            ✨ {drawnCards.length} card{drawnCards.length > 1 ? 's' : ''} drawn{question ? ` for "${question}"` : ''}. Trust what resonates.
          </p>
        )}

        {/* Card display */}
        {mode === 'classic' && drawnCards.length > 0 && (
          <Spread drawnCards={drawnCards} spreadPreset={SPREAD_PRESETS[selectedSpread]} />
        )}

        {/* Clickable deck */}
        <DeckView
          remainingCount={remainingCount}
          onDraw={drawCard}
          isEmpty={remainingCount === 0}
        />

        {/* AI mode: current cards being interpreted */}
        {mode === 'ai' && currentCards.length > 0 && aiLoading && (
          <div>
            <Spread drawnCards={currentCards} spreadPreset={SPREAD_PRESETS[selectedSpread]} />
            <LoadingIndicator />
          </div>
        )}

        {/* Classic interpretation */}
        {mode === 'classic' && (
          <InterpretationDisplay
            interpretation={classicInterpretation}
            isAI={false}
            isLoading={classicGenerating}
          />
        )}

        {/* AI interpretation - show latest turn */}
        {mode === 'ai' && aiInterpretation && !aiLoading && (
          <>
            <Spread
              drawnCards={turns[turns.length - 1].cards}
              spreadPreset={turns[turns.length - 1].spreadPreset}
            />
            <InterpretationDisplay
              interpretation={aiInterpretation}
              isAI={true}
              isLoading={false}
            />
          </>
        )}

        {/* Conversation History (AI mode, previous turns) */}
        {mode === 'ai' && turns.length > 1 && (
          <ConversationHistory turns={turns.slice(0, -1)} />
        )}

        {/* Follow-up input in AI mode */}
        {mode === 'ai' && turns.length > 0 && !aiLoading && (
          <div className={css.questionArea}>
            <div className={css.inputWrapper}>
              <textarea
                rows={1}
                placeholder="Ask a follow-up question..."
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault()
                    handleFollowUp(question)
                    setQuestion('')
                  }
                }}
                aria-label="Follow-up question input"
              />
            </div>
            <div className={css.analyzeWrapper}>
              <button
                onClick={() => { handleFollowUp(question); setQuestion('') }}
                disabled={aiLoading || !question.trim()}
              >
                Ask Follow-up
              </button>
            </div>
          </div>
        )}

        {/* Error display */}
        {displayError && (
          <div className={css.convError}>
            <p>{displayError}</p>
            {mode === 'ai' && (
              <button onClick={retryLastInterpretation}>Retry</button>
            )}
          </div>
        )}
      </div>
    </motion.section>
  )
}

export default UnifiedTarot
