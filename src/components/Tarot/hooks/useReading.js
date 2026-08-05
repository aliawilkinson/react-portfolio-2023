import { useState, useCallback } from 'react'
import { generateInterpretation } from '../services/interpretationService'

/**
 * Hook for managing tarot reading state: question input, interpretation, and analysis.
 *
 * @returns {Object} Reading state and control functions
 */
const useReading = () => {
  const [question, setQuestion] = useState('')
  const [interpretation, setInterpretation] = useState(null)
  const [isGenerating, setIsGenerating] = useState(false)

  /**
   * Analyze drawn cards, optionally with a question.
   * Calls generateInterpretation synchronously and stores the result.
   *
   * @param {Array<{card: Object, isReversed: boolean}>} cards - Drawn cards to interpret
   * @param {string} questionText - Optional question for context
   */
  const analyze = useCallback((cards, questionText) => {
    setIsGenerating(true)
    const result = generateInterpretation(cards, questionText)
    setInterpretation(result)
    setIsGenerating(false)
  }, [])

  /**
   * Clear the current interpretation.
   */
  const clearInterpretation = useCallback(() => {
    setInterpretation(null)
  }, [])

  return {
    question,
    setQuestion,
    interpretation,
    isGenerating,
    analyze,
    clearInterpretation
  }
}

export default useReading
