import React, { useState, useEffect } from 'react';
import { DailyRecord, Language, PrayerName, PrayerStatus, PrayerType, ThemeMode, UserSettings, GoalRecord } from './types';
import { Header } from './components/Header';
import { Navigation, NavTab } from './components/Navigation';
import { DailyReminderCard } from './components/DailyReminderCard';
import { TodayScoreCard } from './components/TodayScoreCard';
import { PrayerTimes } from './components/PrayerTimes';
import { ActivityHeatmap } from './components/ActivityHeatmap';
import { DhikrCounter } from './components/DhikrCounter';
import { QuickActionsModal } from './components/QuickActionsModal';
import { SalahTracker } from './components/SalahTracker';
import { AyatulKursiTracker } from './components/AyatulKursiTracker';
import { TahajjudTracker } from './components/TahajjudTracker';
import { NafsControlPanel } from './components/NafsControlPanel';
import { BadDeedsSelector } from './components/BadDeedsSelector';
import { GoodDeedsSelector } from './components/GoodDeedsSelector';
import { TawbahPanel } from './components/TawbahPanel';
import { RewardCard } from './components/RewardCard';
import { CalendarView } from './components/CalendarView';
import { MonthlyReport } from './components/MonthlyReport';
import { YearlyReport } from './components/YearlyReport';
import { IslamicReferenceCard } from './components/IslamicReferenceCard';
import { SettingsModal } from './components/SettingsModal';
import { AIPersonalAnalysisView } from './components/AIPersonalAnalysisView';
import { SecurityLockModal } from './components/SecurityLockModal';
import { GoalsView } from './components/GoalsView';
import { Sparkles, Bot, Calendar as CalendarIcon } from 'lucide-react';

