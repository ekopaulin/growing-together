const fs = require('fs');
const readline = require('readline');
const path = require('path');

async function processTranscript() {
  const logPath = 'C:\\Users\\ALTA GRACIA DIVINA\\.gemini\\antigravity\\brain\\21abd45b-3ab1-4780-9864-24bc8be51f98\\.system_generated\\logs\\transcript_full.jsonl';
  const fileStream = fs.createReadStream(logPath);
  
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  const files = {};
  let inTranslationPhase = false;

  for await (const line of rl) {
    try {
      const entry = JSON.parse(line);
      
      if (entry.type === 'USER_INPUT' && entry.content && entry.content.includes('Le Bilinguisme')) {
        inTranslationPhase = true;
      }

      if (entry.tool_calls && !inTranslationPhase) {
        for (const call of entry.tool_calls) {
          if (call.name === 'write_to_file' || call.name === 'replace_file_content') {
            const targetFile = call.args.TargetFile || call.args.AbsolutePath;
            if (targetFile && targetFile.includes('src\\\\components')) {
               const basename = path.basename(targetFile.replace(/"/g, ''));
               if (!files[basename]) files[basename] = [];
               files[basename].push(call);
            }
          }
        }
      }
    } catch (e) {
      // ignore
    }
  }

  const output = {};
  for (const [basename, calls] of Object.entries(files)) {
    output[basename] = calls.length; // Just log how many edits were captured
  }
  
  console.log("Pre-translation state captured for:", output);
  fs.writeFileSync('C:\\Users\\ALTA GRACIA DIVINA\\.gemini\\antigravity\\scratch\\beetogrow-v2\\rollback_info.json', JSON.stringify(files, null, 2));
}

processTranscript().catch(console.error);
