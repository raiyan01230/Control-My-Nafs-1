import React, { useState } from 'react';
import { DailyRecord, Language, AIPersonalSession } from '../types';
import { Sparkles, TrendingUp, AlertTriangle, CheckCircle, ShieldCheck, Target, RefreshCw, Zap, Calendar, Award } from 'lucide-react';

interface AIPersonalAnalysisViewProps {
  record: DailyRecord;
  language: Language;
  onTriggerSession: (type: 'daily' | 'weekly' | 'monthly') => Promise<void>;
  loading: boolean;
}

export const AIPersonalAnalysisView: React.FC<AIPersonalAnalysisViewProps> = ({
  record,
  language,
  onTriggerSession,
  loading
}) => {
  const [activeTab, setActiveTab] = useState<'daily' | 'weekly' | 'monthly'>('daily');

  const session: AIPersonalSession | undefined = record.dailySession;

  const handleTabChange = async (tab: 'daily' | 'weekly' | 'monthly') => {
    setActiveTab(tab);
    await onTriggerSession(tab);
  };

  return (
    <div className="bg-[#0b0f17]/95 border border-emerald-900/50 backdrop-blur-xl rounded-2xl p-5 shadow-2xl text-slate-100 space-y-5">
      {/* Top Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-800/80">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 bg-gradient-to-br from-emerald-950 to-teal-950 border border-emerald-500/40 rounded-2xl text-emerald-400 shadow-lg shadow-emerald-950/50">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="text-lg font-bold text-white font-display">
                {language === 'bn' ? 'ব্যক্তিগত নফস ও আচরণ বিশ্লেষণ (AI Analyzer)' : 'Personal Nafs & Behavior AI Analysis'}
              </h2>
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-md bg-emerald-950 text-emerald-400 border border-emerald-500/30">
                Non-Chat Report
              </span>
            </div>
            <p className="text-xs text-slate-400 font-medium">
              {language === 'bn'
                ? 'আপনার দৈনিক ও সাপ্তাহিক কর্মকাণ্ডের তুলনামূলক বিশ্লেষণ রিপোর্ট'
                : 'Automated data-driven personal session review comparing current and historical metrics.'}
            </p>
          </div>
        </div>

        {/* Refresh Analysis Button */}
        <button
          disabled={loading}
          onClick={() => onTriggerSession(activeTab)}
          className="flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-emerald-700 to-teal-700 hover:from-emerald-600 hover:to-teal-600 text-white text-xs font-bold transition shadow-md disabled:opacity-50"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          <span>{loading ? (language === 'bn' ? 'বিশ্লেষণ হচ্ছে...' : 'Analyzing...') : (language === 'bn' ? 'রিফ্রেশ করুন' : 'Re-analyze')}</span>
        </button>
      </div>

      {/* Tab Selectors */}
      <div className="flex space-x-2 p-1 bg-[#121824] rounded-2xl border border-slate-800">
        <button
          onClick={() => handleTabChange('daily')}
          className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center space-x-1.5 ${
            activeTab === 'daily'
              ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Calendar className="w-3.5 h-3.5" />
          <span>{language === 'bn' ? 'দৈনিক সেশন' : 'Daily Review'}</span>
        </button>

        <button
          onClick={() => handleTabChange('weekly')}
          className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center space-x-1.5 ${
            activeTab === 'weekly'
              ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <TrendingUp className="w-3.5 h-3.5" />
          <span>{language === 'bn' ? 'সাপ্তাহিক রিপোর্ট' : 'Weekly Report'}</span>
        </button>

        <button
          onClick={() => handleTabChange('monthly')}
          className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center space-x-1.5 ${
            activeTab === 'monthly'
              ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Award className="w-3.5 h-3.5" />
          <span>{language === 'bn' ? 'মাসিক পর্যালোচনা' : 'Monthly Overview'}</span>
        </button>
      </div>

      {/* Content Area */}
      {!session ? (
        <div className="text-center py-10 bg-[#121824]/50 rounded-2xl border border-slate-800 space-y-3">
          <Sparkles className="w-8 h-8 text-emerald-400 mx-auto animate-pulse" />
          <p className="text-sm font-bold text-slate-200">
            {language === 'bn' ? 'একাউন্টেবল সেশন তৈরি হচ্ছে...' : 'Generating Personal Session Review...'}
          </p>
          <p className="text-xs text-slate-400 max-w-sm mx-auto font-medium">
            {language === 'bn'
              ? 'আপনার রেকর্ড করা সালাত, তওবা ও নফসের বিজয়ের ডেটা থেকে AI ব্যক্তিগত বিশ্লেষণ প্রস্তুত করছে।'
              : 'Synthesizing your logged Salah, Tawbah, and Nafs victory metrics into a private analytical report.'}
          </p>
        </div>
      ) : (
        <div className="space-y-4 text-xs">
          {/* Executive Summary Card */}
          <div className="p-4 rounded-2xl bg-[#0d1626] border border-emerald-500/30 space-y-2 shadow-lg">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider">
                {language === 'bn' ? session.analysisTitleBn : session.analysisTitleEn}
              </span>
              <span className="text-[10px] text-slate-400">
                {new Date(session.generatedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
            <p className="text-sm font-semibold text-slate-100 leading-relaxed">
              {language === 'bn' ? session.summaryBn : session.summaryEn}
            </p>
            {session.trendsTextEn && (
              <div className="text-xs text-amber-300 font-mono bg-amber-950/40 p-2.5 rounded-xl border border-amber-500/20 flex items-center space-x-2">
                <TrendingUp className="w-4 h-4 shrink-0" />
                <span>{language === 'bn' ? session.trendsTextBn : session.trendsTextEn}</span>
              </div>
            )}
          </div>

          {/* Grid: What Went Well & What Went Wrong */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {/* What Went Well */}
            <div className="p-4 rounded-2xl bg-[#081f18]/60 border border-emerald-500/30 space-y-2">
              <div className="flex items-center space-x-2 text-emerald-400 font-bold">
                <CheckCircle className="w-4 h-4" />
                <span>{language === 'bn' ? 'ইতিবাচক সাফল্য ও বজায় রাখা আমল' : 'What Went Well'}</span>
              </div>
              <ul className="space-y-1.5 list-disc list-inside text-slate-200">
                {((language === 'bn' ? session.whatWentWellBn : session.whatWentWellEn) || []).map((item, i) => (
                  <li key={i} className="leading-normal">{item}</li>
                ))}
              </ul>
            </div>

            {/* What Needs Focus */}
            <div className="p-4 rounded-2xl bg-[#240c14]/60 border border-rose-500/30 space-y-2">
              <div className="flex items-center space-x-2 text-rose-400 font-bold">
                <AlertTriangle className="w-4 h-4" />
                <span>{language === 'bn' ? 'সংশোধনযোগ্য বিষয় ও পিছলে পড়ার জায়গা' : 'What Needs Attention'}</span>
              </div>
              <ul className="space-y-1.5 list-disc list-inside text-slate-200">
                {((language === 'bn' ? session.whatWentWrongBn : session.whatWentWrongEn) || []).map((item, i) => (
                  <li key={i} className="leading-normal">{item}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Biggest Challenge vs Victory */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="p-3.5 rounded-2xl bg-[#121824] border border-slate-800 space-y-1">
              <div className="text-[10px] uppercase font-bold text-slate-400">
                {language === 'bn' ? 'আজকের প্রধান চ্যালেঞ্জ' : 'Biggest Challenge'}
              </div>
              <div className="font-semibold text-slate-200">
                {language === 'bn' ? session.biggestChallengeBn : session.biggestChallengeEn}
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#121824] border border-slate-800 space-y-1">
              <div className="text-[10px] uppercase font-bold text-teal-400">
                {language === 'bn' ? 'আজকের সেরা নফসের জয়' : 'Biggest Victory'}
              </div>
              <div className="font-semibold text-teal-200">
                {language === 'bn' ? session.biggestVictoryBn : session.biggestVictoryEn}
              </div>
            </div>
          </div>

          {/* Detected Triggers */}
          {((session.detectedTriggersEn || []).length > 0) && (
            <div className="p-3.5 rounded-2xl bg-[#080c14] border border-slate-800 space-y-2">
              <div className="flex items-center space-x-2 text-amber-400 font-bold text-[11px] uppercase tracking-wider">
                <Zap className="w-3.5 h-3.5" />
                <span>{language === 'bn' ? 'চিহ্নিত প্রধান ট্রিগার ও পরিবেশ' : 'Detected Triggers & High-Risk Contexts'}</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {((language === 'bn' ? (session.detectedTriggersBn || session.detectedTriggersEn) : session.detectedTriggersEn) || []).map((tr, idx) => (
                  <span key={idx} className="px-2.5 py-1 rounded-lg bg-amber-950/80 border border-amber-500/30 text-amber-200 font-semibold text-[11px]">
                    ⚡ {tr}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Action Strategy & Focus */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-[#0d1f2d] to-[#0d2a2a] border border-teal-500/30 space-y-2 shadow-md">
            <div className="flex items-center space-x-2 text-teal-300 font-bold">
              <Target className="w-4 h-4" />
              <span>{language === 'bn' ? 'প্রতিষেধক টিপস ও আগামীকালের টার্গেট' : 'Action Strategy & Tomorrow Focus'}</span>
            </div>
            <div className="space-y-1 text-slate-200">
              <p><strong className="text-teal-400">{language === 'bn' ? 'পরামর্শ:' : 'Recommended Action:'}</strong> {language === 'bn' ? session.recommendedActionBn : session.recommendedActionEn}</p>
              <p><strong className="text-emerald-400">{language === 'bn' ? 'আগামীকালের ফোকাস:' : 'Tomorrow Focus:'}</strong> {language === 'bn' ? session.tomorrowFocusBn : session.tomorrowFocusEn}</p>
            </div>
          </div>
          
          {/* Daily Inspirational Quote */}
          {session.dailyQuoteEn && (
            <div className="p-4 rounded-2xl bg-[#081f18]/40 border border-emerald-500/20 text-center italic text-emerald-200">
               "{language === 'bn' ? session.dailyQuoteBn : session.dailyQuoteEn}"
            </div>
          )}
        </div>
      )}
    </div>
  );
};
