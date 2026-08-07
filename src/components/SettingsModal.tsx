import React, { useState, useEffect } from 'react';
import { Language, UserSettings } from '../types';
import { UI_TRANSLATIONS } from '../utils/translations';
import { Database, Download, Shield, X, Save, KeyRound, Server, CheckCircle2, AlertCircle, RefreshCw, Lock, Eye, EyeOff } from 'lucide-react';

interface SettingsModalProps {
  language: Language;
  settings: UserSettings;
  onClose: () => void;
  onSaveSettings: (newSettings: Partial<UserSettings>) => void;
  onExportCsv: () => void;
  onExportJson: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  language,
  settings,
  onClose,
  onSaveSettings,
  onExportCsv,
  onExportJson
}) => {
  const t = UI_TRANSLATIONS[language];
  const [activeTab, setActiveTab] = useState<'general' | 'security' | 'mysql' | 'backup'>('general');
  const [userName, setUserName] = useState(settings.userName || 'Servant of Allah');
  const [hideSensitive, setHideSensitive] = useState(settings.hideSensitiveCategories || false);
  const [securityLockEnabled, setSecurityLockEnabled] = useState(settings.securityLockEnabled || false);
  const [securityPin, setSecurityPin] = useState(settings.securityPin || '1234');
  
  const [showPin, setShowPin] = useState(false);
  const [dbStatus, setDbStatus] = useState<any>(null);

  // MySQL Test Connection state
  const [mysqlHost, setMysqlHost] = useState('');
  const [mysqlPort, setMysqlPort] = useState('3306');
  const [mysqlUser, setMysqlUser] = useState('');
  const [mysqlPassword, setMysqlPassword] = useState('');
  const [mysqlDatabase, setMysqlDatabase] = useState('');
  const [testingDb, setTestingDb] = useState(false);
  const [testResult, setTestResult] = useState<{ success: boolean; message: string; details?: any } | null>(null);

  useEffect(() => {
    fetch('/api/db/status')
      .then((res) => res.json())
      .then((data) => {
        setDbStatus(data);
        if (data.mysqlHost && data.mysqlHost !== 'Not configured') {
          setMysqlHost(data.mysqlHost);
          setMysqlDatabase(data.mysqlDatabase || '');
        }
      })
      .catch((err) => console.error('Error loading db status:', err));
  }, []);

  const handleTestMysql = async () => {
    if (!mysqlHost || !mysqlUser) {
      setTestResult({
        success: false,
        message: language === 'bn' ? 'দয়া করে হোস্ট (Host) এবং ইউজার (User) প্রদান করুন।' : 'Please enter MySQL Host and Username to test connection.'
      });
      return;
    }

    setTestingDb(true);
    setTestResult(null);

    try {
      const res = await fetch('/api/db/test-connection', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          host: mysqlHost,
          port: mysqlPort,
          user: mysqlUser,
          password: mysqlPassword,
          database: mysqlDatabase
        })
      });

      const data = await res.json();
      setTestResult(data);
    } catch (e: any) {
      setTestResult({
        success: false,
        message: language === 'bn' ? 'সার্ভারের সাথে যোগাযোগে ত্রুটি ঘটেছে।' : 'Failed to reach backend API endpoint to test connection.'
      });
    } finally {
      setTestingDb(false);
    }
  };

  const handleSave = () => {
    onSaveSettings({
      userName,
      hideSensitiveCategories: hideSensitive,
      securityLockEnabled,
      securityPin
    });

    // Save security PIN backend endpoint
    fetch('/api/auth/set-pin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ newPin: securityPin, securityLockEnabled })
    }).catch(e => console.error(e));

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-[#0b0f17] border border-slate-800/90 rounded-2xl w-full max-w-xl p-6 text-slate-100 shadow-2xl space-y-5 max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-3.5 border-b border-slate-800/80">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 bg-[#081f18] border border-emerald-500/30 rounded-xl text-emerald-400">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-100 uppercase tracking-wide font-display">
                {t.settings} & {language === 'bn' ? 'সিকিউরিটি' : 'Security'}
              </h2>
              <p className="text-[11px] text-slate-400 font-medium">
                {language === 'bn' ? 'ব্যক্তিগত ওয়েবসাইট নিরাপত্তা ও ডেটাবেজ কনফিগারেশন' : 'Personal Website Security, PIN Protection & Database Engine'}
              </p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-xl bg-[#121824] text-slate-400 hover:text-white border border-slate-800">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-slate-800/80 gap-1 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('general')}
            className={`px-3 py-2 rounded-t-xl transition-all border-b-2 flex items-center space-x-1.5 ${
              activeTab === 'general' ? 'border-emerald-500 text-emerald-400 bg-[#121824]' : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Shield className="w-3.5 h-3.5" />
            <span>{language === 'bn' ? 'সাধারণ' : 'General'}</span>
          </button>
          <button
            onClick={() => setActiveTab('security')}
            className={`px-3 py-2 rounded-t-xl transition-all border-b-2 flex items-center space-x-1.5 ${
              activeTab === 'security' ? 'border-emerald-500 text-emerald-400 bg-[#121824]' : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Lock className="w-3.5 h-3.5" />
            <span>{language === 'bn' ? 'ওয়েবসাইট লক & পিন' : 'Security PIN Lock'}</span>
          </button>
          <button
            onClick={() => setActiveTab('mysql')}
            className={`px-3 py-2 rounded-t-xl transition-all border-b-2 flex items-center space-x-1.5 ${
              activeTab === 'mysql' ? 'border-emerald-500 text-emerald-400 bg-[#121824]' : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Database className="w-3.5 h-3.5 text-amber-400" />
            <span>{language === 'bn' ? 'MySQL টেস্ট' : 'MySQL Tester'}</span>
          </button>
          <button
            onClick={() => setActiveTab('backup')}
            className={`px-3 py-2 rounded-t-xl transition-all border-b-2 flex items-center space-x-1.5 ${
              activeTab === 'backup' ? 'border-emerald-500 text-emerald-400 bg-[#121824]' : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Download className="w-3.5 h-3.5" />
            <span>{language === 'bn' ? 'ব্যাকআপ' : 'Backup'}</span>
          </button>
        </div>

        {/* Tab 1: General Settings */}
        {activeTab === 'general' && (
          <div className="space-y-4 text-xs">
            <div>
              <label className="block font-semibold text-slate-300 mb-1">
                {language === 'bn' ? 'ব্যবহারকারীর নাম / পরিচয়' : 'User Display Name / Identity'}
              </label>
              <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="w-full bg-[#080c14] border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-slate-100 focus:outline-none focus:border-emerald-500 font-semibold"
              />
            </div>

            <div className="flex items-center justify-between p-3.5 rounded-2xl bg-[#121824]/60 border border-slate-800/80">
              <div>
                <div className="font-bold text-slate-200">
                  {language === 'bn' ? 'সংবেদনশীল বিষয় লুকিয়ে রাখা' : 'Hide Sensitive Category Titles'}
                </div>
                <div className="text-[11px] text-slate-400 font-medium">
                  {language === 'bn' ? 'গোপনীয়তার জন্য কাস্টম টেক্সট রিডাক্ট করতে পারেন' : 'Mask explicit sensitivity labels for privacy'}
                </div>
              </div>
              <input
                type="checkbox"
                checked={hideSensitive}
                onChange={(e) => setHideSensitive(e.target.checked)}
                className="w-4 h-4 accent-emerald-500 rounded cursor-pointer"
              />
            </div>

            <div className="p-3.5 rounded-2xl bg-[#0d131f] border border-slate-800 text-[11px] text-slate-300 space-y-1">
              <div className="font-bold text-emerald-400 flex items-center space-x-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>{language === 'bn' ? 'অনলাইন সার্ভার প্রস্তুত:' : 'Online Server Compatibility:'}</span>
              </div>
              <p className="text-slate-400 leading-relaxed">
                {language === 'bn'
                  ? 'এই ওয়েবসাইটটি যেকোনো অনলাইন PHP/Node/cPanel/InfinityFree সার্ভারে হোস্টিংয়ের জন্য সম্পূর্ণ উপযোগী।'
                  : 'Fully compliant for online deployment on cPanel, Node.js, Cloud Run, or PHP/MySQL shared hosting environments.'}
              </p>
            </div>
          </div>
        )}

        {/* Tab 2: Security & Lock Settings */}
        {activeTab === 'security' && (
          <div className="space-y-4 text-xs">
            <div className="p-3.5 rounded-2xl bg-emerald-950/30 border border-emerald-500/30 space-y-1">
              <div className="font-bold text-emerald-300 flex items-center space-x-1.5">
                <Shield className="w-4 h-4" />
                <span>{language === 'bn' ? 'অনলাইন সিকিউরিটি লক' : 'Online Hosting PIN Lock'}</span>
              </div>
              <p className="text-[11px] text-slate-300 leading-relaxed">
                {language === 'bn'
                  ? 'যেহেতু এটি একটি ব্যক্তিগত আমলনামা ও নফস নিয়ন্ত্রণ ওয়েবসাইট, অনলাইনে হোস্ট করার সময় অন্য কারো যেন অনুমতি ছাড়া অ্যাক্সেস না থাকে তার জন্য সিকিউরিটি পিন লক অ্যাক্টিভ করুন।'
                  : 'Protect your sensitive self-accountability log when hosting online. Anyone visiting your URL must enter your secure Security PIN code.'}
              </p>
            </div>

            <div className="flex items-center justify-between p-3.5 rounded-2xl bg-[#121824]/60 border border-slate-800/80">
              <div>
                <div className="font-bold text-slate-200">
                  {language === 'bn' ? 'সিকিউরিটি লক চালুকরণ' : 'Enable Security PIN Protection'}
                </div>
                <div className="text-[11px] text-slate-400">
                  {language === 'bn' ? 'সাইট খুলতে ৪ সংখ্যার পিন পাসওয়ার্ড চাইবে' : 'Prompts for a 4-digit PIN code upon opening'}
                </div>
              </div>
              <input
                type="checkbox"
                checked={securityLockEnabled}
                onChange={(e) => setSecurityLockEnabled(e.target.checked)}
                className="w-4 h-4 accent-emerald-500 rounded cursor-pointer"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-300 mb-1">
                {language === 'bn' ? 'সিকিউরিটি পিন কোড সেট করুন (Default: 1234)' : 'Security PIN Password (Default: 1234)'}
              </label>
              <div className="relative">
                <input
                  type={showPin ? 'text' : 'password'}
                  maxLength={10}
                  value={securityPin}
                  onChange={(e) => setSecurityPin(e.target.value)}
                  placeholder="e.g. 1234"
                  className="w-full bg-[#080c14] border border-slate-700/80 rounded-xl pl-3.5 pr-10 py-2.5 text-slate-100 font-mono font-bold tracking-widest text-sm focus:outline-none focus:border-emerald-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPin(!showPin)}
                  className="absolute right-3 top-2.5 text-slate-400 hover:text-white"
                >
                  {showPin ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-[#080c14] border border-slate-800 text-[11px] text-slate-400 space-y-1">
              <div className="font-semibold text-slate-200">🔒 Security Features Active:</div>
              <ul className="list-disc list-inside space-y-0.5 text-slate-400">
                <li>Strict JSON Request Payload Sanitization</li>
                <li>XSS & SQL Injection Escaped Queries</li>
                <li>Secure Cookie & Session Timeout Protection</li>
              </ul>
            </div>
          </div>
        )}

        {/* Tab 3: MySQL Connection Live Tester */}
        {activeTab === 'mysql' && (
          <div className="space-y-3.5 text-xs">
            <div className="p-3 rounded-xl bg-[#121824] border border-slate-800 flex items-center justify-between">
              <div>
                <div className="font-bold text-slate-200">Current Server Database Mode:</div>
                <div className="text-[11px] text-slate-400">
                  {dbStatus?.mysqlConnected ? `Active MySQL Database: ${dbStatus.mysqlDatabase}` : 'Embedded Local JSON Database (Ready for MySQL Sync)'}
                </div>
              </div>
              <span className={`px-2.5 py-1 rounded-lg text-[10px] font-bold border uppercase ${dbStatus?.mysqlConnected ? 'bg-emerald-950 text-emerald-300 border-emerald-500/30' : 'bg-amber-950 text-amber-300 border-amber-500/30'}`}>
                {dbStatus?.mysqlConnected ? 'MySQL Connected' : 'Local Engine'}
              </span>
            </div>

            <div className="space-y-2">
              <div className="font-bold text-slate-200 uppercase tracking-wider text-[11px] flex items-center space-x-1.5 text-amber-400">
                <Server className="w-3.5 h-3.5" />
                <span>{language === 'bn' ? 'MySQL কানেকশন লাইভ টেস্ট' : 'MySQL Credentials Live Connection Test'}</span>
              </div>

              <div className="p-2.5 rounded-xl bg-amber-950/30 border border-amber-500/30 text-[11px] text-amber-200/90 leading-relaxed space-y-1">
                <div className="font-bold flex items-center space-x-1.5 text-amber-300">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>{language === 'bn' ? 'InfinityFree / cPanel হোস্টিং টিপস:' : 'InfinityFree & cPanel Hosting Note:'}</span>
                </div>
                <p>
                  {language === 'bn'
                    ? 'InfinityFree ও ফ্রি ওয়েব হোস্টগুলো বাইরের নেটওয়ার্ক থেকে রিমোট MySQL অ্যাক্সেস ব্লক করে রাখে। আপনি যখন ফ্রিহোস্টিং বা cPanel-এ ফাইল আপলোড করবেন তখন তা ভেতর থেকে ক্যোয়ারি কানেক্ট হবে। লাইভ রিমোট টেস্টের জন্য Aiven, Clever Cloud বা Supabase ব্যবহার করতে পারেন।'
                    : 'Free hosts like InfinityFree block incoming remote MySQL connections from outside their servers. When your site files are uploaded directly on InfinityFree or cPanel, PHP/Node connects locally. For external cloud testing, use Aiven, Clever Cloud, or Supabase.'}
                </p>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div className="col-span-2">
                  <label className="block text-[11px] text-slate-400 mb-0.5">MySQL Host</label>
                  <input
                    type="text"
                    placeholder="e.g. sql105.infinityfree.com or localhost"
                    value={mysqlHost}
                    onChange={(e) => setMysqlHost(e.target.value)}
                    className="w-full bg-[#080c14] border border-slate-700/80 rounded-xl px-2.5 py-1.5 text-slate-100 font-mono text-[11px]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-slate-400 mb-0.5">Port</label>
                  <input
                    type="text"
                    placeholder="3306"
                    value={mysqlPort}
                    onChange={(e) => setMysqlPort(e.target.value)}
                    className="w-full bg-[#080c14] border border-slate-700/80 rounded-xl px-2.5 py-1.5 text-slate-100 font-mono text-[11px]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[11px] text-slate-400 mb-0.5">Username</label>
                  <input
                    type="text"
                    placeholder="e.g. if0_3812345"
                    value={mysqlUser}
                    onChange={(e) => setMysqlUser(e.target.value)}
                    className="w-full bg-[#080c14] border border-slate-700/80 rounded-xl px-2.5 py-1.5 text-slate-100 font-mono text-[11px]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-slate-400 mb-0.5">Password</label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={mysqlPassword}
                    onChange={(e) => setMysqlPassword(e.target.value)}
                    className="w-full bg-[#080c14] border border-slate-700/80 rounded-xl px-2.5 py-1.5 text-slate-100 font-mono text-[11px]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] text-slate-400 mb-0.5">Database Name</label>
                <input
                  type="text"
                  placeholder="e.g. if0_3812345_nafs_db"
                  value={mysqlDatabase}
                  onChange={(e) => setMysqlDatabase(e.target.value)}
                  className="w-full bg-[#080c14] border border-slate-700/80 rounded-xl px-2.5 py-1.5 text-slate-100 font-mono text-[11px]"
                />
              </div>

              <button
                type="button"
                onClick={handleTestMysql}
                disabled={testingDb}
                className="w-full py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-slate-950 font-bold text-xs shadow-md transition-all flex items-center justify-center space-x-2 disabled:opacity-50"
              >
                {testingDb ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Database className="w-4 h-4" />}
                <span>{testingDb ? (language === 'bn' ? 'কানেকশন টেস্ট করা হচ্ছে...' : 'Testing Connection...') : (language === 'bn' ? 'MySQL কানেকশন টেস্ট করুন' : 'Test MySQL Connection')}</span>
              </button>

              {testResult && (
                <div className={`p-3 rounded-xl border text-xs space-y-1 ${testResult.success ? 'bg-emerald-950/70 border-emerald-500/40 text-emerald-200' : 'bg-rose-950/70 border-rose-500/40 text-rose-200'}`}>
                  <div className="flex items-center space-x-1.5 font-bold">
                    {testResult.success ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <AlertCircle className="w-4 h-4 text-rose-400" />}
                    <span>{testResult.success ? 'Connection Successful!' : 'Connection Error'}</span>
                  </div>
                  <p className="text-[11px] leading-relaxed">{testResult.message || testResult.error}</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Tab 4: Backup & Export */}
        {activeTab === 'backup' && (
          <div className="space-y-4 text-xs">
            <div className="p-3.5 rounded-2xl bg-[#121824] border border-slate-800 space-y-1">
              <div className="font-bold text-slate-200">
                {language === 'bn' ? 'ব্যক্তিগত ডেটা ডাউনলোড ও নিরাপদ ব্যাকআপ' : 'Personal Data Export & Offsite Backup'}
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                {language === 'bn'
                  ? 'আপনার প্রতিদিনের সেলফ অ্যাকাউন্টাবিলিটি লগ, সালাত ট্র্যাকিং ও তওবার হিসাব কম্পিউটারে ডাউনলোড করে নিরাপদ ব্যাকআপ রাখুন।'
                  : 'Download your personal self-accountability records as CSV or raw JSON anytime for offsite archival and complete privacy.'}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                onClick={onExportCsv}
                className="p-3 rounded-2xl bg-[#121824] hover:bg-[#162036] border border-slate-800 text-xs font-bold text-emerald-300 transition-all flex flex-col items-center justify-center space-y-1.5"
              >
                <Download className="w-5 h-5 text-emerald-400" />
                <span>{t.exportCsv}</span>
                <span className="text-[10px] text-slate-400 font-normal">Excel/Spreadsheet Format</span>
              </button>

              <button
                onClick={onExportJson}
                className="p-3 rounded-2xl bg-[#121824] hover:bg-[#162036] border border-slate-800 text-xs font-bold text-amber-300 transition-all flex flex-col items-center justify-center space-y-1.5"
              >
                <Download className="w-5 h-5 text-amber-400" />
                <span>{t.exportJson}</span>
                <span className="text-[10px] text-slate-400 font-normal">Raw Database Backup</span>
              </button>
            </div>
          </div>
        )}

        {/* Save Action Bar */}
        <div className="flex space-x-2 pt-3 border-t border-slate-800/80">
          <button
            onClick={handleSave}
            className="flex-1 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs shadow-lg transition-all flex items-center justify-center space-x-2"
          >
            <Save className="w-4 h-4" />
            <span>{t.save}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

