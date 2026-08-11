const SENSITIVE_KEYS = ['question', 'message', 'text', 'content', 'note', 'body']

/**
 * Strips properties that may contain user-entered sensitive content.
 * @param {Record<string, any>} properties
 * @returns {Record<string, any>}
 */
export function sanitizeProperties(properties) {
  if (!properties || typeof properties !== 'object') return {}
  const sanitized = {}
  for (const [key, value] of Object.entries(properties)) {
    if (!SENSITIVE_KEYS.includes(key.toLowerCase())) {
      sanitized[key] = value
    }
  }
  return sanitized
}

export const clarityProvider = {
  name: 'clarity',

  trackEvent(eventName, properties) {
    if (typeof window === 'undefined' || typeof window.clarity !== 'function') {
      return
    }
    window.clarity('event', eventName)
  }
}
