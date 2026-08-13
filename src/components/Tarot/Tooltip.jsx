import { useState } from 'react'
import css from './Tarot.module.scss'

const Tooltip = ({ text, children }) => {
  const [visible, setVisible] = useState(false)

  return (
    <span
      className={css.tooltipWrapper}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      onFocus={() => setVisible(true)}
      onBlur={() => setVisible(false)}
    >
      {children}
      {visible && <span className={css.tooltip} role="tooltip">{text}</span>}
    </span>
  )
}

export default Tooltip
