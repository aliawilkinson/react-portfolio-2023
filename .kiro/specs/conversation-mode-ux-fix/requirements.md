# Requirements Document

## Introduction

The Conversation Mode at `/tarot/conversation` has significant UX issues across mobile and desktop. This spec addresses layout, scrolling, persistence, and interaction problems to deliver a chat-like experience comparable to ChatGPT/Claude/Gemini apps. The goal is a fluid, natural conversation interface where the input is always accessible, turns stack chronologically, and history survives page refresh.

## Glossary

- **Conversation_Mode**: The tarot conversation interface at `/tarot/conversation` that allows users to ask questions, draw cards, and receive AI interpretations
- **Turn**: A single question-response pair consisting of the user's question, drawn cards, and interpretation
- **Input_Bar**: The textarea and submit button anchored at the bottom of the viewport
- **Site_Header**: The main navigation header component rendered by `Header.jsx`
- **Visual_Viewport**: The browser's `window.visualViewport` API representing the visible area (shrinks when mobile keyboard opens)
- **Conversation_History**: The ordered list of all turns in the current conversation
- **Export_Service**: The module responsible for serializing conversation history into a downloadable format

## Requirements

### Requirement 1: Full-Page Chat Layout

**User Story:** As a user, I want the conversation mode to use the entire viewport as a chat interface, so that I have maximum space for reading and interacting with my tarot conversation.

#### Acceptance Criteria

1. WHEN the Conversation_Mode is active, THE Conversation_Mode SHALL render as a full-viewport layout with the page body scrolling naturally (no fixed-height inner scroll container)
2. WHEN the Conversation_Mode is active on a mobile device (viewport width < 640px), THE Site_Header SHALL be hidden to maximize vertical space for conversation content
3. WHEN the Conversation_Mode is active on a desktop device (viewport width >= 640px), THE Site_Header SHALL remain visible
4. THE Conversation_Mode SHALL display a minimal top bar containing a title and a back navigation link

### Requirement 2: Input Bar Positioning and Behavior

**User Story:** As a user, I want the text input to always be visible and accessible at the bottom of my screen, so that I can type questions without scrolling or hunting for the input field.

#### Acceptance Criteria

1. THE Input_Bar SHALL remain visually anchored at the bottom of the visible viewport at all times
2. WHEN the mobile keyboard opens on iOS, THE Input_Bar SHALL reposition itself above the keyboard using the Visual_Viewport API
3. WHEN the user types multiple lines, THE Input_Bar textarea SHALL auto-expand up to a maximum of 6 rows
4. WHEN the user submits a question, THE Input_Bar textarea SHALL reset to a single row height and clear its content
5. WHEN a question is being processed, THE Input_Bar submit button SHALL be disabled to prevent duplicate submissions

### Requirement 3: Auto-Expanding Textarea

**User Story:** As a user, I want the input area to grow as I type longer questions, so that I can see my full question without scrolling within the textarea.

#### Acceptance Criteria

1. THE Input_Bar textarea SHALL start at a height of one row
2. WHEN the user enters text that exceeds the current row count, THE Input_Bar textarea SHALL expand vertically to accommodate the content
3. WHILE the Input_Bar textarea content exceeds 6 rows, THE Input_Bar textarea SHALL stop expanding and enable internal scrolling
4. WHEN the user submits or clears the textarea, THE Input_Bar textarea SHALL collapse back to one row height

### Requirement 4: Conversation Turn Stacking

**User Story:** As a user, I want all my previous questions and responses to remain visible in chronological order, so that I can review my full conversation history.

#### Acceptance Criteria

1. WHEN a new turn is completed, THE Conversation_Mode SHALL append the turn to the visible conversation history without removing previous turns
2. THE Conversation_Mode SHALL display all turns in chronological order (oldest at top, newest at bottom)
3. WHEN a new turn is added, THE Conversation_Mode SHALL auto-scroll to bring the newest turn into view
4. WHEN the AI fails and a fallback interpretation is generated, THE Conversation_Mode SHALL still append the turn (with fallback content) to the conversation history

### Requirement 5: Conversation Persistence

**User Story:** As a user, I want my conversation history to survive page refreshes, so that I don't lose my readings when I accidentally close or reload the page.

#### Acceptance Criteria

1. WHEN a turn is completed, THE Conversation_Mode SHALL persist the full conversation history (questions, card data, interpretations) to localStorage
2. WHEN the Conversation_Mode loads, THE Conversation_Mode SHALL restore previously persisted conversation history from localStorage and display all restored turns
3. WHEN localStorage data is corrupted or unparseable, THE Conversation_Mode SHALL discard the corrupted data and start a fresh conversation
4. THE Conversation_Mode SHALL provide a mechanism to clear the persisted conversation and start fresh

### Requirement 6: Conversation Export

**User Story:** As a user, I want to export my conversation as a text file, so that I can save or share my tarot readings outside the app.

#### Acceptance Criteria

1. THE Conversation_Mode SHALL provide an export button accessible from the top bar
2. WHEN the user triggers export, THE Export_Service SHALL serialize all turns (question, card names, reversed status, and interpretation text) into a plain-text format
3. WHEN the export is generated, THE Export_Service SHALL trigger a file download with a descriptive filename containing the date
4. IF the conversation history is empty, THEN THE export button SHALL be disabled or hidden

### Requirement 7: Inline Card Display

**User Story:** As a user, I want to see the drawn cards displayed inline within each conversation turn, so that I can easily associate cards with their reading.

#### Acceptance Criteria

1. WHEN a turn is displayed, THE Conversation_Mode SHALL render the drawn cards inline within that turn's content area
2. WHEN viewed on mobile, THE Conversation_Mode SHALL display cards in a horizontally scrollable row that fits within the viewport width
3. WHEN viewed on desktop, THE Conversation_Mode SHALL display cards in a flex-wrap row within the turn content

### Requirement 8: Scrolling Behavior

**User Story:** As a user, I want the page to scroll naturally like a chat app, so that I can browse my conversation history with familiar touch/mouse gestures.

#### Acceptance Criteria

1. THE Conversation_Mode SHALL use the page's native scroll (document body) rather than an inner overflow container for the message area
2. WHEN the user scrolls up through conversation history, THE Input_Bar SHALL remain anchored at the bottom of the viewport
3. WHEN a new turn is appended, THE Conversation_Mode SHALL smooth-scroll to the bottom of the conversation
4. WHEN the user has manually scrolled up (away from the bottom), THE Conversation_Mode SHALL NOT auto-scroll on new turn arrival (to avoid disrupting the user's reading position)
