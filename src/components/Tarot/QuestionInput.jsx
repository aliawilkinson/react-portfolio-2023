import { useState, useRef, useCallback } from 'react'
import css from './Tarot.module.scss'

const QuestionInput = ({ question, onQuestionChange, onAnalyze, onSubmitQuestion, onReset }) => {
  const [showHint, setShowHint] = useState(false)
  const textareaRef = useRef(null)

  const autoResize = useCallback(() => {
    const el = textareaRef.current
    if (el) {
      el.style.height = 'auto'
      el.style.height = el.scrollHeight + 'px'
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
        <button onClick={handleAnalyzeClick}>Analyze</button>
        <button className={css.resetBtn} onClick={onReset}>Reset</button>
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
