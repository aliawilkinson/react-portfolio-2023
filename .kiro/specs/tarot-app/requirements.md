# Requirements Document

## Introduction

This document defines the requirements for a Tarot reading app integrated into an existing React + Vite portfolio site. The app provides interactive tarot card drawing with manual deck interaction, automatic spreads, AI-powered interpretation, and self-reflection framing. Card data is sourced from a local JSON file (`src/data/tarotDeck.json`). The app uses framer-motion for animations and SCSS modules for styling.

## Glossary

- **Tarot_App**: The React component and associated modules providing tarot reading functionality
- **Deck**: The visual representation of the tarot deck displayed as a single face-down card; the primary interaction point for drawing cards
- **Spread**: The collection of drawn cards currently displayed in the reading area
- **Card_Orientation**: Whether a card is upright or reversed (180° rotation)
- **Interpretation**: An AI-generated reading of drawn cards considering question, card names, positions, and orientations
- **Auto_Mode**: A mode where the user selects a card count and the system automatically draws and interprets
- **Reset_Deck**: An action that returns all drawn cards to the deck, clears the spread, shuffles, and removes any interpretation
- **Shuffle_Deck**: An action that shuffles remaining undealt cards without affecting the current spread
- **Spread_Preset**: A predefined spread layout such as Single Card, Three Card (Past/Present/Future), or Celtic Cross

## Requirements

### Requirement 1: Layout and Header

**User Story:** As a user, I want a clear, focused layout for the tarot app, so that I understand what the app does and how to interact with it.

#### Acceptance Criteria

1. THE Tarot_App SHALL display a header with the title "TAROT"
2. THE Tarot_App SHALL display a subtitle "Ask a question for reflection or draw cards." beneath the title
3. THE Tarot_App SHALL display a question input area below the header
4. THE Tarot_App SHALL display the Deck below the question area
5. THE Tarot_App SHALL display the Spread below the Deck
6. THE Tarot_App SHALL display control buttons below the Spread

### Requirement 2: Question Input

**User Story:** As a user, I want to optionally enter a question for reflection, so that my reading can be contextualized to my situation.

#### Acceptance Criteria

1. THE Tarot_App SHALL display a text input with placeholder text "What would you like to reflect on?"
2. THE Tarot_App SHALL display an "Analyze" button adjacent to the text input
3. THE Tarot_App SHALL treat the question input as optional for all interactions

### Requirement 3: Deck Display and Manual Card Drawing

**User Story:** As a user, I want to draw cards by clicking the deck, so that I can interactively build my own spread one card at a time.

#### Acceptance Criteria

1. THE Deck SHALL display as a single full-size face-down tarot card that visually represents the top of a real deck
2. WHEN a user clicks or taps the Deck, THE Tarot_App SHALL draw a random card from the remaining deck and immediately reveal it in the Spread
3. WHEN a user clicks the Deck again, THE Tarot_App SHALL draw another random card and add it to the existing Spread
4. THE Tarot_App SHALL display drawn cards next to each other in a row within the Spread
5. WHEN the Spread row becomes too wide for the viewport, THE Tarot_App SHALL wrap cards to the next line
6. THE Tarot_App SHALL keep all previously drawn cards visible until the deck is reset
7. THE Tarot_App SHALL prevent duplicate cards from being drawn within a single session
8. WHEN a card is drawn, THE Tarot_App SHALL remove that card from the available deck until reset

### Requirement 4: Analyze Behavior

**User Story:** As a user, I want to analyze my drawn cards or get an automatic reading, so that I can receive a meaningful interpretation.

#### Acceptance Criteria

1. WHEN the user clicks Analyze and no cards have been drawn, THE Tarot_App SHALL automatically draw 3 random cards and generate an Interpretation
2. WHEN the user clicks Analyze and cards have already been drawn, THE Tarot_App SHALL generate an Interpretation using the currently displayed Spread without drawing additional cards
3. WHEN generating an Interpretation, THE Tarot_App SHALL use the entered question if one is provided
4. WHEN generating an Interpretation, THE Tarot_App SHALL use card names, card positions, and Card_Orientation

