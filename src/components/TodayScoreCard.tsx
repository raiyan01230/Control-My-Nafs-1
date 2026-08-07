import React from 'react';
import { DailyRecord, Language } from '../types';
import { UI_TRANSLATIONS } from '../utils/translations';
import { Trophy, CheckCircle, AlertCircle, Shield, Award, Sparkles, Flame, MoonStar } from 'lucide-react';

interface TodayScoreCardProps {
  record: DailyRecord;
  language: Language;
}

export const TodayScoreCard: React.FC<TodayScoreCardProps> = ({ record, language }) => {
  const t = UI_TRANSLATIONS[language];

  const prayersDone = Object.values(record?.prayers || {}).filter(
    (p: any) => p?.status === 'completed' || p?.status === 'qada'
  ).length;

  const totalBadIncidents = (record?.badDeeds || []).reduce(
    (acc, b) => acc + (b.quantity || 1), 0
  );

  const tawbahCompletedCount = (record?.tawbahRecords || []).filter(
    t => t.correctiveAction?.isCompleted
  ).length;

  // Score color badge
  const score = record?.score ?? 20;
  let scoreColor = 'from-amber-500 to-emerald-600';
  if (score >= 80) scoreColor = 'from-emerald-500 to-teal-600';
  else if (score < 50) scoreColor = 'from-rose-600 to-amber-600';

  return (
    <div className="bg-[#0b0f17]/90 border border-slate-800/80 backdrop-blur-md rounded-2xl p-5 shadow-2xl shadow-black/50 text-slate-100 space-y-4">
      {/* Top Banner Score */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800/80">
        <div className="flex items-center space-x-3.5">
          <div className={`w-14 h-14 rounded-2xl bg-gradient-to-tr ${scoreColor} flex items-center justify-center text-white text-2xl font-bold shadow-lg shadow-emerald-950/60 ring-1 ring-white/20`}>
            {score}
          </div>
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
              {t.todayScore}
            </div>
            <div className="text-sm font-semibold text-emerald-400 flex items-center space-x-1.5 mt-0.5">
              <Trophy className="w-4 h-4 text-amber-400 shrink-0" />
              <span>
                {score >= 80
                  ? (language === 'bn' ? 'মাশাআল্লাহ! চমৎকার সংযম' : 'Ma sha Allah! Excellent Discipline')
                  : score >= 50
                  ? (language === 'bn' ? 'আলহামদুলিল্লাহ! ভালো চেষ্টা' : 'Alhamdulillah! Steady Progress')
                  : (language === 'bn' ? 'তওবা করুন ও পুনরায় চেষ্টা করুন' : 'Seek Tawbah & Keep Going')}
              </span>
            </div>
          </div>
        </div>

        {/* Quick Salah Progress Ring */}
        <div className="flex items-center space-x-2.5 bg-[#121824] px-4 py-2.5 rounded-2xl border border-slate-800/80 shadow-inner">
          <CheckCircle className="w-5 h-5 text-emerald-400" />
          <div>
            <div className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">{t.salahCompleted}</div>
            <div className="text-sm font-bold text-slate-100">{prayersDone} / 5 ({Math.round((prayersDone / 5) * 100)}%)</div>
          </div>
        </div>
      </div>

      {/* Grid Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
        {/* Good Deeds */}
        <div className="p-3.5 rounded-2xl bg-[#081f18]/60 border border-emerald-500/20 space-y-1 shadow-sm">
          <div className="flex items-center justify-between text-emerald-400 font-semibold">
            <span>{t.goodDeedsCount}</span>
            <Award className="w-4 h-4" />
          </div>
          <div className="text-2xl font-bold text-emerald-200">{(record?.goodDeeds || []).length}</div>
        </div>

        {/* Bad Deeds / Slip-ups */}
        <div className="p-3.5 rounded-2xl bg-[#240c14]/60 border border-rose-500/20 space-y-1 shadow-sm">
          <div className="flex items-center justify-between text-rose-400 font-semibold">
            <span>{t.badDeedsCount}</span>
            <AlertCircle className="w-4 h-4" />
          </div>
          <div className="text-2xl font-bold text-rose-200">{totalBadIncidents}</div>
        </div>

        {/* Nafs Victories */}
        <div className="p-3.5 rounded-2xl bg-[#0a2024]/60 border border-teal-500/20 space-y-1 shadow-sm">
          <div className="flex items-center justify-between text-teal-400 font-semibold">
            <span>{t.victoriesCount}</span>
            <Shield className="w-4 h-4" />
          </div>
          <div className="text-2xl font-bold text-teal-200">{(record?.nafsVictories || []).length}</div>
        </div>

        {/* Tawbah Completed */}
        <div className="p-3.5 rounded-2xl bg-[#221808]/60 border border-amber-500/20 space-y-1 shadow-sm">
          <div className="flex items-center justify-between text-amber-400 font-semibold">
            <span>{t.tawbahDone}</span>
            <Flame className="w-4 h-4" />
          </div>
          <div className="text-2xl font-bold text-amber-200">{tawbahCompletedCount}</div>
        </div>
      </div>

      {/* Trackers Status Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 pt-3 text-xs border-t border-slate-800/80 text-slate-300">
        <div className="flex items-center space-x-2">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span className="font-medium">{t.ayatulKursi}:</span>
          <span className={`font-bold px-2.5 py-0.5 rounded-lg text-[11px] ${record.ayatulKursi?.completed ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/30' : 'bg-[#121824] text-slate-400 border border-slate-800'}`}>
            {record.ayatulKursi?.completed ? (language === 'bn' ? 'আদায় করা হয়েছে ✓' : 'Done ✓') : (language === 'bn' ? 'বাকি আছে' : 'Pending')}
          </span>
        </div>

        <div className="flex items-center space-x-2">
          <MoonStar className="w-4 h-4 text-indigo-400" />
          <span className="font-medium">{t.tahajjud}:</span>
          <span className={`font-bold px-2.5 py-0.5 rounded-lg text-[11px] ${record.tahajjud?.completed ? 'bg-indigo-950 text-indigo-300 border border-indigo-500/30' : 'bg-[#121824] text-slate-400 border border-slate-800'}`}>
            {record.tahajjud?.completed ? `${record.tahajjud.rakahs} Rakahs ✓` : (language === 'bn' ? 'আজ হয়নি' : 'None today')}
          </span>
        </div>
      </div>
    </div>
  );
};
