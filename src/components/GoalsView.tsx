import React, { useState } from 'react';
import { Language, GoalRecord } from '../types';
import { Target, CheckCircle, Clock, Plus, Trash2, Edit3, Save, X } from 'lucide-react';

interface GoalsViewProps {
  language: Language;
  goals: GoalRecord[];
  onSaveGoals: (goals: GoalRecord[]) => void;
}

export const GoalsView: React.FC<GoalsViewProps> = ({ language, goals, onSaveGoals }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [targetValue, setTargetValue] = useState(100);
  const [currentValue, setCurrentValue] = useState(0);
  const [targetDate, setTargetDate] = useState('');
  
  const resetForm = () => {
    setTitle('');
    setDescription('');
    setTargetValue(100);
    setCurrentValue(0);
    setTargetDate('');
    setIsAdding(false);
    setEditingId(null);
  };

  const handleEdit = (goal: GoalRecord) => {
    setTitle(goal.title);
    setDescription(goal.description || '');
    setTargetValue(goal.targetValue);
    setCurrentValue(goal.currentValue);
    setTargetDate(goal.targetDate || '');
    setEditingId(goal.id);
    setIsAdding(true);
  };

  const handleDelete = (id: string) => {
    const newGoals = goals.filter(g => g.id !== id);
    onSaveGoals(newGoals);
  };

  const handleUpdateProgress = (id: string, delta: number) => {
    const newGoals = goals.map(g => {
      if (g.id === id) {
        const newVal = Math.max(0, Math.min(g.targetValue, g.currentValue + delta));
        return {
          ...g,
          currentValue: newVal,
          progress: Math.round((newVal / g.targetValue) * 100),
          isCompleted: newVal >= g.targetValue
        };
      }
      return g;
    });
    onSaveGoals(newGoals);
  };

  const handleSave = () => {
    if (!title.trim()) return;

    const newGoal: GoalRecord = {
      id: editingId || Date.now().toString(),
      title,
      description,
      targetValue,
      currentValue,
      targetDate,
      isCompleted: currentValue >= targetValue,
      progress: Math.round((currentValue / targetValue) * 100),
      createdAt: editingId ? (goals.find(g => g.id === editingId)?.createdAt || new Date().toISOString()) : new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    if (editingId) {
      onSaveGoals(goals.map(g => g.id === editingId ? newGoal : g));
    } else {
      onSaveGoals([...goals, newGoal]);
    }
    resetForm();
  };

  return (
    <div className="space-y-6">
      <div className="bg-[#0b0f17]/90 backdrop-blur-md rounded-2xl p-6 border border-slate-800 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
              <Target className="w-6 h-6 text-emerald-400" />
              {language === 'bn' ? 'দীর্ঘমেয়াদী লক্ষ্যসমূহ' : 'Long-Term Spiritual Goals'}
            </h2>
            <p className="text-sm text-slate-400 mt-1">
              {language === 'bn' 
                ? 'কুরআন খতম, নফল রোজা, বা বড় কোনো ইসলামিক লক্ষ্য ট্র্যাক করুন' 
                : 'Track objectives like reading the Quran, fasting, or memorization'}
            </p>
          </div>
          {!isAdding && (
            <button
              onClick={() => setIsAdding(true)}
              className="flex items-center gap-2 px-4 py-2 bg-emerald-600/20 text-emerald-400 hover:bg-emerald-600/30 hover:text-emerald-300 rounded-xl transition border border-emerald-500/20 text-sm font-semibold"
            >
              <Plus className="w-4 h-4" />
              {language === 'bn' ? 'নতুন লক্ষ্য যোগ করুন' : 'Add New Goal'}
            </button>
          )}
        </div>

        {isAdding && (
          <div className="bg-[#121824]/80 p-5 rounded-2xl border border-slate-700/80 mb-8 space-y-4 relative z-10">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-md font-semibold text-emerald-300">
                {editingId 
                  ? (language === 'bn' ? 'লক্ষ্য সম্পাদনা' : 'Edit Goal') 
                  : (language === 'bn' ? 'নতুন লক্ষ্য' : 'New Goal')}
              </h3>
              <button onClick={resetForm} className="text-slate-500 hover:text-slate-300">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5 md:col-span-2">
                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  {language === 'bn' ? 'লক্ষ্যের নাম' : 'Goal Title'}
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  placeholder={language === 'bn' ? 'যেমন: সম্পূর্ণ কুরআন খতম' : 'e.g. Read Entire Quran'}
                  className="w-full bg-[#0b0f17] border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-emerald-500/50"
                />
              </div>
              
              <div className="space-y-1.5 md:col-span-2">
                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  {language === 'bn' ? 'বিবরণ (ঐচ্ছিক)' : 'Description (Optional)'}
                </label>
                <textarea
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  className="w-full bg-[#0b0f17] border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-emerald-500/50 min-h-[80px]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  {language === 'bn' ? 'টার্গেট সংখ্যা' : 'Target Value'}
                </label>
                <input
                  type="number"
                  min="1"
                  value={targetValue}
                  onChange={e => setTargetValue(Number(e.target.value) || 1)}
                  className="w-full bg-[#0b0f17] border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-emerald-500/50"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  {language === 'bn' ? 'বর্তমান অগ্রগতি' : 'Current Progress'}
                </label>
                <input
                  type="number"
                  min="0"
                  max={targetValue}
                  value={currentValue}
                  onChange={e => setCurrentValue(Number(e.target.value) || 0)}
                  className="w-full bg-[#0b0f17] border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-emerald-500/50"
                />
              </div>

              <div className="space-y-1.5 md:col-span-2">
                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  {language === 'bn' ? 'টার্গেট তারিখ (ঐচ্ছিক)' : 'Target Date (Optional)'}
                </label>
                <input
                  type="date"
                  value={targetDate}
                  onChange={e => setTargetDate(e.target.value)}
                  className="w-full bg-[#0b0f17] border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-emerald-500/50"
                />
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={handleSave}
                disabled={!title.trim()}
                className="flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-sm font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Save className="w-4 h-4" />
                {language === 'bn' ? 'সেভ করুন' : 'Save Goal'}
              </button>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
          {goals.length === 0 && !isAdding ? (
            <div className="col-span-2 text-center py-12 px-4 border border-dashed border-slate-700 rounded-2xl bg-[#0b0f17]/50">
              <Target className="w-12 h-12 text-slate-600 mx-auto mb-3 opacity-50" />
              <p className="text-slate-400">
                {language === 'bn' 
                  ? 'কোনো লক্ষ্য সেট করা নেই। আধ্যাত্মিক উন্নতির জন্য একটি লক্ষ্য সেট করুন।' 
                  : 'No goals set yet. Start by adding a long-term spiritual goal.'}
              </p>
            </div>
          ) : (
            goals.map(goal => (
              <div key={goal.id} className="bg-[#121824] rounded-2xl p-5 border border-slate-700/80 flex flex-col hover:border-emerald-500/30 transition-colors group">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex-1 pr-3">
                    <h3 className={`font-bold text-lg ${goal.isCompleted ? 'text-emerald-400 line-through opacity-80' : 'text-slate-100'}`}>
                      {goal.title}
                    </h3>
                    {goal.description && (
                      <p className="text-xs text-slate-400 mt-1 line-clamp-2">{goal.description}</p>
                    )}
                  </div>
                  <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => handleEdit(goal)} className="p-1.5 text-slate-400 hover:text-emerald-400 hover:bg-slate-800 rounded-lg">
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button onClick={() => handleDelete(goal.id)} className="p-1.5 text-slate-400 hover:text-red-400 hover:bg-slate-800 rounded-lg">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="mt-auto pt-4 space-y-3">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-slate-300">
                      {goal.currentValue} / {goal.targetValue}
                    </span>
                    <span className="text-emerald-400">{goal.progress}%</span>
                  </div>
                  
                  <div className="h-2.5 w-full bg-slate-800 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all duration-500 ${goal.isCompleted ? 'bg-emerald-500' : 'bg-gradient-to-r from-emerald-600 to-teal-400'}`}
                      style={{ width: `${goal.progress}%` }}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center space-x-2">
                      <button 
                        onClick={() => handleUpdateProgress(goal.id, -1)}
                        className="w-7 h-7 rounded-lg bg-slate-800 text-slate-300 flex items-center justify-center hover:bg-slate-700 transition font-bold"
                        disabled={goal.currentValue <= 0}
                      >
                        -
                      </button>
                      <button 
                        onClick={() => handleUpdateProgress(goal.id, 1)}
                        className="w-7 h-7 rounded-lg bg-emerald-900/50 text-emerald-400 flex items-center justify-center hover:bg-emerald-800/50 transition font-bold border border-emerald-500/20"
                        disabled={goal.isCompleted}
                      >
                        +
                      </button>
                    </div>
                    
                    {goal.targetDate && (
                      <div className="flex items-center text-xs text-slate-400 bg-slate-800/50 px-2 py-1 rounded-md">
                        <Clock className="w-3 h-3 mr-1" />
                        {new Date(goal.targetDate).toLocaleDateString()}
                      </div>
                    )}
                    
                    {goal.isCompleted && (
                      <div className="flex items-center text-xs text-emerald-400 font-semibold">
                        <CheckCircle className="w-3.5 h-3.5 mr-1" />
                        {language === 'bn' ? 'সম্পন্ন' : 'Completed'}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
