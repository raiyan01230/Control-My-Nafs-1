import React, { useState } from 'react';
import { IslamicReference, Language } from '../types';
import { SEED_ISLAMIC_REFERENCES } from '../data/islamicReferences';
import { BookOpen, Search, Filter, ShieldCheck, Copy, Check } from 'lucide-react';

interface IslamicReferenceCardProps {
  language: Language;
}

export const IslamicReferenceCard: React.FC<IslamicReferenceCardProps> = ({ language }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filtered = SEED_ISLAMIC_REFERENCES.filter((ref) => {
    const term = searchTerm.toLowerCase();
    return (
      ref.sourceEn.toLowerCase().includes(term) ||
      ref.sourceBn.toLowerCase().includes(term) ||
      ref.textEn.toLowerCase().includes(term) ||
      ref.textBn.toLowerCase().includes(term) ||
      ref.category.toLowerCase().includes(term)
    );
  });

  const handleCopy = (ref: IslamicReference) => {
    const textToCopy = `${ref.arabicText}\n\n${language === 'bn' ? ref.textBn : ref.textEn}\n— ${language === 'bn' ? ref.sourceBn : ref.sourceEn}`;
    navigator.clipboard.writeText(textToCopy);
    setCopiedId(ref.id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  return (
    <div className="bg-[#0b0f17]/90 border border-slate-800/80 backdrop-blur-md rounded-2xl p-5 shadow-2xl shadow-black/50 text-slate-100 space-y-5">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3.5 border-b border-slate-800/80">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 bg-[#081f18]/90 border border-emerald-500/30 rounded-2xl text-emerald-400 shadow-lg shadow-emerald-950/30">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-emerald-300 font-display">
              {language === 'bn' ? 'যাচাইকৃত ইসলামিক আয়াত ও হাদীস সূত্র' : 'Verified Quran & Hadith References'}
            </h2>
            <p className="text-xs text-slate-400 font-medium">
              {language === 'bn' ? 'নফস নিয়ন্ত্রণ ও আমল সম্পর্কিত বিশুদ্ধ রেফারেন্স' : 'Authentic references for controlling the Nafs and spiritual growth'}
            </p>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder={language === 'bn' ? 'সূরা, হাদীস বা বিষয়টি খুঁজুন...' : 'Search verse, hadith, or topic...'}
          className="w-full bg-[#0b0f17] border border-slate-700/80 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-100 focus:outline-none focus:border-emerald-500"
        />
      </div>

      {/* List */}
      <div className="space-y-4">
        {filtered.map((ref) => (
          <div key={ref.id} className="p-5 rounded-2xl bg-[#121824]/60 border border-slate-800/80 space-y-3.5 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-amber-300 font-display">
                {language === 'bn' ? ref.sourceBn : ref.sourceEn}
              </span>
              <div className="flex items-center space-x-2">
                <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-lg bg-[#081f18] text-emerald-300 border border-emerald-500/30 flex items-center space-x-1">
                  <ShieldCheck className="w-3 h-3 text-emerald-400" />
                  <span>Verified</span>
                </span>
                <button
                  onClick={() => handleCopy(ref)}
                  className="p-1.5 rounded-lg bg-[#0b0f17] hover:bg-[#162036] text-slate-200 border border-slate-800 transition"
                  title="Copy reference text"
                >
                  {copiedId === ref.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>

            {/* Arabic */}
            <p className="text-right text-lg font-arabic leading-loose text-amber-100/90 dir-rtl font-bold">
              {ref.arabicText}
            </p>

            {/* Translation */}
            <p className="text-xs text-slate-200 leading-relaxed font-serif italic border-l-2 border-emerald-500 pl-3.5">
              {language === 'bn' ? ref.textBn : ref.textEn}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
