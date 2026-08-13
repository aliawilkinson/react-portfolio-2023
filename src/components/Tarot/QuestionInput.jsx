import { useState, useRef, useCallback } from 'react'
import css from './Tarot.module.scss'
import Tooltip from './Tooltip'

const QuestionInput = ({ question, onQuestionChange, onAnalyze, onSubmitQuestion, onReset }) => {
  const [showHint, setShowHint] = useState(false)
  const textareaRef = useRef(null)

  const autoResize = useCallback(() => {
    const el = textareaRef.current
    if (el) {
      const wrapper = el.parentElement
      const prevHeight = el.offsetHeight
      el.style.height = 'auto'
      const newHeight = el.scrollHeight
      el.style.height = newHeight + 'px'
      // Scroll the page down by the growth amount so it appears to expand upward
      if (wrapper && newHeight > prevHeight) {
        window.scrollBy(0, newHeight - prevHeight)
      }
    }
  }, [])

  const handleAnalyzeClick = () => {
    if (!question.trim()) {
      setShowHint(true)
      setTimeout(() => setShowHint(false), 3000)
      return
    }
    onAnalyze()
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      if (!question.trim()) {
        setShowHint(true)
        setTimeout(() => setShowHint(false), 3000)
        return
      }
      onSubmitQuestion()
    }
  }

  const handleChange = (e) => {
    onQuestionChange(e.target.value)
    setShowHint(false)
    autoResize()
  }

  return (
    <div className={css.questionArea}>
      <div className={css.inputWrapper}>
        <textarea
          ref={textareaRef}
          rows={1}
          placeholder="What would you like to reflect on?"
          value={question}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
      </div>
      <div className={css.analyzeWrapper}>
        <Tooltip text="Interpret your drawn cards (or draw 3 if none)">
          <button onClick={handleAnalyzeClick}>Analyze</button>
        </Tooltip>
        <Tooltip text="Clear everything and start over">
          <button className={css.resetBtn} onClick={onReset}>Reset</button>
        </Tooltip>
        {showHint && (
          <span className={css.questionHint}>
            feel free to ask a question and we will analyze :)
          </span>
        )}
      </div>
    </div>
  )
}

export default QuestionInput
