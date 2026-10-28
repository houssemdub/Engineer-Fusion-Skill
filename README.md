# Engineer-Fusion-Skill

**One agent skill that fuses four engineering disciplines into a single high-performance way of working.**

Engineer-Fusion-Skill combines four proven agent skills into one unified, portable framework:

| Layer | Heritage | Governs |
|---|---|---|
| **1. Voice** | [Caveman](https://github.com/JuliusBrussee/caveman) | How the agent replies — terse, payload-first, zero ceremony |
| **2. Minimalism** | [Pony Tail Engineer](https://github.com/DietrichGebert/ponytail) | What the agent builds — smallest complete change, YAGNI, standard library first |
| **3. Discipline** | [Addy Osmani's agent-skills](https://github.com/addyosmani/agent-skills) | How the agent verifies — 25 lifecycle skills, contracts, 80/15/5 test pyramid, security |
| **4. Orchestration** | [Superpowers](https://github.com/obra/superpowers) | How the agent executes — brainstorming, worktree isolation, systematic debugging, iron law of verification |

Each layer is independent and toggleable, giving you maximum engineering rigor without rigidity.

```
┌────────────────────────────────────────────────────────┐
│                 ENGINEER-FUSION-SKILL                  │
│                                                        │
│  VOICE (Caveman)         → How you reply               │
│  MINIMALISM (Ponytail)   → What you build              │
│  DISCIPLINE (Addy)       → Engineering standards      │
│  ORCHESTRATION (Super)   → How you execute & verify    │
│                                                        │
│  All four ON by default. Toggle independently.         │
└────────────────────────────────────────────────────────┘
```

---

## What It Does

When active, the agent:

- **Communicates like a senior engineer (Caveman)**: Payload first, answer first, exact commands, exact error traces, zero hedging, zero polite filler.
- **Builds with ruthless minimalism (Ponytail)**: Solves the entire problem with the least new code. Reuses existing patterns, prefers standard libraries over new dependencies, and avoids speculative abstractions.
- **Enforces rigorous engineering standards (Addy Osmani)**: Surfaces assumptions explicitly, enforces testing contracts (Prove-It pattern), audits security boundaries, and tracks performance budgets.
- **Orchestrates workflows reliably (Superpowers)**: Clarifies intent before planning, decomposes work into bite-sized tasks, isolates work in git worktrees, debugs systematically across 4 phases, and adheres to the **Iron Law**: `NO COMPLETION CLAIMS WITHOUT FRESH VERIFICATION EVIDENCE`.

Full technical details: [DOC.md](DOC.md).

---

## Repo Layout

```
Engineer-Fusion-Skill/
├── README.md                            ← Overview and multi-agent install guide
├── DOC.md                               ← Architecture, progressive disclosure, precedence rules
├── NOTICE.md                            ← Attribution (MIT) to the 4 upstream projects
├── LICENSE                              ← MIT License
├── package.json                         ← NPM package and OpenCode integration
├── GEMINI.md & gemini-extension.json    ← Gemini CLI extension
├── AGENTS.md                            ← Universal agent & contributor guidelines
├── .claude-plugin/                      ← Claude Code plugin & marketplace manifests
├── .antigravity-plugin/                 ← Google Antigravity (AGY) plugin manifest
├── .codex-plugin/                       ← OpenAI Codex plugin manifest
├── .cursor-plugin/                      ← Cursor IDE plugin manifest
├── .devin-plugin/                       ← Devin plugin manifest
├── .agents/                             ← ZCode / Agents marketplace manifest
├── .opencode/                           ← OpenCode V1/V2 plugin bootstrap
├── dist/
│   └── engineer-fusion-standalone.md    ← Self-contained single-file bundle
├── scripts/
│   ├── bundle.js                        ← Generates standalone distribution
│   └── validate.js                      ← Automated test & validation script
└── skills/
    └── engineer-fusion-skill/
        ├── SKILL.md                     ← Core prompt (all 4 layers + routing table)
        └── references/
            ├── addy-lifecycle.md        ← 25 distilled lifecycle skills (on-demand)
            └── superpowers-workflows.md ← Orchestration & verification workflows (on-demand)
```

---

## Multi-Tool Compatibility & Installation

### 1. Claude Code
Install as a plugin or copy to skills directory:
```bash
git clone https://github.com/houssemdub/Engineer-Fusion-Skill.git
mkdir -p ~/.claude/skills
cp -r Engineer-Fusion-Skill/skills/engineer-fusion-skill ~/.claude/skills/
```
Or point Claude Code to the repository plugin via `.claude-plugin/`.

### 2. Gemini CLI & Antigravity (AGY)
- **Gemini CLI**: Run from within the repository or link as an extension (`gemini-extension.json` + `GEMINI.md`).
- **Antigravity**: Discovered automatically via `.antigravity-plugin/plugin.json` or by placing in `~/.gemini/antigravity-cli/skills/`.

### 3. ZCode & Agents Ecosystem
Discovered automatically via `.agents/plugins/marketplace.json` or:
```bash
mkdir -p ~/.agents/skills
cp -r Engineer-Fusion-Skill/skills/engineer-fusion-skill ~/.agents/skills/
```

### 4. OpenCode
Add the plugin to your `opencode.json` (or `~/.config/opencode/opencode.json`):
```json
{
  "plugin": [
    "/path/to/Engineer-Fusion-Skill/.opencode/plugins/engineer-fusion.js"
  ]
}
```

### 5. OpenAI Codex
Discovered via `.codex-plugin/plugin.json` or by placing in your Codex skills folder.

### 6. Cursor IDE
Discovered via `.cursor-plugin/plugin.json` or copy to `.cursor/skills/`:
```bash
mkdir -p .cursor/skills
cp -r Engineer-Fusion-Skill/skills/engineer-fusion-skill .cursor/skills/
```

### 7. Universal / Standalone (Windsurf, Copilot, Cline, Aider)
For tools that do not support multi-file skills or relative file resolution:
Use **[dist/engineer-fusion-standalone.md](dist/engineer-fusion-standalone.md)**.
Paste its contents directly into `.cursorrules`, `.windsurfrules`, `.github/copilot-instructions.md`, or your system instructions.

---

## Usage & Controls

The skill triggers automatically on coding tasks, and explicitly when you say **"engineering mode"**, **"engineer fusion"**, **"caveman"**, **"ponytail"**, **"superpowers"**, **"be brief"**, **"be lazy"**, or **"senior mode"**.

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

## Validation & Building

Verify manifests, references, and bundle:

```bash
npm run validate   # Validates all manifests, references, and JSON files
npm run bundle     # Re-generates dist/engineer-fusion-standalone.md
```

---

## License

MIT License. Attribution to Julius Brussee (Caveman), Dietrich Gebert (Ponytail), Addy Osmani (Agent Skills), and Jesse Vincent (Superpowers). See [NOTICE.md](NOTICE.md).
