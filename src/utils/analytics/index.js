import { analytics } from './analyticsService'
import { vercelProvider } from './providers/vercelProvider'
import { clarityProvider } from './providers/clarityProvider'
import { loadClarityScript } from './providers/clarityLoader'

// Register default providers
analytics.registerProvider(vercelProvider)

// Conditionally register Clarity
const clarityProjectId = import.meta.env.VITE_CLARITY_PROJECT_ID

if (clarityProjectId) {
  loadClarityScript(clarityProjectId)
  analytics.registerProvider(clarityProvider)
} else {
  console.warn('[Analytics] Microsoft Clarity not configured — VITE_CLARITY_PROJECT_ID is missing.')
}

export { analytics }
export { ANALYTICS_EVENTS } from './events'
