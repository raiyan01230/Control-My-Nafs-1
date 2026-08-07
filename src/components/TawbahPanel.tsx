import React from 'react';
import { DailyRecord, Language } from '../types';
import { UI_TRANSLATIONS } from '../utils/translations';
import { RotateCcw, CheckCircle2, ShieldCheck, Heart, AlertCircle, Sparkles } from 'lucide-react';

interface TawbahPanelProps {
  record: DailyRecord;
  language: Language;
  onUpdateTawbah: (
    tawbahId: string,
    astaghfirullahCompleted?: number,
    salatulTawbahCompleted?: boolean,
    triggerIdentified?: string,
    preventionPlan?: string
  ) => void;
}

export const TawbahPanel: React.FC<TawbahPanelProps> = ({ record, language, onUpdateTawbah }) => {
  const t = UI_TRANSLATIONS[language];
  const tawbahList = record.tawbahRecords || [];

  return (
    <div className="bg-[#0b0f17]/90 border border-slate-800/80 backdrop-blur-md rounded-2xl p-5 shadow-2xl shadow-black/50 text-slate-100 space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between pb-3.5 border-b border-slate-800/80">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 bg-[#221808]/90 border border-amber-500/30 rounded-2xl text-amber-400 shadow-lg shadow-amber-950/30">
            <RotateCcw className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-amber-300 font-display">{t.tawbahEngine}</h2>
            <p className="text-xs text-slate-400 font-medium">
              {language === 'bn' ? 'তওবা, ইস্তিগফাল ও সালাতুত তওবার মাধ্যমে আত্ম-সংশোধন ব্যবস্থা' : 'Corrective Tawbah workflow with Istighfar counter & Salatul Tawbah'}
            </p>
          </div>
        </div>
      </div>

      {tawbahList.length === 0 ? (
        <div className="text-center py-8 bg-[#121824]/60 rounded-2xl border border-slate-800/80 space-y-2">
          <ShieldCheck className="w-8 h-8 text-emerald-400 mx-auto" />
          <p className="text-sm font-bold text-slate-200">
            {language === 'bn' ? 'আজকের জন্য কোনো তওবা পেন্ডিং নেই!' : 'No pending Tawbah records today!'}
          </p>
          <p className="text-xs text-slate-400 max-w-md mx-auto font-medium">
            {language === 'bn'
              ? 'আলহামদুলিল্লাহ! কোনো ত্রুটি বা গোনাহ রেকর্ড করলে এখানে স্বয়ংক্রিয় তওবা অ্যাকশন প্ল্যান তৈরি হবে।'
              : 'Alhamdulillah! When a slip-up is logged, an automated Tawbah plan appears here to guide repentance.'}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {tawbahList.map((item) => {
            const action = item.correctiveAction;
            const isFinished = action.isCompleted;

            return (
              <div
                key={item.id}
                className={`p-5 rounded-2xl border space-y-4 transition-all duration-300 ${
                  isFinished
                    ? 'bg-[#081f18]/40 border-emerald-500/30 shadow-sm'
                    : 'bg-[#121824]/80 border-amber-500/40 shadow-xl shadow-amber-950/20'
                }`}
              >
                {/* Title */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2.5">
                    <AlertCircle className={`w-4 h-4 ${isFinished ? 'text-emerald-400' : 'text-amber-400'}`} />
                    <span className="text-sm font-bold text-slate-100">{item.badDeedName}</span>
                  </div>
                  <span
                    className={`text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider ${
                      isFinished
                        ? 'bg-emerald-950/90 text-emerald-200 border border-emerald-500/30'
                        : 'bg-amber-950/90 text-amber-200 border border-amber-500/30'
                    }`}
                  >
                    {isFinished ? (language === 'bn' ? 'তওবা সম্পন্ন ✓' : 'Tawbah Complete ✓') : (language === 'bn' ? 'চলমান' : 'Action Required')}
                  </span>
                </div>

                {/* Istighfar Counter Button */}
                <div className="bg-[#0b0f17] p-3.5 rounded-2xl border border-slate-800/80 flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <div className="text-xs font-bold text-slate-200">
                      {language === 'bn' ? '১. ইস্তিগফার পাঠ (আস্তাগফিরুল্লাহ):' : '1. Recite Astaghfirullah:'}
                    </div>
                    <div className="text-[11px] text-amber-300/90 font-mono mt-0.5 font-bold">
                      {action.astaghfirullahCompleted} / {action.astaghfirullahCount} Completed
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <button
                      onClick={() =>
                        onUpdateTawbah(
                          item.id,
                          Math.min(action.astaghfirullahCount, action.astaghfirullahCompleted + 25)
                        )
                      }
                      className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white text-xs font-bold transition-all shadow-md"
                    >
                      +25 Astaghfirullah
                    </button>
                    <button
                      onClick={() => onUpdateTawbah(item.id, action.astaghfirullahCount)}
                      className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold transition-all shadow-md"
                    >
                      ✓ Complete All
                    </button>
                  </div>
                </div>

                {/* Salatul Tawbah (if required/recommended) */}
                {action.salatulTawbahRequired && (
                  <div className="bg-[#0b0f17] p-3.5 rounded-2xl border border-slate-800/80 flex items-center justify-between">
                    <div>
                      <div className="text-xs font-bold text-slate-200">
                        {language === 'bn' ? '২. সালাতুত তওবা (২ রাকাত নামায):' : '2. Salatul Tawbah (2 Rakahs Prayer):'}
                      </div>
                      <div className="text-[11px] text-slate-400 font-medium">
                        {language === 'bn' ? 'অজু করে একা একা ২ রাকাত নফল তওবার নামায পড়ুন' : 'Perform 2 Rakahs voluntary prayer of repentance'}
                      </div>
                    </div>

                    <button
                      onClick={() => onUpdateTawbah(item.id, undefined, !action.salatulTawbahCompleted)}
                      className={`px-3.5 py-1.5 rounded-xl border text-xs font-bold transition-all shadow-sm ${
                        action.salatulTawbahCompleted
                          ? 'bg-gradient-to-r from-emerald-600 to-teal-600 border-emerald-400/30 text-white'
                          : 'bg-[#121824] border-slate-800 text-slate-300 hover:bg-[#162036]'
                      }`}
                    >
                      {action.salatulTawbahCompleted ? 'Completed ✓' : 'Mark Prayed'}
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
