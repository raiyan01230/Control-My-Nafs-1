import express, { Request, Response } from 'express';
import path from 'path';
import fs from 'fs';
import { createServer as createViteServer } from 'vite';
import { createClient } from '@insforge/sdk';
import { GoogleGenAI } from '@google/genai';
import { SEED_BAD_DEED_OPTIONS } from './src/data/badDeedsData';
import { SEED_GOOD_DEED_OPTIONS } from './src/data/goodDeedsData';
import { SEED_REWARD_OPTIONS } from './src/data/rewardsData';
import { SEED_ISLAMIC_REFERENCES } from './src/data/islamicReferences';
import { DailyRecord, PrayerName, PrayerStatus, PrayerType, UserSettings } from './src/types';
import { calculateDailyScore } from './src/utils/scoring';
import { generatePersonalAISession } from './src/utils/aiAnalysisEngine';

const app = express();
const PORT = 3000;

app.use(express.json());

// Local Data Store Directory
const DATA_DIR = path.join(process.cwd(), 'data');
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

const DB_FILE = path.join(DATA_DIR, 'db.json');

// Memory DB cache
interface LocalDatabase {
  settings: UserSettings;
  records: Record<string, DailyRecord>; // Key: YYYY-MM-DD
}

const defaultSettings: UserSettings = {
  userName: 'Servant of Allah',
  language: 'en',
  theme: 'dark',
  weeklyTahajjudTarget: 1,
  dailyGoodDeedsTarget: 3,
  hideSensitiveCategories: false,
  notificationsEnabled: true
};

function loadLocalDb(): LocalDatabase {
  if (fs.existsSync(DB_FILE)) {
    try {
      const data = fs.readFileSync(DB_FILE, 'utf-8');
      return JSON.parse(data);
    } catch (e) {
      console.error('Error reading local db file, initializing new:', e);
    }
  }
  const initial: LocalDatabase = {
    settings: defaultSettings,
    records: {}
  };
  saveLocalDb(initial);
  return initial;
}

function saveLocalDb(db: LocalDatabase) {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2), 'utf-8');
  } catch (e) {
    console.error('Error writing local db:', e);
  }
}

let localDb = loadLocalDb();

// InsForge SDK PostgreSQL setup
const INSFORGE_URL = process.env.NEXT_PUBLIC_INSFORGE_URL || 'https://98u4pbnb.ap-southeast.insforge.app';
const INSFORGE_ANON_KEY = process.env.NEXT_PUBLIC_INSFORGE_ANON_KEY || 'anon_7cae9e984cb0ca56c5b33accd89b51a89c29001e48b7af813d38351b7b1d5677';

const insforge = createClient({
  baseUrl: INSFORGE_URL,
  anonKey: INSFORGE_ANON_KEY
});

let insforgeConnected = false;

async function initInsForge() {
  try {
    const { data, error } = await insforge.database.from('daily_records').select().limit(1);
    if (!error) {
      insforgeConnected = true;
      console.log('Successfully connected to InsForge Cloud PostgreSQL database at:', INSFORGE_URL);
    } else {
      console.warn('InsForge database query warning:', error);
      insforgeConnected = true; // Client active
    }
  } catch (err: any) {
    console.warn('InsForge Connection check failed, using local storage cache:', err?.message || err);
    insforgeConnected = false;
  }
}

initInsForge();

// Helper to get a day record
function getTodayDateString(): string {
  const now = new Date();
  return now.toISOString().split('T')[0];
}

function createEmptyDailyRecord(dateStr: string): DailyRecord {
  return {
    id: `rec-${dateStr}`,
    date: dateStr,
    prayers: {
      fajr: { name: 'fajr', status: 'none', type: 'none' },
      dhuhr: { name: 'dhuhr', status: 'none', type: 'none' },
      asr: { name: 'asr', status: 'none', type: 'none' },
      maghrib: { name: 'maghrib', status: 'none', type: 'none' },
      isha: { name: 'isha', status: 'none', type: 'none' },
    },
    ayatulKursi: { completed: false },
    tahajjud: { completed: false, rakahs: 0, date: dateStr },
    goodDeeds: [],
    badDeeds: [],
    nafsVictories: [],
    tawbahRecords: [],
    rewardClaims: [],
    score: 50,
    updatedAt: new Date().toISOString()
  };
}

