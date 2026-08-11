# Implementation Plan: Microsoft Clarity Analytics Integration

## Overview

Extend the existing analytics provider architecture by adding a Clarity provider, a dynamic script loader, and conditional initialization. No existing files are structurally modified — only `index.js` gains Clarity registration logic.

## Tasks

- [x] 1. Create Clarity script loader
  - [x] 1.1 Create `src/utils/analytics/providers/clarityLoader.js`
    - Implement `loadClarityScript(projectId)` that dynamically injects the Clarity tracking script into the document head
    - Use the official Clarity snippet pattern with the project ID in the script src URL
    - _Requirements: 1.1, 1.4, 1.5_

  - [ ]* 1.2 Write property test for script injection (Property 1)
    - **Property 1: Script injection uses provided project ID**
    - **Validates: Requirements 1.1, 1.5**

- [x] 2. Create Clarity provider
  - [x] 2.1 Create `src/utils/analytics/providers/clarityProvider.js`
    - Implement `clarityProvider` with `name: 'clarity'` and `trackEvent(eventName, properties)` method
    - Check `window.clarity` existence before calling; return silently if unavailable
    - Forward events via `window.clarity('event', eventName)`
    - Implement `sanitizeProperties` function that strips sensitive keys (`question`, `message`, `text`, `content`, `note`, `body`)
    - Export both `clarityProvider` and `sanitizeProperties`
    - _Requirements: 2.1, 2.2, 2.3, 4.1, 4.3, 4.4, 4.5_

  - [ ]* 2.2 Write property test for event forwarding (Property 2)
    - **Property 2: Event forwarding to Clarity API**
    - **Validates: Requirements 2.2**

  - [ ]* 2.3 Write property test for silent failure (Property 3)
    - **Property 3: Silent failure when Clarity is unavailable**
    - **Validates: Requirements 2.3**

  - [ ]* 2.4 Write property test for sensitive property sanitization (Property 4)
    - **Property 4: Sensitive property sanitization**
    - **Validates: Requirements 4.1, 4.3, 4.4, 4.5**

- [x] 3. Checkpoint - Verify provider in isolation
  - Ensure all tests pass, ask the user if questions arise.

- [x] 4. Register Clarity provider with conditional initialization
  - [x] 4.1 Update `src/utils/analytics/index.js` to conditionally register Clarity
    - Import `clarityProvider` and `loadClarityScript`
    - Read `import.meta.env.VITE_CLARITY_PROJECT_ID`
    - If present: call `loadClarityScript(projectId)` and `analytics.registerProvider(clarityProvider)`
    - If absent: log console warning about missing configuration
    - _Requirements: 3.1, 3.2, 3.3, 3.4, 2.4_

  - [ ]* 4.2 Write property test for error isolation (Property 5)
    - **Property 5: Clarity errors do not affect other providers**
    - **Validates: Requirements 5.1, 5.4**

  - [ ]* 4.3 Write unit tests for conditional initialization
    - Test that Clarity is registered when env var is present
    - Test that Clarity is skipped and warning logged when env var is absent
    - _Requirements: 3.1, 3.2, 3.3_

- [x] 5. Add Clarity content masking to sensitive inputs
  - [x] 5.1 Add `data-clarity-mask="true"` attribute to sensitive form elements
    - Tarot question input field
    - Contact form message textarea
    - _Requirements: 4.2_

- [x] 6. Add environment variable to example config
  - [x] 6.1 Add `VITE_CLARITY_PROJECT_ID` to `.env.local.example` with a comment
    - _Requirements: 1.5, 3.1_

- [x] 7. Add Clarity documentation
  - [x] 7.1 Create or update analytics documentation with Clarity setup instructions
    - How to create a Microsoft Clarity project
    - Where to find the Project ID in the Clarity dashboard
    - VITE_CLARITY_PROJECT_ID environment variable configuration
    - Local development behavior (no tracking without the env var)
    - _Requirements: 6.1, 6.2, 6.3, 6.4_

- [x] 8. Final checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- No existing analytics files are structurally modified except `index.js` (additive change)
- The existing AnalyticsService error handling already protects against provider failures
- Property tests use `fast-check` with minimum 100 iterations
