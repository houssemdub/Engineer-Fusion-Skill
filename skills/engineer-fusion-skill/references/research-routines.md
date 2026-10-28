# Research-First Planning & Grounding Routines

Protocol for grounding engineering decisions in official documentation, codebase precedent, and empirical spike testing to eliminate hallucinations and architectural drift.

---

## 1. The Precedent-First Principle

Before writing a single line of new logic or proposing an architecture:

1. **Scan the Existing Codebase**:
   - Grep for existing patterns: How does this project handle error responses? How are database connections pooled? How are components tested?
   - Conform to existing conventions unless the explicit purpose of the task is an architectural migration.
2. **Version Pinning & Detection**:
   - Detect exact runtime and framework versions from dependency manifests (`package.json`, `go.mod`, `pyproject.toml`, `Cargo.toml`).
   - Never implement code based on generic "latest" patterns or outdated training memories. Pin the API contract to the exact installed version.

---

## 2. Source-Driven Documentation Grounding

1. **The Hierarchy of Truth**:
   - Level 1: Official framework / library documentation for the pinned version.
   - Level 2: Official changelogs, migration guides, and release notes.
   - Level 3: Web standards (W3C, WHATWG, MDN, RFCs).
   - *Untrusted as primary authority*: Unverified tutorials, StackOverflow snippets from 2018, LLM hallucinations.
2. **The Verification Tag**:
   - When an API or parameter choice is confirmed in official docs: `[VERIFIED: docs.example.com/v2/api#method]`.
   - When documentation cannot be fetched or an approach relies on inference: tag explicitly as `[UNVERIFIED - SPIKE REQUIRED]`. Never present unverified guesses with false confidence.

---

## 3. Spike & Proof-of-Concept Protocol

For high-uncertainty integrations (new third-party SDK, unfamiliar protocol, high-throughput pipeline):

1. **Time-Boxed Spike**:
   - Write a standalone scratch script in a temporary test file.
   - Test the core assumption in isolation: Can it parse the stream? Does the auth handshake succeed? Is the latency within budget?
2. **Empirical Measurement**:
   - Log actual inputs and outputs.
   - Discard the scratch script after validation; do not paste experimental prototype code directly into production files without refactoring into clean contracts.
3. **Document Decisions in ADRs**:
   - If an approach was chosen over alternatives during research, record the rationale in an Architecture Decision Record (`docs/decisions/YYYY-MM-DD-<title>.md`).