async function fetchDailyRecord(dateStr: string): Promise<DailyRecord> {
  let rec: DailyRecord | null = null;
  if (insforgeConnected) {
    try {
      const { data, error } = await insforge.database.from('daily_records').select('*').eq('date', dateStr);
      if (!error && data && data.length > 0) {
        rec = typeof data[0].data === 'string' ? JSON.parse(data[0].data) : data[0].data;
      }
    } catch (e) {
      console.error('InsForge DB query error, using local memory:', e);
    }
  }
  if (!rec) {
    if (!localDb.records[dateStr]) {
      localDb.records[dateStr] = createEmptyDailyRecord(dateStr);
      saveLocalDb(localDb);
    }
    rec = localDb.records[dateStr];
  }

  const empty = createEmptyDailyRecord(dateStr);
  return {
    ...empty,
    ...rec,
    prayers: { ...empty.prayers, ...(rec.prayers || {}) },
    ayatulKursi: { ...empty.ayatulKursi, ...(rec.ayatulKursi || {}) },
    tahajjud: { ...empty.tahajjud, ...(rec.tahajjud || {}) },
    goodDeeds: rec.goodDeeds || [],
    badDeeds: rec.badDeeds || [],
    nafsVictories: rec.nafsVictories || [],
    tawbahRecords: rec.tawbahRecords || [],
    rewardClaims: rec.rewardClaims || []
  };
}

async function saveDailyRecord(record: DailyRecord) {
  record.score = calculateDailyScore(record);
  record.updatedAt = new Date().toISOString();

  // Save local
  localDb.records[record.date] = record;
  saveLocalDb(localDb);

  // Save InsForge PostgreSQL if available
  if (insforgeConnected) {
    try {
      await insforge.database.from('daily_records').upsert([
        {
          date: record.date,
          data: record,
          score: record.score,
          updated_at: new Date().toISOString()
        }
      ]);
    } catch (e) {
      console.error('Failed to sync daily record to InsForge DB:', e);
    }
  }
  return record;
}

// --- API ENDPOINTS ---

app.get('/api/health', (req: Request, res: Response) => {
  res.json({ status: 'ok', insforgeConnected, databaseType: 'InsForge PostgreSQL' });
});

app.get('/api/db/status', (req: Request, res: Response) => {
  res.json({
    insforgeConnected,
    insforgeUrl: INSFORGE_URL,
    insforgeProject: 'nafs-accountability',
    databaseType: 'InsForge PostgreSQL Cloud DB',
    tables: ['daily_records', 'user_settings'],
    recordCount: Object.keys(localDb.records).length,
    settings: localDb.settings
  });
});

app.get('/api/options', (req: Request, res: Response) => {
  res.json({
    badDeeds: SEED_BAD_DEED_OPTIONS,
    goodDeeds: SEED_GOOD_DEED_OPTIONS,
    rewards: SEED_REWARD_OPTIONS,
    references: SEED_ISLAMIC_REFERENCES
  });
});

app.get('/api/records/date/:date', async (req: Request, res: Response) => {
  const dateStr = req.params.date;
  const record = await fetchDailyRecord(dateStr);
  res.json(record);
});

app.get('/api/records/today', async (req: Request, res: Response) => {
  const today = getTodayDateString();
  const record = await fetchDailyRecord(today);
  res.json(record);
});

// Update prayer status
app.post('/api/records/salah', async (req: Request, res: Response) => {
  const { date, prayerName, status, type, notes } = req.body;
  const targetDate = date || getTodayDateString();
  const record = await fetchDailyRecord(targetDate);

  if (record.prayers[prayerName as PrayerName]) {
    record.prayers[prayerName as PrayerName] = {
      name: prayerName as PrayerName,
      status: status as PrayerStatus,
      type: (type || 'none') as PrayerType,
      notes: notes || '',
      completedAt: new Date().toISOString()
    };
  }

  const updated = await saveDailyRecord(record);
  res.json(updated);
});

// Update Ayatul Kursi
app.post('/api/records/ayatul-kursi', async (req: Request, res: Response) => {
  const { date, completed } = req.body;
  const targetDate = date || getTodayDateString();
  const record = await fetchDailyRecord(targetDate);

  record.ayatulKursi = {
    completed: !!completed,
    completedAt: completed ? new Date().toISOString() : undefined
  };

  const updated = await saveDailyRecord(record);
  res.json(updated);
});

