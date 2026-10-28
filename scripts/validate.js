/**
 * Validate skill frontmatter, files, manifests, and references.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');

const requiredFiles = [
  'skills/engineer-fusion-skill/SKILL.md',
  'skills/engineer-fusion-skill/references/addy-lifecycle.md',
  'skills/engineer-fusion-skill/references/superpowers-workflows.md',
  'package.json',
  'gemini-extension.json',
  'GEMINI.md',
  'AGENTS.md',
  '.claude-plugin/plugin.json',
  '.claude-plugin/marketplace.json',
  '.antigravity-plugin/plugin.json',
  '.codex-plugin/plugin.json',
  '.cursor-plugin/plugin.json',
  '.devin-plugin/plugin.json',
  '.agents/plugins/marketplace.json',
  'dist/engineer-fusion-standalone.md',
  'README.md',
  'DOC.md',
  'NOTICE.md',
  'LICENSE'
];

let failed = false;

console.log('[validate] Checking required files...');
for (const relPath of requiredFiles) {
  const fullPath = path.join(rootDir, relPath);
  if (!fs.existsSync(fullPath)) {
    console.error(`  [FAIL] Missing file: ${relPath}`);
    failed = true;
  } else {
    console.log(`  [OK] ${relPath}`);
  }
}

// Validate SKILL.md frontmatter
const skillPath = path.join(rootDir, 'skills/engineer-fusion-skill/SKILL.md');
const skillRaw = fs.readFileSync(skillPath, 'utf8');
const fmMatch = skillRaw.match(/^---\r?\n([\s\S]*?)\r?\n---/);
if (!fmMatch) {
  console.error('  [FAIL] SKILL.md missing valid YAML frontmatter');
  failed = true;
} else {
  if (!fmMatch[1].includes('name:') || !fmMatch[1].includes('description:')) {
    console.error('  [FAIL] SKILL.md frontmatter must contain name and description');
    failed = true;
  } else {
    console.log('  [OK] SKILL.md frontmatter valid');
  }
}

// Validate references inside SKILL.md exist
const refMatches = skillRaw.match(/references\/[a-zA-Z0-9_-]+\.md/g) || [];
for (const ref of refMatches) {
  const target = path.join(rootDir, 'skills/engineer-fusion-skill', ref);
  if (!fs.existsSync(target)) {
    console.error(`  [FAIL] Broken reference link in SKILL.md: ${ref}`);
    failed = true;
  } else {
    console.log(`  [OK] Reference target exists: ${ref}`);
  }
}

// Validate JSON files
const jsonFiles = [
  'package.json',
  'gemini-extension.json',
  '.claude-plugin/plugin.json',
  '.claude-plugin/marketplace.json',
  '.antigravity-plugin/plugin.json',
  '.codex-plugin/plugin.json',
  '.cursor-plugin/plugin.json',
  '.devin-plugin/plugin.json',
  '.agents/plugins/marketplace.json'
];

for (const jf of jsonFiles) {
  try {
    const raw = fs.readFileSync(path.join(rootDir, jf), 'utf8');
    JSON.parse(raw);
    console.log(`  [OK] Valid JSON: ${jf}`);
  } catch (err) {
    console.error(`  [FAIL] Invalid JSON syntax in ${jf}: ${err.message}`);
    failed = true;
  }
}

if (failed) {
  console.error('\n[validate] Validation failed!');
  process.exit(1);
} else {
  console.log('\n[validate] All checks passed successfully!');
}
