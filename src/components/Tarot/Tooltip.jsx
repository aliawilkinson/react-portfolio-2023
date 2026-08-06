import { useState, useEffect, useRef, useId, useCallback } from 'react'
import css from './Tarot.module.scss'

const Tooltip = ({ text, children }) => {
  const [visible, setVisible] = useState(false)
  const wrapperRef = useRef(null)
  const longPressTimer = useRef(null)
  const tooltipId = useId()

  const dismiss = useCallback(() => {
    setVisible(false)
  }, [])

  // Dismiss tooltip when tapping outside on mobile
  useEffect(() => {
    if (!visible) return

    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        dismiss()
      }
    }

    document.addEventListener('pointerdown', handleClickOutside)
    return () => document.removeEventListener('pointerdown', handleClickOutside)
  }, [visible, dismiss])

  // Long-press to show tooltip on mobile (doesn't block normal taps)
  const handleTouchStart = () => {
    longPressTimer.current = setTimeout(() => {
      setVisible(true)
    }, 500)
  }

  const handleTouchEnd = () => {
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current)
      longPressTimer.current = null
    }
  }

  const handleTouchMove = () => {
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current)
      longPressTimer.current = null
    }
  }

  return (
    <span
      ref={wrapperRef}
      className={css.tooltipWrapper}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onTouchMove={handleTouchMove}
      aria-describedby={visible ? tooltipId : undefined}
    >
      {children}
      {visible && (
        <span id={tooltipId} role="tooltip" className={css.tooltip}>
          {text}
        </span>
      )}
    </span>
  )
}

export default Tooltip
