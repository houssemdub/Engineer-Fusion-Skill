#!/usr/bin/env bash
# SessionStart hook for engineer-fusion-skill

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PLUGIN_ROOT="$(cd "${SCRIPT_DIR}/.." && pwd)"
SKILL_MD="${PLUGIN_ROOT}/skills/engineer-fusion-skill/SKILL.md"

if [ -r "$SKILL_MD" ]; then
  CONTENT="$(<"$SKILL_MD")"
else
  CONTENT="Engineer-Fusion-Skill loaded."
fi

# JSON string escaper
escape_for_json() {
  local s="$1"
  s="${s//\\/\\\\}"
  s="${s//\"/\\\"}"
  s="${s//$'\n'/\\n}"
  s="${s//$'\r'/\\r}"
  s="${s//$'\t'/\\t}"
  printf '%s' "$s"
}

ESCAPED_CONTENT=$(escape_for_json "$CONTENT")
INJECTION="<ENGINEER_FUSION_ACTIVE>\nFour-discipline engineering mode active (Voice: Caveman, Minimalism: Ponytail, Discipline: Addy, Orchestration: Superpowers).\n\n${ESCAPED_CONTENT}\n</ENGINEER_FUSION_ACTIVE>"

printf '{"additional_context":"%s","hookSpecificOutput":{"additionalContext":"%s"}}\n' "$INJECTION" "$INJECTION"
