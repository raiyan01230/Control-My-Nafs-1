import React from 'react';
import { DailyRecord, Language, PrayerName, PrayerStatus, PrayerType } from '../types';
import { UI_TRANSLATIONS } from '../utils/translations';
import { CheckCircle, Clock, Users, User, XCircle, ShieldAlert } from 'lucide-react';

interface SalahTrackerProps {
  record: DailyRecord;
  language: Language;
  onRecordSalah: (prayerName: PrayerName, status: PrayerStatus, type: PrayerType, notes?: string) => void;
}

export const SalahTracker: React.FC<SalahTrackerProps> = ({ record, language, onRecordSalah }) => {
  const t = UI_TRANSLATIONS[language];

  const prayersList: { name: PrayerName; timeEn: string; timeBn: string }[] = [
    { name: 'fajr', timeEn: 'Dawn / Before Sunrise', timeBn: 'ভোররাত - সূর্যোদয়ের পূর্বে' },
    { name: 'dhuhr', timeEn: 'Noon / Afternoon', timeBn: 'দুপুর - জোহরের ওয়াক্ত' },
    { name: 'asr', timeEn: 'Late Afternoon', timeBn: 'বিকাল - আসরের ওয়াক্ত' },
    { name: 'maghrib', timeEn: 'Sunset / Evening', timeBn: 'সূর্যাস্ত - মাগরিবের ওয়াক্ত' },
    { name: 'isha', timeEn: 'Night', timeBn: 'রাত - এশার ওয়াক্ত' },
  ];

  const completedCount = Object.values(record.prayers).filter(
    (p: any) => p?.status === 'completed' || p?.status === 'qada'
  ).length;

  return (
    <div className="bg-[#0b0f17]/90 border border-slate-800/80 backdrop-blur-md rounded-2xl p-5 shadow-2xl shadow-black/50 text-slate-100 space-y-5">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3.5 border-b border-slate-800/80">
        <div>
          <h2 className="text-lg font-bold text-emerald-400 font-display flex items-center space-x-2">
            <CheckCircle className="w-5 h-5 text-emerald-400" />
            <span>{t.salahTracker}</span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            {language === 'bn' ? 'পাঁচ ওয়াক্ত নামাযের প্রতিদিনের সহজ ট্র্যাকিং' : 'Daily checklist for your five obligatory prayers'}
          </p>
        </div>

        {/* Completion Counter */}
        <div className="flex items-center space-x-2.5 bg-[#081f18]/80 border border-emerald-500/30 px-4 py-2 rounded-2xl shadow-inner">
          <span className="text-xs text-emerald-300 font-medium">{language === 'bn' ? 'আজকের অগ্রগতি:' : 'Today Progress:'}</span>
          <span className="text-lg font-bold text-emerald-200">{completedCount} / 5</span>
          <span className="text-xs font-bold px-2.5 py-0.5 rounded-lg bg-emerald-600/90 text-white shadow-sm">
            {Math.round((completedCount / 5) * 100)}%
          </span>
        </div>
      </div>

      {/* Prayers Checklist Cards */}
      <div className="space-y-3">
        {prayersList.map(({ name, timeEn, timeBn }) => {
          const current = record.prayers[name] || { name, status: 'none', type: 'none' };
          const isDone = current.status === 'completed' || current.status === 'qada';

          return (
            <div
              key={name}
              className={`p-4 rounded-2xl border transition-all duration-200 ${
                isDone
                  ? 'bg-[#081f18]/40 border-emerald-500/30 text-slate-100 shadow-sm'
                  : current.status === 'missed'
                  ? 'bg-[#240c14]/40 border-rose-500/30 text-slate-200'
                  : 'bg-[#121824]/60 border-slate-800/80 text-slate-300'
              }`}
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                {/* Prayer Name */}
                <div className="flex items-center space-x-3.5">
                  <div
                    className={`p-2.5 rounded-2xl transition ${
                      isDone ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md shadow-emerald-950/50' : 'bg-[#0b0f17] text-slate-400 border border-slate-800'
                    }`}
                  >
                    <CheckCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold capitalize text-slate-100">
                      {name}
                    </h3>
                    <p className="text-[11px] text-slate-400 font-medium">
                      {language === 'bn' ? timeBn : timeEn}
                    </p>
                  </div>
                </div>

                {/* Status Options */}
                <div className="flex flex-wrap items-center gap-1.5 text-xs">
                  {/* Congregation Button */}
                  <button
                    onClick={() => onRecordSalah(name, 'completed', 'congregation')}
                    className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl border font-bold transition-all ${
                      current.status === 'completed' && current.type === 'congregation'
                        ? 'bg-gradient-to-r from-emerald-600 to-teal-600 border-emerald-400/50 text-white shadow-md'
                        : 'bg-[#0b0f17] border-slate-800/80 text-slate-300 hover:bg-[#162036]'
                    }`}
                  >
                    <Users className="w-3.5 h-3.5" />
                    <span>{t.congregation}</span>
                  </button>

                  {/* Alone Button */}
                  <button
                    onClick={() => onRecordSalah(name, 'completed', 'alone')}
                    className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl border font-bold transition-all ${
                      current.status === 'completed' && current.type === 'alone'
                        ? 'bg-gradient-to-r from-teal-600 to-emerald-600 border-teal-400/50 text-white shadow-md'
                        : 'bg-[#0b0f17] border-slate-800/80 text-slate-300 hover:bg-[#162036]'
                    }`}
                  >
                    <User className="w-3.5 h-3.5" />
                    <span>{t.alone}</span>
                  </button>

                  {/* Qada Button */}
                  <button
                    onClick={() => onRecordSalah(name, 'qada', 'none')}
                    className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl border font-bold transition-all ${
                      current.status === 'qada'
                        ? 'bg-gradient-to-r from-amber-600 to-orange-600 border-amber-400/50 text-white shadow-md'
                        : 'bg-[#0b0f17] border-slate-800/80 text-slate-300 hover:bg-[#162036]'
                    }`}
                  >
                    <Clock className="w-3.5 h-3.5" />
                    <span>{t.qada}</span>
                  </button>

                  {/* Missed Button */}
                  <button
                    onClick={() => onRecordSalah(name, 'missed', 'none')}
                    className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl border font-bold transition-all ${
                      current.status === 'missed'
                        ? 'bg-gradient-to-r from-rose-600 to-red-600 border-rose-400/50 text-white shadow-md'
                        : 'bg-[#0b0f17] border-slate-800/80 text-slate-300 hover:bg-[#162036]'
                    }`}
                  >
                    <XCircle className="w-3.5 h-3.5" />
                    <span>{t.missed}</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Encouragement Footer */}
      <div className="p-3.5 rounded-2xl bg-[#121824]/60 border border-slate-800/80 text-xs text-slate-300 flex items-start space-x-2.5">
        <ShieldAlert className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
        <p>
          {language === 'bn'
            ? 'টিপস: নামাযের পর অন্তত আয়াতুল কুরসী পাঠ করার সুন্নাত বজায় রাখার চেষ্টা করুন।'
            : 'Tip: Aim to recite Ayatul Kursi after each obligatory prayer to protect your day.'}
        </p>
      </div>
    </div>
  );
};
