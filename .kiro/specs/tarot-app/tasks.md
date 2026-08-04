# Implementation Plan: Tarot Reading App

## Overview

This implementation plan breaks down the tarot reading app into incremental coding tasks. Each task builds on previous work, ensuring the feature is wired together progressively with no orphaned code. The implementation uses React with framer-motion for animations, SCSS modules for styling, and the existing project patterns.

## Tasks

- [x] 1. Create tarot API service layer
  - [x] 1.1 Implement tarotService.js with fetchAllCards and getCardImageUrl functions
    - Create `src/services/tarotService.js`
    - Implement fetchAllCards() using axios to call `https://tarotapi.dev/api/v1/cards`
    - Implement getCardImageUrl(nameShort) returning `https://sacred-texts.com/tarot/pkt/img/${nameShort}.jpg`
    - Export both functions
    - _Requirements: 1.1, 2.1_
  - [ ]* 1.2 Write property test for image URL construction
    - **Property 3: Image URL Construction**
    - **Validates: Requirements 2.1**

- [x] 2. Implement useTarotDeck hook for deck management
  - [x] 2.1 Create useTarotDeck hook with fetch, shuffle, and draw functionality
    - Create `src/hooks/useTarotDeck.js`
    - Implement state for cards, shuffledDeck, isLoading, error, isShuffling
    - Implement useEffect to fetch cards on mount
    - Implement shuffleDeck() using Fisher-Yates algorithm with ~50% reversal probability
    - Implement drawCards(count) to return top N cards from shuffled deck
    - Implement retry() for error recovery
    - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 3.1, 3.2, 3.4_
  - [ ]* 2.2 Write property test for shuffle permutation validity
    - **Property 5: Shuffle Produces Valid Permutation**
    - **Validates: Requirements 3.1**
  - [ ]* 2.3 Write property test for reversal distribution
    - **Property 6: Shuffle Reversal Distribution**
    - **Validates: Requirements 3.2**
  - [ ]* 2.4 Write property test for deck composition invariant
    - **Property 1: Deck Composition Invariant**
    - **Validates: Requirements 1.2**

- [x] 3. Implement useReading hook for reading state management
  - [x] 3.1 Create useReading hook with mode, drawnCards, and reveal logic
    - Create `src/hooks/useReading.js`
    - Implement state for mode ('single' | 'three'), drawnCards, hasStarted
    - Implement startReading(shuffledCards) to draw cards based on mode
    - Implement revealCard(index) to mark specific card as revealed
    - Implement changeMode(newMode) to switch modes and reset state
    - Implement resetReading() to clear current reading
    - Export computed values: hasRevealedCards, allRevealed
    - _Requirements: 9.1, 9.2, 9.3, 9.4_
  - [ ]* 3.2 Write property test for mode switch reset
    - **Property 15: Mode Switch Resets Reading**
    - **Validates: Requirements 9.4**

- [x] 4. Checkpoint - Verify hooks and service layer
  - Ensure all tests pass, ask the user if questions arise.

- [x] 5. Implement TarotCard component with flip animation
  - [x] 5.1 Create TarotCard component with card back, card face, and flip animation
    - Create `src/components/Tarot/TarotCard.jsx`
    - Implement card container with framer-motion for 3D flip (rotateY)
    - Implement card back design with gradient background
    - Implement card face with image and reversed rotation support
    - Handle onClick to trigger reveal (with isFlipping guard)
    - Use onAnimationComplete to reset isFlipping state
    - _Requirements: 4.1, 4.2, 4.3, 6.1, 6.2, 6.3, 6.4_
  - [x] 5.2 Create FallbackCard component for image load failures
    - Create FallbackCard subcomponent in TarotCard.jsx or separate file
    - Display card name with gradient background matching site palette
    - Use crystal ball emoji and styled text
    - _Requirements: 2.2, 2.3_
  - [x] 5.3 Create CardMeaning component to display card interpretation
    - Display card name, description
    - Conditionally show meaning_up or meaning_rev based on isReversed
    - Style with site typography
    - _Requirements: 4.4, 4.5, 4.6_
  - [ ]* 5.4 Write property test for meaning selection based on orientation
    - **Property 8: Revealed Card Meaning Matches Orientation**
    - **Validates: Requirements 4.4, 4.5**
  - [ ]* 5.5 Write property test for orientation preservation
    - **Property 13: Orientation Preserved Through Reveal**
    - **Validates: Requirements 4.3, 6.4**

