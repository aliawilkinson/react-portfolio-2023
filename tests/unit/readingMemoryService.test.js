import { describe, it, expect, beforeEach } from 'vitest'
import ReadingMemoryService, { TURN_LIMIT, SUMMARY_LIMIT, STORAGE_KEY } from '../../src/components/Tarot/services/readingMemoryService'

describe('ReadingMemoryService', () => {
  beforeEach(() => {
    sessionStorage.clear()
  })

  describe('constructor', () => {
    it('initializes with empty turns and summaries', () => {
      const service = new ReadingMemoryService()
      expect(service.turns).toEqual([])
      expect(service.summaries).toEqual([])
    })

    it('restores from sessionStorage if data exists', () => {
      const data = {
        turns: [{ role: 'user', content: 'hello', timestamp: '2024-01-01T00:00:00.000Z' }],
        summaries: [{ question: 'q', cards: [], summary: 's' }]
      }
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(data))
      const service = new ReadingMemoryService()
      expect(service.turns).toEqual(data.turns)
      expect(service.summaries).toEqual(data.summaries)
    })
  })

  describe('addTurn', () => {
    it('adds a turn with role, content, and timestamp', () => {
      const service = new ReadingMemoryService()
      service.addTurn('user', 'What does my future hold?')
      expect(service.turns).toHaveLength(1)
      expect(service.turns[0].role).toBe('user')
      expect(service.turns[0].content).toBe('What does my future hold?')
      expect(service.turns[0].timestamp).toBeDefined()
    })

    it('persists to sessionStorage', () => {
      const service = new ReadingMemoryService()
      service.addTurn('model', 'The cards suggest...')
      const stored = JSON.parse(sessionStorage.getItem(STORAGE_KEY))
      expect(stored.turns).toHaveLength(1)
      expect(stored.turns[0].role).toBe('model')
    })
  })

  describe('getSessionHistory', () => {
    it('returns a copy of all turns in order', () => {
      const service = new ReadingMemoryService()
      service.addTurn('user', 'q1')
      service.addTurn('model', 'a1')
      service.addTurn('user', 'q2')
      const history = service.getSessionHistory()
      expect(history).toHaveLength(3)
      expect(history[0].content).toBe('q1')
      expect(history[1].content).toBe('a1')
      expect(history[2].content).toBe('q2')
    })

    it('returns a copy, not a reference', () => {
      const service = new ReadingMemoryService()
      service.addTurn('user', 'q1')
      const history = service.getSessionHistory()
      history.push({ role: 'user', content: 'injected', timestamp: '' })
      expect(service.turns).toHaveLength(1)
    })
  })

  describe('clear', () => {
    it('clears all turns and summaries', () => {
      const service = new ReadingMemoryService()
      service.addTurn('user', 'q1')
      service.saveReading({ question: 'q', cards: [{ name: 'The Fool', reversed: false }], interpretationText: 'Some text here.' })
      service.clear()
      expect(service.turns).toEqual([])
      expect(service.summaries).toEqual([])
    })

    it('removes sessionStorage entry', () => {
      const service = new ReadingMemoryService()
      service.addTurn('user', 'q1')
      service.clear()
      expect(sessionStorage.getItem(STORAGE_KEY)).toBeNull()
    })
  })

  describe('saveReading', () => {
    it('stores a reading summary with question, cards, and summary', () => {
      const service = new ReadingMemoryService()
      service.saveReading({
        question: 'Will I find love?',
        cards: [{ name: 'The Lovers', reversed: false }, { name: 'The Tower', reversed: true }],
        interpretationText: 'The Lovers card suggests deep connection. The Tower reversed indicates avoided upheaval. Together these cards point to stability in relationships.'
      })
      expect(service.summaries).toHaveLength(1)
      expect(service.summaries[0].question).toBe('Will I find love?')
      expect(service.summaries[0].cards).toEqual([
        { name: 'The Lovers', reversed: false },
        { name: 'The Tower', reversed: true }
      ])
      expect(service.summaries[0].summary.length).toBeGreaterThan(0)
    })

    it('summary does not exceed 100 words', () => {
      const longText = Array(200).fill('word').join(' ') + '.'
      const service = new ReadingMemoryService()
      service.saveReading({
        question: 'q',
        cards: [{ name: 'The Fool', reversed: false }],
        interpretationText: longText
      })
      const wordCount = service.summaries[0].summary.split(/\s+/).length
      expect(wordCount).toBeLessThanOrEqual(100)
    })
  })

  describe('getRecentReadingSummaries', () => {
    it('returns last 3 summaries when there are more', () => {
      const service = new ReadingMemoryService()
      for (let i = 0; i < 5; i++) {
        service.saveReading({
          question: `q${i}`,
          cards: [{ name: 'Card', reversed: false }],
          interpretationText: `Summary sentence ${i}.`
        })
      }
      const recent = service.getRecentReadingSummaries()
      expect(recent).toHaveLength(3)
      expect(recent[0].question).toBe('q2')
      expect(recent[2].question).toBe('q4')
    })
  })

  describe('buildGeminiHistory', () => {
    it('returns empty array when no turns or summaries', () => {
      const service = new ReadingMemoryService()
      expect(service.buildGeminiHistory()).toEqual([])
    })

    it('includes summaries as user/model pair before turns', () => {
      const service = new ReadingMemoryService()
      service.saveReading({
        question: 'q1',
        cards: [{ name: 'The Fool', reversed: false }],
        interpretationText: 'A journey begins.'
      })
      service.addTurn('user', 'follow up')
      service.addTurn('model', 'response')

      const history = service.buildGeminiHistory()
      // First two entries are the summary context pair
      expect(history[0].role).toBe('user')
      expect(history[0].parts[0].text).toContain('previous readings')
      expect(history[1].role).toBe('model')
      // Then the conversation turns
      expect(history[2].role).toBe('user')
      expect(history[2].parts[0].text).toBe('follow up')
      expect(history[3].role).toBe('model')
      expect(history[3].parts[0].text).toBe('response')
    })

    it('caps conversation turns at TURN_LIMIT', () => {
      const service = new ReadingMemoryService()
      for (let i = 0; i < 10; i++) {
        service.addTurn(i % 2 === 0 ? 'user' : 'model', `turn ${i}`)
      }
      const history = service.buildGeminiHistory()
      // Should only include last 6 turns
      expect(history).toHaveLength(TURN_LIMIT)
      expect(history[0].parts[0].text).toBe('turn 4')
    })

    it('all entries match Gemini SDK format', () => {
      const service = new ReadingMemoryService()
      service.saveReading({
        question: 'q',
        cards: [{ name: 'Card', reversed: false }],
        interpretationText: 'Theme text.'
      })
      service.addTurn('user', 'hello')
      service.addTurn('model', 'world')

      const history = service.buildGeminiHistory()
      for (const entry of history) {
        expect(['user', 'model']).toContain(entry.role)
        expect(Array.isArray(entry.parts)).toBe(true)
        expect(entry.parts.length).toBeGreaterThanOrEqual(1)
        expect(typeof entry.parts[0].text).toBe('string')
        expect(entry.parts[0].text.length).toBeGreaterThan(0)
      }
    })
  })

  describe('sessionStorage fallback', () => {
    it('handles corrupted JSON gracefully', () => {
      sessionStorage.setItem(STORAGE_KEY, 'not valid json{{{')
      const service = new ReadingMemoryService()
      expect(service.turns).toEqual([])
      expect(service.summaries).toEqual([])
    })
  })
})
