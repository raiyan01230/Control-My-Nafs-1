const fs = require('fs');
let code = fs.readFileSync('server.ts', 'utf8');

code = code.replace(
  /app\.post\('\/api\/auth\/set-security'[\s\S]*?\n\}\);\n/,
`app.post('/api/auth/set-pin', (req: Request, res: Response) => {
  const { newPin, securityLockEnabled } = req.body;
  if (newPin !== undefined) {
    localDb.settings.securityPin = newPin;
  }
  if (securityLockEnabled !== undefined) {
    localDb.settings.securityLockEnabled = !!securityLockEnabled;
  }
  saveLocalDb(localDb);
  res.json({
    success: true,
    securityLockEnabled: localDb.settings.securityLockEnabled,
    message: 'Security PIN updated successfully'
  });
});\n`
);

fs.writeFileSync('server.ts', code);
