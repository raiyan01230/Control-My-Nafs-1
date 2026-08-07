import React from 'react';
import { DailyRecord, Language, RewardOption } from '../types';
import { UI_TRANSLATIONS } from '../utils/translations';
import { SEED_REWARD_OPTIONS } from '../data/rewardsData';
import { Gift, Award, Check, Lock, Sparkles } from 'lucide-react';

interface RewardCardProps {
  record: DailyRecord;
  language: Language;
  onClaimReward: (rewardId: string, rewardName: string, reason: string) => void;
}

export const RewardCard: React.FC<RewardCardProps> = ({ record, language, onClaimReward }) => {
  const t = UI_TRANSLATIONS[language];
  const score = record.score;

  return (
    <div className="bg-[#0b0f17]/90 border border-slate-800/80 backdrop-blur-md rounded-2xl p-5 shadow-2xl shadow-black/50 text-slate-100 space-y-5">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3.5 border-b border-slate-800/80">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 bg-[#221808]/90 border border-amber-500/30 rounded-2xl text-amber-400 shadow-lg shadow-amber-950/30">
            <Gift className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-amber-300 font-display">{t.rewards}</h2>
            <p className="text-xs text-slate-400 font-medium">
              {language === 'bn' ? 'ভালো স্কোর অর্জনের মাধ্যমে ছোটখাটো হালাল আত্ম-পুরস্কার আনলক করুন' : 'Unlock halal personal rewards for maintaining discipline'}
            </p>
          </div>
        </div>

        <div className="px-3.5 py-1.5 rounded-2xl bg-[#221808]/80 border border-amber-500/30 text-xs font-bold text-amber-300 shadow-inner">
          {score} {language === 'bn' ? 'পয়েন্ট স্কোরে আছেন' : 'Score Points Balance'}
        </div>
      </div>

      {/* Grid of Reward Options */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {SEED_REWARD_OPTIONS.map((rew) => {
          const isUnlocked = score >= rew.pointsRequired;
          const isClaimedToday = record.rewardClaims.some(c => c.rewardId === rew.id);

          return (
            <div
              key={rew.id}
              className={`p-4 rounded-2xl border transition-all duration-300 flex flex-col justify-between space-y-3 ${
                isClaimedToday
                  ? 'bg-[#081f18]/60 border-emerald-500/40 text-emerald-100 shadow-sm'
                  : isUnlocked
                  ? 'bg-[#121824]/80 border-amber-500/40 hover:border-amber-400 shadow-lg'
                  : 'bg-[#0b0f17]/50 border-slate-800/80 opacity-60'
              }`}
            >
              <div>
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-slate-100">
                    {language === 'bn' ? rew.nameBn : rew.nameEn}
                  </h3>
                  <span className="text-[10px] font-bold px-2.5 py-1 rounded-lg bg-[#221808] text-amber-300 border border-amber-500/30">
                    {rew.pointsRequired} Pts
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed font-medium">
                  {language === 'bn' ? rew.descriptionBn : rew.descriptionEn}
                </p>
              </div>

              {/* Action Button */}
              <div>
                {isClaimedToday ? (
                  <div className="w-full py-2.5 rounded-xl bg-emerald-950/80 text-emerald-200 border border-emerald-500/30 text-xs font-bold text-center flex items-center justify-center space-x-1 shadow-sm">
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>{language === 'bn' ? 'আজ গ্রহণ করা হয়েছে ✓' : 'Claimed Today ✓'}</span>
                  </div>
                ) : isUnlocked ? (
                  <button
                    onClick={() => onClaimReward(rew.id, rew.nameEn, 'Unlocked with Score')}
                    className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white text-xs font-bold shadow-md transition-all flex items-center justify-center space-x-1"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>{language === 'bn' ? 'পুরস্কার গ্রহণ করুন' : 'Claim Reward'}</span>
                  </button>
                ) : (
                  <div className="w-full py-2.5 rounded-xl bg-[#0b0f17] text-slate-500 border border-slate-800 text-xs font-bold text-center flex items-center justify-center space-x-1">
                    <Lock className="w-3.5 h-3.5" />
                    <span>Need {rew.pointsRequired - score} more Pts</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
