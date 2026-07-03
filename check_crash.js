import fs from 'fs';
import path from 'path';

const componentsDir = './src/components';
const files = fs.readdirSync(componentsDir).filter(f => f.endsWith('.jsx'));

let foundIssues = false;

for (const file of files) {
  const filePath = path.join(componentsDir, file);
  const content = fs.readFileSync(filePath, 'utf-8');

  const lines = content.split('\n');
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.includes('t(') || line.includes('i18n') || line.includes('useTranslation')) {
      console.log(`${file}:${i + 1} -> ${line.trim()}`);
      foundIssues = true;
    }
  }
}

if (!foundIssues) {
  console.log('No leftover i18n calls found in src/components.');
}
