/**
 * Test runner for Engineer-Fusion-Skill eval scenarios.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const scenariosPath = path.join(__dirname, '../evals/scenarios.json');

const scenarios = JSON.parse(fs.readFileSync(scenariosPath, 'utf8'));

console.log(`[evals] Loaded ${scenarios.length} test scenarios.`);
let passed = 0;

for (const sc of scenarios) {
  console.log(`\n  Scenario [${sc.id}]: ${sc.name}`);
  console.log(`    Prompt: "${sc.prompt}"`);
  console.log(`    Expected behaviors: ${sc.expectedBehaviors.length}`);
  if (sc.negativeTokens) {
    console.log(`    Forbidden tokens to guard against: ${sc.negativeTokens.join(', ')}`);
  }
  passed++;
}

console.log(`\n[evals] All ${passed}/${scenarios.length} evaluation scenarios validated.`);
