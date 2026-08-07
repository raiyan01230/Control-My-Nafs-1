const fs = require('fs');
let code = fs.readFileSync('src/components/SecurityLockModal.tsx', 'utf8');

code = code.replace(
  /const handleFaceID = async \(\) => \{[\s\S]*?onUnlockSuccess\(\);\n    \} catch \(err\) \{[\s\S]*?\}\n  \};/,
  `const handleFaceID = async () => {
    try {
      if (!window.PublicKeyCredential) {
         setError(language === 'bn' ? 'আপনার ডিভাইসে ফেস আইডি/বায়োমেট্রিক সাপোর্ট নেই।' : 'Face ID / Biometrics not supported on this device.');
         return;
      }
      
      const isAvailable = await window.PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable();
      if (!isAvailable) {
         setError(language === 'bn' ? 'বায়োমেট্রিক অথেন্টিকেটর পাওয়া যায়নি। পিন ব্যবহার করুন।' : 'Biometric authenticator not found. Please use PIN.');
         return;
      }
      
      const challenge = new Uint8Array(32);
      window.crypto.getRandomValues(challenge);
      
      await navigator.credentials.create({
         publicKey: {
           challenge,
           rp: { name: "Nafs Tracker Secure Vault" },
           user: {
             id: window.crypto.getRandomValues(new Uint8Array(16)),
             name: "user",
             displayName: "User"
           },
           pubKeyCredParams: [{ type: "public-key", alg: -7 }, { type: "public-key", alg: -257 }],
           authenticatorSelection: { 
             authenticatorAttachment: "platform",
             userVerification: "required" 
           },
           timeout: 60000,
         }
      });
      
      onUnlockSuccess();
    } catch (err: any) {
       console.error(err);
       if (err.name === 'NotAllowedError') {
         setError(language === 'bn' ? 'ফেস আইডি বাতিল করা হয়েছে বা অনুমতি নেই।' : 'Face ID cancelled or permission denied.');
       } else {
         setError(language === 'bn' ? 'ফেস আইডি ব্যর্থ হয়েছে। দয়া করে পিন ব্যবহার করুন।' : 'Face ID failed. Please use your PIN.');
       }
    }
  };`
);

fs.writeFileSync('src/components/SecurityLockModal.tsx', code);
