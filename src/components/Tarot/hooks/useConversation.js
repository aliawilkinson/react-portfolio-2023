import { useState, useCallback } from 'react'
import { callGemini } from '../services/geminiClient'

const useConversation = ({ resetAndDraw }) => {
  const [turns, setTurns] = useState([])
  const [currentCards, setCurrentCards] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [pendingQuestion, setPendingQuestion] = useState(null)
  const [pendingPreset, setPendingPreset] = useState(null)

  const submitQuestion = useCallback(async (questionText, spreadPreset) => {
    if (!questionText || questionText.trim() === '') return

    setError(null)
    setIsLoading(true)
    setPendingQuestion(questionText)
    setPendingPreset(spreadPreset)

    // Draw cards using existing deck logic
    const cards = resetAndDraw(spreadPreset.cardCount)
    setCurrentCards(cards)

    try {
      const interpretation = await callGemini({
        question: questionText,
        cards: cards.map(c => ({ name: c.card.name, reversed: c.isReversed })),
        spreadType: spreadPreset.name
      })

      const turn = {
        id: crypto.randomUUID(),
        timestamp: new Date().toISOString(),
        question: questionText,
        cards,
        spreadPreset,
        interpretation
      }

      setTurns(prev => [...prev, turn])
      setCurrentCards([])
      setPendingQuestion(null)
      setPendingPreset(null)
    } catch (err) {
      setError(err.message || 'For AI interpretation, please contact support.')
    } finally {
      setIsLoading(false)
    }
  }, [resetAndDraw])

  const retryLastInterpretation = useCallback(async () => {
    if (!pendingQuestion || !pendingPreset || currentCards.length === 0) return

    setError(null)
    setIsLoading(true)

    try {
      const interpretation = await callGemini({
        question: pendingQuestion,
        cards: currentCards.map(c => ({ name: c.card.name, reversed: c.isReversed })),
        spreadType: pendingPreset.name
      })

      const turn = {
        id: crypto.randomUUID(),
        timestamp: new Date().toISOString(),
        question: pendingQuestion,
        cards: currentCards,
        spreadPreset: pendingPreset,
        interpretation
      }

      setTurns(prev => [...prev, turn])
      setCurrentCards([])
      setPendingQuestion(null)
      setPendingPreset(null)
    } catch (err) {
      setError(err.message || 'For AI interpretation, please contact support.')
    } finally {
      setIsLoading(false)
    }
  }, [pendingQuestion, pendingPreset, currentCards])

  return {
    turns,
    currentCards,
    isLoading,
    error,
    submitQuestion,
    retryLastInterpretation
  }
}

export default useConversation
