import { describe, it, expect } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import useTarotDeck from '../../src/components/Tarot/hooks/useTarotDeck'
import { tarotDeck } from '../../src/components/Tarot/data/tarotDeck'

describe('useTarotDeck', () => {
  it('initializes with full deck in remainingDeck and empty drawnCards', () => {
    const { result } = renderHook(() => useTarotDeck())

    expect(result.current.remainingDeck).toHaveLength(tarotDeck.length)
    expect(result.current.drawnCards).toHaveLength(0)
    expect(result.current.remainingCount).toBe(tarotDeck.length)
    expect(result.current.isShuffling).toBe(false)
  })

  it('initializes remainingDeck with card and isReversed properties', () => {
    const { result } = renderHook(() => useTarotDeck())

    result.current.remainingDeck.forEach(item => {
      expect(item).toHaveProperty('card')
      expect(item).toHaveProperty('isReversed')
      expect(typeof item.isReversed).toBe('boolean')
      expect(item.card).toHaveProperty('name')
      expect(item.card).toHaveProperty('name_short')
    })
  })

  describe('drawCard', () => {
    it('draws the top card from remaining and adds it to drawn', () => {
      const { result } = renderHook(() => useTarotDeck())
      const topCard = result.current.remainingDeck[0]

      let drawn
      act(() => {
        drawn = result.current.drawCard()
      })

      expect(drawn).toEqual(topCard)
      expect(result.current.drawnCards).toHaveLength(1)
      expect(result.current.drawnCards[0]).toEqual(topCard)
      expect(result.current.remainingDeck).toHaveLength(tarotDeck.length - 1)
      expect(result.current.remainingCount).toBe(tarotDeck.length - 1)
    })

    it('returns null when deck is empty', () => {
      const { result } = renderHook(() => useTarotDeck())

      // Draw all cards using drawMultiple
      act(() => {
        result.current.drawMultiple(tarotDeck.length)
      })

      expect(result.current.remainingCount).toBe(0)

      let drawn
      act(() => {
        drawn = result.current.drawCard()
      })

      expect(drawn).toBeNull()
    })

    it('maintains card order in drawnCards', () => {
      const { result } = renderHook(() => useTarotDeck())

      const first = result.current.remainingDeck[0]
      const second = result.current.remainingDeck[1]

      act(() => {
        result.current.drawCard()
      })
      act(() => {
        result.current.drawCard()
      })

      expect(result.current.drawnCards[0]).toEqual(first)
      expect(result.current.drawnCards[1]).toEqual(second)
    })
  })

  describe('drawMultiple', () => {
    it('draws N cards from the top of the deck', () => {
      const { result } = renderHook(() => useTarotDeck())
      const topThree = result.current.remainingDeck.slice(0, 3)

      let drawn
      act(() => {
        drawn = result.current.drawMultiple(3)
      })

      expect(drawn).toEqual(topThree)
      expect(result.current.drawnCards).toHaveLength(3)
      expect(result.current.remainingDeck).toHaveLength(tarotDeck.length - 3)
    })

    it('draws available cards when count exceeds remaining', () => {
      const { result } = renderHook(() => useTarotDeck())

      // Draw all but 2
      act(() => {
        result.current.drawMultiple(tarotDeck.length - 2)
      })

      let drawn
      act(() => {
        drawn = result.current.drawMultiple(5)
      })

      // Only 2 were available
      expect(drawn).toHaveLength(2)
      expect(result.current.remainingCount).toBe(0)
    })
  })

  describe('shuffleDeck', () => {
    it('sets isShuffling during shuffle and clears it after', async () => {
      const { result } = renderHook(() => useTarotDeck())

      act(() => {
        result.current.shuffleDeck()
      })

      expect(result.current.isShuffling).toBe(true)

      // Wait for setTimeout to complete
      await act(async () => {
        await new Promise(resolve => setTimeout(resolve, 500))
      })

      expect(result.current.isShuffling).toBe(false)
    })

    it('preserves drawn cards after shuffle', async () => {
      const { result } = renderHook(() => useTarotDeck())

      act(() => {
        result.current.drawCard()
        result.current.drawCard()
      })

      const drawnBefore = [...result.current.drawnCards]

      act(() => {
        result.current.shuffleDeck()
      })

      await act(async () => {
        await new Promise(resolve => setTimeout(resolve, 500))
      })

      expect(result.current.drawnCards).toEqual(drawnBefore)
    })

    it('keeps same number of remaining cards after shuffle', async () => {
      const { result } = renderHook(() => useTarotDeck())

      act(() => {
        result.current.drawMultiple(5)
      })

      const remainingBefore = result.current.remainingDeck.length

      act(() => {
        result.current.shuffleDeck()
      })

      await act(async () => {
        await new Promise(resolve => setTimeout(resolve, 500))
      })

      expect(result.current.remainingDeck).toHaveLength(remainingBefore)
    })

    it('preserves the same card set in remaining after shuffle', async () => {
      const { result } = renderHook(() => useTarotDeck())

      act(() => {
        result.current.drawMultiple(5)
      })

      const cardNamesBefore = result.current.remainingDeck
        .map(d => d.card.name_short)
        .sort()

      act(() => {
        result.current.shuffleDeck()
      })

      await act(async () => {
        await new Promise(resolve => setTimeout(resolve, 500))
      })

      const cardNamesAfter = result.current.remainingDeck
        .map(d => d.card.name_short)
        .sort()

      expect(cardNamesAfter).toEqual(cardNamesBefore)
    })
  })

  describe('resetDeck', () => {
    it('returns all cards to remaining and clears drawn', async () => {
      const { result } = renderHook(() => useTarotDeck())

      act(() => {
        result.current.drawMultiple(10)
      })

      expect(result.current.drawnCards).toHaveLength(10)

      act(() => {
        result.current.resetDeck()
      })

      await act(async () => {
        await new Promise(resolve => setTimeout(resolve, 500))
      })

      expect(result.current.remainingDeck).toHaveLength(tarotDeck.length)
      expect(result.current.drawnCards).toHaveLength(0)
      expect(result.current.remainingCount).toBe(tarotDeck.length)
    })

    it('sets isShuffling during reset and clears it after', async () => {
      const { result } = renderHook(() => useTarotDeck())

      act(() => {
        result.current.resetDeck()
      })

      expect(result.current.isShuffling).toBe(true)

      await act(async () => {
        await new Promise(resolve => setTimeout(resolve, 500))
      })

      expect(result.current.isShuffling).toBe(false)
    })
  })
})
