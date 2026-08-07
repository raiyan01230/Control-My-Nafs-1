const fs = require('fs');
let code = fs.readFileSync('src/components/SettingsModal.tsx', 'utf8');
if (!code.includes('Lock,')) {
    code = code.replace(/import \{ ([^}]+) \} from 'lucide-react';/, "import { $1, Lock } from 'lucide-react';");
    fs.writeFileSync('src/components/SettingsModal.tsx', code);
}
