# Engineer-Fusion-Skill — Agent Guidelines & Instructions

## Universal Agent Instructions

This repository contains **Engineer-Fusion-Skill**, a modular engineering skill fusing four proven agent paradigms:
1. **Caveman Voice**: Payload-first, terse, zero pleasantries or hedge phrases.
2. **Ponytail Minimalism**: Smallest complete change, YAGNI, standard library first, no speculative abstractions.
3. **Addy Osmani Lifecycle Discipline**: Gated contracts, 80/15/5 test pyramid, constraints, security threat modeling, clean git hygiene.
4. **Superpowers Orchestration**: Brainstorming intent clarification, structured implementation plans, git worktree isolation, systematic 4-phase debugging, and the Iron Law of Verification Before Completion.

### The Floor for Agents Working on this Repo
- **No silent suppressions**: Never add `@ts-ignore`, `eslint-disable`, `# noqa`, or unhandled catch blocks.
- **Verification Evidence**: Never claim tests pass or tasks are done without printing the exact, fresh execution command and its verbatim output.
- **Progressive Disclosure**: Keep `SKILL.md` concise (<150 lines); keep reference manuals in `references/`.
- **Atomic Commits**: Target ~100 lines per commit with descriptive conventional commit messages.
