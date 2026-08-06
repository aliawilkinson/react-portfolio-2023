import { describe, it, expect } from 'vitest'
import { sanitizeText } from '../../src/components/Tarot/utils/sanitizeText'

describe('sanitizeText', () => {
  describe('null/empty input handling', () => {
    it('returns empty string for null', () => {
      expect(sanitizeText(null)).toBe('')
    })

    it('returns empty string for undefined', () => {
      expect(sanitizeText(undefined)).toBe('')
    })

    it('returns empty string for empty string', () => {
      expect(sanitizeText('')).toBe('')
    })

    it('returns empty string for non-string types', () => {
      expect(sanitizeText(123)).toBe('')
      expect(sanitizeText({})).toBe('')
      expect(sanitizeText([])).toBe('')
    })
  })

  describe('malformed sequence removal', () => {
    it('replaces ",." with comma', () => {
      expect(sanitizeText('Love,. growth')).toBe('Love, growth')
    })

    it('replaces ".," with comma', () => {
      expect(sanitizeText('Love., growth')).toBe('Love, growth')
    })

    it('replaces ".,." with comma', () => {
      expect(sanitizeText('Love.,. growth')).toBe('Love, growth')
    })

    it('handles the example: "Love,., growth" → "Love, growth"', () => {
      expect(sanitizeText('Love,., growth')).toBe('Love, growth')
    })

    it('handles the example: "Change..,, transformation" → "Change, transformation"', () => {
      expect(sanitizeText('Change..,, transformation')).toBe('Change, transformation')
    })
  })

  describe('repeated punctuation collapsing', () => {
    it('collapses ".." to "."', () => {
      expect(sanitizeText('end.. start')).toBe('end. start')
    })

    it('collapses ",," to ","', () => {
      expect(sanitizeText('one,, two')).toBe('one, two')
    })

    it('collapses multiple commas to one', () => {
      expect(sanitizeText('one,,, two')).toBe('one, two')
    })

    it('preserves ellipsis "..."', () => {
      expect(sanitizeText('wait... more')).toBe('wait... more')
    })

    it('preserves ellipsis at end of sentence', () => {
      expect(sanitizeText('thinking...')).toBe('thinking...')
    })

    it('preserves ellipsis in middle of text', () => {
      expect(sanitizeText('one... two... three')).toBe('one... two... three')
    })
  })

  describe('whitespace normalization around punctuation', () => {
    it('removes space before comma', () => {
      expect(sanitizeText('word , word')).toBe('word, word')
    })

    it('removes space before period', () => {
      expect(sanitizeText('end . Start')).toBe('end. Start')
    })

    it('ensures space after comma when followed by word', () => {
      expect(sanitizeText('one,two')).toBe('one, two')
    })

    it('ensures space after period when followed by letter', () => {
      expect(sanitizeText('end.Start')).toBe('end. Start')
    })

    it('collapses multiple spaces', () => {
      expect(sanitizeText('too   many   spaces')).toBe('too many spaces')
    })

    it('trims leading and trailing whitespace', () => {
      expect(sanitizeText('  hello  ')).toBe('hello')
    })
  })

  describe('preservation of legitimate punctuation', () => {
    it('preserves normal sentence-ending periods', () => {
      expect(sanitizeText('Hello world.')).toBe('Hello world.')
    })

    it('preserves normal commas in lists', () => {
      expect(sanitizeText('one, two, three')).toBe('one, two, three')
    })

    it('preserves already-clean text unchanged', () => {
      const clean = 'This is perfectly clean text, with commas and periods.'
      expect(sanitizeText(clean)).toBe(clean)
    })
  })

  describe('idempotence', () => {
    it('sanitizing twice gives same result as once', () => {
      const inputs = [
        'Love,., growth',
        'Change..,, transformation',
        'word , word',
        'end.. start',
        'wait... more',
        'already clean text',
      ]
      for (const input of inputs) {
        const once = sanitizeText(input)
        const twice = sanitizeText(once)
        expect(twice).toBe(once)
      }
    })
  })
})
