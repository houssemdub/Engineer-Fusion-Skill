/**
 * Engineer-Fusion-Skill plugin for OpenCode
 *
 * Compatible with OpenCode V1 and V2.
 * Pure JavaScript without external dependencies.
 */

import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const skillsDir = path.resolve(__dirname, '../../skills');

const extractAndStripFrontmatter = (content) => {
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!match) return { frontmatter: {}, content };

  const frontmatterStr = match[1];
  const body = match[2];
  const frontmatter = {};

  for (const rawLine of frontmatterStr.split('\n')) {
    const line = rawLine.replace(/\r$/, '');
    const colonIdx = line.indexOf(':');
    if (colonIdx > 0 && !/^\s/.test(line)) {
      const key = line.slice(0, colonIdx).trim();
      const value = line.slice(colonIdx + 1).trim();
      frontmatter[key] = /^(>[+-]?|\|[+-]?)$/.test(value) ? '' : value;
    }
  }

  return { frontmatter, content: body };
};

export const EngineerFusionPlugin = async () => {
  return {
    name: 'engineer-fusion-skill',
    async config(cfg) {
      if (!fs.existsSync(skillsDir)) return;
      cfg.skills = cfg.skills || [];
      const skillFolders = fs.readdirSync(skillsDir, { withFileTypes: true })
        .filter((d) => d.isDirectory())
        .map((d) => d.name);

      for (const folder of skillFolders) {
        const skillPath = path.join(skillsDir, folder, 'SKILL.md');
        if (fs.existsSync(skillPath)) {
          const raw = fs.readFileSync(skillPath, 'utf8');
          const { frontmatter } = extractAndStripFrontmatter(raw);
          cfg.skills.push({
            name: frontmatter.name || folder,
            description: frontmatter.description || '',
            path: skillPath
          });
        }
      }
    }
  };
};

export default {
  id: 'engineer-fusion-skill',
  async setup(ctx) {
    if (ctx?.skill?.transform && fs.existsSync(skillsDir)) {
      ctx.skill.transform((skills) => {
        const skillPath = path.join(skillsDir, 'engineer-fusion-skill', 'SKILL.md');
        if (fs.existsSync(skillPath)) {
          const raw = fs.readFileSync(skillPath, 'utf8');
          const { frontmatter } = extractAndStripFrontmatter(raw);
          skills.push({
            name: frontmatter.name || 'engineer-fusion-skill',
            description: frontmatter.description || '',
            path: skillPath
          });
        }
        return skills;
      });
    }
  }
};
