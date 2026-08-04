import { useState, useEffect, useCallback } from 'react'
import { tarotDeck } from '../data/tarotDeck'

/**
 * Fisher-Yates shuffle algorithm
 * @param {Array} array - Array to shuffle
 * @returns {Array} - New shuffled array
 */
const shuffleArray = (array) => {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

/**
 * Hook for managing tarot deck state and shuffling
 * Uses local deck data - no API calls needed
 * @returns {Object} Deck management state and functions
 */
const useTarotDeck = () => {
  const [shuffledDeck, setShuffledDeck] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isShuffling, setIsShuffling] = useState(false)

  // Shuffle deck with ~50% reversal probability
  const shuffleDeck = useCallback(() => {
    setIsShuffling(true)
    
    // Small delay for visual feedback
    setTimeout(() => {
      const shuffled = shuffleArray(tarotDeck).map(card => ({
        card,
        isReversed: Math.random() < 0.5
      }))
      setShuffledDeck(shuffled)
      setIsShuffling(false)
    }, 400)
  }, [])

  // Initial shuffle on mount
  useEffect(() => {
    const shuffled = shuffleArray(tarotDeck).map(card => ({
      card,
      isReversed: Math.random() < 0.5
    }))
    setShuffledDeck(shuffled)
    setIsLoading(false)
  }, [])

  // Draw N cards from top of shuffled deck
  const drawCards = useCallback((count) => {
    return shuffledDeck.slice(0, count)
  }, [shuffledDeck])

  return {
    cards: tarotDeck,
    shuffledDeck,
    isLoading,
    error: null, // No errors possible with local data
    isShuffling,
    shuffleDeck,
    drawCards,
    retry: () => {} // No-op, no API to retry
  }
}

export default useTarotDeck
