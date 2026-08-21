/**
 * Critical logic tests for useConversation hook
 * Tests successful turn append, error fallback turn, and whitespace rejection.
 *
 * Feature: test-suite-architecture
 * FAST tier test - runs on pre-push
 * Requirements: 6.1, 6.2, 6.3, 6.4
 */

import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import useConversation from '../../src/components/Tarot/hooks/useConversation'

// Mock geminiClient
vi.mock('../../src/components/Tarot/services/geminiClient', () => ({
  callGemini: vi.fn()
}))

// Import the mocked module to control its behavior
import { callGemini } from '../../src/components/Tarot/services/geminiClient'

describe('useConversation (FAST)', () => {
  const mockCards = [
    { card: { name: 'The Fool', meaning_up: 'New beginnings', meaning_rev: 'Recklessness' }, isReversed: false },
    { card: { name: 'The Magician', meaning_up: 'Will power', meaning_rev: 'Manipulation' }, isReversed: true },
    { card: { name: 'The High Priestess', meaning_up: 'Intuition', meaning_rev: 'Secrets' }, isReversed: false }
  ]

  const mockSpreadPreset = { name: 'three-card', cardCount: 3, labels: ['Past', 'Present', 'Future'] }
  const mockResetAndDraw = vi.fn(() => mockCards)

  beforeEach(() => {
    vi.clearAllMocks()
    // Reset sessionStorage for ReadingMemoryService
    sessionStorage.clear()
  })

  describe('successful turn append', () => {
    it('appends a turn with interpretation on success', async () => {
      const mockInterpretation = {
        summary: 'Test summary',
        detailed: 'Test detailed',
        themes: 'Test themes'
      }
      callGemini.mockResolvedValueOnce(mockInterpretation)

      const { result } = renderHook(() => useConversation({ resetAndDraw: mockResetAndDraw }))

      expect(result.current.turns).toHaveLength(0)

      await act(async () => {
        await result.current.submitQuestion('What is my future?', mockSpreadPreset)
      })

      expect(result.current.turns).toHaveLength(1)
      expect(result.current.turns[0]).toMatchObject({
        question: 'What is my future?',
        cards: mockCards,
        interpretation: mockInterpretation
      })
      expect(result.current.turns[0].fallbackInterpretation).toBeUndefined()
      expect(result.current.turns[0].error).toBeUndefined()
    })

    it('calls resetAndDraw with correct card count', async () => {
      callGemini.mockResolvedValueOnce({ summary: 'Test' })

      const { result } = renderHook(() => useConversation({ resetAndDraw: mockResetAndDraw }))

      await act(async () => {
        await result.current.submitQuestion('Test question', mockSpreadPreset)
      })

      expect(mockResetAndDraw).toHaveBeenCalledWith(3)
    })
  })

  describe('error fallback turn', () => {
    it('appends a turn with fallbackInterpretation on API error', async () => {
      callGemini.mockRejectedValueOnce(new Error('API Error'))

      const { result } = renderHook(() => useConversation({ resetAndDraw: mockResetAndDraw }))

      await act(async () => {
        await result.current.submitQuestion('What is my future?', mockSpreadPreset)
      })

      expect(result.current.turns).toHaveLength(1)
      expect(result.current.turns[0]).toMatchObject({
        question: 'What is my future?',
        cards: mockCards,
        interpretation: null,
        error: 'API Error'
      })
      expect(result.current.turns[0].fallbackInterpretation).toBeDefined()
      expect(result.current.turns[0].fallbackInterpretation.summary).toBeDefined()
      expect(result.current.turns[0].fallbackInterpretation.reflections).toBeDefined()
      expect(result.current.turns[0].fallbackInterpretation.connections).toBeDefined()
    })

    it('fallback interpretation includes card data', async () => {
      callGemini.mockRejectedValueOnce(new Error('Network error'))

      const { result } = renderHook(() => useConversation({ resetAndDraw: mockResetAndDraw }))

      await act(async () => {
        await result.current.submitQuestion('Test question', mockSpreadPreset)
      })

      const fallback = result.current.turns[0].fallbackInterpretation
      // Fallback should reference the cards by name
      expect(fallback.summary).toContain('The Fool')
    })
  })

  describe('whitespace rejection', () => {
    it('does not submit empty string', async () => {
      const { result } = renderHook(() => useConversation({ resetAndDraw: mockResetAndDraw }))

      await act(async () => {
        await result.current.submitQuestion('', mockSpreadPreset)
      })

      expect(result.current.turns).toHaveLength(0)
      expect(callGemini).not.toHaveBeenCalled()
      expect(mockResetAndDraw).not.toHaveBeenCalled()
    })

    it('does not submit whitespace-only string', async () => {
      const { result } = renderHook(() => useConversation({ resetAndDraw: mockResetAndDraw }))

      await act(async () => {
        await result.current.submitQuestion('   ', mockSpreadPreset)
      })

      expect(result.current.turns).toHaveLength(0)
      expect(callGemini).not.toHaveBeenCalled()
      expect(mockResetAndDraw).not.toHaveBeenCalled()
    })

    it('does not submit null', async () => {
      const { result } = renderHook(() => useConversation({ resetAndDraw: mockResetAndDraw }))

      await act(async () => {
        await result.current.submitQuestion(null, mockSpreadPreset)
      })

      expect(result.current.turns).toHaveLength(0)
      expect(callGemini).not.toHaveBeenCalled()
    })
  })

  describe('loading state', () => {
    it('isLoading is false after successful completion', async () => {
      callGemini.mockResolvedValueOnce({ summary: 'Done' })

      const { result } = renderHook(() => useConversation({ resetAndDraw: mockResetAndDraw }))

      expect(result.current.isLoading).toBe(false)

      await act(async () => {
        await result.current.submitQuestion('Test', mockSpreadPreset)
      })

      // After completion, loading should be false
      expect(result.current.isLoading).toBe(false)
      expect(result.current.turns).toHaveLength(1)
    })

    it('isLoading is false after error', async () => {
      callGemini.mockRejectedValueOnce(new Error('API Error'))

      const { result } = renderHook(() => useConversation({ resetAndDraw: mockResetAndDraw }))

      await act(async () => {
        await result.current.submitQuestion('Test', mockSpreadPreset)
      })

      // After error, loading should be false (fallback turn added)
      expect(result.current.isLoading).toBe(false)
      expect(result.current.turns).toHaveLength(1)
    })
  })
})
