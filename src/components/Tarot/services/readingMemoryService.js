const TURN_LIMIT = 6
const SUMMARY_LIMIT = 3
const STORAGE_KEY = 'tarot_conversation_session'

/**
 * ReadingMemoryService - Manages condensed reading history and conversation turns.
 * Standalone module, no React dependency.
 */
class ReadingMemoryService {
  constructor() {
    this.turns = []
    this.summaries = []
    this._restoreFromStorage()
  }

  /**
   * Adds a conversation turn and persists to sessionStorage.
   * @param {'user'|'model'} role
   * @param {string} content
   */
  addTurn(role, content) {
    const turn = {
      role,
      content,
      timestamp: new Date().toISOString()
    }
    this.turns.push(turn)
    this._persistToStorage()
  }

  /**
   * Returns all conversation turns for the current session.
   * @returns {Array<{role: string, content: string, timestamp: string}>}
   */
  getSessionHistory() {
    return [...this.turns]
  }

  /**
   * Clears all state and sessionStorage.
   */
  clear() {
    this.turns = []
    this.summaries = []
    try {
      sessionStorage.removeItem(STORAGE_KEY)
    } catch (e) {
      // sessionStorage unavailable, no-op
    }
  }

  /**
   * Persists current state to sessionStorage with try/catch.
   */
  _persistToStorage() {
    try {
      const data = JSON.stringify({
        turns: this.turns,
        summaries: this.summaries
      })
      sessionStorage.setItem(STORAGE_KEY, data)
    } catch (e) {
      // sessionStorage unavailable or quota exceeded, fall back to in-memory
    }
  }

  /**
   * Restores session from sessionStorage if available.
   */
  _restoreFromStorage() {
    try {
      const raw = sessionStorage.getItem(STORAGE_KEY)
      if (raw) {
        const data = JSON.parse(raw)
        this.turns = Array.isArray(data.turns) ? data.turns : []
        this.summaries = Array.isArray(data.summaries) ? data.summaries : []
      }
    } catch (e) {
      // Corrupted JSON or sessionStorage unavailable — start fresh
      this.turns = []
      this.summaries = []
      try {
        sessionStorage.removeItem(STORAGE_KEY)
      } catch (e2) {
        // no-op
      }
    }
  }

  /**
   * Saves a condensed reading summary.
   * @param {{ question: string, cards: Array<{name: string, reversed: boolean}>, interpretationText: string }} reading
   */
  saveReading({ question, cards, interpretationText }) {
    const summary = this._extractSummary(interpretationText)
    const readingSummary = {
      question,
      cards: cards.map(c => ({ name: c.name, reversed: c.reversed })),
      summary
    }
    this.summaries.push(readingSummary)
    this._persistToStorage()
  }

  /**
   * Returns the last SUMMARY_LIMIT reading summaries.
   * @returns {Array<{question: string, cards: Array, summary: string}>}
   */
  getRecentReadingSummaries() {
    return this.summaries.slice(-SUMMARY_LIMIT)
  }

  /**
   * Constructs the history array for startChat().
   * Order: reading summaries context first, then recent conversation turns.
   * @returns {Array<{role: string, parts: Array<{text: string}>}>}
   */
  buildGeminiHistory() {
    const history = []

    // Add reading summaries context as a user/model pair
    const recentSummaries = this.getRecentReadingSummaries()
    if (recentSummaries.length > 0) {
      const summaryText = recentSummaries.map((s, i) => {
        const cardNames = s.cards.map(c => `${c.name}${c.reversed ? ' (Reversed)' : ''}`).join(', ')
        return `Reading ${i + 1}: Question: "${s.question}" | Cards: ${cardNames} | Theme: ${s.summary}`
      }).join('\n')

      history.push({
        role: 'user',
        parts: [{ text: `Here is context from my previous readings:\n${summaryText}` }]
      })
      history.push({
        role: 'model',
        parts: [{ text: 'I understand your previous readings. I will keep these themes in mind as we continue our conversation.' }]
      })
    }

    // Add recent conversation turns (last TURN_LIMIT)
    const recentTurns = this.turns.slice(-TURN_LIMIT)
    for (const turn of recentTurns) {
      history.push({
        role: turn.role,
        parts: [{ text: turn.content }]
      })
    }

    return history
  }

  /**
   * Extracts a ≤100 word thematic summary from interpretation text.
   * Takes first 2-3 sentences that capture key themes, capped at 100 words.
   * @param {string} text
   * @returns {string}
   */
  _extractSummary(text) {
    if (!text || text.trim() === '') {
      return ''
    }

    // Split into sentences
    const sentences = text.match(/[^.!?]+[.!?]+/g) || [text]
    
    // Take first 2-3 sentences
    let summary = ''
    const maxSentences = 3
    for (let i = 0; i < Math.min(sentences.length, maxSentences); i++) {
      const candidate = summary + sentences[i].trim() + ' '
      const wordCount = candidate.trim().split(/\s+/).length
      if (wordCount > 100) {
        // If adding this sentence exceeds 100 words, truncate
        if (summary === '') {
          // First sentence already exceeds 100 words — truncate it
          const words = sentences[i].trim().split(/\s+/)
          summary = words.slice(0, 100).join(' ')
        }
        break
      }
      summary = candidate
    }

    return summary.trim()
  }
}

export default ReadingMemoryService
export { TURN_LIMIT, SUMMARY_LIMIT, STORAGE_KEY }
