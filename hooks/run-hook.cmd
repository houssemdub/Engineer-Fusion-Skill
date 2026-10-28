@echo off
setlocal
set "SCRIPT_DIR=%~dp0"
set "HOOK_NAME=%~1"
if "%HOOK_NAME%"=="" (
  echo Error: hook name required
  exit /b 1
)

if exist "%SCRIPT_DIR%session-start.sh" (
  where bash >nul 2>nul
  if %ERRORLEVEL% EQU 0 (
    bash "%SCRIPT_DIR%session-start.sh"
    exit /b %ERRORLEVEL%
  )
)

where node >nul 2>nul
if %ERRORLEVEL% EQU 0 (
  node -e "
    const fs = require('fs');
    const path = require('path');
    const skillPath = path.resolve('%SCRIPT_DIR%', '../skills/engineer-fusion-skill/SKILL.md');
    let content = 'Engineer Fusion Skill Active';
    try { content = fs.readFileSync(skillPath, 'utf8'); } catch(e) {}
    const payload = JSON.stringify({
      additional_context: '<ENGINEER_FUSION_SKILL>\n' + content + '\n</ENGINEER_FUSION_SKILL>',
      hookSpecificOutput: {
        additionalContext: '<ENGINEER_FUSION_SKILL>\n' + content + '\n</ENGINEER_FUSION_SKILL>'
      }
    });
    console.log(payload);
  "
  exit /b 0
)

echo {"status":"ok"}
exit /b 0
