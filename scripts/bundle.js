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
const refDir = path.join(skillDir, 'references');

if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

const skillContent = fs.readFileSync(path.join(skillDir, 'SKILL.md'), 'utf8');

const referenceFiles = [
  { name: 'addy-lifecycle.md', title: 'APPENDIX A: Distilled Software Lifecycle Reference (Addy Osmani)' },
  { name: 'superpowers-workflows.md', title: 'APPENDIX B: Distilled Workflow Orchestration Reference (Superpowers)' },
  { name: 'memory-and-context.md', title: 'APPENDIX C: Context Engineering & Long-Sprint Memory Management' },
  { name: 'security-audit.md', title: 'APPENDIX D: Security Auditing & Threat Modeling Protocol' },
  { name: 'research-routines.md', title: 'APPENDIX E: Research-First Planning & Grounding Routines' },
  { name: 'long-term-instincts.md', title: 'APPENDIX F: Long-Term Engineering Instincts & Heuristics' }
];

const banner = `<!--
  Engineer-Fusion-Skill — Standalone Single-File Bundle
  Auto-generated on ${new Date().toISOString()}
  Source: https://github.com/houssemdub/Engineer-Fusion-Skill
  MIT License
-->\n\n`;

let bundle = `${banner}${skillContent}\n\n---\n`;

for (const ref of referenceFiles) {
  const filePath = path.join(refDir, ref.name);
  if (fs.existsSync(filePath)) {
    const content = fs.readFileSync(filePath, 'utf8');
    bundle += `\n# ${ref.title}\n\n${content}\n\n---\n`;
  }
}

const outputPath = path.join(distDir, 'engineer-fusion-standalone.md');
fs.writeFileSync(outputPath, bundle, 'utf8');

console.log(`[bundle] Generated standalone bundle at: ${outputPath}`);
console.log(`[bundle] Total Size: ${(Buffer.byteLength(bundle, 'utf8') / 1024).toFixed(1)} KB`);
