import React, { useState } from 'react';
import { Activity, RefreshCw, Power, Wifi, AlertTriangle, CheckCircle2 } from 'lucide-react';

interface NodeStatus {
  id: string;
  name: string;
  ip: string;
  latency: number | null;
  status: 'online' | 'degraded' | 'offline';
  poePort?: number;
}

export const NetworkDiagnostics: React.FC = () => {
  const [loadingNodeId, setLoadingNodeId] = useState<string | null>(null);
  const [nodes, setNodes] = useState<NodeStatus[]>([
    { id: '1', name: 'البرج الرئيسي - Starlink', ip: '192.168.88.1', latency: 12, status: 'online', poePort: 1 },
    { id: '2', name: 'نود القطاع الشمالي (LH5)', ip: '192.168.88.10', latency: 48, status: 'online', poePort: 2 },
    { id: '3', name: 'نود السوق (PowerBeam)', ip: '192.168.88.15', latency: 240, status: 'degraded', poePort: 3 },
    { id: '4', name: 'نود الحارة المجاورة', ip: '192.168.88.20', latency: null, status: 'offline', poePort: 4 },
  ]);

  const handlePing = (id: string) => {
    setLoadingNodeId(id);
    setTimeout(() => {
      setNodes(prev => prev.map(node => {
        if (node.id === id) {
          const simulatedLatency = Math.floor(Math.random() * 80) + 10;
          return {
            ...node,
            latency: simulatedLatency,
            status: simulatedLatency > 150 ? 'degraded' : 'online'
          };
        }
        return node;
      }));
      setLoadingNodeId(null);
    }, 1200);
  };

  const handlePoEReboot = (nodeName: string, port?: number) => {
    if (confirm(`هل أنت تأكد من إعادة تشغيل طاقة المنفذ (PoE Port ${port}) الخاص بـ ${nodeName}؟`)) {
      alert(`تم إرسال أمر إعادة التشغيل للمنفذ PoE ${port} بنجاح عبر MikroTik API.`);
    }
  };

  return (
    <div className="p-4 bg-slate-900 text-white rounded-xl shadow-lg border border-slate-800 max-w-2xl mx-auto my-4 text-right" dir="rtl">
      <div className="flex justify-between items-center mb-6 pb-3 border-b border-slate-800">
        <div>
          <h2 className="text-xl font-bold flex items-center gap-2">
            <Activity className="text-cyan-400" /> تشخيص الأبراج والنودات
          </h2>
          <p className="text-xs text-slate-400 mt-1">فحص أزمنة الاستجابة وإعادة تشغيل منافذ التغذية الذكية</p>
        </div>
      </div>

      <div className="space-y-3">
        {nodes.map((node) => (
          <div key={node.id} className="bg-slate-800/80 p-4 rounded-lg border border-slate-700/60 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex items-center gap-3">
              {node.status === 'online' && <CheckCircle2 className="text-emerald-400 w-5 h-5 shrink-0" />}
              {node.status === 'degraded' && <AlertTriangle className="text-amber-400 w-5 h-5 shrink-0" />}
              {node.status === 'offline' && <Wifi className="text-rose-500 w-5 h-5 shrink-0" />}
              <div>
                <h3 className="font-semibold text-sm text-slate-100">{node.name}</h3>
                <span className="text-xs font-mono text-slate-400">{node.ip}</span>
              </div>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end">
              <div className="text-xs px-2.5 py-1 rounded bg-slate-900 border border-slate-700 font-mono">
                {node.latency !== null ? `${node.latency} ms` : 'غير متصل'}
              </div>

              <button
                onClick={() => handlePing(node.id)}
                disabled={loadingNodeId === node.id}
                className="p-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-slate-200 transition-colors"
                title="فحص الاتصال Ping"
              >
                <RefreshCw className={`w-4 h-4 ${loadingNodeId === node.id ? 'animate-spin text-cyan-400' : ''}`} />
              </button>

              <button
                onClick={() => handlePoEReboot(node.name, node.poePort)}
                className="p-2 bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 rounded-lg border border-rose-500/30 transition-colors"
                title="إعادة تشغيل المنفذ (PoE Bounce)"
              >
                <Power className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
