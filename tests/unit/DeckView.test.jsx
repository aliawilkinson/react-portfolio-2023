import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import DeckView from '../../src/components/Tarot/DeckView'

describe('DeckView', () => {
  it('renders a face-down deck card with remaining count', () => {
    render(<DeckView remainingCount={78} onDraw={() => {}} isEmpty={false} />)
    expect(screen.getByText('78')).toBeTruthy()
    expect(screen.getByAltText('Tarot card back')).toBeTruthy()
  })

  it('calls onDraw when clicked and deck is not empty', () => {
    const onDraw = vi.fn()
    render(<DeckView remainingCount={52} onDraw={onDraw} isEmpty={false} />)
    const count = screen.getByText('52')
    fireEvent.click(count.closest('[class]'))
    expect(onDraw).toHaveBeenCalledTimes(1)
  })

  it('does not call onDraw when deck is empty', () => {
    const onDraw = vi.fn()
    render(<DeckView remainingCount={0} onDraw={onDraw} isEmpty={true} />)
    const emptyLabel = screen.getByText('Empty')
    fireEvent.click(emptyLabel.closest('[class]'))
    expect(onDraw).not.toHaveBeenCalled()
  })

  it('shows "Empty" label when deck is empty', () => {
    render(<DeckView remainingCount={0} onDraw={() => {}} isEmpty={true} />)
    expect(screen.getByText('Empty')).toBeTruthy()
  })

  it('does not show "Empty" label when deck has cards', () => {
    render(<DeckView remainingCount={30} onDraw={() => {}} isEmpty={false} />)
    expect(screen.queryByText('Empty')).toBeNull()
    expect(screen.getByText('30')).toBeTruthy()
  })
})
