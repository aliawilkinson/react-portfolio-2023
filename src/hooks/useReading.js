import { useState, useCallback } from 'react'

// Card counts for each reading mode
const MODE_CARD_COUNTS = {
  single: 1,
  three: 3,
  celtic: 10
}

/**
 * Hook for managing tarot reading state
 * @returns {Object} Reading state and control functions
 */
const useReading = () => {
  const [mode, setMode] = useState('single') // 'single' | 'three' | 'celtic'
  const [drawnCards, setDrawnCards] = useState([])
  const [hasStarted, setHasStarted] = useState(false)

  // Start a reading by drawing cards from the shuffled deck
  const startReading = useCallback((shuffledCards) => {
    const count = MODE_CARD_COUNTS[mode] || 1
    const cards = shuffledCards.slice(0, count).map(item => ({
      ...item,
      isRevealed: false
    }))
    setDrawnCards(cards)
    setHasStarted(true)
  }, [mode])

  // Reveal a specific card by index
  const revealCard = useCallback((index) => {
    setDrawnCards(prev => prev.map((card, i) => 
      i === index ? { ...card, isRevealed: true } : card
    ))
  }, [])

  const changeMode = useCallback((newMode) => {
    setMode(newMode)
    setDrawnCards([])
    setHasStarted(false)
  }, [])

  // Reset the current reading
  const resetReading = useCallback(() => {
    setDrawnCards([])
    setHasStarted(false)
  }, [])

  // Computed values
  const hasRevealedCards = drawnCards.some(c => c.isRevealed)
  const allRevealed = drawnCards.length > 0 && drawnCards.every(c => c.isRevealed)

  return {
    mode,
    drawnCards,
    hasStarted,
    hasRevealedCards,
    allRevealed,
    startReading,
    revealCard,
    changeMode,
    resetReading
  }
}

export default useReading
