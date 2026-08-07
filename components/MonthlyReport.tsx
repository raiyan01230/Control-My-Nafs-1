import React from 'react';
import { DailyRecord, Language } from '../types';
import { UI_TRANSLATIONS } from '../utils/translations';
import { CalendarDays, Trophy, Shield, AlertTriangle, CheckCircle, BarChart3 } from 'lucide-react';

interface MonthlyReportProps {
  language: Language;
  records: DailyRecord[];
}

export const MonthlyReport: React.FC<MonthlyReportProps> = ({ language, records }) => {
  const t = UI_TRANSLATIONS[language];

  const totalDays = records.length || 1;
  const avgScore = Math.round(records.reduce((acc, r) => acc + (r.score || 50), 0) / totalDays);
  
  let totalSalah = 0;
  let totalBadDeeds = 0;
  let totalGoodDeeds = 0;
  let totalVictories = 0;

  for (const r of records) {
    totalSalah += Object.values(r.prayers || {}).filter((p: any) => p?.status === 'completed' || p?.status === 'qada').length;
    totalBadDeeds += (r.badDeeds || []).length;
    totalGoodDeeds += (r.goodDeeds || []).length;
    totalVictories += (r.nafsVictories || []).length;
  }

  return (
    <div className="bg-[#0b0f17]/90 border border-slate-800/80 backdrop-blur-md rounded-2xl p-5 shadow-2xl shadow-black/50 text-slate-100 space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between pb-3.5 border-b border-slate-800/80">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 bg-[#081f18]/90 border border-emerald-500/30 rounded-2xl text-emerald-400 shadow-lg shadow-emerald-950/30">
            <CalendarDays className="w-5 h-5" />
          </div>
          <h2 className="text-lg font-bold text-slate-100 font-display">{t.monthlyReport}</h2>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
        <div className="p-4 rounded-2xl bg-[#121824]/80 border border-slate-800/80 shadow-sm">
          <div className="text-slate-400 font-medium">Average Score</div>
          <div className="text-2xl font-bold text-emerald-400 mt-1 font-display">{avgScore} / 100</div>
        </div>

        <div className="p-4 rounded-2xl bg-[#121824]/80 border border-slate-800/80 shadow-sm">
          <div className="text-slate-400 font-medium">Total Prayers</div>
          <div className="text-2xl font-bold text-teal-300 mt-1 font-display">{totalSalah}</div>
        </div>

        <div className="p-4 rounded-2xl bg-[#121824]/80 border border-slate-800/80 shadow-sm">
          <div className="text-slate-400 font-medium">Nafs Victories</div>
          <div className="text-2xl font-bold text-teal-400 mt-1 font-display">{totalVictories}</div>
        </div>

        <div className="p-4 rounded-2xl bg-[#121824]/80 border border-slate-800/80 shadow-sm">
          <div className="text-slate-400 font-medium">Total Slip-ups</div>
          <div className="text-2xl font-bold text-rose-400 mt-1 font-display">{totalBadDeeds}</div>
        </div>
      </div>
    </div>
  );
};
