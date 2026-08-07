import React, { useState } from 'react';
import { DailyRecord, Language } from '../types';
import { UI_TRANSLATIONS } from '../utils/translations';
import { MASTER_CATEGORIES } from '../data/categories';
import { ShieldCheck, Plus, Award, Flame, CheckCircle } from 'lucide-react';

interface NafsControlPanelProps {
  record: DailyRecord;
  language: Language;
  onRecordNafsVictory: (title: string, category: string, difficulty: number, notes?: string) => void;
}

export const NafsControlPanel: React.FC<NafsControlPanelProps> = ({ record, language, onRecordNafsVictory }) => {
  const t = UI_TRANSLATIONS[language];
  const victories = record.nafsVictories || [];

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Gaze');
  const [difficulty, setDifficulty] = useState(3);
  const [notes, setNotes] = useState('');

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    onRecordNafsVictory(title, category, difficulty, notes);
    setTitle('');
    setNotes('');
  };

  const presetExamples = [
    { en: 'Lowered gaze in public', bn: 'জনসমক্ষে দৃষ্টি সংবরণ করেছি' },
    { en: 'Controlled anger during conflict', bn: 'রাগের মাথায় চুপ থেকেছি' },
    { en: 'Stopped scrolling social media', bn: 'অনর্থক ফোন স্ক্রলিং বন্ধ করেছি' },
    { en: 'Resisted inappropriate website temptation', bn: 'বাজে ওয়েবসাইটে ঢোকার ওয়াজওয়াসা রুখে দিয়েছি' },
    { en: 'Avoided lying or gossip', bn: 'গীবত বা মিথ্যা কথা বলা থেকে বিরত থেকেছি' },
  ];

  return (
    <div className="bg-[#0b0f17]/90 border border-slate-800/80 backdrop-blur-md rounded-2xl p-5 shadow-2xl shadow-black/50 text-slate-100 space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between pb-3.5 border-b border-slate-800/80">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 bg-[#081f1c]/90 border border-teal-500/30 rounded-2xl text-teal-400 shadow-lg shadow-teal-950/30">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-teal-300 font-display">{t.nafsControl}</h2>
            <p className="text-xs text-slate-400 font-medium">
              {language === 'bn' ? 'প্রলোভন প্রতিরোধ ও আত্ম-সংযমের ব্যক্তিগত রেকর্ড' : 'Log your moments of resisting temptation and gaining self-mastery'}
            </p>
          </div>
        </div>

        <div className="px-3.5 py-1.5 rounded-2xl bg-[#081f1c]/80 border border-teal-500/30 text-xs font-bold text-teal-300 shadow-inner">
          {victories.length} {language === 'bn' ? 'টি জয় আজ' : 'Victories Today'}
        </div>
      </div>

      {/* Quick Presets */}
      <div>
        <label className="block text-xs font-semibold text-slate-400 mb-2">
          {language === 'bn' ? 'দ্রুত বাছাই করুন:' : 'Quick Select Preset:'}
        </label>
        <div className="flex flex-wrap gap-1.5">
          {presetExamples.map((p, idx) => (
            <button
              key={idx}
              onClick={() => setTitle(language === 'bn' ? p.bn : p.en)}
              className="px-3 py-1.5 rounded-xl bg-[#121824] hover:bg-[#081f1c] border border-slate-800/80 hover:border-teal-500/40 text-xs text-slate-200 transition-all"
            >
              + {language === 'bn' ? p.bn : p.en}
            </button>
          ))}
        </div>
      </div>

      {/* Add Victory Form */}
      <form onSubmit={handleAdd} className="bg-[#121824]/60 border border-slate-800/80 rounded-2xl p-4 space-y-3">
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">
            {language === 'bn' ? 'কীভাবে প্রলোভন প্রতিরোধ করেছেন?' : 'What temptation or impulse did you control?'}
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder={language === 'bn' ? 'যেমন: খারাপ চিন্তা আসামাত্র আউযুবিল্লাহ পড়ে অন্য কাজে লেগেছি...' : 'e.g., Lowered gaze, stopped bad thought immediately...'}
            className="w-full bg-[#0b0f17] border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-xs text-slate-100 focus:outline-none focus:border-teal-500"
            required
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              {language === 'bn' ? 'ক্যাটাগরি:' : 'Category:'}
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full bg-[#0b0f17] border border-slate-700/80 rounded-xl px-3 py-2.5 text-xs text-slate-100 focus:outline-none"
            >
              {MASTER_CATEGORIES.map((c) => (
                <option key={c.id} value={c.en}>
                  {language === 'bn' ? `${c.bn} (${c.en})` : c.en}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              {language === 'bn' ? 'কঠিনতার মাত্রা (১-৫):' : 'Difficulty Rating (1-5):'}
            </label>
            <div className="flex space-x-1.5">
              {[1, 2, 3, 4, 5].map((lvl) => (
                <button
                  type="button"
                  key={lvl}
                  onClick={() => setDifficulty(lvl)}
                  className={`flex-1 py-2 rounded-xl border text-xs font-bold transition-all ${
                    difficulty === lvl
                      ? 'bg-gradient-to-r from-teal-600 to-emerald-600 border-teal-400/50 text-white shadow-md'
                      : 'bg-[#0b0f17] border-slate-800 text-slate-400 hover:bg-[#162036]'
                  }`}
                >
                  {lvl}
                </button>
              ))}
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-3 rounded-xl bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-500 hover:to-emerald-500 text-white font-bold text-xs shadow-lg transition flex items-center justify-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>{language === 'bn' ? 'নফস জয় রেকর্ড করুন' : 'Record Nafs Victory'}</span>
        </button>
      </form>

      {/* History List */}
      <div className="space-y-2">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
          {language === 'bn' ? 'আজকের অর্জিত জয়সমূহ:' : 'Today\'s Victories:'}
        </h3>
        {victories.length === 0 ? (
          <p className="text-xs text-slate-500 italic p-3 bg-[#121824]/40 rounded-2xl border border-slate-800/80">
            {language === 'bn' ? 'আজ এখনও কোনো নফস জয় সেভ করা হয়নি।' : 'No Nafs victories logged yet today.'}
          </p>
        ) : (
          victories.map((v) => (
            <div key={v.id} className="p-3.5 rounded-2xl bg-[#081f1c]/40 border border-teal-500/30 flex items-center justify-between text-xs shadow-sm">
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-4 h-4 text-teal-400 shrink-0" />
                <div>
                  <div className="font-bold text-teal-200">{v.title}</div>
                  <div className="text-[11px] text-slate-400 font-medium">{v.category} • Difficulty: {v.difficulty}/5</div>
                </div>
              </div>
              <span className="text-[10px] font-bold px-2.5 py-1 rounded-lg bg-teal-900/80 text-teal-200 border border-teal-500/30">
                +8 Pts
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
