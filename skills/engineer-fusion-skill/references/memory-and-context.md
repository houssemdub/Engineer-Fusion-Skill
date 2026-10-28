# Context Engineering & Long-Sprint Memory Management

High-efficiency protocol for maintaining context accuracy across long development cycles, preventing context degradation, and compressing session state by up to 90%.

---

## 1. The Context Degradation Problem

As development sessions grow past 20–30 tool calls or multiple working days, coding agents suffer from three failure modes:
1. **Context Bloat**: Verbose terminal dumps, huge file contents, and repeated tool outputs drown out early architectural intent and constraints.
2. **Context Drift / Invariant Amnesia**: The agent forgets decisions made at the start, re-introduces discarded approaches, or hallucinates completed tasks.
3. **Token Ceiling Exhaustion**: Hitting the context limit forces crude truncations that destroy critical task state.

---

## 2. The 90% State Compression Protocol

Compress multi-hour chat histories and debugging loops into a dense, machine-readable **Session Ledger** that retains 100% of engineering signal using <10% of the token footprint.

### The Rolling Session Ledger (`.memory/session-ledger.md`)

When a task concludes or before starting a new slice, write or update the compact ledger:

```markdown
# Session Ledger — [Project Name]
Last Updated: [ISO Timestamp] | Sprint Target: [Feature / Milestone]

## Invariants & Core Decisions (Never Alter Without User Sign-Off)
- Arch: [e.g., SQLite via Kysely; zero runtime ORM overhead]
- Auth: [e.g., Stateless JWT in httpOnly Secure cookies, Argon2id passwords]
- Perf: [e.g., LCP < 2.0s, bundle < 120KB gzipped]

## Task State Machine
- [x] Slice 0: API Contracts & Types (Verified: exit 0, types checked)
- [x] Slice 1: Database Schema & Migration (Verified: migration up + down clean)
- [>] Slice 2: Service Layer & Business Logic (IN PROGRESS)
- [ ] Slice 3: Frontend Integration & Accessibility Audit
- [ ] Slice 4: CI/CD Pipeline & Final Verification

## Debugging & Bug Ledger (Decisive Fixes Only, No Terminal Noise)
- Bug #101: Race condition in token refresh
  - Root Cause: Concurrent requests triggered duplicate refresh mutations
  - Fix: Mutex claim via atomic DB update in `auth/token.ts#L45`
  - Guard: Regression test `test/auth.test.ts#test_concurrent_refresh` (Passing)

## Deferred Scope / Out-of-Scope (Noticed But Intentionally Not Touched)
- Refactor `legacy/parser.ts`: Notice deep nesting; deferred to Sprint 2
```

---

## 3. Surgical Context Budgeting Rules

1. **The 75% Capacity Pruning Rule**:
   - Begin context compaction as soon as context utilization reaches ~75% capacity. Never wait until 100% capacity is reached.
   - When pruning:
     - Discard verbose tool outputs (raw file contents, 500-line test runs, build logs). Keep only the decisive 1–2 line result or failure message.
     - Discard discarded drafts and intermediate reasoning steps; preserve only the final conclusion and active contracts.
2. **Differential Reading (Never Read Entire Codebases)**:
   - Read only targeted line ranges or file summaries.
   - Use symbols, greps, and function boundaries rather than dumping 2,000-line files into context.
3. **Focused Context Hierarchy**:
   - Priority 1: Current Task Specification & Acceptance Criteria (Protected).
   - Priority 2: Invariants & Hard Constraints (Protected).
   - Priority 3: The targeted file slice being modified (Active).
   - Priority 4: Exact error or assertion failure line (Transient).
   - Priority 5: Raw history and previous chat chatter (Disposable).

---

## 4. Multi-Day Sprint Continuity

When resuming work in a new conversation or after session compaction:
1. Read `.memory/session-ledger.md`.
2. Inspect `git status` and `git log -n 3 --oneline` to confirm ground truth.
3. Confirm active slice and proceed immediately to the next unchecked task.
4. Zero repeated questions, zero re-exploration of files already cataloged in the ledger.
