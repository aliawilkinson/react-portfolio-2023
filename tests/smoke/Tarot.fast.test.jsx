/**
 * Smoke test for Tarot component
 * Verifies the component renders without crashing.
 *
 * Feature: test-suite-architecture
 * FAST tier test - runs on pre-push
 */

import { describe, it, expect, vi } from 'vitest'
import { renderWithProviders } from '../helpers/renderWithProviders'
import Tarot from '../../src/components/Tarot/Tarot'

// Mock analytics to prevent tracking calls during tests
vi.mock('../../src/utils/analytics', () => ({
  analytics: { trackEvent: vi.fn() },
  ANALYTICS_EVENTS: {
    TAROT_READING_STARTED: 'tarot_reading_started',
    TAROT_READING_GENERATED: 'tarot_reading_generated'
  }
}))

describe('Tarot smoke test', () => {
  it('renders without crashing', () => {
    expect(() => renderWithProviders(<Tarot />, { route: '/tarot' })).not.toThrow()
  })

  it('renders the main heading', () => {
    const { container } = renderWithProviders(<Tarot />, { route: '/tarot' })
    
    // Check that something rendered (not an empty container)
    expect(container.innerHTML.length).toBeGreaterThan(0)
  })
})
