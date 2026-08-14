# Requirements Document

## Introduction

A two-tier test architecture for the portfolio/tarot application that separates fast pre-push smoke tests from comprehensive CI tests. The architecture provides a regression safety net via a git pre-push hook while maintaining sub-10s execution for the critical path, and organizes property-based tests alongside unit/component tests with clear conventions.

## Glossary

- **Test_Runner**: The Vitest test execution engine configured for this project
- **Pre_Push_Gate**: A git pre-push hook that executes the FAST tier tests and blocks push on failure
- **FAST_Tier**: The subset of tests tagged for pre-push execution (smoke + critical logic), target <10s
- **FULL_Tier**: The complete test suite including property-based tests, run in CI or manually
- **Smoke_Test**: A minimal component render test that verifies a component mounts without throwing
- **Property_Test**: A test using fast-check to verify invariants across many generated inputs
- **Interpretation_Service**: The synchronous module that generates tarot reading interpretations from drawn cards
- **Gemini_Client**: The module that calls the server-side Gemini API with retry and timeout logic
- **Conversation_Hook**: The useConversation React hook managing turn state, API calls, and fallback behavior
- **Deck_Hook**: The useTarotDeck React hook managing card shuffling, drawing, and deck partition state

## Requirements

### Requirement 1: Two-Tier Test Organization

**User Story:** As a developer, I want tests organized into FAST and FULL tiers, so that I can run critical tests quickly before pushing while still having comprehensive coverage available.

#### Acceptance Criteria

1. THE Test_Runner SHALL support a `test:fast` script that executes only FAST tier tests
2. THE Test_Runner SHALL support a `test:full` script that executes all tests including property-based tests
3. WHEN running the FAST tier, THE Test_Runner SHALL complete execution in under 10 seconds
4. THE Test_Runner SHALL distinguish test tiers by file naming convention (`.fast.test.js` for FAST, `.property.test.js` for property tests, `.test.js` for FULL-only)
5. WHEN a test file uses the `.fast.test.js` suffix, THE Test_Runner SHALL include it in both FAST and FULL tier runs

### Requirement 2: Pre-Push Git Hook

**User Story:** As a developer, I want a pre-push git hook that blocks pushes when critical tests fail, so that regressions are caught before code reaches main.

#### Acceptance Criteria

1. WHEN a developer executes `git push`, THE Pre_Push_Gate SHALL run the FAST tier test suite
2. WHEN any FAST tier test fails, THE Pre_Push_Gate SHALL block the push and display the failure output
3. WHEN all FAST tier tests pass, THE Pre_Push_Gate SHALL allow the push to proceed
4. THE Pre_Push_Gate SHALL complete execution in under 10 seconds to avoid disrupting workflow
5. THE Pre_Push_Gate SHALL be implemented as a `.git/hooks/pre-push` script with an installer script committed to the repository

### Requirement 3: Component Smoke Tests

**User Story:** As a developer, I want smoke tests for key components that verify they render without crashing, so that I catch broken imports, missing providers, or render errors immediately.

#### Acceptance Criteria

1. WHEN the ConversationMode component is rendered in a test environment, THE Smoke_Test SHALL verify it mounts without throwing an error
2. WHEN the Tarot component is rendered in a test environment, THE Smoke_Test SHALL verify it mounts without throwing an error
3. WHEN a component requires React Router context, THE Smoke_Test SHALL provide a MemoryRouter wrapper
4. WHEN a component makes API calls during render, THE Smoke_Test SHALL use mocked service modules to prevent network requests
5. THE Smoke_Test files SHALL use the `.fast.test.js` suffix to be included in the FAST tier

### Requirement 4: Critical Business Logic Tests

**User Story:** As a developer, I want unit tests for critical business logic modules, so that core functionality regressions are caught in the FAST tier.

#### Acceptance Criteria

1. WHEN the Interpretation_Service receives an array of drawn cards, THE Test_Runner SHALL verify it returns an object with summary, reflections, and connections fields
2. WHEN the Interpretation_Service receives a reversed card, THE Test_Runner SHALL verify it uses the `meaning_rev` field
3. WHEN the Interpretation_Service receives an upright card, THE Test_Runner SHALL verify it uses the `meaning_up` field
4. WHEN the Gemini_Client receives a 5xx response, THE Test_Runner SHALL verify it retries the request
5. WHEN the Gemini_Client request times out, THE Test_Runner SHALL verify it retries with an appropriate error message
6. WHEN the Gemini_Client exhausts all retries, THE Test_Runner SHALL verify it throws the last error
7. WHEN the Gemini_Client receives a 4xx response (non-500), THE Test_Runner SHALL verify it does not retry
8. THE critical logic test files SHALL use the `.fast.test.js` suffix to be included in the FAST tier

### Requirement 5: Deck Randomization Property Tests

**User Story:** As a developer, I want property-based tests for deck randomization, so that I have strong guarantees about shuffle fairness and deck integrity across many inputs.

#### Acceptance Criteria

1. FOR ALL shuffle operations on a deck of N cards, THE Property_Test SHALL verify the output contains exactly the same N cards as the input (no duplicates, no missing cards)
2. FOR ALL draw operations of K cards from a deck of N cards, THE Property_Test SHALL verify that remaining deck size equals N minus K and drawn cards do not appear in the remaining deck
3. FOR ALL reset operations, THE Property_Test SHALL verify the deck returns to containing all 78 cards
4. THE Property_Test files SHALL use the `.property.test.js` suffix
5. THE Property_Test files SHALL run a minimum of 100 iterations per property

### Requirement 6: Conversation State Management Tests

**User Story:** As a developer, I want tests for conversation state management, so that turn stacking, fallback behavior, and error recovery are verified.

#### Acceptance Criteria

1. WHEN the Conversation_Hook receives a successful API response, THE Test_Runner SHALL verify a new turn is appended to the turns array
2. WHEN the Conversation_Hook receives an API error, THE Test_Runner SHALL verify it falls back to the Interpretation_Service for a local interpretation
3. WHEN the Conversation_Hook receives an API error, THE Test_Runner SHALL verify the turn is still recorded with fallback data and the error message
4. WHEN the Conversation_Hook is called with an empty or whitespace-only question, THE Test_Runner SHALL verify it does not initiate a request

### Requirement 7: Existing Test Maintenance

**User Story:** As a developer, I want existing failing tests fixed to match current code, so that the test suite runs clean and the pre-push gate functions reliably.

#### Acceptance Criteria

1. WHEN the interpretationService.test.js file is executed, THE Test_Runner SHALL report zero failures against the current Interpretation_Service implementation
2. WHEN existing tests reference outdated function signatures or return shapes, THE Test_Runner SHALL have those tests updated to match current code
3. THE Test_Runner SHALL not require mocking of localStorage or sessionStorage (jsdom built-in is sufficient)
