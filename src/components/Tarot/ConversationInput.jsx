import { useState, useRef, useEffect, useCallback } from 'react'
import css from './Tarot.module.scss'

const MAX_ROWS = 6

const ConversationInput = ({ onSubmit, disabled }) => {
  const [text, setText] = useState('')
  const textareaRef = useRef(null)
  const barRef = useRef(null)

  const handleSubmit = () => {
    if (text.trim() === '' || disabled) return
    onSubmit(text.trim())
    setText('')
    // Reset height after submit
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit()
    }
  }

  // Auto-expand textarea
  const handleInput = useCallback((e) => {
    setText(e.target.value)
    const el = e.target
    el.style.height = 'auto'
    const lineHeight = parseInt(getComputedStyle(el).lineHeight) || 20
    const maxHeight = lineHeight * MAX_ROWS
    el.style.height = Math.min(el.scrollHeight, maxHeight) + 'px'
  }, [])

  // Use visualViewport to keep input above keyboard on iOS
  useEffect(() => {
    const vv = window.visualViewport
    if (!vv || !barRef.current) return

    const handleResize = () => {
      const bar = barRef.current
      if (!bar) return
      // visualViewport.height is the visible area (shrinks when keyboard opens)
      // offsetTop is how far down the viewport has been pushed
      const offset = window.innerHeight - vv.height - vv.offsetTop
      bar.style.transform = offset > 0 ? `translateY(-${offset}px)` : ''
    }

    vv.addEventListener('resize', handleResize)
    vv.addEventListener('scroll', handleResize)
    return () => {
      vv.removeEventListener('resize', handleResize)
      vv.removeEventListener('scroll', handleResize)
    }
  }, [])

  return (
    <div className={css.convInputBar} ref={barRef}>
      <div className={css.convInput}>
        <textarea
          ref={textareaRef}
          placeholder="Ask a question for your tarot reading..."
          value={text}
          onChange={handleInput}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          aria-label="Tarot question input"
          data-clarity-mask="true"
          rows={1}
        />
        <button
          onClick={handleSubmit}
          disabled={disabled || text.trim() === ''}
          aria-label="Submit question"
        >
          Ask
        </button>
      </div>
    </div>
  )
}

export default ConversationInput
