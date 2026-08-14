/**
 * Interpretation Service
 *
 * Generates tarot reading interpretations from drawn cards.
 * All output is framed as self-reflection (not prediction).
 * This is a synchronous service, no API calls.
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
  const cardSummaries = cards.map((drawn) => {
    const meaning = drawn.isReversed ? drawn.card.meaning_rev : drawn.card.meaning_up
    return { name: drawn.card.name, meaning, isReversed: drawn.isReversed }
  })

  const summary = buildSummary(cardSummaries, question)
  const reflections = buildReflections(cardSummaries, question)
  const connections = buildConnections(cardSummaries)

  return { summary, reflections, connections }
}

/**
 * Summary: Each card, its orientation, and its meaning. Just the facts.
 */
function buildSummary(cardSummaries, question) {
  let summary = question ? `Question: "${question}"\n\n` : ''

  cardSummaries.forEach(c => {
    const orientation = c.isReversed ? 'Reversed' : 'Upright'
    summary += `${c.name} (${orientation})\n${c.meaning}\n\n`
  })

  return summary.trim()
}

/**
 * Reflections: One question per card to sit with. Not the meaning again.
 */
function buildReflections(cardSummaries, question) {
  const prompts = cardSummaries.map(card => {
    const core = getFirstSentence(card.meaning)
    if (card.isReversed) {
      return `Where in your life might "${core.toLowerCase()}" be showing up?`
    }
    return `What would it look like to fully embrace "${core.toLowerCase()}"?`
  })

  if (question) {
    prompts.push(`Looking at all three cards together: what do they say about "${question}"?`)
  }

  return prompts
}

/**
 * Connections: A short narrative linking the cards as a story arc.
 */
function buildConnections(cardSummaries) {
  if (cardSummaries.length === 1) {
    return `${cardSummaries[0].name} stands alone. Its message is your entire focus.`
  }

  if (cardSummaries.length === 2) {
    return `${cardSummaries[0].name} sets the scene. ${cardSummaries[1].name} is where it's heading.`
  }

  // 3+ cards: beginning, middle, end arc
  const first = cardSummaries[0]
  const middle = cardSummaries[Math.floor(cardSummaries.length / 2)]
  const last = cardSummaries[cardSummaries.length - 1]

  return `${first.name} is where you're coming from. ${middle.name} is what you're moving through. ${last.name} is what's emerging.`
}

/**
 * Gets the first sentence from a meaning string.
 */
function getFirstSentence(meaning) {
  const match = meaning.match(/^[^.!?]+[.!?]/)
  return match ? match[0].trim() : meaning.split('.')[0].trim()
}
