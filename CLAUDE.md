# CLAUDE.md

## Product vision
Build a large personal operating system for study, work, focus, planning, habits, and lightweight entertainment.

The product should evolve into a modular dashboard platform that includes account management, notes, tasks, pomodoro, streaks, study planning, work planning, analytics, and carefully selected gamification.

## Additional project docs
Use these documents when relevant:
- `docs/roadmap.md` for phased product planning
- `docs/agent-topology.md` for agent roles and coordination
- `DESIGN.md` for design direction, visual language, motion, depth, and component behavior

## Product boundaries
Prioritize coherence over random feature accumulation.
Every new feature must support at least one of these pillars:
- Study
- Work
- Focus
- Planning
- Reflection
- Motivation
- Lightweight recreation

Do not add features that feel disconnected from the product vision.
If a proposed feature is interesting but weakly related, add it to an incubation list instead of shipping it immediately.

## Delivery strategy
Build in phases, not as a giant one-shot app.

### Phase 1
- Authentication
- App shell
- User profile and settings
- Dashboard home
- Notes
- Todo list
- Pomodoro / focus timer
- Streak tracking
- Basic analytics

### Phase 2
- Projects and study/work spaces
- Calendar and deadline planner
- Habit tracker
- Journal / daily review
- Notifications and reminders
- Search

### Phase 3
- Rewards, XP, levels, badges
- Forest-like focus mechanics
- Templates and reusable workflows
- Smart summaries and assistant flows
- Rich analytics

### Phase 4
- Mini games and break-time experiences
- Social/accountability features
- Plugin-like modules
- Experiments approved by the lead orchestrator

## Team operating model
The lead orchestrator owns planning, prioritization, routing, and conflict resolution.
Specialist agents own their scopes and should communicate directly with each other when dependencies exist.
Agents should use shared task decomposition and avoid duplicate work.

## Autonomy rules
Operate autonomously by default.
Do not ask the user for routine implementation decisions.
Ask the user only when one of these conditions is true:
- A destructive migration or irreversible data change is required.
- Product direction is ambiguous enough that multiple large architectures are plausible.
- A tradeoff would materially affect security, cost, or long-term maintainability.
- A feature request conflicts with the declared product vision.

## Engineering rules
- Prefer simple, boring, maintainable solutions.
- Make surgical changes; do not refactor unrelated areas.
- Match the existing style of the codebase unless the lead explicitly approves a broader cleanup.
- Every changed line should trace to a concrete task or acceptance criterion.
- Write or update verification whenever behavior changes.
- Run the smallest relevant checks first, then broader checks before closing a task.
- Fix root causes instead of patching symptoms when scope permits.

## Design enforcement
- Always consult `DESIGN.md` before creating or revising UI.
- Do not generate generic admin dashboards.
- Preserve a premium, cohesive, dark-first visual identity.
- Use 3D, motion, and glow selectively and purposefully.
- Prioritize usability on dense screens over spectacle.

## Quality gates
Before closing a meaningful task:
- Run lint/typecheck/tests relevant to the changed area.
- Verify the main user flow manually or with automation.
- Record risks, follow-ups, and known limitations.

## File ownership guidance
- Frontend agents should avoid editing backend-only files unless asked.
- Backend agents should avoid changing UI behavior unless required by contract updates.
- QA agents should report issues first and fix only when explicitly assigned or when the fix is clearly local.
- Feature scouting agents must not implement roadmap additions without lead approval.

## Context discipline
Keep this file concise and broadly applicable.
Put detailed product docs, architecture notes, and playbooks in `docs/` and reference them when needed.
Use plan mode for non-trivial work.
Clear or compact context when the session becomes noisy.

## Success criteria style
Prefer goal-driven tasks over vague requests.
Good example: "Add invalid-input tests for note creation, then make them pass."
Bad example: "Improve note validation somehow."

## Project directories
- `docs/` for product, architecture, and roadmap documents
- `.claude/agents/` for custom agent definitions
- `.claude/commands/` for reusable project commands

## Initial stack guidance
If no stack is chosen yet, propose one optimized for fast iteration and long-term growth.
Default preference:
- Frontend: Next.js + TypeScript
- UI: Tailwind + component system
- Backend: Next.js server actions or API routes initially, then extract services only when justified
- Database: PostgreSQL
- Auth: mature provider with email/password and OAuth support
- ORM: Prisma or equivalent
- Testing: unit + integration + lightweight end-to-end smoke coverage

## Product taste
This product should feel like a personal operating system, not a random utilities dump.
The UX should feel calm, focused, modular, and rewarding.
Gamification should support behavior, not distract from it.
