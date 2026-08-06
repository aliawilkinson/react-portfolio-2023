# Requirements Document

## Introduction

A set of UI/UX improvements to the existing Tarot app within the React + Vite portfolio site. These changes address usability issues around text sizing controls, card layout, tooltip accessibility, reset behavior, text sanitization, layout for screenshots, collapsible sections, and the analyze button workflow.

## Glossary

- **Tarot_App**: The tarot reading application at `src/components/Tarot/`, composed of React components with SCSS modules and framer-motion animations.
- **Tooltip_Component**: The shared tooltip UI component (`Tooltip.jsx`) that displays contextual help text for buttons.
- **Spread**: The collection of drawn tarot cards displayed in the reading area.
- **Spread_Card**: An individual drawn card rendered with image, name, meaning, and position label.
- **Interpretation**: The generated reading result containing summary, reflections, and card connections text.
- **Controls**: The action buttons area containing reset, shuffle, auto-mode, and spread preset buttons.
- **Deck_View**: The visual representation of the remaining card deck with draw interaction.
- **Question_Input**: The text area where users type their question before a reading.
- **Text_Size_Mode**: A toggle state that increases font sizes throughout the Tarot_App for readability.
- **Sanitizer**: A utility function that cleans malformed punctuation artifacts from generated interpretation text.

## Requirements

### Requirement 1: Replace Letter Size Control

**User Story:** As a user, I want a clearly labeled button to increase text size, so that I immediately understand how to make the app more readable.

#### Acceptance Criteria

1. WHEN the Tarot_App renders, THE Controls SHALL display a button labeled "Bigger Letters" alongside the other action buttons.
2. WHEN the user clicks "Bigger Letters", THE Tarot_App SHALL toggle Text_Size_Mode, visibly increasing font sizes for card names, descriptions, meanings, and Interpretation text.
3. WHEN Text_Size_Mode is active, THE button label SHALL change to indicate the current enlarged state (e.g., "Smaller Letters").
4. THE Tarot_App SHALL NOT display the previous "A+" / "Aa" button in the header area.
5. WHILE Text_Size_Mode is active, THE Tarot_App SHALL persist the selection for the duration of the browser session using session storage.
6. THE Text_Size_Mode SHALL produce consistent visual results on mobile, tablet, and desktop viewports.

### Requirement 2: Spread Card Sizing Consistency

**User Story:** As a user, I want all spread cards to appear the same size, so that the reading looks visually balanced on any device.

#### Acceptance Criteria

1. THE Spread SHALL render all Spread_Card elements with equal width and equal height at each responsive breakpoint.
2. THE Spread_Card images SHALL maintain consistent dimensions and aspect ratio across all cards within a single spread.
3. WHEN viewed on mobile (viewport width ≤ 480px), THE Spread_Card width SHALL be uniform and appropriately sized for the screen.
4. WHEN viewed on tablet (481px–1024px) or desktop (>1024px), THE Spread_Card width SHALL scale proportionally while remaining equal across all cards.
5. THE Spread SHALL apply consistent spacing (gap) between all Spread_Card elements regardless of the number of cards drawn.

### Requirement 3: Mobile Tooltip Support

**User Story:** As a mobile user, I want to see button tooltips by tapping, so that I can understand what each control does without a mouse.

#### Acceptance Criteria

1. WHEN a user hovers over a tooltip-wrapped element on desktop, THE Tooltip_Component SHALL display the tooltip text.
2. WHEN a user taps a tooltip-wrapped element on a touch device, THE Tooltip_Component SHALL display the tooltip text.
3. WHEN a tooltip is visible on a touch device and the user taps the same element again, THE Tooltip_Component SHALL dismiss the tooltip.
4. WHEN a tooltip is visible on a touch device and the user taps outside the tooltip-wrapped element, THE Tooltip_Component SHALL dismiss the tooltip.
5. THE Tooltip_Component SHALL be the single shared component used for all button tooltips throughout the Tarot_App.
6. THE Tooltip_Component SHALL ensure tooltip text clearly explains the purpose of the associated button.

### Requirement 4: Reset Button Improvements

**User Story:** As a user, I want the reset button to clear everything, so that I start with a completely clean slate for my next reading.

#### Acceptance Criteria

1. WHEN the user clicks the Reset button, THE Tarot_App SHALL clear all drawn cards from the Spread.
2. WHEN the user clicks the Reset button, THE Tarot_App SHALL clear the Interpretation (summary, reflections, and connections).
3. WHEN the user clicks the Reset button, THE Tarot_App SHALL clear the Question_Input field text.
4. WHEN the user clicks the Reset button, THE Tarot_App SHALL reset any active spread preset selection.
5. WHEN the reset completes, THE Tarot_App SHALL display no leftover text, cards, or interpretation content.

### Requirement 5: Card Connections Text Sanitization

