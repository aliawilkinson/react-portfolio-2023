import { describe, it, expect } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import useReading from '../../src/components/Tarot/hooks/useReading'

// Helper to create a drawn card object
function makeCard({ name = 'The Fool', meaning_up = 'New beginnings and trust.', meaning_rev = 'Recklessness or fear of change.', isReversed = false } = {}) {
  return {
    card: {
      name,
      name_short: 'ar00',
      type: 'major',
      suit: null,
      desc: 'A wanderer steps off a cliff.',
      meaning_up,
      meaning_rev,
    },
    isReversed,
  }
}

describe('useReading', () => {
  describe('initial state', () => {
    it('initializes question as empty string', () => {
      const { result } = renderHook(() => useReading())
      expect(result.current.question).toBe('')
    })

    it('initializes interpretation as null', () => {
      const { result } = renderHook(() => useReading())
      expect(result.current.interpretation).toBeNull()
    })

    it('initializes isGenerating as false', () => {
      const { result } = renderHook(() => useReading())
      expect(result.current.isGenerating).toBe(false)
    })
  })

  describe('setQuestion', () => {
    it('updates question state', () => {
      const { result } = renderHook(() => useReading())

      act(() => {
        result.current.setQuestion('What should I focus on?')
      })

      expect(result.current.question).toBe('What should I focus on?')
    })

    it('allows setting question to empty string', () => {
      const { result } = renderHook(() => useReading())

      act(() => {
        result.current.setQuestion('Something')
      })
      act(() => {
        result.current.setQuestion('')
      })

      expect(result.current.question).toBe('')
    })
  })

  describe('analyze', () => {
    it('generates an interpretation from cards', () => {
      const { result } = renderHook(() => useReading())
      const cards = [makeCard()]

      act(() => {
        result.current.analyze(cards, '')
      })

      expect(result.current.interpretation).not.toBeNull()
      expect(result.current.interpretation).toHaveProperty('summary')
      expect(result.current.interpretation).toHaveProperty('reflections')
      expect(result.current.interpretation).toHaveProperty('connections')
    })

    it('passes question text to interpretation', () => {
      const { result } = renderHook(() => useReading())
      const cards = [makeCard()]
      const question = 'What is my path forward?'

      act(() => {
        result.current.analyze(cards, question)
      })

      expect(result.current.interpretation.summary).toContain(question)
    })

    it('works without a question', () => {
      const { result } = renderHook(() => useReading())
      const cards = [makeCard()]

      act(() => {
        result.current.analyze(cards, '')
      })

      expect(result.current.interpretation).not.toBeNull()
      expect(result.current.interpretation.summary.length).toBeGreaterThan(0)
    })

    it('sets isGenerating to false after completion', () => {
      const { result } = renderHook(() => useReading())
      const cards = [makeCard()]

      act(() => {
        result.current.analyze(cards, '')
      })

      expect(result.current.isGenerating).toBe(false)
    })

    it('handles multiple cards', () => {
      const { result } = renderHook(() => useReading())
      const cards = [
        makeCard({ name: 'The Fool', isReversed: false }),
        makeCard({ name: 'The Tower', isReversed: true }),
        makeCard({ name: 'The Star', isReversed: false }),
      ]

      act(() => {
        result.current.analyze(cards, 'My future direction')
      })

      expect(result.current.interpretation).not.toBeNull()
      expect(result.current.interpretation.summary).toContain('The Fool')
      expect(result.current.interpretation.summary).toContain('The Tower')
      expect(result.current.interpretation.summary).toContain('The Star')
    })

    it('overwrites previous interpretation on subsequent calls', () => {
      const { result } = renderHook(() => useReading())

      act(() => {
        result.current.analyze([makeCard({ name: 'The Fool' })], 'First question')
      })

      const first = result.current.interpretation

      act(() => {
        result.current.analyze([makeCard({ name: 'The Tower' })], 'Second question')
      })

      expect(result.current.interpretation).not.toEqual(first)
      expect(result.current.interpretation.summary).toContain('The Tower')
    })
  })

  describe('clearInterpretation', () => {
    it('sets interpretation to null', () => {
      const { result } = renderHook(() => useReading())
      const cards = [makeCard()]

      act(() => {
        result.current.analyze(cards, '')
      })

      expect(result.current.interpretation).not.toBeNull()

      act(() => {
        result.current.clearInterpretation()
      })

      expect(result.current.interpretation).toBeNull()
    })

    it('is safe to call when interpretation is already null', () => {
      const { result } = renderHook(() => useReading())

      expect(result.current.interpretation).toBeNull()

      act(() => {
        result.current.clearInterpretation()
      })

      expect(result.current.interpretation).toBeNull()
    })
  })

  describe('exports', () => {
    it('exports all required properties and functions', () => {
      const { result } = renderHook(() => useReading())

      expect(result.current).toHaveProperty('question')
      expect(result.current).toHaveProperty('setQuestion')
      expect(result.current).toHaveProperty('interpretation')
      expect(result.current).toHaveProperty('isGenerating')
      expect(result.current).toHaveProperty('analyze')
      expect(result.current).toHaveProperty('clearInterpretation')

      expect(typeof result.current.setQuestion).toBe('function')
      expect(typeof result.current.analyze).toBe('function')
      expect(typeof result.current.clearInterpretation).toBe('function')
    })
  })
})
