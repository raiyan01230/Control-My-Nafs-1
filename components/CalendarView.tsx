import React, { useState } from 'react';
import { DailyRecord, Language } from '../types';
import { UI_TRANSLATIONS } from '../utils/translations';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from 'lucide-react';

interface CalendarViewProps {
  language: Language;
  selectedDate: string;
  onSelectDate: (date: string) => void;
}

export const CalendarView: React.FC<CalendarViewProps> = ({ language, selectedDate, onSelectDate }) => {
  const t = UI_TRANSLATIONS[language];
  const [currentMonth, setCurrentMonth] = useState(new Date(selectedDate));

  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();

  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const daysInMonth = lastDay.getDate();
  const startingDayOfWeek = firstDay.getDay();

  const monthNamesEn = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const monthNamesBn = ['জানুয়ারি', 'ফেব্রুয়ারি', 'মার্চ', 'এপ্রিল', 'মে', 'জুন', 'জুলাই', 'আগস্ট', 'সেপ্টেম্বর', 'অক্টোবর', 'নভেম্বর', 'ডিসেম্বর'];

  const daysOfWeekEn = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const daysOfWeekBn = ['রবি', 'সোম', 'মঙ্গল', 'বুধ', 'বৃহঃ', 'শুক্র', 'শনি'];

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(year, month - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(year, month + 1, 1));
  };

  return (
    <div className="bg-[#0b0f17]/90 border border-slate-800/80 backdrop-blur-md rounded-2xl p-5 shadow-2xl shadow-black/50 text-slate-100 space-y-5">
      {/* Month Navigation */}
      <div className="flex items-center justify-between pb-3.5 border-b border-slate-800/80">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 bg-[#081f18]/90 border border-emerald-500/30 rounded-2xl text-emerald-400 shadow-lg shadow-emerald-950/30">
            <CalendarIcon className="w-5 h-5" />
          </div>
          <h2 className="text-lg font-bold text-slate-100 font-display">
            {language === 'bn' ? monthNamesBn[month] : monthNamesEn[month]} {year}
          </h2>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={handlePrevMonth}
            className="p-2 rounded-xl bg-[#121824] hover:bg-[#162036] text-slate-200 border border-slate-800 transition-all shadow-sm"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={handleNextMonth}
            className="p-2 rounded-xl bg-[#121824] hover:bg-[#162036] text-slate-200 border border-slate-800 transition-all shadow-sm"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Weekday Labels */}
      <div className="grid grid-cols-7 gap-1 text-center font-bold text-xs text-slate-400">
        {(language === 'bn' ? daysOfWeekBn : daysOfWeekEn).map((d) => (
          <div key={d} className="py-2">
            {d}
          </div>
        ))}
      </div>

      {/* Days Grid */}
      <div className="grid grid-cols-7 gap-2">
        {/* Empty padding cells */}
        {Array.from({ length: startingDayOfWeek }).map((_, idx) => (
          <div key={`empty-${idx}`} className="h-12 bg-[#050505]/40 rounded-xl border border-transparent" />
        ))}

        {/* Calendar Day Buttons */}
        {Array.from({ length: daysInMonth }).map((_, idx) => {
          const dayNum = idx + 1;
          const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(dayNum).padStart(2, '0')}`;
          const isSelected = dateStr === selectedDate;
          const isToday = dateStr === new Date().toISOString().split('T')[0];

          return (
            <button
              key={dateStr}
              onClick={() => onSelectDate(dateStr)}
              className={`h-12 rounded-xl border flex flex-col items-center justify-center text-xs font-bold transition-all relative ${
                isSelected
                  ? 'bg-gradient-to-br from-emerald-600 to-teal-600 border-emerald-400/50 text-white shadow-lg shadow-emerald-950/50 ring-2 ring-emerald-500/40 scale-105'
                  : isToday
                  ? 'bg-[#081f18] border-emerald-500/40 text-emerald-200 shadow-sm'
                  : 'bg-[#121824]/60 border-slate-800 text-slate-300 hover:bg-[#162036]'
              }`}
            >
              <span>{dayNum}</span>
              {isToday && (
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 absolute bottom-1 shadow-sm" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
