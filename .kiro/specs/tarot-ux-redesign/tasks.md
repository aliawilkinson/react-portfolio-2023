# Implementation Plan: Tarot UX Redesign

## Overview

Unify /tarot and /conversation into a single page with Classic and AI modes. Simplify controls, update card data with keywords, rewrite the static interpretation service for spread-aware readings, update the Gemini system prompt for context-aware interpretations, and wire everything together with analytics and routing.

## Tasks

- [-] 1. Update tarot deck data with keywords field
  - [-] 1.1 Add `keywords` array (3-5 traditional tarot keywords) to each of the 78 cards in `src/components/Tarot/data/tarotDeck.js`
    - Each card gets a keywords array of 3-5 strings using traditional Rider-Waite terminology
    - Verify meaning_up and meaning_rev are 2-3 sentences of traditional tarot language (rewrite any that use tech metaphors)
    - _Requirements: 6.1, 6.2, 6.3, 6.4, 6.5_
  - [ ]* 1.2 Write property tests for deck data integrity
    - **Property 8: Deck contains 78 cards with correct type distribution**
    - **Property 9: All cards have appropriately-lengthed meanings**
    - **Property 10: All cards have 3-5 keywords**
    - **Validates: Requirements 6.1, 6.2, 6.3, 6.4**

- [x] 2. Rewrite static interpretation service for Classic mode
  - [x] 2.1 Refactor `interpretationService.js` to produce spread-aware static interpretations
    - Accept cards array and spread preset (with labels)
    - Return `{ summary, cardReadings: [{cardName, position, isReversed, meaning}], spreadInsight }`
    - Generate position-aware narrative using spread labels (Past/Present/Future, Celtic Cross positions)
    - _Requirements: 3.2, 3.3_
  - [ ]* 2.2 Write property tests for static interpretation service
    - **Property 3: Static interpretation produced for any valid input**
    - **Validates: Requirements 3.3**

- [x] 3. Update Gemini system prompt for context-aware interpretations
  - [x] 3.1 Update the system prompt in `geminiHandler.js` with question-type detection and perspective adaptation
    - Add question type detection instructions (Love, Career, Self/Growth, General)
    - Add perspective adaptation rules per question type
    - Update response structure to: Brief Insight → Card-by-Card → Themes → One Reflection Question
    - Reference traditional RWS symbolism (imagery, numerology, suit elements)
    - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5, 5.6, 5.7_
  - [ ]* 3.2 Write property test for parseSections
    - **Property 7: parseSections extracts structured sections from formatted text**
    - **Validates: Requirements 5.7**

- [x] 4. Create new UI components (ModeToggle, SpreadSelector)
  - [x] 4.1 Create `ModeToggle` component
    - Pill/tab style toggle with "Classic" and "AI Reading" options
    - Use `role="tablist"` and `aria-selected` for accessibility
    - Fire analytics event on mode change
    - _Requirements: 1.1, 1.2, 2.5, 9.4_
  - [x] 4.2 Create `SpreadSelector` component
    - Three buttons: Single Card, Three Card, Celtic Cross
    - Use `role="radiogroup"` and `aria-checked` for accessibility
    - Reference SPREAD_PRESETS data
    - _Requirements: 2.1_
  - [x] 4.3 Refactor `InterpretationDisplay` component
    - Accept either Classic static interpretation or AI interpretation object
    - Render card-by-card meanings with position labels in Classic mode
    - Render structured AI response sections in AI mode
    - _Requirements: 3.2, 3.3, 4.2_

- [x] 5. Build UnifiedTarot page component
  - [x] 5.1 Create `UnifiedTarot.jsx` replacing `Tarot.jsx`
    - Manage mode state ('classic' | 'ai') with URL param support (?mode=ai)
    - Integrate ModeToggle, SpreadSelector, QuestionInput, Draw button, Reset button
    - In Classic mode: use useTarotDeck + refactored interpretationService
    - In AI mode: use useTarotDeck + useConversation + ReadingMemoryService
    - Display ConversationHistory in AI mode when turns exist
    - Keep text size toggle (existing accessibility feature)
    - Remove: Auto Mode buttons, Shuffle button, DeckView, deck count
    - _Requirements: 1.1, 1.2, 1.3, 2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 2.7, 3.1, 3.4, 4.1, 4.3, 4.4, 4.5, 10.1, 10.3_
  - [ ]* 5.2 Write property tests for draw count and reset behavior
    - **Property 1: Draw count matches spread selection**
    - **Property 4: Reset clears all state**
    - **Validates: Requirements 3.1, 3.5**
  - [ ]* 5.3 Write property test for AI mode payload
    - **Property 5: AI mode sends correct payload**
    - **Validates: Requirements 4.1**

- [x] 6. Checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [x] 7. Update routing and backward compatibility
  - [x] 7.1 Update router configuration
    - Change /tarot route to render UnifiedTarot
    - Add /conversation redirect to /tarot?mode=ai using Navigate with replace
    - Remove ConversationMode as a separate route
    - _Requirements: 7.1, 7.2, 7.3, 1.4_

- [x] 8. Wire analytics events
  - [x] 8.1 Add analytics event tracking to UnifiedTarot
    - Fire TAROT_READING_STARTED when draw begins
    - Fire TAROT_READING_GENERATED when interpretation completes (both modes)
    - Fire FOLLOW_UP_QUESTION_ASKED on follow-up submission in AI mode
    - Fire mode change event on Mode_Toggle interaction
    - _Requirements: 9.1, 9.2, 9.3, 9.4_
  - [ ]* 8.2 Write property tests for analytics events
    - **Property 11: Analytics events fire for completed readings**
    - **Property 12: Analytics event fires on follow-up questions**
    - **Property 13: Analytics event fires on mode switch**
    - **Validates: Requirements 9.1, 9.2, 9.3, 9.4**

- [x] 9. Styling and responsive layout
  - [x] 9.1 Write styles for UnifiedTarot, ModeToggle, and SpreadSelector
    - Follow existing Tarot.module.scss patterns and project media query breakpoints
    - ModeToggle: pill/tab style with clear active state
    - SpreadSelector: horizontal on desktop, wrap/stack on mobile
    - Ensure Mode_Toggle and controls are tappable on mobile
    - _Requirements: 8.1, 8.2, 8.3_

- [x] 10. Cleanup and integration
  - [x] 10.1 Remove deprecated components and update imports
    - Delete or deprecate: Controls.jsx, DeckView.jsx (no longer used)
    - Keep ConversationMode.jsx file but it's no longer routed (or delete if router handles redirect)
    - Update any imports referencing removed components
    - _Requirements: 2.7, 7.3_
  - [ ]* 10.2 Write property test for deck reversal randomization
    - **Property 14: Drawn cards have randomized reversal assignment**
    - **Validates: Requirements 10.2**
  - [ ]* 10.3 Write property test for ReadingMemoryService turn order
    - **Property 6: ReadingMemoryService preserves turn order**
    - **Validates: Requirements 4.4**

- [x] 11. Final checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- The existing `useTarotDeck` hook is preserved as-is (no modifications needed)
- The existing `useConversation` hook is reused in AI mode with minimal changes
- `ReadingMemoryService` is preserved unchanged — it already handles multi-turn memory
- Property tests use fast-check (already in the project) with minimum 100 iterations
- Card data update (task 1) is the largest manual effort — 78 cards need keywords added
