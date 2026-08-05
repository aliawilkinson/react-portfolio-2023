/**
 * Interpretation Service
 *
 * Generates tarot reading interpretations from drawn cards.
 * All output is framed as self-reflection (not prediction).
 * This is a synchronous service — no API calls.
 *
 * @module interpretationService
 */

/**
 * Generates a complete tarot reading interpretation from drawn cards.
 *
 * @param {Array<{card: {name: string, meaning_up: string, meaning_rev: string}, isReversed: boolean}>} cards
 * @param {string} [question=''] - Optional question for reflection context
 * @returns {{summary: string, reflections: string[], connections: string}}
 */
export const generateInterpretation = (cards, question = '') => {
  const cardSummaries = cards.map((drawn, i) => {
    const meaning = drawn.isReversed ? drawn.card.meaning_rev : drawn.card.meaning_up
    return { name: drawn.card.name, meaning, isReversed: drawn.isReversed, position: i }
  })

  const summary = buildSummary(cardSummaries, question)
  const reflections = buildReflections(cardSummaries, question)
  const connections = buildConnections(cardSummaries)

  return { summary, reflections, connections }
}

/**
 * Builds an overall reading summary incorporating card names and optional question.
 */
function buildSummary(cardSummaries, question) {
  const cardDescriptions = cardSummaries.map(c => {
    const orientation = c.isReversed ? '(reversed)' : '(upright)'
    return `${c.name} ${orientation}`
  })

  const cardList = cardDescriptions.join(', ')

  let summary = ''

  if (question) {
    summary += `Reflecting on your question — "${question}" — `
  } else {
    summary += 'In this reading, '
  }

  if (cardSummaries.length === 1) {
    const card = cardSummaries[0]
    summary += `the card drawn is ${cardList}. ${card.meaning}`
  } else {
    summary += `the cards drawn are ${cardList}. `
    summary += 'Together, they invite you to consider the themes present in your life right now. '
    summary += cardSummaries.map(c => c.meaning.split('.')[0] + '.').join(' ')
  }

  return summary
}

/**
 * Builds reflection prompts derived from card meanings.
 * Each reflection is a question or prompt for self-inquiry.
 */
function buildReflections(cardSummaries, question) {
  const reflections = []

  cardSummaries.forEach(card => {
    const orientation = card.isReversed ? 'reversed' : 'upright'

    // Extract core theme from meaning and turn it into a reflective prompt
    const meaningCore = extractMeaningCore(card.meaning)
    reflections.push(
      `${card.name} (${orientation}) asks you to consider: ${meaningCore}`
    )
  })

  // Add a question-based reflection if provided
  if (question) {
    reflections.push(
      `How does this reading relate to what you asked — "${question}"? What resonates most?`
    )
  }

  // Always add a closing reflection prompt
  reflections.push(
    'What feels true in your body as you read these reflections? That response is worth exploring.'
  )

  return reflections
}

/**
 * Builds a connections narrative linking the cards together.
 */
function buildConnections(cardSummaries) {
  if (cardSummaries.length === 1) {
    const card = cardSummaries[0]
    return `${card.name} stands alone in this reading, offering a focused message. Its energy — ${extractMeaningCore(card.meaning)} — is the single thread to follow right now.`
  }

  const cardNames = cardSummaries.map(c => c.name)
  let connections = `The thread connecting ${cardNames.join(', ')} speaks to a journey unfolding in your inner landscape. `

  // Build pairwise connections
  for (let i = 0; i < cardSummaries.length - 1; i++) {
    const current = cardSummaries[i]
    const next = cardSummaries[i + 1]
    const currentTheme = extractMeaningCore(current.meaning)
    const nextTheme = extractMeaningCore(next.meaning)

    connections += `${current.name} brings the energy of ${currentTheme.toLowerCase()}, which flows into ${next.name}'s invitation toward ${nextTheme.toLowerCase()}. `
  }

  connections += 'Notice how these themes echo or challenge each other — that tension or harmony is where your insight lives.'

  return connections
}

/**
 * Extracts the core theme from a card meaning string.
 * Takes the first sentence or meaningful clause.
 */
function extractMeaningCore(meaning) {
  // Get the first sentence (before first period followed by space or end)
  const firstSentence = meaning.split(/\.\s/)[0]

  // If the sentence is too long, trim to a reasonable length
  if (firstSentence.length > 120) {
    const trimmed = firstSentence.substring(0, 120)
    // Cut at last space to avoid mid-word cuts
    return trimmed.substring(0, trimmed.lastIndexOf(' ')) + '...'
  }

  return firstSentence.endsWith('.') ? firstSentence : firstSentence + '.'
}
