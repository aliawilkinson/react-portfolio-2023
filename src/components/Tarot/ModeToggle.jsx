import css from './Tarot.module.scss'

const ModeToggle = ({ mode, onModeChange }) => {
  return (
    <div className={css.modeToggle} role="tablist" aria-label="Reading mode">
      <button
        role="tab"
        aria-selected={mode === 'classic'}
        className={`${css.modeTab} ${mode === 'classic' ? css.modeTabActive : ''}`}
        onClick={() => onModeChange('classic')}
      >
        Classic
      </button>
      <button
        role="tab"
        aria-selected={mode === 'ai'}
        className={`${css.modeTab} ${mode === 'ai' ? css.modeTabActive : ''}`}
        onClick={() => onModeChange('ai')}
      >
        AI Reading
      </button>
    </div>
  )
}

export default ModeToggle
