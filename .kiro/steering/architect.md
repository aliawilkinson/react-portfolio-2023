---
inclusion: auto
---

# Architecture Standards

## Tech Stack
- React 18 + Vite
- react-router-dom (client-side routing, SPA)
- SCSS Modules for styling
- Framer Motion for animations
- Vercel deployment (serverless functions in `api/`)
- Vitest + fast-check for testing
- @google/generative-ai for Gemini integration
- @vercel/analytics for page tracking

## Principles
- Mobile-first responsive design using the project's breakpoint variables ($sm: 640px, $md: 820px, $lg: 1024px, $xl: 1280px)
- Components are co-located with their styles (ComponentName.module.scss)
- Shared utilities live in src/utils/
- Hooks live in component-local `hooks/` folders or src/hooks/
- Services live in component-local `services/` folders
- Data/constants live in component-local `data/` folders
- API routes are self-contained in `api/` (no imports from src/ in serverless functions)
- Provider-agnostic service layers (analytics, etc.) with pluggable backends
- State management via React hooks — no external state libraries
- sessionStorage for ephemeral persistence, no localStorage for sensitive data

## Code Patterns
- Named exports for utilities, default exports for components
- SCSS modules with `@use '../../styles/constants.scss' as *` for breakpoints
- Flexbox for layout, grid where appropriate
- No inline styles — everything in SCSS modules
- Error boundaries: services catch errors silently, never break UI
- Environment variables: VITE_ prefix for client-side, plain for server-side (process.env)

## File Organization
```
src/
├── components/{Feature}/
│   ├── Component.jsx
│   ├── Component.module.scss
│   ├── hooks/
│   ├── services/
│   └── data/
├── context/
├── hooks/
├── utils/
│   └── analytics/
└── styles/
api/
tests/
```

## Decisions Log
- Vercel serverless functions must be self-contained (no importing from src/)
- Analytics uses provider-agnostic pattern (AnalyticsService → providers)
- SoundCloud player persists at App level for continuous playback
- Tarot conversation uses bounded context (6 turns + 3 summaries) for token efficiency
- Footer hidden on /tarot and /conversation routes
