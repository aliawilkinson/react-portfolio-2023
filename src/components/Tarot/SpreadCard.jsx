import { useState } from 'react'
import { motion } from 'framer-motion'
import css from './Tarot.module.scss'

const SpreadCard = ({ card, isReversed, label }) => {
  const [imageError, setImageError] = useState(false)
  const imageUrl = `https://sacred-texts.com/tarot/pkt/img/${card.name_short}.jpg`

  return (
    <motion.div
      className={css.spreadCard}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      {label && <span className={css.positionLabel}>{label}</span>}
      <div className={css.spreadCardImage}>
        {imageError ? (
          <FallbackCard name={card.name} />
        ) : (
          <img
            src={imageUrl}
            alt={card.name}
            style={{ transform: isReversed ? 'rotate(180deg)' : 'none' }}
            onError={() => setImageError(true)}
          />
        )}
      </div>
      <div className={css.spreadCardInfo}>
        <span className={css.cardName}>
          {card.name}
          {isReversed && <span className={css.reversedBadge}>Reversed</span>}
        </span>
        {card.desc && <p className={css.cardDesc}>{card.desc}</p>}
        <p className={css.cardMeaning}>
          {isReversed ? card.meaning_rev : card.meaning_up}
        </p>
      </div>
    </motion.div>
  )
}

const FallbackCard = ({ name }) => (
  <div className={css.fallbackCard}>
    <span className={css.fallbackIcon}>🔮</span>
    <span className={css.fallbackName}>{name}</span>
  </div>
)

export default SpreadCard
