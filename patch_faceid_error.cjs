const fs = require('fs');
let code = fs.readFileSync('src/components/SecurityLockModal.tsx', 'utf8');

code = code.replace(
  /if \(err\.name === 'NotAllowedError'\) \{[\s\S]*?\} else \{[\s\S]*?\}/,
  `if (err.name === 'NotAllowedError' || (err.message && err.message.includes('publickey-credentials'))) {
         setError(language === 'bn' ? 'ফেস আইডি এখানে অনুমোদিত নয়। অনুগ্রহ করে অ্যাপটি নতুন ট্যাবে খুলুন।' : 'Face ID blocked in preview. Please open the app in a new tab to use Biometrics.');
       } else {
         setError(language === 'bn' ? 'ফেস আইডি ব্যর্থ হয়েছে। দয়া করে পিন ব্যবহার করুন।' : 'Face ID failed. Please use your PIN.');
       }`
);

fs.writeFileSync('src/components/SecurityLockModal.tsx', code);
