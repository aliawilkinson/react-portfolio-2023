import { useState, useRef, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import css from './Tarot.module.scss'
import { staggerChildren, fadeIn } from '../../utils/motion'
import useTarotDeck from './hooks/useTarotDeck'
import useReading from './hooks/useReading'
import { SPREAD_PRESETS } from './data/spreadPresets'
import QuestionInput from './QuestionInput'
import DeckView from './DeckView'
import Spread from './Spread'
import Controls from './Controls'
import Interpretation from './Interpretation'
import { analytics, ANALYTICS_EVENTS } from '../../utils/analytics'

const getInitialTextSize = () => {
  try {
    return sessionStorage.getItem('tarot-large-text') === 'true'
  } catch {
    return false
  }
}

const Tarot = () => {
  const wrapperRef = useRef(null)

  const {
    drawnCards,
    isShuffling,
    drawCard,
    drawMultiple,
    shuffleDeck,
    resetDeck,
    resetAndDraw,
    remainingCount
  } = useTarotDeck()

  const {
    question,
    setQuestion,
    interpretation,
    isGenerating,
    analyze,
    clearInterpretation
  } = useReading()

  const [activePreset, setActivePreset] = useState(null)
  const [largeText, setLargeText] = useState(getInitialTextSize)

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

  // Analyze always produces a fresh reading
  const handleAnalyze = () => {
    clearInterpretation()
    setActivePreset(null)
    const newCards = resetAndDraw(3)
    analytics.trackEvent(ANALYTICS_EVENTS.TAROT_READING_STARTED)
    analyze(newCards, question)
    analytics.trackEvent(ANALYTICS_EVENTS.TAROT_READING_GENERATED)
  }

  // Enter with a question — same as Analyze (fresh 3-card reading)
  const handleSubmitQuestion = () => {
    clearInterpretation()
    setActivePreset(null)
    const newCards = resetAndDraw(3)
    analytics.trackEvent(ANALYTICS_EVENTS.TAROT_READING_STARTED)
    analyze(newCards, question)
    analytics.trackEvent(ANALYTICS_EVENTS.TAROT_READING_GENERATED)
  }

  // Reset clears everything including the question field
  const handleReset = () => {
    resetDeck()
    clearInterpretation()
    setActivePreset(null)
    setQuestion('')
    scrollToTop()
  }

  const handleDraw = () => {
    setActivePreset(null)
    drawCard()
  }

  const handleAutoMode = (count) => {
    clearInterpretation()
    setActivePreset(null)
    const newCards = resetAndDraw(count)
    analytics.trackEvent(ANALYTICS_EVENTS.TAROT_READING_STARTED)
    analyze(newCards, question)
    analytics.trackEvent(ANALYTICS_EVENTS.TAROT_READING_GENERATED)
    scrollToTop()
  }

  const handlePreset = (presetKey) => {
    const preset = SPREAD_PRESETS[presetKey]
    if (!preset) return
    clearInterpretation()
    setActivePreset(preset)
    const newCards = resetAndDraw(preset.cardCount)
    analytics.trackEvent(ANALYTICS_EVENTS.TAROT_READING_STARTED)
    analyze(newCards, question)
    analytics.trackEvent(ANALYTICS_EVENTS.TAROT_READING_GENERATED)
    scrollToTop()
  }

  const handleShuffle = () => {
    shuffleDeck()
    scrollToTop()
  }

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
          <p className={css.subtitle}>Ask a question for reflection or draw cards.</p>
          <Link to="/conversation" className={css.convModeBtn} title="Start an ongoing tarot conversation. Draw fresh cards for each question and receive AI-powered interpretations.">
            Conversation Mode
          </Link>
        </motion.div>

        <QuestionInput
          question={question}
          onQuestionChange={setQuestion}
          onAnalyze={handleAnalyze}
          onSubmitQuestion={handleSubmitQuestion}
          onReset={handleReset}
        />
        {drawnCards.length > 0 && (
          <p className={css.pulledMessage}>
            ✨ {drawnCards.length} card{drawnCards.length > 1 ? 's' : ''} drawn{question ? ` for "${question}"` : ''}. Trust what resonates.
          </p>
        )}
        <Spread drawnCards={drawnCards} spreadPreset={activePreset} />
        <DeckView
          remainingCount={remainingCount}
          onDraw={handleDraw}
          isEmpty={remainingCount === 0}
        />
        <Controls
          onReset={handleReset}
          onShuffle={handleShuffle}
          onAutoMode={handleAutoMode}
          onPreset={handlePreset}
          isShuffling={isShuffling}
          hasDrawnCards={drawnCards.length > 0}
          largeText={largeText}
          onToggleTextSize={toggleTextSize}
        />
        <Interpretation reading={interpretation} isGenerating={isGenerating} />
      </div>
    </motion.section>
  )
}

export default Tarot
