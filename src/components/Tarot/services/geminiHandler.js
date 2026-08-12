import { GoogleGenerativeAI } from '@google/generative-ai'

const SYSTEM_PROMPT = `You are an experienced tarot guide.

Tarot is a symbolic reflection tool for insight, self-exploration, journaling, and personal reflection.

Do not claim to predict the future.
Do not present interpretations as facts.
Interpret the cards symbolically and psychologically.
Use the user's question and the tarot cards together to create a thoughtful reading.

Provide your response in these sections:
1. Summary
2. Interpretation
3. Key Themes
4. Reflection Questions
5. Actionable Insights

Avoid fear-based language, certainty, supernatural claims, or deterministic predictions.
Maintain a warm, conversational tone.`

export function parseSections(text) {
  const sections = {
    summary: '',
    detailed: '',
    themes: '',
    reflectionQuestions: '',
    actionableInsights: ''
  }

  const sectionPatterns = [
    { key: 'summary', pattern: /(?:^|\n)#+?\s*(?:1\.?\s*)?Summary\s*\n([\s\S]*?)(?=\n#+?\s*(?:2\.?\s*)?(?:Interpretation|Detailed|$))/i },
    { key: 'detailed', pattern: /(?:^|\n)#+?\s*(?:2\.?\s*)?(?:Interpretation|Detailed Interpretation)\s*\n([\s\S]*?)(?=\n#+?\s*(?:3\.?\s*)?(?:Key Themes|Themes|$))/i },
    { key: 'themes', pattern: /(?:^|\n)#+?\s*(?:3\.?\s*)?(?:Key Themes|Themes(?:\s*and\s*Patterns)?)\s*\n([\s\S]*?)(?=\n#+?\s*(?:4\.?\s*)?(?:Reflection Questions|$))/i },
    { key: 'reflectionQuestions', pattern: /(?:^|\n)#+?\s*(?:4\.?\s*)?Reflection Questions\s*\n([\s\S]*?)(?=\n#+?\s*(?:5\.?\s*)?(?:Actionable Insights|$))/i },
    { key: 'actionableInsights', pattern: /(?:^|\n)#+?\s*(?:5\.?\s*)?Actionable Insights\s*\n([\s\S]*?)$/i }
  ]

  for (const { key, pattern } of sectionPatterns) {
    const match = text.match(pattern)
    if (match) {
      sections[key] = match[1].trim()
    }
  }

  // Fallback: if no sections matched, put everything in summary
  if (!sections.summary && !sections.detailed) {
    sections.summary = text.trim()
  }

  return sections
}

/**
 * Constructs the current message with cards and question for sendMessage().
 * @param {string} question - The user's question
 * @param {Array<{name: string, reversed: boolean}>} cards - Cards drawn
 * @param {string} spreadType - The spread type name
 * @returns {string} Formatted message
 */
export function buildCurrentMessage(question, cards, spreadType) {
  return `Question: "${question}"

Spread Type: ${spreadType || 'General'}

Cards drawn:
${cards.map((c, i) => `${i + 1}. ${c.name}${c.reversed ? ' (Reversed)' : ' (Upright)'}`).join('\n')}

Please interpret these cards in relation to the question.`
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const apiKey = process.env.GEMINI_API_KEY
  const model = process.env.GEMINI_MODEL || 'gemini-2.5-flash'

  if (!apiKey) {
    return res.status(500).json({ error: 'Gemini API key not configured' })
  }

  const { question, cards, spreadType, history } = req.body

  if (!question || !cards || !Array.isArray(cards)) {
    return res.status(400).json({ error: 'Missing required fields: question, cards' })
  }

  const currentMessage = buildCurrentMessage(question, cards, spreadType)

  try {
    const genAI = new GoogleGenerativeAI(apiKey)
    const genModel = genAI.getGenerativeModel({
      model,
      systemInstruction: SYSTEM_PROMPT
    })

    console.log(`[Gemini] Using model: ${model}`)

    // Use startChat with provided history for multi-turn conversation
    const chat = genModel.startChat({ history: history || [] })
    const result = await chat.sendMessage(currentMessage)
    const text = result.response.text()
    const interpretation = parseSections(text)

    return res.status(200).json(interpretation)
  } catch (error) {
    console.error('Gemini API error:', error)
    return res.status(500).json({ error: 'Unable to generate interpretation. Please try again.' })
  }
}
