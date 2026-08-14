const GEMINI_ENDPOINT = '/api/gemini'
const TIMEOUT_MS = 60000
const MAX_RETRIES = 2
const RETRY_DELAY_MS = 1500

/**
 * Calls the server-side Gemini API route with automatic retry.
 * @param {{ question: string, cards: Array<{name: string, reversed: boolean}>, spreadType: string, history?: Array<{role: string, parts: Array<{text: string}>}> }} payload
 * @returns {Promise<Object>} Parsed interpretation object
 */
export const callGemini = async (payload) => {
  let lastError = null

  for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
    if (attempt > 0) {
      await new Promise(r => setTimeout(r, RETRY_DELAY_MS * attempt))
    }

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
        lastError = new Error(body.error || `Request failed (${response.status})`)
        // Retry on 5xx only, don't retry on 4xx (including 429 rate limit)
        if (response.status >= 500) continue
        throw lastError
      }

      return await response.json()
    } catch (err) {
      if (err.name === 'AbortError') {
        lastError = new Error('The oracle has refused to awaken. Feel free to do a manual spread in the core tarot app.')
        continue
      }
      lastError = err
      // Network errors are retryable
      if (err.message?.includes('fetch')) continue
      throw err
    } finally {
      clearTimeout(timeoutId)
    }
  }

  throw lastError || new Error('The oracle has refused to awaken. Feel free to do a manual spread in the core tarot app.')
}
