import { useState } from 'react'
import { motion } from 'framer-motion'
import { getCardImageUrl } from '../../services/tarotService'
import css from './Tarot.module.scss'

// Position labels for different spreads
const SPREAD_LABELS = {
  three: ['Past', 'Present', 'Future'],
  celtic: [
    'Present',      // 0 - center
    'Challenge',    // 1 - crossing
    'Foundation',   // 2 - below
    'Past',         // 3 - left
    'Crown',        // 4 - above
    'Future',       // 5 - right
    'Self',         // 6 - staff bottom
    'Environment',  // 7 - staff
    'Hopes/Fears',  // 8 - staff
    'Outcome'       // 9 - staff top
  ]
}

/**
 * Fallback card shown when image fails to load
 */
const FallbackCard = ({ name, isReversed }) => (
  <div 
    className={css.fallbackCard}
    style={{ transform: isReversed ? 'rotate(180deg)' : 'none' }}
  >
    <span className={css.fallbackIcon}>🔮</span>
    <span className={css.fallbackName}>{name}</span>
  </div>
)

/**
 * Card meaning display shown after reveal
 */
const CardMeaning = ({ card, isReversed }) => (
  <div className={css.cardMeaning}>
    <h3 className={css.cardName}>
      {card.name}
      {isReversed && <span className={css.reversedBadge}>Reversed</span>}
    </h3>
    <p className={css.cardDesc}>{card.desc}</p>
    <p className={css.meaning}>
      {isReversed ? card.meaning_rev : card.meaning_up}
    </p>
  </div>
)

/**
 * Individual tarot card with flip animation
 */
const TarotCard = ({ card, isReversed, isRevealed, position, spreadType, onReveal }) => {
  const [imageError, setImageError] = useState(false)
  const [isFlipping, setIsFlipping] = useState(false)
  
  const imageUrl = getCardImageUrl(card.name_short)
  const labels = spreadType ? SPREAD_LABELS[spreadType] : null
  const label = labels && position !== undefined ? labels[position] : null

  const handleClick = () => {
    if (!isRevealed && !isFlipping) {
      setIsFlipping(true)
      onReveal()
    }
  }

  const handleAnimationComplete = () => {
    if (isFlipping) {
      setIsFlipping(false)
    }
  }

  return (
    <div className={css.cardContainer}>
      {label && <span className={css.positionLabel}>{label}</span>}
      
      <div className={css.cardWrapper} onClick={handleClick}>
        <motion.div
          className={css.card}
          initial={false}
          animate={{ rotateY: isRevealed ? 180 : 0 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          onAnimationComplete={handleAnimationComplete}
        >
          {/* Card Back */}
          <div className={css.cardBack}>
            <div className={css.cardBackDesign}>
              <span>✦</span>
            </div>
          </div>

          {/* Card Face */}
          <div className={css.cardFace}>
            {imageError ? (
              <FallbackCard name={card.name} isReversed={isReversed} />
            ) : (
              <img
                src={imageUrl}
                alt={card.name}
                className={css.cardImage}
                style={{ transform: isReversed ? 'rotate(180deg)' : 'none' }}
                onError={() => setImageError(true)}
              />
            )}
          </div>
        </motion.div>
      </div>

      {isRevealed && <CardMeaning card={card} isReversed={isReversed} />}
    </div>
  )
}

export default TarotCard
