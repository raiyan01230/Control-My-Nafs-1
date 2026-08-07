import React, { useState, useEffect } from 'react';
import { Language, RegularGhunah } from '../types';
import { Bot, Plus, Trash2 } from 'lucide-react';

interface GhunahManagerProps {
  language: Language;
}

export const GhunahManager: React.FC<GhunahManagerProps> = ({ language }) => {
  const [ghunahs, setGhunahs] = useState<RegularGhunah[]>([]);
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [freq, setFreq] = useState<'daily' | 'weekly' | 'monthly'>('daily');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch('/api/ghunah/list')
      .then(res => res.json())
      .then(setGhunahs);
  }, []);

  const handleAdd = async () => {
    setLoading(true);
    const res = await fetch('/api/ghunah/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, description: desc, frequency: freq })
    });
    if (res.ok) {
      const newGhunah = await res.json();
      setGhunahs([...ghunahs, newGhunah]);
      setName('');
      setDesc('');
    }
    setLoading(false);
  };

  return (
    <div className="space-y-4">
      <div className="bg-[#121824] p-4 rounded-2xl border border-slate-800">
        <h4 className="font-bold text-slate-200 mb-3">{language === 'bn' ? 'নতুন গুনাহ যোগ করুন' : 'Add New Regular Ghunah'}</h4>
        <input type="text" placeholder={language === 'bn' ? 'নাম' : 'Name'} value={name} onChange={e => setName(e.target.value)} className="w-full bg-[#080c14] border border-slate-700 rounded-xl p-2 mb-2" />
        <input type="text" placeholder={language === 'bn' ? 'বর্ণনা' : 'Description'} value={desc} onChange={e => setDesc(e.target.value)} className="w-full bg-[#080c14] border border-slate-700 rounded-xl p-2 mb-2" />
        <select value={freq} onChange={e => setFreq(e.target.value as any)} className="w-full bg-[#080c14] border border-slate-700 rounded-xl p-2 mb-2">
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
        </select>
        <button onClick={handleAdd} disabled={loading} className="w-full bg-emerald-600 rounded-xl p-2 font-bold flex items-center justify-center space-x-2">
            <Plus className="w-4 h-4" /> <span>{loading ? 'Thinking...' : 'Add & Get AI Advice'}</span>
        </button>
      </div>

      <div className="space-y-3">
        {ghunahs.map(g => (
          <div key={g.id} className="p-4 rounded-2xl bg-[#0b0f17] border border-slate-800">
            <div className="font-bold text-slate-100">{g.name}</div>
            <div className="text-xs text-slate-400">{g.description} ({g.frequency})</div>
            <div className="mt-2 text-xs bg-blue-950/30 p-2 rounded-xl text-blue-200 flex items-start space-x-2">
                <Bot className="w-4 h-4 text-blue-400 mt-0.5" />
                <span>{g.aiAdvice}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
