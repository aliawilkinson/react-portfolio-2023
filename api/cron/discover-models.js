/**
 * Cron job: Discover available Gemini Flash models
 * Runs weekly, fetches model list from Google, stores in Vercel env var
 * 
 * Schedule: Every Sunday at 3am UTC (0 3 * * 0)
 */

export const config = {
  maxDuration: 30
}

export default async function handler(req, res) {
  const apiKey = process.env.GEMINI_API_KEY
  const vercelToken = process.env.VERCEL_API_TOKEN
  const projectId = process.env.VERCEL_PROJECT_ID
  const cronSecret = process.env.CRON_SECRET
  const ntfyTopic = process.env.NTFY_TOPIC

  // Auth check for cron
  const authHeader = req.headers.authorization
  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    console.log('[ModelDiscovery] Unauthorized request')
    return res.status(401).json({ error: 'Unauthorized' })
  }

  console.log('[ModelDiscovery] Starting model discovery...')

  try {
    // Fetch available models from Gemini API
    const modelsResponse = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`
    )

    if (!modelsResponse.ok) {
      throw new Error(`Gemini API error: ${modelsResponse.status}`)
    }

    const data = await modelsResponse.json()

    // Filter to flash models that support generateContent
    const flashModels = data.models
      .filter(m => 
        m.name.includes('flash') && 
        m.supportedGenerationMethods?.includes('generateContent') &&
        !m.name.includes('preview') &&  // Skip preview models
        !m.name.includes('tts') &&       // Skip text-to-speech
        !m.name.includes('image')        // Skip image models
      )
      .map(m => m.name.replace('models/', ''))
      .sort((a, b) => b.localeCompare(a)) // Newest first (higher version numbers)

    console.log(`[ModelDiscovery] Found ${flashModels.length} flash models:`, flashModels)

    if (flashModels.length === 0) {
      throw new Error('No flash models found')
    }

    // Store in Vercel env var
    if (vercelToken && projectId) {
      const envVarName = 'GEMINI_FLASH_MODELS'
      const envValue = flashModels.join(',')

      // Get existing env vars to find the ID
      const listResponse = await fetch(
        `https://api.vercel.com/v10/projects/${projectId}/env`,
        { headers: { Authorization: `Bearer ${vercelToken}` } }
      )

      if (!listResponse.ok) {
        throw new Error(`Vercel API list error: ${listResponse.status}`)
      }

      const envData = await listResponse.json()
      const existingVar = envData.envs?.find(e => e.key === envVarName)

      if (existingVar) {
        // Delete and recreate (most reliable for updates)
        await fetch(
          `https://api.vercel.com/v10/projects/${projectId}/env/${existingVar.id}`,
          { 
            method: 'DELETE',
            headers: { Authorization: `Bearer ${vercelToken}` } 
          }
        )
        console.log(`[ModelDiscovery] Deleted existing ${envVarName}`)
      }

      // Create new
      const createResponse = await fetch(
        `https://api.vercel.com/v10/projects/${projectId}/env`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${vercelToken}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            key: envVarName,
            value: envValue,
            target: ['production', 'preview', 'development'],
            type: 'plain'
          })
        }
      )

      if (!createResponse.ok) {
        const errText = await createResponse.text()
        throw new Error(`Vercel API create error: ${createResponse.status} - ${errText}`)
      }

      console.log(`[ModelDiscovery] Updated ${envVarName} with ${flashModels.length} models`)

      // Also update the last discovery timestamp (for cooldown logic)
      const timestampVar = envData.envs?.find(e => e.key === 'GEMINI_LAST_DISCOVERY')
      if (timestampVar) {
        await fetch(
          `https://api.vercel.com/v10/projects/${projectId}/env/${timestampVar.id}`,
          { method: 'DELETE', headers: { Authorization: `Bearer ${vercelToken}` } }
        )
      }
      await fetch(
        `https://api.vercel.com/v10/projects/${projectId}/env`,
        {
          method: 'POST',
          headers: { Authorization: `Bearer ${vercelToken}`, 'Content-Type': 'application/json' },
          body: JSON.stringify({
            key: 'GEMINI_LAST_DISCOVERY',
            value: String(Date.now()),
            target: ['production', 'preview', 'development'],
            type: 'plain'
          })
        }
      )
      console.log('[ModelDiscovery] Updated discovery timestamp')
    } else {
      console.log('[ModelDiscovery] Skipping Vercel update (missing token or project ID)')
    }

    // Notify success
    if (ntfyTopic) {
      await fetch(`https://ntfy.sh/${ntfyTopic}`, {
        method: 'POST',
        headers: { Title: 'Model Discovery Complete', Priority: '3', Tags: 'white_check_mark' },
        body: `Found ${flashModels.length} flash models: ${flashModels.slice(0, 5).join(', ')}${flashModels.length > 5 ? '...' : ''}`
      }).catch(() => {})
    }

    return res.status(200).json({
      success: true,
      models: flashModels,
      count: flashModels.length
    })

  } catch (error) {
    console.error('[ModelDiscovery] Error:', error.message)

    // Notify failure
    if (ntfyTopic) {
      await fetch(`https://ntfy.sh/${ntfyTopic}`, {
        method: 'POST',
        headers: { Title: 'Model Discovery Failed', Priority: '5', Tags: 'rotating_light' },
        body: error.message
      }).catch(() => {})
    }

    return res.status(500).json({ error: error.message })
  }
}
