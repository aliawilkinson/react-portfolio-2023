const API_BASE = 'https://tarotapi.dev/api/v1'

/**
 * Fetches all 78 tarot cards from the API
 * @returns {Promise<Array>} Array of card objects
 */
export const fetchAllCards = async () => {
  const response = await fetch(`${API_BASE}/cards`)
  if (!response.ok) {
    throw new Error(`Failed to fetch cards: ${response.status}`)
  }
  const data = await response.json()
  return data.cards
}

/**
 * Constructs image URL for a card using sacred-texts.com Rider-Waite images
 * @param {string} nameShort - Card's short name (e.g., 'ar00', 'waac')
 * @returns {string} Full image URL
 */
export const getCardImageUrl = (nameShort) => {
  return `https://sacred-texts.com/tarot/pkt/img/${nameShort}.jpg`
}
