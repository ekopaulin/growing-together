const fs = require('fs');
const path = require('path');
const dir = './src/components';
const files = fs.readdirSync(dir);
files.forEach(f => {
  if (f.endsWith('.jsx')) {
    const text = fs.readFileSync(path.join(dir, f), 'utf8');
    if (text.includes('—') || text.includes('-')) {
      text.split('\n').forEach((line, i) => {
        if (line.includes('—')) {
          console.log(`${f}:${i+1}:${line.trim()}`);
        }
      });
    }
  }
});
