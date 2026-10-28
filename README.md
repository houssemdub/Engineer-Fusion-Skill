# Engineer-Fusion-Skill

**One agent skill that fuses four engineering disciplines, memory management, and security auditing into a single high-performance way of working.**

Engineer-Fusion-Skill combines four proven agent skills and production-grade engineering routines:

| Layer | Heritage | Governs |
|---|---|---|
| **1. Voice** | [Caveman](https://github.com/JuliusBrussee/caveman) | How the agent replies — terse, payload-first, zero ceremony |
| **2. Minimalism** | [Pony Tail Engineer](https://github.com/DietrichGebert/ponytail) | What the agent builds — smallest complete change, YAGNI, standard library first |
| **3. Discipline** | [Addy Osmani's agent-skills](https://github.com/addyosmani/agent-skills) | How the agent verifies — 25 lifecycle skills, contracts, 80/15/5 test pyramid |
| **4. Orchestration** | [Superpowers](https://github.com/obra/superpowers) | How the agent executes — brainstorming, worktree isolation, systematic debugging, iron law of verification |
| **+ Memory** | Context Engineering Engine | 90% context compression, session ledger, multi-day sprint continuity |
| **+ Security** | STRIDE & Hardening Protocol | Threat modeling, untrusted input boundaries, SSRF defense, secret zero-exposure |
| **+ Research** | Documentation Grounding | Codebase precedent scanning, version pinning, anti-hallucination spike tests |
| **+ Instincts** | Long-Term Engineering Heuristics | Decoupled domain models, idempotency by default, Expand/Contract migrations |

```
┌────────────────────────────────────────────────────────┐
│                 ENGINEER-FUSION-SKILL                  │
│                                                        │
│  VOICE (Caveman)         → How you reply               │
│  MINIMALISM (Ponytail)   → What you build              │
│  DISCIPLINE (Addy)       → Engineering standards      │
│  ORCHESTRATION (Super)   → How you execute & verify    │
│                                                        │
│  ENHANCED WITH:                                        │
│  • 90% Context Compression (.memory/session-ledger.md) │
│  • STRIDE Security Auditing & Boundary Law             │
│  • Research-First Precedent & Doc Grounding            │
│  • Long-Term Production Instincts (Hyrum, YAGNI)       │
└────────────────────────────────────────────────────────┘
```

---

## What It Solves

- **Context Degradation & Token Bleed**: Compresses past debugging history, architectural decisions, and session state by up to 90% in `.memory/session-ledger.md`.
- **Hallucinated Completion**: Enforces the **Iron Law of Verification**: `NO COMPLETION CLAIMS WITHOUT FRESH VERIFICATION EVIDENCE`.
- **Dependency & Code Bloat**: Prioritizes standard library and existing codebase patterns over installing new dependencies.
- **Security Vulnerabilities**: Enforces STRIDE threat modeling and treats all external inputs, web scrapes, and LLM outputs as untrusted data.
- **Unverified Hallucinations**: Precedent-first grep routines and official doc version pinning eliminate speculative implementations.

Full technical documentation: [DOC.md](DOC.md).

---

## Repo Layout

```
Engineer-Fusion-Skill/
├── README.md                            ← Overview and multi-agent install guide
├── DOC.md                               ← Architecture, memory management, precedence rules
├── NOTICE.md                            ← Attribution (MIT)
├── LICENSE                              ← MIT License
├── package.json                         ← NPM package and OpenCode integration
├── GEMINI.md & gemini-extension.json    ← Gemini CLI extension
├── AGENTS.md                            ← Universal agent & contributor guidelines
├── .claude-plugin/                      ← Claude Code plugin & hooks
├── .antigravity-plugin/                 ← Google Antigravity (AGY) plugin manifest
├── .codex-plugin/                       ← OpenAI Codex plugin manifest
├── .cursor-plugin/                      ← Cursor IDE plugin & hooks
├── .devin-plugin/                       ← Devin plugin manifest
├── .agents/                             ← ZCode / Agents marketplace manifest
├── .opencode/                           ← OpenCode V1/V2 plugin bootstrap
├── hooks/                               ← Native session-start lifecycle hooks
│   ├── hooks.json                       ← Claude Code hook specification
│   ├── hooks-cursor.json                ← Cursor hook specification
│   ├── run-hook.cmd                     ← Cross-platform hook runner
│   └── session-start.sh                 ← Session bootstrap injector
├── evals/                               ← Benchmark & compliance scenarios
│   └── scenarios.json                   ← Test cases (voice, minimalism, verification)
├── dist/
│   └── engineer-fusion-standalone.md    ← Self-contained single-file bundle (~59 KB)
├── scripts/
│   ├── bundle.js                        ← Generates standalone distribution
│   ├── validate.js                      ← Automated test & validation script
│   └── run-evals.js                     ← Runs compliance scenario checks
└── skills/
    └── engineer-fusion-skill/
        ├── SKILL.md                     ← Core prompt (all layers + routing table)
        └── references/
            ├── addy-lifecycle.md        ← 25 distilled lifecycle skills
            ├── superpowers-workflows.md ← Orchestration & verification workflows
            ├── memory-and-context.md    ← 90% context compression & session ledger
            ├── security-audit.md        ← STRIDE threat modeling & boundary law
            ├── research-routines.md     ← Precedent analysis & doc grounding
            └── long-term-instincts.md   ← Hardened engineering heuristics
```

---

## Multi-Tool Compatibility & Installation

### 1. Claude Code
Discovered via `.claude-plugin/` or copy to skills directory:
```bash
git clone https://github.com/houssemdub/Engineer-Fusion-Skill.git
mkdir -p ~/.claude/skills
cp -r Engineer-Fusion-Skill/skills/engineer-fusion-skill ~/.claude/skills/
```

### 2. Gemini CLI & Antigravity (AGY)
- **Gemini CLI**: Run from within repository or link extension (`gemini-extension.json` + `GEMINI.md`).
- **Antigravity**: Discovered via `.antigravity-plugin/plugin.json` or by placing in `~/.gemini/antigravity-cli/skills/`.

### 3. ZCode & Agents Ecosystem
Discovered automatically via `.agents/plugins/marketplace.json` or:
```bash
mkdir -p ~/.agents/skills
cp -r Engineer-Fusion-Skill/skills/engineer-fusion-skill ~/.agents/skills/
```

### 4. OpenCode
Add plugin to your `opencode.json` (or `~/.config/opencode/opencode.json`):
```json
{
  "plugin": [
    "/path/to/Engineer-Fusion-Skill/.opencode/plugins/engineer-fusion.js"
  ]
}
```

### 5. OpenAI Codex
Discovered via `.codex-plugin/plugin.json` or placed in your Codex skills folder.

### 6. Cursor IDE
Configured via `.cursor-plugin/plugin.json` and hooks in `hooks/hooks-cursor.json`.

### 7. Universal / Standalone (Windsurf, Copilot, Cline, Aider)
For tools that do not support multi-file skills or relative file resolution:
Use **[dist/engineer-fusion-standalone.md](dist/engineer-fusion-standalone.md)**.
Paste its contents directly into `.cursorrules`, `.windsurfrules`, `.github/copilot-instructions.md`, or your system instructions.

---

## Usage & Controls

The skill triggers automatically on coding tasks, via session-start hooks, or explicitly when saying **"engineering mode"**, **"engineer fusion"**, **"caveman"**, **"ponytail"**, **"superpowers"**, **"be brief"**, **"be lazy"**, or **"senior mode"**.

### Independent Layer Switches

| Say | Effect |
|---|---|
| `stop caveman` | Normal prose; minimalism, discipline, and superpowers stay ON |
| `stop ponytail` | Standard solution sizing; voice, discipline, and superpowers stay ON |
| `ponytail lite` / `ponytail ultra` | Relaxed or strict minimalism intensity |
| `relaxed mode` | Drops Addy lifecycle checks; The Floor and other layers stay ON |
| `solo mode` / `stop superpowers` | Drops worktree/subagent orchestration; direct single-agent work |
| `stop engineering mode` / `normal mode` | Deactivates all layers |

---

## The Floor (Always Enforced)

1. **The Iron Law**: `NO COMPLETION CLAIMS WITHOUT FRESH VERIFICATION EVIDENCE.`
2. **No silent suppressions**: No `@ts-ignore`, `eslint-disable`, `# noqa`, or empty `catch {}`.
3. **Prove-It pattern**: Bug fixes require a failing reproduction test before implementation.
4. **No secrets in source**: Environment variables only.
5. **Stop-the-line**: Halt feature additions on any unexpected failure until root-cause diagnosed.
6. **Atomic commits**: ~100 lines target per slice.

---

## Testing & Validation Suite

```bash
npm test         # Runs full suite: validation, eval scenarios, and bundle generation
npm run validate # Validates manifests, links, frontmatter, and JSON syntax
npm run evals    # Benchmarks agent compliance against behavioral scenarios
npm run bundle   # Generates standalone distribution bundle
```

---

## License

MIT License. Attribution to Julius Brussee (Caveman), Dietrich Gebert (Ponytail), Addy Osmani (Agent Skills), and Jesse Vincent (Superpowers). See [NOTICE.md](NOTICE.md).
