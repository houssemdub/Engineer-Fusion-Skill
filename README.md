# Engineer-Fusion-Skill

**One agent skill that fuses three engineering disciplines into a single way of working.**

Engineer-Fusion-Skill merges three popular agent skills into one:

| Layer | Fused from | Governs |
|---|---|---|
| **Voice** | [Caveman](https://github.com/JuliusBrussee/caveman) | How the agent replies — terse, payload-first, zero fluff |
| **Minimalism** | [Pony Tail Engineer](https://github.com/DietrichGebert/ponytail) | What the agent builds — smallest complete change, YAGNI |
| **Discipline** | [Addy Osmani's agent-skills](https://github.com/addyosmani/agent-skills) | How the agent verifies and ships — spec, TDD, review, security, git |

Each layer is independent and toggleable, so you get three disciplines for the price of one skill — and can switch any of them off without losing the others.

```
┌──────────────────────────────────────────────────────┐
│                  ENGINEER-FUSION-SKILL               │
│                                                      │
│  VOICE (Caveman)      → how you reply                │
│  MINIMALISM (Ponytail) → what you build              │
│  DISCIPLINE (Addy)    → how you verify and ship      │
│                                                      │
│  All three ON by default. Toggle independently.      │
└──────────────────────────────────────────────────────┘
```

## What it does

When the skill is active, the agent:

- **Answers like a caveman** — answer first, no ceremony, every technical fact and code payload verbatim. Clarity always beats compression.
- **Builds like a lazy senior dev** — the smallest change that fully solves the task: reuse what exists, never add a dependency for a few lines, no speculative abstraction — but never cuts validation, error handling, or security.
- **Works like a staff engineer** — surfaces assumptions, proves bug fixes with reproduction tests, reviews across five axes, keeps commits atomic (~100 lines), never leaves the codebase broken between slices, and routes complex tasks to distilled lifecycle workflows (spec → plan → build → verify → review → ship).

Full details: [DOC.md](DOC.md).

## Repo layout

```
Engineer-Fusion-Skill/
├── README.md                            ← you are here
├── DOC.md                               ← full documentation of the three layers
├── LICENSE                              ← MIT
├── NOTICE.md                            ← attribution to the three source skills
└── skills/
    └── engineer-fusion-skill/           ← the skill itself (portable)
        ├── SKILL.md                     ← entry point: the three layers + routing
        └── references/
            └── addy-lifecycle.md        ← distilled 25-skill lifecycle discipline
```

The `skills/engineer-fusion-skill/` directory is fully portable — copy it into any agent's skill location and it works.

## Install

### ZCode

Copy the skill directory into the user-level skills folder:

```bash
git clone https://github.com/houssemdub/Engineer-Fusion-Skill.git
mkdir -p ~/.agents/skills
cp -r Engineer-Fusion-Skill/skills/engineer-fusion-skill ~/.agents/skills/
```

Restart the session — the skill is discovered at `~/.agents/skills/engineer-fusion-skill/SKILL.md`.

### Claude Code

```bash
git clone https://github.com/houssemdub/Engineer-Fusion-Skill.git
mkdir -p ~/.claude/skills
cp -r Engineer-Fusion-Skill/skills/engineer-fusion-skill ~/.claude/skills/
```

Or point a plugin manifest at the `skills/` directory.

### Any agent via the skills CLI

```bash
npx skills add houssemdub/Engineer-Fusion-Skill
```

### Cursor / Windsurf / Codex / Gemini CLI / OpenCode

Copy `skills/engineer-fusion-skill/` into the agent's native skills directory (`.cursor/skills/`, `.codex/skills/`, `~/.config/opencode/skills/`, …) or paste the SKILL.md content into the agent's rules/instructions file. Skills are plain Markdown — any agent that accepts system prompts can use them.

## Usage

The skill triggers automatically on coding tasks, and explicitly when you say **"caveman"**, **"ponytail"**, **"engineering mode"**, **"be brief"**, **"be lazy"**, or **"senior mode"**.

Per-layer switches (all confirmed in one line):

| Say | Effect |
|---|---|
| `stop caveman` | Back to normal prose; minimalism + discipline stay on |
| `stop ponytail` | Normal solution scope; voice + discipline stay on |
| `ponytail lite` / `ponytail ultra` | Smaller / stricter minimalism level |
| `relaxed mode` | Drop the discipline layer; voice + minimalism stay on |
| `stop engineering mode` / `normal mode` | Everything off |

## Why fuse them?

The three source skills each solve a different failure mode of AI coding agents:

- **Caveman** fights verbose, ceremonial replies that bury the answer.
- **Ponytail** fights over-engineering — 1000 lines where 100 suffice.
- **Addy's agent-skills** fights skipped verification — "seems right" instead of passing tests.

Individually they're strong; together they cover the full surface: *how the agent talks, what the agent builds, and how the agent proves it works.* The skill also defines how the layers interact when they conflict (see [DOC.md](DOC.md#conflicts-between-layers)).

## Attribution

Built by fusing content from three open-source projects, each credited in [NOTICE.md](NOTICE.md):

- **Caveman** — nizos/caveman (MIT)
- **Pony Tail Engineer** — afadi-hub/ponytail (MIT)
- **Agent Skills** — addyosmani/agent-skills (MIT)

## License

MIT — see [LICENSE](LICENSE).
