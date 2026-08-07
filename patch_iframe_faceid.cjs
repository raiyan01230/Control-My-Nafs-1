const fs = require('fs');
let code = fs.readFileSync('src/components/SecurityLockModal.tsx', 'utf8');

code = code.replace(
  /const handleFaceID = async \(\) => \{/,
  `const isIframe = window.self !== window.top;

  const handleFaceID = async () => {
    if (isIframe) {
      setError(language === 'bn' ? 'ফেস আইডি এখানে অনুমোদিত নয়। অনুগ্রহ করে অ্যাপটি নতুন ট্যাবে খুলুন।' : 'Face ID blocked in preview. Please open the app in a new tab to use Biometrics.');
      return;
    }`
);

fs.writeFileSync('src/components/SecurityLockModal.tsx', code);
