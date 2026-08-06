# Requirements Document

## Introduction

This document defines the requirements for adding a Conversation Mode to the existing Tarot reading application. Conversation Mode enables an ongoing tarot dialogue where the user can ask multiple questions in a continuous chat experience, receiving AI-powered interpretations via the Gemini API. The feature reuses existing deck logic, card rendering, and spread configurations without modifying or replacing existing reading functionality. The application is deployed on Vercel, and the Gemini API key must remain server-side. Tarot readings are for reflection and entertainment purposes only.

## Glossary

- **Conversation_Mode**: A feature enabling sequential tarot readings with AI-powered interpretation in a chat-like interface
- **Conversation_Page**: The dedicated page at the /conversation route where Conversation Mode operates
- **Conversation_Turn**: A single exchange consisting of a question, drawn cards, and Gemini interpretation
- **Conversation_History**: The scrollable display of all conversation turns during the current session
- **Gemini_Service**: The server-side API route that sends card and question data to the Gemini API and returns structured interpretations
- **Server_Route**: A Vercel-compatible server-side API route that securely accesses the Gemini API key
- **Tarot_App**: The existing React tarot reading application with deck, spread, and interpretation components
- **Deck**: The 78-card tarot deck managed by the existing useTarotDeck hook
- **Spread_Preset**: A predefined spread layout (Single Card, Three Card, Celtic Cross) that determines how many cards are drawn
- **Card_Orientation**: Whether a card is upright or reversed (180° rotation)
- **Auto_Reshuffle**: The automatic deck reset and reshuffle that occurs after each Gemini interpretation completes

## Requirements

### Requirement 1: Conversation Mode Entry Point

**User Story:** As a user, I want a clear entry point to Conversation Mode from the existing readings page, so that I can easily discover and start an AI-powered conversation reading.

#### Acceptance Criteria

1. THE Tarot_App SHALL display a "Conversation Mode" button on the existing home/readings page
2. THE Tarot_App SHALL display a tooltip on the button with text "Start an ongoing tarot conversation. Draw fresh cards for each question and receive AI-powered interpretations."
3. WHEN a user clicks the Conversation Mode button, THE Tarot_App SHALL navigate to the /conversation route

### Requirement 2: Conversation Page Layout

**User Story:** As a user, I want a dedicated conversation page with clear UI components, so that I can interact with the tarot conversation interface intuitively.

#### Acceptance Criteria

1. THE Conversation_Page SHALL display a conversation history area showing previous exchanges
2. THE Conversation_Page SHALL display a question input textbox for the user to type questions
3. THE Conversation_Page SHALL display a Submit/Analyze button to submit a question
4. THE Conversation_Page SHALL display drawn cards using existing tarot card display components
5. THE Conversation_Page SHALL display a loading indicator while the Gemini_Service is processing an interpretation
6. THE Conversation_Page SHALL maintain the existing application styling and theme

### Requirement 3: Question Submission and Card Drawing

**User Story:** As a user, I want to submit a question and automatically receive a card reading, so that I can get an AI-powered tarot interpretation without manually managing the deck.

#### Acceptance Criteria

1. WHEN a user submits a question, THE Conversation_Page SHALL capture the question text
2. WHEN a user submits a question, THE Conversation_Page SHALL draw cards using the existing deck logic from useTarotDeck
3. WHEN drawing cards, THE Conversation_Page SHALL use the currently active Spread_Preset to determine the number of cards drawn, spread layout, and reversal behavior
4. WHEN cards are drawn, THE Conversation_Page SHALL display them immediately using existing card UI components (SpreadCard, Spread)
5. WHEN a user submits an empty question, THE Conversation_Page SHALL prevent submission and maintain the current state

### Requirement 4: Gemini API Integration

**User Story:** As a user, I want my drawn cards to be interpreted by an AI using the Gemini API, so that I receive meaningful, personalized tarot interpretations.

#### Acceptance Criteria

