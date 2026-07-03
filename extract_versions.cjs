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
  let seenWrites = {};

  for await (const line of rl) {
    try {
      const entry = JSON.parse(line);
      
      if (entry.tool_calls) {
        for (const call of entry.tool_calls) {
          if (call.name === 'write_to_file') {
            const targetFile = call.args.TargetFile;
            if (targetFile && targetFile.includes('src\\\\components')) {
               const basename = path.basename(targetFile.replace(/"/g, ''));
               if (!files[basename]) files[basename] = [];
               files[basename].push(call.args.CodeContent);
               seenWrites[basename] = true;
            }
          }
        }
      }
    } catch (e) {
      // ignore
    }
  }

  // Save the FIRST write_to_file for each component (or ALL of them)
  const outputDir = 'C:\\Users\\ALTA GRACIA DIVINA\\.gemini\\antigravity\\scratch\\beetogrow-v2\\rollback_files';
  if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir);
  }
  
  for (const [basename, contents] of Object.entries(files)) {
    // If there are multiple writes, the first one was from the previous agent's initial scaffolding.
    // Actually, let's just save all versions as separate files.
    contents.forEach((code, index) => {
        fs.writeFileSync(path.join(outputDir, `${basename}.v${index}.jsx`), code);
    });
  }
  console.log("Extracted files to rollback_files directory.");
}

processTranscript().catch(console.error);
