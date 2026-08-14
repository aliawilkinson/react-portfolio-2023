# Implementation Plan: Conversation Mode UX Fix

## Overview

Transform the conversation mode from a fixed-viewport layout to a full-page chat-like interface with sticky input, localStorage persistence, conversation export, and proper mobile/desktop responsive behavior. All changes target existing files plus a few new service modules.

## Tasks

- [ ] 1. Create persistence and export service modules
  - [ ] 1.1 Create `src/components/Tarot/services/conversationPersistence.js`
    - Implement `save(turns)`, `load()`, and `clear()` methods
    - Use localStorage with key `tarot_conversation_turns`
    - Handle corrupted/missing data gracefully (return empty array)
    - Serialize turns to a flat structure (card name, image, reversed, meaning)
    - _Requirements: 5.1, 5.2, 5.3, 5.4_

  - [ ]* 1.2 Write property tests for conversationPersistence
    - **Property 5: Persistence round-trip**
    - **Validates: Requirements 5.1, 5.2**
    - **Property 6: Corrupted localStorage produces empty state**
    - **Validates: Requirements 5.3**

  - [ ] 1.3 Create `src/components/Tarot/services/exportService.js`
    - Implement `exportConversation(turns)` function
    - Serialize all turns to plain text with delimiters, question, cards, interpretation
    - Generate filename with current date (`tarot-conversation-YYYY-MM-DD.txt`)
    - Trigger browser download via Blob + object URL
    - No-op if turns array is empty
    - _Requirements: 6.2, 6.3, 6.4_

  - [ ]* 1.4 Write property test for exportService
    - **Property 7: Export serialization contains all turn data**
    - **Validates: Requirements 6.2**

- [ ] 2. Checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 3. Refactor useConversation hook for persistence
  - [ ] 3.1 Update `src/components/Tarot/hooks/useConversation.js`
    - Initialize `turns` state from `conversationPersistence.load()` on mount
    - After each successful turn (AI or fallback), call `conversationPersistence.save(updatedTurns)`
    - Add `clearConversation()` function that resets turns to `[]` and calls `conversationPersistence.clear()`
    - Ensure fallback turns are still appended to history (no regression)
    - _Requirements: 4.1, 4.4, 5.1, 5.2, 5.4_

  - [ ]* 3.2 Write property tests for turn list integrity
    - **Property 3: Turn list integrity (append-only, chronological)**
    - **Validates: Requirements 4.1, 4.2**
    - **Property 4: Fallback turns are appended on API failure**
    - **Validates: Requirements 4.4**

- [ ] 4. Create useIsAtBottom scroll-tracking hook
  - [ ] 4.1 Create `src/components/Tarot/hooks/useIsAtBottom.js`
    - Track window scroll position with passive scroll listener
    - Return boolean: true if user is within 100px of document bottom
    - Default to true on mount (so first turn auto-scrolls)
    - _Requirements: 8.4_

  - [ ]* 4.2 Write property test for scroll-lock behavior
    - **Property 8: Auto-scroll respects user scroll position**
    - **Validates: Requirements 8.4**

- [ ] 5. Refactor ConversationMode layout and page structure
  - [ ] 5.1 Update `src/components/Tarot/ConversationMode.jsx`
    - Remove fixed-height wrapper (no `height: 90dvh`, no `overflow: hidden`)
    - Remove inner scroll container ref and scroll logic
    - Use `useIsAtBottom` hook to conditionally auto-scroll on new turns
    - Add `useEffect` to set/remove `conversationActive` class on `document.body`
    - Add top bar with export button (disabled when no turns) and clear button
    - Pass `clearConversation` and export handler as actions
    - Render turn list as a plain flex column (no overflow container)
    - _Requirements: 1.1, 1.2, 1.3, 1.4, 4.3, 6.1, 8.3, 8.4_

  - [ ] 5.2 Update `src/components/Tarot/ConversationInput.jsx`
    - Remove the `translateY` transform-based keyboard workaround
    - Rely on `position: sticky` + `env(safe-area-inset-bottom)` for keyboard handling
    - Keep visualViewport listener as iOS fallback only if sticky doesn't suffice
    - Keep existing auto-expand logic (already correct)
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 3.1, 3.2, 3.3, 3.4_

  - [ ]* 5.3 Write property test for textarea auto-expand
    - **Property 1: Textarea height is bounded by content lines**
    - **Validates: Requirements 2.3, 3.2, 3.3**
    - **Property 2: Submit resets textarea to initial state**
    - **Validates: Requirements 2.4, 3.4**

- [ ] 6. Update SCSS for chat-like layout
  - [ ] 6.1 Update `src/components/Tarot/Tarot.module.scss` conversation styles
    - Replace `.convWrapper` fixed-height layout with `.convPage` full-page flex column
    - Replace `.convMessages` overflow container with `.convTurnList` (no overflow, natural flow)
    - Update `.convInputBar` to use `position: sticky; bottom: 0` instead of flex-shrink
    - Add mobile card scroll container styles (horizontal overflow-x on mobile)
    - Keep existing responsive breakpoints ($sm, $md, $lg)
    - _Requirements: 1.1, 2.1, 7.2, 7.3, 8.1, 8.2_

  - [ ] 6.2 Add header-hiding styles
    - Add global rule: when `body.conversationActive` at `max-width: 639px`, hide header wrapper
    - This can go in the Tarot module SCSS or a small global override
    - _Requirements: 1.2, 1.3_

- [ ] 7. Update ConversationTurn for inline card display
  - [ ] 7.1 Update `src/components/Tarot/ConversationTurn.jsx`
    - Render cards as compact inline thumbnails (smaller than full Spread)
    - On mobile: wrap in a horizontally scrollable container
    - On desktop: use flex-wrap layout
    - Ensure persisted turns (which have flat card data) render correctly
    - _Requirements: 7.1, 7.2, 7.3_

- [ ] 8. Final checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- The existing `ReadingMemoryService` (sessionStorage, Gemini history) is NOT modified — the new `conversationPersistence` module handles UI turn persistence separately
- Property tests use `fast-check` library for randomized input generation
- Each property test references its design document property number
