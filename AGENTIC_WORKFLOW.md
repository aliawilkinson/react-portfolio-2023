# Agentic Delivery Workflow

This workflow is for building portfolio updates, web apps, mobile apps, and product experiments with a small agent team. Each role owns a different kind of judgment and must hand off a concrete artifact before the next role starts.

## Roles

### 1. Architect

Owns product intent, technical direction, risk, scope, and acceptance criteria.

The architect produces:

- Goal
- Non-goals
- Target platforms
- User experience notes
- Architecture approach
- Data/API assumptions
- Risks and unknowns
- Acceptance criteria

The architect should not implement code.

### 2. Builder

Owns implementation.

The builder produces:

- Code changes
- Files changed
- Setup or migration notes
- Tradeoffs made during implementation
- Anything that diverged from the architect brief

The builder should not silently expand scope.

### 3. Code Reviewer

Owns quality review before test.

The reviewer checks:

- Bugs and regressions
- Maintainability
- Accessibility
- Security and privacy
- Performance
- Platform conventions
- Consistency with the existing codebase

The reviewer produces:

- Findings by severity
- Required fixes
- Optional polish
- A decision: send back to Builder or ready for Tester

### 4. Tester

Owns verification.

The tester runs:

- Build checks
- Unit/integration tests when available
- Browser checks for web apps
- Mobile checks for Android/iOS when available
- Route checks
- Visual smoke tests
- Critical user flows

The tester produces:

- Commands run
- Results
- Screenshots or route evidence when useful
- Known gaps
- A decision: send back to Builder or ready for Sign-off

### 5. Sign-off

Owns final readiness.

Sign-off confirms:

- Acceptance criteria are met
- Required review findings are addressed
- Tests passed or gaps are clearly named
- The result is ready to ship, demo, or continue

Sign-off produces:

- Final summary
- Residual risks
- Recommended next step
- Decision: ship, revise, or hold

## Standard Handoff

Every handoff should include:

- Current goal
- What changed
- What remains
- Risks or uncertainty
- Exact files touched
- Verification status

## Overnight Automation Prompt

Use this prompt for a nightly agent run:

```text
You are operating as an agentic product team for this repository.

Goal:
[Describe the app, feature, or milestone.]

Context:
[Describe the product, target users, platform, and constraints.]

Workflow:
1. Architect: create a short implementation brief with scope, risks, and acceptance criteria.
2. Builder: implement the brief with focused code changes.
3. Code Reviewer: review the implementation for bugs, maintainability, accessibility, security, performance, and platform fit.
4. Tester: run available verification and record exact results.
5. Sign-off: summarize what shipped, what is incomplete, and what should happen next.

Rules:
- Preserve user changes.
- Do not expand scope without documenting the reason.
- Prefer existing codebase patterns.
- Keep changes shippable and focused.
- If blocked, document the blocker and make the safest useful progress.
- End with a concise status report.
```

## Best Use

This workflow works best when each overnight run has a concrete milestone, such as:

- Build the first usable screen
- Add auth shell and routing
- Implement dashboard data model
- Create Android/iOS/web responsive layout
- Add tests for a completed feature
- Review and polish one product flow

It works poorly when the prompt is only "build the whole app" with no product definition, platform choice, or acceptance criteria.
