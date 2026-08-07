import { GoogleGenAI, Type } from '@google/genai';
import { AIPersonalSession, DailyRecord } from '../types';

export async function generatePersonalAISession(
  type: 'daily' | 'weekly' | 'monthly',
  targetDate: string,
  targetRecord: DailyRecord,
  historyRecords: DailyRecord[],
  language: 'en' | 'bn',
  apiKey?: string
): Promise<AIPersonalSession> {
  // 1. Compute analytical stats from records
  const isDaily = type === 'daily';
  const isWeekly = type === 'weekly';

  // Current period total incidents (summing quantity!)
  const currentIncidents = targetRecord.badDeeds.reduce((acc, b) => acc + (b.quantity || 1), 0);
  const currentGoodDeeds = targetRecord.goodDeeds.reduce((acc, g) => acc + (g.quantity || 1), 0);
  const currentVictories = targetRecord.nafsVictories.length;

  // Previous day / period record
  const targetTime = new Date(targetDate + 'T12:00:00').getTime();
  const prevDayStr = new Date(targetTime - 86400000).toISOString().split('T')[0];
  const prevDayRecord = historyRecords.find(r => r.date === prevDayStr);
  const prevIncidents = prevDayRecord ? prevDayRecord.badDeeds.reduce((acc, b) => acc + (b.quantity || 1), 0) : 0;

  // 7-day stats
  const recent7Days = historyRecords.filter(r => {
    const t = new Date(r.date + 'T12:00:00').getTime();
    return t <= targetTime && t >= targetTime - 7 * 86400000;
  });
  const total7DayIncidents = recent7Days.reduce((acc, r) => acc + r.badDeeds.reduce((a, b) => a + (b.quantity || 1), 0), 0);
  const avg7DayIncidents = recent7Days.length > 0 ? (total7DayIncidents / recent7Days.length).toFixed(1) : '0';

  // Prayers consistency
  const prayers = Object.values(targetRecord.prayers);
  const completedPrayersCount = prayers.filter(p => p.status === 'completed' || p.status === 'qada').length;
  const prayerPercentage = Math.round((completedPrayersCount / 5) * 100);

  // Trigger detection from bad deeds
  const triggersMap: Record<string, number> = {};
  targetRecord.badDeeds.forEach(b => {
    if (b.trigger) {
      triggersMap[b.trigger] = (triggersMap[b.trigger] || 0) + (b.quantity || 1);
    }
    triggersMap[b.category] = (triggersMap[b.category] || 0) + (b.quantity || 1);
  });
  const topTriggers = Object.entries(triggersMap)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(e => e[0]);

  // Attempt Gemini API call if key is available
  if (apiKey) {
    try {
      const ai = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build'
          }
        }
      });

      const summaryContext = {
        sessionType: type,
        date: targetDate,
        targetDayScore: targetRecord.score,
        targetDayIncidentsCount: currentIncidents,
        targetDayGoodDeedsCount: currentGoodDeeds,
        targetDayNafsVictoriesCount: currentVictories,
        prayerCompletionPercentage: `${prayerPercentage}%`,
        previousDayIncidentsCount: prevIncidents,
        avg7DayIncidents,
        topTriggersIdentified: topTriggers,
        badDeedsLogged: targetRecord.badDeeds.map(b => `${b.name} (${b.quantity || 1} times, trigger: ${b.trigger || 'none'})`),
        goodDeedsLogged: targetRecord.goodDeeds.map(g => g.name),
        nafsVictoriesLogged: targetRecord.nafsVictories.map(v => `${v.title} (difficulty: ${v.difficulty})`),
        tawbahCompletedCount: targetRecord.tawbahRecords.filter(t => t.correctiveAction.isCompleted).length
      };

      const prompt = `
You are a private, wise, non-judgmental Islamic self-accountability AI engine.
Generate a structured ${type.toUpperCase()} personal session review.
Target Data: ${JSON.stringify(summaryContext)}.

Strict guidelines:
- NOT a chatbox or conversational assistant.
- Provide objective, compassionate, data-driven analysis.
- Compare current performance with previous metrics (e.g. "reduced behavior by X%" or "increased for N days").
- Emphasize: Salah consistency -> Nafs discipline -> Sincere Tawbah -> Preventive focus.
- Output JSON format strictly.
      `;

      const response = await ai.models.generateContent({
        model: 'gemini-3.6-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              analysisTitleEn: { type: Type.STRING },
              analysisTitleBn: { type: Type.STRING },
              summaryEn: { type: Type.STRING },
              summaryBn: { type: Type.STRING },
              whatWentWellEn: { type: Type.ARRAY, items: { type: Type.STRING } },
              whatWentWellBn: { type: Type.ARRAY, items: { type: Type.STRING } },
              whatWentWrongEn: { type: Type.ARRAY, items: { type: Type.STRING } },
              whatWentWrongBn: { type: Type.ARRAY, items: { type: Type.STRING } },
              biggestChallengeEn: { type: Type.STRING },
              biggestChallengeBn: { type: Type.STRING },
              biggestVictoryEn: { type: Type.STRING },
              biggestVictoryBn: { type: Type.STRING },
              recommendedActionEn: { type: Type.STRING },
              recommendedActionBn: { type: Type.STRING },
              tomorrowFocusEn: { type: Type.STRING },
              tomorrowFocusBn: { type: Type.STRING },
              trendsTextEn: { type: Type.STRING },
              trendsTextBn: { type: Type.STRING },
              detectedTriggersEn: { type: Type.ARRAY, items: { type: Type.STRING } },
              detectedTriggersBn: { type: Type.ARRAY, items: { type: Type.STRING } },
              recommendationsEn: { type: Type.ARRAY, items: { type: Type.STRING } },
              recommendationsBn: { type: Type.ARRAY, items: { type: Type.STRING } },
            },
            required: [
              'analysisTitleEn', 'analysisTitleBn', 'summaryEn', 'summaryBn',
              'whatWentWellEn', 'whatWentWellBn', 'whatWentWrongEn', 'whatWentWrongBn',
              'biggestChallengeEn', 'biggestChallengeBn', 'biggestVictoryEn', 'biggestVictoryBn',
              'recommendedActionEn', 'recommendedActionBn', 'tomorrowFocusEn', 'tomorrowFocusBn'
            ]
          }
        }
      });

      if (response.text) {
        const parsed = JSON.parse(response.text.trim());
        return {
          type,
          date: targetDate,
          ...parsed,
          generatedAt: new Date().toISOString()
        };
      }
    } catch (e) {
      console.warn('Gemini API personal session generation error, using rule-based fallback:', e);
    }
  }

  // 2. Rule-Based Fallback Engine
  let trendTextEn = '';
  let trendTextBn = '';
  if (prevIncidents > 0) {
    if (currentIncidents < prevIncidents) {
      const reduction = Math.round(((prevIncidents - currentIncidents) / prevIncidents) * 100);
      trendTextEn = `You reduced bad deed incidents by ${reduction}% compared to yesterday (${currentIncidents} vs ${prevIncidents}).`;
      trendTextBn = `আপনি গতকালের তুলনায় খারাপ কাজের ঘটনা ${reduction}% হ্রাস করেছেন (${currentIncidents} টি বনাম ${prevIncidents} টি)।`;
    } else if (currentIncidents > prevIncidents) {
      trendTextEn = `Bad deed incidents increased today (${currentIncidents} vs ${prevIncidents} yesterday). Identify triggers.`;
      trendTextBn = `আজকের খারাপ কাজের ঘটনা বৃদ্ধি পেয়েছে (আজ ${currentIncidents} টি বনাম গতকাল ${prevIncidents} টি)। ট্রিগার চিহ্নিত করুন।`;
    } else {
      trendTextEn = `Incident rate remained steady at ${currentIncidents} incidents compared to yesterday.`;
      trendTextBn = `খারাপ কাজের হার গতকালের মতই ${currentIncidents} টিতে অপরিবর্তিত রয়েছে।`;
    }
  } else {
    trendTextEn = `Logged ${currentIncidents} total incidents today. 7-day average is ${avg7DayIncidents} per day.`;
    trendTextBn = `আজ মোট ${currentIncidents} টি অনাকাঙ্ক্ষিত ঘটনা নথিভুক্ত হয়েছে। ৭ দিনের গড় ${avg7DayIncidents} টি।`;
  }

  const whatWentWellEn: string[] = [];
  const whatWentWellBn: string[] = [];
  if (completedPrayersCount === 5) {
    whatWentWellEn.push('Completed all 5 daily prayers on time.');
    whatWentWellBn.push('পাঁচ ওয়াক্তের সমস্ত ফরজ নামায সময়মত আদায় করেছেন।');
  } else if (completedPrayersCount >= 3) {
    whatWentWellEn.push(`Maintained ${completedPrayersCount}/5 prayers today.`);
    whatWentWellBn.push(`আজ ${completedPrayersCount}/৫ ওয়াক্ত নামায বজায় রেখেছেন।`);
  }

  if (targetRecord.ayatulKursi?.completed) {
    whatWentWellEn.push('Maintained Ayatul Kursi recitation after prayers.');
    whatWentWellBn.push('নামাজের পর আয়াতুল কুরসী পাঠ বজায় রেখেছেন।');
  }

  if (currentVictories > 0) {
    whatWentWellEn.push(`Recorded ${currentVictories} direct Nafs victories resisting temptation.`);
    whatWentWellBn.push(`প্রলোভন প্রতিরোধ করে ${currentVictories} টি সরাসরি নফসের ওপর বিজয় অর্জন করেছেন।`);
  }

  if (whatWentWellEn.length === 0) {
    whatWentWellEn.push('Honest recording of daily self-accountability log.');
    whatWentWellBn.push('দৈনন্দিন আত্ম-জবাবদিহিতার সততার সাথে হিসাব রাখা।');
  }

  const whatWentWrongEn: string[] = [];
  const whatWentWrongBn: string[] = [];
  if (currentIncidents > 0) {
    whatWentWrongEn.push(`Recorded ${currentIncidents} slip-up incidents across categories.`);
    whatWentWrongBn.push(`বিভিন্ন ক্যাটাগরিতে মোট ${currentIncidents} টি পিছলে পড়ার ঘটনা রেকর্ড হয়েছে।`);
  }
  if (completedPrayersCount < 5) {
    whatWentWrongEn.push(`Missed or delayed ${5 - completedPrayersCount} prayers today.`);
    whatWentWrongBn.push(`আজ ${5 - completedPrayersCount} ওয়াক্ত নামায মিস বা বিলম্বিত হয়েছে।`);
  }
  if (whatWentWrongEn.length === 0) {
    whatWentWrongEn.push('No major slip-ups logged today. Stay vigilant against subtle pride.');
    whatWentWrongBn.push('আজ বড় কোনো ভুল রেকর্ড হয়নি। গোপন অহংকার থেকে সতর্ক থাকুন।');
  }

  const topTriggerTextEn = topTriggers.length > 0 ? topTriggers.join(', ') : 'Environment & Distraction';
  const topTriggerTextBn = topTriggers.length > 0 ? topTriggers.join(', ') : 'পরিবেশ ও অনর্থক ব্যস্ততা';

  return {
    type,
    date: targetDate,
    analysisTitleEn: isDaily ? "Daily Personal Nafs Review" : isWeekly ? "Weekly Nafs Discipline Report" : "Monthly Nafs Review",
    analysisTitleBn: isDaily ? "দৈনন্দিন নফস বিশ্লেষণ ও রিভিউ" : isWeekly ? "সাপ্তাহিক আত্ম-সংযম রিপোর্ট" : "মাসিক নফস পর্যালোচনা",
    summaryEn: `Your Personal Accountability Score today is ${targetRecord.score}/100. ${trendTextEn}`,
    summaryBn: `আজ আপনার ব্যক্তিগত জবাবদিহিতা স্কোর ১০০ এর মধ্যে ${targetRecord.score}। ${trendTextBn}`,
    whatWentWellEn,
    whatWentWellBn,
    whatWentWrongEn,
    whatWentWrongBn,
    biggestChallengeEn: currentIncidents > 0 ? `Managing ${topTriggerTextEn} temptations.` : 'Maintaining consistency in dhikr and focus.',
    biggestChallengeBn: currentIncidents > 0 ? `${topTriggerTextBn} সংক্রান্ত প্রলোভন সামলানো।` : 'জিকির ও মনোযোগে ধারাবাহিকতা বজায় রাখা।',
    biggestVictoryEn: currentVictories > 0 ? `Successfully resisted ${targetRecord.nafsVictories[0].title}` : 'Keeping active daily self-accountability log.',
    biggestVictoryBn: currentVictories > 0 ? `সফলভাবে ${targetRecord.nafsVictories[0].title} প্রতিরোধ করেছেন` : 'দৈনন্দিন আত্ম-জবাবদিহিতা খাতা চালু রাখা।',
    recommendedActionEn: 'Complete required Istighfar count, renew intention, and minimize trigger environment exposure.',
    recommendedActionBn: 'প্রয়োজনীয় ইস্তিগফারের আমল সম্পন্ন করুন, নিয়ত খাঁটি করুন এবং ট্রিগার পরিবেশ থেকে দূরে থাকুন।',
    tomorrowFocusEn: 'Protect morning/evening Adhkar and lower gaze during digital browsing.',
    tomorrowFocusBn: 'সকাল-সংধ্যাকালের জিকির রক্ষা করুন এবং ডিজিটাল স্ক্রলিংয়ে দৃষ্টি সংযত রাখুন।',
    trendsTextEn: trendTextEn,
    trendsTextBn: trendTextBn,
    detectedTriggersEn: topTriggers.length > 0 ? topTriggers : ['Digital media', 'Social environment'],
    detectedTriggersBn: topTriggers.length > 0 ? topTriggers : ['ডিজিটাল মিডিয়া', 'সামাজিক পরিবেশ'],
    recommendationsEn: [
      'Set strict screen time limits on triggering applications.',
      'Perform 100 Astaghfirullah immediately after any slip-up.',
      'Ensure Salah is performed at the beginning of its prescribed time.'
    ],
    recommendationsBn: [
      'প্রলোভন জাগানো অ্যাপগুলোতে স্ক্রিন টাইমের কঠোর সীমা নির্ধারণ করুন।',
      'যেকোনো ভুলের পর অবিলম্বে ১০০ বার আস্তাগফিরুল্লাহ পাঠ করুন।',
      'ওয়াক্ত শুরু হওয়ার সাথে সাথে সালাত আদায় নিশ্চিত করুন।'
    ],
    generatedAt: new Date().toISOString()
  };
}
