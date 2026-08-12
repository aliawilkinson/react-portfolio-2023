---
inclusion: auto
---

# Code Review & Testing Standards

## Before Shipping Checklist
- [ ] All existing tests still pass (npx vitest --run)
- [ ] No TypeScript/lint errors (getDiagnostics on modified files)
- [ ] Responsive on mobile, tablet, desktop
- [ ] No inline styles — everything in SCSS modules
- [ ] External links open in new tab
- [ ] No hardcoded API keys or secrets
- [ ] Error states handled gracefully (no crashes, no ugly messages)
- [ ] Analytics events fire for new user interactions
- [ ] Accessibility: aria-labels, focus states, semantic HTML

## Testing
- Unit tests for new logic (services, hooks, utilities)
- Property-based tests for core invariants (fast-check)
- Don't mock unless absolutely necessary
- Tests should be meaningful, not just for coverage numbers
- Run tests after every change, not just at the end

## Code Quality
- Match existing patterns — don't introduce new patterns without good reason
- Keep files small and focused
- Extract reusable logic into hooks or services
- Constants in dedicated files, never hardcoded strings in components
- Comments only where the "why" isn't obvious from the code

## CSS Review
- Uses project breakpoints ($sm, $md, $lg, $xl)
- Mobile styles first, desktop overrides via @media (min-width)
- Flexbox/grid for layout
- No magic numbers — use rem/em, reference constants
- Shadow, radius, colors match the theme

## Deployment
- Vercel serverless functions are self-contained (no src/ imports)
- Environment variables documented in .env.local.example
- vercel.json rewrites handle SPA + API routes correctly
- Build passes clean (npm run build)