### Requirement 5: Controls — Reset Deck

**User Story:** As a user, I want to reset the deck, so that I can start a completely fresh reading session.

#### Acceptance Criteria

1. THE Tarot_App SHALL provide a "Reset Deck" button in the controls area
2. WHEN the user clicks Reset Deck, THE Tarot_App SHALL return all drawn cards to the deck
3. WHEN the user clicks Reset Deck, THE Tarot_App SHALL clear the Spread
4. WHEN the user clicks Reset Deck, THE Tarot_App SHALL shuffle the full deck
5. WHEN the user clicks Reset Deck, THE Tarot_App SHALL remove any displayed Interpretation

### Requirement 6: Controls — Shuffle Deck

**User Story:** As a user, I want to shuffle the remaining cards without losing my current spread, so that I can randomize what comes next.

#### Acceptance Criteria

1. THE Tarot_App SHALL provide a "Shuffle Deck" button in the controls area
2. WHEN the user clicks Shuffle Deck, THE Tarot_App SHALL randomize the order of remaining undealt cards
3. WHEN the user clicks Shuffle Deck, THE Tarot_App SHALL keep currently drawn cards visible in the Spread
4. WHEN the user clicks Shuffle Deck, THE Tarot_App SHALL assign a new random Card_Orientation to each remaining card

### Requirement 7: Controls — Auto Mode

**User Story:** As a user, I want an auto mode that draws a set number of cards and interprets them, so that I can get a quick complete reading.

#### Acceptance Criteria

1. THE Tarot_App SHALL provide Auto Mode card count buttons: "1 Card", "3 Cards", "5 Cards"
2. WHEN the user selects an Auto Mode card count, THE Tarot_App SHALL draw that number of cards from the deck
3. WHEN Auto Mode draws cards, THE Tarot_App SHALL immediately reveal them in the Spread
4. WHEN Auto Mode draws cards, THE Tarot_App SHALL automatically generate an Interpretation using the drawn cards and any entered question

### Requirement 8: Spread Presets

**User Story:** As a user, I want to use common tarot spread layouts, so that I can perform traditional readings with positional meaning.

#### Acceptance Criteria

1. THE Tarot_App SHALL support a Single Card spread representing the core message
2. THE Tarot_App SHALL support a Three Card Spread with positions labeled "Past", "Present", "Future"
3. THE Tarot_App SHALL support a Celtic Cross spread using 10 cards in the traditional layout
4. WHEN a spread preset is used, THE Tarot_App SHALL assign position labels to each drawn card

### Requirement 9: Interpretation Output

**User Story:** As a user, I want a thoughtful interpretation of my cards, so that I can use the reading for self-reflection.

#### Acceptance Criteria

1. THE Interpretation SHALL include an overall reading summary
2. THE Interpretation SHALL include reflection points for the user
3. THE Interpretation SHALL include connections between the drawn cards
4. THE Interpretation SHALL consider Card_Orientation (upright or reversed) for each card
5. THE Tarot_App SHALL present tarot as a self-reflection tool rather than a future prediction tool
6. WHEN a question is provided, THE Interpretation SHALL incorporate the question as context for the reading

### Requirement 10: Card Orientation

**User Story:** As a user, I want cards to appear upright or reversed randomly, so that my readings have the full range of traditional tarot meanings.

#### Acceptance Criteria

1. WHEN cards are shuffled, THE Tarot_App SHALL assign a random Card_Orientation (upright or reversed) to each card with approximately 50% probability
2. WHEN a reversed card is displayed, THE Tarot_App SHALL rotate the card image 180 degrees
3. THE Tarot_App SHALL preserve the assigned Card_Orientation for a card throughout the session until reset
