import React, { useMemo } from 'react';
import { Language, DailyRecord } from '../types';
import { Activity } from 'lucide-react';

interface ActivityHeatmapProps {
  language: Language;
  records: DailyRecord[];
}

export const ActivityHeatmap: React.FC<ActivityHeatmapProps> = ({ language, records }) => {
  const weeks = 18;
  const days = weeks * 7;
  
  const heatmapData = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    // adjust so last day is today
    const map = new Map<string, number>();
    records.forEach(r => map.set(r.date, r.score));

    const grid = [];
    for (let w = 0; w < weeks; w++) {
      const week = [];
      for (let d = 0; d < 7; d++) {
        // Find date for this cell. 
        // We want the last cell (bottom right) to be today (or end of week)
        // Let's just do standard: rows = day of week (0=Sun, 6=Sat)
        // cols = weeks
        // To make today the last active cell:
        const currentDayOfWeek = today.getDay(); // 0-6
        // offset from today
        const daysAgo = (weeks - 1 - w) * 7 + (currentDayOfWeek - d);
        
        if (daysAgo < 0 || daysAgo >= days) {
          week.push(null);
        } else {
          const date = new Date(today);
          date.setDate(date.getDate() - daysAgo);
          const dateStr = date.toISOString().split('T')[0];
          const score = map.get(dateStr) || 0;
          week.push({ date: dateStr, score, isFuture: daysAgo < 0 });
        }
      }
      grid.push(week);
    }
    return grid;
  }, [records, weeks]);

  const getColorClass = (score: number, isFuture: boolean) => {
    if (isFuture) return 'bg-transparent';
    if (score === 0) return 'bg-slate-800/50';
    if (score < 20) return 'bg-emerald-900/40';
    if (score < 50) return 'bg-emerald-700/60';
    if (score < 80) return 'bg-emerald-500/80';
    return 'bg-emerald-400';
  };

  return (
    <div className="bg-[#0b0f17] border border-slate-800 rounded-3xl p-6 shadow-xl relative overflow-hidden">
      <div className="flex items-center space-x-3 mb-6 relative z-10">
        <div className="p-2.5 bg-emerald-500/10 rounded-xl">
          <Activity className="w-5 h-5 text-emerald-400" />
        </div>
        <h3 className="text-lg font-bold text-white font-display">
          {language === 'bn' ? 'কার্যকলাপ ট্র্যাকার' : 'Activity Heatmap'}
        </h3>
      </div>

      <div className="flex items-start overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
        <div className="flex gap-1.5 mx-auto">
          {heatmapData.map((week, i) => (
            <div key={i} className="flex flex-col gap-1.5">
              {week.map((day, j) => {
                if (!day) return <div key={j} className="w-3.5 h-3.5 sm:w-4 sm:h-4" />;
                return (
                  <div 
                    key={j} 
                    title={day.isFuture ? undefined : `${day.date}: ${day.score} pts`}
                    className={`w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-sm transition-colors ${getColorClass(day.score, day.isFuture)} ${!day.isFuture && 'hover:ring-2 hover:ring-emerald-400/50'}`}
                  />
                );
              })}
            </div>
          ))}
        </div>
      </div>
      
      <div className="mt-4 flex items-center justify-end space-x-2 text-xs text-slate-400">
        <span>{language === 'bn' ? 'কম' : 'Less'}</span>
        <div className="flex gap-1">
          <div className="w-3 h-3 rounded-sm bg-slate-800/50"></div>
          <div className="w-3 h-3 rounded-sm bg-emerald-900/40"></div>
          <div className="w-3 h-3 rounded-sm bg-emerald-700/60"></div>
          <div className="w-3 h-3 rounded-sm bg-emerald-500/80"></div>
          <div className="w-3 h-3 rounded-sm bg-emerald-400"></div>
        </div>
        <span>{language === 'bn' ? 'বেশি' : 'More'}</span>
      </div>
    </div>
  );
};
