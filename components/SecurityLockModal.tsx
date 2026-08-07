import React, { useState } from 'react';
import { Language } from '../types';
import { Shield, KeyRound, Lock, AlertCircle, ArrowRight, ScanFace } from 'lucide-react';

interface SecurityLockModalProps {
  language: Language;
  onUnlockSuccess: () => void;
}

export const SecurityLockModal: React.FC<SecurityLockModalProps> = ({
  language,
  onUnlockSuccess
}) => {
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleUnlock = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!pin) return;

    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth/verify-pin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pin })
      });

      if (res.ok) {
        onUnlockSuccess();
      } else {
        const data = await res.json();
        setError(data.error || (language === 'bn' ? 'ভুল পিন কোড!' : 'Incorrect PIN!'));
      }
    } catch (err) {
      setError(language === 'bn' ? 'সার্ভার সিঙ্ক ত্রুটি' : 'Server verification error');
    } finally {
      setLoading(false);
    }
  };

  const isIframe = window.self !== window.top;

  const handleFaceID = async () => {
    if (isIframe) {
      setError(language === 'bn' ? 'ফেস আইডি এখানে অনুমোদিত নয়। অনুগ্রহ করে অ্যাপটি নতুন ট্যাবে খুলুন।' : 'Face ID blocked in preview. Please open the app in a new tab to use Biometrics.');
      return;
    }
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
       if (err.name === 'NotAllowedError' || (err.message && err.message.includes('publickey-credentials'))) {
         setError(language === 'bn' ? 'ফেস আইডি এখানে অনুমোদিত নয়। অনুগ্রহ করে অ্যাপটি নতুন ট্যাবে খুলুন।' : 'Face ID blocked in preview. Please open the app in a new tab to use Biometrics.');
       } else {
         setError(language === 'bn' ? 'ফেস আইডি ব্যর্থ হয়েছে। দয়া করে পিন ব্যবহার করুন।' : 'Face ID failed. Please use your PIN.');
       }
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#06090f] flex items-center justify-center p-4">
      <div className="w-full max-w-md p-8 bg-[#0b0f17] border border-slate-800 rounded-3xl shadow-2xl space-y-6 text-slate-100 text-center relative overflow-hidden">
        {/* Glow effect */}
        <div className="absolute -top-32 -right-32 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl mix-blend-screen pointer-events-none"></div>
        <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl mix-blend-screen pointer-events-none"></div>

        <div className="flex justify-center relative z-10">
          <div className="p-4 bg-[#081f18] border border-emerald-500/30 rounded-2xl text-emerald-400 shadow-xl shadow-emerald-950/50">
            <Lock className="w-10 h-10" />
          </div>
        </div>
        <div className="space-y-2 relative z-10">
          <h2 className="text-xl font-bold font-display text-white tracking-wide">
            {language === 'bn' ? 'ব্যক্তিগত ওয়েবসাইট লক' : 'Personal Journal Security'}
          </h2>
          <p className="text-xs text-slate-400 font-medium max-w-xs mx-auto leading-relaxed">
            {language === 'bn'
              ? 'গোপনীয়তা রক্ষার্থে আপনার ৪-সংখ্যার পিন অথবা ফেস আইডি ব্যবহার করুন।'
              : 'Enter your PIN or use Face ID to access your private spiritual log.'}
          </p>
        </div>

        <form onSubmit={handleUnlock} className="space-y-4 relative z-10">
          <div>
            <input
              type="password"
              maxLength={10}
              autoFocus
              value={pin}
              onChange={(e) => {
                setPin(e.target.value);
                if (error) setError('');
              }}
              placeholder={language === 'bn' ? "৪-সংখ্যার পিন" : "4-digit PIN"}
              className="w-full text-center bg-[#080c14] border border-slate-700 rounded-2xl py-4 px-4 text-slate-100 font-mono tracking-[0.5em] text-xl focus:outline-none focus:border-emerald-500 transition-colors"
            />
          </div>
          
          {error && (
            <div className="p-3 rounded-xl bg-rose-950/80 border border-rose-500/40 text-rose-300 text-xs flex items-center justify-center space-x-2 animate-shake">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div className="flex items-center space-x-3 pt-2">
            <button
              type="button"
              onClick={handleFaceID}
              title={language === 'bn' ? "ফেস আইডি / বায়োমেট্রিক" : "Face ID / Biometrics"}
              className="h-14 w-14 flex-shrink-0 rounded-2xl bg-[#081f18] border border-emerald-500/30 hover:bg-[#0a2e23] hover:border-emerald-500/50 text-emerald-400 flex items-center justify-center shadow-lg transition-all"
            >
              <ScanFace className="w-6 h-6" />
            </button>

            <button
              type="submit"
              disabled={loading || !pin}
              className="h-14 flex-1 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-sm shadow-xl transition-all flex items-center justify-center space-x-2 disabled:opacity-50"
            >
              <KeyRound className="w-4 h-4" />
              <span>{loading ? (language === 'bn' ? 'যাচাই করা হচ্ছে...' : 'Verifying...') : (language === 'bn' ? 'লক আনলক করুন' : 'Unlock Dashboard')}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>

        <div className="pt-4 text-[11px] text-slate-500 relative z-10">
          Default PIN: <span className="font-mono text-emerald-400">1234</span>
        </div>
      </div>
    </div>
  );
};
