/**
 * Critical logic tests for geminiClient
 * Tests error handling, timeout behavior, and response parsing.
 *
 * Feature: test-suite-architecture
 * FAST tier test - runs on pre-push
 * Requirements: 4.4, 4.5, 4.6, 4.7
 * 
 * Note: Current implementation is single-attempt (no retry logic).
 * Tests verify current behavior; retry tests marked as skipped placeholders.
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { callGemini } from '../../src/components/Tarot/services/geminiClient'

describe('geminiClient (FAST)', () => {
  const mockPayload = { question: 'test', cards: [], spreadType: 'three-card' }
  
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn())
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  describe('successful response', () => {
    it('returns parsed JSON on success', async () => {
      const mockResponse = { 
        summary: 'Test summary', 
        interpretation: 'Test interpretation' 
      }
      
      globalThis.fetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockResponse)
      })

      const result = await callGemini(mockPayload)
      
      expect(result).toEqual(mockResponse)
      expect(globalThis.fetch).toHaveBeenCalledTimes(1)
    })

    it('sends correct request format', async () => {
      globalThis.fetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({})
      })

      await callGemini(mockPayload)
      
      expect(globalThis.fetch).toHaveBeenCalledWith(
        '/api/gemini',
        expect.objectContaining({
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(mockPayload)
        })
      )
    })
  })

  describe('error handling', () => {
    it('throws on 4xx response (no retry)', async () => {
      globalThis.fetch.mockResolvedValueOnce({
        ok: false,
        status: 400,
        json: () => Promise.resolve({ error: 'Bad request' })
      })

      await expect(callGemini(mockPayload)).rejects.toThrow('Bad request')
      expect(globalThis.fetch).toHaveBeenCalledTimes(1)
    })

    it('throws on 5xx response', async () => {
      globalThis.fetch.mockResolvedValueOnce({
        ok: false,
        status: 500,
        json: () => Promise.resolve({ error: 'Server error' })
      })

      await expect(callGemini(mockPayload)).rejects.toThrow('Server error')
      expect(globalThis.fetch).toHaveBeenCalledTimes(1)
    })

    it('uses fallback message when error body is unparseable', async () => {
      globalThis.fetch.mockResolvedValueOnce({
        ok: false,
        status: 500,
        json: () => Promise.reject(new Error('not JSON'))
      })

      await expect(callGemini(mockPayload)).rejects.toThrow('The oracle is sleeping.')
    })
  })

  describe('timeout handling', () => {
    it('throws timeout error on AbortError', async () => {
      const abortError = new Error('Aborted')
      abortError.name = 'AbortError'
      
      globalThis.fetch.mockRejectedValueOnce(abortError)

      await expect(callGemini(mockPayload)).rejects.toThrow('The oracle took too long to respond. Try again.')
    })
  })

  // Note: Current implementation doesn't have retry logic.
  // These tests document expected behavior if retry is added.
  describe.skip('retry behavior (not yet implemented)', () => {
    it('retries on 5xx response', async () => {
      // Placeholder for when retry logic is added
    })

    it('does not retry on 4xx response', async () => {
      // Placeholder for when retry logic is added
    })

    it('throws after exhausting retries', async () => {
      // Placeholder for when retry logic is added
    })
  })
})
