# Engineer-Fusion-Skill — Architecture & Technical Reference

This document provides complete documentation for the four fused disciplines, the progressive disclosure architecture, memory management, security auditing, research routines, long-term instincts, and cross-platform hooks.

---

## 1. System Architecture & Progressive Disclosure

Engineer-Fusion-Skill utilizes progressive disclosure to ensure token-efficient context consumption:

```
skills/engineer-fusion-skill/
├── SKILL.md                                 ~140 lines (core rules loaded on activation)
└── references/
    ├── addy-lifecycle.md                    ~240 lines (25 lifecycle skills, loaded on demand)
    ├── superpowers-workflows.md             ~150 lines (orchestration & verification, loaded on demand)
    ├── memory-and-context.md                ~80 lines (90% compression & session ledger, loaded on demand)
    ├── security-audit.md                    ~100 lines (STRIDE threat modeling & boundary law, loaded on demand)
    ├── research-routines.md                 ~60 lines (doc grounding & precedent analysis, loaded on demand)
    └── long-term-instincts.md               ~70 lines (production heuristics, loaded on demand)
```

### Context Loading Tiers

1. **Tier 0 (Zero Overhead)**: Frontmatter metadata (`name`, `description`) indexed by the agent runtime (~50 tokens).
2. **Tier 1 (Base Prompt)**: `SKILL.md` loads when engineering mode activates (~1,300 tokens).
3. **Tier 2 (On-Demand References)**: Specific reference manuals are fetched strictly when an engineering task enters that phase (e.g. debugging, threat modeling, or long-session compaction).
4. **Tier 3 (Standalone Single-File)**: `dist/engineer-fusion-standalone.md` concatenates all layers and references for runtimes without multi-file resolution.

---

## 2. Core Disciplines

```
┌────────────────────────────────────────────────────────┐
│                 ENGINEER-FUSION-SKILL                  │
│                                                        │
│  1. VOICE (Caveman)         → How you reply            │
│  2. MINIMALISM (Ponytail)   → What you build           │
│  3. DISCIPLINE (Addy)       → Engineering standards   │
│  4. ORCHESTRATION (Super)   → How you execute & verify │
│                                                        │
│  Enhanced with:                                        │
│  • Memory & Context Engine (90% state compression)    │
│  • STRIDE Security & Untrusted Input Hardening        │
│  • Research-First Precedent & Doc Grounding           │
│  • Long-Term Architectural Instincts                   │
└────────────────────────────────────────────────────────┘
```

### Layer 1: Voice (Caveman)
Terse, payload-first communication. Pattern: `[thing] [action] [reason]. [next step].` Eliminates sycophantic pleasantries ("Sure!", "Let me help you with that") and closing summaries. All commands, code spans, file paths, and test outputs are quoted verbatim.

### Layer 2: Minimalism (Ponytail)
Smallest complete change. Six-step preference ladder: Skip unrequested features → Reuse existing codebase patterns → Standard library → Installed dependencies → One-liner → Minimal code. Never cuts security, validation, or error handling.

### Layer 3: Discipline (Addy Osmani)
Engineering lifecycle rigor. 80/15/5 test pyramid, explicit assumption surfacing ("→ Correct me now or I proceed"), pushback quantification, and strict scope discipline (noticing without touching).

### Layer 4: Orchestration (Superpowers)
Workflow execution patterns. Brainstorming before plans, bite-sized tasks with explicit steps (RED → GREEN → COMMIT), Git worktree isolation, systematic 4-phase debugging, and the **Iron Law of Verification**: `NO COMPLETION CLAIMS WITHOUT FRESH VERIFICATION EVIDENCE`.

---

## 3. Long-Sprint Memory & Context Management

To solve agent degradation across long multi-hour or multi-day development cycles:

1. **The 75% Capacity Pruning Rule**: Compaction triggers when conversation hits ~75% capacity. Verbose terminal dumps and intermediate failed code attempts are discarded; only decisive assertion lines and active contracts are kept.
2. **The Session Ledger (`.memory/session-ledger.md`)**: Compresses session history by up to 90% into a persistent markdown ledger:
   - **Invariants**: Core architectural decisions that must not be altered.
   - **State Machine**: Milestones completed (`[x]`), active (`[>]`), and pending (`[ ]`).
   - **Bug Ledger**: Failure signature + verified root cause + guard test.
   - **Deferred Findings**: Items noticed but intentionally out of scope.
3. **Surgical Context Loading**: Agents inspect targeted line ranges rather than reading entire 1,000-line files into working memory.

---

## 4. Security Auditing & Threat Modeling

1. **STRIDE Threat Modeling**: Applied before implementing auth, payments, uploads, or permissions.
2. **Untrusted Data Law**: Treat all external payloads, query parameters, web fetches, and **LLM outputs** as untrusted input. Validate at boundaries. Zero secrets in source code.
3. **SSRF Defense**: Explicitly validate URL schemes (`https:` only) and reject loopback (`127.0.0.1`), RFC1918 private ranges, and cloud metadata (`169.254.169.254`).
4. **Supply Chain Integrity**: Block `postinstall` script execution on new dependencies and audit transitive trees (`npm audit`, `osv-scanner`).

---

## 5. Research-First Planning Routines

1. **Precedent Analysis**: Grep codebase patterns before proposing implementations.
2. **Version Pinning**: Detect exact runtime and framework versions from dependency manifests (`package.json`, `Cargo.toml`, `pyproject.toml`).
3. **Doc Grounding**: Implement only patterns verified in official documentation for the pinned version. Mark uncertain patterns as `[UNVERIFIED - SPIKE REQUIRED]`.

---

## 6. Long-Term Architectural Instincts

1. **Decouple Business Logic from Frameworks**: Core domain logic lives in pure functions; external I/O and databases are injected.
2. **Hyrum's Law**: All observable behaviors become de facto contracts once relied upon. Avoid casual changes to side-effects or error messages.
3. **Idempotency by Default**: Critical mutation endpoints must support idempotency keys and unique DB constraints.
4. **Chesterton's Fence**: Check git history and commit intent before deleting existing guards or checks.
5. **Expand / Contract Migrations**: Add new column/field nullable → dual-write → backfill → switch reads → contract in a later release.

---

## 7. Execution Fallback Matrix

| Tool Feature | Full Superpowers Mode | Inline Fallback Mode |
|---|---|---|
| **Subagents** | Dispatches isolated subagents for independent tasks | Executes sequentially with explicit milestone commits |
| **Git Worktrees** | Creates temporary worktrees off main | Works on dedicated feature branch in main workspace |
| **Session Hooks** | Injects prompt automatically via `hooks/` | User invokes `"engineering mode"` or starts coding task |
