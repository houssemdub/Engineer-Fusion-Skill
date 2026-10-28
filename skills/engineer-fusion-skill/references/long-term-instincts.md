# Long-Term Engineering Instincts & Heuristics

Hardened instincts accumulated from production systems, multi-year maintenance cycles, and real-world failure patterns.

---

## 1. Architectural Instincts

1. **Decouple Core Business Logic from Frameworks**:
   - Frameworks change (Express → Fastify, React Class → Hooks → Server Components); your domain rules should not.
   - Keep business logic in pure, framework-agnostic functions and domain services. Pass I/O, database clients, and HTTP objects as dependencies.
2. **Hyrum's Law Awareness**:
   - *"With a sufficient number of users of an API, it does not matter what you promise on the contract: all observable behaviors of your system will be depended on by somebody."*
   - Never change observable side-effects, error messages, or response shapes casually. Assume external systems depend on them.
3. **Idempotency by Default**:
   - Every network request has three outcomes: Success, Failure, and **Unknown** (timeout/drop).
   - In mutations (payments, resource creation, webhook ingestion), require idempotency keys and enforce unique constraints at the database level to prevent duplicate processing.

---

## 2. Refactoring & Deletion Instincts

1. **Chesterton's Fence**:
   - Never delete a line of code, an obscure check, or a fallback branch until you know *why* it was put there in the first place.
   - Run `git log -S "<symbol>"` or `git blame` to find the original commit and PR context before removing defensive code.
2. **Expand / Contract for Data & State**:
   - Never rename or delete a database column, API field, or storage key in a single deployment.
   - Phase 1: **Expand** (add new field as optional, write to both old and new).
   - Phase 2: **Backfill** (migrate existing records safely).
   - Phase 3: **Switch Reads** (read from the new field).
   - Phase 4: **Contract** (drop old field in a later deployment once zero traffic reads it).
3. **Delete Dead Code Completely**:
   - Do not leave commented-out code blocks or unreferenced "maybe useful later" helper functions. Git history is your archive.

---

## 3. Operational & Runtime Instincts

1. **Defensive Timeouts Everywhere**:
   - Every outbound HTTP call, database query, lock acquisition, and subprocess execution must have an explicit timeout. An unbound wait will eventually lock up process worker threads and crash production.
2. **Structured Observability Over Raw Logs**:
   - Print structured JSON events with consistent event names, tenant/request correlation IDs, and timestamps.
   - Never log sensitive fields (passwords, JWTs, credit card numbers, PII).
3. **Graceful Degradation**:
   - Non-critical dependency down (recommendation engine, analytics tracking)? Catch cleanly, log an alert, and allow the core user flow (checkout, viewing content) to complete.
