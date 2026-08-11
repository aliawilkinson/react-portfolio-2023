# Analytics

## Why We Did This

I want to know:

- How many people visit my site?
- What pages do they use?
- Do people click Music?
- Do people use Tarot?
- Do people download my resume?
- Do people click GitHub or LinkedIn?
- What do visitors actually do after they arrive?

Two free tools answer all of this without any privacy concerns or paywalls.

---

## Tools

| Tool | What It Tells You | Dashboard |
|------|-------------------|-----------|
| Vercel Analytics | Traffic numbers, top pages, referrers, devices | [vercel.com/analytics](https://vercel.com/analytics) |
| Microsoft Clarity | Session recordings, heatmaps, click maps, user flows | [clarity.microsoft.com](https://clarity.microsoft.com/projects/view/xzenxh0biq/gettingstarted) |

Cost: $0

---

## How to View Metrics

### Vercel Analytics

1. Go to [vercel.com](https://vercel.com) and log in
2. Select the project
3. Click **Analytics** in the left sidebar
4. You'll see: visitors, page views, top pages, referrers, countries, devices, browsers

This updates in near-realtime after deploy.

### Microsoft Clarity

1. Go to [your Clarity dashboard](https://clarity.microsoft.com/projects/view/xzenxh0biq/gettingstarted) and log in
2. **Dashboard** — overview of sessions, users, pages per session, scroll depth
3. **Recordings** — watch actual user sessions (mouse movement, clicks, scrolling)
4. **Heatmaps** — see where people click and how far they scroll on each page
5. **Insights** — dead clicks, rage clicks, JavaScript errors

Clarity takes ~30 minutes after deploy to start collecting data.

---

## Events Being Tracked

These custom events fire through our analytics service and go to both Vercel and Clarity:

| Category | Event | When It Fires |
|----------|-------|---------------|
| Portfolio | `portfolio_viewed` | Home page loads |
| Portfolio | `resume_downloaded` | Resume download link clicked |
| Portfolio | `github_link_clicked` | GitHub link clicked (header/footer) |
| Portfolio | `linkedin_link_clicked` | LinkedIn link clicked (header/footer) |
| Music | `music_page_viewed` | Music project page loads |
| Music | `music_play_clicked` | SoundCloud play starts |
| Music | `music_pause_clicked` | SoundCloud paused |
| Music | `track_changed` | SoundCloud track changes |
| Tarot | `tarot_reading_started` | User initiates a reading |
| Tarot | `tarot_reading_generated` | AI interpretation completes |
| Tarot | `follow_up_question_asked` | Conversation mode follow-up |
| Contact | `contact_form_opened` | Contact section scrolled into view |
| Contact | `contact_form_submitted` | "Reaching out" link clicked |

---

## Questions You Can Now Answer

| Question | Where to Look |
|----------|---------------|
| How many visitors came? | Vercel Analytics → Visitors |
| Which pages are most popular? | Vercel Analytics → Top Pages |
| How many people viewed music? | Vercel Analytics → filter `/other-projects/music` |
| How many people clicked play? | Clarity → Custom Events → `music_play_clicked` |
| How many tarot readings happened? | Clarity → Custom Events → `tarot_reading_generated` |
| How many resume downloads? | Clarity → Custom Events → `resume_downloaded` |
| Did people click GitHub/LinkedIn? | Clarity → Custom Events → `github_link_clicked` / `linkedin_link_clicked` |
| What do people actually do on the site? | Clarity → Recordings |
| Where do people click most? | Clarity → Heatmaps |

---

## Architecture

Components never call analytics providers directly. Everything goes through:

```js
import { analytics, ANALYTICS_EVENTS } from '../utils/analytics'

analytics.trackEvent(ANALYTICS_EVENTS.RESUME_DOWNLOADED)
```

The service forwards to all registered providers (Vercel + Clarity). If a provider fails, it's caught silently — the site never breaks.

```
src/utils/analytics/
├── index.js              — Registers providers, exports public API
├── analyticsService.js   — AnalyticsService class (registerProvider, trackEvent)
├── events.js             — ANALYTICS_EVENTS constants
└── providers/
    ├── vercelProvider.js   — Wraps @vercel/analytics track()
    ├── clarityProvider.js  — Wraps window.clarity('event', ...)
    └── clarityLoader.js    — Dynamic script injection
```

### Adding a New Provider Later

1. Create `src/utils/analytics/providers/newProvider.js` implementing `{ name, trackEvent }`
2. Import and register it in `index.js`
3. Done — all existing tracking calls automatically forward to it

---

## Environment Variables

| Variable | Required | Where to Set | Purpose |
|----------|----------|--------------|---------|
| `VITE_CLARITY_PROJECT_ID` | No | Vercel env vars | Microsoft Clarity project ID |

Vercel Analytics requires no env vars — it works automatically on Vercel deployments.

For local dev, Clarity is skipped when the env var is absent (console warning is expected).

---

## Privacy

- No cookies
- No personal data collected
- Clarity masks sensitive inputs (tarot questions) via `data-clarity-mask="true"`
- Event names + anonymous metadata only — never user-entered text
- Both tools are GDPR-friendly for anonymous analytics

---

## Setup from Scratch (if needed)

### Vercel Analytics
Already wired up. Just deploy to Vercel and it works.

### Microsoft Clarity
1. Go to [clarity.microsoft.com](https://clarity.microsoft.com), sign in, create project
2. Copy the Project ID from Settings → Overview
3. Add to Vercel: `vercel env add VITE_CLARITY_PROJECT_ID` → paste the ID
4. Redeploy: `vercel --prod`
5. Wait ~30 min, then check the Clarity dashboard
