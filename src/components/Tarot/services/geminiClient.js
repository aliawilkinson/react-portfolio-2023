const GEMINI_ENDPOINT = '/api/gemini'
const TIMEOUT_MS = 60000

/**
 * Calls the server-side Gemini API route. Single attempt, no retries.
 * On failure, throws with a user-friendly error message from the server.
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
      const body = await response.json().catch(() => ({}))
      throw new Error(body.error || 'The oracle is sleeping.')
    }

    return await response.json()
  } catch (err) {
    if (err.name === 'AbortError') {
      throw new Error('The oracle took too long to respond. Try again.')
    }
    throw err
  } finally {
    clearTimeout(timeoutId)
  }
}
