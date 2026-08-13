import { useState, useRef } from 'react'
import css from './Tarot.module.scss'

const ConversationInput = ({ onSubmit, disabled }) => {
  const [text, setText] = useState('')
  const inputRef = useRef(null)

  const handleSubmit = () => {
    if (text.trim() === '' || disabled) return
    onSubmit(text.trim())
    setText('')
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit()
    }
  }

  const handleFocus = () => {
    // On iOS, scroll input into view after keyboard opens
    setTimeout(() => {
      inputRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' })
    }, 300)
  }

  return (
    <div className={css.convInput} ref={inputRef}>
      <input
        type="text"
        placeholder="Ask a question for your tarot reading..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyDown}
        onFocus={handleFocus}
        disabled={disabled}
        aria-label="Tarot question input"
        data-clarity-mask="true"
      />
      <button
        onClick={handleSubmit}
        disabled={disabled || text.trim() === ''}
        aria-label="Submit question"
      >
        Analyze
      </button>
    </div>
  )
}

export default ConversationInput
