import { GoodDeedOption } from '../types';
import { MASTER_CATEGORIES } from './categories';

export const GOOD_DEED_CATEGORIES = MASTER_CATEGORIES;

export const SEED_GOOD_DEED_OPTIONS: GoodDeedOption[] = [
  // --- SALAH & WORSHIP ---
  {
    id: 'good-salah-01',
    nameEn: 'Prayed all 5 daily prayers on time',
    nameBn: 'পাঁচ ওয়াক্ত নামায সময়মতো আদায় করেছি',
    category: 'prayer',
    descriptionEn: 'Completed Fajr, Dhuhr, Asr, Maghrib, and Isha at their prescribed times.',
    descriptionBn: 'পাঁচটি ওয়াক্তের মূল সময়ে নামায পড়া শেষ করেছি।',
    points: 20
  },
  {
    id: 'good-salah-02',
    nameEn: 'Prayed Salah in congregation (Jama\'ah) at Mosque',
    nameBn: 'মসজিদে জামায়াতের সাথে নামায আদায়',
    category: 'prayer',
    descriptionEn: 'Attended the house of Allah for congregational prayer.',
    descriptionBn: 'আল্লাহর ঘরে গিয়ে জামায়াতে শরিক হওয়া।',
    points: 15
  },
  {
    id: 'good-salah-03',
    nameEn: 'Prayed Tahajjud late at night',
    nameBn: 'শেষ রাতে তাহাজ্জুদ নামায আদায়',
    category: 'prayer',
    descriptionEn: 'Woke up in the last third of the night for voluntary prayer.',
    descriptionBn: 'রাতের শেষভাগে উঠে তাহাজ্জুদ আদায় করা।',
    points: 25
  },
  {
    id: 'good-salah-04',
    nameEn: 'Recited Ayatul Kursi after Salah',
    nameBn: 'ফরজ নামাযের পর আয়াতুল কুরসী তিলওয়াত',
    category: 'prayer',
    descriptionEn: 'Recited the greatest verse of the Quran after obligatory prayer.',
    descriptionBn: 'নামাজ শেষে আয়াতুল কুরসী পড়ার সুন্নাত বজায় রাখা।',
    points: 10
  },
  {
    id: 'good-salah-05',
    nameEn: 'Prayed Duha / Ishraq voluntary prayer',
    nameBn: 'ইশরাক বা চাশতের নফল নামায পড়া',
    category: 'prayer',
    descriptionEn: 'Offered voluntary prayer during forenoon.',
    descriptionBn: 'দিনের শুরুতে নফল চাশতের নামায পড়া।',
    points: 12
  },
  {
    id: 'good-salah-06',
    nameEn: 'Prayed Sunnah Rawatib before/after compulsory prayers',
    nameBn: 'সুন্নাতে মুয়াক্কাদা ও নফল নামায আদায়',
    category: 'prayer',
    descriptionEn: 'Completed Sunnah prayers associated with daily Salah.',
    descriptionBn: 'ফরজ নামাযের আগের ও পরের সুনানগুলো পরা।',
    points: 10
  },

  // --- QURAN & DHIKR ---
  {
    id: 'good-quran-01',
    nameEn: 'Recited Quran with reflection (Tadabbur)',
    nameBn: 'অর্থ বুঝে গুরুত্বের সাথে কুরআন তিলওয়াত',
    category: 'quran_dhikr',
    descriptionEn: 'Read a portion of Quran trying to ponder its meanings.',
    descriptionBn: 'কুরআন তিলওয়াতের সাথে অনুবাদ বা তাফসীর পাঠ।',
    points: 15
  },
  {
    id: 'good-quran-02',
    nameEn: 'Memorized a new Surah or verses',
    nameBn: 'নতুন কোনো সূরা বা আয়াত মুখস্থ করেছি',
    category: 'quran_dhikr',
    descriptionEn: 'Committed new words of Allah to memory.',
    descriptionBn: 'কুরআনের নতুন আয়াত হিফজ করা।',
    points: 20
  },
  {
    id: 'good-quran-03',
    nameEn: 'Recited Morning Adhkar',
    nameBn: 'সকালের মাসনুন জিকির ও দোয়া আদায়',
    category: 'quran_dhikr',
    descriptionEn: 'Completed authentic morning remembrance of Allah.',
    descriptionBn: 'সকালে হেফাযতের সুন্নতি জিকির করা।',
    points: 10
  },
  {
    id: 'good-quran-04',
    nameEn: 'Recited Evening Adhkar',
    nameBn: 'সাঁঝের বা সন্ধ্যার মাসনুন জিকির পাঠ',
    category: 'quran_dhikr',
    descriptionEn: 'Completed evening protective remembrances.',
    descriptionBn: 'বিকাল বা সন্ধ্যায় জিকির শেষ করা।',
    points: 10
  },
  {
    id: 'good-quran-05',
    nameEn: 'Recited 100x Astaghfirullah',
    nameBn: '১০০ বার আস্তাগফিরুল্লাহ পাঠ করেছি',
    category: 'quran_dhikr',
    descriptionEn: 'Engaged in persistent seeking of Allah’s forgiveness.',
    descriptionBn: 'ইস্তিগফারের তসবিহ গণনা করা।',
    points: 10
  },
  {
    id: 'good-quran-06',
    nameEn: 'Sent blessings upon Prophet (Salawat) 100x',
    nameBn: 'নবীজী (সাঃ) এর ওপর ১০০ বার দুরুদ শরীফ পাঠ',
    category: 'quran_dhikr',
    descriptionEn: 'Recited Durood / Salawat upon Rasulullah (ﷺ).',
    descriptionBn: 'রাসূলুল্লাহ (সাঃ) এর প্রতি দুরুদ পেশ।',
    points: 12
  },
  {
    id: 'good-quran-07',
    nameEn: 'Recited Surah Al-Kahf on Friday',
    nameBn: 'জুমা বারে সূরা কাহাফ তিলওয়াত',
    category: 'quran_dhikr',
    descriptionEn: 'Gained light between two Fridays by reciting Surah Kahf.',
    descriptionBn: 'জুমার দিনে পুরো সূরা কাহাফ পড়া।',
    points: 20
  },

  // --- FAMILY & PARENTS ---
  {
    id: 'good-family-01',
    nameEn: 'Served parents with joy and affection',
    nameBn: 'মা-বাবার সেবা ও তাদের মুখে হাসি ফোটানো',
    category: 'family_kindness',
    descriptionEn: 'Helped parents with chores, medication, or comfort.',
    descriptionBn: 'পিতা-মাতার খেদমত ও তাদের কাজে সহায়তা।',
    points: 20
  },
  {
    id: 'good-family-02',
    nameEn: 'Spoke with utmost gentleness to family',
    nameBn: 'পরিবারের সকলের সাথে অত্যন্ত নরম ভাষায় কথা বলা',
    category: 'family_kindness',
    descriptionEn: 'Maintained soft, respectful tone even during stress.',
    descriptionBn: 'মেজাজ ঠান্ডা রেখে প্রিয়জনদের সাথে সুন্দর কথা বলা।',
    points: 12
  },
  {
    id: 'good-family-03',
    nameEn: 'Maintained ties of kinship (Silat al-Rahim)',
    nameBn: 'আত্মীয়-স্বজনের খোঁজখবর নেওয়া বা কল দেওয়া',
    category: 'family_kindness',
    descriptionEn: 'Called or visited relatives to check on their well-being.',
    descriptionBn: 'আত্মীয়দের সাথে যোগাযোগ রাখা।',
    points: 15
  },
  {
    id: 'good-family-04',
    nameEn: 'Helped with household duties/cleaning without being asked',
    nameBn: 'বলার আগেই ঘরের কাজে বা ঘর গোছানোয় সাহায্য করা',
    category: 'family_kindness',
    descriptionEn: 'Initiated house cleaning or chores proactively.',
    descriptionBn: 'নিজের ঘর ও বাড়ি পরিষ্কার করা।',
    points: 10
  },

  // --- CHARITY & COMMUNITY ---
  {
    id: 'good-charity-01',
    nameEn: 'Gave secret Sadaqah / Charity to someone in need',
    nameBn: 'গোপনে কোনো অভাবী মানুষকে দান করেছি',
    category: 'charity_community',
    descriptionEn: 'Donated money or food quietly for Allah’s sake.',
    descriptionBn: 'আল্লাহর সন্তুষ্টির জন্য সদকা দেওয়া।',
    points: 18
  },
  {
    id: 'good-charity-02',
    nameEn: 'Fed a hungry person or animal',
    nameBn: 'ক্ষুধার্ত মানুষকে বা পশুপাখিকে খাবার খাইয়েছি',
    category: 'charity_community',
    descriptionEn: 'Shared food or stray animal feeding.',
    descriptionBn: 'ক্ষুধার্তের মুখে অন্ন তুলে দেওয়া।',
    points: 15
  },
  {
    id: 'good-charity-03',
    nameEn: 'Smiled cheerfully at a brother/person (Sadaqah)',
    nameBn: 'কারো দিকে হাসিমুখে তাকানো (সদকার সওয়াব)',
    category: 'charity_community',
    descriptionEn: 'Greeted someone with a warm, sincere smile.',
    descriptionBn: 'হাসিমুখে সালাম ও কুশল বিনিময় করা।',
    points: 5
  },
  {
    id: 'good-charity-04',
    nameEn: 'Removed a harmful object from the road/path',
    nameBn: 'পথ থেকে ক্ষতিকর কিছু সরিয়ে ফেলেছি',
    category: 'charity_community',
    descriptionEn: 'Cleared trash, thorn, or obstacle from walkway.',
    descriptionBn: 'রাস্তা থেকে পাথর, কাঁচ বা ময়লা সরানো।',
    points: 10
  },
  {
    id: 'good-charity-05',
    nameEn: 'Made sincere Dua for someone in secret',
    nameBn: 'কারো জন্য গোপনে মন থেকে দোয়া করেছি',
    category: 'charity_community',
    descriptionEn: 'Prayed for brother/sister in their absence.',
    descriptionBn: 'কারো শুভকামনায় আল্লাহর দরবারে হাত তোলা।',
    points: 10
  },

  // --- CHARACTER & NAFS CONTROL ---
  {
    id: 'good-character-01',
    nameEn: 'Lowered gaze successfully in front of a temptation',
    nameBn: 'প্রলোভনের মুখে সফলভাবে দৃষ্টি সংযত রেখেছি',
    category: 'character_discipline',
    descriptionEn: 'Turned eyes away immediately upon seeing inappropriate visual.',
    descriptionBn: 'খারাপ কিছু চোখে পড়ামাত্র সাথে সাথে চোখ ফিরিয়ে নেওয়া।',
    islamicReferenceId: 'ref-gaze-quran',
    points: 15
  },
  {
    id: 'good-character-02',
    nameEn: 'Controlled anger when provoked or offended',
    nameBn: 'রাগ ওঠার পর নিজেকে সফলভাবে সামলে রেখেছি',
    category: 'character_discipline',
    descriptionEn: 'Remained silent or sought refuge instead of acting in rage.',
    descriptionBn: 'রাগ সামলে নিরব থাকা বা মাফ করে দেওয়া।',
    points: 20
  },
  {
    id: 'good-character-03',
    nameEn: 'Forgave someone who wronged me',
    nameBn: 'আমাকে কষ্ট দিয়েছে এমন কাউকে মাফ করে দিয়েছি',
    category: 'character_discipline',
    descriptionEn: 'Pardoned a fault for Allah’s pleasure.',
    descriptionBn: 'ক্ষোভ পুষে না রেখে ক্ষমা করে দেওয়া।',
    points: 20
  },
  {
    id: 'good-character-04',
    nameEn: 'Avoided a heated debate/argument purely for Allah',
    nameBn: 'আল্লাহর ওয়াস্তে কোনো অযথা তর্ক এড়িয়ে চলেছি',
    category: 'character_discipline',
    descriptionEn: 'Stepped away from an argument even when right.',
    descriptionBn: 'তর্ক এড়িয়ে গিয়ে অন্তরে শান্তি রাখা।',
    points: 15
  },
  {
    id: 'good-character-05',
    nameEn: 'Resisted wasting time on phone and studied/worked instead',
    nameBn: 'ফোন না ঘেঁটে প্রোডাক্টিভ কাজে মন দিয়েছি',
    category: 'character_discipline',
    descriptionEn: 'Chose valuable action over screen scrolling.',
    descriptionBn: 'মোবাইল দূরে সরিয়ে নিজের দায়িত্ব পালন।',
    points: 15
  },

  // --- KNOWLEDGE & CLEANLINESS ---
  {
    id: 'good-knowledge-01',
    nameEn: 'Learned an authentic Islamic rule or Hadith',
    nameBn: 'নতুন কোনো সহীহ হাদীস বা দ্বীনি মাসআলা শিখেছি',
    category: 'knowledge_seeking',
    descriptionEn: 'Studied beneficial knowledge from reliable source.',
    descriptionBn: 'দ্বীনি বই বা নির্ভরযোগ্য আলোচনা থেকে ইলম অর্জন।',
    points: 12
  },
  {
    id: 'good-knowledge-02',
    nameEn: 'Used Miswak / Brushed teeth before prayer (Sunnah)',
    nameBn: 'নামাযের পূর্বে মিসওয়াক দিয়ে দাঁত পরিষ্কার করা',
    category: 'health_cleanliness',
    descriptionEn: 'Revived the beloved Sunnah of Miswak.',
    descriptionBn: 'সুন্নতি তরীকায় মিসওয়াক ব্যবহার।',
    points: 8
  },
  {
    id: 'good-knowledge-03',
    nameEn: 'Maintained state of Wudu throughout the day',
    nameBn: 'সারাদিন যথাসম্ভব ওজু অবস্থায় অবস্থান করা',
    category: 'health_cleanliness',
    descriptionEn: 'Renewed ablution whenever broken.',
    descriptionBn: 'পবিত্রতা বজায় রাখার মানসিকতা।',
    points: 15
  }
];
