import { track } from '@vercel/analytics'

export const vercelProvider = {
  name: 'vercel',
  trackEvent(eventName, properties) {
    track(eventName, properties)
  }
}
