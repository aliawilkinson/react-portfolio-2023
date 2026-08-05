# Implementation Plan: Tarot App

## Overview

Complete rewrite of the Tarot app with deck-centric interaction, manual card drawing, auto mode, interpretation engine, and spread presets. Builds incrementally from data/hooks through components to final wiring.

## Tasks

- [x] 1. Rewrite useTarotDeck hook with deck-draw model
  - [x] 1.1 Implement useTarotDeck with remaining/drawn state, drawCard, drawMultiple, shuffleDeck, resetDeck
    - Rewrite `src/hooks/useTarotDeck.js`
    - Initialize remainingDeck as shuffled full deck with random orientations
    - `drawCard()`: removes top card from remaining, appends to drawn
    - `drawMultiple(count)`: draws N cards at once
    - `shuffleDeck()`: re-shuffles remaining cards only, preserves drawn, assigns new orientations
    - `resetDeck()`: returns all cards to deck, reshuffles, clears drawn
    - Export: remainingDeck, drawnCards, isShuffling, drawCard, drawMultiple, shuffleDeck, resetDeck, remainingCount
    - _Requirements: 3.2, 3.7, 3.8, 5.2, 5.3, 5.4, 6.2, 6.3, 6.4, 10.1_

  - [ ]* 1.2 Write property test for deck partition invariant
    - **Property 1: Deck Partition Invariant**
    - **Validates: Requirements 3.7, 3.8**

  - [ ]* 1.3 Write property test for reset restores initial state
    - **Property 2: Reset Restores Initial State**
    - **Validates: Requirements 5.2, 5.3, 5.4, 5.5**

  - [ ]* 1.4 Write property test for shuffle preserves partition
    - **Property 3: Shuffle Preserves Partition**
    - **Validates: Requirements 6.2, 6.3**

  - [ ]* 1.5 Write property test for orientation distribution
    - **Property 4: Orientation Distribution**
    - **Validates: Requirements 10.1, 6.4**

  - [ ]* 1.6 Write property test for orientation preservation
    - **Property 5: Orientation Preservation**
    - **Validates: Requirements 10.3**

- [x] 2. Implement interpretation service
  - [x] 2.1 Create interpretationService.js with generateInterpretation function
    - Create `src/services/interpretationService.js`
    - `generateInterpretation(cards, question)` returns `{ summary, reflections, connections }`
    - Use meaning_up or meaning_rev based on isReversed
    - Include question in summary when provided
    - Frame output as self-reflection (not prediction)
    - Build reflections as array of prompts derived from card meanings
    - Build connections narrative linking cards together
    - _Requirements: 4.3, 4.4, 9.1, 9.2, 9.3, 9.4, 9.5, 9.6_

  - [ ]* 2.2 Write property test for interpretation completeness
    - **Property 9: Interpretation Completeness**
    - **Validates: Requirements 9.1, 9.2, 9.3**

  - [ ]* 2.3 Write property test for interpretation uses correct card meanings
    - **Property 8: Interpretation Uses Correct Card Meanings**
    - **Validates: Requirements 4.4, 9.4**

  - [ ]* 2.4 Write property test for interpretation incorporates question
    - **Property 7: Interpretation Incorporates Question**
    - **Validates: Requirements 4.3, 9.6**

- [x] 3. Rewrite useReading hook
  - [x] 3.1 Implement useReading with question state, analyze, and clearInterpretation
    - Rewrite `src/hooks/useReading.js`
    - State: question, interpretation, isGenerating
    - `analyze(cards, questionText)`: calls generateInterpretation, stores result
    - `clearInterpretation()`: sets interpretation to null
    - Export: question, setQuestion, interpretation, isGenerating, analyze, clearInterpretation
    - _Requirements: 2.3, 4.1, 4.2, 5.5_

  - [ ]* 3.2 Write property test for analyze preserves existing spread
    - **Property 6: Analyze Preserves Existing Spread**
    - **Validates: Requirements 4.2**

- [x] 4. Checkpoint - Verify hooks and service
  - Ensure all tests pass, ask the user if questions arise.

