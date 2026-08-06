import { motion } from 'framer-motion'
import css from './Tarot.module.scss'
import cardCover from './assets/tarot-cardcover.png'

const DeckView = ({ remainingCount, onDraw, isEmpty }) => {
  return (
    <div className={css.deckArea}>
      <motion.div
        className={`${css.deckCard} ${isEmpty ? css.deckEmpty : ''}`}
        onClick={!isEmpty ? onDraw : undefined}
        whileHover={!isEmpty ? { scale: 1.03 } : {}}
        whileTap={!isEmpty ? { scale: 0.97 } : {}}
      >
        <img src={cardCover} alt="Tarot card back" className={css.deckCardImage} />
        <div className={css.deckCardOverlay}>
          {!isEmpty && <span className={css.deckCountHalo}>{remainingCount}</span>}
          {isEmpty && <span className={css.deckEmptyLabel}>Empty</span>}
        </div>
      </motion.div>
    </div>
  )
}

export default DeckView
