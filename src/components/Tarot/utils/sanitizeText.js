/**
 * Sanitizes interpretation text by removing malformed punctuation artifacts.
 *
 * Steps:
 * 1. Replace contiguous malformed punctuation blocks (mixes of periods/commas,
 *    excluding ellipsis) with a single appropriate punctuation mark
 * 2. Normalize spacing around punctuation: "word , word" → "word, word"
 * 3. Trim extra whitespace
 *
 * @param {string|null|undefined} text - The text to sanitize
 * @returns {string} Cleaned text, or empty string for null/empty input
 */
export function sanitizeText(text) {
  if (!text || typeof text !== 'string') {
    return ''
  }

  let result = text

  // 1. Protect ellipsis by replacing with a placeholder
  const ELLIPSIS_PLACEHOLDER = '\u0000ELLIPSIS\u0000'
  result = result.replace(/\.\.\./g, ELLIPSIS_PLACEHOLDER)

  // 2. Replace contiguous blocks of periods and commas (2+ chars) with
  //    a single punctuation mark. If the block contains a comma, use comma;
  //    otherwise use period.
  result = result.replace(/[.,]{2,}/g, (match) => {
    return match.includes(',') ? ',' : '.'
  })

  // 3. Remove remaining single-char malformed sequences that shouldn't exist:
  //    ".,", ",.", ".,." — these are now only possible if they were exactly
  //    those sequences in the original. Handle them:
  result = result.replace(/\.,\./g, ',')
  result = result.replace(/\.,/g, ',')
  result = result.replace(/,\./g, ',')

  // 4. Restore ellipsis
  result = result.replace(new RegExp(ELLIPSIS_PLACEHOLDER, 'g'), '...')

  // 5. Normalize spacing around punctuation
  //    Remove spaces before commas and periods
  result = result.replace(/\s+,/g, ',')
  result = result.replace(/\s+\./g, '.')
  //    Ensure a single space after commas and periods when followed by a word char
  result = result.replace(/,(?=\S)/g, ', ')
  result = result.replace(/\.(?=[A-Za-z])/g, '. ')

  // 6. Collapse multiple spaces into one and trim
  result = result.replace(/\s{2,}/g, ' ')
  result = result.trim()

  return result
}
