import React, { useState } from 'react';
import { Layout, Megaphone, Palette, Save, Eye, Check, AlertCircle } from 'lucide-react';

export const CaptivePortalManager: React.FC = () => {
  const [announcement, setAnnouncement] = useState('تنبيه: سيتم إجراء صيانة مجدولة للبرج الرئيسي الليلة الساعة 2 صباحاً لمدة 15 دقيقة.');
  const [activeTheme, setActiveTheme] = useState('dark');
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = () => {
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2500);
  };

  return (
    <div className="p-4 bg-slate-900 text-white rounded-xl shadow-lg border border-slate-800 max-w-2xl mx-auto my-4 text-right" dir="rtl">
      <div className="flex justify-between items-center mb-6 pb-3 border-b border-slate-800">
        <div>
          <h2 className="text-xl font-bold flex items-center gap-2">
            <Layout className="text-purple-400" /> إدارة بوابة المشتركين (Captive Portal)
          </h2>
          <p className="text-xs text-slate-400 mt-1">التحكم بالإعلانات المباشرة وثيمات صفحة الدخول</p>
        </div>
        <button
          onClick={handleSave}
          className="flex items-center gap-1.5 bg-purple-600 hover:bg-purple-500 text-white text-xs px-3 py-2 rounded-lg font-medium transition-colors"
        >
          {isSaved ? <Check className="w-4 h-4 text-emerald-300" /> : <Save className="w-4 h-4" />}
          <span>{isSaved ? 'تم الحفظ!' : 'حفظ التغييرات'}</span>
        </button>
      </div>

      <div className="space-y-5">
        {/* شريط نشر إعلان عام للمشتركين */}
        <div className="bg-slate-800/80 p-4 rounded-lg border border-slate-700/60 space-y-3">
          <label className="text-sm font-semibold flex items-center gap-2 text-slate-200">
            <Megaphone className="w-4 h-4 text-amber-400" />
            شريط الإعلانات العاجل (يظهر بأعلى صفحة الكروت)
          </label>
          <textarea
            value={announcement}
            onChange={(e) => setAnnouncement(e.target.value)}
            rows={3}
            className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-xs text-slate-200 focus:outline-none focus:border-purple-500 resize-none"
            placeholder="اكتب رسالة الإعلان هنا..."
          />
        </div>

        {/* اختيار ثيم بوابة تسجيل الدخول */}
        <div className="bg-slate-800/80 p-4 rounded-lg border border-slate-700/60 space-y-3">
          <label className="text-sm font-semibold flex items-center gap-2 text-slate-200">
            <Palette className="w-4 h-4 text-cyan-400" />
            ثيم صفحة الدخول للشبكة
          </label>
          <div className="grid grid-cols-3 gap-3">
            {[
              { id: 'dark', name: 'الداكن العصري', color: 'bg-slate-950 border-purple-500' },
              { id: 'blue', name: 'الأزرق التقني', color: 'bg-blue-950 border-blue-500' },
              { id: 'event', name: 'ثيم الأعياد والمناسبات', color: 'bg-emerald-950 border-emerald-500' },
            ].map((theme) => (
              <button
                key={theme.id}
                onClick={() => setActiveTheme(theme.id)}
                className={`p-3 rounded-lg border flex flex-col items-center justify-center gap-2 text-xs transition-all ${theme.color} ${
                  activeTheme === theme.id ? 'ring-2 ring-purple-400 font-bold' : 'opacity-70 hover:opacity-100'
                }`}
              >
                <span>{theme.name}</span>
                {activeTheme === theme.id && <span className="text-[10px] text-purple-300">مُفعل حالياً</span>}
              </button>
            ))}
          </div>
        </div>

        {/* معاينة شاشة البوابة */}
        <div className="bg-slate-950 p-4 rounded-lg border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
            <span className="flex items-center gap-1"><Eye className="w-3.5 h-3.5 text-purple-400" /> معاينة حية لشاشة الهاتف</span>
            <span className="text-[10px] bg-slate-800 px-2 py-0.5 rounded">192.168.88.1/login</span>
          </div>
          <div className="bg-slate-900 border border-slate-800 p-3 rounded text-center text-xs space-y-2">
            {announcement && (
              <div className="bg-amber-500/10 text-amber-300 border border-amber-500/20 p-2 rounded text-[11px] flex items-center justify-center gap-1">
                <AlertCircle className="w-3 h-3 shrink-0" />
                <span>{announcement}</span>
              </div>
            )}
            <div className="py-3">
              <p className="font-bold text-slate-200">أهلاً بك في شبكة StarNet</p>
              <p className="text-[10px] text-slate-400">أدخل رمز الكرت للاتصال بالإنترنت</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
