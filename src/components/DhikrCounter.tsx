import React, { useState } from 'react';
import { Language } from '../types';
import { Fingerprint, RotateCcw, CheckCircle2, Heart } from 'lucide-react';

interface DhikrCounterProps {
  language: Language;
  onSaveDhikr: (name: string, count: number) => void;
}

export const DhikrCounter: React.FC<DhikrCounterProps> = ({ language, onSaveDhikr }) => {
  const [count, setCount] = useState(0);
  const [selectedDhikr, setSelectedDhikr] = useState(0);

  const dhikrOptions = [
    { en: 'SubhanAllah', bn: 'সুবহানাল্লাহ', arabic: 'سُبْحَانَ ٱللَّٰهِ' },
    { en: 'Alhamdulillah', bn: 'আলহামদুলিল্লাহ', arabic: 'ٱلْحَمْدُ لِلَّٰهِ' },
    { en: 'Allahu Akbar', bn: 'আল্লাহু আকবার', arabic: 'ٱللَّٰهُ أَكْبَرُ' },
    { en: 'Astaghfirullah', bn: 'আস্তাগফিরুল্লাহ', arabic: 'أَسْتَغْفِرُ اللّٰهَ' },
  ];

  const currentDhikr = dhikrOptions[selectedDhikr];

  const handleTap = () => {
    setCount(c => c + 1);
    // Optional: trigger device vibration if supported
    if (typeof window !== 'undefined' && window.navigator && window.navigator.vibrate) {
      window.navigator.vibrate(50);
    }
  };

  const handleReset = () => {
    setCount(0);
  };

  const handleSave = () => {
    if (count > 0) {
      onSaveDhikr(currentDhikr.en, count);
      setCount(0);
    }
  };

  return (
    <div className="bg-[#0b0f17] border border-slate-800 rounded-3xl p-6 shadow-xl relative overflow-hidden">
      <div className="flex items-center space-x-3 mb-6 relative z-10">
        <div className="p-2.5 bg-emerald-500/10 rounded-xl">
          <Heart className="w-5 h-5 text-emerald-400" />
        </div>
        <h3 className="text-lg font-bold text-white font-display">
          {language === 'bn' ? 'ডিজিটাল তাসবিহ' : 'Digital Tasbih'}
        </h3>
      </div>

      <div className="flex flex-col items-center relative z-10 space-y-6">
        
        {/* Dhikr Selector */}
        <div className="flex flex-wrap justify-center gap-2">
          {dhikrOptions.map((dhikr, idx) => (
            <button
              key={idx}
              onClick={() => {
                setSelectedDhikr(idx);
                setCount(0);
              }}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                selectedDhikr === idx 
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/50' 
                  : 'bg-slate-800/50 text-slate-400 border border-transparent hover:bg-slate-800'
              }`}
            >
              {language === 'bn' ? dhikr.bn : dhikr.en}
            </button>
          ))}
        </div>

        {/* Display Current Dhikr */}
        <div className="text-center space-y-2">
          <p className="text-2xl font-amiri text-emerald-300" dir="rtl">{currentDhikr.arabic}</p>
          <p className="text-sm text-slate-400">{language === 'bn' ? currentDhikr.bn : currentDhikr.en}</p>
        </div>

        {/* Tap Circle */}
        <button
          onClick={handleTap}
          className="relative w-40 h-40 rounded-full flex items-center justify-center group focus:outline-none"
        >
          {/* Outer glowing rings */}
          <div className="absolute inset-0 rounded-full border-4 border-emerald-500/20 group-active:border-emerald-500/40 transition-colors"></div>
          <div className="absolute inset-2 rounded-full border-2 border-emerald-500/30 group-active:scale-95 transition-transform duration-75"></div>
          
          {/* Main button area */}
          <div className="absolute inset-4 rounded-full bg-gradient-to-b from-emerald-900/40 to-[#081f18] flex flex-col items-center justify-center group-active:scale-95 transition-transform duration-75 shadow-[inset_0_4px_20px_rgba(16,185,129,0.1)]">
            <span className="text-5xl font-bold font-mono text-emerald-400">{count}</span>
            <Fingerprint className="w-5 h-5 text-emerald-500/50 mt-2" />
          </div>
        </button>

        {/* Actions */}
        <div className="flex items-center space-x-4 w-full px-4 pt-2">
          <button
            onClick={handleReset}
            disabled={count === 0}
            className="flex-1 py-3 rounded-2xl bg-slate-800 text-slate-300 font-medium text-sm flex items-center justify-center space-x-2 disabled:opacity-50 hover:bg-slate-700 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            <span>{language === 'bn' ? 'রিসেট' : 'Reset'}</span>
          </button>
          
          <button
            onClick={handleSave}
            disabled={count === 0}
            className="flex-1 py-3 rounded-2xl bg-emerald-600 text-white font-medium text-sm flex items-center justify-center space-x-2 disabled:opacity-50 hover:bg-emerald-500 transition-colors shadow-lg shadow-emerald-900/20"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>{language === 'bn' ? 'সংরক্ষণ' : 'Save'}</span>
          </button>
        </div>

      </div>
    </div>
  );
};
