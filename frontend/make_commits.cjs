const fs = require('fs');
const { execSync } = require('child_process');

const targetFile = 'src/index.css';

// 14 different CSS utility classes to append
const classes = [
  ".ui-mb-1 { margin-bottom: 0.25rem; }",
  ".ui-mb-2 { margin-bottom: 0.5rem; }",
  ".ui-mb-3 { margin-bottom: 1rem; }",
  ".ui-mt-1 { margin-top: 0.25rem; }",
  ".ui-mt-2 { margin-top: 0.5rem; }",
  ".ui-mt-3 { margin-top: 1rem; }",
  ".ui-flex-center { display: flex; align-items: center; justify-content: center; }",
  ".ui-text-sm { font-size: 0.875rem; }",
  ".ui-text-lg { font-size: 1.125rem; }",
  ".ui-font-bold { font-weight: bold; }",
  ".ui-rounded-sm { border-radius: 0.125rem; }",
  ".ui-rounded-md { border-radius: 0.375rem; }",
  ".ui-rounded-lg { border-radius: 0.5rem; }",
  ".ui-shadow-sm { box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05); }"
];

console.log('Starting commits...');

for (let i = 0; i < classes.length; i++) {
  const contentToAppend = `\n/* UI update ${i + 1} */\n${classes[i]}\n`;
  fs.appendFileSync(targetFile, contentToAppend);
  execSync('git add ' + targetFile);
  execSync(`git commit -m "feat(ui): add utility class for UI improvement part ${i + 1}"`);
  console.log(`Commit ${i + 1} done.`);
}

console.log('All 14 commits created.');
