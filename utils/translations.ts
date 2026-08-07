import { Language } from '../types';

export const UI_TRANSLATIONS: Record<Language, Record<string, string>> = {
  en: {
    appTitle: 'CONTROL MY NAFS',
    appSubtitle: 'Private Personal Self-Accountability & Islamic Habit Tracker',
    dashboard: 'Dashboard',
    salahTracker: 'Five Prayers',
    ayatulKursi: 'Ayatul Kursi',
    tahajjud: 'Tahajjud',
    nafsControl: 'Nafs Control',
    badDeeds: 'Slip-ups & Bad Deeds',
    goodDeeds: 'Good Deeds',
    tawbahEngine: 'Tawbah & Accountability',
    rewards: 'Personal Rewards',
    analytics: 'Nafs Analytics',
    monthlyReport: 'Monthly Report',
    yearlyReport: 'Yearly Report',
    calendar: 'Calendar View',
    settings: 'Settings & Data',
    
    // Quick Actions
    quickActions: 'Quick Record',
    addGoodDeed: '+ Good Deed',
    addBadDeed: '+ Bad Deed / Slip-up',
    addNafsVictory: '+ Nafs Victory',
    markSalah: '✓ Mark Salah',
    markAyatulKursi: '✓ Ayatul Kursi',
    markTahajjud: '✓ Tahajjud',
    startTawbah: '↻ Start Tawbah',

    // Today Score
    todayScore: "Today's Nafs Score",
    goodDeedsCount: 'Good Deeds',
    badDeedsCount: 'Slip-ups',
    salahCompleted: 'Salah Done',
    tawbahDone: 'Tawbah Completed',
    victoriesCount: 'Nafs Victories',
    rewardsEarned: 'Rewards Earned',
    
    // Streaks
    streaks: 'Consistency Streaks',
    salahStreak: 'Salah Streak',
    ayatulKursiStreak: 'Ayatul Kursi Streak',
    tahajjudWeeklyStreak: 'Tahajjud Weekly Target',
    nafsStreak: 'Nafs Control Streak',
    days: 'days',
    weeks: 'weeks',
    
    // Statuses
    completed: 'Completed',
    missed: 'Missed',
    qada: 'Qada',
    congregation: 'In Congregation',
    alone: 'Prayed Alone',
    none: 'Not Recorded',
    
    // Severity
    minor: 'Level 1 - Minor',
    moderate: 'Level 2 - Moderate',
    serious: 'Level 3 - Serious',
    verySerious: 'Level 4 - Very Serious',
    
    // Search & Filter
    searchPlaceholder: 'Search 200+ slip-ups & bad deeds...',
    allCategories: 'All Categories',
    selectCategory: 'Select Category',
    recordSelected: 'Record Selected Slip-up',
    notesOptional: 'Optional Personal Notes / Context...',

    // Buttons
    save: 'Save Record',
    cancel: 'Cancel',
    close: 'Close',
    export: 'Export Data',
    exportCsv: 'Export CSV',
    exportJson: 'Export JSON',
    printPdf: 'Print PDF Report',
    resetData: 'Reset All Data',
    
    // Reminders
    reminderHeading: 'Daily Spiritual Reminder',
    disclaimerText: 'Note: The Nafs Score is purely a personal self-accountability metric to track habit consistency. It does not represent an Islamic ruling on spiritual standing before Allah.'
  },
  bn: {
    appTitle: 'নফস নিয়ন্ত্রণ',
    appSubtitle: 'ব্যক্তিগত আত্ম-জবাবদিহিতা ও সুন্নতি অভ্যাস ট্র্যাকার',
    dashboard: 'প্রধান ড্যাশবোর্ড',
    salahTracker: 'পাঁচ ওয়াক্ত নামায',
    ayatulKursi: 'আয়াতুল কুরসী',
    tahajjud: 'তাহাজ্জুদ ট্র্যাকার',
    nafsControl: 'নফস নিয়ন্ত্রণ',
    badDeeds: 'ত্রুটি ও গোনাহের রেকর্ড',
    goodDeeds: 'নেক আমল',
    tawbahEngine: 'তওবা ও আত্ম-সংশোধন',
    rewards: 'আত্ম-পুরস্কার ব্যবস্থা',
    analytics: 'নফস অ্যানালিটিক্স',
    monthlyReport: 'মাসিক রিপোর্ট',
    yearlyReport: 'বার্ষিক রিপোর্ট',
    calendar: 'ক্যালেন্ডার ভিউ',
    settings: 'সেটিংস ও ডেটা',

    // Quick Actions
    quickActions: 'দ্রুত ইনপুট',
    addGoodDeed: '+ নেক আমল',
    addBadDeed: '+ ভুল / গোনাহ',
    addNafsVictory: '+ নফসের ওপর জয়',
    markSalah: '✓ নামায মার্ক',
    markAyatulKursi: '✓ আয়াতুল কুরসী',
    markTahajjud: '✓ তাহাজ্জুদ',
    startTawbah: '↻ তওবা শুরু',

    // Today Score
    todayScore: 'আজকের নফস নিয়ন্ত্রণ স্কোর',
    goodDeedsCount: 'নেক আমল',
    badDeedsCount: 'ভুল / ত্রুটি',
    salahCompleted: 'নামায আদায়',
    tawbahDone: 'তওবা সম্পন্ন',
    victoriesCount: 'নফসের ওপর জয়',
    rewardsEarned: 'অর্জিত পুরস্কার',

    // Streaks
    streaks: 'ধারাবাহিকতা বা স্ট্রীক',
    salahStreak: 'নামাযের স্ট্রীক',
    ayatulKursiStreak: 'আয়াতুল কুরসীর স্ট্রীক',
    tahajjudWeeklyStreak: 'তাহাজ্জুদ সাপ্তাহিক লক্ষ্য',
    nafsStreak: 'নফস নিয়ন্ত্রণের স্ট্রীক',
    days: 'দিন',
    weeks: 'সপ্তাহ',

    // Statuses
    completed: 'আদায় করা হয়েছে',
    missed: 'মিস হয়েছে',
    qada: 'কাযা নামায',
    congregation: 'জামায়াতে পড়া',
    alone: 'একা পড়া',
    none: 'রেকর্ড নেই',

    // Severity
    minor: 'লেভেল ১ - সাধারণ ত্রুটি',
    moderate: 'লেভেল ২ - মাঝারি বিষয়',
    serious: 'লেভেল ৩ - গুরুতর গোনাহ',
    verySerious: 'লেভেল ৪ - অত্যন্ত গুরুতর',

    // Search & Filter
    searchPlaceholder: '২০০+ গোনাহ ও প্রলোভনের মধ্যে খুঁজুন...',
    allCategories: 'সকল ক্যাটাগরি',
    selectCategory: 'ক্যাটাগরি বেছে নিন',
    recordSelected: 'পছন্দকৃত অপশন সেভ করুন',
    notesOptional: 'ব্যক্তিগত কোনো বিশেষ নোট বা অনুভূতির কথা...',

    // Buttons
    save: 'রেকর্ড সেভ করুন',
    cancel: 'বাতিল',
    close: 'বন্ধ করুন',
    export: 'ডেটা এক্সপোর্ট',
    exportCsv: 'CSV ফাইল নামান',
    exportJson: 'JSON ফাইল নামান',
    printPdf: 'PDF রিপোর্ট প্রিন্ট',
    resetData: 'সব ডেটা রিসেট করুন',

    // Reminders
    reminderHeading: 'আজকের আত্ম-উন্নয়ন নসিহত',
    disclaimerText: 'নোট: নফস নিয়ন্ত্রণ স্কোরটি কেবল নিজের আত্ম-জবাবদিহিতার সুবিধার জন্য তৈরি গাণিতিক হিসাব। এটি আল্লাহর দরবারে কার কত মর্যাদা তার শরয়ী পরিমাপ নয়।'
  }
};
