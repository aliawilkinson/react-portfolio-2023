import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import QuestionInput from '../../src/components/Tarot/QuestionInput'

const defaultProps = {
  question: '',
  onQuestionChange: () => {},
  onAnalyze: () => {},
  onSubmitQuestion: () => {},
  onReset: () => {}
}

describe('QuestionInput', () => {
  it('renders a textarea with the correct placeholder', () => {
    render(<QuestionInput {...defaultProps} />)
    const input = screen.getByPlaceholderText('What would you like to reflect on?')
    expect(input).toBeTruthy()
  })

  it('renders an Analyze button', () => {
    render(<QuestionInput {...defaultProps} />)
    const button = screen.getByRole('button', { name: 'Analyze' })
    expect(button).toBeTruthy()
  })

  it('displays the current question value', () => {
    render(<QuestionInput {...defaultProps} question="Will I find love?" />)
    const input = screen.getByPlaceholderText('What would you like to reflect on?')
    expect(input.value).toBe('Will I find love?')
  })

  it('calls onQuestionChange when user types', () => {
    const onQuestionChange = vi.fn()
    render(<QuestionInput {...defaultProps} onQuestionChange={onQuestionChange} />)
    const input = screen.getByPlaceholderText('What would you like to reflect on?')
    fireEvent.change(input, { target: { value: 'New question' } })
    expect(onQuestionChange).toHaveBeenCalledWith('New question')
  })

  it('calls onAnalyze when button is clicked with a question', () => {
    const onAnalyze = vi.fn()
    render(<QuestionInput {...defaultProps} question="My question" onAnalyze={onAnalyze} />)
    const button = screen.getByRole('button', { name: 'Analyze' })
    fireEvent.click(button)
    expect(onAnalyze).toHaveBeenCalledTimes(1)
  })

  it('shows hint popup when Analyze is clicked with empty question', () => {
    render(<QuestionInput {...defaultProps} />)
    const button = screen.getByRole('button', { name: 'Analyze' })
    fireEvent.click(button)
    expect(screen.getByText('feel free to ask a question and we will analyze :)')).toBeTruthy()
  })

  it('renders a Reset button', () => {
    render(<QuestionInput {...defaultProps} />)
    const button = screen.getByRole('button', { name: 'Reset' })
    expect(button).toBeTruthy()
  })

  it('calls onReset when Reset button is clicked', () => {
    const onReset = vi.fn()
    render(<QuestionInput {...defaultProps} onReset={onReset} />)
    const button = screen.getByRole('button', { name: 'Reset' })
    fireEvent.click(button)
    expect(onReset).toHaveBeenCalledTimes(1)
  })
})
