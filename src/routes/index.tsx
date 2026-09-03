import { createFileRoute } from '@tanstack/react-router';
import { NetworkDiagnostics } from '@/components/src/components/NetworkDiagnostics';
import { InventoryPrediction } from '@/components/src/components/InventoryPrediction';
import { CaptivePortalManager } from '@/components/src/components/CaptivePortalManager';
import { DynamicPricingManager } from '@/components/src/components/DynamicPricingManager';

export const Route = createFileRoute('/')({
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-slate-950 text-white p-4 space-y-8 pb-24" dir="rtl">
      {/* شريط تنبيه المعاينة المؤقت */}
      <div className="bg-sky-950/60 border border-sky-500/30 p-4 rounded-xl text-center shadow-lg backdrop-blur-sm">
        <h1 className="text-lg font-bold text-sky-400">⚡ معاينة الموديولات الذاتية (WISP Suite)</h1>
        <p className="text-xs text-slate-300 mt-1">
          هذه معاينة مؤقتة لإثبات عمل الوحدات قبل توزيعها على أقسام النظام.
        </p>
      </div>

      {/* الموديولات الأربعة للتحقق من تشغيلها */}
      <NetworkDiagnostics />
      <InventoryPrediction />
      <CaptivePortalManager />
      <DynamicPricingManager />
    </div>
  );
}