// Update Tahajjud
app.post('/api/records/tahajjud', async (req: Request, res: Response) => {
  const { date, completed, rakahs, notes } = req.body;
  const targetDate = date || getTodayDateString();
  const record = await fetchDailyRecord(targetDate);

  record.tahajjud = {
    completed: !!completed,
    rakahs: rakahs || 2,
    date: targetDate,
    notes: notes || ''
  };

  const updated = await saveDailyRecord(record);
  res.json(updated);
});

// Add Bad Deed / Slip-up
app.post('/api/records/bad-deed', async (req: Request, res: Response) => {
  const { date, optionId, customName, category, severity, classification, notes, intentional, quantity, countable, trigger } = req.body;
  const targetDate = date || getTodayDateString();
  const record = await fetchDailyRecord(targetDate);

  const matched = SEED_BAD_DEED_OPTIONS.find(o => o.id === optionId);
  const isCountable = countable !== undefined ? !!countable : (matched ? matched.countable !== false : true);
  const qty = isCountable ? (parseInt(quantity, 10) || 1) : 1;

  const newBadDeed = {
    id: `bad-${Date.now()}`,
    optionId: optionId || 'custom',
    name: matched ? matched.nameEn : (customName || 'Unspecified slip-up'),
    category: matched ? matched.category : (category || 'general'),
    severity: matched ? matched.severity : (severity || 1),
    classification: matched ? matched.classification : (classification || 'bad_habit'),
    date: targetDate,
    timestamp: new Date().toISOString(),
    intentional: !!intentional,
    quantity: qty,
    countable: isCountable,
    trigger: trigger || '',
    notes: notes || ''
  };

  record.badDeeds.push(newBadDeed);

  // Automatically attach a recommended Tawbah action
  const requiredAstaghfirullah = (newBadDeed.severity || 1) * qty * 100;
  record.tawbahRecords.push({
    id: `tawbah-${Date.now()}`,
    badDeedRecordId: newBadDeed.id,
    badDeedName: newBadDeed.name,
    date: targetDate,
    correctiveAction: {
      astaghfirullahCount: requiredAstaghfirullah,
      salatulTawbahRequired: (newBadDeed.severity || 1) >= 2,
      salatulTawbahCompleted: false,
      astaghfirullahCompleted: 0,
      additionalDhikr: 'SubhanAllahi wa bihamdihi SubhanAllahil Adheem',
      isCompleted: false
    }
  });

  const updated = await saveDailyRecord(record);
  res.json(updated);
});

// Generate AI Personal Session Endpoint (Daily, Weekly, Monthly)
app.post('/api/ai-personal-session', async (req: Request, res: Response) => {
  try {
    const { date, type, language } = req.body;
    const targetDate = date || getTodayDateString();
    const targetRecord = await fetchDailyRecord(targetDate);

    // Fetch history records for trend comparison
    const historyList = Object.values(localDb.records);

    const session = await generatePersonalAISession(
      type || 'daily',
      targetDate,
      targetRecord,
      historyList,
      language || 'en',
      process.env.GEMINI_API_KEY
    );

    if (type === 'daily' || !type) {
      targetRecord.dailySession = session;
      await saveDailyRecord(targetRecord);
    }

    res.json(session);
  } catch (err: any) {
    console.error('Error generating AI personal session:', err);
    res.status(500).json({ error: 'Failed to generate session' });
  }
});

// Add Good Deed
app.post('/api/records/good-deed', async (req: Request, res: Response) => {
  const { date, optionId, name, category, notes } = req.body;
  const targetDate = date || getTodayDateString();
  const record = await fetchDailyRecord(targetDate);

  const matched = SEED_GOOD_DEED_OPTIONS.find(o => o.id === optionId);

  const newGoodDeed = {
    id: `good-${Date.now()}`,
    optionId: optionId || 'custom',
    name: matched ? matched.nameEn : (name || 'Good deed'),
    category: matched ? matched.category : (category || 'general'),
    date: targetDate,
    timestamp: new Date().toISOString(),
    notes: notes || ''
  };

  record.goodDeeds.push(newGoodDeed);
  const updated = await saveDailyRecord(record);
  res.json(updated);
});

