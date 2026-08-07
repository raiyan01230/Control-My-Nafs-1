import { DailyRecord, PrayerRecord } from '../types';

/**
 * Hardened Personal Accountability Scoring Engine
 * 
 * IMPORTANT: This score represents a personal productivity and self-discipline metric.
 * It is NEVER a measurement of Allah's judgment or spiritual worth.
 */
export function calculateDailyScore(record: DailyRecord): number {
  let score = 20; // Base starting baseline (requires real action to achieve high score)

  // 1. Salah Completion (+25 max)
  const prayers: PrayerRecord[] = Object.values(record.prayers);
  const completedPrayers = prayers.filter(p => p.status === 'completed' || p.status === 'qada');
  const congregationCount = prayers.filter(p => p.type === 'congregation' && p.status === 'completed').length;
  
  // +5 per completed prayer, congregation bonus +1 per prayer (max +5)
  score += Math.min(25, completedPrayers.length * 4 + congregationCount * 1);
  if (completedPrayers.length === 5) {
    score += 5; // Bonus for completing all 5 prayers in the day
  }

  // 2. Ayatul Kursi (+5 max)
  if (record.ayatulKursi?.completed) {
    score += 5;
  }

  // 3. Tahajjud (+8 max)
  if (record.tahajjud?.completed) {
    score += 8;
  }

  // 4. Good Deeds with Diminishing Returns (+20 max)
  // Prevents point farming: 1st time = +3, 2nd time = +1, 3rd+ = +0.5
  if (record.goodDeeds && record.goodDeeds.length > 0) {
    const deedCounts: Record<string, number> = {};
    let goodDeedPoints = 0;

    for (const deed of record.goodDeeds) {
      const key = (deed.optionId || deed.name || 'general').toLowerCase();
      const occurrence = (deedCounts[key] || 0) + 1;
      deedCounts[key] = occurrence;

      if (occurrence === 1) {
        goodDeedPoints += 3;
      } else if (occurrence === 2) {
        goodDeedPoints += 1;
      } else {
        goodDeedPoints += 0.5;
      }
    }
    score += Math.min(20, goodDeedPoints);
  }

  // 5. Nafs Victories (+20 max)
  // Weighted by difficulty (1 to 5)
  if (record.nafsVictories && record.nafsVictories.length > 0) {
    let victoryPoints = 0;
    for (const vic of record.nafsVictories) {
      const diff = Math.max(1, Math.min(5, vic.difficulty || 3));
      victoryPoints += diff * 1.5; // diff 1 = +1.5, diff 5 = +7.5
    }
    score += Math.min(20, victoryPoints);
  }

  // 6. Bad Deeds Deduction (Weighted by Quantity x Severity x Repetition)
  if (record.badDeeds && record.badDeeds.length > 0) {
    const badCounts: Record<string, number> = {};

    for (const bad of record.badDeeds) {
      const qty = Math.max(1, bad.quantity || 1);
      const severity = bad.severity || 1;
      const key = (bad.optionId || bad.name || 'general').toLowerCase();

      let basePenalty = 4;
      if (severity === 2) basePenalty = 8;
      if (severity === 3) basePenalty = 15;
      if (severity === 4) basePenalty = 25;

      // Intentionality factor
      if (bad.intentional) {
        basePenalty *= 1.25;
      }

      // Repetition multiplier for same behavior
      const priorCount = badCounts[key] || 0;
      badCounts[key] = priorCount + qty;
      const repetitionMultiplier = 1 + priorCount * 0.2;

      let totalPenalty = basePenalty * qty * repetitionMultiplier;

      // Check if corresponding Tawbah action is completed to recover part of penalty
      const matchedTawbah = record.tawbahRecords?.find(t => t.badDeedRecordId === bad.id);
      if (matchedTawbah && matchedTawbah.correctiveAction?.isCompleted) {
        totalPenalty *= 0.5; // Recover 50% of penalty upon sincere completed Tawbah
      }

      score -= totalPenalty;
    }
  }

  // Clamp score strictly between 0 and 100
  return Math.max(0, Math.min(100, Math.round(score)));
}

/**
 * Format Gregorian date with full day of week and Hijri date
 */
