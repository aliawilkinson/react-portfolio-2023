import css from './Tarot.module.scss'
import { SPREAD_PRESETS } from './data/spreadPresets'

const Controls = ({ onReset, onShuffle, onAutoMode, onPreset, isShuffling, hasDrawnCards }) => {
  return (
    <div className={css.controls}>
      <div className={css.actions}>
        <button onClick={onReset}>Reset Deck</button>
        <button onClick={onShuffle} disabled={isShuffling}>
          {isShuffling ? 'Shuffling...' : 'Shuffle Deck'}
        </button>
      </div>
      <div className={css.autoMode}>
        <span className={css.autoLabel}>Auto Mode:</span>
        <button onClick={() => onAutoMode(1)}>1 Card</button>
        <button onClick={() => onAutoMode(3)}>3 Cards</button>
        <button onClick={() => onAutoMode(5)}>5 Cards</button>
      </div>
      <div className={css.presets}>
        <span className={css.autoLabel}>Spreads:</span>
        <button onClick={() => onPreset('single')}>{SPREAD_PRESETS.single.name}</button>
        <button onClick={() => onPreset('three')}>{SPREAD_PRESETS.three.name}</button>
        <button onClick={() => onPreset('celtic')}>{SPREAD_PRESETS.celtic.name}</button>
      </div>
    </div>
  )
}

export default Controls
