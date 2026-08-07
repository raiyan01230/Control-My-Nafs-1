import React, { useState } from 'react';
import { BadDeedOption, DailyRecord, Language } from '../types';
import { UI_TRANSLATIONS } from '../utils/translations';
import { SEED_BAD_DEED_OPTIONS } from '../data/badDeedsData';
import { MASTER_CATEGORIES } from '../data/categories';
import { AlertTriangle, Search, Filter, Plus, Check, X, Hash, Zap } from 'lucide-react';

interface BadDeedsSelectorProps {
  record: DailyRecord;
  language: Language;
  onRecordBadDeed: (
    optionId: string,
    customName?: string,
    category?: string,
    severity?: number,
    classification?: any,
    notes?: string,
    quantity?: number,
    countable?: boolean,
    trigger?: string
  ) => void;
}

export const BadDeedsSelector: React.FC<BadDeedsSelectorProps> = ({ record, language, onRecordBadDeed }) => {
  const t = UI_TRANSLATIONS[language];
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [customName, setCustomName] = useState('');
  const [customCategory, setCustomCategory] = useState('general');
  const [customSeverity, setCustomSeverity] = useState<number>(2);
  const [customCountable, setCustomCountable] = useState<boolean>(true);
  const [successMsg, setSuccessMsg] = useState('');

  // Quantity modal state
  const [selectedOptionForQuantity, setSelectedOptionForQuantity] = useState<{
    opt?: BadDeedOption;
    isCustom?: boolean;
    name?: string;
    category?: string;
    severity?: number;
  } | null>(null);

  const [quantity, setQuantity] = useState<number>(1);
  const [trigger, setTrigger] = useState<string>('');
  const [notes, setNotes] = useState<string>('');

  // Categories list with 45+ selectable categories
  const categories = [
    { id: 'all', labelEn: 'All Categories (45+ Selectable)', labelBn: 'সকল ৪৫+ ক্যাটাগরি থেকে বাছুন' },
    ...MASTER_CATEGORIES.map((c) => ({ id: c.id, labelEn: c.en, labelBn: c.bn })),
  ];

  const COMMON_TRIGGERS = [
    { id: 'social_media', en: 'Social Media / Phone', bn: 'সোশ্যাল মিডিয়া / ফোন ব্যবহার' },
    { id: 'idle_time', en: 'Idle Time / Alone', bn: 'একাকী ও অনর্থক সময়' },
    { id: 'late_night', en: 'Late Night Awake', bn: 'দেরি করে রাতে জেগে থাকা' },
    { id: 'anger_impulse', en: 'Anger / Frustration', bn: 'রাগ ও ক্ষোভের মুহূর্ত' },
    { id: 'peer_company', en: 'Bad Company / Gossip', bn: 'অনর্থক আড্ডা ও মেলামেশা' },
    { id: 'fatigue', en: 'Tiredness / Laziness', bn: 'ক্লান্তি ও অলসতা' }
  ];

  // Filter logic
  const filteredOptions = SEED_BAD_DEED_OPTIONS.filter((item) => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const term = searchTerm.toLowerCase();
    const matchesSearch =
      item.nameEn.toLowerCase().includes(term) ||
      item.nameBn.toLowerCase().includes(term) ||
      item.category.toLowerCase().includes(term);
    return matchesCategory && matchesSearch;
  });

  const handleOpenQuantityModal = (opt: BadDeedOption) => {
    setQuantity(1);
    setTrigger('');
    setNotes('');
    setSelectedOptionForQuantity({ opt, isCustom: false });
  };

  const handleOpenCustomQuantityModal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customName.trim()) return;
    setQuantity(1);
    setTrigger('');
    setNotes('');
    setSelectedOptionForQuantity({
      isCustom: true,
      name: customName,
      category: customCategory,
      severity: customSeverity
    });
  };

  const handleConfirmRecord = () => {
    if (!selectedOptionForQuantity) return;

    if (selectedOptionForQuantity.isCustom) {
      onRecordBadDeed(
        'custom',
        selectedOptionForQuantity.name,
        selectedOptionForQuantity.category,
        selectedOptionForQuantity.severity,
        'bad_habit',
        notes,
        customCountable ? quantity : 1,
        customCountable,
        trigger
      );
      setSuccessMsg(
        language === 'bn'
          ? `"${selectedOptionForQuantity.name}" (${quantity} বার) রেকর্ড করা হয়েছে।`
          : `"${selectedOptionForQuantity.name}" (${quantity} time${quantity > 1 ? 's' : ''}) recorded.`
      );
      setCustomName('');
    } else if (selectedOptionForQuantity.opt) {
      const opt = selectedOptionForQuantity.opt;
      const isCountable = opt.countable !== false;
      onRecordBadDeed(
        opt.id,
        opt.nameEn,
        opt.category,
        opt.severity,
        opt.classification,
        notes,
        isCountable ? quantity : 1,
        isCountable,
        trigger
      );
      setSuccessMsg(
        language === 'bn'
          ? `"${opt.nameBn}" (${quantity} বার) রেকর্ড করা হয়েছে এবং তওবা যোগ করা হয়েছে।`
          : `"${opt.nameEn}" (${quantity} time${quantity > 1 ? 's' : ''}) recorded & Tawbah plan created.`
      );
    }

    setTimeout(() => setSuccessMsg(''), 4000);
    setSelectedOptionForQuantity(null);
  };

  return (
    <div className="bg-[#0b0f17]/90 border border-slate-800/80 backdrop-blur-md rounded-2xl p-5 shadow-2xl shadow-black/50 text-slate-100 space-y-5">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3.5 border-b border-slate-800/80">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 bg-[#240c14]/90 border border-rose-500/30 rounded-2xl text-rose-400 shadow-lg shadow-rose-950/30">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-rose-300 font-display">{t.badDeeds}</h2>
            <p className="text-xs text-slate-400 font-medium">
              {language === 'bn'
                ? '২০০+ বিস্তারিত অনাকাঙ্ক্ষিত ঘটনা। ঘটনার সঠিক সংখ্যা ও ট্রিগার নির্বাচন করুন।'
                : '200+ detailed slip-ups. Select incident count and trigger for accurate tracking.'}
            </p>
          </div>
        </div>

        {successMsg && (
          <div className="bg-[#240c14] border border-rose-500/40 text-rose-200 text-xs px-3.5 py-1.5 rounded-2xl font-bold flex items-center space-x-1.5 shadow-md">
            <Check className="w-4 h-4 text-emerald-400" />
            <span>{successMsg}</span>
          </div>
        )}
      </div>

      {/* Search and Category Filter Bar */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {/* Search */}
        <div className="md:col-span-2 relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={t.searchPlaceholder}
            className="w-full bg-[#0b0f17] border border-slate-700/80 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-100 focus:outline-none focus:border-rose-500"
          />
        </div>

        {/* Category Filter */}
        <div className="relative">
          <Filter className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full bg-[#0b0f17] border border-slate-700/80 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-100 focus:outline-none focus:border-rose-500 appearance-none"
          >
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {language === 'bn' ? c.labelBn : c.labelEn}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Grid of Bad Deed Options */}
      <div className="max-h-72 overflow-y-auto pr-1 space-y-2.5 scrollbar-thin scrollbar-thumb-slate-800">
        {filteredOptions.length === 0 ? (
          <p className="text-xs text-slate-500 italic text-center py-6">
            {language === 'bn' ? 'কোনো বিষয় পাওয়া যায়নি।' : 'No matching items found. Try custom input below.'}
          </p>
        ) : (
          filteredOptions.map((opt) => {
            let severityBadge = 'bg-amber-950/80 text-amber-300 border-amber-500/30';
            if (opt.severity === 3) severityBadge = 'bg-orange-950/80 text-orange-300 border-orange-500/30';
            if (opt.severity === 4) severityBadge = 'bg-rose-950/80 text-rose-300 border-rose-500/30';

            return (
              <div
                key={opt.id}
                onClick={() => handleOpenQuantityModal(opt)}
                className="p-3.5 rounded-2xl bg-[#121824]/60 hover:bg-[#240c14]/40 border border-slate-800/80 hover:border-rose-500/40 cursor-pointer transition-all flex items-center justify-between gap-3 text-xs"
              >
                <div>
                  <div className="font-bold text-slate-100 flex items-center space-x-2">
                    <span>{language === 'bn' ? opt.nameBn : opt.nameEn}</span>
                    {opt.countable !== false && (
                      <span className="text-[10px] text-amber-400 bg-amber-950/60 px-1.5 py-0.5 rounded border border-amber-500/20">
                        {language === 'bn' ? 'গণনাযোগ্য' : 'Countable'}
                      </span>
                    )}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5 font-medium">
                    {language === 'bn' ? opt.descriptionBn : opt.descriptionEn}
                  </div>
                </div>

                <div className="flex items-center space-x-2 shrink-0">
                  <span className={`text-[10px] font-bold px-2.5 py-1 rounded-lg border ${severityBadge}`}>
                    Lev {opt.severity}
                  </span>
                  <button className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-rose-700 to-red-700 text-white border border-rose-400/30 text-[11px] font-bold hover:from-rose-600 hover:to-red-600 shadow-sm">
                    + Select
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Custom Slip-up Creator */}
      <form onSubmit={handleOpenCustomQuantityModal} className="bg-[#121824]/60 border border-slate-800/80 rounded-2xl p-4 space-y-3">
        <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
          {language === 'bn' ? 'কাস্টম ঘটনা যোগ করুন:' : 'Add Custom Slip-up:'}
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <input
            type="text"
            value={customName}
            onChange={(e) => setCustomName(e.target.value)}
            placeholder={language === 'bn' ? 'ঘটনার সংক্ষিপ্ত শিরোনাম (যেমন: মিথ্যা বলা)...' : 'Brief description (e.g. Lying)...'}
            className="sm:col-span-2 bg-[#0b0f17] border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-xs text-slate-100 focus:outline-none"
            required
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
        </div>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center space-x-2">
            <label className="text-xs font-medium text-slate-400">
              {language === 'bn' ? 'গাম্ভীর্য মাত্রা (১-৪):' : 'Severity Level (1-4):'}
            </label>
            <div className="flex space-x-1">
              {[1, 2, 3, 4].map((s) => (
                <button
                  type="button"
                  key={s}
                  onClick={() => setCustomSeverity(s)}
                  className={`px-2.5 py-1 rounded-lg border text-[11px] font-bold transition-all ${
                    customSeverity === s ? 'bg-rose-600 border-rose-400 text-white' : 'bg-[#0b0f17] border-slate-800 text-slate-400'
                  }`}
                >
                  L{s}
                </button>
              ))}
            </div>
          </div>

          <label className="flex items-center space-x-2 text-xs text-slate-300 cursor-pointer">
            <input
              type="checkbox"
              checked={customCountable}
              onChange={(e) => setCustomCountable(e.target.checked)}
              className="accent-rose-500 rounded"
            />
            <span>{language === 'bn' ? 'গণনাযোগ্য ঘটনা (কতবার ঘটেছে?)' : 'Countable (Multiple incidents)'}</span>
          </label>
        </div>
        <button
          type="submit"
          className="w-full py-2.5 rounded-xl bg-gradient-to-r from-rose-700 to-red-700 hover:from-rose-600 hover:to-red-600 text-white font-bold text-xs shadow-lg transition flex items-center justify-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>{language === 'bn' ? 'কাস্টম ঘটনা নির্বাচন করুন' : 'Select Custom Slip-up'}</span>
        </button>
      </form>

      {/* Smart Quantity Modal Prompt */}
      {selectedOptionForQuantity && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0e1626] border border-rose-500/40 rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-5 animate-in fade-in zoom-in-95">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold text-rose-400 tracking-wider">
                  {language === 'bn' ? 'অনাকাঙ্ক্ষিত ঘটনার গণনা' : 'Incident Quantity Prompt'}
                </span>
                <h3 className="text-lg font-bold text-white mt-1">
                  {selectedOptionForQuantity.isCustom
                    ? selectedOptionForQuantity.name
                    : language === 'bn'
                    ? selectedOptionForQuantity.opt?.nameBn
                    : selectedOptionForQuantity.opt?.nameEn}
                </h3>
              </div>
              <button
                onClick={() => setSelectedOptionForQuantity(null)}
                className="p-1 rounded-full text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* How many times? Question */}
            <div className="space-y-3 bg-[#080c14] p-4 rounded-2xl border border-slate-800">
              <label className="text-sm font-bold text-slate-200 flex items-center space-x-2">
                <Hash className="w-4 h-4 text-rose-400" />
                <span>{language === 'bn' ? 'আজ এটি কতবার ঘটেছে?' : 'How many times did this happen today?'}</span>
              </label>

              {/* Number Stepper */}
              <div className="flex items-center space-x-3">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="w-10 h-10 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-lg flex items-center justify-center border border-slate-700"
                >
                  -
                </button>
                <input
                  type="number"
                  min="1"
                  max="100"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value, 10) || 1))}
                  className="flex-1 bg-[#121824] border border-rose-500/30 rounded-xl text-center py-2 text-lg font-bold text-rose-300 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => setQuantity((q) => q + 1)}
                  className="w-10 h-10 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-lg flex items-center justify-center border border-slate-700"
                >
                  +
                </button>
              </div>

              {/* Quick Select Buttons */}
              <div className="flex space-x-2 pt-1">
                {[1, 2, 3, 5, 10].map((num) => (
                  <button
                    key={num}
                    type="button"
                    onClick={() => setQuantity(num)}
                    className={`flex-1 py-1.5 rounded-lg text-xs font-bold border transition ${
                      quantity === num
                        ? 'bg-rose-950 text-rose-300 border-rose-500'
                        : 'bg-[#121824] text-slate-400 border-slate-800 hover:bg-slate-800'
                    }`}
                  >
                    {num} {language === 'bn' ? 'বার' : 'x'}
                  </button>
                ))}
              </div>
            </div>

            {/* Trigger Selector */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-300 flex items-center space-x-1.5">
                <Zap className="w-3.5 h-3.5 text-amber-400" />
                <span>{language === 'bn' ? 'প্রধান কারণ বা ট্রিগার নির্বাচন করুন:' : 'Select Primary Trigger:'}</span>
              </label>
              <select
                value={trigger}
                onChange={(e) => setTrigger(e.target.value)}
                className="w-full bg-[#080c14] border border-slate-700/80 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none"
              >
                <option value="">{language === 'bn' ? '-- ট্রিগার বা কারণ বাছুন --' : '-- Select trigger context --'}</option>
                {COMMON_TRIGGERS.map((t) => (
                  <option key={t.id} value={t.id}>
                    {language === 'bn' ? t.bn : t.en}
                  </option>
                ))}
              </select>
            </div>

            {/* Optional Notes */}
            <div className="space-y-1">
              <label className="text-xs font-medium text-slate-400">
                {language === 'bn' ? 'অতিরিক্ত মন্তব্য বা নোট (ঐচ্ছিক):' : 'Additional context / notes (optional):'}
              </label>
              <input
                type="text"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder={language === 'bn' ? 'কখন বা কিভাবে ঘটল...' : 'When or how it happened...'}
                className="w-full bg-[#080c14] border border-slate-700/80 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex items-center space-x-3 pt-2">
              <button
                type="button"
                onClick={() => setSelectedOptionForQuantity(null)}
                className="flex-1 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition"
              >
                {language === 'bn' ? 'বাতিল' : 'Cancel'}
              </button>
              <button
                type="button"
                onClick={handleConfirmRecord}
                className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-rose-700 to-red-700 hover:from-rose-600 hover:to-red-600 text-white text-xs font-bold shadow-lg transition flex items-center justify-center space-x-1.5"
              >
                <Check className="w-4 h-4" />
                <span>{language === 'bn' ? 'কনফার্ম করুন' : 'Confirm & Save'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
