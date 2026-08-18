# Implementation Plan: Gemini Model Health Check

## Overview

Implement a self-healing model management system with unified logging. Build in order: Logger utility → cron health check job → request handler observability. Each step produces working, testable code.

## Tasks

- [ ] 1. Create the Logger utility
  - [ ] 1.1 Create `api/lib/logger.js` with the Logger class
    - Constructor accepts `context` string and `options` object (topic, destinations)
    - Implement destination routing: parse `LOG_DESTINATIONS` env var, default to `['vercel', 'ntfy']` when `VERCEL` env is present, `['debug']` otherwise
    - Implement `info(message, data)`, `warn(message, data)`, `error(message, data)` methods
    - Implement `time(label)` helper that returns a function yielding elapsed ms
    - Console output format: `[ISO timestamp] [LEVEL] [context] message | key=value pairs`
    - Truncate data values longer than 200 chars
    - ntfy integration: POST to `https://ntfy.sh/{topic}` with severity-mapped priority (info=3, warn=4, error=5)
    - ntfy failures caught and logged to console, never thrown
    - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8_

  - [ ]* 1.2 Write property tests for Logger
    - **Property 1: Logger destination routing correctness**
    - **Property 2: Logger ntfy severity mapping**
    - **Validates: Requirements 1.2, 1.3, 1.6, 1.7**

  - [ ]* 1.3 Write unit tests for Logger
    - Test ntfy failure fallback to console only
    - Test time() helper returns correct elapsed format
    - Test data truncation at 200 chars
    - _Requirements: 1.8_

- [ ] 2. Implement the cron health check job
  - [ ] 2.1 Create `api/cron/model-health.js` with handler skeleton and auth check
    - Export default async handler with `config = { maxDuration: 60 }`
    - Instantiate Logger with context "HealthCheck"
    - Log start with all env var presence/absence
    - Validate `Authorization: Bearer ${CRON_SECRET}` header, log rejection, return 401 if invalid
    - Log auth success and proceed
    - _Requirements: 2.1, 2.2, 2.3, 2.4_

  - [ ]* 2.2 Write property test for auth check
    - **Property 3: Invalid authorization always returns 401**
    - **Validates: Requirements 2.4**

  - [ ] 2.3 Implement `testModel` function
    - POST to Gemini generateContent endpoint with "Say hello" prompt
    - 10-second AbortController timeout
    - Log before test, log result with elapsed time and status/body on failure
    - Return `{ ok, status, message, elapsed }`
    - _Requirements: 3.1, 3.2, 3.3, 3.4, 8.3_

  - [ ] 2.4 Implement `discoverFlashModels` function
    - GET Gemini models list endpoint
    - Log total models received and flash model count
    - Filter: name includes "flash" AND supportedGenerationMethods includes "generateContent"
    - Strip `models/` prefix, sort descending (newest first)
    - Log each filter result
    - _Requirements: 4.1, 4.2_

  - [ ]* 2.5 Write property test for flash model filter
    - **Property 6: Flash model filter correctness**
    - **Validates: Requirements 4.2**

  - [ ] 2.6 Implement candidate testing loop
    - Iterate flash models, call `testModel` on each
    - Log each candidate attempt with index (e.g., "Testing candidate 2/5")
    - Stop at first success, log successful candidate
    - If all fail, log exhaustion
    - _Requirements: 4.3, 4.4, 4.5, 4.7_

  - [ ]* 2.7 Write property test for candidate selection
    - **Property 7: First successful candidate wins**
    - **Validates: Requirements 4.3, 4.4**

  - [ ] 2.8 Implement `updateVercelEnvVar` function
    - GET env vars list, find GEMINI_MODEL by key name, log found/not-found
    - PATCH env var with new value, log success/failure with elapsed time
    - Return result object
    - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5_

  - [ ] 2.9 Implement `triggerRedeploy` function
    - POST to Vercel deployments API with production target
    - Log attempt, success (with deployment ID), or failure
    - Return result object
    - _Requirements: 6.1, 6.2, 6.3_

  - [ ] 2.10 Wire the full orchestration flow in the handler
    - Test current model → if healthy, log + notify + return
    - If broken → discover → test candidates → update env var → redeploy → notify
    - If all fail → log + notify high priority
    - Wrap everything in outer try/catch that logs + notifies on unhandled exceptions
    - End every path with a "DONE: {outcome}" log line
    - _Requirements: 3.1, 3.2, 3.3, 3.4, 4.1-4.7, 5.1-5.5, 6.1-6.3, 7.1-7.5, 8.1_

  - [ ]* 2.11 Write property tests for orchestration
    - **Property 4: Successful model test prevents rotation**
    - **Property 5: HTTP errors trigger model discovery**
    - **Property 9: Unhandled exceptions always produce log + notification**
    - **Property 12: Every operation produces a log entry**
    - **Validates: Requirements 3.2, 3.3, 8.1**

  - [ ]* 2.12 Write unit tests for error scenarios
    - Test Gemini Models API failure sends notification (Req 4.6)
    - Test Vercel API list failure sends notification (Req 5.4)
    - Test Vercel API update failure sends notification (Req 5.5)
    - Test redeploy failure still considers rotation successful (Req 6.3)
    - Test timeout triggers discovery (Req 3.4)
    - _Requirements: 3.4, 4.6, 5.4, 5.5, 6.3_

