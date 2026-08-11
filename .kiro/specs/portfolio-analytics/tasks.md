# Implementation Plan: Portfolio Analytics

## Overview

Implement a provider-agnostic analytics layer using Vercel Analytics. The work proceeds bottom-up: constants → service → provider → initialization → component integration → tests.

## Tasks

- [x] 1. Set up analytics module structure and constants
  - [x] 1.1 Create `src/utils/analytics/events.js` with all ANALYTICS_EVENTS constants
    - Define all event name constants (portfolio, music, tarot, contact)
    - _Requirements: 9.1_
  - [x] 1.2 Create `src/utils/analytics/analyticsService.js` with the AnalyticsService class
    - Implement `registerProvider(provider)` and `trackEvent(eventName, properties)` with try/catch error handling
    - Export a singleton `analytics` instance
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 8.1, 8.3_
  - [x] 1.3 Create `src/utils/analytics/providers/vercelProvider.js`
    - Import `track` from `@vercel/analytics` and wrap in provider interface
    - _Requirements: 10.4_
  - [x] 1.4 Create `src/utils/analytics/index.js` barrel file
    - Import and register vercelProvider, export `analytics` and `ANALYTICS_EVENTS`
    - _Requirements: 10.1, 10.2_

- [x] 2. Install Vercel Analytics and wire up page view tracking
  - [x] 2.1 Install `@vercel/analytics` package
    - Run `npm install @vercel/analytics`
    - _Requirements: 1.1_
  - [x] 2.2 Add `<Analytics />` component to `App.jsx`
    - Import from `@vercel/analytics/react` and render at root level
    - _Requirements: 1.2, 3.1, 3.2, 3.3_

- [x] 3. Integrate custom events into portfolio and navigation components
  - [x] 3.1 Add GitHub and LinkedIn click tracking to Header and Footer
    - Import `analytics` and `ANALYTICS_EVENTS`, call `trackEvent` on link clicks
    - _Requirements: 4.3, 4.4_
  - [x] 3.2 Add resume download tracking to Resume component
    - Track `RESUME_DOWNLOADED` when the download link is clicked
    - _Requirements: 4.2_
  - [x] 3.3 Add portfolio viewed tracking to the Home component
    - Track `PORTFOLIO_VIEWED` when the home page mounts
    - _Requirements: 4.1_

- [x] 4. Integrate custom events into music, tarot, and contact components
  - [x] 4.1 Add music event tracking to OtherProjectDetail
    - Track `MUSIC_PAGE_VIEWED` on mount for music projects, track play/pause/track-change via SoundCloud Widget API or click handlers
    - _Requirements: 5.1, 5.2, 5.3, 5.4_
  - [x] 4.2 Add tarot event tracking to Tarot.jsx and ConversationMode
    - Track `TAROT_READING_STARTED` on draw, `TAROT_READING_GENERATED` on interpretation complete, `FOLLOW_UP_QUESTION_ASKED` on conversation submissions
    - _Requirements: 6.1, 6.2, 6.3_
  - [x] 4.3 Add contact event tracking to the contact/footer section
    - Track `CONTACT_FORM_OPENED` when contact section is viewed, `CONTACT_FORM_SUBMITTED` on form submission
    - _Requirements: 7.1, 7.2_

- [x] 5. Checkpoint - Verify integration
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 6. Write tests for analytics service
  - [ ]* 6.1 Write property test: Event forwarding to all providers
    - **Property 1: Event forwarding to all providers**
    - **Validates: Requirements 2.2, 10.1**
  - [ ]* 6.2 Write property test: Error resilience across providers
    - **Property 2: Error resilience across providers**
    - **Validates: Requirements 2.3, 8.1, 8.3**
  - [ ]* 6.3 Write property test: Provider registration ordering
    - **Property 3: Provider registration ordering**
    - **Validates: Requirements 10.2**
  - [ ]* 6.4 Write unit tests for event constants and provider interface
    - Verify ANALYTICS_EVENTS exports all expected keys
    - Verify vercelProvider implements the provider interface
    - _Requirements: 9.1, 10.4_

- [x] 7. Final checkpoint
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- The `<Analytics />` component from Vercel handles page views automatically — no per-route code needed
- SoundCloud embeds are iframes, so play/pause/track-change tracking may require the SoundCloud Widget API or wrapper approach
- Property tests use fast-check (already in devDependencies)
