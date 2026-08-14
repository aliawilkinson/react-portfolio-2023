import { useState, useCallback } from 'react'
import { callGemini } from '../services/geminiClient'
import ReadingMemoryService from '../services/readingMemoryService'

const useConversation = ({ resetAndDraw }) => {
  const [turns, setTurns] = useState([])
  const [currentCards, setCurrentCards] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [pendingQuestion, setPendingQuestion] = useState(null)
  const [pendingPreset, setPendingPreset] = useState(null)
  const [memoryService] = useState(() => new ReadingMemoryService())

  const submitQuestion = useCallback(async (questionText, spreadPreset) => {
    if (!questionText || questionText.trim() === '') return

    setError(null)
    setIsLoading(true)
    setPendingQuestion(questionText)
    setPendingPreset(spreadPreset)

    // Draw cards using existing deck logic
    const cards = resetAndDraw(spreadPreset.cardCount)
    setCurrentCards(cards)

    // Add user turn to memory service
    memoryService.addTurn('user', questionText)

    // Build history for multi-turn conversation
    const history = memoryService.buildGeminiHistory()

    try {
      const interpretation = await callGemini({
        question: questionText,
        cards: cards.map(c => ({ name: c.card.name, reversed: c.isReversed })),
        spreadType: spreadPreset.name,
        history
      })

      // Build the full interpretation text for memory service
      const interpretationText = [
        interpretation.summary,
        interpretation.detailed,
        interpretation.themes,
        interpretation.reflectionQuestions,
        interpretation.actionableInsights
      ].filter(Boolean).join(' ')

      // Add model turn to memory service
      memoryService.addTurn('model', interpretationText)

      // Save reading summary
      memoryService.saveReading({
        question: questionText,
        cards: cards.map(c => ({ name: c.card.name, reversed: c.isReversed })),
        interpretationText
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
      // Remove the user turn that was added before the failed call
      memoryService.turns.pop()
      memoryService._persistToStorage()
      setError(err.message || 'The oracle has refused to awaken. Feel free to do a manual spread in the core tarot app.')
    } finally {
      setIsLoading(false)
    }
  }, [resetAndDraw, memoryService])

  const retryLastInterpretation = useCallback(async () => {
    if (!pendingQuestion || !pendingPreset || currentCards.length === 0) return

    setError(null)
    setIsLoading(true)

    // Add user turn back for retry
    memoryService.addTurn('user', pendingQuestion)

    // Build history for multi-turn conversation
    const history = memoryService.buildGeminiHistory()

    try {
      const interpretation = await callGemini({
        question: pendingQuestion,
        cards: currentCards.map(c => ({ name: c.card.name, reversed: c.isReversed })),
        spreadType: pendingPreset.name,
        history
      })

      // Build the full interpretation text for memory service
      const interpretationText = [
        interpretation.summary,
        interpretation.detailed,
        interpretation.themes,
        interpretation.reflectionQuestions,
        interpretation.actionableInsights
      ].filter(Boolean).join(' ')

      // Add model turn to memory service
      memoryService.addTurn('model', interpretationText)

      // Save reading summary
      memoryService.saveReading({
        question: pendingQuestion,
        cards: currentCards.map(c => ({ name: c.card.name, reversed: c.isReversed })),
        interpretationText
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
      // Remove the user turn that was added before the failed call
      memoryService.turns.pop()
      memoryService._persistToStorage()
      setError(err.message || 'The oracle has refused to awaken. Feel free to do a manual spread in the core tarot app.')
    } finally {
      setIsLoading(false)
    }
  }, [pendingQuestion, pendingPreset, currentCards, memoryService])

  return {
    turns,
    currentCards,
    isLoading,
    error,
    pendingQuestion,
    submitQuestion,
    retryLastInterpretation
  }
}

export default useConversation
