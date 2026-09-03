import React from 'react';
import { PackageAlert, TrendingDown, Clock, ShieldCheck, AlertCircle } from 'lucide-react';

interface CardInventory {
  id: string;
  category: string;
  price: string;
  currentStock: number;
  dailyBurnRate: number; // معدل الاستهلاك اليومي
  predictedDaysLeft: number;
}

export const InventoryPrediction: React.FC = () => {
  const inventory: CardInventory[] = [
    { id: '1', category: 'كروت 1 جيجا (ساعة)', price: '500 ر.ي', currentStock: 140, dailyBurnRate: 35, predictedDaysLeft: 4 },
    { id: '2', category: 'كروت 5 جيجا (يومي)', price: '1500 ر.ي', currentStock: 25, dailyBurnRate: 18, predictedDaysLeft: 1 },
    { id: '3', category: 'كروت 20 جيجا (أسبوعي)', price: '4000 ر.ي', currentStock: 310, dailyBurnRate: 15, predictedDaysLeft: 20 },
    { id: '4', category: 'كروت مفتوح (شهري)', price: '12000 ر.ي', currentStock: 8, dailyBurnRate: 5, predictedDaysLeft: 1 },
  ];

  return (
    <div className="p-4 bg-slate-900 text-white rounded-xl shadow-lg border border-slate-800 max-w-2xl mx-auto my-4 text-right" dir="rtl">
      <div className="flex justify-between items-center mb-6 pb-3 border-b border-slate-800">
        <div>
          <h2 className="text-xl font-bold flex items-center gap-2">
            <PackageAlert className="text-amber-400" /> التنبؤ بالمخزون ونفاد الكروت
          </h2>
          <p className="text-xs text-slate-400 mt-1">تحليل ذكي لمعادلات الاستهلاك وتنبيهات إعادة التوليد</p>
        </div>
      </div>

      <div className="space-y-3">
        {inventory.map((item) => {
          const isCritical = item.predictedDaysLeft <= 2;
          return (
            <div 
              key={item.id} 
              className={`p-4 rounded-lg border flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 transition-all ${
                isCritical 
                  ? 'bg-rose-950/30 border-rose-800/60' 
                  : 'bg-slate-800/80 border-slate-700/60'
              }`}
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-sm text-slate-100">{item.category}</h3>
                  <span className="text-xs bg-slate-900 px-2 py-0.5 rounded text-cyan-400 border border-slate-700">{item.price}</span>
                </div>
                <div className="flex items-center gap-4 text-xs text-slate-400">
                  <span>المتبقي: <strong className="text-slate-200">{item.currentStock} كرت</strong></span>
                  <span>الاستهلاك: <strong className="text-slate-200">{item.dailyBurnRate} كرت/يوم</strong></span>
                </div>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end border-t sm:border-t-0 pt-2 sm:pt-0 border-slate-800">
                <div className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700">
                  <Clock className={`w-3.5 h-3.5 ${isCritical ? 'text-rose-400 animate-pulse' : 'text-emerald-400'}`} />
                  <span>ينفذ خلال: </span>
                  <span className={isCritical ? 'text-rose-400 font-bold' : 'text-emerald-400'}>
                    {item.predictedDaysLeft} {item.predictedDaysLeft === 1 ? 'يوم واحد' : 'أيام'}
                  </span>
                </div>

                {isCritical && (
                  <div className="flex items-center gap-1 text-xs text-rose-400 bg-rose-500/10 px-2 py-1 rounded border border-rose-500/20">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>توليد عاجل</span>
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
