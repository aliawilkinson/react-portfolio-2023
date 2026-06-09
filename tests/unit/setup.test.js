import { describe, it, expect } from 'vitest'
import fc from 'fast-check'

describe('Test infrastructure', () => {
  it('vitest is configured and running', () => {
    expect(true).toBe(true)
  })

  it('fast-check is available', () => {
    fc.assert(
      fc.property(fc.integer(), (n) => {
        return typeof n === 'number'
      })
    )
  })

  it('jsdom environment is active', () => {
    expect(typeof document).toBe('object')
    expect(typeof window).toBe('object')
  })
})