**User Story:** As a user, I want interpretation text to be free of punctuation artifacts, so that readings appear polished and professional.

#### Acceptance Criteria

1. WHEN interpretation text is generated, THE Sanitizer SHALL remove malformed punctuation sequences (e.g., ".,", ",.", ".,.").
2. WHEN interpretation text contains repeated consecutive punctuation, THE Sanitizer SHALL collapse them to a single instance (e.g., ".." → ".", ",," → ",").
3. WHEN interpretation text contains extra whitespace around punctuation, THE Sanitizer SHALL normalize spacing (e.g., "word ,  word" → "word, word").
4. THE Sanitizer SHALL preserve legitimate punctuation usage (e.g., ellipsis "..." remains intact, sentence-ending periods remain).
5. FOR ALL valid Interpretation text strings, sanitizing then sanitizing again SHALL produce the same result as sanitizing once (idempotence).

### Requirement 6: Card Layout Redesign

**User Story:** As a user, I want drawn cards displayed above the deck and controls, so that I can screenshot my question and cards together.

#### Acceptance Criteria

1. WHEN cards are drawn, THE Tarot_App SHALL render content in this order from top to bottom: Question_Input → Spread → Deck_View → Controls → Interpretation.
2. THE Spread SHALL use flexbox wrapping so cards flow left-to-right and wrap to the next row automatically.
3. WHEN the viewport is narrow, THE Spread SHALL wrap cards into multiple rows rather than scrolling horizontally.
4. THE layout SHALL position drawn cards above the Deck_View and Controls so the question and cards are capturable together in a single screenshot.
5. WHILE interacting with Controls or Deck_View, THE drawn cards in the Spread SHALL remain visible above without being scrolled off-screen (within reasonable viewport constraints).

### Requirement 7: Collapsible Interpretation Sections

**User Story:** As a user, I want to collapse and expand parts of the interpretation, so that I can focus on the cards without scrolling past large text blocks.

#### Acceptance Criteria

1. WHEN the Interpretation renders, THE Tarot_App SHALL wrap each section (individual card meanings, summary, card connections) in a collapsible container.
2. WHEN a user clicks a section header, THE collapsible container SHALL toggle between expanded and collapsed states.
3. THE Tarot_App SHALL provide "Collapse All" and "Expand All" controls within the Interpretation area.
4. WHEN viewed on desktop (viewport > 1024px), THE collapsible sections SHALL default to expanded.
5. WHEN viewed on mobile (viewport ≤ 768px), THE collapsible sections SHALL default to collapsed for sections exceeding a reasonable content length.
6. THE collapsible controls SHALL be keyboard accessible (activatable via Enter or Space keys).
7. THE collapsible controls SHALL communicate expanded/collapsed state to screen readers via appropriate ARIA attributes.

### Requirement 8: Analyze Button Redraw Behavior

**User Story:** As a user, I want Analyze to always produce a fresh reading, so that I don't need to manually reset before getting a new interpretation.

#### Acceptance Criteria

1. WHEN the user clicks Analyze, THE Tarot_App SHALL clear the current Spread and Interpretation.
2. WHEN the user clicks Analyze, THE Tarot_App SHALL draw fresh cards from a reshuffled deck.
3. WHEN the user clicks Analyze, THE Tarot_App SHALL generate a new Interpretation for the freshly drawn cards.
4. THE Analyze action SHALL be equivalent to performing Reset → Draw New Cards → Analyze in a single step.
5. IF the Analyze action fails during interpretation generation, THEN THE Tarot_App SHALL display the freshly drawn cards and show an error message in the Interpretation area.

### Requirement 9: Responsive Design Verification

**User Story:** As a user, I want the Tarot app to work well on any device, so that my experience is consistent regardless of screen size.

#### Acceptance Criteria

1. THE Tarot_App layout SHALL render correctly on viewports: iPhone SE (375px), standard mobile (390px), tablet (768px), laptop (1280px), and large desktop (1920px).
2. THE touch targets for all interactive elements SHALL meet a minimum size of 44×44 CSS pixels on mobile viewports.
3. WHEN the viewport changes, THE Tarot_App SHALL adapt without horizontal overflow or content clipping.

### Requirement 10: Accessibility

**User Story:** As a user who relies on assistive technology, I want the Tarot app to be fully navigable and understandable, so that I can use all features independently.

#### Acceptance Criteria

1. THE Tarot_App SHALL support full keyboard navigation for all interactive elements (buttons, collapsible sections, tooltips).
2. THE Tooltip_Component SHALL expose tooltip content to screen readers via `aria-describedby` or equivalent ARIA pattern.
3. THE collapsible section controls SHALL use `aria-expanded` to communicate state to assistive technologies.
4. THE "Bigger Letters" button SHALL communicate its toggle state to screen readers via `aria-pressed`.
