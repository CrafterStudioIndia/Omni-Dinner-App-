import React from 'react';
import { useApp } from '../context/AppContext';
import { Network, CheckCircle2, Clock, User, ConciergeBell, ChefHat, LayoutDashboard, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';

export const InterconnectivityHub = () => {
  const { isInterconnectivityModalOpen, setIsInterconnectivityModalOpen, interconnectivityLogs, orders } = useApp();

  if (!isInterconnectivityModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-3xl glass-panel rounded-3xl p-6 sm:p-8 shadow-2xl border border-rose-500/40 max-h-[90vh] flex flex-col justify-between overflow-hidden bg-[#0c0d18]">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 rounded-2xl bg-gradient-to-tr from-rose-600 to-amber-500 text-white flex items-center justify-center shadow-lg shadow-rose-950/50">
              <Network className="h-6 w-6" />
            </div>
            <div>
              <h2 className="font-extrabold text-lg text-white">End-to-End Interconnectivity Engine</h2>
              <p className="text-xs text-slate-400">Live Chain Audit: Customer ➔ Waiter ➔ Kitchen Chef ➔ Manager Admin</p>
            </div>
          </div>

          <button
            onClick={() => setIsInterconnectivityModalOpen(false)}
            className="p-1.5 rounded-full bg-slate-900 text-slate-400 hover:text-white"
          >
            ✕
          </button>
        </div>

        {/* Dynamic Workflow Legend */}
        <div className="my-4 p-3 rounded-2xl bg-slate-900/80 border border-slate-800 grid grid-cols-2 md:grid-cols-4 gap-2 text-center text-xs">
          <div className="p-2 rounded-xl bg-slate-950 border border-slate-800">
            <User className="h-4 w-4 text-blue-400 mx-auto mb-1" />
            <span className="font-bold text-white block">1. Customer</span>
            <span className="text-[10px] text-slate-400">Places Order / Ping</span>
          </div>
          <div className="p-2 rounded-xl bg-slate-950 border border-slate-800">
            <ConciergeBell className="h-4 w-4 text-amber-400 mx-auto mb-1" />
            <span className="font-bold text-white block">2. Waitstaff</span>
            <span className="text-[10px] text-slate-400">Acknowledge & Dispatch</span>
          </div>
          <div className="p-2 rounded-xl bg-slate-950 border border-slate-800">
            <ChefHat className="h-4 w-4 text-rose-400 mx-auto mb-1" />
            <span className="font-bold text-white block">3. Kitchen Chef</span>
            <span className="text-[10px] text-slate-400">KDS Cooking & Ready</span>
          </div>
          <div className="p-2 rounded-xl bg-slate-950 border border-slate-800">
            <LayoutDashboard className="h-4 w-4 text-emerald-400 mx-auto mb-1" />
            <span className="font-bold text-white block">4. Manager Admin</span>
            <span className="text-[10px] text-slate-400">Live Audit & SLA Report</span>
          </div>
        </div>

        {/* Logs Feed */}
        <div className="flex-1 overflow-y-auto space-y-4 pr-1 max-h-[55vh]">
          {interconnectivityLogs.map(log => (
            <div key={log.id} className="p-4 rounded-2xl glass-card border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="px-2.5 py-1 rounded-lg bg-rose-500/20 text-rose-300 font-extrabold text-xs">
                    Table #{log.tableNumber}
                  </span>
                  <h4 className="font-bold text-sm text-white">{log.title}</h4>
                </div>
                <span className="text-xs font-semibold text-slate-400">Guest: {log.customerName}</span>
              </div>

              {/* Chain Stepper */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-2 pt-2 border-t border-slate-800/80">
                {log.chain.map((step, idx) => (
                  <div
                    key={idx}
                    className={`p-2.5 rounded-xl border text-xs ${step.status === 'done' ? 'bg-emerald-950/30 border-emerald-500/30 text-emerald-200' : step.status === 'active' ? 'bg-amber-950/40 border-amber-500/40 text-amber-200 animate-pulse' : 'bg-slate-900/60 border-slate-800 text-slate-500'}`}
                  >
                    <div className="flex items-center justify-between font-bold text-[11px] mb-1">
                      <span>{step.role}</span>
                      {step.status === 'done' && <CheckCircle2 className="h-3 w-3 text-emerald-400" />}
                    </div>
                    <p className="text-[10px] text-slate-300 line-clamp-1">{step.action}</p>
                    <span className="text-[9px] text-slate-400 mt-1 block">{step.time}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Modal Footer */}
        <div className="pt-4 border-t border-slate-800 flex justify-between items-center text-xs text-slate-400">
          <div className="flex items-center space-x-1.5 text-emerald-400">
            <ShieldCheck className="h-4 w-4" />
            <span>End-to-End Interconnected Audit Log Active</span>
          </div>
          <button
            onClick={() => setIsInterconnectivityModalOpen(false)}
            className="px-4 py-2 rounded-xl bg-slate-900 text-slate-200 font-bold hover:bg-slate-800"
          >
            Close Audit Hub
          </button>
        </div>

      </div>
    </div>
  );
};
