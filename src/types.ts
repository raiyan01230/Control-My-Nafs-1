export type Language = 'en' | 'bn';
export type ThemeMode = 'dark' | 'light';

export type PrayerName = 'fajr' | 'dhuhr' | 'asr' | 'maghrib' | 'isha';

export type PrayerStatus = 'completed' | 'missed' | 'qada' | 'none';
export type PrayerType = 'congregation' | 'alone' | 'none';

export interface PrayerRecord {
  name: PrayerName;
  status: PrayerStatus;
  type: PrayerType;
  notes?: string;
  completedAt?: string;
}

export interface AyatulKursiRecord {
  completed: boolean;
  completedAt?: string;
}

export interface TahajjudRecord {
  completed: boolean;
  rakahs: number;
  date: string;
  notes?: string;
}

export type SeverityLevel = 1 | 2 | 3 | 4;

export type ItemClassification = 
  | 'sin'
  | 'bad_habit'
  | 'temptation'
  | 'unwanted_thought'
  | 'character_issue'
  | 'time_wasting'
  | 'missed_goal';

export interface BadDeedOption {
  id: string;
  nameEn: string;
  nameBn: string;
  category: string;
  severity: SeverityLevel;
  classification: ItemClassification;
  descriptionEn: string;
  descriptionBn: string;
  countable?: boolean;
  islamicReferenceId?: string;
}

export interface BadDeedRecord {
  id: string;
  optionId: string;
  name: string;
  category: string;
  severity: SeverityLevel;
  classification: ItemClassification;
  date: string;
  timestamp: string;
  intentional: boolean;
  quantity: number;
  countable?: boolean;
  trigger?: string;
  notes?: string;
}

export interface GoodDeedOption {
  id: string;
  nameEn: string;
  nameBn: string;
  category: string;
  descriptionEn: string;
  descriptionBn: string;
  points: number;
  islamicReferenceId?: string;
}

export interface GoodDeedRecord {
  id: string;
  optionId?: string;
  name: string;
  category: string;
  date: string;
  timestamp: string;
  quantity?: number;
  notes?: string;
}

export interface AIPersonalSession {
  type: 'daily' | 'weekly' | 'monthly';
  date: string;
  analysisTitleEn: string;
  analysisTitleBn: string;
  summaryEn: string;
  summaryBn: string;
  whatWentWellEn: string[];
  whatWentWellBn: string[];
  whatWentWrongEn: string[];
  whatWentWrongBn: string[];
  biggestChallengeEn: string;
  biggestChallengeBn: string;
  biggestVictoryEn: string;
  biggestVictoryBn: string;
  recommendedActionEn: string;
  recommendedActionBn: string;
  tomorrowFocusEn: string;
  tomorrowFocusBn: string;
  trendsTextEn?: string;
  trendsTextBn?: string;
  detectedTriggersEn?: string[];
  detectedTriggersBn?: string[];
  recommendationsEn?: string[];
  recommendationsBn?: string[];
  generatedAt: string;
}

export interface NafsVictoryRecord {
  id: string;
  category: string;
  title: string;
  description: string;
  difficulty: number; // 1 to 5
  date: string;
  timestamp: string;
  notes?: string;
}

export interface CorrectiveAction {
  astaghfirullahCount: number;
  salatulTawbahRequired: boolean;
  salatulTawbahCompleted: boolean;
  astaghfirullahCompleted: number;
  additionalDhikr?: string;
  charitySuggested?: boolean;
  triggerIdentified?: string;
  preventionPlan?: string;
  isCompleted: boolean;
  completedAt?: string;
}

export interface TawbahRecord {
  id: string;
  badDeedRecordId: string;
  badDeedName: string;
  date: string;
  correctiveAction: CorrectiveAction;
  notes?: string;
}

export interface RewardOption {
  id: string;
  nameEn: string;
  nameBn: string;
  category: string;
  pointsRequired: number;
  descriptionEn: string;
  descriptionBn: string;
}

export interface RewardClaim {
  id: string;
  rewardId: string;
  rewardName: string;
  date: string;
  reason: string;
}

export interface DailyRecord {
  id: string;
  date: string; // YYYY-MM-DD
  prayers: Record<PrayerName, PrayerRecord>;
  ayatulKursi: AyatulKursiRecord;
  tahajjud: TahajjudRecord;
  goodDeeds: GoodDeedRecord[];
  badDeeds: BadDeedRecord[];
  nafsVictories: NafsVictoryRecord[];
  tawbahRecords: TawbahRecord[];
  rewardClaims: RewardClaim[];
  score: number;
  notes?: string;
  aiInsightEn?: string;
  aiInsightBn?: string;
  dailySession?: AIPersonalSession;
  updatedAt: string;
}

export interface IslamicReference {
  id: string;
  sourceEn: string;
  sourceBn: string;
  referenceNo: string;
  arabicText?: string;
  textEn: string;
  textBn: string;
  category: string;
  verified: boolean;
}

export interface GoalRecord {
  id: string;
  title: string;
  description?: string;
  targetDate?: string;
  isCompleted: boolean;
  progress: number;
  targetValue: number;
  currentValue: number;
  unit?: string;
  createdAt: string;
  updatedAt: string;
}

export interface UserSettings {
  userName: string;
  language: Language;
  theme: ThemeMode;
  weeklyTahajjudTarget: number; // default 1
  dailyGoodDeedsTarget: number; // default 3
  hideSensitiveCategories: boolean;
  useMySqlIfAvailable: boolean;
  notificationsEnabled: boolean;
  securityLockEnabled?: boolean;
  securityPin?: string;
  autoLockMinutes?: number;
  goals?: GoalRecord[];
}

export interface StreaksData {
  salahCurrentStreak: number;
  salahBestStreak: number;
  ayatulKursiCurrentStreak: number;
  ayatulKursiBestStreak: number;
  tahajjudWeeklyStreak: number;
  tahajjudBestWeeklyStreak: number;
  nafsControlStreak: number;
  nafsControlBestStreak: number;
  goodDeedsStreak: number;
  overallStreak: number;
}
