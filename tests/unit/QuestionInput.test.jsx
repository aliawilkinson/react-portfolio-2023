import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import QuestionInput from '../../src/components/Tarot/QuestionInput'

describe('QuestionInput', () => {
  it('renders a text input with the correct placeholder', () => {
    render(
      <QuestionInput question="" onQuestionChange={() => {}} onAnalyze={() => {}} />
    )
    const input = screen.getByPlaceholderText('What would you like to reflect on?')
    expect(input).toBeTruthy()
    expect(input.type).toBe('text')
  })

  it('renders an Analyze button', () => {
    render(
      <QuestionInput question="" onQuestionChange={() => {}} onAnalyze={() => {}} />
    )
    const button = screen.getByRole('button', { name: 'Analyze' })
    expect(button).toBeTruthy()
  })

  it('displays the current question value in the input', () => {
    render(
      <QuestionInput question="Will I find love?" onQuestionChange={() => {}} onAnalyze={() => {}} />
    )
    const input = screen.getByPlaceholderText('What would you like to reflect on?')
    expect(input.value).toBe('Will I find love?')
  })

  it('calls onQuestionChange when user types', () => {
    const onQuestionChange = vi.fn()
    render(
      <QuestionInput question="" onQuestionChange={onQuestionChange} onAnalyze={() => {}} />
    )
    const input = screen.getByPlaceholderText('What would you like to reflect on?')
    fireEvent.change(input, { target: { value: 'New question' } })
    expect(onQuestionChange).toHaveBeenCalledWith('New question')
  })

  it('calls onAnalyze when button is clicked', () => {
    const onAnalyze = vi.fn()
    render(
      <QuestionInput question="" onQuestionChange={() => {}} onAnalyze={onAnalyze} />
    )
    const button = screen.getByRole('button', { name: 'Analyze' })
    fireEvent.click(button)
    expect(onAnalyze).toHaveBeenCalledTimes(1)
  })
})
