# Requirements Document

## Introduction

The tarot app currently splits its experience across two disconnected pages (/tarot and /conversation) with overlapping controls and inconsistent flows. This redesign unifies both experiences into a single page at /tarot with two clear modes: Classic (free, client-side) and AI Reading (Gemini-powered). The goal is to simplify controls, improve card descriptions with traditional Rider-Waite meanings, and deliver context-aware AI interpretations that adapt to question type.

## Glossary

- **Unified_Tarot_Page**: The single page component at /tarot that houses both Classic and AI modes
- **Mode_Toggle**: A pill/tab-style control allowing the user to switch between Classic and AI Reading modes
- **Classic_Mode**: A free, fully client-side reading mode using pre-written Rider-Waite card meanings
- **AI_Mode**: A Gemini-powered reading mode that provides contextual, conversational interpretations
- **Spread_Selector**: A control offering three spread options: Single Card, Three Card, and Celtic Cross
- **Question_Input**: An optional text field where the user can type a question before drawing cards
- **Draw_Button**: The primary call-to-action button that triggers a card draw for the selected spread
- **Card_Description**: The traditional Rider-Waite meaning text associated with each of the 78 tarot cards (upright and reversed)
- **Question_Type_Detector**: Logic within the AI system prompt that identifies the intent category of a user's question (Love, Career, Self/Growth, General)
- **Conversation_History**: The multi-turn conversation UI displayed in AI mode, powered by ReadingMemoryService
- **ReadingMemoryService**: The existing service that manages condensed reading history and conversation turns for AI mode

## Requirements

### Requirement 1: Unified Page with Mode Toggle

**User Story:** As a tarot user, I want a single unified page with a clear mode toggle, so that I can easily choose between a free Classic reading and an AI-powered reading without navigating between separate pages.

#### Acceptance Criteria

1. WHEN a user navigates to /tarot, THE Unified_Tarot_Page SHALL display the Mode_Toggle with "Classic" and "AI Reading" options
2. WHEN the user selects a mode via the Mode_Toggle, THE Unified_Tarot_Page SHALL switch to the selected mode without a page reload
3. THE Unified_Tarot_Page SHALL default to Classic_Mode when no mode preference is stored
4. WHEN a user navigates to /conversation, THE application SHALL redirect to /tarot with AI_Mode active

### Requirement 2: Simplified Controls

**User Story:** As a tarot user, I want a minimal set of clear controls, so that I can draw cards without confusion from overlapping buttons and redundant options.

#### Acceptance Criteria

1. THE Unified_Tarot_Page SHALL display exactly three spread options in the Spread_Selector: Single Card, Three Card, and Celtic Cross
2. THE Unified_Tarot_Page SHALL display one Question_Input field for the user to optionally type a question
3. THE Unified_Tarot_Page SHALL display one Draw_Button as the primary call-to-action
4. THE Unified_Tarot_Page SHALL display a Reset button to clear drawn cards, interpretation, and question
5. THE Unified_Tarot_Page SHALL display the Mode_Toggle control
6. THE Unified_Tarot_Page SHALL display a text size toggle for accessibility
7. THE Unified_Tarot_Page SHALL NOT display separate Auto Mode buttons, a Shuffle button, a clickable deck-to-draw interaction, or a deck count display

### Requirement 3: Classic Mode Reading Flow

**User Story:** As a user who wants a free reading, I want to draw cards and see traditional Rider-Waite meanings without any API calls, so that I can get a reading instantly and without cost.

#### Acceptance Criteria

1. WHEN the user is in Classic_Mode and clicks Draw_Button, THE Unified_Tarot_Page SHALL draw the number of cards specified by the selected spread
2. WHEN cards are drawn in Classic_Mode, THE Unified_Tarot_Page SHALL display each card with its artwork and traditional Card_Description (upright or reversed)
3. WHEN cards are drawn in Classic_Mode, THE Unified_Tarot_Page SHALL display a spread-level static interpretation based on the spread type and card positions
4. WHILE in Classic_Mode, THE Unified_Tarot_Page SHALL NOT make any external API calls
5. WHEN the user clicks Reset in Classic_Mode, THE Unified_Tarot_Page SHALL clear all drawn cards, the interpretation, and the question field

### Requirement 4: AI Mode Reading Flow

**User Story:** As a user seeking deeper insight, I want an AI-powered reading that interprets my cards in context of my question, so that I can receive personalized and meaningful guidance.

#### Acceptance Criteria

