import css from './Tarot.module.scss'
import SpreadCard from './SpreadCard'

const Spread = ({ drawnCards, spreadPreset }) => {
  const reversed = [...drawnCards].reverse()

  return (
    <div className={css.spread}>
      {reversed.map((drawn, i) => {
        const originalIndex = drawnCards.length - 1 - i
        return (
          <SpreadCard
            key={drawn.card.name_short}
            card={drawn.card}
            isReversed={drawn.isReversed}
            label={spreadPreset?.labels?.[originalIndex] || null}
          />
        )
      })}
    </div>
  )
}

export default Spread
