# Requirements Document

## Introduction

This document defines the requirements for a Tarot reading app feature integrated into an existing React + Vite portfolio site. The feature provides interactive tarot card reading experiences including single card draws and three-card spreads, with support for card reversals and animated card reveals. Card data is sourced from the tarotapi.dev API, with card images from sacred-texts.com using public domain Rider-Waite imagery.

## Glossary

- **Tarot_App**: The React component and associated modules providing tarot reading functionality at the `/tarot` route
- **Card_Deck**: The complete set of 78 tarot cards (22 Major Arcana + 56 Minor Arcana)
- **Major_Arcana**: The 22 trump cards of the tarot deck (The Fool through The World)
- **Minor_Arcana**: The 56 suit cards divided into four suits (Wands, Cups, Swords, Pentacles), each with cards Ace through King
- **Card_Orientation**: Whether a card is displayed upright or reversed (upside down)
- **Upright_Card**: A card displayed in its normal orientation, showing its standard meaning
- **Reversed_Card**: A card displayed upside down (180° rotation), showing its reversed meaning
- **Card_Back**: The decorative reverse side of a tarot card shown before reveal
- **Card_Face**: The front of a tarot card showing its imagery and name
- **Single_Card_Draw**: A reading type where one card is drawn for quick insight or daily guidance
- **Three_Card_Spread**: A reading type where three cards are drawn representing past, present, and future
- **Card_Flip_Animation**: The visual transition from showing Card_Back to revealing Card_Face
- **Fallback_Card**: A styled placeholder displayed when a card image fails to load, showing the card name
- **Tarot_API**: The external REST API at tarotapi.dev providing card data
- **Image_Source**: The sacred-texts.com server hosting public domain Rider-Waite card images

## Requirements

### Requirement 1: Card Deck Data Management

**User Story:** As a user, I want the app to have access to the complete 78-card tarot deck, so that I can receive authentic tarot readings.

#### Acceptance Criteria

1. WHEN the Tarot_App initializes, THE Tarot_App SHALL fetch card data from the Tarot_API endpoint `GET /api/v1/cards`
2. THE Card_Deck SHALL contain exactly 22 Major_Arcana cards and 56 Minor_Arcana cards
3. WHEN the Tarot_API returns card data, THE Tarot_App SHALL store name, name_short, value, suit, type, meaning_up, meaning_rev, and desc for each card
4. IF the Tarot_API request fails, THEN THE Tarot_App SHALL display an error message and provide a retry option
5. WHILE the Tarot_API request is pending, THE Tarot_App SHALL display a loading indicator

### Requirement 2: Card Image Display

**User Story:** As a user, I want to see beautiful tarot card images, so that I can have an immersive reading experience.

#### Acceptance Criteria

1. WHEN displaying a card, THE Tarot_App SHALL construct the image URL using the pattern `https://sacred-texts.com/tarot/pkt/img/{name_short}.jpg`
2. IF a card image fails to load, THEN THE Tarot_App SHALL display a Fallback_Card showing the card name in a styled design
3. THE Fallback_Card SHALL use a gradient background consistent with the site's color palette
4. WHEN a Reversed_Card is displayed, THE Tarot_App SHALL rotate the card image 180 degrees

### Requirement 3: Shuffle Functionality

**User Story:** As a user, I want to shuffle the deck before drawing cards, so that I can feel the randomness and ritual of a tarot reading.

#### Acceptance Criteria

1. WHEN a user initiates a shuffle, THE Tarot_App SHALL randomize the Card_Deck order using the Tarot_API random endpoint or client-side shuffle
2. WHEN a shuffle completes, THE Tarot_App SHALL assign a random Card_Orientation (upright or reversed) to each card with approximately 50% probability for each
3. THE Tarot_App SHALL provide visual feedback during the shuffle operation
4. WHEN a shuffle is initiated, THE Tarot_App SHALL reset any previously drawn cards

### Requirement 4: Single Card Draw

