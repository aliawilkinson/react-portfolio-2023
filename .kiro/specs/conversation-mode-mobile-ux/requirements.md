# Requirements Document

## Introduction

This feature overhauls the mobile UX of the Tarot Conversation Mode (`/tarot/conversation`) to deliver a full-screen, chat-app-like experience modeled after ChatGPT/Claude/Gemini. The goal is to fix input positioning issues on iPhone 15 Pro, eliminate wasted header space on mobile, ensure all conversation turns persist and remain scrollable, persist conversations across page refreshes via localStorage, improve card visibility on small screens, and add conversation export/share capability.

## Glossary

- **Conversation_Mode**: The chat-like tarot reading interface at `/tarot/conversation`
- **Input_Bar**: The text input area pinned at the bottom of the viewport where users type questions
- **Turn**: A single question-and-response pair containing the user's question, drawn cards, and interpretation
- **Conversation_History**: The ordered collection of all turns in the current conversation session
- **Message_Area**: The scrollable region displaying all previous turns above the Input_Bar
- **Header_Nav**: The site-wide navigation header rendered by the Header component
- **Visual_Viewport**: The browser's `window.visualViewport` API representing the visible area (shrinks when virtual keyboard opens on iOS)
- **Conversation_Store**: The localStorage-backed persistence layer for conversation data
- **Export_Payload**: A formatted text or JSON representation of the conversation suitable for sharing

## Requirements

### Requirement 1: Full-Screen Mobile Chat Layout

**User Story:** As a mobile user, I want the conversation mode to occupy the full visible screen without site navigation, so that I have maximum space for the chat experience.

#### Acceptance Criteria

1. WHILE the viewport width is below 640px (the $sm breakpoint), THE Conversation_Mode SHALL hide the Header_Nav and occupy 100% of the viewport height using `100dvh`
2. WHILE the viewport width is at or above 640px, THE Conversation_Mode SHALL display the Header_Nav normally and render the conversation within the standard page layout
3. THE Conversation_Mode SHALL render the convTopBar with a back-link to `/tarot` as a compact in-conversation navigation on mobile
4. WHEN the user navigates away from the Conversation_Mode on mobile, THE Header_Nav SHALL become visible again on the destination page

### Requirement 2: Fixed Bottom Input Bar

**User Story:** As a mobile user, I want the text input always pinned at the bottom of my visible screen, so that I can always find and use it without scrolling.

#### Acceptance Criteria

1. THE Input_Bar SHALL be positioned at the bottom of the Visual_Viewport at all times, using `position: fixed` on mobile and `position: sticky` on desktop
2. WHEN the virtual keyboard opens on iOS, THE Input_Bar SHALL remain visible directly above the keyboard by responding to Visual_Viewport resize events
3. WHEN the virtual keyboard closes, THE Input_Bar SHALL return to the bottom of the viewport without delay or visual jump
4. THE Input_Bar SHALL respect `env(safe-area-inset-bottom)` for devices with home indicators
5. THE Input_Bar textarea SHALL auto-expand from 1 row up to a maximum of 6 rows as the user types multi-line text

### Requirement 3: Scrollable Conversation History

**User Story:** As a user, I want all previous conversation turns to remain visible and scrollable above the input, so that I can reference earlier readings.

#### Acceptance Criteria

1. THE Message_Area SHALL display all turns from the current session in chronological order, stacking newest at the bottom
2. WHEN a new turn is added, THE Message_Area SHALL auto-scroll to the bottom to show the latest response
3. WHILE on mobile (viewport below 640px), THE Message_Area SHALL use native page-level scrolling (the full document scrolls) rather than a fixed-height overflow div, so that scroll behavior feels native and smooth on iOS
4. WHILE on desktop (viewport at or above 640px), THE Message_Area SHALL use a contained scrollable div within the conversation layout
5. THE Message_Area SHALL have bottom padding equal to the Input_Bar height so that the last turn is never obscured by the fixed input

### Requirement 4: Conversation Persistence via localStorage

**User Story:** As a user, I want my tarot conversation to survive page refreshes and browser restarts, so that I do not lose my reading history.

#### Acceptance Criteria

1. WHEN a new turn is completed, THE Conversation_Store SHALL serialize the complete Conversation_History to localStorage immediately
2. WHEN the Conversation_Mode mounts, THE Conversation_Store SHALL restore previously saved turns from localStorage and display them in the Message_Area
3. IF localStorage is unavailable or contains corrupted data, THEN THE Conversation_Store SHALL start with an empty conversation and log a warning without crashing
4. THE Conversation_Store SHALL use a distinct localStorage key from the existing sessionStorage-based ReadingMemoryService to avoid conflicts
5. WHEN the user explicitly clears or starts a new conversation, THE Conversation_Store SHALL remove the persisted data from localStorage

### Requirement 5: Improved Card Visibility on Mobile

**User Story:** As a mobile user, I want to clearly see drawn tarot cards on my phone, so that I can read card names and understand the spread.

#### Acceptance Criteria

1. WHILE the viewport width is below 640px, THE Spread component within a turn SHALL render cards in a horizontal scroll layout with a minimum card width of 120px
2. THE Spread component on mobile SHALL display card names and reversed badges at a legible font size (minimum 14px)
3. WHEN a card is displayed on mobile, THE Spread component SHALL show the position label above the card image

### Requirement 6: Conversation Export and Share

**User Story:** As a user, I want to export or share my tarot conversation, so that I can save it externally or show it to others.

#### Acceptance Criteria

1. THE Conversation_Mode SHALL provide an export action accessible from the convTopBar
2. WHEN the user triggers export, THE Conversation_Mode SHALL generate an Export_Payload containing all turns with questions, card names, positions, reversed status, and interpretation text
3. WHERE the Web Share API is available, THE Conversation_Mode SHALL offer native sharing of the Export_Payload as plain text
4. WHERE the Web Share API is unavailable, THE Conversation_Mode SHALL copy the Export_Payload to the clipboard and display a confirmation message
5. THE Export_Payload SHALL format each turn with a readable timestamp, the question, cards drawn (with positions and reversed indicators), and the interpretation summary

### Requirement 7: Auto-Expanding Multi-Line Input

**User Story:** As a user, I want the input field to grow as I type longer questions, so that I can see my full question without scrolling inside a tiny box.

#### Acceptance Criteria

1. THE Input_Bar textarea SHALL start at 1 row height when empty
2. WHEN the user types text exceeding one line, THE Input_Bar textarea SHALL expand its height to fit the content up to a maximum of 6 rows
3. WHEN the text content exceeds 6 rows, THE Input_Bar textarea SHALL stop growing and enable internal scrolling
4. WHEN the user submits a question, THE Input_Bar textarea SHALL reset to 1 row height
