const fs = require('fs');
const path = require('path');

function replaceInFile(filepath) {
  let content = fs.readFileSync(filepath, 'utf8');
  content = content.replace(/Beetogrow/g, 'Growing Together');
  content = content.replace(/\/images\/logo\.jpg/g, '/images/logo_growing_together.jpg');
  fs.writeFileSync(filepath, content);
}

replaceInFile('index.html');
const dir = 'src/components';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.jsx'));
for (const file of files) {
  replaceInFile(path.join(dir, file));
}
console.log('done');