- [ ] 3. Checkpoint - Verify cron job works
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 4. Add structured logging to request handler
  - [ ] 4.1 Refactor `api/gemini.js` to use Logger with full breadcrumb coverage
    - Import Logger, instantiate with context "Gemini"
    - First line: log handler invoked with method, URL, all env var status
    - Log method check rejection if not POST
    - Log fatal error + return 500 if GEMINI_API_KEY missing
    - Log request start with model, spread type, card count
    - Log each model attempt with attempt number
    - Log success with model used, elapsed, response length
    - Log fallback trigger with failed model, status, next model
    - Log all-models-exhausted with list of tried models
    - Log final response sent
    - _Requirements: 9.1, 9.2, 9.3, 9.4, 9.5, 9.6, 9.7_

  - [ ]* 4.2 Write property tests for request handler logging
    - **Property 10: Env var presence logging accuracy**
    - **Property 11: Fallback chain triggers only on 404/503**
    - **Validates: Requirements 9.1, 10.3**

  - [ ]* 4.3 Write unit tests for request handler edge cases
    - Test missing API key produces log + ntfy + 500 (Req 9.2)
    - Test all fallbacks exhausted produces notification (Req 10.5)
    - _Requirements: 9.2, 10.5_

- [ ] 5. Update Vercel configuration
  - [ ] 5.1 Update `vercel.json` with crons configuration
    - Add `"crons": [{ "path": "/api/cron/model-health", "schedule": "0 */6 * * *" }]`
    - Preserve all existing config (framework, buildCommand, rewrites, etc.)
    - _Requirements: 2.2_

  - [ ] 5.2 Update `.env.local.example` with new env vars
    - Add `VERCEL_API_TOKEN`, `VERCEL_PROJECT_ID`, `CRON_SECRET`, `LOG_DESTINATIONS`
    - Document each var's purpose in comments
    - _Requirements: 2.3, 5.1_

- [ ] 6. Write notification integration tests
  - [ ]* 6.1 Write property test for notification topic routing
    - **Property 8: All notifications use configured topic**
    - **Validates: Requirements 7.5**

- [ ] 7. Final checkpoint
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- The Logger is built first because everything else depends on it
- All external API calls are mocked in tests via Vitest's `vi.stubGlobal('fetch', ...)`
- Property tests use `fast-check` with minimum 100 iterations
- Install `fast-check` as a dev dependency before running property tests
