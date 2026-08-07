const fs = require('fs');
let code = fs.readFileSync('server.ts', 'utf8');

code = code.replace(
  /app\.post\('\/api\/auth\/verify-pin',/,
`// Verify Master Access
app.post('/api/auth/verify-master', (req: Request, res: Response) => {
  const { password } = req.body;
  if (password === '3945') {
    return res.json({ success: true });
  } else {
    return res.status(401).json({ success: false, error: 'Incorrect password' });
  }
});

app.post('/api/auth/verify-pin',`
);

fs.writeFileSync('server.ts', code);
