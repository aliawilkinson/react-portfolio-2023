import TarotCard from './TarotCard'
import css from './Tarot.module.scss'

// Mode descriptions for the draw prompt
const MODE_DESCRIPTIONS = {
  single: 'Draw a single card for guidance',
  three: 'Draw three cards: Past, Present, Future',
  celtic: 'Draw ten cards for a full Celtic Cross reading'
}

/**
 * Loading indicator while fetching cards
 */
const LoadingState = () => (
  <div className={css.loadingState}>
    <span className={css.loadingSpinner}>🔮</span>
    <p>Loading the cards...</p>
  </div>
)

/**
 * Error display with retry option
 */
const ErrorState = ({ message, onRetry }) => (
  <div className={css.errorState}>
    <p>{message}</p>
    <button onClick={onRetry}>Try Again</button>
  </div>
)

/**
 * Prompt shown before drawing cards
 */
const DrawPrompt = ({ mode, onDraw, isShuffling }) => (
  <div className={css.drawPrompt}>
    <span className={css.promptIcon}>🃏</span>
    <p>{MODE_DESCRIPTIONS[mode]}</p>
    <button onClick={onDraw} disabled={isShuffling}>
      {isShuffling ? 'Shuffling...' : 'Draw Cards'}
    </button>
  </div>
)

/**
 * Get layout class based on mode
 */
const getLayoutClass = (mode) => {
  switch (mode) {
    case 'single': return css.singleLayout
    case 'three': return css.spreadLayout
    case 'celtic': return css.celticLayout
    default: return css.singleLayout
  }
}

/**
 * Get spread type for labels
 */
const getSpreadType = (mode) => {
  if (mode === 'three') return 'three'
  if (mode === 'celtic') return 'celtic'
  return null
}

/**
 * Main reading area component
 */
const ReadingArea = ({ 
  mode, 
  drawnCards, 
  hasStarted,
  onRevealCard, 
  onDraw,
  isLoading, 
  isShuffling,
  error,
  onRetry
}) => {
  if (isLoading) {
    return (
      <div className={css.readingArea}>
        <LoadingState />
      </div>
    )
  }

  if (error) {
    return (
      <div className={css.readingArea}>
        <ErrorState message={error} onRetry={onRetry} />
      </div>
    )
  }

  if (!hasStarted) {
    return (
      <div className={css.readingArea}>
        <DrawPrompt mode={mode} onDraw={onDraw} isShuffling={isShuffling} />
      </div>
    )
  }

  const spreadType = getSpreadType(mode)

  return (
    <div className={css.readingArea}>
      <div className={getLayoutClass(mode)}>
        {drawnCards.map((drawn, index) => (
          <TarotCard
            key={`${drawn.card.name_short}-${index}`}
            card={drawn.card}
            isReversed={drawn.isReversed}
            isRevealed={drawn.isRevealed}
            position={spreadType ? index : undefined}
            spreadType={spreadType}
            onReveal={() => onRevealCard(index)}
          />
        ))}
      </div>
    </div>
  )
}

export default ReadingArea
