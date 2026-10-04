const fs = require('fs');
const path = require('path');

const directoryPath = path.join(__dirname, 'src');

const colorMap = {
  // Backgrounds
  'FAF8F5': 'ffffff',
  'F3EFEA': 'f4f4f5',
  'FCF8F4': 'ffffff',
  'F7EFE7': 'f4f4f5',
  // Borders
  'EAE4DC': 'e4e4e7',
  'EFDCB9': 'd4d4d8',
  'C2DDD4': 'e4e4e7',
  // Text
  '152220': '09090b',
  '4A5B57': '52525b',
  '798C87': 'a1a1aa',
  // Pine (Primary) -> Zinc/Black
  '113D36': '18181b',
  '144A42': '27272a',
  '1C5E53': '3f3f46',
  'E2EFEA': 'f4f4f5',
  'F2F8F6': 'fafafa',
  // Ochre (Accent) -> Blue
  'A86938': '2563eb',
  'C27E4B': '3b82f6',
  // Fonts
  'font-serif': 'font-sans tracking-tight',
};

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(function(file) {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) { 
      results = results.concat(walk(file));
    } else { 
      if (file.endsWith('.tsx') || file.endsWith('.ts') || file.endsWith('.css')) {
        results.push(file);
      }
    }
  });
  return results;
}

const files = walk(directoryPath);

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let changed = false;
  
  for (const [oldColor, newColor] of Object.entries(colorMap)) {
    // Replace uppercase
    let regex = new RegExp(oldColor, 'g');
    if (regex.test(content)) {
      content = content.replace(regex, newColor);
      changed = true;
    }
    // Replace lowercase
    let regexLower = new RegExp(oldColor.toLowerCase(), 'g');
    if (regexLower.test(content)) {
      content = content.replace(regexLower, newColor.toLowerCase());
      changed = true;
    }
  }

  if (changed) {
    fs.writeFileSync(file, content, 'utf8');
    console.log(`Updated ${file}`);
  }
});

console.log('Theme replacement complete.');
