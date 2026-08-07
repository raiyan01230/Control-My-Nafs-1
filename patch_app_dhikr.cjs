const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

if (!code.includes('import { DhikrCounter }')) {
  code = code.replace(
    /import \{ ActivityHeatmap \} from '\.\/components\/ActivityHeatmap';/,
    `import { ActivityHeatmap } from './components/ActivityHeatmap';\nimport { DhikrCounter } from './components/DhikrCounter';`
  );
}

// Inside activeTab === 'dashboard'
code = code.replace(
  /<ActivityHeatmap language=\{language\} records=\{monthlyRecords\} \/>/,
  `<ActivityHeatmap language={language} records={monthlyRecords} />\n                  <DhikrCounter language={language} onSaveDhikr={(name, count) => handleRecordGoodDeed('custom', \`\${name} (\${count}x)\`, 'Dhikr')} />`
);

fs.writeFileSync('src/App.tsx', code);
