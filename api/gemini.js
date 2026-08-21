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

// Default fallback model - used when GEMINI_MODEL isn't set
const DEFAULT_MODEL = 'gemini-2.5-flash'

// Cache cooldown: only update cached model once per day (24 hours)
const CACHE_COOLDOWN_MS = 24 * 60 * 60 * 1000

// Local model cache - populated on first request when GEMINI_FLASH_MODELS env is empty
let localModelCache = null
let localCacheTimestamp = 0
const LOCAL_CACHE_TTL_MS = 24 * 60 * 60 * 1000 // 24 hours

/**
 * Fetch flash models from Gemini API for local development.
 * Caches results for 24 hours to avoid excessive API calls.
 */
async function getLocalFlashModels(apiKey) {
  const now = Date.now()
  
  // Return cached if still valid
  if (localModelCache && (now - localCacheTimestamp) < LOCAL_CACHE_TTL_MS) {
    return localModelCache
  }

  try {
    console.log('[Gemini] Fetching model list for local development...')
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`
    )

    if (!response.ok) {
      console.warn(`[Gemini] Failed to fetch models: ${response.status}`)
      return []
    }

    const data = await response.json()
    const flashModels = data.models
      .filter(m =>
        m.name.includes('flash') &&
        m.supportedGenerationMethods?.includes('generateContent') &&
        !m.name.includes('preview') &&
        !m.name.includes('tts') &&
        !m.name.includes('image')
      )
      .map(m => m.name.replace('models/', ''))
      .sort((a, b) => b.localeCompare(a)) // Newest first

    console.log(`[Gemini] Cached ${flashModels.length} flash models locally:`, flashModels.slice(0, 5))
    
    localModelCache = flashModels
    localCacheTimestamp = now
    return flashModels
  } catch (err) {
    console.error('[Gemini] Error fetching models:', err.message)
    return []
  }
}

/**
 * Update the GEMINI_MODEL env var when we successfully fallback to a different model.
 * This "caches" the working model so future requests try it first.
 * 
 * Respects a 24-hour cooldown to avoid excessive Vercel API calls.
 * Fire and forget - don't block the response.
 */
async function cacheWorkingModel(newModel, currentConfiguredModel) {
  // Only cache if we actually fell back to a different model
  if (newModel === currentConfiguredModel) return

  const token = process.env.VERCEL_API_TOKEN
  const projectId = process.env.VERCEL_PROJECT_ID
  if (!token || !projectId) {
    console.log('[Gemini] Cannot cache model - missing VERCEL_API_TOKEN or VERCEL_PROJECT_ID')
    return
  }

  try {
    // Get existing env vars
    const listResp = await fetch(
      `https://api.vercel.com/v10/projects/${projectId}/env`,
      { headers: { Authorization: `Bearer ${token}` } }
    )
    const envData = await listResp.json()
    
    // Check cooldown - only cache once per day
    const cachedAtVar = envData.envs?.find(e => e.key === 'GEMINI_MODEL_CACHED_AT')
    if (cachedAtVar) {
      const lastCacheTime = parseInt(cachedAtVar.value, 10)
      const elapsed = Date.now() - lastCacheTime
      if (elapsed < CACHE_COOLDOWN_MS) {
        console.log(`[Gemini] Cache cooldown active (${Math.round(elapsed / 3600000)}h elapsed, need 24h). Skipping.`)
        return
      }
    }

    const existingModelVar = envData.envs?.find(e => e.key === 'GEMINI_MODEL')

    // Delete old model var if exists
    if (existingModelVar) {
      await fetch(
        `https://api.vercel.com/v10/projects/${projectId}/env/${existingModelVar.id}`,
        { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } }
      )
    }

    // Create new with working model
    await fetch(
      `https://api.vercel.com/v10/projects/${projectId}/env`,
      {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          key: 'GEMINI_MODEL',
          value: newModel,
          target: ['production', 'preview', 'development'],
          type: 'plain'
        })
      }
    )

    // Update the cache timestamp
    if (cachedAtVar) {
      await fetch(
        `https://api.vercel.com/v10/projects/${projectId}/env/${cachedAtVar.id}`,
        { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } }
      )
    }
    await fetch(
      `https://api.vercel.com/v10/projects/${projectId}/env`,
      {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          key: 'GEMINI_MODEL_CACHED_AT',
          value: String(Date.now()),
          target: ['production', 'preview', 'development'],
          type: 'plain'
        })
      }
    )

    console.log(`[Gemini] Cached working model: ${newModel} (was: ${currentConfiguredModel})`)
  } catch (err) {
    console.error('[Gemini] Failed to cache working model:', err.message)
  }
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const apiKey = process.env.GEMINI_API_KEY
  const configuredModel = process.env.GEMINI_MODEL || DEFAULT_MODEL

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
  
  // Build fallback chain: configured model first, then discovered models, then hardcoded defaults
  // In production: use GEMINI_FLASH_MODELS env var (populated by cron job)
  // Locally: fetch models directly from Gemini API (cached for 24h)
  let discoveredModels = (process.env.GEMINI_FLASH_MODELS || '').split(',').filter(Boolean)
  
  // If no discovered models in env (local dev), fetch them
  if (discoveredModels.length === 0) {
    discoveredModels = await getLocalFlashModels(apiKey)
  }
  
  const defaultFallbacks = ['gemini-2.5-flash', 'gemini-2.0-flash', 'gemini-1.5-flash']
  const MODEL_FALLBACKS = [configuredModel, ...discoveredModels, ...defaultFallbacks]
    .filter((m, i, arr) => m && arr.indexOf(m) === i) // dedupe and remove empty

  try {
    const genAI = new GoogleGenerativeAI(apiKey)
    let result = null
    let usedModel = configuredModel
    let hadToFallback = false

    for (let i = 0; i < MODEL_FALLBACKS.length; i++) {
      const tryModel = MODEL_FALLBACKS[i]
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
        hadToFallback = i > 0 // First model is the configured one
        break
      } catch (modelErr) {
        const code = modelErr?.status || modelErr?.httpStatusCode || 0
        // Fallback on: model not found (404), overloaded (503), or rate limited (429)
        if (code === 404 || code === 503 || code === 429) {
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

    // If we had to fallback, cache the working model for future requests
    if (hadToFallback) {
      // Fire and forget - don't block the response
      cacheWorkingModel(usedModel, configuredModel).catch(() => {})
    }

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
