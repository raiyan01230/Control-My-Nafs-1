import React, { useState } from 'react';
import { DailyRecord, GoodDeedOption, Language } from '../types';
import { UI_TRANSLATIONS } from '../utils/translations';
import { SEED_GOOD_DEED_OPTIONS } from '../data/goodDeedsData';
import { MASTER_CATEGORIES } from '../data/categories';
import { HeartHandshake, Search, Filter, Plus, Award, Check } from 'lucide-react';

interface GoodDeedsSelectorProps {
  record: DailyRecord;
  language: Language;
  onRecordGoodDeed: (optionId: string, name?: string, category?: string) => void;
}

export const GoodDeedsSelector: React.FC<GoodDeedsSelectorProps> = ({ record, language, onRecordGoodDeed }) => {
  const t = UI_TRANSLATIONS[language];
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [customName, setCustomName] = useState('');
  const [customCategory, setCustomCategory] = useState('general');
  const [successMsg, setSuccessMsg] = useState('');

  const categories = [
    { id: 'all', labelEn: 'All Good Deed Categories (45+ Selectable)', labelBn: 'সকল ৪৫+ ক্যাটাগরি থেকে বাছুন' },
    ...MASTER_CATEGORIES.map((c) => ({ id: c.id, labelEn: c.en, labelBn: c.bn })),
  ];

  const filtered = SEED_GOOD_DEED_OPTIONS.filter((item) => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const term = searchTerm.toLowerCase();
    const matchesSearch =
      item.nameEn.toLowerCase().includes(term) ||
      item.nameBn.toLowerCase().includes(term) ||
      item.category.toLowerCase().includes(term);
    return matchesCategory && matchesSearch;
  });

  const handleSelect = (opt: GoodDeedOption) => {
    onRecordGoodDeed(opt.id, opt.nameEn, opt.category);
    setSuccessMsg(language === 'bn' ? `"${opt.nameBn}" যোগ করা হয়েছে (+৫ পয়েন্ট)।` : `"${opt.nameEn}" added (+5 Pts).`);
    setTimeout(() => setSuccessMsg(''), 3000);
  };

  const handleAddCustom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customName.trim()) return;
    onRecordGoodDeed('custom', customName, customCategory);
    setSuccessMsg(language === 'bn' ? `"${customName}" যোগ করা হয়েছে।` : `"${customName}" added.`);
    setTimeout(() => setSuccessMsg(''), 3000);
    setCustomName('');
  };

  return (
    <div className="bg-[#0b0f17]/90 border border-slate-800/80 backdrop-blur-md rounded-2xl p-5 shadow-2xl shadow-black/50 text-slate-100 space-y-5">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3.5 border-b border-slate-800/80">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 bg-[#081f18]/90 border border-emerald-500/30 rounded-2xl text-emerald-400 shadow-lg shadow-emerald-950/30">
            <HeartHandshake className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-emerald-300 font-display">{t.goodDeeds}</h2>
            <p className="text-xs text-slate-400 font-medium">
              {language === 'bn' ? '১০০+ নেক আমল এবং ভালো অভ্যাসের নির্বাচন তালিকা' : 'Browse 100+ positive deeds to build righteous habits'}
            </p>
          </div>
        </div>

        {successMsg && (
          <div className="bg-[#081f18] border border-emerald-500/40 text-emerald-200 text-xs px-3.5 py-1.5 rounded-2xl font-bold flex items-center space-x-1.5 shadow-md">
            <Check className="w-4 h-4 text-emerald-400" />
            <span>{successMsg}</span>
          </div>
        )}
      </div>

      {/* Filter Bar */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="md:col-span-2 relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={language === 'bn' ? 'নেক আমল খুঁজুন...' : 'Search 100+ good deeds...'}
            className="w-full bg-[#0b0f17] border border-slate-700/80 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-100 focus:outline-none focus:border-emerald-500"
          />
        </div>

        <div className="relative">
          <Filter className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full bg-[#0b0f17] border border-slate-700/80 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-100 focus:outline-none focus:border-emerald-500 appearance-none"
          >
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {language === 'bn' ? c.labelBn : c.labelEn}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* List */}
      <div className="max-h-72 overflow-y-auto pr-1 space-y-2.5 scrollbar-thin scrollbar-thumb-slate-800">
        {filtered.map((opt) => (
          <div
            key={opt.id}
            onClick={() => handleSelect(opt)}
            className="p-3.5 rounded-2xl bg-[#121824]/60 hover:bg-[#081f18]/40 border border-slate-800/80 hover:border-emerald-500/40 cursor-pointer transition-all flex items-center justify-between gap-3 text-xs"
          >
            <div>
              <div className="font-bold text-slate-100">
                {language === 'bn' ? opt.nameBn : opt.nameEn}
              </div>
              <div className="text-[11px] text-slate-400 mt-0.5 font-medium">
                {language === 'bn' ? opt.descriptionBn : opt.descriptionEn}
              </div>
            </div>

            <button className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white border border-emerald-400/30 text-[11px] font-bold hover:from-emerald-500 hover:to-teal-500 shrink-0 shadow-sm">
              + Add (+{opt.points} Pts)
            </button>
          </div>
        ))}
      </div>

      {/* Custom Input */}
      <form onSubmit={handleAddCustom} className="bg-[#121824]/60 border border-slate-800/80 rounded-2xl p-3.5 flex flex-col sm:flex-row gap-2">
        <input
          type="text"
          value={customName}
          onChange={(e) => setCustomName(e.target.value)}
          placeholder={language === 'bn' ? 'অন্য কোনো নেক কাজ...' : 'Any other custom good deed...'}
          className="flex-1 bg-[#0b0f17] border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-xs text-slate-100 focus:outline-none"
        />
        <select
          value={customCategory}
          onChange={(e) => setCustomCategory(e.target.value)}
          className="bg-[#0b0f17] border border-slate-700/80 rounded-xl px-3 py-2.5 text-xs text-slate-100 focus:outline-none"
        >
          {MASTER_CATEGORIES.map((c) => (
            <option key={c.id} value={c.id}>
              {language === 'bn' ? c.bn : c.en}
            </option>
          ))}
        </select>
        <button
          type="submit"
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs transition flex items-center justify-center space-x-1 shadow-md shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>{language === 'bn' ? 'যোগ করুন' : 'Add'}</span>
        </button>
      </form>
    </div>
  );
};