export function App() {
  const getTodayStr = () => new Date().toISOString().split('T')[0];

  const [activeTab, setActiveTab] = useState<NavTab>('dashboard');
  const [selectedDate, setSelectedDate] = useState<string>(getTodayStr());
  const [language, setLanguage] = useState<Language>('en');
  const [theme, setTheme] = useState<ThemeMode>('dark');
  const [showSettings, setShowSettings] = useState<boolean>(false);
  const [isUnlocked, setIsUnlocked] = useState<boolean>(true);
  const [masterUnlocked, setMasterUnlocked] = useState<boolean>(true);

  const [record, setRecord] = useState<DailyRecord | null>(null);
  const [monthlyRecords, setMonthlyRecords] = useState<DailyRecord[]>([]);
  const [settings, setSettings] = useState<UserSettings>({
    userName: 'Servant of Allah',
    language: 'en',
    theme: 'dark',
    weeklyTahajjudTarget: 1,
    dailyGoodDeedsTarget: 3,
    hideSensitiveCategories: false,
    useMySqlIfAvailable: true,
    notificationsEnabled: true
  });

  const [aiInsight, setAiInsight] = useState<string>('');
  const [aiLoading, setAiLoading] = useState<boolean>(false);

  // Fetch current day record
  const fetchRecordForDate = async (dateStr: string) => {
    try {
      const res = await fetch(`/api/records/date/${dateStr}`);
      if (res.ok) {
        const data = await res.json();
        setRecord(data);
      }
    } catch (err) {
      console.error('Error fetching record:', err);
    }
  };

  // Fetch Settings
  useEffect(() => {
    fetch('/api/settings')
      .then((r) => r.json())
      .then((data) => {
        if (data) {
          setSettings(data);
          if (data.language) setLanguage(data.language);
          if (data.theme) setTheme(data.theme);
          if (data.securityLockEnabled) {
            setIsUnlocked(false);
          }
        }
      })
      .catch((e) => console.error('Error fetching settings:', e));
  }, []);

  useEffect(() => {
    fetchRecordForDate(selectedDate);
  }, [selectedDate]);

  // Fetch monthly records for report
  useEffect(() => {
    const today = new Date(selectedDate);
    const start = new Date(today.getFullYear() - 1, today.getMonth(), 1).toISOString().split('T')[0]; // Last 12 months
    const end = new Date(today.getFullYear(), today.getMonth() + 1, 0).toISOString().split('T')[0];

    fetch(`/api/records/range?startDate=${start}&endDate=${end}`)
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data)) setMonthlyRecords(data);
      })
      .catch((e) => console.error('Error fetching range:', e));
  }, [selectedDate, record]);

  // Request AI Insights on load
  const triggerAiAnalysis = async () => {
    setAiLoading(true);
    try {
      const res = await fetch('/api/gemini/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ language, recentRecords: record ? [record] : [] })
      });
      if (res.ok) {
        const data = await res.json();
        setAiInsight(language === 'bn' ? data.insightBn : data.insightEn);
      }
    } catch (e) {
      console.error('AI error:', e);
    } finally {
      setAiLoading(false);
    }
  };

  const handleTriggerAiPersonalSession = async (type: 'daily' | 'weekly' | 'monthly' = 'daily') => {
    setAiLoading(true);
    try {
      const res = await fetch('/api/ai-personal-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ date: selectedDate, type, language })
      });
      if (res.ok) {
        const sessionData = await res.json();
        setRecord(prev => prev ? { ...prev, dailySession: sessionData } : prev);
      }
    } catch (e) {
      console.error('AI Personal Session error:', e);
    } finally {
      setAiLoading(false);
    }
  };

  useEffect(() => {
    if (record) {
      triggerAiAnalysis();
    }
  }, [language, selectedDate]);

  // Handlers
  const handleRecordSalah = async (prayerName: PrayerName, status: PrayerStatus, type: PrayerType, notes?: string) => {
    const res = await fetch('/api/records/salah', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ date: selectedDate, prayerName, status, type, notes })
    });
    if (res.ok) {
      const updated = await res.json();
      setRecord(updated);
    }
  };

  const handleRecordAyatulKursi = async (completed: boolean) => {
    const res = await fetch('/api/records/ayatul-kursi', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ date: selectedDate, completed })
    });
    if (res.ok) {
      const updated = await res.json();
      setRecord(updated);
    }
  };

  const handleRecordTahajjud = async (completed: boolean, rakahs: number, notes?: string) => {
    const res = await fetch('/api/records/tahajjud', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ date: selectedDate, completed, rakahs, notes })
    });
    if (res.ok) {
      const updated = await res.json();
      setRecord(updated);
    }
  };

  const handleRecordBadDeed = async (
    optionId: string,
    customName?: string,
    category?: string,
    severity?: number,
    classification?: any,
    notes?: string,
    quantity?: number,
    countable?: boolean,
    trigger?: string
  ) => {
    const res = await fetch('/api/records/bad-deed', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        date: selectedDate,
        optionId,
        customName,
        category,
        severity,
        classification,
        notes,
        quantity,
        countable,
        trigger
      })
    });
    if (res.ok) {
      const updated = await res.json();
      setRecord(updated);
    }
  };

  const handleRecordGoodDeed = async (optionId: string, name?: string, category?: string) => {
    const res = await fetch('/api/records/good-deed', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ date: selectedDate, optionId, name, category })
    });
    if (res.ok) {
      const updated = await res.json();
      setRecord(updated);
    }
  };

  const handleRecordNafsVictory = async (title: string, category: string, difficulty: number, notes?: string) => {
    const res = await fetch('/api/records/nafs-victory', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ date: selectedDate, title, category, difficulty, notes })
    });
    if (res.ok) {
      const updated = await res.json();
      setRecord(updated);
    }
  };

  const handleUpdateTawbah = async (
    tawbahId: string,
    astaghfirullahCompleted?: number,
    salatulTawbahCompleted?: boolean,
    triggerIdentified?: string,
    preventionPlan?: string
  ) => {
    const res = await fetch('/api/records/tawbah', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        date: selectedDate,
        tawbahId,
        astaghfirullahCompleted,
        salatulTawbahCompleted,
        triggerIdentified,
        preventionPlan
      })
    });
    if (res.ok) {
      const updated = await res.json();
      setRecord(updated);
    }
  };

  const handleClaimReward = async (rewardId: string, rewardName: string, reason: string) => {
    const res = await fetch('/api/records/reward', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ date: selectedDate, rewardId, rewardName, reason })
    });
    if (res.ok) {
      const updated = await res.json();
      setRecord(updated);
    }
  };

  const handleSaveSettings = async (newSet: Partial<UserSettings>) => {
    const updated = { ...settings, ...newSet };
    setSettings(updated);
    if (newSet.language) setLanguage(newSet.language);
    if (newSet.theme) setTheme(newSet.theme);

    await fetch('/api/settings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updated)
    });
  };

  const handleSaveGoals = async (goals: GoalRecord[]) => {
    await handleSaveSettings({ goals });
  };

  const handleExportCsv = () => {
    window.open('/api/export/csv', '_blank');
  };

  const handleExportJson = () => {
    const jsonStr = JSON.stringify(record || {}, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `control_my_nafs_${selectedDate}.json`;
    a.click();
  };

  return (
    <div className={`min-h-screen relative overflow-x-hidden ${theme === 'dark' ? 'bg-[#050505] text-slate-100' : 'bg-slate-100 text-slate-900'} font-sans antialiased transition-colors selection:bg-emerald-500/30 selection:text-emerald-200`}>
      {/* Background ambient lighting glows for Sophisticated Dark */}
      {theme === 'dark' && (
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
          <div className="absolute -top-40 left-1/4 w-[500px] h-[500px] bg-emerald-950/20 rounded-full blur-[120px]" />
          <div className="absolute top-1/3 -right-20 w-[450px] h-[450px] bg-amber-950/15 rounded-full blur-[140px]" />
          <div className="absolute -bottom-20 left-1/3 w-[600px] h-[600px] bg-emerald-950/15 rounded-full blur-[150px]" />
        </div>
      )}

      {/* App Header */}
      <div className="relative z-10">
        <Header
          language={language}
          theme={theme}
          settings={settings}
          selectedDate={selectedDate}
          onLanguageToggle={() => setLanguage(language === 'en' ? 'bn' : 'en')}
          onThemeToggle={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          onOpenSettings={() => setShowSettings(true)}
          onLockSession={() => setIsUnlocked(false)}
        />

        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row">
          {/* Navigation Bar */}
          <Navigation activeTab={activeTab} language={language} onSelectTab={setActiveTab} />

          {/* Main Content View */}
          <main className="flex-1 p-4 lg:p-6 space-y-6 max-w-5xl mx-auto w-full relative z-10">
            {/* Selected Date Picker Bar */}
            <div className="bg-[#0b0f17]/80 backdrop-blur-md border border-slate-800/80 rounded-2xl p-3 px-4 flex flex-wrap items-center justify-between gap-3 text-xs shadow-xl shadow-black/40">
              <div className="flex items-center space-x-2">
                <CalendarIcon className="w-4 h-4 text-emerald-400" />
                <span className="font-semibold text-slate-300">
                  {language === 'bn' ? 'তারিখ নির্বাচন করুন:' : 'Viewing Record For:'}
                </span>
              </div>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="bg-[#121824] border border-slate-700/80 text-emerald-400 font-bold px-3 py-1.5 rounded-xl focus:outline-none focus:border-emerald-500/60 transition shadow-inner"
              />
            </div>

            {/* AI Automated Insight Banner (Non-Chatbot) */}
            {aiInsight && (
              <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-950/90 via-[#0b0f17] to-slate-900/90 border border-emerald-500/30 shadow-xl shadow-emerald-950/20 text-xs space-y-1.5 relative overflow-hidden group">
                <div className="absolute -right-10 -bottom-10 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl group-hover:bg-emerald-500/20 transition-all duration-500" />
                <div className="flex items-center space-x-2 text-emerald-400 font-bold uppercase tracking-wider text-[11px]">
                  <Bot className="w-4 h-4 text-emerald-400 animate-pulse" />
                  <span>{language === 'bn' ? 'স্বয়ংক্রিয় এআই নফস অ্যানালিসিস' : 'Automated AI Nafs Insight'}</span>
                </div>
                <p className="text-slate-200 leading-relaxed font-serif italic text-sm relative z-10">{aiInsight}</p>
              </div>
            )}

          {/* Render Views based on Tab */}
          {record && (
            <>
              {activeTab === 'dashboard' && (
                <div className="space-y-6">
                  <PrayerTimes language={language} />
                  <DailyReminderCard language={language} />
                  <TodayScoreCard record={record} language={language} />
                  <ActivityHeatmap language={language} records={monthlyRecords} />
                  <DhikrCounter language={language} onSaveDhikr={(name, count) => handleRecordGoodDeed('custom', `${name} (${count}x)`, 'Dhikr')} />
                  <AIPersonalAnalysisView
                    record={record}
                    language={language}
                    onTriggerSession={handleTriggerAiPersonalSession}
                    loading={aiLoading}
                  />
                  <QuickActionsModal
                    language={language}
                    selectedDate={selectedDate}
                    onRecordSalah={handleRecordSalah}
                    onRecordAyatulKursi={handleRecordAyatulKursi}
                    onRecordTahajjud={handleRecordTahajjud}
                    onRecordGoodDeed={(name, category) => handleRecordGoodDeed('custom', name, category)}
                    onRecordBadDeed={(name, category, severity) => handleRecordBadDeed('custom', name, category, severity)}
                    onRecordNafsVictory={(title, category, difficulty) => handleRecordNafsVictory(title, category, difficulty)}
                    onOpenTab={setActiveTab}
                  />
                  <SalahTracker record={record} language={language} onRecordSalah={handleRecordSalah} />
                  <NafsControlPanel record={record} language={language} onRecordNafsVictory={handleRecordNafsVictory} />
                </div>
              )}

              {activeTab === 'ai_analysis' && (
                <AIPersonalAnalysisView
                  record={record}
                  language={language}
                  onTriggerSession={handleTriggerAiPersonalSession}
                  loading={aiLoading}
                />
              )}

              {activeTab === 'goals' && (
                <GoalsView 
                  language={language} 
                  goals={settings.goals || []} 
                  onSaveGoals={handleSaveGoals} 
                />
              )}

              {activeTab === 'salah' && (
                <SalahTracker record={record} language={language} onRecordSalah={handleRecordSalah} />
              )}

              {activeTab === 'ayatul_kursi' && (
                <AyatulKursiTracker record={record} language={language} onToggle={handleRecordAyatulKursi} />
              )}

              {activeTab === 'tahajjud' && (
                <TahajjudTracker record={record} language={language} onRecordTahajjud={handleRecordTahajjud} />
              )}

              {activeTab === 'nafs_control' && (
                <NafsControlPanel record={record} language={language} onRecordNafsVictory={handleRecordNafsVictory} />
              )}

              {activeTab === 'bad_deeds' && (
                <BadDeedsSelector record={record} language={language} onRecordBadDeed={handleRecordBadDeed} />
              )}

              {activeTab === 'good_deeds' && (
                <GoodDeedsSelector record={record} language={language} onRecordGoodDeed={handleRecordGoodDeed} />
              )}

              {activeTab === 'tawbah' && (
                <TawbahPanel record={record} language={language} onUpdateTawbah={handleUpdateTawbah} />
              )}

              {activeTab === 'rewards' && (
                <RewardCard record={record} language={language} onClaimReward={handleClaimReward} />
              )}

              {activeTab === 'analytics' && (
                <MonthlyReport language={language} records={monthlyRecords} />
              )}

              {activeTab === 'monthly' && (
                <MonthlyReport language={language} records={monthlyRecords} />
              )}

              {activeTab === 'yearly' && (
                <YearlyReport language={language} records={monthlyRecords} />
              )}

              {activeTab === 'calendar' && (
                <CalendarView language={language} selectedDate={selectedDate} onSelectDate={setSelectedDate} />
              )}

              {activeTab === 'references' && (
                <IslamicReferenceCard language={language} />
              )}
            </>
          )}
        </main>
      </div>
    </div>

      {/* Settings Modal */}
      {showSettings && (
        <SettingsModal
          language={language}
          settings={settings}
          onClose={() => setShowSettings(false)}
          onSaveSettings={handleSaveSettings}
          onExportCsv={handleExportCsv}
          onExportJson={handleExportJson}
        />
      )}

      {/* Security PIN Lock Overlay */}
      {masterUnlocked && !isUnlocked && (
        <SecurityLockModal
          language={language}
          onUnlockSuccess={() => setIsUnlocked(true)}
        />
      )}
    </div>
  );
}

export default App;
