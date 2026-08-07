import React, { useState } from 'react';
import { Lock, AlertCircle } from 'lucide-react';

interface InitialGateProps {
  onUnlock: () => void;
}

export const InitialGate: React.FC<InitialGateProps> = ({ onUnlock }) => {
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showBismillah, setShowBismillah] = useState(false);

  const handleUnlock = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/auth/verify-master', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
      });
      if (res.ok) {
        setShowBismillah(true);
        setTimeout(() => {
          onUnlock();
        }, 3000);
      } else {
        setError('Incorrect password');
        setLoading(false);
      }
    } catch (err) {
      setError('Server error');
      setLoading(false);
    }
  };

  if (showBismillah) {
    return (
      <div className="fixed inset-0 z-[9999] bg-[#06090f] flex flex-col items-center justify-center p-4">
         <h1 className="text-3xl md:text-5xl text-emerald-400 font-bold mb-6 animate-pulse text-center leading-relaxed font-serif" style={{ direction: 'rtl' }}>
           بِسْمِ ٱللَّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
         </h1>
         <p className="text-emerald-100/70 text-lg md:text-xl font-display tracking-widest animate-pulse text-center">
           Bismillah hir rhamanir rahim
         </p>
         <div className="mt-12 flex space-x-3">
           <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-bounce"></div>
           <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
           <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
         </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[9999] bg-[#06090f] flex items-center justify-center p-4">
      <div className="w-full max-w-sm p-8 bg-[#0b0f17] border border-slate-800 rounded-3xl shadow-2xl space-y-6 text-slate-100 text-center">
        <div className="flex justify-center">
          <div className="p-4 bg-[#081f18] border border-emerald-500/30 rounded-2xl text-emerald-400 shadow-xl shadow-emerald-950/50">
            <Lock className="w-10 h-10" />
          </div>
        </div>
        <h2 className="text-xl font-bold font-display text-white tracking-wide">
          Private Access
        </h2>
        <form onSubmit={handleUnlock} className="space-y-4">
          <div>
            <input
              type="password"
              autoFocus
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (error) setError('');
              }}
              placeholder="Enter Passcode"
              className="w-full text-center bg-[#080c14] border border-slate-700 rounded-2xl py-3.5 px-4 text-slate-100 font-mono tracking-[0.2em] text-lg focus:outline-none focus:border-emerald-500"
            />
          </div>
          {error && (
            <div className="p-3 rounded-xl bg-rose-950/80 border border-rose-500/40 text-rose-300 text-xs flex items-center justify-center space-x-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}
          <button
            type="submit"
            disabled={loading || !password}
            className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-sm shadow-xl transition-all disabled:opacity-50"
          >
            {loading ? 'Verifying...' : 'Enter'}
          </button>
        </form>
      </div>
    </div>
  );
};
