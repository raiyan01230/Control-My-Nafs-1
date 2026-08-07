const fs = require('fs');
let code = fs.readFileSync('server.ts', 'utf8');

code = code.replace(
  /app\.post\('\/api\/auth\/verify-pin'[\s\S]*?\n\}\);\n/,
`app.post('/api/auth/verify-pin', (req: Request, res: Response) => {
  const { pin } = req.body;
  const currentPin = localDb.settings.securityPin || '1234';
  
  if (!localDb.settings.securityLockEnabled) {
    return res.json({ success: true, message: 'Security lock is disabled' });
  }

  if (pin === currentPin) {
    return res.json({ success: true });
  } else {
    return res.status(401).json({ success: false, error: 'Incorrect PIN' });
  }
});\n`
);

fs.writeFileSync('server.ts', code);