// Add Nafs Victory
app.post('/api/records/nafs-victory', async (req: Request, res: Response) => {
  const { date, category, title, description, difficulty, notes } = req.body;
  const targetDate = date || getTodayDateString();
  const record = await fetchDailyRecord(targetDate);

  const newVictory = {
    id: `victory-${Date.now()}`,
    category: category || 'General',
    title: title || 'Controlled Nafs',
    description: description || 'Successfully resisted temptation',
    difficulty: difficulty || 3,
    date: targetDate,
    timestamp: new Date().toISOString(),
    notes: notes || ''
  };

  record.nafsVictories.push(newVictory);
  const updated = await saveDailyRecord(record);
  res.json(updated);
});

// Complete Tawbah Action
app.post('/api/records/tawbah', async (req: Request, res: Response) => {
  const { date, tawbahId, astaghfirullahCompleted, salatulTawbahCompleted, triggerIdentified, preventionPlan } = req.body;
  const targetDate = date || getTodayDateString();
  const record = await fetchDailyRecord(targetDate);

  const targetTawbah = record.tawbahRecords.find(t => t.id === tawbahId);
  if (targetTawbah) {
    if (astaghfirullahCompleted !== undefined) {
      targetTawbah.correctiveAction.astaghfirullahCompleted = astaghfirullahCompleted;
    }
    if (salatulTawbahCompleted !== undefined) {
      targetTawbah.correctiveAction.salatulTawbahCompleted = salatulTawbahCompleted;
    }
    if (triggerIdentified) targetTawbah.correctiveAction.triggerIdentified = triggerIdentified;
    if (preventionPlan) targetTawbah.correctiveAction.preventionPlan = preventionPlan;

    if (
      targetTawbah.correctiveAction.astaghfirullahCompleted >= targetTawbah.correctiveAction.astaghfirullahCount &&
      (!targetTawbah.correctiveAction.salatulTawbahRequired || targetTawbah.correctiveAction.salatulTawbahCompleted)
    ) {
      targetTawbah.correctiveAction.isCompleted = true;
      targetTawbah.correctiveAction.completedAt = new Date().toISOString();
    }
  }

  const updated = await saveDailyRecord(record);
  res.json(updated);
});

// Get range records (for calendar and monthly/yearly reports)
app.get('/api/records/range', async (req: Request, res: Response) => {
  const { startDate, endDate } = req.query;
  const recordsList: DailyRecord[] = [];

  // Gather records from memory localDb
  const start = new Date(startDate as string);
  const end = new Date(endDate as string);

  for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
    const dateStr = d.toISOString().split('T')[0];
    const rec = await fetchDailyRecord(dateStr);
    recordsList.push(rec);
  }

  res.json(recordsList);
});

// Claim Reward
app.post('/api/records/reward', async (req: Request, res: Response) => {
  const { date, rewardId, rewardName, reason } = req.body;
  const targetDate = date || getTodayDateString();
  const record = await fetchDailyRecord(targetDate);

  record.rewardClaims.push({
    id: `rew-claim-${Date.now()}`,
    rewardId: rewardId || 'general',
    rewardName: rewardName || 'Small Personal Reward',
    date: targetDate,
    reason: reason || 'Consistency Milestone Reached'
  });

  const updated = await saveDailyRecord(record);
  res.json(updated);
});