1. WHEN cards are drawn for a question, THE Gemini_Service SHALL send the question, card names, reversal status, and spread type to the Gemini API
2. THE Gemini_Service SHALL include a system prompt instructing Gemini to act as a tarot guide who interprets cards symbolically and psychologically, frames readings as reflective insight, avoids predicting the future, avoids fear-based language, supernatural claims, or deterministic predictions, and maintains a warm conversational tone
3. THE Gemini_Service SHALL request structured output containing: Summary, Interpretation, Key Themes, Reflection Questions, and Actionable Insights
4. WHEN the Gemini API returns a response, THE Conversation_Page SHALL display the interpretation organized into labeled sections
5. WHEN markdown content is present in the Gemini response, THE Conversation_Page SHALL render it with markdown formatting
6. THE Gemini_Service SHALL use the gemini-2.5-flash model as the default

### Requirement 5: Server-Side API Security

**User Story:** As a developer, I want the Gemini API key to remain server-side, so that the application is secure and the key is never exposed to the client.

#### Acceptance Criteria

1. THE Server_Route SHALL read the Gemini API key from the GEMINI_API_KEY environment variable via process.env
2. THE Server_Route SHALL read the model name from the GEMINI_MODEL environment variable with a default of "gemini-2.5-flash"
3. THE Conversation_Page SHALL call the Server_Route for all Gemini API interactions
4. THE Conversation_Page SHALL NOT access the Gemini API key directly from the frontend
5. THE Server_Route SHALL be compatible with both local development (.env.local) and Vercel deployments
6. THE Conversation_Page SHALL NOT call the Gemini API directly from React components

### Requirement 6: Conversation History

**User Story:** As a user, I want to see all my previous exchanges in the current session, so that I can review my readings and notice patterns across questions.

#### Acceptance Criteria

1. THE Conversation_Page SHALL display all previous conversation turns in a scrollable chat-like format
2. WHEN a new conversation turn completes, THE Conversation_Page SHALL append it to the conversation history
3. THE Conversation_Page SHALL persist conversation history while the user remains on the page
4. WHEN the user navigates away from the Conversation_Page, THE Conversation_Page SHALL clear the conversation history
5. EACH Conversation_Turn in the history SHALL display the question, drawn cards, and interpretation

### Requirement 7: Automatic Deck Management

**User Story:** As a user, I want the deck to automatically reset between questions, so that I can ask multiple questions without manually managing the deck state.

#### Acceptance Criteria

1. WHEN the Gemini_Service finishes returning an interpretation, THE Conversation_Page SHALL automatically reset and reshuffle the Deck
2. WHEN the automatic reshuffle completes, THE Conversation_Page SHALL be ready for the next question without user intervention
3. THE Conversation_Page SHALL allow the user to ask an unlimited number of questions in sequence

### Requirement 8: Error Handling

**User Story:** As a user, I want clear error messages when the AI service fails, so that I can understand what happened and retry.

#### Acceptance Criteria

1. IF the Gemini API call fails, THEN THE Conversation_Page SHALL display "Unable to generate interpretation. Please try again."
2. IF the Gemini API call fails, THEN THE Conversation_Page SHALL keep drawn cards visible
3. IF the Gemini API call fails, THEN THE Conversation_Page SHALL allow the user to retry the interpretation
4. IF the Gemini API call times out, THEN THE Conversation_Page SHALL display "The interpretation service is taking longer than expected. Please try again."

### Requirement 9: Reuse of Existing Components

**User Story:** As a developer, I want the Conversation Mode to reuse existing tarot components and logic, so that there is no duplication and existing functionality is not regressed.

#### Acceptance Criteria

1. THE Conversation_Page SHALL reuse the existing useTarotDeck hook for deck state management
2. THE Conversation_Page SHALL reuse the existing SpreadCard component for card rendering
3. THE Conversation_Page SHALL reuse the existing Spread component for card layout
4. THE Conversation_Page SHALL reuse existing Spread_Preset configurations for determining card count and layout
5. THE Conversation_Page SHALL reuse existing card animation and reversal display logic
6. WHEN Conversation Mode is added, THE existing reading modes SHALL continue to function without regression

### Requirement 10: Conversation State Management

**User Story:** As a developer, I want well-structured conversation state, so that each turn is tracked and the UI remains consistent.

#### Acceptance Criteria

1. EACH Conversation_Turn SHALL contain a unique identifier, timestamp, question text, array of drawn cards with reversal status, and interpretation text
2. THE Conversation_Page SHALL store conversation state in client-side component state
3. WHEN a new turn begins, THE Conversation_Page SHALL assign a unique identifier and timestamp to the turn
