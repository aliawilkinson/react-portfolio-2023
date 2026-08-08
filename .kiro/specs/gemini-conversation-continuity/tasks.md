# Implementation Plan: Gemini Conversation Continuity

## Overview

Implement multi-turn conversation continuity by creating a ReadingMemoryService, updating the Gemini handler to use `startChat()`, and wiring everything through the existing useConversation hook. The implementation uses JavaScript with the existing project structure.

## Tasks

- [ ] 1. Implement ReadingMemoryService
  - [ ] 1.1 Create ReadingMemoryService class in `src/components/Tarot/services/readingMemoryService.js`
    - Implement constructor with `turns` and `summaries` arrays
    - Implement `addTurn(role, content)` that stores `{ role, content, timestamp }` and persists to sessionStorage
    - Implement `getSessionHistory()` that returns all stored turns
    - Implement `clear()` method
    - Implement `_persistToStorage()` with try/catch for sessionStorage writes
    - Implement `_restoreFromStorage()` with try/catch for sessionStorage reads and JSON parse errors
    - _Requirements: 3.1, 3.2, 3.3, 7.1, 7.2, 7.4_

  - [ ] 1.2 Implement `saveReading()` and `getRecentReadingSummaries()`
    - `saveReading({ question, cards, interpretationText })` extracts a ≤100 word thematic summary and stores `{ question, cards, summary }`
    - `getRecentReadingSummaries()` returns the last 3 summaries
    - Summary extraction: take first 2-3 sentences from interpretation that capture key themes, truncate to 100 words
    - _Requirements: 2.1, 2.2, 2.3, 6.1, 6.3_

  - [ ] 1.3 Implement `buildGeminiHistory()`
    - Construct history array with reading summaries context first (last 3 summaries as a user/model pair), then recent conversation turns (last 6)
    - Format each entry as `{ role: "user" | "model", parts: [{ text }] }` per Gemini SDK
    - Cap at TURN_LIMIT=6 turns and SUMMARY_LIMIT=3 summaries
    - _Requirements: 4.1, 4.2, 4.5, 5.1, 1.2, 6.4_

  - [ ]* 1.4 Write property tests for ReadingMemoryService
    - Install fast-check as a dev dependency
    - **Property 1: Turn storage produces correctly structured turns**
    - **Property 2: Summary generation is bounded and complete**
    - **Property 3: History respects the 6-turn cap using most recent turns**
    - **Property 4: History respects the 3-summary cap**
    - **Property 5: History ordering — summaries before turns**
    - **Property 6: History entries match Gemini SDK format**
    - **Property 7: getSessionHistory returns all stored turns in order**
    - **Property 8: Session persistence round-trip**
    - **Validates: Requirements 1.2, 2.1, 2.2, 2.3, 3.1, 3.2, 3.3, 4.1, 4.2, 4.5, 5.1, 6.2, 6.3, 7.1, 7.2**

- [ ] 2. Checkpoint - Verify ReadingMemoryService
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 3. Update server-side Gemini handler
  - [ ] 3.1 Modify `src/components/Tarot/services/geminiHandler.js` to accept `history` in request body
    - Switch from `generateContent(userPrompt)` to `startChat({ history: history || [] })` then `chat.sendMessage(currentMessage)`
    - Extract a `buildCurrentMessage(question, cards, spreadType)` helper function
    - Keep the existing `parseSections()` function and system prompt unchanged
    - _Requirements: 1.1, 1.3, 1.4, 5.2, 5.3, 5.4_

  - [ ]* 3.2 Write property test for current message construction
    - **Property 9: Current message contains cards and question**
    - **Validates: Requirements 5.3, 5.4**

- [ ] 4. Update geminiClient to pass history
  - [ ] 4.1 Modify `src/components/Tarot/services/geminiClient.js` to include `history` field in the POST payload
    - The `callGemini` function signature already accepts a payload object; add `history` as an optional field
    - No changes to timeout or error handling logic
    - _Requirements: 1.1_

- [ ] 5. Integrate ReadingMemoryService into useConversation hook
  - [ ] 5.1 Update `src/components/Tarot/hooks/useConversation.js`
    - Instantiate ReadingMemoryService via `useState(() => new ReadingMemoryService())`
    - In `submitQuestion`: after drawing cards, call `memoryService.addTurn("user", questionText)`
    - Before calling `callGemini`: call `memoryService.buildGeminiHistory()` and include result in payload
    - After successful interpretation: call `memoryService.addTurn("model", interpretationText)` and `memoryService.saveReading({ question, cards, interpretationText })`
    - Update `retryLastInterpretation` similarly to include history
    - _Requirements: 3.2, 3.3, 3.4, 2.1, 4.1, 5.1_

  - [ ]* 5.2 Write unit tests for useConversation integration
    - Verify history is passed to callGemini on second+ questions
    - Verify first question sends empty history
    - Verify turns are added on success, not on failure
    - _Requirements: 1.1, 1.3, 8.1, 8.3_

- [ ] 6. Final checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.
  - Verify no regression to existing conversation mode functionality
  - _Requirements: 8.1, 8.2, 8.3, 8.4_

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- fast-check is the property-based testing library for JavaScript
- The existing `parseSections` function and SYSTEM_PROMPT remain unchanged
- sessionStorage persistence is best-effort — the feature works without it
