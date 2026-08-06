import { useState, useEffect, useRef, useId, useCallback } from 'react'
import css from './Tarot.module.scss'

const Tooltip = ({ text, children }) => {
  const [visible, setVisible] = useState(false)
  const [touchActivated, setTouchActivated] = useState(false)
  const wrapperRef = useRef(null)
  const tooltipId = useId()

  const dismiss = useCallback(() => {
    setVisible(false)
    setTouchActivated(false)
  }, [])

  // Document click-outside listener to dismiss tooltip on touch devices
  useEffect(() => {
    if (!visible || !touchActivated) return

    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        dismiss()
      }
    }

    document.addEventListener('pointerdown', handleClickOutside)
    return () => document.removeEventListener('pointerdown', handleClickOutside)
  }, [visible, touchActivated, dismiss])

  const handleTouchEnd = (e) => {
    e.preventDefault()
    setVisible((v) => !v)
    setTouchActivated(true)
  }

  return (
    <span
      ref={wrapperRef}
      className={css.tooltipWrapper}
      onMouseEnter={() => {
        if (!touchActivated) setVisible(true)
      }}
      onMouseLeave={() => {
        if (!touchActivated) setVisible(false)
      }}
      onTouchEnd={handleTouchEnd}
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
