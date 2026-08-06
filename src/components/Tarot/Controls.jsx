import css from './Tarot.module.scss'
import { SPREAD_PRESETS } from './data/spreadPresets'
import Tooltip from './Tooltip'

const Controls = ({ onReset, onShuffle, onAutoMode, onPreset, isShuffling, hasDrawnCards, largeText, onToggleTextSize }) => {
  return (
    <div className={css.controls}>
      <div className={css.actions}>
        <Tooltip text="Return all cards to the deck and start fresh">
          <button onClick={onReset}>Reset Deck</button>
        </Tooltip>
        <Tooltip text="Shuffle remaining cards without clearing drawn cards">
          <button onClick={onShuffle} disabled={isShuffling}>
            {isShuffling ? 'Shuffling...' : 'Shuffle Deck'}
          </button>
        </Tooltip>
        <Tooltip text={largeText ? 'Switch back to normal text size' : 'Increase text size for easier reading'}>
          <button
            onClick={onToggleTextSize}
            aria-pressed={largeText}
          >
            {largeText ? 'Smaller Letters' : 'Bigger Letters'}
          </button>
        </Tooltip>
      </div>
      <div className={css.autoMode}>
        <span className={css.autoLabel}>Auto Mode:</span>
        <Tooltip text="Draw 1 card and get an interpretation">
          <button onClick={() => onAutoMode(1)}>1 Card</button>
        </Tooltip>
        <Tooltip text="Draw 3 cards and get an interpretation">
          <button onClick={() => onAutoMode(3)}>3 Cards</button>
        </Tooltip>
        <Tooltip text="Draw 5 cards and get an interpretation">
          <button onClick={() => onAutoMode(5)}>5 Cards</button>
        </Tooltip>
      </div>
      <div className={css.presets}>
        <span className={css.autoLabel}>Spreads:</span>
        <Tooltip text="1 card — your core message">
          <button onClick={() => onPreset('single')}>{SPREAD_PRESETS.single.name}</button>
        </Tooltip>
        <Tooltip text="3 cards — Past, Present, Future">
          <button onClick={() => onPreset('three')}>{SPREAD_PRESETS.three.name}</button>
        </Tooltip>
        <Tooltip text="10 cards — full Celtic Cross reading">
          <button onClick={() => onPreset('celtic')}>{SPREAD_PRESETS.celtic.name}</button>
        </Tooltip>
      </div>
    </div>
  )
}

export default Controls
