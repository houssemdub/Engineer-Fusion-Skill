# Engineer-Fusion-Skill — Architecture & Technical Reference

This document explains the technical architecture of Engineer-Fusion-Skill, how the four layers compose, how progressive disclosure keeps token overhead minimal, and how multi-tool compatibility is achieved across modern AI coding agents.

---

## 1. System Architecture

The skill follows a strict **progressive disclosure** architecture to preserve agent context window capacity:

```
skills/engineer-fusion-skill/
├── SKILL.md
│   ├── Layer 1 — Voice (Caveman)               ~30 lines (always loaded)
│   ├── Layer 2 — Minimalism (Ponytail)         ~30 lines (always loaded)
│   ├── Layer 3 — Discipline (Addy agent-skills) ~25 lines (always loaded)
│   ├── Layer 4 — Orchestration (Superpowers)   ~25 lines (always loaded)
│   ├── Routing Table                           ~20 lines (always loaded)
│   ├── The Floor                               non-negotiables (always loaded)
│   └── Conflict Resolution Precedence          always loaded
└── references/
    ├── addy-lifecycle.md                       ~240 lines (loaded strictly on demand)
    └── superpowers-workflows.md                ~150 lines (loaded strictly on demand)
```

### Progressive Disclosure Phases

1. **Trigger Metadata (Level 0)**: Frontmatter `name` and `description` are loaded into agent index (~50 tokens).
2. **Core Prompt (Level 1)**: `SKILL.md` loads upon skill invocation (~1,200 tokens). It provides immediate behavioral guardrails for all 4 layers.
3. **Deep References (Level 2)**: Specialized reference files (`addy-lifecycle.md` and `superpowers-workflows.md`) are read only when a specific task requires them (e.g. debugging, security threat modeling, or writing an implementation plan).
4. **Standalone Bundle (Alternative)**: `dist/engineer-fusion-standalone.md` concatenates all layers and references into a single file for environments that do not support multi-file skill resolution.

---

## 2. The Four Disciplines

```
┌────────────────────────────────────────────────────────┐
│                 ENGINEER-FUSION-SKILL                  │
│                                                        │
│  1. VOICE (Caveman)         → How you reply            │
│  2. MINIMALISM (Ponytail)   → What you build           │
│  3. DISCIPLINE (Addy)       → Engineering standards   │
│  4. ORCHESTRATION (Super)   → How you plan & execute   │
│                                                        │
│  All 4 ON by default. Independent per-layer toggles.   │
└────────────────────────────────────────────────────────┘
```

### Layer 1 — Voice (Caveman)
- **Governs**: Response formatting and communication economy.
- **Rules**: Answer first (`[thing] [action] [reason]`). Kill pleasantries ("Sure!", "Let me help"). Exact payloads (code, diffs, paths, errors verbatim). Compression never drops negations or breaks technical accuracy.
- **Toggles**: `"stop caveman"` returns to normal prose while retaining minimalism, discipline, and orchestration.

### Layer 2 — Minimalism (Ponytail)
- **Governs**: Code footprint and architectural simplicity.
- **Rules**: The 6-step preference ladder (Skip → Existing codebase → Stdlib → Installed deps → One-liner → Minimal code). Never cut trust validation, security, or error handling.
- **Toggles**: `"stop ponytail"`, `"ponytail lite"`, `"ponytail ultra"`.

### Layer 3 — Discipline (Addy Osmani agent-skills)
- **Governs**: Quality bars, software contracts, and lifecycle rigor.
- **Rules**: Surface assumptions explicitly; active confusion management; quantify pushbacks; 80/15/5 test pyramid; Expand/Contract database migrations; OWASP threat modeling; Core Web Vitals targets.
- **Toggles**: `"relaxed mode"` (The Floor remains active).

### Layer 4 — Orchestration (Superpowers)
- **Governs**: Workflow execution, isolation, debugging, and verification evidence.
- **Rules**:
  1. *Brainstorming*: Clarify human intent (1 targeted question at a time) before entering plan mode.
  2. *Writing Plans*: Bite-sized tasks with explicit step granularity (RED → GREEN → COMMIT).
  3. *Git Worktrees*: Isolate non-trivial changes in temporary worktrees.
  4. *Subagent Delegation*: Dispatch clean subagents for independent tasks.
  5. *Systematic Debugging*: Stop-the-Line on failure; 4-phase root cause protocol.
  6. *The Iron Law of Verification*: `NO COMPLETION CLAIMS WITHOUT FRESH VERIFICATION EVIDENCE.`
- **Toggles**: `"solo mode"` / `"stop superpowers"`.

---

## 3. Conflict Resolution Matrix

When disciplines pull in opposing directions, the following precedence applies:

| Conflict | Resolution |
|---|---|
| **Ponytail Minimalism vs. Discipline / Superpowers on Tests** | Non-trivial logic must have 1 focused reproduction or unit test. Trivial changes require zero tests. |
| **Caveman Voice vs. Superpowers Plans / Verification Output** | Evidence and plans are fully printed verbatim; all pleasantries, polite hedges, and summary chitchat are eliminated. |
| **Superpowers Worktrees / Subagents vs. Ponytail Minimalism** | Do not create worktrees or subagents for trivial edits or single-file fixes. Use them only when scope justifies isolation. |
| **Any Layer vs. Technical Correctness** | **Correctness and verification always win.** |

---

## 4. Cross-Platform Compatibility Matrix

Engineer-Fusion-Skill provides native configuration manifests for all modern AI coding harnesses:

| Platform | Configuration / Manifest | Discovery Mechanism |
|---|---|---|
| **Claude Code** | `.claude-plugin/plugin.json`, `.claude-plugin/marketplace.json` | Plugin discovery or `~/.claude/skills/` |
| **Gemini CLI** | `gemini-extension.json`, `GEMINI.md` | Extension context linking |
| **ZCode / Agents CLI** | `.agents/plugins/marketplace.json`, `AGENTS.md` | Agent marketplace & skill root |
| **OpenCode** | `.opencode/plugins/engineer-fusion.js`, `package.json` | V1/V2 plugin system & npm package |
| **OpenAI Codex** | `.codex-plugin/plugin.json` | Native skills manifest |
| **Cursor IDE** | `.cursor-plugin/plugin.json` | Cursor plugin & `.cursor/skills/` |
| **Google Antigravity (AGY)** | `.antigravity-plugin/plugin.json` | Native Antigravity plugin descriptor |
| **Devin** | `.devin-plugin/plugin.json` | Devin skill integration |
| **Universal / Single-File** | `dist/engineer-fusion-standalone.md` | Copilot instructions, Windsurf rules, Aider, Cline |
