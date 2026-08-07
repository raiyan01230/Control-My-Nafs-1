import React, { useState } from 'react';
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
        setError(data.error || (language === 'bn' ? 'ভুল পিন কোড!' : 'Incorrect Security PIN!'));
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
            <Lock className="w-10 h-10" />
          </div>
        </div>

        <div className="space-y-2">
          <h2 className="text-xl font-bold font-display text-white tracking-wide">
            {language === 'bn' ? 'ব্যক্তিগত ওয়েবসাইট লক' : 'Personal Journal Security Lock'}
          </h2>
          <p className="text-xs text-slate-400 font-medium max-w-xs mx-auto leading-relaxed">
            {language === 'bn'
              ? 'গোপনীয়তা রক্ষার্থে আপনার ৪-সংখ্যার নিরাপত্তা পিন কোডটি লিখুন।'
              : 'Enter your 4-digit Security PIN code to access your private spiritual log.'}
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
              placeholder="••••"
              className="w-full text-center bg-[#080c14] border border-slate-700 rounded-2xl py-3.5 px-4 text-slate-100 font-mono font-bold tracking-[0.5em] text-2xl focus:outline-none focus:border-emerald-500"
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
            disabled={loading || !pin}
            className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-sm shadow-xl transition-all flex items-center justify-center space-x-2 disabled:opacity-50"
          >
            <KeyRound className="w-4 h-4" />
            <span>{loading ? (language === 'bn' ? 'যাচাই করা হচ্ছে...' : 'Verifying...') : (language === 'bn' ? 'লক আনলক করুন' : 'Unlock Dashboard')}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="pt-2 text-[11px] text-slate-500">
          Default initial PIN code: <span className="font-mono text-emerald-400">1234</span>
        </div>
      </div>
    </div>
  );
};
