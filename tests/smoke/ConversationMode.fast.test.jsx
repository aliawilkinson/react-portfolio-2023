/**
 * Smoke test for ConversationMode component
 * Verifies the component renders without crashing.
 *
 * Feature: test-suite-architecture
 * FAST tier test - runs on pre-push
 */

import { describe, it, expect, vi } from 'vitest'
import { renderWithProviders } from '../helpers/renderWithProviders'
import ConversationMode from '../../src/components/Tarot/ConversationMode'

// Mock geminiClient to prevent network requests
vi.mock('../../src/components/Tarot/services/geminiClient', () => ({
  callGemini: vi.fn().mockResolvedValue({
    summary: 'Test summary',
    interpretation: 'Test interpretation',
    keyThemes: 'Test themes',
    reflectionQuestions: 'Test questions',
    actionableInsights: 'Test insights'
  })
}))

// Mock analytics to prevent tracking calls during tests
vi.mock('../../src/utils/analytics', () => ({
  analytics: { trackEvent: vi.fn() },
  ANALYTICS_EVENTS: {
    TAROT_READING_STARTED: 'tarot_reading_started',
    TAROT_READING_GENERATED: 'tarot_reading_generated',
    FOLLOW_UP_QUESTION_ASKED: 'follow_up_question_asked'
  }
}))

describe('ConversationMode smoke test', () => {
  it('renders without crashing', () => {
    expect(() => renderWithProviders(<ConversationMode />, { route: '/conversation' })).not.toThrow()
  })

  it('renders content (not empty)', () => {
    const { container } = renderWithProviders(<ConversationMode />, { route: '/conversation' })
    
    // Check that something rendered (not an empty container)
    expect(container.innerHTML.length).toBeGreaterThan(0)
  })
})