1. WHEN the user is in AI_Mode and clicks Draw_Button, THE Unified_Tarot_Page SHALL draw cards and send them along with the question to the Gemini API for interpretation
2. WHEN the Gemini API returns an interpretation in AI_Mode, THE Unified_Tarot_Page SHALL display the contextual interpretation below the drawn cards
3. WHEN an interpretation is displayed in AI_Mode, THE Unified_Tarot_Page SHALL allow the user to ask follow-up questions via the Question_Input
4. WHILE in AI_Mode, THE ReadingMemoryService SHALL maintain multi-turn conversation history for the session
5. WHEN a follow-up question is submitted in AI_Mode, THE Unified_Tarot_Page SHALL display the Conversation_History below the current reading
6. IF the Gemini API call fails in AI_Mode, THEN THE Unified_Tarot_Page SHALL display an error message and offer a retry option

### Requirement 5: Context-Aware AI Interpretations

**User Story:** As a user asking about a specific life area, I want the AI interpretation to adapt its perspective to my question type, so that the reading feels relevant and personally meaningful.

#### Acceptance Criteria

1. WHEN a question is submitted in AI_Mode, THE Question_Type_Detector SHALL classify the question into one of four categories: Love, Career, Self/Growth, or General
2. WHEN the detected question type is Love, THE AI interpretation SHALL adopt a relationship-focused perspective referencing feelings and connections
3. WHEN the detected question type is Career, THE AI interpretation SHALL adopt a professionally-focused perspective referencing direction and timing
4. WHEN the detected question type is Self/Growth, THE AI interpretation SHALL adopt an introspective perspective inviting self-reflection
5. WHEN the detected question type is General or undetectable, THE AI interpretation SHALL provide a balanced multi-angle interpretation
6. THE AI interpretation SHALL reference traditional Rider-Waite-Smith card symbolism including imagery, numerology, and suit elements
7. THE AI interpretation SHALL structure its response as: brief insight, card-by-card analysis, thematic connections, and one closing reflection question

### Requirement 6: Traditional Rider-Waite Card Descriptions

**User Story:** As a tarot enthusiast, I want each card to have proper traditional Rider-Waite meanings, so that the readings feel grounded in established tarot tradition rather than generic summaries.

#### Acceptance Criteria

1. THE tarot deck data SHALL contain entries for all 78 cards (22 Major Arcana, 56 Minor Arcana)
2. THE Card_Description for each card SHALL include an upright meaning of two to three sentences
3. THE Card_Description for each card SHALL include a reversed meaning of two to three sentences
4. THE Card_Description for each card SHALL include three to five keywords
5. THE Card_Description content SHALL use traditional tarot language grounded in the Rider-Waite-Smith tradition without modern tech metaphors

### Requirement 7: Routing and Backward Compatibility

**User Story:** As a returning user or someone with bookmarked links, I want old URLs to continue working, so that I am not presented with broken pages.

#### Acceptance Criteria

1. WHEN a user navigates to /tarot, THE application SHALL render the Unified_Tarot_Page
2. WHEN a user navigates to /conversation, THE application SHALL redirect to /tarot with AI_Mode selected
3. THE application SHALL remove ConversationMode as a separate route component

### Requirement 8: Mobile Responsiveness

**User Story:** As a mobile user, I want the unified tarot experience to work well on small screens, so that I can get readings on my phone.

#### Acceptance Criteria

1. THE Unified_Tarot_Page SHALL follow the project's existing media query breakpoints for responsive layout
2. WHEN viewed on a screen narrower than the tablet breakpoint, THE Spread_Selector SHALL stack its options vertically or wrap gracefully
3. WHEN viewed on a mobile screen, THE Mode_Toggle SHALL remain accessible and clearly tappable

### Requirement 9: Analytics Continuity

**User Story:** As a product owner, I want analytics events to continue firing for key user interactions, so that I can track usage patterns across the redesigned experience.

#### Acceptance Criteria

1. WHEN the user draws cards, THE Unified_Tarot_Page SHALL fire the TAROT_READING_STARTED analytics event
2. WHEN an interpretation is generated (Classic or AI), THE Unified_Tarot_Page SHALL fire the TAROT_READING_GENERATED analytics event
3. WHEN the user asks a follow-up question in AI_Mode, THE Unified_Tarot_Page SHALL fire the FOLLOW_UP_QUESTION_ASKED analytics event
4. WHEN the user switches modes via Mode_Toggle, THE Unified_Tarot_Page SHALL fire an analytics event indicating the mode change

### Requirement 10: No Regression to Deck Logic

**User Story:** As a developer, I want the existing useTarotDeck hook to remain the source of truth for deck operations, so that card shuffling, drawing, and state management remain reliable.

#### Acceptance Criteria

1. THE Unified_Tarot_Page SHALL use the existing useTarotDeck hook for all deck operations (shuffle, draw, reset)
2. WHEN cards are drawn, THE useTarotDeck hook SHALL continue to handle card randomization and reversal logic
3. THE Unified_Tarot_Page SHALL NOT duplicate or bypass the deck logic provided by useTarotDeck
