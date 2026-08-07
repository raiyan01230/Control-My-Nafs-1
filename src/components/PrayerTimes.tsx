import React, { useState, useEffect } from 'react';
import { Language } from '../types';
import { MapPin, Clock, Loader2, Compass } from 'lucide-react';

interface PrayerTimesProps {
  language: Language;
}

export const PrayerTimes: React.FC<PrayerTimesProps> = ({ language }) => {
  const [times, setTimes] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [locationName, setLocationName] = useState('');

  useEffect(() => {
    fetchPrayerTimes();
  }, []);

  const fetchPrayerTimes = () => {
    setLoading(true);
    setError('');

    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const { latitude, longitude } = position.coords;
            const res = await fetch(`https://api.aladhan.com/v1/timings?latitude=${latitude}&longitude=${longitude}&method=2`);
            const data = await res.json();
            
            if (data.code === 200) {
              setTimes(data.data.timings);
              // Reverse geocoding for city name (using a free API or just saying "Current Location")
              setLocationName(language === 'bn' ? 'বর্তমান অবস্থান' : 'Current Location');
            } else {
              setError(language === 'bn' ? 'নামাজের সময় লোড করতে ব্যর্থ হয়েছে' : 'Failed to load prayer times');
            }
          } catch (err) {
            setError(language === 'bn' ? 'নামাজের সময় লোড করতে ব্যর্থ হয়েছে' : 'Failed to load prayer times');
          } finally {
            setLoading(false);
          }
        },
        (err) => {
          setError(language === 'bn' ? 'লোকেশন অ্যাক্সেস প্রয়োজন' : 'Location access required for prayer times');
          setLoading(false);
        }
      );
    } else {
      setError(language === 'bn' ? 'আপনার ব্রাউজার লোকেশন সমর্থন করে না' : 'Geolocation is not supported by your browser');
      setLoading(false);
    }
  };

  const getPrayerDisplay = (name: string, time: string) => {
    const prayerNames: Record<string, { en: string; bn: string }> = {
      Fajr: { en: 'Fajr', bn: 'ফজর' },
      Sunrise: { en: 'Sunrise', bn: 'সূর্যোদয়' },
      Dhuhr: { en: 'Dhuhr', bn: 'যোহর' },
      Asr: { en: 'Asr', bn: 'আসর' },
      Maghrib: { en: 'Maghrib', bn: 'মাগরিব' },
      Isha: { en: 'Isha', bn: 'এশা' },
    };

    if (!prayerNames[name]) return null;

    // Convert 24h to 12h
    const [hours, minutes] = time.split(':');
    let h = parseInt(hours);
    const ampm = h >= 12 ? 'PM' : 'AM';
    h = h % 12;
    h = h ? h : 12; 
    const time12 = `${h}:${minutes} ${ampm}`;

    return (
      <div key={name} className="flex flex-col items-center p-3 bg-[#081f18] border border-emerald-500/20 rounded-2xl hover:border-emerald-500/40 transition-colors">
        <span className="text-emerald-400/80 text-xs font-semibold uppercase tracking-wider mb-1">
          {language === 'bn' ? prayerNames[name].bn : prayerNames[name].en}
        </span>
        <span className="text-emerald-100 font-mono font-medium text-sm">
          {time12}
        </span>
      </div>
    );
  };

  return (
    <div className="bg-[#0b0f17] border border-slate-800 rounded-3xl p-6 shadow-xl relative overflow-hidden">
      <div className="absolute top-0 right-0 p-6 opacity-5 pointer-events-none">
        <Compass className="w-32 h-32 text-emerald-500" />
      </div>

      <div className="flex items-center justify-between mb-6 relative z-10">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 bg-emerald-500/10 rounded-xl">
            <Clock className="w-5 h-5 text-emerald-400" />
          </div>
          <h3 className="text-lg font-bold text-white font-display">
            {language === 'bn' ? 'নামাজের সময়সূচী' : 'Daily Prayer Times'}
          </h3>
        </div>
        
        {locationName && (
          <div className="flex items-center space-x-1.5 text-xs font-medium text-slate-400 bg-slate-800/50 px-3 py-1.5 rounded-full">
            <MapPin className="w-3.5 h-3.5 text-emerald-400" />
            <span>{locationName}</span>
          </div>
        )}
      </div>

      <div className="relative z-10">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-8 text-emerald-500/50">
            <Loader2 className="w-8 h-8 animate-spin mb-3" />
            <span className="text-sm">{language === 'bn' ? 'সময় লোড হচ্ছে...' : 'Loading times...'}</span>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center py-6">
            <p className="text-rose-400 text-sm text-center mb-4">{error}</p>
            <button 
              onClick={fetchPrayerTimes}
              className="px-4 py-2 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 rounded-xl text-xs font-semibold transition-colors"
            >
              {language === 'bn' ? 'আবার চেষ্টা করুন' : 'Retry'}
            </button>
          </div>
        ) : times ? (
          <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
            {getPrayerDisplay('Fajr', times.Fajr)}
            {getPrayerDisplay('Sunrise', times.Sunrise)}
            {getPrayerDisplay('Dhuhr', times.Dhuhr)}
            {getPrayerDisplay('Asr', times.Asr)}
            {getPrayerDisplay('Maghrib', times.Maghrib)}
            {getPrayerDisplay('Isha', times.Isha)}
          </div>
        ) : null}
      </div>
    </div>
  );
};