export function formatFullDateDisplay(dateStr: string, lang: 'en' | 'bn'): {
  gregorianDay: string;
  gregorianDate: string;
  hijriDate: string;
} {
  const date = new Date(dateStr + 'T12:00:00');
  if (isNaN(date.getTime())) {
    return { gregorianDay: '', gregorianDate: dateStr, hijriDate: '' };
  }

  const daysEn = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const daysBn = ['রবিবার', 'সোমবার', 'মঙ্গলবার', 'বুধবার', 'বৃহস্পতিবার', 'শুক্রবার', 'শনিবার'];

  const monthsEn = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const monthsBn = ['জানুয়ারি', 'ফেব্রুয়ারি', 'মার্চ', 'এপ্রিল', 'মে', 'জুন', 'জুলাই', 'আগস্ট', 'সেপ্টেম্বর', 'অক্টোবর', 'নভেম্বর', 'ডিসেম্বর'];

  const dayIndex = date.getDay();
  const dayNum = date.getDate();
  const monthIndex = date.getMonth();
  const year = date.getFullYear();

  const gregorianDay = lang === 'bn' ? daysBn[dayIndex] : daysEn[dayIndex];
  const gregorianDate = lang === 'bn' 
    ? `${toBanglaDigits(dayNum)} ${monthsBn[monthIndex]} ${toBanglaDigits(year)}`
    : `${monthsEn[monthIndex]} ${dayNum}, ${year}`;

  const hijriDate = formatHijriDate(dateStr, lang);

  return {
    gregorianDay,
    gregorianDate,
    hijriDate
  };
}

export function formatHijriDate(dateStr: string, lang: 'en' | 'bn'): string {
  const date = new Date(dateStr + 'T12:00:00');
  if (isNaN(date.getTime())) return '';

  const hijriMonthsEn = ['Muharram', 'Safar', 'Rabi al-Awwal', 'Rabi al-Thani', 'Jumada al-Awwal', 'Jumada al-Thani', 'Rajab', 'Sha\'ban', 'Ramadan', 'Shawwal', 'Dhu al-Qi\'dah', 'Dhu al-Hijjah'];
  const hijriMonthsBn = ['মহররম', 'সফর', 'রবিউল আউয়াল', 'রবিউস সানি', 'জমাদিউল আউয়াল', 'জমাদিউস সানি', 'রজব', 'শা\'বান', 'রমজান', 'শাওয়াল', 'জিলকদ', 'জিলহজ্জ'];

  try {
    // Attempt standard Intl Islamic astronomical calculation
    const formatter = new Intl.DateTimeFormat('en-u-ca-islamic-umalqura', {
      day: 'numeric',
      month: 'numeric',
      year: 'numeric'
    });
    const parts = formatter.formatToParts(date);
    let hDay = 1;
    let hMonth = 1;
    let hYear = 1448;

    for (const part of parts) {
      if (part.type === 'day') hDay = parseInt(part.value, 10);
      if (part.type === 'month') hMonth = parseInt(part.value, 10);
      if (part.type === 'year') hYear = parseInt(part.value, 10);
    }

    const monthIdx = Math.max(0, Math.min(11, hMonth - 1));
    if (lang === 'bn') {
      return `${toBanglaDigits(hDay)} ${hijriMonthsBn[monthIdx]} ${toBanglaDigits(hYear)} হিজরী`;
    }
    return `${hDay} ${hijriMonthsEn[monthIdx]} ${hYear} AH`;
  } catch (e) {
    // Fallback astronomical calculation algorithm
    const julianDay = Math.floor((date.getTime() / 86400000) + 2440587.5);
    const l = julianDay - 1948440 + 10632;
    const n = Math.floor((l - 1) / 10631);
    const l1 = l - 10631 * n + 354;
    const j = (Math.floor((10985 - l1) / 5316)) * (Math.floor((50 * l1) / 17719)) + (Math.floor(l1 / 5670)) * (Math.floor((43 * l1) / 15238));
    const l2 = l1 - (Math.floor((30 - j) / 15)) * (Math.floor((17719 * j) / 50)) - (Math.floor(j / 30)) * (Math.floor((15238 * j) / 43)) + 29;
    const hMonth = Math.floor((24 * l2) / 709);
    const hDay = l2 - Math.floor((709 * hMonth) / 24);
    const hYear = 30 * n + j - 30;

    const monthIdx = Math.max(0, Math.min(11, hMonth - 1));
    if (lang === 'bn') {
      return `${toBanglaDigits(hDay)} ${hijriMonthsBn[monthIdx]} ${toBanglaDigits(hYear)} হিজরী`;
    }
    return `${hDay} ${hijriMonthsEn[monthIdx]} ${hYear} AH`;
  }
}

function toBanglaDigits(num: number | string): string {
  const bnDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  return String(num).replace(/\d/g, (digit) => bnDigits[parseInt(digit, 10)]);
}
