import { useState, useCallback } from 'react'
import { tarotDeck } from '../data/tarotDeck'
import { shuffleArray } from '../utils/deckUtils'

/**
 * Hook for managing tarot deck state with draw model.
 * Maintains remaining/drawn card partition.
 * Uses local deck data — no API calls needed.
 *
 * @returns {Object} Deck management state and functions
 */
const useTarotDeck = () => {
  const [remainingDeck, setRemainingDeck] = useState(() =>
    shuffleArray(tarotDeck).map(card => ({ card, isReversed: Math.random() < 0.5 }))
  )
  const [drawnCards, setDrawnCards] = useState([])
  const [isShuffling, setIsShuffling] = useState(false)

  // Draw one card from the top of remaining deck
  const drawCard = useCallback(() => {
    if (remainingDeck.length === 0) return null
    const [drawn, ...rest] = remainingDeck
    setRemainingDeck(rest)
    setDrawnCards(prev => [...prev, drawn])
    return drawn
  }, [remainingDeck])

  // Draw multiple cards at once
  const drawMultiple = useCallback((count) => {
    const toDraw = remainingDeck.slice(0, count)
    setRemainingDeck(prev => prev.slice(count))
    setDrawnCards(prev => [...prev, ...toDraw])
    return toDraw
  }, [remainingDeck])

  // Shuffle only remaining (undealt) cards, assigns new orientations
  const shuffleDeck = useCallback(() => {
    setIsShuffling(true)
    setTimeout(() => {
      setRemainingDeck(prev =>
        shuffleArray(prev.map(d => d.card)).map(card => ({
          card, isReversed: Math.random() < 0.5
        }))
      )
      setIsShuffling(false)
    }, 400)
  }, [])

  // Reset: return all cards to deck, reshuffle full deck, clear drawn
  const resetDeck = useCallback(() => {
    setIsShuffling(true)
    setTimeout(() => {
      setRemainingDeck(
        shuffleArray(tarotDeck).map(card => ({ card, isReversed: Math.random() < 0.5 }))
      )
      setDrawnCards([])
      setIsShuffling(false)
    }, 400)
  }, [])

  // Reset and immediately draw N cards (no delay — for question submit flow)
  const resetAndDraw = useCallback((count) => {
    const freshDeck = shuffleArray(tarotDeck).map(card => ({ card, isReversed: Math.random() < 0.5 }))
    const toDraw = freshDeck.slice(0, count)
    setRemainingDeck(freshDeck.slice(count))
    setDrawnCards(toDraw)
    return toDraw
  }, [])

  return {
    remainingDeck,
    drawnCards,
    isShuffling,
    drawCard,
    drawMultiple,
    shuffleDeck,
    resetDeck,
    resetAndDraw,
    remainingCount: remainingDeck.length
  }
}

export default useTarotDeck
