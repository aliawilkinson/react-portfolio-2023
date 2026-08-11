class AnalyticsService {
  constructor() {
    this.providers = []
  }

  registerProvider(provider) {
    this.providers.push(provider)
  }

  trackEvent(eventName, properties = {}) {
    for (const provider of this.providers) {
      try {
        provider.trackEvent(eventName, properties)
      } catch (error) {
        // Silently swallow — analytics must never break the site
      }
    }
  }
}

export const analytics = new AnalyticsService()
