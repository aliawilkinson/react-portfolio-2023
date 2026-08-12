---
inclusion: auto
---

# UI/UX Design Standards

## Responsive Design
- Mobile-first: write base styles for mobile, then add @media (min-width) breakpoints
- Breakpoints: $sm (640px), $md (820px), $lg (1024px), $xl (1280px)
- Every component must look good on: phone (320-480px), tablet (640-1024px), desktop (1024+)
- Use flexbox with flex-wrap for layouts that need to adapt
- Never use fixed pixel widths without responsive alternatives
- Touch targets: minimum 44px hit area on mobile

## Theme
- Primary: #0D2F3F (dark blue-green)
- Purple accent: #6D4B8A
- Teal accent: #4A90A4
- Error/alert: #C83C63
- Muted text: rgba(13, 47, 63, 0.6)
- Gradients: linear-gradient(135deg, #6D4B8A, #4A90A4)
- Font: Eudoxus Sans
- Border radius: 8px (small), 12px (medium), 16px (large)
- Shadows: subtle on mobile, more pronounced on desktop

## Patterns
- Cards/tiles: rounded corners, subtle shadow, hover elevation
- Buttons: gradient for primary actions, outlined for secondary
- Links: never open same tab for external URLs (target="_blank" rel="noopener noreferrer")
- Loading: spinner + italic text, never block UI
- Errors: subtle inline messages, never modal alerts
- Empty states: centered with illustration/icon + descriptive text
- Scrollable areas: hide scrollbar (scrollbar-width: none)
- Animations: framer-motion for mount/unmount, CSS transitions for hover/state

## Accessibility
- All buttons have aria-labels
- Interactive elements have visible focus states
- Color contrast meets WCAG AA
- Semantic HTML (section, nav, main, etc.)
- Form inputs have labels or aria-label
- Sensitive inputs use data-clarity-mask="true"

## Don'ts
- No inline styles in components
- No hardcoded pixel values without media query alternatives
- No !important unless overriding third-party
- No display:none for elements that need to stay active (use clip/position technique)
- No generic error messages that scare users
- No UI that requires instructions to use
