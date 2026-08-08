import { useState } from 'react'
import css from './Tarot.module.scss'

const ConversationInput = ({ onSubmit, disabled }) => {
  const [text, setText] = useState('')

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

  return (
    <div className={css.convInput}>
      <input
        type="text"
        placeholder="Ask a question for your tarot reading..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        aria-label="Tarot question input"
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
