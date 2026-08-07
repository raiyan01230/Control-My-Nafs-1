import React, { useState } from 'react';
import { DailyRecord, Language } from '../types';
import { UI_TRANSLATIONS } from '../utils/translations';
import { MoonStar, CheckCircle2, Target, Calendar, Sparkles } from 'lucide-react';

interface TahajjudTrackerProps {
  record: DailyRecord;
  language: Language;
  onRecordTahajjud: (completed: boolean, rakahs: number, notes?: string) => void;
}

export const TahajjudTracker: React.FC<TahajjudTrackerProps> = ({ record, language, onRecordTahajjud }) => {
  const t = UI_TRANSLATIONS[language];
  const isDone = record.tahajjud?.completed;
  const [rakahs, setRakahs] = useState<number>(record.tahajjud?.rakahs || 2);
  const [notes, setNotes] = useState<string>(record.tahajjud?.notes || '');

  return (
    <div className="bg-[#0b0f17]/90 border border-slate-800/80 backdrop-blur-md rounded-2xl p-5 shadow-2xl shadow-black/50 text-slate-100 space-y-5">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3.5 border-b border-slate-800/80">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 bg-[#14122d]/90 border border-indigo-500/30 rounded-2xl text-indigo-400 shadow-lg shadow-indigo-950/30">
            <MoonStar className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-indigo-300 font-display">{t.tahajjud}</h2>
            <p className="text-xs text-slate-400 font-medium">
              {language === 'bn' ? 'সাপ্তাহিক লক্ষ্য: সপ্তাহে অন্তত ১ বার তাহাজ্জুদ আদায়' : 'Weekly Target: At least 1 Tahajjud per week'}
            </p>
          </div>
        </div>

        {/* Weekly Target Badge */}
        <div className="flex items-center space-x-2 bg-[#14122d]/80 border border-indigo-500/30 px-3.5 py-1.5 rounded-2xl shadow-inner">
          <Target className="w-4 h-4 text-indigo-400" />
          <span className="text-xs font-bold text-indigo-200">
            {language === 'bn' ? 'সাপ্তাহিক লক্ষ্য: ১/১ অর্জিত ✓' : 'Weekly Goal: 1/1 Met ✓'}
          </span>
        </div>
      </div>

      {/* Main Form Box */}
      <div className="bg-[#121824]/60 border border-slate-800/80 rounded-2xl p-5 space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-bold text-slate-200">
            {language === 'bn' ? 'আজ রাতের তাহাজ্জুদ স্ট্যাটাস' : 'Tahajjud Status Today'}
          </span>
          <span
            className={`px-3 py-1 rounded-full text-xs font-bold ${
              isDone ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/30' : 'bg-[#0b0f17] text-slate-400 border border-slate-800'
            }`}
          >
            {isDone ? (language === 'bn' ? 'আদায় সম্পন্ন ✓' : 'Completed ✓') : (language === 'bn' ? 'আজ পড়া হয়নি' : 'Not Prayed')}
          </span>
        </div>

        {/* Rakah Selection */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-2">
            {language === 'bn' ? 'রাকাত সংখ্যা নির্বাচন করুন:' : 'Select Rakah Count:'}
          </label>
          <div className="grid grid-cols-4 gap-2">
            {[2, 4, 8, 12].map((num) => (
              <button
                key={num}
                onClick={() => setRakahs(num)}
                className={`py-2.5 rounded-xl border text-xs font-bold transition-all ${
                  rakahs === num
                    ? 'bg-gradient-to-r from-indigo-600 to-purple-600 border-indigo-400/50 text-white shadow-md'
                    : 'bg-[#0b0f17] border-slate-800 text-slate-300 hover:bg-[#162036]'
                }`}
              >
                {num} {language === 'bn' ? 'রাকাত' : 'Rakahs'}
              </button>
            ))}
          </div>
        </div>

        {/* Notes */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">
            {language === 'bn' ? 'বিশেষ দোয়া বা নোট (ঐচ্ছিক):' : 'Optional Notes / Specific Dua:'}
          </label>
          <input
            type="text"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder={language === 'bn' ? 'যেমন: ক্ষমা প্রার্থনা ও পরিবার সুরক্ষার দোয়া করেছি...' : 'e.g., Prayed for guidance and repentance...'}
            className="w-full bg-[#0b0f17] border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-xs text-slate-100 focus:outline-none focus:border-indigo-500"
          />
        </div>

        {/* Action Toggle */}
        <div className="flex space-x-2 pt-2">
          <button
            onClick={() => onRecordTahajjud(true, rakahs, notes)}
            className="flex-1 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-xs shadow-lg transition flex items-center justify-center space-x-2"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>{language === 'bn' ? 'তাহাজ্জুদ সম্পন্ন হিসেবে সেভ করুন' : 'Save Tahajjud Record'}</span>
          </button>

          {isDone && (
            <button
              onClick={() => onRecordTahajjud(false, 0, '')}
              className="px-4 py-3 rounded-xl bg-rose-950/80 hover:bg-rose-900 text-rose-200 border border-rose-500/30 text-xs font-bold transition"
            >
              {language === 'bn' ? 'রিমুভ' : 'Remove'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
