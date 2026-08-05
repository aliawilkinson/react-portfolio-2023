import { useState, useRef } from 'react'
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
  const [largeText, setLargeText] = useState(false)

  const scrollToTop = () => {
    wrapperRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const handleAnalyze = () => {
    if (drawnCards.length === 0) {
      const newCards = drawMultiple(3)
      analyze(newCards, question)
    } else {
      analyze(drawnCards, question)
    }
  }

  const handleSubmitQuestion = () => {
    clearInterpretation()
    setActivePreset(null)
    const newCards = resetAndDraw(3)
    analyze(newCards, question)
  }

  const handleReset = () => {
    resetDeck()
    clearInterpretation()
    setActivePreset(null)
    scrollToTop()
  }

  const handleDraw = () => {
    setActivePreset(null)
    drawCard()
  }

  const handleAutoMode = (count) => {
    resetDeck()
    clearInterpretation()
    setActivePreset(null)
    const newCards = drawMultiple(count)
    analyze(newCards, question)
    scrollToTop()
  }

  const handlePreset = (presetKey) => {
    const preset = SPREAD_PRESETS[presetKey]
    if (!preset) return
    resetDeck()
    clearInterpretation()
    setActivePreset(preset)
    const newCards = drawMultiple(preset.cardCount)
    analyze(newCards, question)
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
          <button className={css.textSizeBtn} onClick={() => setLargeText(!largeText)}>
            {largeText ? 'Aa' : 'A+'}
          </button>
        </motion.div>

        <QuestionInput
          question={question}
          onQuestionChange={setQuestion}
          onAnalyze={handleAnalyze}
          onSubmitQuestion={handleSubmitQuestion}
          onReset={handleReset}
        />
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
        />
        {drawnCards.length > 0 && (
          <p className={css.pulledMessage}>
            ✨ {drawnCards.length} card{drawnCards.length > 1 ? 's' : ''} drawn{question ? ` for "${question}"` : ''} — trust what resonates.
          </p>
        )}
        <Spread drawnCards={drawnCards} spreadPreset={activePreset} />
        <Interpretation reading={interpretation} isGenerating={isGenerating} />
      </div>
    </motion.section>
  )
}

export default Tarot
