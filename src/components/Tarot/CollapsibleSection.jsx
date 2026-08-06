import { useState, useId } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import css from './Tarot.module.scss'

const CollapsibleSection = ({ title, defaultOpen = true, children, isOpen: controlledOpen }) => {
  const [internalOpen, setInternalOpen] = useState(defaultOpen)
  const contentId = useId()

  const isControlled = controlledOpen !== undefined
  const isOpen = isControlled ? controlledOpen : internalOpen

  const toggle = () => {
    if (!isControlled) {
      setInternalOpen((prev) => !prev)
    }
  }

  return (
    <div>
      <button
        type="button"
        className={css.collapsibleHeader}
        onClick={toggle}
        aria-expanded={isOpen}
        aria-controls={contentId}
      >
        <span className={css.collapsibleChevron}>
          {isOpen ? '▾' : '▸'}
        </span>
        {title}
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={contentId}
            className={css.collapsibleContent}
            role="region"
            aria-labelledby={undefined}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            style={{ overflow: 'hidden' }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default CollapsibleSection
