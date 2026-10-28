# Superpowers — Distilled Workflow Orchestration

Distilled from obra/superpowers (MIT). Read the section matching the current task phase.

---

## 1. Brainstorming (Before Any Planning or Implementation)

Use before any creative work: building components, adding features, modifying behavior, or designing new workflows.

- **The Golden Rule**: Never assume the human's first sentence covers the whole intent. People often describe a mechanism when they want an outcome.
- **First Message**:
  1. Announce that if the user prefers to skip questions and start immediately, they can say so.
  2. Ask **one** open-ended question that gets them describing the concrete use case or core friction.
- **Conversation Cadence**:
  - Exactly **one question per message**. Never barrage with a list of 4 questions.
  - No speculative multiple-choice menus unless the user is stuck or explicitly asks "what do you think?".
  - Pitch language at the user's level; avoid procedural jargon.
- **Key Dimensions to Uncover**:
  - Real-world motivation ("What moment made you wish this existed?").
  - Technical constraints & platform choices (are choices fixed or handed to the agent?).
  - Explicit non-goals ("What are we definitely NOT building today?").
- **Exit Gate**: A clear, concise summary of intent (Outcome, Target User, Constraints, Non-Goals) with explicit user approval before proceeding to planning or code.

---

## 2. Writing Implementation Plans

Use when requirements are known and you need a bite-sized, sequential roadmap before touching code.

- **Target Audience**: Write the plan for an engineer who knows the language and framework, but has zero context on this codebase. Specify file names, interfaces, signatures, and exact verification steps.
- **Plan Storage**: Default path `docs/plans/YYYY-MM-DD-<feature-name>.md` (or workspace-preferred convention).
- **File Structure First**:
  - Before defining tasks, list every file to be created, modified, or deleted.
  - Split files by single responsibility. Units should be small enough to fit cleanly into context.
- **Task Right-Sizing**:
  - Every task is a self-contained slice ending with an independently verifiable deliverable.
  - Scope each task to touch at most 1–3 files. Split anything larger.
  - Each task must contain explicit step granularity:
    1. Write failing test (RED).
    2. Run test to verify expected failure.
    3. Implement minimal code to pass (GREEN).
    4. Run test to verify success.
    5. Commit atomically.
- **Exit Gate**: The user reviews and approves the plan before any implementation starts.

---

## 3. Using Git Worktrees (Isolation)

Use for any feature, refactor, or multi-step plan that touches shared state or runs across multiple commits.

- **Why Worktrees**: Protects the working copy; allows clean context switching without stash pollution or uncommitted diff conflicts.
- **Creation Flow**:
  - Check repository clean status: `git status --porcelain`.
  - Create worktree off main or base branch:
    ```bash
    git worktree add -b feature/<name> .worktrees/<name> origin/main
    ```
  - Verify workspace isolation before executing commands.
- **Cleanup Flow**:
  - Once merged or verified: remove worktree via `git worktree remove .worktrees/<name>` and delete local branch if merged.

---

## 4. Subagent-Driven & Parallel Execution

Use when tasks in an approved plan are independent or when sub-tasks require specialized focus without context contamination.

- **Principles of Subagent Delegation**:
  - **Fresh Context**: Do not pass entire chat logs. Provide only the task specification, the file contracts, and the exact verification command.
  - **Single Task Ownership**: One subagent = one task = one verification cycle.
  - **Evidence Gate**: Subagent must provide raw execution logs proving tests pass before reporting success. Never trust a "Done!" summary without logs.
  - **Parallel Safety**: Only parallelize tasks with zero shared mutable state, distinct files, and independent test boundaries.

---

## 5. Systematic Debugging (The 4-Phase Root Cause Protocol)

Use on any unexpected test failure, regression, build error, or runtime bug before attempting any fix.

- **Stop-The-Line Rule**: Do NOT add new features or guess-and-check edits while a failure is unresolved. Errors compound exponentially.
- **Phase 1: Reproduce**:
  - Create a deterministic reproduction script or failing unit test.
  - Verify the reproduction consistently fails with the exact symptom.
- **Phase 2: Localize**:
  - Trace data flow upstream until the exact boundary between good state and corrupted state is identified.
  - Use `git bisect` for regressions when the failure point is unclear.
- **Phase 3: Root Cause Analysis**:
  - Ask "Why?" at least three levels deep until reaching the foundational design or state assumption flaw.
  - Do not treat the symptom at the surface level.
- **Phase 4: Guard & Verify (Prove-It Pattern)**:
  - Keep the reproduction test: confirm it FAILS on original code.
  - Apply the minimal root-cause fix.
  - Confirm the reproduction test PASSES.
  - Run the entire test suite to ensure zero regressions.

---

## 6. The Iron Law of Verification Before Completion

Use before claiming any task, fix, or feature is complete, fixed, passing, or ready for merge.

```
NO COMPLETION CLAIMS WITHOUT FRESH VERIFICATION EVIDENCE
```

- **The Verification Gate**:
  1. **Identify**: What precise command proves this claim?
  2. **Run**: Execute the full command fresh (no cached runs, no stale memories).
  3. **Read**: Check exit code and inspect the raw failure count / assertion status.
  4. **Verify**: Does the output explicitly confirm success?
  5. **State**: Report the outcome accompanied by the verbatim output.
- **Forbidden Rationalizations (Red Flags)**:
  - "Should pass now..."
  - "Looks clean..."
  - Expressing satisfaction ("Done!", "Great!") before running the verification command.
  - Claiming tests pass based on an earlier run before subsequent edits.

---

## 7. Requesting & Receiving Code Review

- **Requesting Review**:
  - Summarize the change using the three-part format:
    1. **Changes Made**: Bulleted list of additions/modifications.
    2. **Things Intentionally Not Touched**: Explicit list of adjacent code left untouched (scope discipline).
    3. **Potential Risks or Tradeoffs**: Edge cases, performance bounds, or assumptions made.
  - Include verbatim test and lint verification outputs.
- **Receiving Review**:
  - Evaluate feedback on technical merit, not performative agreement.
  - Do not blindly implement suggestions that weaken security, degrade performance, or violate YAGNI.
  - Verify all proposed changes through tests before marking review comments resolved.

---

## 8. Finishing a Development Branch

- **Pre-Merge Checklist**:
  1. All worktree/branch tests pass cleanly.
  2. Clean git diff: no stray debug logs, commented-out dead code, or temporary files.
  3. Atomic, meaningful commit history with conventional commit prefixes (`feat:`, `fix:`, `refactor:`, `test:`).
  4. Documentation and ADRs updated if interfaces or behavior changed.
  5. Worktree removed cleanly after merge.
