const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

code = code.replace(
  /const today = new Date\(selectedDate\);\n    const start = new Date\(today\.getFullYear\(\), today\.getMonth\(\), 1\)\.toISOString\(\)\.split\('T'\)\[0\];\n    const end = new Date\(today\.getFullYear\(\), today\.getMonth\(\) \+ 1, 0\)\.toISOString\(\)\.split\('T'\)\[0\];/,
  `const today = new Date(selectedDate);\n    const start = new Date(today.getFullYear() - 1, today.getMonth(), 1).toISOString().split('T')[0]; // Last 12 months\n    const end = new Date(today.getFullYear(), today.getMonth() + 1, 0).toISOString().split('T')[0];`
);

fs.writeFileSync('src/App.tsx', code);
