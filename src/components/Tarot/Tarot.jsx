import { motion } from 'framer-motion'
import { staggerChildren, fadeIn, textVariant } from '../../utils/motion'
import useTarotDeck from '../../hooks/useTarotDeck'
import useReading from '../../hooks/useReading'
import CardControls from './CardControls'
import ReadingArea from './ReadingArea'
import css from './Tarot.module.scss'

const Tarot = () => {
  const {
    shuffledDeck,
    isLoading,
    error,
    isShuffling,
    shuffleDeck,
    retry
  } = useTarotDeck()

  const {
    mode,
    drawnCards,
    hasStarted,
    hasRevealedCards,
    startReading,
    revealCard,
    changeMode,
    resetReading
  } = useReading()

  // Handle drawing cards
  const handleDraw = () => {
    startReading(shuffledDeck)
  }

  // Handle new reading (shuffle + reset)
  const handleNewReading = () => {
    resetReading()
    shuffleDeck()
  }

  // Handle shuffle
  const handleShuffle = () => {
    resetReading()
    shuffleDeck()
  }

  return (
    <motion.section
      variants={staggerChildren}
      initial="hidden"
      animate="show"
      className={`paddings ${css.wrapper}`}
    >
      <div className={`innerWidth ${css.container}`}>
        <motion.h1 variants={textVariant(0.2)} className="primaryText">
          Tarot
        </motion.h1>
        <motion.p variants={fadeIn("up", "tween", 0.3, 0.6)} className={css.intro}>
          Draw a card for insight and reflection.
        </motion.p>

        <motion.div variants={fadeIn("up", "tween", 0.4, 0.6)}>
          <CardControls
            mode={mode}
            onModeChange={changeMode}
            onShuffle={handleShuffle}
            onNewReading={handleNewReading}
            isShuffling={isShuffling}
            hasRevealedCards={hasRevealedCards}
          />
        </motion.div>

        <motion.div variants={fadeIn("up", "tween", 0.5, 0.6)}>
          <ReadingArea
            mode={mode}
            drawnCards={drawnCards}
            hasStarted={hasStarted}
            onRevealCard={revealCard}
            onDraw={handleDraw}
            isLoading={isLoading}
            isShuffling={isShuffling}
            error={error}
            onRetry={retry}
          />
        </motion.div>
      </div>
    </motion.section>
  )
}

export default Tarot
