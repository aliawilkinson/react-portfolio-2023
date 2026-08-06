# Implementation Plan: Tarot UX Fixes

## Overview

Incremental implementation of 8 UX improvements to the Tarot app. Each task builds on the previous, starting with the utility layer (sanitizer), then component-level changes, and finishing with layout and integration wiring. Tests are interleaved with implementation.

## Tasks

- [x] 1. Create sanitizeText utility
  - [x] 1.1 Create `src/components/Tarot/utils/sanitizeText.js` with sanitization logic
    - Remove malformed sequences (".,", ",.", ".,.")
    - Collapse repeated commas/periods (preserve ellipsis "...")
    - Normalize whitespace around punctuation
    - Handle null/empty input gracefully
    - _Requirements: 5.1, 5.2, 5.3, 5.4_
  - [ ]* 1.2 Write property tests for sanitizeText
    - **Property 5: Sanitizer removes malformed punctuation**
    - **Property 6: Sanitizer idempotence**
    - **Validates: Requirements 5.1, 5.2, 5.3, 5.5**
    - Create `tests/unit/sanitizeText.test.js`
    - Use fast-check to generate strings with punctuation patterns
    - Minimum 100 iterations per property

- [x] 2. Update Tooltip component for mobile support and accessibility
  - [x] 2.1 Refactor `src/components/Tarot/Tooltip.jsx`
    - Add single-tap toggle via onTouchEnd (replace onDoubleClick)
    - Add document click-outside listener to dismiss on touch
    - Prevent ghost click issues with e.preventDefault() on touch events
    - Add aria-describedby linking trigger to tooltip content
    - Add role="tooltip" and unique id on tooltip element
    - _Requirements: 3.1, 3.2, 3.3, 3.4, 10.2_
  - [ ]* 2.2 Write tests for Tooltip component
    - **Property 2: Tooltip shows on interaction**
    - **Property 3: Tooltip dismiss behavior**
    - **Property 11: Tooltip ARIA describedby**
    - **Validates: Requirements 3.1, 3.2, 3.3, 3.4, 10.2**
    - Create `tests/unit/tooltip.test.js`

- [x] 3. Create CollapsibleSection component
  - [x] 3.1 Create `src/components/Tarot/CollapsibleSection.jsx`
    - Props: title, defaultOpen, children, isOpen (controlled override)
    - Render button header with chevron indicator
    - Use framer-motion AnimatePresence for expand/collapse animation
    - Add aria-expanded on button, aria-controls referencing content panel
    - Support Enter and Space key activation
    - _Requirements: 7.1, 7.2, 7.6, 7.7, 10.3_
  - [x] 3.2 Add CollapsibleSection styles to `Tarot.module.scss`
    - Style header button, chevron rotation, content panel
    - _Requirements: 7.1_
  - [ ]* 3.3 Write tests for CollapsibleSection
    - **Property 7: Collapsible section toggle**
    - **Property 8: Collapsible keyboard accessibility**
    - **Property 9: Collapsible ARIA state accuracy**
    - **Validates: Requirements 7.2, 7.6, 7.7, 10.3**
    - Create `tests/unit/collapsibleSection.test.js`

- [x] 4. Checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [x] 5. Modify Interpretation component with collapsible sections and sanitization
  - [x] 5.1 Update `src/components/Tarot/Interpretation.jsx`
    - Wrap summary, reflections, and connections in CollapsibleSection
    - Add "Collapse All" / "Expand All" buttons
    - Use window.matchMedia to set desktop default open, mobile default collapsed
    - Apply sanitizeText to connections and summary text before rendering
    - _Requirements: 7.1, 7.3, 7.4, 7.5, 5.1, 5.2, 5.3_

- [x] 6. Update Controls component with "Bigger Letters" button
  - [x] 6.1 Modify `src/components/Tarot/Controls.jsx`
    - Add new props: largeText, onToggleTextSize
    - Add "Bigger Letters" / "Smaller Letters" button in the actions row
    - Wrap in Tooltip with descriptive text
    - Add aria-pressed={largeText} on the button
    - _Requirements: 1.1, 1.2, 1.3, 10.4_

- [x] 7. Update Tarot.jsx main component
  - [x] 7.1 Remove text size button from header, wire to Controls
    - Remove textSizeBtn from header JSX
    - Pass largeText and toggle handler to Controls
    - Initialize largeText from sessionStorage
    - Persist largeText changes to sessionStorage
    - _Requirements: 1.1, 1.4, 1.5_
  - [x] 7.2 Reorder component rendering for layout redesign
    - Render order: Header → QuestionInput → Spread → DeckView → Controls → Interpretation
    - _Requirements: 6.1, 6.4_
  - [x] 7.3 Fix reset to clear question field
    - Update handleReset to also call setQuestion('')
    - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5_
  - [x] 7.4 Fix Analyze to always produce fresh reading
    - Update handleAnalyze to always: resetAndDraw(3) → analyze with new cards
    - Remove conditional logic that reuses existing cards
    - _Requirements: 8.1, 8.2, 8.3, 8.4_
  - [ ]* 7.5 Write tests for reset behavior
    - **Property 4: Reset clears all state**
    - **Validates: Requirements 4.1, 4.2, 4.3, 4.4, 4.5**
    - Create `tests/unit/tarotReset.test.js`
  - [ ]* 7.6 Write tests for analyze redraw behavior
    - **Property 10: Analyze produces fresh reading**
    - **Validates: Requirements 8.1, 8.2, 8.3, 8.4**
    - Create `tests/unit/tarotAnalyze.test.js`
  - [ ]* 7.7 Write tests for text size toggle persistence
    - **Property 1: Text size session persistence (round-trip)**
    - **Property 12: Bigger Letters aria-pressed accuracy**
    - **Validates: Requirements 1.5, 10.4**
    - Create `tests/unit/textSizeToggle.test.js`

- [x] 8. Normalize SpreadCard sizing
  - [x] 8.1 Update `.spreadCard` and `.spreadCardImage` styles in `Tarot.module.scss`
    - Set fixed responsive widths at each breakpoint (mobile: uniform, tablet/desktop: uniform)
    - Ensure equal height via fixed aspect ratio or explicit height
    - Verify consistent gap in .spread flexbox container
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5_

- [x] 9. Responsive and accessibility pass
  - [x] 9.1 Ensure all interactive elements have minimum 44×44px touch targets on mobile
    - Audit button padding/min-dimensions in SCSS
    - _Requirements: 9.2_
  - [x] 9.2 Verify keyboard navigation flow through all new/modified controls
    - Ensure tabindex ordering is logical
    - Confirm no focus traps
    - _Requirements: 10.1_

- [x] 10. Final checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Property tests use fast-check (already installed) with minimum 100 iterations
- The sanitizer is built first since it's a pure utility with no dependencies — easy to test in isolation
- Layout reordering (task 7.2) is a simple JSX reorder in the parent component
- Card sizing (task 8) is CSS-only — no logic changes needed
