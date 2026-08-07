import { BadDeedOption } from '../types';
import { MASTER_CATEGORIES } from './categories';
import { BANG_DEED_OPTIONS } from './bangDeedsData';

export const BAD_DEED_CATEGORIES = MASTER_CATEGORIES;

export const SEED_BAD_DEED_OPTIONS: BadDeedOption[] = [
  // --- GAZE & VISUAL TEMPTATIONS (1-25) ---
  {
    id: 'gaze-01',
    nameEn: 'Looking at inappropriate images',
    nameBn: 'অশালীন ছবি দেখা',
    category: 'gaze',
    severity: 3,
    classification: 'sin',
    descriptionEn: 'Intentionally viewing images that violate Islamic modesty standards.',
    descriptionBn: 'ইসলামিক শালীনতার পরিপন্থী কোনো ছবি ইচ্ছাকৃতভাবে দেখা।',
    islamicReferenceId: 'ref-gaze-quran'
  },
  {
    id: 'gaze-02',
    nameEn: 'Looking at inappropriate videos or clips',
    nameBn: 'অশালীন ভিডিও বা ক্লিপস দেখা',
    category: 'gaze',
    severity: 3,
    classification: 'sin',
    descriptionEn: 'Intentionally watching inappropriate video content.',
    descriptionBn: 'অনুপযুক্ত বা গোনাহের ভিডিও ক্লিপস ইচ্ছাকৃতভাবে দেখা।',
    islamicReferenceId: 'ref-gaze-quran'
  },
  {
    id: 'gaze-03',
    nameEn: 'Looking at non-mahram unnecessarily',
    nameBn: 'অপ্রয়োজনে গায়রে মাহরামের দিকে তাকানো',
    category: 'gaze',
    severity: 2,
    classification: 'temptation',
    descriptionEn: 'Failing to lower the gaze when coming across a non-mahram.',
    descriptionBn: 'গায়রে মাহরামের মুখোমুখি হলে দৃষ্টি অবনত না করা।',
    islamicReferenceId: 'ref-gaze-hadith'
  },
  {
    id: 'gaze-04',
    nameEn: 'Repeatedly looking after the first glance',
    nameBn: 'প্রথম নজর পরার পর বারবার তাকানো',
    category: 'gaze',
    severity: 2,
    classification: 'sin',
    descriptionEn: 'Continuing to look after the accidental first glance.',
    descriptionBn: 'প্রথম অনিচ্ছাকৃত নজরের পর আবার ইচ্ছে করে তাকানো।',
    islamicReferenceId: 'ref-gaze-hadith'
  },
  {
    id: 'gaze-05',
    nameEn: 'Searching for inappropriate media online',
    nameBn: 'অনলাইনে কুরুচিপূর্ণ বিষয়বস্তু খোঁজা',
    category: 'gaze',
    severity: 3,
    classification: 'sin',
    descriptionEn: 'Active search query for improper visual materials.',
    descriptionBn: 'ইন্টারনেটে ক্ষতিকর বা কুরুচিপূর্ণ জিনিস লিখে সার্চ করা।',
    islamicReferenceId: 'ref-gaze-quran'
  },
  {
    id: 'gaze-06',
    nameEn: 'Following inappropriate social media accounts',
    nameBn: 'অশালীন সোশ্যাল মিডিয়া অ্যাকাউন্ট ফলো করা',
    category: 'gaze',
    severity: 2,
    classification: 'bad_habit',
    descriptionEn: 'Following profiles that regularly share modest-defying content.',
    descriptionBn: 'যেসব পেইজ বা আইডিতে অশালীন ছবি/ভিডিও দেওয়া হয় তা ফলো করা।',
    islamicReferenceId: 'ref-gaze-hadith'
  },
  {
    id: 'gaze-07',
    nameEn: 'Watching suggestive Reels/TikToks',
    nameBn: 'উত্তেজক রিলস বা টিকটক ভিডিও দেখা',
    category: 'gaze',
    severity: 2,
    classification: 'temptation',
    descriptionEn: 'Scrolling through short video formats with suggestive content.',
    descriptionBn: 'সামাজিক মাধ্যমে উত্তেজনাকর রিলস বা ছোট ভিডিও দেখা।',
    islamicReferenceId: 'ref-gaze-hadith'
  },
  {
    id: 'gaze-08',
    nameEn: 'Saving inappropriate photos or bookmarks',
    nameBn: 'অশালীন ছবি বা লিঙ্ক সেভ করে রাখা',
    category: 'gaze',
    severity: 3,
    classification: 'sin',
    descriptionEn: 'Saving or bookmarking prohibited media on device.',
    descriptionBn: 'ফোনে বা ব্রাউজারে খারাপ কোনো ছবি বা লিঙ্ক বুকমার্ক করে রাখা।',
    islamicReferenceId: 'ref-gaze-quran'
  },
  {
    id: 'gaze-09',
    nameEn: 'Staring with lustful intention',
    nameBn: 'কামুক দৃষ্টিতে কারোর দিকে তাকানো',
    category: 'gaze',
    severity: 3,
    classification: 'sin',
    descriptionEn: 'Directing lustful stares in public or private.',
    descriptionBn: 'জনসমক্ষে বা একা থাকা অবস্থায় বাজে উদ্দেশ্যে তাকানো।',
    islamicReferenceId: 'ref-gaze-hadith'
  },
  {
    id: 'gaze-10',
    nameEn: 'Visiting questionable websites',
    nameBn: 'সন্দেহজনক বা খারাপ ওয়েবসাইট ভিজিট করা',
    category: 'gaze',
    severity: 3,
    classification: 'sin',
    descriptionEn: 'Accessing websites known for inappropriate themes.',
    descriptionBn: 'অনুপযুক্ত বিষয়বস্তুর ওয়েবসাইটে প্রবেশ করা।',
    islamicReferenceId: 'ref-gaze-quran'
  },
  {
    id: 'gaze-11',
    nameEn: 'Glancing at revealing clothing in public',
    nameBn: 'প্রকাশ্যে পোশাকের অশালীনতার দিকে নজর দেওয়া',
    category: 'gaze',
    severity: 2,
    classification: 'temptation',
    descriptionEn: 'Not turning eyes away from immodest public attire.',
    descriptionBn: 'পাবলিক প্লেসে অশালীন পোশাক পরা কারো দিকে না তাকিয়ে থাকা সংবরণ না করা।',
    islamicReferenceId: 'ref-gaze-quran'
  },
  {
    id: 'gaze-12',
    nameEn: 'Peeking at private matters of others',
    nameBn: 'অন্যের ব্যক্তিগত বিষয়ে কৌতূহলবশত উঁকি দেওয়া',
    category: 'gaze',
    severity: 2,
    classification: 'character_issue',
    descriptionEn: 'Looking into someone else’s phone, window, or belongings without permission.',
    descriptionBn: 'কারো অনুমতি ছাড়া তার ফোন, ঘর বা গোপন কিছুতে উঁকিঝুঁকি মারা।',
    islamicReferenceId: 'ref-gaze-hadith'
  },
  {
    id: 'gaze-13',
    nameEn: 'Sharing questionable images with others',
    nameBn: 'অন্যদের সাথে অনুপযুক্ত ছবি শেয়ার করা',
    category: 'gaze',
    severity: 3,
    classification: 'sin',
    descriptionEn: 'Forwarding or sending immodest imagery to friends or groups.',
    descriptionBn: 'বন্ধুমহলে বা চ্যাটে বাজে কোনো দৃশ্য বা ছবি ফরোয়ার্ড করা।',
    islamicReferenceId: 'ref-speech-quran'
  },
  {
    id: 'gaze-14',
    nameEn: 'Unnecessary browsing of fashion/model catalogs with lust',
    nameBn: 'কাম ভাব নিয়ে ফ্যাশন বা মডেলদের ক্যাটালগ দেখা',
    category: 'gaze',
    severity: 2,
    classification: 'temptation',
    descriptionEn: 'Browsing model photos with impure mindset.',
    descriptionBn: 'বাজে চিন্তা মাথায় রেখে ক্যাটালগ বা পিকচার গ্যালারি দেখা।',
    islamicReferenceId: 'ref-gaze-hadith'
  },
  {
    id: 'gaze-15',
    nameEn: 'Watching movies/shows with vulgar scenes',
    nameBn: 'অশালীন দৃশ্যযুক্ত সিনেমা বা নাটক দেখা',
    category: 'gaze',
    severity: 2,
    classification: 'bad_habit',
    descriptionEn: 'Continuing to watch entertainment contains explicit scenes without skipping.',
    descriptionBn: 'নাটক/সিনেমার অশালীন অংশ স্কিপ না করে দেখা।',
    islamicReferenceId: 'ref-gaze-quran'
  },
  {
    id: 'gaze-16',
    nameEn: 'Zooming into inappropriate details on photos',
    nameBn: 'ছবি জুম করে বাজে দৃষ্টিভঙ্গিতে দেখা',
    category: 'gaze',
    severity: 2,
    classification: 'sin',
    descriptionEn: 'Examining pictures for lustful curiosity.',
    descriptionBn: 'ছবি জুম করে খারাপ উদ্দেশ্যে কোনো অংশ দেখা।',
    islamicReferenceId: 'ref-gaze-hadith'
  },
  {
    id: 'gaze-17',
    nameEn: 'Keeping lockscreen or wallpaper with immodest images',
    nameBn: 'ফোনের ওয়ালপেপারে অশালীন ছবি রাখা',
    category: 'gaze',
    severity: 1,
    classification: 'bad_habit',
    descriptionEn: 'Setting device wallpaper with inappropriate imagery.',
    descriptionBn: 'ফোনে অনুচিত কোনো ছবির ওয়ালপেপার ব্যবহার করা।',
    islamicReferenceId: 'ref-gaze-hadith'
  },
  {
    id: 'gaze-18',
    nameEn: 'Flirting or making eyes at non-mahram',
    nameBn: 'গায়রে মাহরামকে আকৃষ্ট করার উদ্দেশ্যে দৃষ্টি বিনিময়',
    category: 'gaze',
    severity: 3,
    classification: 'sin',
    descriptionEn: 'Exchanging intentional romantic/flirty glances.',
    descriptionBn: 'বাজে ভাব নিয়ে চোখের ইশারায় আকর্ষণ করার চেষ্টা করা।',
    islamicReferenceId: 'ref-gaze-hadith'
  },
  {
    id: 'gaze-19',
    nameEn: 'Watching music videos with immodest dancing',
    nameBn: 'অশালীন নাচ সহ মিউজিক ভিডিও দেখা',
    category: 'gaze',
    severity: 2,
    classification: 'bad_habit',
    descriptionEn: 'Watching provocative dance performances.',
    descriptionBn: 'উত্তেজক নাচ সংবলিত ভিডিও ক্লিপস দেখা।',
    islamicReferenceId: 'ref-gaze-quran'
  },
  {
    id: 'gaze-20',
    nameEn: 'Browsing adult pop-ups instead of closing immediately',
    nameBn: 'পপ-আপ এড আসলে সাথে সাথে বন্ধ না করা',
    category: 'gaze',
    severity: 2,
    classification: 'temptation',
    descriptionEn: 'Delaying closing unexpected bad ads on websites.',
    descriptionBn: 'ওয়েবসাইটে বাজে বিজ্ঞাপন আসলে তৎক্ষণাৎ বন্ধ না করে তাকিয়ে থাকা।',
    islamicReferenceId: 'ref-gaze-hadith'
  },

  // --- SPEECH & TONGUE (21-50) ---
  {
    id: 'speech-01',
    nameEn: 'Telling a lie',
    nameBn: 'মিথ্যা কথা বলা',
    category: 'speech',
    severity: 3,
    classification: 'sin',
    descriptionEn: 'Speaking untruths knowingly.',
    descriptionBn: 'সত্য গোপন করে বা মিথ্যা সাজিয়ে কথা বলা।',
    islamicReferenceId: 'ref-truth-hadith'
  },
  {
    id: 'speech-02',
    nameEn: 'Backbiting / Gheebat about someone',
    nameBn: 'গীবত বা কারো পেছনে নিন্দা করা',
    category: 'speech',
    severity: 3,
    classification: 'sin',
    descriptionEn: 'Speaking ill of an absent person about something they dislike.',
    descriptionBn: 'অনুপস্থিত কোনো ব্যক্তির এমন কোনো ত্রুটি নিয়ে কথা বলা যা সে অপছন্দ করে।',
    islamicReferenceId: 'ref-gheebat-quran'
  },
  {
    id: 'speech-03',
    nameEn: 'Gossip / Unnecessary talk about others',
    nameBn: 'পরচর্চা বা অনর্থক অন্যের কথা বলা',
    category: 'speech',
    severity: 2,
    classification: 'bad_habit',
    descriptionEn: 'Engaging in idle chatter regarding people’s private lives.',
    descriptionBn: 'অন্যদের ব্যক্তিগত জীবন নিয়ে অনর্থক আড্ডা ও আলোচনা করা।',
    islamicReferenceId: 'ref-gheebat-quran'
  },
  {
    id: 'speech-04',
    nameEn: 'Swearing or using bad language',
    nameBn: 'গালিগালাজ বা খারাপ ভাষা ব্যবহার করা',
    category: 'speech',
    severity: 2,
    classification: 'sin',
    descriptionEn: 'Using profane, vulgar, or abusive words.',
    descriptionBn: 'কথাবার্তায় গালি বা নোংরা শব্দ উচ্চারণ করা।',
    islamicReferenceId: 'ref-tongue-hadith'
  },
  {
    id: 'speech-05',
    nameEn: 'Insulting or mocking someone',
    nameBn: 'কাউকে অপমান বা উপহাস করা',
    category: 'speech',
    severity: 3,
    classification: 'sin',
    descriptionEn: 'Making fun of someone’s flaws, body, or status.',
    descriptionBn: 'কারো শারীরিক গঠন, যোগ্যতা বা ভুল নিয়ে বিদ্রূপ করা।',
    islamicReferenceId: 'ref-speech-quran'
  },
  {
    id: 'speech-06',
    nameEn: 'Spreading rumors or unverified news',
    nameBn: 'গুজব বা যাচাইহীন সংবাদ ছড়ানো',
    category: 'speech',
    severity: 3,
    classification: 'sin',
    descriptionEn: 'Passing along information without confirming its truth.',
    descriptionBn: 'সত্যতা যাচাই না করেই কোনো খবর অন্যের কাছে বলে বেড়ানো।',
    islamicReferenceId: 'ref-truth-hadith'
  },
  {
    id: 'speech-07',
    nameEn: 'Breaking a promise or trust',
    nameBn: 'ওয়াদা ভঙ্গ করা বা আমানতের খেয়ানত',
    category: 'speech',
    severity: 3,
    classification: 'sin',
    descriptionEn: 'Failing to honor a spoken commitment without a valid excuse.',
    descriptionBn: 'কথার খেলাফ করা বা প্রতিশ্রুতি দিয়ে তা না রাখা।',
    islamicReferenceId: 'ref-truth-hadith'
  },
  {
    id: 'speech-08',
    nameEn: 'Making false accusations (Buhtan)',
    nameBn: 'কাউকে মিথ্যা অপবাদ দেওয়া (বুহতান)',
    category: 'speech',
    severity: 4,
    classification: 'sin',
    descriptionEn: 'Accusing someone of an offense they did not commit.',
    descriptionBn: 'কারো ওপর এমন দোষ চাপানো যা সে করেনি।',
    islamicReferenceId: 'ref-speech-quran'
  },
  {
    id: 'speech-09',
    nameEn: 'Speaking rudely to parents or elders',
    nameBn: 'বাবা-মা বা জ্যেষ্ঠদের সাথে কটু ভাষায় কথা বলা',
    category: 'speech',
    severity: 4,
    classification: 'sin',
    descriptionEn: 'Raising voice or using disrespect toward parents/elders.',
    descriptionBn: 'মা-বাবা বা মুরুব্বীদের সাথে মেজাজ দেখিয়ে বা উঁচু গলায় কথা বলা।',
    islamicReferenceId: 'ref-parents-quran'
  },
  {
    id: 'speech-10',
    nameEn: 'Arguing purely to win or show superiority',
    nameBn: 'অহংকার প্রকাশে অযথা তর্ক করা',
    category: 'speech',
    severity: 2,
    classification: 'character_issue',
    descriptionEn: 'Engaging in stubborn arguments without seeking truth.',
    descriptionBn: 'নিজের অহংকার ধরে রাখতে অযথা বাদানুবাদ বা তর্ক করা।',
    islamicReferenceId: 'ref-tongue-hadith'
  },
  {
    id: 'speech-11',
    nameEn: 'Boasting / Bragging about personal accomplishments',
    nameBn: 'নিজের কৃতিত্ব নিয়ে বাহাদুরি করা বা অহংকার প্রকাশ',
    category: 'speech',
    severity: 2,
    classification: 'character_issue',
    descriptionEn: 'Speaking in a way that shows off wealth, knowledge, or deeds.',
    descriptionBn: 'নিজের আমল, টাকা-পয়সা বা সাফল্য নিয়ে বড়াই করা।',
    islamicReferenceId: 'ref-arrogance-hadith'
  },
  {
    id: 'speech-12',
    nameEn: 'Complaining excessively about Allah’s decree',
    nameBn: 'আল্লাহর সিদ্ধান্তের ওপর অতিরিক্ত অসন্তোষ প্রকাশ',
    category: 'speech',
    severity: 3,
    classification: 'sin',
    descriptionEn: 'Uttering statements of discontent regarding Qadar.',
    descriptionBn: 'তকদির বা ভাগ্য নিয়ে মুখে অসন্তোষ বা নালিশসূচক কথা বলা।',
    islamicReferenceId: 'ref-patience-quran'
  },
  {
    id: 'speech-13',
    nameEn: 'Slander / Namimah (tale-bearing to cause conflict)',
    nameBn: 'চোগলখুরি (দ্বন্দ্ব লাগানোর উদ্দেশ্যে কথা লাগানো)',
    category: 'speech',
    severity: 3,
    classification: 'sin',
    descriptionEn: 'Carrying stories between people to damage their relationship.',
    descriptionBn: 'দুইজনের মধ্যে সম্পর্ক নষ্ট করতে একজনের কথা অন্যজনকে বলা।',
    islamicReferenceId: 'ref-namimah-hadith'
  },
  {
    id: 'speech-14',
    nameEn: 'Swearing an oath by other than Allah',
    nameBn: 'আল্লাহ ছাড়া অন্য কিছুর নামে কসম খাওয়া',
    category: 'speech',
    severity: 3,
    classification: 'sin',
    descriptionEn: 'Swearing by father, life, or anything other than Allah.',
    descriptionBn: 'মা-বাবার মাথা ছুঁয়ে, জীবনের কসম বা আল্লাহ ছাড়া অন্যের নামে কসম।',
    islamicReferenceId: 'ref-truth-hadith'
  },
  {
    id: 'speech-15',
    nameEn: 'Making fun of religious teachings or Sunnah',
    nameBn: 'দ্বীনের কোনো বিধান বা সুন্নাহ নিয়ে ঠাট্টা করা',
    category: 'speech',
    severity: 4,
    classification: 'sin',
    descriptionEn: 'Mocking Islamic practices, beard, hijab, or Hadith.',
    descriptionBn: 'দাড়ি, হিজাব, নামাজ বা সুন্নাহ নিয়ে ঠাট্টা-মশকরা করা।',
    islamicReferenceId: 'ref-speech-quran'
  },
  {
    id: 'speech-16',
    nameEn: 'Revealing someone’s private secret',
    nameBn: 'কারো গোপন তথ্য বা আমানত প্রকাশ করে দেওয়া',
    category: 'speech',
    severity: 3,
    classification: 'sin',
    descriptionEn: 'Disclosing a secret entrusted to you.',
    descriptionBn: 'কেউ গোপন কথা ভরসা করে বললে তা অন্য কারও কাছে ফাঁস করা।',
    islamicReferenceId: 'ref-truth-hadith'
  },
  {
    id: 'speech-17',
    nameEn: 'Using sarcastic or demoralizing remarks',
    nameBn: 'কাউকে খোঁচা মেরে বা তাচ্ছিল্য করে কথা বলা',
    category: 'speech',
    severity: 2,
    classification: 'character_issue',
    descriptionEn: 'Dropping hurtful sarcasm aimed at diminishing others.',
    descriptionBn: 'কাউকে নিচু করতে খোঁচা দিয়ে বা তাচ্ছিল্যপূর্ণ মন্তব্য করা।',
    islamicReferenceId: 'ref-speech-quran'
  },
  {
    id: 'speech-18',
    nameEn: 'Lying in jest / joking lying',
    nameBn: 'হাসি-ঠাট্টার ছলেও মিথ্যা বলা',
    category: 'speech',
    severity: 2,
    classification: 'sin',
    descriptionEn: 'Making up fake stories just to make people laugh.',
    descriptionBn: 'মানুষকে হাসাতে গিয়ে বানাওয়াট গল্প বা মিথ্যা বলা।',
    islamicReferenceId: 'ref-truth-hadith'
  },
  {
    id: 'speech-19',
    nameEn: 'Curses or wishing harm upon someone',
    nameBn: 'কাউকে অভিশাপ দেওয়া বা বদদোয়া করা',
    category: 'speech',
    severity: 2,
    classification: 'sin',
    descriptionEn: 'Invoking curses upon believers or creations excessively.',
    descriptionBn: 'কাউকে লানত বা ক্ষতিকর বদদোয়া দেওয়া।',
    islamicReferenceId: 'ref-tongue-hadith'
  },
  {
    id: 'speech-20',
    nameEn: 'Exaggerating stories to gain attention',
    nameBn: 'কথা বাড়িয়ে বাড়িয়ে বলা বা অতিরঞ্জন করা',
    category: 'speech',
    severity: 1,
    classification: 'bad_habit',
    descriptionEn: 'Adding false hype to real events.',
    descriptionBn: 'দৃষ্টি আকর্ষণ করতে স্বাভাবিক ঘটনাকে বাড়িয়ে মিথ্যা মিশিয়ে বলা।',
    islamicReferenceId: 'ref-truth-hadith'
  },

  // --- THOUGHTS & HEART (51-80) ---
  {
    id: 'thoughts-01',
    nameEn: 'Entertaining lustful fantasies intentionally',
    nameBn: 'ইচ্ছাকৃতভাবে কামুক চিন্তা বা কল্পনায় ডুবে থাকা',
    category: 'thoughts',
    severity: 2,
    classification: 'temptation',
    descriptionEn: 'Actively continuing and enjoying immoral daydreaming.',
    descriptionBn: 'বাজে চিন্তা আসায় তা দূর না করে ইচ্ছাকৃত উপভোগ করা।',
    islamicReferenceId: 'ref-heart-hadith'
  },
  {
    id: 'thoughts-02',
    nameEn: 'Jealousy (Hasad) over someone else’s blessings',
    nameBn: 'কারো ভালো কিছু দেখে হিংসা (হাসাদ) অনুভব করা',
    category: 'thoughts',
    severity: 3,
    classification: 'character_issue',
    descriptionEn: 'Wishing that Allah’s blessing be taken away from another.',
    descriptionBn: 'অন্যের নিয়ামত বা ভালো কিছু দেখে তা ধ্বংস হওয়ার কামনা করা।',
    islamicReferenceId: 'ref-heart-hadith'
  },
  {
    id: 'thoughts-03',
    nameEn: 'Arrogance (Kibr) - thinking I am better than others',
    nameBn: 'অহংকার (কিবর) - নিজেকে অন্যদের চেয়ে শ্রেষ্ঠ মনে করা',
    category: 'thoughts',
    severity: 3,
    classification: 'character_issue',
    descriptionEn: 'Feeling superior or looking down upon fellow humans.',
    descriptionBn: 'মনোভাবে অন্যকে তুচ্ছ মনে করা ও নিজের শ্রেষ্ঠত্বের ভাব রাখা।',
    islamicReferenceId: 'ref-arrogance-hadith'
  },
  {
    id: 'thoughts-04',
    nameEn: 'Entertaining revenge thoughts against someone',
    nameBn: 'কারো ক্ষতি বা প্রতিশোধ নেওয়ার চিন্তায় মগ্ন থাকা',
    category: 'thoughts',
    severity: 2,
    classification: 'character_issue',
    descriptionEn: 'Planning or mulling over harmful vengeance.',
    descriptionBn: 'কারো ওপর রিভেঞ্জ বা ক্ষতি করার প্ল্যান মাথায় ঘুরানো।',
    islamicReferenceId: 'ref-heart-hadith'
  },
  {
    id: 'thoughts-05',
    nameEn: 'Hatred or malice toward a fellow Muslim',
    nameBn: 'কোনো মুসলিম ভাইয়ের প্রতি মনে হিংসা-বিদ্বেষ পুষে রাখা',
    category: 'thoughts',
    severity: 3,
    classification: 'character_issue',
    descriptionEn: 'Harboring deep grudge or rancor in the heart.',
    descriptionBn: 'অন্তরে হিংসা, বিদ্বেষ ও শত্রুতা লালন করা।',
    islamicReferenceId: 'ref-heart-hadith'
  },
  {
    id: 'thoughts-06',
    nameEn: 'Doubts about Allah’s mercy or despair',
    nameBn: 'আল্লাহর রহমত থেকে নিরাশ হওয়া বা সংশয় সৃষ্টি',
    category: 'thoughts',
    severity: 3,
    classification: 'sin',
    descriptionEn: 'Thinking Allah will not forgive or assist.',
    descriptionBn: 'আল্লাহর দয়া থেকে মন থেকে নিরাশ হয়ে যাওয়া।',
    islamicReferenceId: 'ref-tawbah-quran'
  },
  {
    id: 'thoughts-07',
    nameEn: 'Self-righteousness (Ujb) - pride in worship',
    nameBn: 'নিজের ইবাদত নিয়ে আত্মতুষ্টি বা গর্ব বোধ করা (উجب)',
    category: 'thoughts',
    severity: 2,
    classification: 'character_issue',
    descriptionEn: 'Feeling impressed by one’s own good deeds.',
    descriptionBn: 'নিজের নামায বা ভালো কাজ দেখে নিজেকে বড় বুজুর্গ মনে করা।',
    islamicReferenceId: 'ref-arrogance-hadith'
  },
  {
    id: 'thoughts-08',
    nameEn: 'Riya - desire for people’s praise during worship',
    nameBn: 'রিয়া - মানুষের প্রশংসা পাওয়ার আশায় ইবাদত করা',
    category: 'thoughts',
    severity: 4,
    classification: 'sin',
    descriptionEn: 'Performing acts of worship so people will admire you.',
    descriptionBn: 'মানুষকে দেখানোর জন্য বা বাহবা পাওয়ার নিয়তে ইবাদত করা।',
    islamicReferenceId: 'ref-riya-quran'
  },
  {
    id: 'thoughts-09',
    nameEn: 'Unwanted intrusive thought (Passed quickly)',
    nameBn: 'অযাচিত খারাপ চিন্তা (যা তৎক্ষণাৎ দূর করা হয়েছে)',
    category: 'thoughts',
    severity: 1,
    classification: 'unwanted_thought',
    descriptionEn: 'Fleeting whisper (Waswas) rejected immediately.',
    descriptionBn: 'মাথায় শয়তানের ওয়াসওয়াসা আসামাত্র তা প্রত্যাখ্যান করা (পাপ নয়)।',
    islamicReferenceId: 'ref-waswas-hadith'
  },
  {
    id: 'thoughts-10',
    nameEn: 'Suspicion / Thinking ill of a brother (Su-an-Dhan)',
    nameBn: 'কাউকে নিয়ে অহেতুক খারাপ ধারণা পোষণ করা (সৃ-অান-জান)',
    category: 'thoughts',
    severity: 2,
    classification: 'character_issue',
    descriptionEn: 'Assuming bad intentions without evidence.',
    descriptionBn: 'প্রমাণ ছাড়াই কারো উদ্দেশ্য সম্পর্কে খারাপ ধারণা করে বসা।',
    islamicReferenceId: 'ref-speech-quran'
  },
  {
    id: 'thoughts-11',
    nameEn: 'Greed & love of excessive worldly wealth (Hubb ad-Dunya)',
    nameBn: 'দুনিয়ার মোহ ও অতিরিক্ত সম্পদের লোভ',
    category: 'thoughts',
    severity: 2,
    classification: 'character_issue',
    descriptionEn: 'Fixating heart purely on material acquisitions.',
    descriptionBn: 'আখেরাত ভুলে কেবল পার্থিব টাকা-পয়সার চিন্তায় বিভোর থাকা।',
    islamicReferenceId: 'ref-heart-hadith'
  },
  {
    id: 'thoughts-12',
    nameEn: 'Ungratefulness to Allah in the heart',
    nameBn: 'অন্তরে আল্লাহর নিয়ামতের প্রতি অকৃতজ্ঞতা',
    category: 'thoughts',
    severity: 2,
    classification: 'character_issue',
    descriptionEn: 'Focusing on what is lacking rather than abundant blessings.',
    descriptionBn: 'অগণিত নিয়ামত পাওয়ার পরও মনে মনে ক্ষোভ রাখা।',
    islamicReferenceId: 'ref-patience-quran'
  },

  // --- ANGER & TEMPER (81-100) ---
  {
    id: 'anger-01',
    nameEn: 'Losing temper and shouting at family/friends',
    nameBn: 'মেজাজ হারিয়ে পরিবার বা বন্ধুদের ওপর চিৎকার করা',
    category: 'anger',
    severity: 3,
    classification: 'sin',
    descriptionEn: 'Uncontrolled rage expressed through shouting.',
    descriptionBn: 'রাগ নিয়ন্ত্রণ করতে না পেরে চেঁচামেচি করা।',
    islamicReferenceId: 'ref-anger-hadith'
  },
  {
    id: 'anger-02',
    nameEn: 'Slamming objects or throwing things in anger',
    nameBn: 'রাগের মাথায় জিনিসপত্র ভাঙচুর করা বা ছুড়ে মারা',
    category: 'anger',
    severity: 3,
    classification: 'character_issue',
    descriptionEn: 'Destructive physical outbursts due to anger.',
    descriptionBn: 'রাগে থালাবাসন, ফোন বা জিনিসপত্র আছাড় দেওয়া।',
    islamicReferenceId: 'ref-anger-hadith'
  },
  {
    id: 'anger-03',
    nameEn: 'Holding a grudge and refusing to forgive',
    nameBn: 'মনে শত্রুতা পুষে রাখা ও মাফ করতে অস্বীকৃতি',
    category: 'anger',
    severity: 2,
    classification: 'character_issue',
    descriptionEn: 'Refusing reconciliation when apologies are made.',
    descriptionBn: 'কেউ ক্ষমা চাওয়া সত্ত্বেও তাকে ক্ষমা না করে দূরত্ব রাখা।',
    islamicReferenceId: 'ref-patience-quran'
  },
  {
    id: 'anger-04',
    nameEn: 'Insulting someone while enraged',
    nameBn: 'রাগের মাথায় কাউকে অপমান বা গালি দেওয়া',
    category: 'anger',
    severity: 3,
    classification: 'sin',
    descriptionEn: 'Using derogatory words during arguments.',
    descriptionBn: 'রাগের বশে মুখে কটু কথা বা নোংরা গালি আসা।',
    islamicReferenceId: 'ref-anger-hadith'
  },
  {
    id: 'anger-05',
    nameEn: 'Being aggressive or threating in speech',
    nameBn: 'কথাবার্তায় আক্রমণাত্মক বা হুমকির সুর ব্যবহার',
    category: 'anger',
    severity: 3,
    classification: 'sin',
    descriptionEn: 'Threatening violence or harm in anger.',
    descriptionBn: 'কাউকে আঘাত বা ক্ষতি করার হুমকি দেওয়া।',
    islamicReferenceId: 'ref-anger-hadith'
  },
  {
    id: 'anger-06',
    nameEn: 'Refusing to seek Seek Refuge (A\'udhubillah) when angry',
    nameBn: 'রাগ ওঠার সময় আউযুবিল্লাহ পড়া থেকে বিরত থাকা',
    category: 'anger',
    severity: 1,
    classification: 'missed_goal',
    descriptionEn: 'Forgetting Sunnah remedies for anger control.',
    descriptionBn: 'রাগ নামানোর সুন্নাহ আমলগুলো ভুলে মেজাজ ধরে রাখা।',
    islamicReferenceId: 'ref-anger-hadith'
  },

  // --- TIME & DISCIPLINE (101-135) ---
  {
    id: 'time-01',
    nameEn: 'Excessive mindless social media scrolling',
    nameBn: 'সোশ্যাল মিডিয়ায় ঘণ্টার পর ঘণ্টা অনর্থক স্ক্রলিং',
    category: 'time',
    severity: 2,
    classification: 'time_wasting',
    descriptionEn: 'Wasting hours on feed without beneficial intent.',
    descriptionBn: 'ফেসবুক, রিলস বা ইনস্টাগ্রামে মূল্যবান সময় নষ্ট করা।',
    islamicReferenceId: 'ref-time-hadith'
  },
  {
    id: 'time-02',
    nameEn: 'Procrastinating on important responsibilities',
    nameBn: 'গুরুত্বপূর্ণ কাজে অহেতুক আলসেমি ও দেরি করা',
    category: 'time',
    severity: 2,
    classification: 'bad_habit',
    descriptionEn: 'Delaying duty, study, or work unnecessarily.',
    descriptionBn: 'পড়াশোনা, কাজ বা দায়িত্ব ফেলে রেখে অলস সময় কাটানো।',
    islamicReferenceId: 'ref-time-hadith'
  },
  {
    id: 'time-03',
    nameEn: 'Staying up late at night for useless entertainment',
    nameBn: 'অনর্থক বিনোদনের জন্য রাত জাগা',
    category: 'time',
    severity: 2,
    classification: 'bad_habit',
    descriptionEn: 'Staying awake past bedtime for gaming or shows, risking Fajr.',
    descriptionBn: 'গেম বা ভিডিও দেখে রাত জেগে ফজর মিস করার ঝুঁকি বাড়ানো।',
    islamicReferenceId: 'ref-time-hadith'
  },
  {
    id: 'time-04',
    nameEn: 'Excessive video gaming',
    nameBn: 'অতিরিক্ত গেম খেলা',
    category: 'time',
    severity: 2,
    classification: 'time_wasting',
    descriptionEn: 'Playing games for long hours neglecting worship or duties.',
    descriptionBn: 'গেমের নেশায় ইবাদত ও পরিবারকে অবহেলা করা।',
    islamicReferenceId: 'ref-time-hadith'
  },
  {
    id: 'time-05',
    nameEn: 'Binge-watching movies or TV series',
    nameBn: 'একটানা সিনেমা বা ড্রামা সিরিজ দেখা',
    category: 'time',
    severity: 2,
    classification: 'time_wasting',
    descriptionEn: 'Consuming hours of screen time continuously.',
    descriptionBn: 'সারাদিন বা সারা রাত সিরিজ দেখে সময় ধ্বংস করা।',
    islamicReferenceId: 'ref-time-hadith'
  },
  {
    id: 'time-06',
    nameEn: 'Neglecting studies or job tasks',
    nameBn: 'পড়াশোনা বা অফিসের দায়িত্বে অবহেলা',
    category: 'time',
    severity: 2,
    classification: 'missed_goal',
    descriptionEn: 'Failing to complete required productivity goals.',
    descriptionBn: 'নিজের পড়াশোনা বা দায়িত্ব সময়মতো না করা।',
    islamicReferenceId: 'ref-time-hadith'
  },
  {
    id: 'time-07',
    nameEn: 'Over-sleeping out of pure laziness',
    nameBn: 'অলসতার কারণে অতিরিক্ত ঘুমানো',
    category: 'time',
    severity: 1,
    classification: 'bad_habit',
    descriptionEn: 'Sleeping excessively far beyond body needs.',
    descriptionBn: 'প্রয়োজনের চেয়ে অনেক বেশি ঘুমিয়ে বেলা পার করা।',
    islamicReferenceId: 'ref-time-hadith'
  },
  {
    id: 'time-08',
    nameEn: 'Sitting in idle gatherings without purpose',
    nameBn: 'অনর্থক আড্ডায় সময় নষ্ট করা',
    category: 'time',
    severity: 1,
    classification: 'time_wasting',
    descriptionEn: 'Losing productivity in unproductive street/online hangouts.',
    descriptionBn: 'বেহুদা আড্ডায় জীবনের মূল্যবান সময় ব্যয় করা।',
    islamicReferenceId: 'ref-time-hadith'
  },

  // --- ISLAMIC DISCIPLINE (136-160) ---
  {
    id: 'islamic-01',
    nameEn: 'Delayed Salah until end of time without valid excuse',
    nameBn: 'ওজর ছাড়াই একদম শেষ ওয়াক্তে নামায পড়া',
    category: 'islamic_discipline',
    severity: 2,
    classification: 'sin',
    descriptionEn: 'Postponing prayer due to laziness or distraction.',
    descriptionBn: 'অলসতা বা কাজের অজুহাতে ওয়াক্ত পার হতে যাওয়া নামায পড়া।',
    islamicReferenceId: 'ref-salah-quran'
  },
  {
    id: 'islamic-02',
    nameEn: 'Completely missed a compulsory Salah',
    nameBn: 'ফরজ নামায পুরোপুরি মিস করা',
    category: 'islamic_discipline',
    severity: 4,
    classification: 'sin',
    descriptionEn: 'Failing to pray a daily prayer before its time expired.',
    descriptionBn: 'কোনো কারণ ছাড়াই ফরজ নামাযের ওয়াক্ত পার হতে দেওয়া।',
    islamicReferenceId: 'ref-salah-quran'
  },
  {
    id: 'islamic-03',
    nameEn: 'Rushing through Salah without concentration (Khushu)',
    nameBn: 'খুশু-খুজু ছাড়া তড়িঘড়ি করে নামায শেষ করা',
    category: 'islamic_discipline',
    severity: 2,
    classification: 'missed_goal',
    descriptionEn: 'Praying mechanically fast without understanding or focus.',
    descriptionBn: 'মনোযোগ ও ধীরস্থিরতা ছাড়া দ্রুত রুকু-সেজদা করা।',
    islamicReferenceId: 'ref-salah-quran'
  },
  {
    id: 'islamic-04',
    nameEn: 'Neglected regular daily Quran reading',
    nameBn: 'দৈনন্দিন কুরআন তিলওয়াত না করা',
    category: 'islamic_discipline',
    severity: 1,
    classification: 'missed_goal',
    descriptionEn: 'Passing the day without opening or listening to Quran.',
    descriptionBn: 'সারাদিনে কুরআন থেকে একটুও তেলাওয়াত বা চিন্তা না করা।',
    islamicReferenceId: 'ref-quran-reading'
  },
  {
    id: 'islamic-05',
    nameEn: 'Neglected Morning & Evening Adhkar',
    nameBn: 'সকাল-সন্ধ্যার মাসনুন জিকির না করা',
    category: 'islamic_discipline',
    severity: 1,
    classification: 'missed_goal',
    descriptionEn: 'Skipping routine protective daily adhkar.',
    descriptionBn: 'নিয়মিত হেফাজতের জিকিরগুলো ছেড়ে দেওয়া।',
    islamicReferenceId: 'ref-dhikr-quran'
  },
  {
    id: 'islamic-06',
    nameEn: 'Missed Jummah prayer without valid Shariah excuse',
    nameBn: 'ওজর ছাড়া জুমার নামায মিস করা',
    category: 'islamic_discipline',
    severity: 4,
    classification: 'sin',
    descriptionEn: 'Failing to attend Friday congregation.',
    descriptionBn: 'শরীয়তসম্মত কারণ ছাড়া জুমার নামাযে না যাওয়া।',
    islamicReferenceId: 'ref-salah-quran'
  },
  {
    id: 'islamic-07',
    nameEn: 'Praying congregation at home out of sheer laziness',
    nameBn: 'অলসতার কারণে মসজিদে না গিয়ে একা ঘরে পড়া',
    category: 'islamic_discipline',
    severity: 2,
    classification: 'missed_goal',
    descriptionEn: 'Ignoring nearby mosque call to prayer without cause.',
    descriptionBn: 'মসজিদে জামায়াতের সুযোগ থাকা সত্ত্বেও ঘরে অলসতা করে পড়া।',
    islamicReferenceId: 'ref-salah-quran'
  },

  // --- DIGITAL & SMARTPHONE HABITS (161-180) ---
  {
    id: 'digital-01',
    nameEn: 'Checking phone immediately upon waking up instead of Dua',
    nameBn: 'সকালে ঘুম থেকে উঠেই দোয়া না পড়ে ফোন স্ক্রল করা',
    category: 'digital',
    severity: 1,
    classification: 'bad_habit',
    descriptionEn: 'First conscious minutes spent on screen rather than remembrance.',
    descriptionBn: 'চোখ মেলেই আল্লাহর জিকির ও দোয়ার বদলে নোটিফিকেশন চেক।',
    islamicReferenceId: 'ref-dhikr-quran'
  },
  {
    id: 'digital-02',
    nameEn: 'Taking phone into bathroom/toilet unnecessarily',
    nameBn: 'টয়লেটে অহেতুক ফোন নিয়ে বসে সময় নষ্ট',
    category: 'digital',
    severity: 1,
    classification: 'bad_habit',
    descriptionEn: 'Lingering in bathroom while browsing device.',
    descriptionBn: 'টয়লেটে ফোন স্ক্রল করে অহেতুক দীর্ঘক্ষণ থাকা।',
    islamicReferenceId: 'ref-time-hadith'
  },
  {
    id: 'digital-03',
    nameEn: 'Posting online for public validation or pride',
    nameBn: 'মানুষের বাহবা বা লোকদেখানোর জন্য সোশ্যাল পোস্ট',
    category: 'digital',
    severity: 2,
    classification: 'character_issue',
    descriptionEn: 'Seeking ego boost through likes and followers.',
    descriptionBn: 'লাইক, কমেন্ট ও রিঅ্যাকশন পাওয়ার লোভে অহংকারমূলক পোস্ট।',
    islamicReferenceId: 'ref-riya-quran'
  },
  {
    id: 'digital-04',
    nameEn: 'Using phone during family meals or conversations',
    nameBn: 'পরিবারের সাথে খাওয়ার টেবিলে বা আড্ডায় ফোনে নিমগ্ন',
    category: 'digital',
    severity: 1,
    classification: 'bad_habit',
    descriptionEn: 'Ignoring loved ones while glued to a screen.',
    descriptionBn: 'পরিবারের উপস্থিতি সত্ত্বেও ফোনে মনোযোগ দিয়ে অন্যদের অবহেলা।',
    islamicReferenceId: 'ref-parents-quran'
  },
  {
    id: 'digital-05',
    nameEn: 'Listening to vulgar or explicit music lyrics',
    nameBn: 'অশালীন কথা ও সুরের মিউজিক শোনা',
    category: 'digital',
    severity: 2,
    classification: 'bad_habit',
    descriptionEn: 'Filling ears with lyrics promoting sins or lust.',
    descriptionBn: 'গালি বা অনৈতিকতা উসকে দেয় এমন গান শোনা।',
    islamicReferenceId: 'ref-tongue-hadith'
  },

  // --- MONEY & TRANSACTIONS (181-195) ---
  {
    id: 'finance-01',
    nameEn: 'Extravagant / Wasteful spending (Israf)',
    nameBn: 'অহেতুক অপচয় করা (ইসরাফ)',
    category: 'finance',
    severity: 2,
    classification: 'sin',
    descriptionEn: 'Spending money on unnecessary luxuries or impulse items.',
    descriptionBn: 'প্রয়োজন ছাড়া কেবল শখে টাকা অপচয় করা।',
    islamicReferenceId: 'ref-israf-quran'
  },
  {
    id: 'finance-02',
    nameEn: 'Stinginess (Bukhl) when charity or duty was required',
    nameBn: 'কৃপণতা করা যখন সাহায্য করা দায়িত্ব ছিল',
    category: 'finance',
    severity: 2,
    classification: 'character_issue',
    descriptionEn: 'Withholding financial assistance from needy or family.',
    descriptionBn: 'সক্ষমতা থাকা সত্ত্বেও পরিবার বা মিসকিনকে দিতে কার্পণ্য।',
    islamicReferenceId: 'ref-israf-quran'
  },
  {
    id: 'finance-03',
    nameEn: 'Cheating or small dishonesty in business/transactions',
    nameBn: 'লেনদেনে ছোটখাটো চাতুরি বা অসাধুতা',
    category: 'finance',
    severity: 3,
    classification: 'sin',
    descriptionEn: 'Misleading buyers or taking unfair advantage.',
    descriptionBn: 'ক্রয়-বিক্রয় বা লেনদেনে তথ্য লুকিয়ে ধোঁকা দেওয়া।',
    islamicReferenceId: 'ref-truth-hadith'
  },

  // --- HEALTH & LAZINESS (196-210) ---
  {
    id: 'health-01',
    nameEn: 'Excessive gluttonous eating (Overeating)',
    nameBn: 'মাত্রাতিরিক্ত আহার বা পেট ভরে অপচয় করে খাওয়া',
    category: 'health_food',
    severity: 1,
    classification: 'bad_habit',
    descriptionEn: 'Filling stomach past capacity out of greed.',
    descriptionBn: 'সুন্নাহর ১/৩ নিয়মের তোয়াক্কা না করে পেট পুরে অলস হওয়া।',
    islamicReferenceId: 'ref-health-hadith'
  },
  {
    id: 'health-02',
    nameEn: 'Consuming unhealthy junk food excessively',
    nameBn: 'স্বাস্থ্যের জন্য ক্ষতিকর ফাস্টফুড মাত্রাতিরিক্ত খাওয়া',
    category: 'health_food',
    severity: 1,
    classification: 'bad_habit',
    descriptionEn: 'Damaging body health which is a trust from Allah.',
    descriptionBn: 'আল্লাহর দেওয়া আমানত শরীরকে ফাস্টফুড দিয়ে ক্ষতি করা।',
    islamicReferenceId: 'ref-health-hadith'
  },
  {
    id: 'health-03',
    nameEn: 'Complete lack of physical exercise / Sedentary laziness',
    nameBn: 'শারীরিক ব্যায়ামের চরম অবহেলা ও অলসতা',
    category: 'health_food',
    severity: 1,
    classification: 'missed_goal',
    descriptionEn: 'Neglecting physical fitness and strength.',
    descriptionBn: 'শরীর চাঙ্গা ও ইবাদতে সক্ষম রাখতে ব্যায়াম বা হাঁটা ছেড়ে দেওয়া।',
    islamicReferenceId: 'ref-health-hadith'
  },
  {
    id: 'health-04',
    nameEn: 'Neglecting personal cleanliness or Sunnah hygiene',
    nameBn: 'ব্যক্তিগত পরিচ্ছন্নতা ও সুন্নতি পবিত্রতায় অবহেলা',
    category: 'health_food',
    severity: 1,
    classification: 'bad_habit',
    descriptionEn: 'Failing to clean teeth, nails, or clothes.',
    descriptionBn: 'মেসওয়াক, হাত-মুখ ধোয়া বা সুন্নতি পরিচ্ছন্নতা এড়িয়ে যাওয়া।',
    islamicReferenceId: 'ref-health-hadith'
  },

  // --- FAMILY & SOCIAL RELATIONS (211-225) ---
  {
    id: 'family-01',
    nameEn: 'Ignoring parents’ reasonable requests or calls',
    nameBn: 'বাবা-মায়ের সঠিক কোনো নির্দেশ বা ডাক উপেক্ষা করা',
    category: 'family_social',
    severity: 3,
    classification: 'sin',
    descriptionEn: 'Disregarding parents when they need help.',
    descriptionBn: 'মা-বাবা ডাকলে বা কিছু করতে বললে অবজ্ঞা করা।',
    islamicReferenceId: 'ref-parents-quran'
  },
  {
    id: 'family-02',
    nameEn: 'Cutting off ties with relatives (Shattering Silat al-Rahim)',
    nameBn: 'আত্মীয়তার সম্পর্ক ছেদ করা বা রাগ করে কথা বন্ধ রাখা',
    category: 'family_social',
    severity: 3,
    classification: 'sin',
    descriptionEn: 'Refusing communication with close relatives.',
    descriptionBn: 'আত্মীয়দের সাথে খামাখা সম্পর্ক ছিন্ন বা কথা না বলা।',
    islamicReferenceId: 'ref-parents-quran'
  },
  {
    id: 'family-03',
    nameEn: 'Being rude or unhelpful to neighbors',
    nameBn: 'প্রতিবেশীর সাথে অসৌজন্যমূলক আচরণ করা',
    category: 'family_social',
    severity: 2,
    classification: 'character_issue',
    descriptionEn: 'Failing to maintain rights of neighbors.',
    descriptionBn: 'প্রতিবেশীকে কষ্ট দেওয়া বা তাদের বিপদে এগিয়ে না আসা।',
    islamicReferenceId: 'ref-speech-quran'
  },
  {
    id: 'family-04',
    nameEn: 'Failing to keep home environment peaceful',
    nameBn: 'ঘরের পরিবেশ শান্ত রাখার জায়গায় ঝগড়া বাঁধানো',
    category: 'family_social',
    severity: 2,
    classification: 'bad_habit',
    descriptionEn: 'Instigating trivial domestic disputes.',
    descriptionBn: 'তুচ্ছ কারণে সংসারে অশান্তি বা কটু পরিবেশ তৈরি।',
    islamicReferenceId: 'ref-parents-quran'
  },
  {
    id: 'family-05',
    nameEn: 'Selfish behavior prioritizing self over family needs',
    nameBn: 'পরিবারের প্রয়োজন বাদ দিয়ে নিজের স্বার্থকে প্রাধান্য দেওয়া',
    category: 'family_social',
    severity: 2,
    classification: 'character_issue',
    descriptionEn: 'Putting self-gratification ahead of family obligations.',
    descriptionBn: 'পরিবারের প্রতি দায়িত্ব না পালন করে স্বার্থপরতা করা।',
    islamicReferenceId: 'ref-parents-quran'
  },
  ...BANG_DEED_OPTIONS
];

// Set countable boolean property for every option
const NON_COUNTABLE_IDS = new Set([
  'thoughts-03', // Arrogance / mindset
  'thoughts-06', // Doubts about mercy
  'thoughts-11', // Greed & love of Dunya
  'thoughts-12', // Ungratefulness in heart
  'family-05'    // Selfish mindset
]);

SEED_BAD_DEED_OPTIONS.forEach(opt => {
  if (opt.countable === undefined) {
    opt.countable = !NON_COUNTABLE_IDS.has(opt.id);
  }
});

