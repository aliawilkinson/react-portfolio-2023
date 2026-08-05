import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import Controls from '../../src/components/Tarot/Controls'

describe('Controls', () => {
  const defaultProps = {
    onReset: vi.fn(),
    onShuffle: vi.fn(),
    onAutoMode: vi.fn(),
    isShuffling: false,
    hasDrawnCards: false
  }

  it('renders Reset Deck and Shuffle Deck buttons', () => {
    render(<Controls {...defaultProps} />)
    expect(screen.getByText('Reset Deck')).toBeTruthy()
    expect(screen.getByText('Shuffle Deck')).toBeTruthy()
  })

  it('renders Auto Mode buttons for 1, 3, and 5 cards', () => {
    render(<Controls {...defaultProps} />)
    expect(screen.getByText('Auto Mode:')).toBeTruthy()
    expect(screen.getByText('1 Card')).toBeTruthy()
    expect(screen.getByText('3 Cards')).toBeTruthy()
    expect(screen.getByText('5 Cards')).toBeTruthy()
  })

  it('calls onReset when Reset Deck is clicked', () => {
    const onReset = vi.fn()
    render(<Controls {...defaultProps} onReset={onReset} />)
    fireEvent.click(screen.getByText('Reset Deck'))
    expect(onReset).toHaveBeenCalledTimes(1)
  })

  it('calls onShuffle when Shuffle Deck is clicked', () => {
    const onShuffle = vi.fn()
    render(<Controls {...defaultProps} onShuffle={onShuffle} />)
    fireEvent.click(screen.getByText('Shuffle Deck'))
    expect(onShuffle).toHaveBeenCalledTimes(1)
  })

  it('disables Shuffle Deck button while shuffling', () => {
    render(<Controls {...defaultProps} isShuffling={true} />)
    const shuffleBtn = screen.getByText('Shuffling...')
    expect(shuffleBtn.disabled).toBe(true)
  })

  it('shows "Shuffling..." text while shuffling', () => {
    render(<Controls {...defaultProps} isShuffling={true} />)
    expect(screen.getByText('Shuffling...')).toBeTruthy()
    expect(screen.queryByText('Shuffle Deck')).toBeNull()
  })

  it('calls onAutoMode with correct count for each auto button', () => {
    const onAutoMode = vi.fn()
    render(<Controls {...defaultProps} onAutoMode={onAutoMode} />)

    fireEvent.click(screen.getByText('1 Card'))
    expect(onAutoMode).toHaveBeenCalledWith(1)

    fireEvent.click(screen.getByText('3 Cards'))
    expect(onAutoMode).toHaveBeenCalledWith(3)

    fireEvent.click(screen.getByText('5 Cards'))
    expect(onAutoMode).toHaveBeenCalledWith(5)
  })
})
