# Requirements Document

## Introduction

This document defines the requirements for adding conversation continuity to the existing Tarot Conversation Mode. Currently, each question is sent to Gemini independently with no memory of previous exchanges. This feature introduces multi-turn conversation support using Gemini's `startChat({ history })` API, a ReadingMemoryService for managing condensed reading history, and bounded context construction to keep token usage predictable and response times fast. The result is a seamless experience where the user feels like they are continuing a conversation with the same tarot reader.

## Glossary

- **Conversation_Turn**: A single user/model exchange consisting of a role, content, and timestamp
- **Reading_Summary**: A condensed representation of a completed reading containing the question, card names, and a short thematic summary
- **ReadingMemoryService**: A client-side service responsible for storing reading summaries, managing session history, and constructing Gemini history arrays
- **Gemini_History**: The array of previous conversation turns passed to `startChat({ history })` to provide multi-turn context
- **Context_Window**: The bounded set of prior information sent to Gemini for each new request, comprising recent turns and reading summaries
- **Session**: The duration of a user's continuous interaction on the Conversation Page, optionally persisted to sessionStorage
- **Gemini_Handler**: The server-side API route that interacts with the Gemini API using the `@google/generative-ai` SDK
- **Turn_Limit**: The maximum number of recent conversation turns (6) included in the context window
- **Summary_Limit**: The maximum number of recent reading summaries (3) included in the context window

## Requirements

### Requirement 1: Multi-Turn Conversation via startChat

**User Story:** As a user, I want follow-up readings to feel like a continuation of the same conversation, so that the tarot reader acknowledges and builds upon previous readings.

#### Acceptance Criteria

1. WHEN a follow-up question is submitted, THE Gemini_Handler SHALL use `startChat({ history })` with a constructed Gemini_History array instead of `generateContent()`
2. WHEN the Gemini_History is constructed, THE Gemini_Handler SHALL include turns formatted as `{ role: "user" | "model", parts: [{ text }] }` matching the Gemini SDK format
3. WHEN a user submits the first question in a session, THE Gemini_Handler SHALL use `startChat({ history: [] })` with an empty history array
4. THE Gemini_Handler SHALL send the current user question via `sendMessage()` after initializing the chat with history

### Requirement 2: Reading Summary Generation

**User Story:** As a user, I want each reading to be condensed into a brief summary, so that the tarot reader can reference past themes without consuming excessive tokens.

#### Acceptance Criteria

1. WHEN a Gemini interpretation completes, THE ReadingMemoryService SHALL generate and store a Reading_Summary containing the question, card names, and a short thematic summary
2. EACH Reading_Summary SHALL contain: the original question, an array of card names with reversal status, and a summary string of no more than 100 words
3. THE ReadingMemoryService SHALL NOT store full interpretation text in Reading_Summaries
4. WHEN generating the thematic summary, THE ReadingMemoryService SHALL extract key themes from the interpretation response

### Requirement 3: Conversation Turn Storage

**User Story:** As a developer, I want conversation turns stored in a consistent format, so that they can be reliably used to construct Gemini history.

#### Acceptance Criteria

1. THE ReadingMemoryService SHALL store each conversation turn with the structure: `{ role: "user" | "model", content: string, timestamp: string }`
2. WHEN a user submits a question, THE ReadingMemoryService SHALL store a turn with role "user" and the question text as content
3. WHEN Gemini returns an interpretation, THE ReadingMemoryService SHALL store a turn with role "model" and the response text as content
4. THE ReadingMemoryService SHALL persist conversation turns in client-side state within the useConversation hook

### Requirement 4: Bounded Context Construction

**User Story:** As a developer, I want token usage to remain predictable and bounded, so that response times stay fast regardless of conversation length.

#### Acceptance Criteria

1. WHEN building Gemini_History, THE ReadingMemoryService SHALL include a maximum of 6 recent conversation turns (Turn_Limit)
2. WHEN building Gemini_History, THE ReadingMemoryService SHALL include a maximum of 3 recent reading summaries (Summary_Limit)
3. THE ReadingMemoryService SHALL NOT include complete prior interpretation texts in the Gemini_History
4. THE ReadingMemoryService SHALL NOT include the entire card database in the Gemini_History
5. WHEN the number of conversation turns exceeds the Turn_Limit, THE ReadingMemoryService SHALL use only the most recent 6 turns

### Requirement 5: Context Construction Order

**User Story:** As a developer, I want a well-defined context structure sent to Gemini, so that the model receives information in an optimal order for generating contextual responses.

#### Acceptance Criteria

1. WHEN constructing context for Gemini, THE ReadingMemoryService SHALL build the history in this order: previous reading summaries (last 3), then recent conversation turns (last 6)
2. THE Gemini_Handler SHALL include the existing system prompt (tarot guide instructions) as the systemInstruction
3. THE Gemini_Handler SHALL include the current cards (names and reversal status) in the current user message
4. THE Gemini_Handler SHALL include the current user question in the current user message sent via `sendMessage()`

### Requirement 6: ReadingMemoryService Interface

**User Story:** As a developer, I want a dedicated service to manage reading memory, so that memory logic is encapsulated and testable independently from UI components.

#### Acceptance Criteria

1. THE ReadingMemoryService SHALL expose a `saveReading(reading)` method that stores a condensed Reading_Summary
2. THE ReadingMemoryService SHALL expose a `getSessionHistory()` method that returns all conversation turns for the current session
3. THE ReadingMemoryService SHALL expose a `getRecentReadingSummaries()` method that returns the last 3 Reading_Summaries
4. THE ReadingMemoryService SHALL expose a `buildGeminiHistory()` method that constructs and returns the Gemini_History array
5. THE ReadingMemoryService SHALL be implemented as a standalone module independent of React component lifecycle

### Requirement 7: Session Persistence

**User Story:** As a user, I want my conversation to survive accidental tab refreshes, so that I do not lose my reading history within the same browser tab session.

#### Acceptance Criteria

1. THE ReadingMemoryService SHALL persist conversation turns and reading summaries to sessionStorage
2. WHEN the Conversation Page loads, THE ReadingMemoryService SHALL restore any previously saved session data from sessionStorage
3. WHEN the browser tab is closed, THE session data SHALL be cleared automatically by the browser's sessionStorage behavior
4. IF sessionStorage is unavailable, THEN THE ReadingMemoryService SHALL fall back to in-memory storage without error

### Requirement 8: No Regression to Existing Functionality

**User Story:** As a user, I want existing conversation mode features to continue working as before, so that adding continuity does not break my current experience.

#### Acceptance Criteria

1. WHEN conversation continuity is added, THE existing question submission flow SHALL continue to function without modification to user-facing behavior
2. WHEN conversation continuity is added, THE existing card drawing and display logic SHALL remain unchanged
3. WHEN conversation continuity is added, THE existing error handling and retry mechanism SHALL continue to function
4. THE existing Conversation_Turn structure (id, timestamp, question, cards, interpretation) SHALL remain compatible with the new turn storage format

### Requirement 9: Performance Constraints

**User Story:** As a user, I want response times to remain fast as my conversation grows longer, so that the experience stays smooth throughout the session.

#### Acceptance Criteria

1. THE Gemini_Handler SHALL NOT send complete chat history beyond the Turn_Limit of 6 turns
2. THE Gemini_Handler SHALL NOT send complete prior interpretation responses in the history
3. THE Gemini_Handler SHALL NOT send the entire card database with each request
4. WHEN the conversation exceeds 6 turns, THE response latency SHALL NOT grow proportionally with conversation length
