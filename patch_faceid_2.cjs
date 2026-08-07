const fs = require('fs');
let code = fs.readFileSync('src/components/SecurityLockModal.tsx', 'utf8');

code = code.replace(
  /if \(err\.name === 'NotAllowedError'\) \{[\s\S]*?\} else \{[\s\S]*?\}/,
  `if (err.name === 'NotAllowedError') {
         setError(language === 'bn' ? 'ফেস আইডি বাতিল করা হয়েছে। প্রিভিউতে কাজ না করলে নতুন ট্যাবে খুলুন।' : 'Face ID cancelled or blocked. If in preview, try opening in a new tab.');
       } else {
         setError(language === 'bn' ? 'ফেস আইডি ব্যর্থ হয়েছে। দয়া করে পিন ব্যবহার করুন।' : 'Face ID failed. Please use your PIN.');
       }`
);

fs.writeFileSync('src/components/SecurityLockModal.tsx', code);
