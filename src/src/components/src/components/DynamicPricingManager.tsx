import React, { useState } from 'react';
import { BadgePercent, Clock, Zap, DollarSign, ToggleLeft, ToggleRight, Check } from 'lucide-react';

interface Rule {
  id: string;
  name: string;
  timeRange: string;
  discountOrBonus: string;
  status: boolean;
  type: 'offpeak' | 'peak';
}

export const DynamicPricingManager: React.FC = () => {
  const [rules, setRules] = useState<Rule[]>([
    { id: '1', name: 'عروض السهر (خارج الذروة)', timeRange: '02:00 ص - 07:00 ص', discountOrBonus: 'بونص +50% سعة مجانية', status: true, type: 'offpeak' },
    { id: '2', name: 'تخفيض كروت اليومي', timeRange: '12:00 ظ - 04:00 عصراً', discountOrBonus: 'خصم 20% على سعر الكرت', status: false, type: 'offpeak' },
    { id: '3', name: 'تنظيم سرعات الذروة المسائية', timeRange: '08:00 م - 11:30 م', discountOrBonus: 'ترشيد السرعة لحماية البنج', status: true, type: 'peak' },
  ]);

  const toggleRule = (id: string) => {
    setRules(prev => prev.map(r => r.id === id ? { ...r, status: !r.status } : r));
  };

  return (
    <div className="p-4 bg-slate-900 text-white rounded-xl shadow-lg border border-slate-800 max-w-2xl mx-auto my-4 text-right" dir="rtl">
      <div className="flex justify-between items-center mb-6 pb-3 border-b border-slate-800">
        <div>
          <h2 className="text-xl font-bold flex items-center gap-2">
            <BadgePercent className="text-emerald-400" /> التسعير الديناميكي وعروض الذروة
          </h2>
          <p className="text-xs text-slate-400 mt-1">أتمتة تخفيضات الأسعار وبونص السعات بحسب أوقات الاستهلاك</p>
        </div>
      </div>

      <div className="space-y-4">
        {rules.map((rule) => (
          <div 
            key={rule.id}
            className={`p-4 rounded-lg border flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 transition-all ${
              rule.status 
                ? rule.type === 'offpeak' ? 'bg-emerald-950/20 border-emerald-800/50' : 'bg-amber-950/20 border-amber-800/50'
                : 'bg-slate-800/40 border-slate-800 opacity-60'
            }`}
          >
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className={`p-1 rounded ${rule.type === 'offpeak' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'}`}>
                  {rule.type === 'offpeak' ? <Zap className="w-4 h-4" /> : <Clock className="w-4 h-4" />}
                </span>
                <h3 className="font-semibold text-sm text-slate-100">{rule.name}</h3>
              </div>
              
              <div className="flex items-center gap-3 text-xs text-slate-400 pt-1">
                <span className="flex items-center gap-1 font-mono bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                  <Clock className="w-3 h-3 text-slate-500" /> {rule.timeRange}
                </span>
                <span className="text-emerald-300 font-medium">{rule.discountOrBonus}</span>
              </div>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end border-t sm:border-t-0 pt-2 sm:pt-0 border-slate-800">
              <button
                onClick={() => toggleRule(rule.id)}
                className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg border bg-slate-900 border-slate-700 hover:border-slate-600 transition-colors"
              >
                {rule.status ? (
                  <>
                    <ToggleRight className="w-5 h-5 text-emerald-400" />
                    <span className="text-emerald-400 font-medium">مُفعل</span>
                  </>
                ) : (
                  <>
                    <ToggleLeft className="w-5 h-5 text-slate-500" />
                    <span className="text-slate-400">معطل</span>
                  </>
                )}
              </button>
            </div>
          </div>
        ))}

        <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <span className="flex items-center gap-1.5">
            <DollarSign className="w-4 h-4 text-emerald-400" />
            تطبيق القواعد تلقائياً عبر RADIUS / MikroTik API
          </span>
          <span className="text-emerald-400 font-semibold flex items-center gap-1">
            <Check className="w-3.5 h-3.5" /> النظام متصل
          </span>
        </div>
      </div>
    </div>
  );
};
