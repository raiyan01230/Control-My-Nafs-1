const fs = require('fs');
let code = fs.readFileSync('src/components/SettingsModal.tsx', 'utf8');

// Undo password state
code = code.replace(
  /const \[securityPassword, setSecurityPassword\] = useState\(settings\.securityPassword \|\| 'admin123'\);\n  const \[showPassword, setShowPassword\] = useState\(false\);/,
  ''
);

// Remove password from handleSave
code = code.replace(
  /securityPassword\n    \};/,
  '    };'
);

// Revert backend fetch endpoint and body to match original single layer
code = code.replace(
  /fetch\('\/api\/auth\/set-security'/,
  `fetch('/api/auth/set-pin'`
);

code = code.replace(
  /body: JSON\.stringify\(\{ newPin: securityPin, newPassword: securityPassword, securityLockEnabled \}\)/,
  `body: JSON.stringify({ newPin: securityPin, securityLockEnabled })`
);

// Remove the Password Input section completely
code = code.replace(
  /\{\/\* Password Input \*\/\}(.|\n)*?<\/div>\n              <\/div>/m,
  ''
);

// Revert wording
code = code.replace(
  /3-Layer Security Lock/g,
  `Security PIN Lock`
);

code = code.replace(
  /Personal Website Security, 3-Layer Protection & Database Engine/,
  `Personal Website Security, PIN Protection & Database Engine`
);

fs.writeFileSync('src/components/SettingsModal.tsx', code);