- [x] 6. Create TarotCard styles
  - [x] 6.1 Add TarotCard styles to Tarot.module.scss
    - Add .cardContainer with position label styling
    - Add .card with perspective and 3D transform styles
    - Add .cardBack with gradient design (#6D4B8A to #4A90A4)
    - Add .cardFace with backface-visibility hidden
    - Add .fallbackCard with gradient and centered text
    - Add .cardMeaning with appropriate typography
    - Ensure preserve-3d for flip effect
    - _Requirements: 8.1, 8.4_

- [x] 7. Implement CardControls component
  - [x] 7.1 Create CardControls component with mode selection and actions
    - Create `src/components/Tarot/CardControls.jsx`
    - Implement mode selector buttons (Single Card / Three Card Spread)
    - Implement Shuffle button with disabled state during shuffle
    - Implement New Reading button (shown when hasRevealedCards)
    - Wire up all callbacks (onModeChange, onShuffle, onNewReading)
    - _Requirements: 3.3, 9.1, 9.3_
  - [x] 7.2 Add CardControls styles to Tarot.module.scss
    - Add .controls container with flexbox layout
    - Add .modeSelector with button group styling
    - Add .active state for selected mode
    - Add .actions with button styling
    - Match site button patterns
    - _Requirements: 8.1, 8.2_

- [x] 8. Implement ReadingArea component
  - [x] 8.1 Create ReadingArea component with loading, error, and card display states
    - Create `src/components/Tarot/ReadingArea.jsx`
    - Implement loading state display
    - Implement error state with retry option
    - Implement single card layout (centered single card)
    - Implement three card layout with Past/Present/Future labels
    - Map drawnCards to TarotCard components
    - _Requirements: 1.4, 1.5, 4.1, 5.1, 5.2, 5.5_
  - [x] 8.2 Add ReadingArea styles to Tarot.module.scss
    - Add .singleLayout with centered card
    - Add .spreadLayout with flex row and gap
    - Add .positionLabel styling for Past/Present/Future
    - Add responsive styles for mobile (column layout < 640px)
    - _Requirements: 7.1, 7.2, 7.3, 7.4_
  - [ ]* 8.3 Write property test for three-card uniqueness
    - **Property 10: Three-Card Spread Uniqueness**
    - **Validates: Requirements 5.4**

- [x] 9. Checkpoint - Verify all subcomponents render correctly
  - Ensure all tests pass, ask the user if questions arise.

- [x] 10. Wire up main Tarot component
  - [x] 10.1 Integrate hooks and subcomponents into Tarot.jsx
    - Import and use useTarotDeck hook
    - Import and use useReading hook
    - Import CardControls, ReadingArea components
    - Wire startReading to initialize reading after shuffle
    - Connect all event handlers between hooks and components
    - Add TarotErrorBoundary wrapper
    - Preserve existing framer-motion animation patterns
    - _Requirements: 1.1, 3.4, 9.2_
  - [x] 10.2 Update Tarot.module.scss with complete responsive layout
    - Ensure .wrapper and .container work with new components
    - Fine-tune spacing and gaps
    - Verify mobile responsiveness
    - _Requirements: 7.1, 7.2, 7.3, 7.4, 8.3_

- [x] 11. Final checkpoint - Complete integration testing
  - Ensure all tests pass, ask the user if questions arise.
  - Verify single card draw flow works end-to-end
  - Verify three card spread flow works end-to-end
  - Verify shuffle and new reading functionality
  - Verify responsive layout on mobile breakpoints

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- The project already has fast-check installed for property-based testing
- All components should use the existing framer-motion animation patterns (staggerChildren, fadeIn, textVariant)
- Card images may fail to load; FallbackCard ensures graceful degradation
- The shuffle uses client-side Fisher-Yates rather than the API random endpoint for better UX
