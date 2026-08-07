import React from 'react';
import { DailyRecord, Language } from '../types';
import { UI_TRANSLATIONS } from '../utils/translations';
import { Sparkles, CheckCircle, Flame, Shield, BookOpen } from 'lucide-react';

interface AyatulKursiTrackerProps {
  record: DailyRecord;
  language: Language;
  onToggle: (completed: boolean) => void;
}

export const AyatulKursiTracker: React.FC<AyatulKursiTrackerProps> = ({ record, language, onToggle }) => {
  const t = UI_TRANSLATIONS[language];
  const isCompleted = record.ayatulKursi?.completed;

  return (
    <div className="bg-[#0b0f17]/90 border border-slate-800/80 backdrop-blur-md rounded-2xl p-5 shadow-2xl shadow-black/50 text-slate-100 space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between pb-3.5 border-b border-slate-800/80">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 bg-[#221808]/90 border border-amber-500/30 rounded-2xl text-amber-400 shadow-lg shadow-amber-950/30">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-amber-300 font-display">{t.ayatulKursi}</h2>
            <p className="text-xs text-slate-400 font-medium">
              {language === 'bn' ? 'প্রতিদিনের আয়াতুল কুরসী তিলওয়াত ট্র্যাকার' : 'Daily recitation tracker for Ayatul Kursi'}
            </p>
          </div>
        </div>
      </div>

      {/* Main Checkbox Action Card */}
      <div
        onClick={() => onToggle(!isCompleted)}
        className={`p-6 rounded-2xl border cursor-pointer transition-all duration-300 flex flex-col sm:flex-row items-center justify-between gap-4 ${
          isCompleted
            ? 'bg-gradient-to-r from-[#081f18]/90 via-[#0b0f17] to-[#081f18]/90 border-emerald-500/40 shadow-xl shadow-emerald-950/30'
            : 'bg-[#121824]/60 border-slate-800/80 hover:border-amber-500/40'
        }`}
      >
        <div className="flex items-center space-x-4">
          <div
            className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl font-bold transition-all ${
              isCompleted
                ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg shadow-emerald-950/50'
                : 'bg-[#0b0f17] border-2 border-slate-700 text-slate-400'
            }`}
          >
            {isCompleted ? '✓' : ''}
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-100">
              {isCompleted
                ? (language === 'bn' ? 'আজকের আয়াতুল কুরসী সম্পন্ন হয়েছে ✓' : 'Ayatul Kursi Completed Today ✓')
                : (language === 'bn' ? 'আজকে কি আয়াতুল কুরসী পড়া হয়েছে?' : 'Have you recited Ayatul Kursi today?')}
            </h3>
            <p className="text-xs text-slate-400 mt-1 font-medium">
              {isCompleted
                ? (language === 'bn' ? 'মাশাআল্লাহ! আপনি আত্ম-সুরক্ষার আমল বজায় রেখেছেন।' : 'Recited with devotion. Allah protect you.')
                : (language === 'bn' ? 'ক্লিক করে মার্ক করুন' : 'Click box to mark completed')}
            </p>
          </div>
        </div>

        <button
          className={`px-5 py-2.5 rounded-xl font-bold text-xs transition-all shadow-md ${
            isCompleted
              ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white hover:from-emerald-500 hover:to-teal-500'
              : 'bg-gradient-to-r from-amber-600 to-orange-600 text-white hover:from-amber-500 hover:to-orange-500'
          }`}
        >
          {isCompleted ? (language === 'bn' ? 'আদায় করা হয়েছে' : 'Marked Done') : (language === 'bn' ? 'মার্ক করুন' : 'Mark Completed')}
        </button>
      </div>

      {/* Benefits / References Info */}
      <div className="bg-[#121824]/60 border border-slate-800/80 rounded-2xl p-4 space-y-2 text-xs text-slate-300">
        <div className="flex items-center space-x-2 text-amber-300 font-semibold">
          <BookOpen className="w-4 h-4 text-amber-400" />
          <span>{language === 'bn' ? 'আয়াতুল কুরসীর ফজিলত:' : 'Virtue of Ayatul Kursi:'}</span>
        </div>
        <p className="leading-relaxed font-serif italic text-slate-200">
          {language === 'bn'
            ? '“যে ব্যক্তি প্রতি ফরজ নামাযের পর আয়াতুল কুরসী পাঠ করবে, তার জান্নাতে প্রবেশের পথে মৃত্যু ছাড়া আর কোনো বাধা থাকবে না।” (সুনানে কুবরা নাসাঈ ৯৮৪৮)'
            : '“Whoever recites Ayatul Kursi after every obligatory prayer, nothing will prevent him from entering Paradise except death.” (Sunan al-Kubra an-Nasa\'i 9848)'}
        </p>
      </div>
    </div>
  );
};
