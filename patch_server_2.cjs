const fs = require('fs');
let code = fs.readFileSync('server.ts', 'utf8');

code = code.replace(
  /app\.post\('\/api\/auth\/set-pin'[\s\S]*?\n\}\);\n/,
`app.post('/api/auth/set-security', (req: Request, res: Response) => {
  const { newPin, newPassword, securityLockEnabled } = req.body;
  if (newPin !== undefined) {
    localDb.settings.securityPin = newPin;
  }
  if (newPassword !== undefined) {
    localDb.settings.securityPassword = newPassword;
  }
  if (securityLockEnabled !== undefined) {
    localDb.settings.securityLockEnabled = !!securityLockEnabled;
  }
  saveLocalDb(localDb);
  res.json({
    success: true,
    securityLockEnabled: localDb.settings.securityLockEnabled,
    message: 'Security settings updated successfully'
  });
});\n`
);

fs.writeFileSync('server.ts', code);
