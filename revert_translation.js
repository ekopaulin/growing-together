import fs from 'fs';
import path from 'path';

const frJson = JSON.parse(fs.readFileSync('./src/locales/fr.json', 'utf-8'));

function getTranslation(keyStr) {
  const keys = keyStr.split('.');
  let current = frJson;
  for (const k of keys) {
    if (current && current[k]) {
      current = current[k];
    } else {
      return null;
    }
  }
  return typeof current === 'string' ? current : null;
}

const componentsDir = './src/components';
const files = fs.readdirSync(componentsDir).filter(f => f.endsWith('.jsx'));

for (const file of files) {
  const filePath = path.join(componentsDir, file);
  let content = fs.readFileSync(filePath, 'utf-8');

  // Remove import { useTranslation } from 'react-i18next';
  content = content.replace(/import\s+\{\s*useTranslation\s*\}\s+from\s+['"]react-i18next['"];?\r?\n?/g, '');
  
  // Remove const { t } = useTranslation();
  content = content.replace(/const\s+\{\s*t\s*\}\s*=\s*useTranslation\(\);\r?\n?/g, '');
  content = content.replace(/const\s+\{\s*t,\s*i18n\s*\}\s*=\s*useTranslation\(\);\r?\n?/g, '');

  // Replace dangerouslySetInnerHTML={{ __html: t('key') }}
  content = content.replace(/dangerouslySetInnerHTML=\{\{\s*__html:\s*t\(['"]([^'"]+)['"]\)\s*\}\}/g, (match, key) => {
    const text = getTranslation(key);
    return text ? `dangerouslySetInnerHTML={{ __html: "${text}" }}` : match;
  });

  // Replace {t('key', 'default')} -> 'default'
  content = content.replace(/\{t\(['"]([^'"]+)['"]\s*,\s*['"]([^'"]+)['"]\)\}/g, (match, key, def) => {
    return def;
  });

  // Replace t('key', 'default') inside JS objects -> 'default'
  content = content.replace(/t\(['"]([^'"]+)['"]\s*,\s*['"]([^'"]+)['"]\)/g, (match, key, def) => {
    return `'${def.replace(/'/g, "\\'")}'`;
  });

  // Replace {t('key')} -> Translation
  content = content.replace(/\{t\(['"]([^'"]+)['"]\)\}/g, (match, key) => {
    const text = getTranslation(key);
    return text ? text : match;
  });

  // Replace t('key') inside JS objects -> 'Translation'
  content = content.replace(/t\(['"]([^'"]+)['"]\)/g, (match, key) => {
    const text = getTranslation(key);
    return text ? `'${text.replace(/'/g, "\\'")}'` : match;
  });

  fs.writeFileSync(filePath, content);
}

// Remove language switcher from Nav.jsx manually if needed
let navPath = path.join(componentsDir, 'Nav.jsx');
if (fs.existsSync(navPath)) {
  let navContent = fs.readFileSync(navPath, 'utf-8');
  navContent = navContent.replace(/<button onClick=\{toggleLanguage\}[^>]*>.*?<\/button>/gs, '');
  navContent = navContent.replace(/const toggleLanguage = \(\) => \{[\s\S]*?\};/g, '');
  fs.writeFileSync(navPath, navContent);
}

console.log("Translation reverted.");
