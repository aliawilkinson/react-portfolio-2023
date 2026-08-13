import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import css from './Tarot.module.scss'

const MESSAGES = [
  'Interpreting your cards...',
  'Consulting the oracle...',
  'Reading the symbolism...',
  'Weaving the narrative...',
  'Channeling insight...',
  'Listening to the cards...',
]

const LoadingIndicator = () => {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex(prev => (prev + 1) % MESSAGES.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className={css.convLoading}>
      <span className={css.convSpinner} />
      <AnimatePresence mode="wait">
        <motion.p
          key={index}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.3 }}
        >
          {MESSAGES[index]}
        </motion.p>
      </AnimatePresence>
    </div>
  )
}

export default LoadingIndicator
