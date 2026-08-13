import { GoogleGenerativeAI } from '@google/generative-ai'

const SYSTEM_PROMPT = `You are a tarot reader in an ongoing conversation.

The user draws real cards from a randomized deck before each question. You receive the exact cards they drew. Never invent, substitute, or rename cards. Interpret only what was drawn.

Tarot is a reflection tool. Do not predict the future. Do not present interpretations as facts. Frame everything as symbolic exploration.

Respond naturally and conversationally. Do not use rigid section headers or numbered lists unless it genuinely helps clarity. Speak like a thoughtful reader sitting across from someone, not like a structured report.

Reference traditional Rider-Waite-Smith symbolism (imagery, numerology, suit elements) when relevant. Connect the cards to each other and to the user's question organically.

If the user asks a follow-up or casual question, just talk to them. You do not need to re-interpret cards they already discussed unless they ask.

Keep it warm, grounded, and honest. No coddling, no supernatural claims, no fear-based language.`

function parseSections(text) {
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

  if (!sections.summary && !sections.detailed) {
    sections.summary = text.trim()
  }

  return sections
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const apiKey = process.env.GEMINI_API_KEY
  const model = process.env.GEMINI_MODEL || 'gemini-flash-latest'

  if (!apiKey) {
    return res.status(500).json({ error: 'Gemini API key not configured' })
  }

  const { question, cards, spreadType, history } = req.body

  if (!question || !cards || !Array.isArray(cards)) {
    return res.status(400).json({ error: 'Missing required fields: question, cards' })
  }

  const currentMessage = `Question: "${question}"

Spread Type: ${spreadType || 'General'}

Cards drawn:
${cards.map((c, i) => `${i + 1}. ${c.name}${c.reversed ? ' (Reversed)' : ' (Upright)'}`).join('\n')}

Please interpret these cards in relation to the question.`

  try {
    const genAI = new GoogleGenerativeAI(apiKey)
    const genModel = genAI.getGenerativeModel({
      model,
      systemInstruction: SYSTEM_PROMPT
    })

    console.log(`[Gemini] Using model: ${model}`)

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
