import css from './Tarot.module.scss'
import SpreadCard from './SpreadCard'

const Spread = ({ drawnCards, spreadPreset }) => {
  return (
    <div className={css.spread}>
      {drawnCards.map((drawn, index) => (
        <SpreadCard
          key={drawn.card.name_short}
          card={drawn.card}
          isReversed={drawn.isReversed}
          label={spreadPreset?.labels?.[index] || null}
        />
      ))}
    </div>
  )
}

export default Spread
