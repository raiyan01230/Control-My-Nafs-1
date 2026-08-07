const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

if (!code.includes('import { PrayerTimes }')) {
  code = code.replace(
    /import \{ TodayScoreCard \} from '\.\/components\/TodayScoreCard';/,
    `import { TodayScoreCard } from './components/TodayScoreCard';\nimport { PrayerTimes } from './components/PrayerTimes';\nimport { ActivityHeatmap } from './components/ActivityHeatmap';`
  );
}

// Inside activeTab === 'dashboard'
// Let's replace:
// <DailyReminderCard language={language} />
// <TodayScoreCard record={record} language={language} />

code = code.replace(
  /<DailyReminderCard language=\{language\} \/>\n\s*<TodayScoreCard record=\{record\} language=\{language\} \/>/,
  `<PrayerTimes language={language} />\n                  <DailyReminderCard language={language} />\n                  <TodayScoreCard record={record} language={language} />\n                  <ActivityHeatmap language={language} records={monthlyRecords} />`
);

fs.writeFileSync('src/App.tsx', code);
