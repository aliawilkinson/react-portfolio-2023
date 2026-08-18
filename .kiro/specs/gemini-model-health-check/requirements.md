# Requirements Document

## Introduction

An automated model health-check system for a tarot app that uses the Gemini API via Vercel serverless functions. Google frequently deprecates models without warning, causing silent failures. This feature introduces:

1. A unified logging utility that routes structured log messages to console (debug), Vercel function logs, and ntfy.sh — controlled by environment variables, ensuring no operation is ever silent.
2. A scheduled cron job that validates the current Gemini model, discovers replacements when it fails, and updates the Vercel environment variable automatically.
3. Structured logging and startup validation in the request-time handler (`api/gemini.js`) to catch configuration issues before they cause cryptic failures.

## Glossary

- **Health_Check_Job**: The Vercel serverless cron function at `api/cron/model-health.js` responsible for validating and rotating the Gemini model
- **Request_Handler**: The existing Vercel serverless function at `api/gemini.js` that handles tarot reading requests
- **Logger**: A unified logging utility class that routes messages to configured destinations (console, Vercel logs, ntfy)
- **Log_Destinations**: The set of output channels a log message is sent to: "debug" (console.log for local dev), "vercel" (console.log in production which appears in Vercel function logs), "ntfy" (push notification via ntfy.sh)
- **Current_Model**: The model name stored in the `GEMINI_MODEL` Vercel environment variable
- **Test_Prompt**: A minimal prompt ("Say hello") used to verify a model can generate content
- **Flash_Model**: A Gemini model whose ID contains "flash" and supports the `generateContent` method
- **Model_Rotation**: The process of replacing a broken Current_Model with a working Flash_Model
- **Vercel_Env_API**: The Vercel REST API endpoints for listing and updating project environment variables
- **Gemini_Models_API**: The Google endpoint `GET https://generativelanguage.googleapis.com/v1beta/models` that returns available models
- **Ntfy_Service**: The push notification service at ntfy.sh used to report health check outcomes
- **Startup_Validation**: Code that runs at the top of a handler before any business logic, checking environment configuration
- **Breadcrumb_Log**: A structured log statement marking a specific stage of function execution with contextual data

## Requirements

### Requirement 1: Unified Logger

**User Story:** As a site owner and developer, I want a single logging utility that sends messages to appropriate destinations based on environment, so that I never have silent failures and can debug from anywhere.

#### Acceptance Criteria

1. THE Logger SHALL accept a message, a severity level (info, warn, error), and optional structured data
2. THE Logger SHALL route messages to Log_Destinations based on the `LOG_DESTINATIONS` environment variable (comma-separated list of "debug", "vercel", "ntfy")
3. WHEN `LOG_DESTINATIONS` is not set, THE Logger SHALL default to "vercel,ntfy" in production and "debug" in local development (determined by presence of `VERCEL` env var)
4. WHEN the "debug" destination is active, THE Logger SHALL write structured messages to `console.log` with timestamp, level, context label, and message
5. WHEN the "vercel" destination is active, THE Logger SHALL write structured messages to `console.log` (which Vercel captures as function logs) with timestamp, level, context label, and message
6. WHEN the "ntfy" destination is active and severity is "warn" or "error", THE Logger SHALL send a push notification to the Ntfy_Service with the message as body and severity-appropriate priority
7. WHEN the "ntfy" destination is active and severity is "info", THE Logger SHALL send a push notification to the Ntfy_Service with low priority
8. IF the Ntfy_Service request fails, THEN THE Logger SHALL write the ntfy failure to console and continue without throwing

### Requirement 2: Scheduled Execution

**User Story:** As a site owner, I want the health check to run on a schedule, so that broken models are detected and replaced without manual intervention.

#### Acceptance Criteria

1. THE Health_Check_Job SHALL be a Vercel serverless function located at `api/cron/model-health.js`
2. THE Health_Check_Job SHALL be configured in `vercel.json` with a cron schedule of every 6 hours (`0 */6 * * *`)
3. WHEN the cron schedule triggers, THE Health_Check_Job SHALL log the start of execution with all environment variable presence/absence status, then read the `GEMINI_MODEL` environment variable as the Current_Model
4. WHEN the Health_Check_Job is invoked without a valid `Authorization` header bearing `CRON_SECRET`, THE Health_Check_Job SHALL log the auth rejection, then return a 401 response

### Requirement 3: Current Model Validation

**User Story:** As a site owner, I want the job to test whether the current model works, so that unnecessary rotations are avoided.

#### Acceptance Criteria

1. WHEN the Health_Check_Job runs, THE Health_Check_Job SHALL log the model being tested, then send the Test_Prompt to the Current_Model via the Gemini generateContent REST API
2. WHEN the Current_Model responds successfully to the Test_Prompt, THE Health_Check_Job SHALL log the success with model name and response status, then take no further action
3. WHEN the Current_Model returns an HTTP error (4xx or 5xx), THE Health_Check_Job SHALL log the failure with status code and response body, then proceed to model discovery
4. WHEN the Current_Model times out after 10 seconds, THE Health_Check_Job SHALL log the timeout with model name and elapsed time, then proceed to model discovery

### Requirement 4: Model Discovery

**User Story:** As a site owner, I want the job to find available flash-tier models when the current one fails, so that a replacement can be identified.

#### Acceptance Criteria

