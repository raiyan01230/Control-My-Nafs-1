import React from 'react';
import { Quote, Sparkles } from 'lucide-react';
import { Language } from '../types';

interface DailyReminderCardProps {
  language: Language;
}

export const DailyReminderCard: React.FC<DailyReminderCardProps> = ({ language }) => {
  const quotesEn = [
    '“Today is another opportunity to become better than yesterday.”',
    '“Lowering your gaze and guarding your tongue strengthens your heart with divine light.”',
    '“One sincere Tawbah erases a mountain of regrets. Return to Allah with hope.”',
    '“Tahajjud is the weapon of the believer and the refuge of the tranquil heart.”',
    '“The strongest person is not the one who defeats others, but the one who controls their own Nafs.”'
  ];

  const quotesBn = [
    '“আজকের দিনটি গতকালের চেয়ে আরও উত্তম হওয়ার আরেকটি সুযোগ।”',
    '“দৃষ্টির হেফাজত এবং বাক-সংযম অন্তরে ইমানের দ্যুতি সৃষ্টি করে।”',
    '“একটি খাঁটি তওবা অনুশোচনার পাহাড় মুছে দিতে পারে। আশার সাথে আল্লাহর দিকে ফিরে আসুন।”',
    '“তাহাজ্জুদ হলো মুমিনের নীরব হাতিয়ার এবং প্রশান্ত অন্তরের আশ্রয়স্থল।”',
    '“প্রকৃত শক্তিশালী সেই ব্যক্তি নয় যে অন্যকে আছাড় দেয়; বরং সে-ই প্রকৃত শক্তিশালী যে রাগের সময় নিজেকে সামলে রাখে।”'
  ];

  const quotes = language === 'bn' ? quotesBn : quotesEn;
  const selectedQuote = quotes[Math.floor(Date.now() / (1000 * 60 * 60 * 24)) % quotes.length];

  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-950/80 via-[#0b0f17] to-[#0d1522] p-5 border border-emerald-500/30 text-emerald-50 shadow-2xl shadow-black/50 backdrop-blur-md">
      <div className="absolute top-0 right-0 p-4 opacity-15">
        <Sparkles className="w-28 h-28 text-emerald-400" />
      </div>
      <div className="relative z-10 flex items-start space-x-3.5">
        <div className="p-2.5 rounded-2xl bg-emerald-950/80 border border-emerald-500/30 text-amber-400 shrink-0 shadow-lg shadow-emerald-950/50">
          <Quote className="w-5 h-5" />
        </div>
        <div>
          <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-1 flex items-center space-x-1.5">
            <span>{language === 'bn' ? 'আজকের নসিহত ও অনুপ্রেরণা' : 'Daily Spiritual Reminder'}</span>
          </div>
          <p className="text-sm sm:text-base font-serif italic text-slate-200 leading-relaxed">
            {selectedQuote}
          </p>
        </div>
      </div>
    </div>
  );
};