**User Story:** As a user, I want to draw a single card for a quick daily reading, so that I can get guidance without committing to a full spread.

#### Acceptance Criteria

1. WHEN a user selects single card draw mode, THE Tarot_App SHALL display one Card_Back in the reading area
2. WHEN a user clicks on the Card_Back, THE Tarot_App SHALL play a Card_Flip_Animation revealing the Card_Face
3. WHEN the card is revealed, THE Tarot_App SHALL display the card in its assigned Card_Orientation
4. WHEN an Upright_Card is revealed, THE Tarot_App SHALL display the meaning_up text
5. WHEN a Reversed_Card is revealed, THE Tarot_App SHALL display the meaning_rev text
6. WHEN a card is revealed, THE Tarot_App SHALL display the card name and description

### Requirement 5: Three Card Spread

**User Story:** As a user, I want to perform a three-card past/present/future spread, so that I can gain deeper insight into my situation.

#### Acceptance Criteria

1. WHEN a user selects three card spread mode, THE Tarot_App SHALL display three Card_Backs labeled "Past", "Present", and "Future"
2. WHEN a user clicks on any Card_Back, THE Tarot_App SHALL play a Card_Flip_Animation revealing that specific Card_Face
3. THE Tarot_App SHALL allow cards to be revealed in any order chosen by the user
4. WHEN all three cards are revealed, THE Tarot_App SHALL ensure each card is unique (no duplicate cards in a single reading)
5. WHEN displaying a revealed card, THE Tarot_App SHALL show the position label (Past/Present/Future), card name, and appropriate meaning based on Card_Orientation

### Requirement 6: Card Flip Animation

**User Story:** As a user, I want cards to flip over with a smooth animation, so that the reveal feels magical and engaging.

#### Acceptance Criteria

1. THE Card_Flip_Animation SHALL use framer-motion to animate a 3D rotation effect
2. THE Card_Flip_Animation SHALL transition from Card_Back to Card_Face over a duration between 0.5 and 1 second
3. WHILE a card is flipping, THE Tarot_App SHALL prevent additional clicks on that card
4. THE Card_Flip_Animation SHALL maintain the card's assigned rotation (upright or reversed) throughout the animation

### Requirement 7: Mobile Responsiveness

**User Story:** As a mobile user, I want the tarot app to work well on my phone, so that I can do readings anywhere.

#### Acceptance Criteria

1. WHEN viewed on screens narrower than 640px, THE Tarot_App SHALL display cards in a single column layout
2. WHEN viewed on screens wider than 640px, THE Tarot_App SHALL display the three card spread in a horizontal row
3. THE Tarot_App SHALL ensure all cards are fully visible without horizontal scrolling on any screen size
4. THE Tarot_App SHALL scale card sizes proportionally to available screen width while maintaining aspect ratio

### Requirement 8: Visual Design Integration

**User Story:** As a site visitor, I want the tarot app to match the existing portfolio site styling, so that the experience feels cohesive.

#### Acceptance Criteria

1. THE Tarot_App SHALL use the existing site color palette (primary: #0D2F3F, secondary: #286F6C, background: #F8F7F1)
2. THE Tarot_App SHALL use framer-motion animations consistent with other site components (staggerChildren, fadeIn, textVariant patterns)
3. THE Tarot_App SHALL use SCSS modules following the existing project pattern
4. THE Card_Back design SHALL incorporate colors from the site's accent palette (#6D4B8A purple, #4A90A4 teal gradient)

### Requirement 9: Reading State Management

**User Story:** As a user, I want to start a new reading easily, so that I can do multiple readings in one session.

#### Acceptance Criteria

1. THE Tarot_App SHALL provide a "New Reading" button to reset the current reading
2. WHEN a new reading is started, THE Tarot_App SHALL return all drawn cards to the deck and re-shuffle
3. THE Tarot_App SHALL allow switching between single card and three card spread modes at any time
4. WHEN switching reading modes, THE Tarot_App SHALL reset the current reading state
