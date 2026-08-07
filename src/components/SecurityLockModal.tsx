import React, { useState, useEffect } from 'react';
import { Language } from '../types';
import { Shield, KeyRound, Lock, AlertCircle, ArrowRight } from 'lucide-react';

interface SecurityLockModalProps {
  language: Language;
  onUnlockSuccess: () => void;
}

export const SecurityLockModal: React.FC<SecurityLockModalProps> = ({
  language,
  onUnlockSuccess
}) => {
  const [pin, setPin] = useState('');
  const [password, setPassword] = useState('');
  const [captchaAnswer, setCaptchaAnswer] = useState('');
  const [captchaMath, setCaptchaMath] = useState({ num1: 0, num2: 0 });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    generateCaptcha();
  }, []);

  const generateCaptcha = () => {
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    setCaptchaMath({ num1, num2 });
  };

  const handleUnlock = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!pin || !password || !captchaAnswer) return;

    if (parseInt(captchaAnswer) !== captchaMath.num1 + captchaMath.num2) {
      setError(language === 'bn' ? 'ক্যাপচা ভুল হয়েছে!' : 'Incorrect Captcha!');
      generateCaptcha();
      setCaptchaAnswer('');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth/verify-pin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pin, password })
      });

      if (res.ok) {
        onUnlockSuccess();
      } else {
        const data = await res.json();
        setError(data.error || (language === 'bn' ? 'ভুল ক্রেডেনশিয়াল!' : 'Incorrect credentials!'));
        generateCaptcha();
        setCaptchaAnswer('');
      }
    } catch (err) {
      setError(language === 'bn' ? 'সার্ভার সিঙ্ক ত্রুটি' : 'Server verification error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#06090f] flex items-center justify-center p-4">
      <div className="w-full max-w-md p-8 bg-[#0b0f17] border border-slate-800 rounded-3xl shadow-2xl space-y-6 text-slate-100 text-center">
        <div className="flex justify-center">
          <div className="p-4 bg-[#081f18] border border-emerald-500/30 rounded-2xl text-emerald-400 shadow-xl shadow-emerald-950/50">
            <Shield className="w-10 h-10" />
          </div>
        </div>
        <div className="space-y-2">
          <h2 className="text-xl font-bold font-display text-white tracking-wide">
            {language === 'bn' ? '৩-স্তরের ব্যক্তিগত ওয়েবসাইট লক' : '3-Layer Security Lock'}
          </h2>
          <p className="text-xs text-slate-400 font-medium max-w-xs mx-auto leading-relaxed">
            {language === 'bn'
              ? 'গোপনীয়তা রক্ষার্থে আপনার পিন, পাসওয়ার্ড এবং ক্যাপচা লিখুন।'
              : 'Enter your PIN, password, and solve the captcha to access your private vault.'}
          </p>
        </div>

        <form onSubmit={handleUnlock} className="space-y-4">
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
              className="w-full text-center bg-[#080c14] border border-slate-700 rounded-2xl py-3 px-4 text-slate-100 font-mono tracking-[0.5em] text-lg focus:outline-none focus:border-emerald-500"
            />
          </div>
          <div>
            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (error) setError('');
              }}
              placeholder={language === 'bn' ? "পাসওয়ার্ড" : "Password"}
              className="w-full text-center bg-[#080c14] border border-slate-700 rounded-2xl py-3 px-4 text-slate-100 font-mono text-lg focus:outline-none focus:border-emerald-500"
            />
          </div>
          <div className="flex items-center space-x-3">
             <div className="flex-1 bg-[#141d2b] border border-slate-700 rounded-2xl py-3 px-4 text-slate-300 font-bold text-lg select-none">
                {captchaMath.num1} + {captchaMath.num2} = ?
             </div>
             <input
              type="number"
              value={captchaAnswer}
              onChange={(e) => {
                setCaptchaAnswer(e.target.value);
                if (error) setError('');
              }}
              placeholder="Answer"
              className="flex-1 text-center bg-[#080c14] border border-slate-700 rounded-2xl py-3 px-4 text-slate-100 font-bold text-lg focus:outline-none focus:border-emerald-500"
            />
          </div>

          {error && (
            <div className="p-3 rounded-xl bg-rose-950/80 border border-rose-500/40 text-rose-300 text-xs flex items-center justify-center space-x-2 animate-shake">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={loading || !pin || !password || !captchaAnswer}
            className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-sm shadow-xl transition-all flex items-center justify-center space-x-2 disabled:opacity-50"
          >
            <KeyRound className="w-4 h-4" />
            <span>{loading ? (language === 'bn' ? 'যাচাই করা হচ্ছে...' : 'Verifying...') : (language === 'bn' ? 'লক আনলক করুন' : 'Unlock Dashboard')}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="pt-2 text-[11px] text-slate-500 flex flex-col space-y-1">
          <span>Default PIN: <span className="font-mono text-emerald-400">1234</span></span>
          <span>Default Password: <span className="font-mono text-emerald-400">admin123</span></span>
        </div>
      </div>
    </div>
  );
};
