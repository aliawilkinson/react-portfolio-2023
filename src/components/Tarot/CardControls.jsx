import css from './Tarot.module.scss'

/**
 * Controls for mode selection and reading actions
 */
const CardControls = ({ 
  mode, 
  onModeChange, 
  onShuffle, 
  onNewReading,
  isShuffling,
  hasRevealedCards 
}) => {
  return (
    <div className={css.controls}>
      <div className={css.modeSelector}>
        <button 
          className={mode === 'single' ? css.active : ''}
          onClick={() => onModeChange('single')}
        >
          Single Card
        </button>
        <button 
          className={mode === 'three' ? css.active : ''}
          onClick={() => onModeChange('three')}
        >
          Three Card
        </button>
        <button 
          className={mode === 'celtic' ? css.active : ''}
          onClick={() => onModeChange('celtic')}
        >
          Celtic Cross
        </button>
      </div>
      
      <div className={css.actions}>
        <button onClick={onShuffle} disabled={isShuffling}>
          {isShuffling ? 'Shuffling...' : 'Shuffle'}
        </button>
        {hasRevealedCards && (
          <button onClick={onNewReading}>
            New Reading
          </button>
        )}
      </div>
    </div>
  )
}

export default CardControls
