/**
 * Bundle Engineer-Fusion-Skill into a self-contained single-file markdown distribution.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');
const skillDir = path.join(rootDir, 'skills', 'engineer-fusion-skill');
const distDir = path.join(rootDir, 'dist');

const skillPath = path.join(skillDir, 'SKILL.md');
const addyRefPath = path.join(skillDir, 'references', 'addy-lifecycle.md');
const superpowersRefPath = path.join(skillDir, 'references', 'superpowers-workflows.md');

if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

const skillContent = fs.readFileSync(skillPath, 'utf8');
const addyContent = fs.readFileSync(addyRefPath, 'utf8');
const superpowersContent = fs.readFileSync(superpowersRefPath, 'utf8');

const banner = `<!--
  Engineer-Fusion-Skill — Standalone Single-File Bundle
  Auto-generated on ${new Date().toISOString()}
  Source: https://github.com/houssemdub/Engineer-Fusion-Skill
  MIT License
-->\n\n`;

const bundle = `${banner}${skillContent}

---

# APPENDIX A: Distilled Software Lifecycle Reference (Addy Osmani)

${addyContent}

---

# APPENDIX B: Distilled Workflow Orchestration Reference (Superpowers)

${superpowersContent}
`;

const outputPath = path.join(distDir, 'engineer-fusion-standalone.md');
fs.writeFileSync(outputPath, bundle, 'utf8');

console.log(`[bundle] Generated standalone bundle at: ${outputPath}`);
console.log(`[bundle] Size: ${(Buffer.byteLength(bundle, 'utf8') / 1024).toFixed(1)} KB`);
