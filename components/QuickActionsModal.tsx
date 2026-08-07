import React, { useState } from 'react';
import { Language, PrayerName, PrayerStatus, PrayerType } from '../types';
import { UI_TRANSLATIONS } from '../utils/translations';
import {
  CheckSquare,
  AlertTriangle,
  ShieldCheck,
  RotateCcw,
  Sparkles,
  MoonStar,
  Plus,
  X,
  HeartHandshake
} from 'lucide-react';

interface QuickActionsModalProps {
  language: Language;
  selectedDate: string;
  onRecordSalah: (prayerName: PrayerName, status: PrayerStatus, type: PrayerType) => void;
  onRecordAyatulKursi: (completed: boolean) => void;
  onRecordTahajjud: (completed: boolean, rakahs: number) => void;
  onRecordGoodDeed: (name: string, category: string) => void;
  onRecordBadDeed: (name: string, category: string, severity: number) => void;
  onRecordNafsVictory: (title: string, category: string, difficulty: number) => void;
  onOpenTab: (tabName: any) => void;
}

export const QuickActionsModal: React.FC<QuickActionsModalProps> = ({
  language,
  onRecordSalah,
  onRecordAyatulKursi,
  onRecordTahajjud,
  onRecordGoodDeed,
  onRecordBadDeed,
  onRecordNafsVictory,
  onOpenTab
}) => {
  const t = UI_TRANSLATIONS[language];
  const [activeModal, setActiveModal] = useState<
    'none' | 'salah' | 'good' | 'bad' | 'victory' | 'tahajjud'
  >('none');

  // Input states
  const [customText, setCustomText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('general');
  const [severityVal, setSeverityVal] = useState<number>(2);
  const [difficultyVal, setDifficultyVal] = useState<number>(3);
  const [rakahsVal, setRakahsVal] = useState<number>(2);

  const handleClose = () => {
    setActiveModal('none');
    setCustomText('');
  };

  return (
    <div className="bg-[#0b0f17]/90 border border-slate-800/80 backdrop-blur-md rounded-2xl p-4 shadow-2xl shadow-black/50">
      <div className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-3 flex items-center justify-between">
        <span>{t.quickActions}</span>
        <span className="text-[10px] text-slate-400 font-medium">{language === 'bn' ? 'এক ক্লিকে যোগ করুন' : 'Instant Log'}</span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5">
        {/* Good Deed */}
        <button
          onClick={() => setActiveModal('good')}
          className="flex items-center justify-center space-x-1.5 p-2.5 rounded-xl bg-[#081f18]/80 hover:bg-emerald-950 border border-emerald-500/30 text-emerald-300 text-xs font-bold transition shadow-sm"
        >
          <Plus className="w-4 h-4 text-emerald-400" />
          <span>{t.addGoodDeed}</span>
        </button>

        {/* Bad Deed */}
        <button
          onClick={() => onOpenTab('bad_deeds')}
          className="flex items-center justify-center space-x-1.5 p-2.5 rounded-xl bg-[#240c14]/80 hover:bg-rose-950 border border-rose-500/30 text-rose-300 text-xs font-bold transition shadow-sm"
        >
          <AlertTriangle className="w-4 h-4 text-rose-400" />
          <span>{t.addBadDeed}</span>
        </button>

        {/* Nafs Victory */}
        <button
          onClick={() => setActiveModal('victory')}
          className="flex items-center justify-center space-x-1.5 p-2.5 rounded-xl bg-[#0a2024]/80 hover:bg-teal-950 border border-teal-500/30 text-teal-300 text-xs font-bold transition shadow-sm"
        >
          <ShieldCheck className="w-4 h-4 text-teal-400" />
          <span>{t.addNafsVictory}</span>
        </button>

        {/* Mark Salah */}
        <button
          onClick={() => setActiveModal('salah')}
          className="flex items-center justify-center space-x-1.5 p-2.5 rounded-xl bg-[#0c182d]/80 hover:bg-blue-950 border border-blue-500/30 text-blue-300 text-xs font-bold transition shadow-sm"
        >
          <CheckSquare className="w-4 h-4 text-blue-400" />
          <span>{t.markSalah}</span>
        </button>

        {/* Ayatul Kursi */}
        <button
          onClick={() => onRecordAyatulKursi(true)}
          className="flex items-center justify-center space-x-1.5 p-2.5 rounded-xl bg-[#221808]/80 hover:bg-amber-950 border border-amber-500/30 text-amber-300 text-xs font-bold transition shadow-sm"
        >
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>{t.markAyatulKursi}</span>
        </button>

        {/* Tahajjud */}
        <button
          onClick={() => setActiveModal('tahajjud')}
          className="flex items-center justify-center space-x-1.5 p-2.5 rounded-xl bg-[#14122d]/80 hover:bg-indigo-950 border border-indigo-500/30 text-indigo-300 text-xs font-bold transition shadow-sm"
        >
          <MoonStar className="w-4 h-4 text-indigo-400" />
          <span>{t.markTahajjud}</span>
        </button>

        {/* Start Tawbah */}
        <button
          onClick={() => onOpenTab('tawbah')}
          className="flex items-center justify-center space-x-1.5 p-2.5 rounded-xl bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 border border-amber-400/30 text-white text-xs font-bold transition shadow-md"
        >
          <RotateCcw className="w-4 h-4 text-amber-200" />
          <span>{t.startTawbah}</span>
        </button>
      </div>

      {/* Action Modals */}
      {activeModal !== 'none' && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-[#0b0f17] border border-slate-800 rounded-3xl w-full max-w-md p-6 text-slate-100 shadow-2xl shadow-black/80 space-y-4">
            <div className="flex items-center justify-between pb-3.5 border-b border-slate-800">
              <h3 className="text-sm font-bold text-emerald-400 uppercase tracking-wide flex items-center space-x-2">
                {activeModal === 'salah' && <CheckSquare className="w-4 h-4 text-blue-400" />}
                {activeModal === 'good' && <HeartHandshake className="w-4 h-4 text-emerald-400" />}
                {activeModal === 'victory' && <ShieldCheck className="w-4 h-4 text-teal-400" />}
                {activeModal === 'tahajjud' && <MoonStar className="w-4 h-4 text-indigo-400" />}
                <span>
                  {activeModal === 'salah' && t.markSalah}
                  {activeModal === 'good' && t.addGoodDeed}
                  {activeModal === 'victory' && t.addNafsVictory}
                  {activeModal === 'tahajjud' && t.markTahajjud}
                </span>
              </h3>
              <button onClick={handleClose} className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/80 transition">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Salah Modal */}
            {activeModal === 'salah' && (
              <div className="space-y-3">
                <p className="text-xs text-slate-300 font-medium">
                  {language === 'bn' ? 'কোন ওয়াক্তের নামায আপডেট করতে চান?' : 'Select Prayer to Mark:'}
                </p>
                <div className="grid grid-cols-5 gap-1.5">
                  {(['fajr', 'dhuhr', 'asr', 'maghrib', 'isha'] as PrayerName[]).map((p) => (
                    <button
                      key={p}
                      onClick={() => {
                        onRecordSalah(p, 'completed', 'congregation');
                        handleClose();
                      }}
                      className="p-2.5 rounded-xl bg-[#121824] hover:bg-emerald-600 border border-slate-700/80 hover:border-emerald-400 text-xs font-bold uppercase transition"
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Good Deed Modal */}
            {activeModal === 'good' && (
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    {language === 'bn' ? 'নেক আমলের বিবরণ' : 'Good Deed Description'}
                  </label>
                  <input
                    type="text"
                    value={customText}
                    onChange={(e) => setCustomText(e.target.value)}
                    placeholder={language === 'bn' ? 'যেমন: আব্বা-আম্মাকে সাহায্য করেছি...' : 'e.g., Read Quran, helped parents...'}
                    className="w-full bg-[#121824] border border-slate-700/80 rounded-xl px-3 py-2.5 text-xs text-slate-100 focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <button
                  onClick={() => {
                    if (customText.trim()) {
                      onRecordGoodDeed(customText, 'general');
                      handleClose();
                    }
                  }}
                  className="w-full py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs shadow transition"
                >
                  {t.save}
                </button>
              </div>
            )}

            {/* Nafs Victory Modal */}
            {activeModal === 'victory' && (
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    {language === 'bn' ? 'নফস নিয়ন্ত্রণের বর্ণনা' : 'Nafs Victory Title'}
                  </label>
                  <input
                    type="text"
                    value={customText}
                    onChange={(e) => setCustomText(e.target.value)}
                    placeholder={language === 'bn' ? 'যেমন: অশালীন প্রলোভন থেকে চোখ ফিরিয়ে রেখেছি...' : 'e.g., Lowered gaze, stopped anger...'}
                    className="w-full bg-[#121824] border border-slate-700/80 rounded-xl px-3 py-2.5 text-xs text-slate-100 focus:outline-none focus:border-teal-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    {language === 'bn' ? 'কঠিনতার মাত্রা (১-৫)' : 'Difficulty Level (1-5)'}
                  </label>
                  <div className="flex space-x-2">
                    {[1, 2, 3, 4, 5].map((lvl) => (
                      <button
                        key={lvl}
                        onClick={() => setDifficultyVal(lvl)}
                        className={`flex-1 py-1.5 rounded-lg border text-xs font-bold ${
                          difficultyVal === lvl
                            ? 'bg-teal-600 border-teal-400 text-white'
                            : 'bg-[#121824] border-slate-700 text-slate-300'
                        }`}
                      >
                        {lvl}
                      </button>
                    ))}
                  </div>
                </div>
                <button
                  onClick={() => {
                    if (customText.trim()) {
                      onRecordNafsVictory(customText, 'Self Control', difficultyVal);
                      handleClose();
                    }
                  }}
                  className="w-full py-2.5 rounded-xl bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-500 hover:to-emerald-500 text-white font-bold text-xs shadow transition"
                >
                  {t.save}
                </button>
              </div>
            )}

            {/* Tahajjud Modal */}
            {activeModal === 'tahajjud' && (
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    {language === 'bn' ? 'কত রাকাত তাহাজ্জুদ পড়েছেন?' : 'How many Rakahs prayed?'}
                  </label>
                  <div className="flex space-x-2">
                    {[2, 4, 8, 12].map((r) => (
                      <button
                        key={r}
                        onClick={() => setRakahsVal(r)}
                        className={`flex-1 py-2 rounded-xl border text-xs font-bold ${
                          rakahsVal === r
                            ? 'bg-indigo-600 border-indigo-400 text-white'
                            : 'bg-[#121824] border-slate-700 text-slate-300'
                        }`}
                      >
                        {r} Rakahs
                      </button>
                    ))}
                  </div>
                </div>
                <button
                  onClick={() => {
                    onRecordTahajjud(true, rakahsVal);
                    handleClose();
                  }}
                  className="w-full py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-xs shadow transition"
                >
                  {t.save}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
