import React from 'react';
import { DailyRecord, Language } from '../types';
import { UI_TRANSLATIONS } from '../utils/translations';
import { CalendarRange, Award, Shield, Flame } from 'lucide-react';

interface YearlyReportProps {
  language: Language;
  records: DailyRecord[];
}

export const YearlyReport: React.FC<YearlyReportProps> = ({ language, records }) => {
  const t = UI_TRANSLATIONS[language];

  return (
    <div className="bg-[#0b0f17]/90 border border-slate-800/80 backdrop-blur-md rounded-2xl p-5 shadow-2xl shadow-black/50 text-slate-100 space-y-5">
      <div className="flex items-center space-x-3 pb-3.5 border-b border-slate-800/80">
        <div className="p-2.5 bg-[#081f18]/90 border border-emerald-500/30 rounded-2xl text-emerald-400 shadow-lg shadow-emerald-950/30">
          <CalendarRange className="w-5 h-5" />
        </div>
        <h2 className="text-lg font-bold text-slate-100 font-display">{t.yearlyReport}</h2>
      </div>

      <div className="p-6 rounded-2xl bg-gradient-to-r from-[#081f18] via-[#0b0f17] to-[#121824] border border-emerald-500/30 text-center space-y-3 shadow-lg">
        <Award className="w-12 h-12 text-amber-400 mx-auto drop-shadow-md" />
        <h3 className="text-base font-bold text-slate-100 font-display">
          {language === 'bn' ? 'বার্ষিক আত্ম-জবাবদিহিতা সামারি' : 'Yearly Accountability Summary'}
        </h3>
        <p className="text-xs text-slate-300 max-w-lg mx-auto leading-relaxed font-medium">
          {language === 'bn'
            ? 'প্রতিদিনের ছোট ছোট চেষ্টা ও তাওবার মাধ্যমেই নফসের স্থায়ী সংশোধন সম্ভব। আপনার ধারাবাহিক আমল আল্লাহ কবুল করুন।'
            : 'Continuous small efforts and sincere Tawbah lead to lasting purification of the soul.'}
        </p>
      </div>
    </div>
  );
};
