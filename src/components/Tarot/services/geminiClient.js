const GEMINI_ENDPOINT = '/api/gemini'
const TIMEOUT_MS = 30000

/**
 * Calls the server-side Gemini API route.
 * @param {{ question: string, cards: Array<{name: string, reversed: boolean}>, spreadType: string, history?: Array<{role: string, parts: Array<{text: string}>}> }} payload
 * @returns {Promise<Object>} Parsed interpretation object
 */
export const callGemini = async (payload) => {
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), TIMEOUT_MS)

  try {
    const response = await fetch(GEMINI_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      signal: controller.signal
    })

    if (!response.ok) {
      throw new Error('For AI interpretation, please contact support.')
    }

    return await response.json()
  } catch (err) {
    if (err.name === 'AbortError') {
      throw new Error('For AI interpretation, please contact support.')
    }
    throw err
  } finally {
    clearTimeout(timeoutId)
  }
}
