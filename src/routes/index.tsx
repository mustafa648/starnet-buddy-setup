import { createFileRoute } from '@tanstack/react-router';
import { NetworkDiagnostics } from '@/components/NetworkDiagnostics';
import { InventoryPrediction } from '@/components/InventoryPrediction';
import { CaptivePortalManager } from '@/components/CaptivePortalManager';
import { DynamicPricingManager } from '@/components/DynamicPricingManager';

export const Route = createFileRoute('/')({
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-slate-950 p-2 sm:p-6 space-y-6">
      <NetworkDiagnostics />
      <InventoryPrediction />
      <CaptivePortalManager />
      <DynamicPricingManager />
    </div>
  );
}