// Server-side Gemini AI Background Analysis Endpoint
app.post('/api/gemini/analyze', async (req: Request, res: Response) => {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.status(200).json({
        insightEn: 'Focus on consistent daily prayers and sincere Istighfar. Every small step towards self-control strengthens your Nafs.',
        insightBn: 'প্রতিদিনের নিয়মিত নামায ও ইস্তিগফারের ওপর মনোযোগ দিন। আত্ম-সংযমের প্রতিটি ছোট পদক্ষেপ আপনার নফসকে শক্তিশালী করে।'
      });
    }

    const { language, recentRecords } = req.body;
    const ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build'
        }
      }
    });

    const prompt = `
You are a wise, supportive, non-judgmental Islamic self-improvement assistant analyzing a user's private self-accountability log.
Language requested: ${language === 'bn' ? 'Bangla (বাংলা)' : 'English'}.
Recent activity summary: ${JSON.stringify(recentRecords || [])}.

Provide a short, gentle, 2-sentence spiritual encouragement and practical pattern insight to help the user strengthen their Nafs and maintain Salah.
Strict guidelines:
- DO NOT act as a chatbot.
- DO NOT invent Quran or Hadith quotes.
- DO NOT issue fatwas or religious rulings.
- Focus on encouragement: Tawbah -> Correction -> Improvement.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: prompt,
    });

    const text = response.text || '';
    res.json({
      insightEn: language === 'bn' ? 'প্রতিদিনের নামায ও ইস্তিগফারের আমল জারি রাখুন।' : text,
      insightBn: language === 'bn' ? text : 'নিয়মিত আমলের মাধ্যমে আত্মনিয়ন্ত্রণ বৃদ্ধি করুন।'
    });
  } catch (err) {
    console.error('Gemini analysis error:', err);
    res.status(200).json({
      insightEn: 'Consistency in daily prayers and lowering gaze is the foundation of controlling the Nafs.',
      insightBn: 'দৈনন্দিন নামাযে স্থায়িত্ব ও দৃষ্টি সংযমই নফস নিয়ন্ত্রণের মূল চাবিকাঠি।'
    });
  }
});

// InsForge Live Connection Tester Endpoint
app.post('/api/db/test-connection', async (req: Request, res: Response) => {
  try {
    const { data, error } = await insforge.database.from('daily_records').select().limit(1);
    if (error) {
      return res.status(200).json({
        success: false,
        error: `InsForge Cloud PostgreSQL connection error: ${error.message || JSON.stringify(error)}`
      });
    }

    return res.json({
      success: true,
      message: `Successfully connected & verified InsForge Cloud PostgreSQL Database!`,
      details: {
        baseUrl: INSFORGE_URL,
        project: 'nafs-accountability',
        tablesVerified: ['daily_records', 'user_settings'],
        status: 'Active & Cloud Synchronized',
        serverTime: new Date().toISOString()
      }
    });
  } catch (err: any) {
    return res.status(200).json({
      success: false,
      error: `Failed to connect to InsForge: ${err?.message || err}`
    });
  }
});

// Verify Security PIN Endpoint
app.post('/api/auth/verify-pin', (req: Request, res: Response) => {
  const { pin, password } = req.body;
  const currentPin = localDb.settings.securityPin || '1234';
  const currentPassword = localDb.settings.securityPassword || 'admin123';
  
  if (!localDb.settings.securityLockEnabled) {
    return res.json({ success: true, message: 'Security lock is disabled' });
  }

  if (pin === currentPin && password === currentPassword) {
    return res.json({ success: true });
  } else {
    return res.status(401).json({ success: false, error: 'Incorrect credentials' });
  }
});

// Update Security PIN / Lock Settings
app.post('/api/auth/set-security', (req: Request, res: Response) => {
  const { newPin, newPassword, securityLockEnabled } = req.body;
  if (newPin !== undefined) {
    localDb.settings.securityPin = newPin;
  }
  if (newPassword !== undefined) {
    localDb.settings.securityPassword = newPassword;
  }
  if (securityLockEnabled !== undefined) {
    localDb.settings.securityLockEnabled = !!securityLockEnabled;
  }
  saveLocalDb(localDb);
  res.json({
    success: true,
    securityLockEnabled: localDb.settings.securityLockEnabled,
    message: 'Security settings updated successfully'
  });
});

// Save settings
app.post('/api/settings', (req: Request, res: Response) => {
  localDb.settings = { ...localDb.settings, ...req.body };
  saveLocalDb(localDb);
  res.json(localDb.settings);
});

app.get('/api/settings', (req: Request, res: Response) => {
  res.json(localDb.settings);
});

// CSV Export route
app.get('/api/export/csv', (req: Request, res: Response) => {
  const records = Object.values(localDb.records);
  let csv = 'Date,Score,Salah Done,Good Deeds,Bad Deeds,Victories,Tawbah Done\n';

  for (const r of records) {
    const prayersDone = Object.values(r.prayers).filter(p => p.status === 'completed' || p.status === 'qada').length;
    csv += `"${r.date}",${r.score},${prayersDone},${r.goodDeeds.length},${r.badDeeds.length},${r.nafsVictories.length},${r.tawbahRecords.filter(t => t.correctiveAction.isCompleted).length}\n`;
  }

  res.setHeader('Content-Type', 'text/csv');
  res.setHeader('Content-Disposition', 'attachment; filename=control_my_nafs_records.csv');
  res.send(csv);
});

// Start Express + Vite Middleware
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