1. WHEN model discovery is triggered, THE Health_Check_Job SHALL log that discovery is starting, then fetch the list of models from the Gemini_Models_API
2. WHEN the model list is received, THE Health_Check_Job SHALL log the total model count and flash model count, then filter to models whose ID contains "flash" and whose supported methods include "generateContent"
3. WHEN Flash_Models are identified, THE Health_Check_Job SHALL log each candidate before testing, then test each with the Test_Prompt in sequence until one succeeds
4. WHEN a Flash_Model responds successfully to the Test_Prompt, THE Health_Check_Job SHALL log the successful candidate with its name, then select that model as the replacement
5. WHEN a Flash_Model fails the Test_Prompt, THE Health_Check_Job SHALL log the failure with model name and error details, then continue to the next candidate
6. IF the Gemini_Models_API request fails, THEN THE Health_Check_Job SHALL log the failure with error details, then report via notification and terminate
7. WHEN all Flash_Models fail the Test_Prompt, THE Health_Check_Job SHALL log that all candidates exhausted, then send a high-priority notification and terminate

### Requirement 5: Environment Variable Update

**User Story:** As a site owner, I want the job to update the Vercel env var automatically, so that the app uses the new working model without manual changes.

#### Acceptance Criteria

1. WHEN a replacement model is selected, THE Health_Check_Job SHALL log the env var lookup attempt, then list project environment variables via the Vercel_Env_API to find the ID of `GEMINI_MODEL`
2. WHEN the env var ID is found, THE Health_Check_Job SHALL log the update attempt with old and new values, then update the `GEMINI_MODEL` value to the replacement model name via PATCH on the Vercel_Env_API
3. WHEN the env var is successfully updated, THE Health_Check_Job SHALL log the successful update with the new model name
4. IF the Vercel_Env_API list request fails, THEN THE Health_Check_Job SHALL log the failure with error details, then report via notification and terminate
5. IF the Vercel_Env_API update request fails, THEN THE Health_Check_Job SHALL log the failure with error details, then report via notification and terminate

### Requirement 6: Redeploy Trigger

**User Story:** As a site owner, I want a redeploy triggered after the env var is updated, so that serverless functions pick up the new model immediately.

#### Acceptance Criteria

1. WHEN the `GEMINI_MODEL` environment variable is successfully updated, THE Health_Check_Job SHALL log the redeploy attempt, then trigger a new production deployment via the Vercel deployments API
2. WHEN the redeploy succeeds, THE Health_Check_Job SHALL log the successful redeploy with deployment ID
3. IF the redeploy request fails, THEN THE Health_Check_Job SHALL log the failure with error details, then report via notification but still consider the rotation successful

### Requirement 7: Push Notifications

**User Story:** As a site owner, I want push notifications reporting the outcome of every health check, so that I stay informed about model status.

#### Acceptance Criteria

1. WHEN the Current_Model is healthy, THE Health_Check_Job SHALL log and send a notification with title "Model Healthy" and the model name
2. WHEN a Model_Rotation succeeds, THE Health_Check_Job SHALL log and send a notification with title "Model Rotated" including the old and new model names
3. WHEN all Flash_Models fail the Test_Prompt, THE Health_Check_Job SHALL log and send a high-priority notification with title "All Models Failed"
4. WHEN any Vercel_Env_API or Gemini_Models_API request fails, THE Health_Check_Job SHALL log and send a notification describing the specific failure
5. THE Health_Check_Job SHALL use the `NTFY_TOPIC` environment variable as the notification destination

### Requirement 8: Error Resilience

**User Story:** As a site owner, I want the health check to handle its own errors gracefully, so that a failure in the job itself never goes unnoticed.

#### Acceptance Criteria

1. IF an unhandled exception occurs during execution, THEN THE Health_Check_Job SHALL log the full exception with stack trace, then send a notification to the Ntfy_Service with error details
2. THE Health_Check_Job SHALL complete execution within 60 seconds to stay within Vercel serverless function time limits
3. WHEN testing models with the Test_Prompt, THE Health_Check_Job SHALL use a 10-second timeout per model to avoid hanging on unresponsive endpoints

### Requirement 9: Structured Logging in Request Handler

**User Story:** As a site owner, I want structured logging at the top of the request handler, so that I can diagnose issues from Vercel function logs without guessing what went wrong.

#### Acceptance Criteria

1. WHEN the Request_Handler is invoked, THE Request_Handler SHALL use the Logger to log the presence or absence of each required environment variable (`GEMINI_API_KEY`, `GEMINI_MODEL`, `NTFY_TOPIC`) as the first operation before any other logic
2. WHEN `GEMINI_API_KEY` is missing at invocation time, THE Request_Handler SHALL log the fatal configuration error AND send an alert via the Logger, then return a 500 response
3. WHEN the Request_Handler begins processing a request, THE Request_Handler SHALL log a breadcrumb with request method, model name, and spread type
4. WHEN the Request_Handler attempts a model, THE Request_Handler SHALL log which model is being tried
5. WHEN the Request_Handler successfully receives a Gemini API response, THE Request_Handler SHALL log a breadcrumb with the model used and response length
6. WHEN the Request_Handler falls back to another model, THE Request_Handler SHALL log the fallback with the failed model and the next model being attempted
7. WHEN the Request_Handler encounters an error, THE Request_Handler SHALL log the error with status code, message, and model name

### Requirement 10: Request-Time Fallback Chain

**User Story:** As a site owner, I want the request handler to have a hardcoded fallback chain, so that if the env var model breaks between health checks, requests still have a chance of succeeding.

#### Acceptance Criteria

1. THE Request_Handler SHALL use the `GEMINI_MODEL` environment variable as the primary model
2. THE Request_Handler SHALL maintain a hardcoded ordered fallback list of flash model names
3. WHEN the primary model returns a 404 or 503 error, THE Request_Handler SHALL log the fallback trigger, then attempt each model in the fallback list sequentially
4. WHEN a fallback model succeeds, THE Request_Handler SHALL log the successful fallback model, then return its response to the client
5. WHEN all models in the fallback chain fail, THE Request_Handler SHALL log the exhaustion, then return an error response and send a notification via the Logger
