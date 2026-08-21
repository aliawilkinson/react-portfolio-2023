# Implementation Plan: Test Suite Architecture

## Overview

Implements a two-tier test architecture with file-suffix-based tier assignment, a pre-push git hook, component smoke tests, critical logic tests, and property-based tests for deck randomization. Each task builds incrementally — infrastructure first, then tests, then the hook.

## Tasks

- [x] 1. Configure Vitest workspace and scripts
  - [x] 1.1 Update vitest.config.js to define `fast` and `full` projects using include patterns (`.fast.test.{js,jsx}` for fast, all patterns for full)
    - _Requirements: 1.1, 1.2, 1.4, 1.5_
  - [x] 1.2 Update package.json scripts: add `test:fast`, `test:full`, and `test:install-hooks`
    - _Requirements: 1.1, 1.2_

- [x] 2. Create test helpers and fix existing tests
  - [x] 2.1 Create `tests/helpers/renderWithProviders.jsx` with MemoryRouter wrapper utility
    - _Requirements: 3.3_
  - [x] 2.2 Fix `tests/unit/interpretationService.test.js` to match current implementation (remove the "frames output as self-reflection" test that asserts reflective language not present in current code, fix any other assertion mismatches)
    - _Requirements: 7.1, 7.2_

- [x] 3. Extract deck utility for testability
  - [x] 3.1 Create `src/components/Tarot/utils/deckUtils.js` exporting `shuffleArray` as a pure function
    - _Requirements: 5.1_
  - [x] 3.2 Update `src/components/Tarot/hooks/useTarotDeck.js` to import `shuffleArray` from `deckUtils.js` instead of defining it inline
    - _Requirements: 5.1_

- [x] 4. Implement smoke tests (FAST tier)
  - [x] 4.1 Create `tests/smoke/Tarot.fast.test.jsx` — verify Tarot component renders without crashing (mock geminiClient module, provide MemoryRouter)
    - _Requirements: 3.2, 3.4, 3.5_
  - [x] 4.2 Create `tests/smoke/ConversationMode.fast.test.jsx` — verify ConversationMode renders without crashing (mock geminiClient, provide MemoryRouter)
    - _Requirements: 3.1, 3.4, 3.5_

- [x] 5. Implement critical logic tests (FAST tier)
  - [x] 5.1 Create `tests/unit/interpretationService.fast.test.js` — test output shape, orientation-correct meaning selection, handles 1/2/3+ cards
    - _Requirements: 4.1, 4.2, 4.3_
  - [x] 5.2 Create `tests/unit/geminiClient.fast.test.js` — test 5xx retry, 4xx no-retry, timeout retry, retry exhaustion throws (mock globalThis.fetch)
    - _Requirements: 4.4, 4.5, 4.6, 4.7_
  - [x] 5.3 Create `tests/unit/useConversation.fast.test.js` — test successful turn append, error fallback turn, whitespace rejection (mock callGemini module, use renderHook)
    - _Requirements: 6.1, 6.2, 6.3, 6.4_

- [x] 6. Checkpoint
  - Ensure all FAST tier tests pass with `npm run test:fast`. Verify execution time is under 10 seconds. Ask the user if questions arise.

- [ ] 7. Implement property-based tests (FULL tier)
  - [ ]* 7.1 Create `tests/property/deckRandomization.property.test.js` — Property 6: shuffle preserves deck contents
    - **Property 6: Shuffle preserves deck contents**
    - **Validates: Requirements 5.1**
  - [ ]* 7.2 Add to `tests/property/deckRandomization.property.test.js` — Property 7: draw partitions deck correctly
    - **Property 7: Draw partitions deck correctly**
    - **Validates: Requirements 5.2**
  - [ ]* 7.3 Add to `tests/property/deckRandomization.property.test.js` — Property 8: reset restores full deck
    - **Property 8: Reset restores full deck**
    - **Validates: Requirements 5.3**
  - [ ]* 7.4 Create `tests/property/interpretationService.property.test.js` — Property 1: output shape invariant, Property 2: orientation-correct meaning
    - **Property 1: Interpretation output shape invariant**
    - **Property 2: Orientation-correct meaning selection**
    - **Validates: Requirements 4.1, 4.2, 4.3**
  - [ ]* 7.5 Create `tests/property/geminiClient.property.test.js` — Property 3: 5xx retry, Property 4: 4xx no-retry, Property 5: retry exhaustion
    - **Property 3: 5xx triggers retry**
    - **Property 4: 4xx does not retry**
    - **Property 5: Retry exhaustion throws last error**
    - **Validates: Requirements 4.4, 4.6, 4.7**

- [x] 8. Implement pre-push hook
  - [x] 8.1 Create `.githooks/pre-push` shell script that runs `npm run test:fast` and exits non-zero on failure
    - _Requirements: 2.1, 2.2, 2.3_
  - [x] 8.2 Create `scripts/install-hooks.js` that copies `.githooks/pre-push` to `.git/hooks/pre-push` and sets executable permission
    - _Requirements: 2.5_

- [x] 9. Final checkpoint
  - Run `npm run test:fast` (should pass in <10s) and `npm run test:full` (should pass all tests including property tests). Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- FAST tier tests use `.fast.test.js` suffix; property tests use `.property.test.js`
- Property tests require fast-check (already installed) with minimum 100 iterations
- Smoke tests mock service modules to avoid network dependencies
- The existing `tests/unit/*.test.js` files remain in FULL tier without renaming
