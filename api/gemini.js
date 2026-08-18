import { GoogleGenerativeAI } from '@google/generative-ai'

// Vercel function config - extend timeout for slow Gemini responses
export const config = {
  maxDuration: 60
}

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

  const SERVER_TIMEOUT_MS = 50000
  const MODEL_FALLBACKS = [model, 'gemini-3.5-flash', 'gemini-3.5-flash-lite']

  try {
    const genAI = new GoogleGenerativeAI(apiKey)
    let result = null
    let usedModel = model

    for (const tryModel of MODEL_FALLBACKS) {
      try {
        const genModel = genAI.getGenerativeModel({
          model: tryModel,
          systemInstruction: SYSTEM_PROMPT
        })

        console.log(`[Gemini] Trying model: ${tryModel}`)

        const chat = genModel.startChat({ history: history || [] })
        result = await Promise.race([
          chat.sendMessage(currentMessage),
          new Promise((_, reject) =>
            setTimeout(() => reject(new Error('Server-side timeout')), SERVER_TIMEOUT_MS)
          )
        ])
        usedModel = tryModel
        break
      } catch (modelErr) {
        const code = modelErr?.status || modelErr?.httpStatusCode || 0
        // Only fallback on model-not-found (404) or overloaded (503). Other errors are real failures.
        if (code === 404 || code === 503) {
          console.warn(`[Gemini] Model ${tryModel} failed (${code}), trying next...`)
          continue
        }
        throw modelErr
      }
    }

    if (!result) {
      throw new Error('All models exhausted')
    }

    console.log(`[Gemini] Success with model: ${usedModel}`)
    const text = result.response.text()
    const interpretation = parseSections(text)

    return res.status(200).json(interpretation)
  } catch (error) {
    const status = error?.status || error?.httpStatusCode || 500
    const msg = error?.message || 'Unknown error'
    console.error(`[Gemini] ${status} - ${msg}`)
    if (error?.errorDetails) console.error('[Gemini] Details:', JSON.stringify(error.errorDetails))

    // Classify the error
    let ntfyTitle, userMessage, httpStatus
    if (status === 429) {
      const isDaily = msg.includes('quota') || msg.includes('exceeded')
      ntfyTitle = isDaily ? 'Gemini Daily Quota Hit' : 'Gemini Per-Minute Limit'
      userMessage = isDaily
        ? 'The oracle has reached its daily limit. AI readings return at midnight Pacific time.'
        : 'The oracle needs a moment to rest. Try again in about a minute.'
      httpStatus = 429
    } else if (status === 401 || status === 403) {
      ntfyTitle = 'Gemini Auth Error'
      userMessage = 'The oracle cannot authenticate. API key may be invalid.'
      httpStatus = status
    } else if (status === 503 || msg.includes('overloaded')) {
      ntfyTitle = 'Gemini Overloaded'
      userMessage = 'The oracle is overwhelmed right now. Try again in a moment.'
      httpStatus = 503
    } else if (msg.includes('timeout') || msg.includes('Server-side timeout')) {
      ntfyTitle = 'Gemini Timeout'
      userMessage = 'The oracle took too long to respond. Try again.'
      httpStatus = 504
    } else {
      ntfyTitle = `Gemini Error (${status})`
      userMessage = 'Something unexpected happened. The oracle will return.'
      httpStatus = 500
    }

    // Always notify
    const ntfyTopic = process.env.NTFY_TOPIC
    if (ntfyTopic) {
      fetch(`https://ntfy.sh/${ntfyTopic}`, {
        method: 'POST',
        headers: { 'Title': ntfyTitle, 'Priority': '4', 'Tags': 'warning' },
        body: `${status} - ${msg.slice(0, 200)}`
      }).catch(() => {})
    }

    return res.status(httpStatus).json({ error: userMessage })
  }
}
