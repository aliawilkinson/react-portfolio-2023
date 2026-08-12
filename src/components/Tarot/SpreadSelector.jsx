import css from './Tarot.module.scss'
import { SPREAD_PRESETS } from './data/spreadPresets'

const SPREAD_KEYS = ['single', 'three', 'celtic']

const SpreadSelector = ({ selectedSpread, onSpreadChange }) => {
  return (
    <div className={css.spreadSelector} role="radiogroup" aria-label="Spread type">
      {SPREAD_KEYS.map(key => (
        <button
          key={key}
          role="radio"
          aria-checked={selectedSpread === key}
          className={`${css.spreadOption} ${selectedSpread === key ? css.spreadOptionActive : ''}`}
          onClick={() => onSpreadChange(key)}
        >
          {SPREAD_PRESETS[key].name}
        </button>
      ))}
    </div>
  )
}

export default SpreadSelector
