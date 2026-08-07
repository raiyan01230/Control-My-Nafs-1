import React from 'react';
import {
  LayoutDashboard,
  CheckSquare,
  Sparkles,
  MoonStar,
  ShieldCheck,
  AlertTriangle,
  HeartHandshake,
  RotateCcw,
  Gift,
  BarChart3,
  CalendarDays,
  CalendarRange,
  BookOpen,
  Target
} from 'lucide-react';
import { Language } from '../types';
import { UI_TRANSLATIONS } from '../utils/translations';

export type NavTab = 
  | 'dashboard'
  | 'ai_analysis'
  | 'goals'
  | 'salah'
  | 'ayatul_kursi'
  | 'tahajjud'
  | 'nafs_control'
  | 'bad_deeds'
  | 'good_deeds'
  | 'tawbah'
  | 'rewards'
  | 'analytics'
  | 'monthly'
  | 'yearly'
  | 'calendar'
  | 'references';

interface NavigationProps {
  activeTab: NavTab;
  language: Language;
  onSelectTab: (tab: NavTab) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ activeTab, language, onSelectTab }) => {
  const t = UI_TRANSLATIONS[language];

  const items: { id: NavTab; label: string; icon: React.ReactNode }[] = [
    { id: 'dashboard', label: t.dashboard, icon: <LayoutDashboard className="w-4 h-4" /> },
    { id: 'ai_analysis', label: language === 'bn' ? 'এআই বিশ্লেষণ রিপোর্ট' : 'AI Analysis Session', icon: <Sparkles className="w-4 h-4 text-emerald-400" /> },
    { id: 'goals', label: language === 'bn' ? 'লক্ষ্যসমূহ' : 'Spiritual Goals', icon: <Target className="w-4 h-4" /> },
    { id: 'salah', label: t.salahTracker, icon: <CheckSquare className="w-4 h-4" /> },
    { id: 'ayatul_kursi', label: t.ayatulKursi, icon: <Sparkles className="w-4 h-4" /> },
    { id: 'tahajjud', label: t.tahajjud, icon: <MoonStar className="w-4 h-4" /> },
    { id: 'nafs_control', label: t.nafsControl, icon: <ShieldCheck className="w-4 h-4" /> },
    { id: 'bad_deeds', label: t.badDeeds, icon: <AlertTriangle className="w-4 h-4" /> },
    { id: 'good_deeds', label: t.goodDeeds, icon: <HeartHandshake className="w-4 h-4" /> },
    { id: 'tawbah', label: t.tawbahEngine, icon: <RotateCcw className="w-4 h-4" /> },
    { id: 'rewards', label: t.rewards, icon: <Gift className="w-4 h-4" /> },
    { id: 'analytics', label: t.analytics, icon: <BarChart3 className="w-4 h-4" /> },
    { id: 'monthly', label: t.monthlyReport, icon: <CalendarDays className="w-4 h-4" /> },
    { id: 'yearly', label: t.yearlyReport, icon: <CalendarRange className="w-4 h-4" /> },
    { id: 'calendar', label: t.calendar, icon: <CalendarDays className="w-4 h-4" /> },
    { id: 'references', label: language === 'bn' ? 'ইসলামিক সূত্র' : 'Islamic References', icon: <BookOpen className="w-4 h-4" /> }
  ];

  return (
    <>
      {/* Desktop Navigation Sidebar */}
      <aside className="hidden lg:block w-64 shrink-0 bg-[#080c14]/95 border-r border-slate-800/80 p-4 space-y-1.5 self-start min-h-[calc(100vh-70px)] backdrop-blur-md">
        <div className="text-[11px] font-bold text-emerald-400/90 uppercase tracking-wider px-3 mb-3 flex items-center justify-between">
          <span>{language === 'bn' ? 'নেভিগেশন মেনু' : 'Navigation Menu'}</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
        </div>
        {items.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onSelectTab(item.id)}
              className={`w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 ${
                isActive
                  ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg shadow-emerald-950/50 border border-emerald-400/30'
                  : 'text-slate-300 hover:bg-[#101726] hover:text-emerald-300 border border-transparent'
              }`}
            >
              <span className={isActive ? 'text-white' : 'text-emerald-400'}>{item.icon}</span>
              <span className="truncate">{item.label}</span>
            </button>
          );
        })}
      </aside>

      {/* Mobile Top Scrollable Tab Bar */}
      <nav className="lg:hidden bg-[#080c14]/95 border-b border-slate-800/80 px-2 py-2 overflow-x-auto scrollbar-none flex space-x-1.5 text-xs text-slate-300 backdrop-blur-md">
        {items.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onSelectTab(item.id)}
              className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-xl whitespace-nowrap text-xs font-semibold transition-all duration-200 ${
                isActive
                  ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md shadow-emerald-950/50 border border-emerald-400/30'
                  : 'bg-[#0f172a]/80 text-slate-300 hover:bg-[#162036] border border-slate-800/60'
              }`}
            >
              <span className={isActive ? 'text-white' : 'text-emerald-400'}>{item.icon}</span>
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>
    </>
  );
};
