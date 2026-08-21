/**
 * Deck Utilities
 *
 * Pure functions for deck manipulation, extracted for testability.
 * These functions have no side effects and can be easily property-tested.
 *
 * @module deckUtils
 */

/**
 * Fisher-Yates shuffle algorithm.
 * Produces a uniformly random permutation of the input array.
 *
 * @param {Array} array - Array to shuffle
 * @returns {Array} - New shuffled array (does not mutate original)
 */
export const shuffleArray = (array) => {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

/**
 * Prepares a deck for use by shuffling and assigning random orientations.
 *
 * @param {Array} cards - Array of card objects
 * @returns {Array} - Array of {card, isReversed} objects
 */
export const prepareDeck = (cards) => {
  return shuffleArray(cards).map(card => ({
    card,
    isReversed: Math.random() < 0.5
  }))
}
