const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

if (!code.includes('import { InitialGate } from')) {
    code = code.replace(/import \{ SecurityLockModal \} from '\.\/components\/SecurityLockModal';/, "import { SecurityLockModal } from './components/SecurityLockModal';\nimport { InitialGate } from './components/InitialGate';");
}

if (!code.includes('const [masterUnlocked, setMasterUnlocked] = useState<boolean>(false);')) {
    code = code.replace(/const \[isUnlocked, setIsUnlocked\] = useState<boolean>\(true\);/, "const [isUnlocked, setIsUnlocked] = useState<boolean>(true);\n  const [masterUnlocked, setMasterUnlocked] = useState<boolean>(false);");
}

if (!code.includes('<InitialGate onUnlock={() => setMasterUnlocked(true)} />')) {
    code = code.replace(/\{!\isUnlocked && \(/, "{!masterUnlocked && (\n        <InitialGate onUnlock={() => setMasterUnlocked(true)} />\n      )}\n\n      {/* Security PIN Lock Overlay */}\n      {masterUnlocked && !isUnlocked && (");
}

fs.writeFileSync('src/App.tsx', code);
