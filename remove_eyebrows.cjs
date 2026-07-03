const fs = require('fs');
const path = require('path');
const dir = 'src/components';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.jsx'));

for (const file of files) {
  const filepath = path.join(dir, file);
  const content = fs.readFileSync(filepath, 'utf8');
  
  const lines = content.split('\n');
  const newLines = lines.filter(line => !line.includes('className="eyebrow'));
  
  if (lines.length !== newLines.length) {
    fs.writeFileSync(filepath, newLines.join('\n'));
    console.log(`Updated ${file}`);
  }
}
console.log('done');
