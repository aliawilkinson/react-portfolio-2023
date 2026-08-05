import { motion } from 'framer-motion'
import css from './Tarot.module.scss'

const DeckView = ({ remainingCount, onDraw, isEmpty }) => {
  return (
    <div className={css.deckArea}>
      <motion.div
        className={`${css.deckCard} ${isEmpty ? css.deckEmpty : ''}`}
        onClick={!isEmpty ? onDraw : undefined}
        whileHover={!isEmpty ? { scale: 1.03 } : {}}
        whileTap={!isEmpty ? { scale: 0.97 } : {}}
      >
        <div className={css.deckCardInner}>
          <span className={css.deckSymbol}>✦</span>
          {!isEmpty && <span className={css.deckCount}>{remainingCount}</span>}
          {isEmpty && <span className={css.deckEmptyLabel}>Empty</span>}
        </div>
      </motion.div>
    </div>
  )
}

export default DeckView
