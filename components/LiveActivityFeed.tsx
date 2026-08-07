import React, { useState, useEffect } from 'react';
import { Language, DailyRecord } from '../types';
import { Activity } from 'lucide-react';

interface LiveActivityFeedProps {
  language: Language;
}

export const LiveActivityFeed: React.FC<LiveActivityFeedProps> = ({ language }) => {
  const [activities, setActivities] = useState<any[]>([]);

  const fetchRecentActivities = async () => {
    try {
      // Assuming a new API endpoint exists to fetch latest actions
      const res = await fetch('/api/records/recent');
      if (res.ok) {
        const data = await res.json();
        setActivities(data);
      }
    } catch (e) {
      console.error('Error fetching recent activities:', e);
    }
  };

  useEffect(() => {
    fetchRecentActivities();
    const interval = setInterval(fetchRecentActivities, 5000); // Poll every 5 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-[#0b0f17] border border-slate-800 rounded-3xl p-6 shadow-xl">
      <div className="flex items-center space-x-3 mb-4">
        <div className="p-2 bg-blue-500/10 rounded-xl">
          <Activity className="w-5 h-5 text-blue-400" />
        </div>
        <h3 className="text-lg font-bold text-white font-display">
          {language === 'bn' ? 'লাইভ অ্যাক্টিভিটি' : 'Live Activity'}
        </h3>
      </div>
      <div className="space-y-3">
        {activities.length === 0 ? (
          <p className="text-slate-500 text-sm">No recent activities...</p>
        ) : (
          activities.map((act: any, i: number) => (
            <div key={i} className="text-sm text-slate-300 border-b border-slate-800 pb-2">
              <span className="font-bold text-blue-300">{act.user}: </span>
              {act.action}
            </div>
          ))
        )}
      </div>
    </div>
  );
};
