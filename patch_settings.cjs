const fs = require('fs');
let code = fs.readFileSync('src/components/SettingsModal.tsx', 'utf8');

// Add state for securityPassword
code = code.replace(
  /const \[securityPin, setSecurityPin\] = useState\(settings\.securityPin \|\| '1234'\);/,
  `const [securityPin, setSecurityPin] = useState(settings.securityPin || '1234');
  const [securityPassword, setSecurityPassword] = useState(settings.securityPassword || 'admin123');
  const [showPassword, setShowPassword] = useState(false);`
);

// Add securityPassword to settings object in handleSave
code = code.replace(
  /securityPin\n    \};/,
  `securityPin,
      securityPassword\n    };`
);

// Change /api/auth/set-pin to /api/auth/set-security
code = code.replace(
  /fetch\('\/api\/auth\/set-pin'/,
  `fetch('/api/auth/set-security'`
);

// Update JSON.stringify to include newPassword
code = code.replace(
  /body: JSON\.stringify\(\{ newPin: securityPin, securityLockEnabled \}\)/,
  `body: JSON.stringify({ newPin: securityPin, newPassword: securityPassword, securityLockEnabled })`
);

// Add input field for password after PIN input
code = code.replace(
  /\{showPin \? <EyeOff className="w-4 h-4" \/> : <Eye className="w-4 h-4" \/>\}\n                  <\/button>\n                <\/div>\n              <\/div>/,
  `{showPin ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Password Input */}
              <div className="space-y-3">
                <label className="text-sm font-semibold text-slate-300">
                  {language === 'bn' ? 'নিরাপত্তা পাসওয়ার্ড সেট করুন (Default: admin123)' : 'Security Password (Default: admin123)'}
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    maxLength={32}
                    value={securityPassword}
                    onChange={(e) => setSecurityPassword(e.target.value)}
                    className="w-full bg-[#080c14] border border-slate-700 rounded-xl py-3 pl-12 pr-12 text-slate-100 font-mono focus:outline-none focus:border-emerald-500 transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-emerald-400 transition"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>`
);

// Update wording for 3-layer security
code = code.replace(
  /Security PIN Lock/g,
  `3-Layer Security Lock`
);

code = code.replace(
  /ওয়েবসাইট লক & পিন/g,
  `ওয়েবসাইট লক`
);

code = code.replace(
  /Personal Website Security, PIN Protection & Database Engine/,
  `Personal Website Security, 3-Layer Protection & Database Engine`
);

fs.writeFileSync('src/components/SettingsModal.tsx', code);
