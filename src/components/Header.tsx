import React from 'react';
import { Shield, Moon, Sun, Globe, Database, Lock, Calendar as CalendarIcon } from 'lucide-react';
import { Language, ThemeMode, UserSettings } from '../types';
import { UI_TRANSLATIONS } from '../utils/translations';
import { formatFullDateDisplay } from '../utils/scoring';

interface HeaderProps {
  language: Language;
  theme: ThemeMode;
  settings: UserSettings;
  selectedDate: string;
  onLanguageToggle: () => void;
  onThemeToggle: () => void;
  onOpenSettings: () => void;
  onLockSession?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  language,
  theme,
  settings,
  selectedDate,
  onLanguageToggle,
  onThemeToggle,
  onOpenSettings,
  onLockSession
}) => {
  const t = UI_TRANSLATIONS[language];
  const { gregorianDay, gregorianDate, hijriDate } = formatFullDateDisplay(selectedDate, language);

  return (
    <header className="sticky top-0 z-30 backdrop-blur-xl bg-[#080c14]/90 text-emerald-50 border-b border-emerald-900/40 shadow-2xl shadow-black/50 px-4 py-3.5 transition-colors">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
        {/* Brand & Subtitle */}
        <div className="flex items-center space-x-3.5">
          <div className="p-2.5 bg-gradient-to-br from-emerald-950 to-slate-900 border border-emerald-500/30 rounded-2xl shadow-lg shadow-emerald-950/50 flex items-center justify-center group hover:border-emerald-500/60 transition">
            <Shield className="w-6 h-6 text-emerald-400 group-hover:scale-105 transition-transform" />
          </div>
          <div>
            <div className="flex items-center space-x-2.5">
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white font-display">
                {t.appTitle}
              </h1>
              <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-950/90 text-emerald-400 border border-emerald-500/30 shadow-sm">
                Private Vault
              </span>
            </div>
            <p className="text-xs text-slate-400 hidden sm:block font-medium">
              {t.appSubtitle}
            </p>
          </div>
        </div>

        {/* Date Display */}
        <div className="hidden md:flex flex-col items-center justify-center px-4 py-1.5 rounded-2xl bg-[#0d131f]/90 border border-slate-800/80 text-xs shadow-inner">
          <div className="flex items-center space-x-1.5 font-semibold text-slate-200">
            <CalendarIcon className="w-3.5 h-3.5 text-emerald-400" />
            <span>{gregorianDay}, {gregorianDate}</span>
          </div>
          <div className="text-[11px] text-amber-400/90 font-serif font-medium">
            {hijriDate}
          </div>
        </div>

        {/* Actions Controls */}
        <div className="flex items-center space-x-2.5 ml-auto">
          {/* Language Toggle */}
          <button
            onClick={onLanguageToggle}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-[#0e1626] hover:bg-[#141f36] border border-slate-800/80 text-xs font-semibold text-slate-200 transition shadow-sm"
            title="Switch Language"
          >
            <Globe className="w-4 h-4 text-emerald-400" />
            <span>{language === 'en' ? 'বাংলা' : 'English'}</span>
          </button>

          {/* Theme Toggle */}
          <button
            onClick={onThemeToggle}
            className="p-2 rounded-xl bg-[#0e1626] hover:bg-[#141f36] border border-slate-800/80 text-slate-300 transition shadow-sm"
            title="Toggle Theme"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-blue-400" />}
          </button>

          {/* Emergency Panic Button */}
          <button
            onClick={() => window.location.href = 'https://google.com'}
            className="p-2 rounded-xl bg-rose-900/50 hover:bg-rose-800 border border-rose-500/50 text-rose-300 transition shadow-sm flex items-center space-x-1"
            title={language === 'bn' ? 'জরুরী প্রস্থান' : 'Emergency Exit'}
          >
            <Shield className="w-4 h-4" />
          </button>
          
          {/* Lock Session Button */}
          {onLockSession && (
            <button
              onClick={onLockSession}
              className="p-2 rounded-xl bg-[#1c121e] hover:bg-[#28182b] border border-rose-500/30 text-rose-300 transition shadow-sm"
              title={language === 'bn' ? 'ওয়েবসাইট লক করুন' : 'Lock Private Session'}
            >
              <Lock className="w-4 h-4" />
            </button>
          )}

          {/* Settings Modal Toggle */}
          <button
            onClick={onOpenSettings}
            className="p-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white border border-emerald-400/30 transition shadow-md shadow-emerald-950/50"
            title="Database & Preferences Settings"
          >
            <Database className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
