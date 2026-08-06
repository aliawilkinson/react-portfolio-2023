# Implementation Plan: Conversation Mode with Gemini-Powered Tarot Interpretation

## Overview

Implement a Conversation Mode feature that adds a new `/conversation` route to the existing Tarot application. The feature reuses existing deck logic, card components, and spread presets while adding Gemini API integration via a Vercel serverless function. All new code lives in `src/components/Tarot/` except for the thin Vercel API entry point.

## Tasks

- [ ] 1. Set up Gemini server-side handler and API route
  - [ ] 1.1 Create `src/components/Tarot/services/geminiHandler.js` with the Gemini API handler logic
    - Install `@google/generative-ai` dependency
    - Implement the handler function that reads `process.env.GEMINI_API_KEY` and `process.env.GEMINI_MODEL`
    - Include the system prompt for tarot interpretation
    - Implement `parseSections()` to extract Summary, Interpretation, Key Themes, Reflection Questions, Actionable Insights from Gemini response text
    - Handle errors: 405 for non-POST, 400 for missing fields, 500 for missing API key or Gemini failures
    - _Requirements: 4.1, 4.2, 4.3, 4.6, 5.1, 5.2_

  - [ ] 1.2 Create `api/gemini.js` as thin Vercel entry point
    - Import and re-export the handler from `src/components/Tarot/services/geminiHandler.js`
    - _Requirements: 5.5_

  - [ ]* 1.3 Write unit tests for geminiHandler
    - Test parseSections with various response formats
    - Test error responses (405, 400, 500)
    - Test that system prompt is included in Gemini call
    - **Property 7: Interpretation Section Parsing**
    - **Validates: Requirements 4.4**

- [ ] 2. Create Gemini frontend client
  - [ ] 2.1 Create `src/components/Tarot/services/geminiClient.js`
    - Implement `callGemini(payload)` function that POSTs to `/api/gemini`
    - Implement 30-second timeout with AbortController
    - Throw descriptive error on non-OK response
    - Throw timeout-specific message on AbortError
    - _Requirements: 5.3, 5.4, 5.6, 8.1, 8.4_

  - [ ]* 2.2 Write unit tests for geminiClient
    - Test successful response parsing
    - Test error thrown on non-OK response
    - Test timeout message on AbortError
    - _Requirements: 8.1, 8.4_

- [ ] 3. Create useConversation hook
  - [ ] 3.1 Create `src/components/Tarot/hooks/useConversation.js`
    - Manage turns array, currentCards, isLoading, error state
    - Implement `submitQuestion(questionText, spreadPreset)` — draws cards via resetAndDraw, calls Gemini, creates turn, appends to history
    - Implement `retryLastInterpretation()` — retries Gemini with same cards on error
    - Prevent empty/whitespace question submission
    - Auto-reset deck after successful interpretation (via resetAndDraw on next submission)
    - _Requirements: 3.1, 3.2, 3.3, 3.5, 6.1, 6.2, 7.1, 7.2, 7.3, 8.2, 8.3, 9.1, 9.3_

  - [ ]* 3.2 Write property tests for useConversation
    - **Property 2: Empty Question Rejection**
    - **Validates: Requirements 3.5**

  - [ ]* 3.3 Write property tests for conversation turn structure
    - **Property 5: Turn Structural Invariant**
    - **Validates: Requirements 9.1, 9.3**

  - [ ]* 3.4 Write property tests for payload completeness
    - **Property 3: Gemini Payload Completeness**
    - **Validates: Requirements 4.1**

- [ ] 4. Checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 5. Create Conversation Mode UI components
  - [ ] 5.1 Create `src/components/Tarot/ConversationInput.jsx`
    - Text input with placeholder "Ask a question for your tarot reading..."
    - Analyze/Submit button, disabled when input empty or loading
    - Enter key submits, clears input after submission
    - _Requirements: 2.2, 2.3, 3.1, 3.5_

  - [ ] 5.2 Create `src/components/Tarot/ConversationTurn.jsx`
    - Render question, cards (via Spread component), and interpretation sections
    - Display all 5 interpretation sections with labels
    - Render markdown content if present
    - _Requirements: 6.5, 4.4, 4.5_

  - [ ] 5.3 Create `src/components/Tarot/ConversationHistory.jsx`
    - Scrollable container rendering all turns via ConversationTurn
    - Auto-scroll to bottom when new turn added
    - _Requirements: 2.1, 6.1, 6.2_

  - [ ] 5.4 Create `src/components/Tarot/LoadingIndicator.jsx`
    - Spinner and "Interpreting your cards..." message
    - _Requirements: 2.5_

  - [ ] 5.5 Create `src/components/Tarot/ConversationMode.jsx` (main page component)
    - Import and wire useTarotDeck, useConversation, Spread, ConversationHistory, ConversationInput, LoadingIndicator
    - Display current cards during loading state
    - Display error message with retry button on failure
    - Use existing SPREAD_PRESETS (default to three-card)
    - Apply existing Tarot styling/theme
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 3.4, 8.1, 8.3, 8.4, 9.2_

  - [ ]* 5.6 Write unit tests for ConversationInput
    - Test empty submission prevention
    - Test input clearing after submit
    - Test disabled state during loading
    - _Requirements: 3.5_

- [ ] 6. Add routing and entry point button
  - [ ] 6.1 Add `/conversation` route to `src/App.jsx`
    - Lazy-load ConversationMode component
    - Add route with Suspense wrapper
    - _Requirements: 1.3_

  - [ ] 6.2 Add "Conversation Mode" button to existing Tarot page
    - Add button with tooltip text to Tarot.jsx
    - Use react-router-dom Link or navigate to /conversation on click
    - _Requirements: 1.1, 1.2_

- [ ] 7. Add SCSS styles for Conversation Mode
  - [ ] 7.1 Add conversation mode styles to `src/components/Tarot/Tarot.module.scss`
    - Style conversationWrapper, conversationHistory, conversationTurn, conversationInput, loadingIndicator
    - Match existing Tarot app theme and styling patterns
    - _Requirements: 2.6_

- [ ] 8. Update Vercel and environment configuration
  - [ ] 8.1 Update `vercel.json` to support the API route alongside the SPA rewrite
    - Ensure `/api/gemini` is handled as a serverless function
    - Keep existing SPA rewrite for all other routes
    - _Requirements: 5.5_

  - [ ] 8.2 Create `.env.local.example` documenting required environment variables
    - Document GEMINI_API_KEY and GEMINI_MODEL
    - _Requirements: 5.1, 5.2_

- [ ] 9. Final checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.
  - Verify existing tarot tests still pass (no regression)
  - _Requirements: 9.6_

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- All new source files live in `src/components/Tarot/` except the thin `api/gemini.js` Vercel entry point
- The `@google/generative-ai` npm package needs to be installed as a dependency
- Property tests use fast-check (already installed) with vitest (already configured)
- Existing tarot functionality must not be modified or regressed
