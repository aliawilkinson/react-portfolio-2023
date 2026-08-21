/**
 * Critical logic tests for interpretationService
 * Tests output shape, orientation-correct meaning selection, and card count handling.
 *
 * Feature: test-suite-architecture
 * FAST tier test - runs on pre-push
 * Requirements: 4.1, 4.2, 4.3
 */

import { describe, it, expect } from 'vitest'
import { generateInterpretation } from '../../src/components/Tarot/services/interpretationService'

// Helper to create a drawn card object
function makeCard({ 
  name = 'The Fool', 
  meaning_up = 'New beginnings and trust.', 
  meaning_rev = 'Recklessness or fear.', 
  isReversed = false 
} = {}) {
  return {
    card: { name, meaning_up, meaning_rev },
    isReversed,
  }
}

describe('interpretationService (FAST)', () => {
  describe('output shape', () => {
    it('returns object with summary, reflections, and connections', () => {
      const result = generateInterpretation([makeCard()])
      
      expect(result).toHaveProperty('summary')
      expect(result).toHaveProperty('reflections')
      expect(result).toHaveProperty('connections')
    })

    it('summary is a non-empty string', () => {
      const result = generateInterpretation([makeCard()])
      
      expect(typeof result.summary).toBe('string')
      expect(result.summary.length).toBeGreaterThan(0)
    })

    it('reflections is a non-empty array of strings', () => {
      const result = generateInterpretation([makeCard()])
      
      expect(Array.isArray(result.reflections)).toBe(true)
      expect(result.reflections.length).toBeGreaterThan(0)
      result.reflections.forEach(r => {
        expect(typeof r).toBe('string')
      })
    })

    it('connections is a non-empty string', () => {
      const result = generateInterpretation([makeCard()])
      
      expect(typeof result.connections).toBe('string')
      expect(result.connections.length).toBeGreaterThan(0)
    })
  })

  describe('orientation-correct meaning selection', () => {
    it('uses meaning_up for upright cards', () => {
      const card = makeCard({ 
        name: 'The Magician',
        meaning_up: 'UPRIGHT_MEANING_UNIQUE', 
        meaning_rev: 'REVERSED_MEANING_UNIQUE',
        isReversed: false 
      })
      const result = generateInterpretation([card])
      
      expect(result.summary).toContain('UPRIGHT_MEANING_UNIQUE')
      expect(result.summary).not.toContain('REVERSED_MEANING_UNIQUE')
    })

    it('uses meaning_rev for reversed cards', () => {
      const card = makeCard({ 
        name: 'The Magician',
        meaning_up: 'UPRIGHT_MEANING_UNIQUE', 
        meaning_rev: 'REVERSED_MEANING_UNIQUE',
        isReversed: true 
      })
      const result = generateInterpretation([card])
      
      expect(result.summary).toContain('REVERSED_MEANING_UNIQUE')
      expect(result.summary).not.toContain('UPRIGHT_MEANING_UNIQUE')
    })
  })

  describe('card count handling', () => {
    it('handles single card', () => {
      const result = generateInterpretation([makeCard({ name: 'The Sun' })])
      
      expect(result.summary).toContain('The Sun')
      expect(result.reflections.length).toBeGreaterThanOrEqual(1)
      expect(result.connections.length).toBeGreaterThan(0)
    })

    it('handles two cards', () => {
      const cards = [
        makeCard({ name: 'The Moon' }),
        makeCard({ name: 'The Star' })
      ]
      const result = generateInterpretation(cards)
      
      expect(result.summary).toContain('The Moon')
      expect(result.summary).toContain('The Star')
      expect(result.reflections.length).toBeGreaterThanOrEqual(2)
    })

    it('handles three cards', () => {
      const cards = [
        makeCard({ name: 'Past Card' }),
        makeCard({ name: 'Present Card' }),
        makeCard({ name: 'Future Card' })
      ]
      const result = generateInterpretation(cards)
      
      expect(result.summary).toContain('Past Card')
      expect(result.summary).toContain('Present Card')
      expect(result.summary).toContain('Future Card')
      expect(result.reflections.length).toBeGreaterThanOrEqual(3)
    })
  })
})