- [x] 5. Implement UI components
  - [x] 5.1 Create QuestionInput component
    - Create `src/components/Tarot/QuestionInput.jsx`
    - Text input with placeholder "What would you like to reflect on?"
    - Adjacent "Analyze" button
    - Wire onChange and onClick callbacks
    - _Requirements: 2.1, 2.2, 2.3_

  - [x] 5.2 Create DeckView component
    - Create `src/components/Tarot/DeckView.jsx`
    - Single full-size face-down card with gradient back design
    - Show remaining count
    - Disable interaction when deck is empty
    - onClick triggers drawCard
    - Use framer-motion for hover/tap feedback
    - _Requirements: 3.1, 3.2_

  - [x] 5.3 Create SpreadCard component
    - Create `src/components/Tarot/SpreadCard.jsx`
    - Display card image (or FallbackCard on error)
    - Apply 180° rotation for reversed cards
    - Show card name and reversed badge
    - Optional position label
    - Animate entrance with framer-motion (scale + opacity)
    - _Requirements: 3.4, 3.6, 8.4, 10.2_

  - [x] 5.4 Create Spread component
    - Create `src/components/Tarot/Spread.jsx`
    - Flex row with wrap for cards
    - Map drawnCards to SpreadCard components
    - Accept optional spreadPreset for labels
    - _Requirements: 3.4, 3.5, 3.6_

  - [x] 5.5 Create Controls component
    - Create `src/components/Tarot/Controls.jsx`
    - "Reset Deck" button
    - "Shuffle Deck" button (disabled while shuffling)
    - Auto Mode section with "1 Card", "3 Cards", "5 Cards" buttons
    - _Requirements: 5.1, 6.1, 7.1_

  - [x] 5.6 Create Interpretation component
    - Create `src/components/Tarot/Interpretation.jsx`
    - Display summary, reflection points (list), connections
    - Show loading state while generating
    - Hidden when no interpretation exists
    - _Requirements: 9.1, 9.2, 9.3_

- [x] 6. Update styles
  - [x] 6.1 Rewrite Tarot.module.scss for new layout
    - Update `src/components/Tarot/Tarot.module.scss`
    - Add .questionArea styles (input + button row)
    - Add .deckArea and .deckCard styles (full-size face-down card)
    - Add .spread styles (flex-wrap row)
    - Add .spreadCard styles (card image, label, info)
    - Update .controls for Reset, Shuffle, Auto Mode layout
    - Add .interpretation styles (summary, list, connections)
    - Keep existing color palette (#6D4B8A, #4A90A4, site colors)
    - Responsive: stack on mobile, row on desktop
    - _Requirements: 1.1–1.6, 3.4, 3.5_

- [x] 7. Wire up main Tarot component
  - [x] 7.1 Rewrite Tarot.jsx integrating all components and hooks
    - Rewrite `src/components/Tarot/Tarot.jsx`
    - Use useTarotDeck for deck operations
    - Use useReading for question/interpretation state
    - Header: "TAROT" title + subtitle
    - Render: QuestionInput → DeckView → Spread → Controls → Interpretation
    - Wire Analyze: if no drawn cards, drawMultiple(3) then analyze; else analyze existing
    - Wire Auto Mode: reset, drawMultiple(count), analyze
    - Wire Reset: resetDeck + clearInterpretation
    - Wire Shuffle: shuffleDeck (keeps drawn cards)
    - Use framer-motion staggerChildren animation pattern
    - _Requirements: 1.1, 1.2, 4.1, 4.2, 7.2, 7.4_

  - [ ]* 7.2 Write property test for auto mode draws exact count
    - **Property 10: Auto Mode Draws Exact Count**
    - **Validates: Requirements 7.2, 7.3**

  - [ ]* 7.3 Write property test for question optionality
    - **Property 12: Question Optionality**
    - **Validates: Requirements 2.3**

- [x] 8. Implement spread presets
  - [x] 8.1 Add spread preset definitions and integrate into UI
    - Create preset constants (Single, Three Card, Celtic Cross) with labels
    - Add preset selector UI or integrate with Auto Mode
    - When preset is active, assign position labels to drawn cards
    - _Requirements: 8.1, 8.2, 8.3, 8.4_

  - [ ]* 8.2 Write property test for spread preset labels
    - **Property 11: Spread Preset Labels**
    - **Validates: Requirements 8.4**

- [x] 9. Clean up removed components
  - [x] 9.1 Remove unused files from old implementation
    - Delete or update `src/components/Tarot/ReadingArea.jsx` (replaced by Spread + DeckView)
    - Delete or update `src/components/Tarot/CardControls.jsx` (replaced by Controls)
    - Delete or update `src/components/Tarot/TarotCard.jsx` (replaced by SpreadCard)
    - Update any route/import references
    - _Requirements: all_

- [x] 10. Final checkpoint - Full integration verification
  - Ensure all tests pass, ask the user if questions arise.
  - Verify: clicking deck draws cards into spread
  - Verify: Analyze with no cards draws 3 and interprets
  - Verify: Analyze with existing cards interprets without drawing
  - Verify: Reset clears everything
  - Verify: Shuffle randomizes remaining without touching spread
  - Verify: Auto Mode draws correct count and interprets
  - Verify: Responsive layout wraps spread cards

## Notes

- Tasks marked with `*` are optional property-based tests (can be skipped for faster MVP)
- Card data is local (`src/data/tarotDeck.js`) — no API calls needed
- The project already has vitest + fast-check configured
- All components use framer-motion animations matching existing site patterns
- The interpretation service is synchronous (string composition from card data)
