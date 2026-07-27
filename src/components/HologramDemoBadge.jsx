import React from 'react';
import { Sparkles, Shield, Cpu, Zap } from 'lucide-react';

export const HologramDemoBadge = () => {
  return (
    <div className="relative overflow-hidden w-full bg-slate-950/90 border-y border-cyan-500/40 py-2 px-4 backdrop-blur-2xl shadow-[0_0_25px_rgba(6,182,212,0.25)]">
      
      {/* Hologram Scan Lines Background */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: 'linear-gradient(rgba(6, 182, 212, 0.4) 1px, transparent 1px)',
          backgroundSize: '100% 4px'
        }}
      />

      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-xs">
        
        {/* Glowing Live System Badge */}
        <div className="flex items-center space-x-2 text-cyan-300 font-extrabold tracking-wider uppercase animate-pulse">
          <div className="p-1 rounded-lg bg-cyan-500/20 border border-cyan-400/50 shadow-[0_0_12px_rgba(6,182,212,0.6)]">
            <Cpu className="h-4 w-4 text-cyan-400 animate-spin" style={{ animationDuration: '6s' }} />
          </div>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-purple-300 to-rose-300 font-mono">
            ⚡ LIVE PRODUCTION SYSTEM • ACTIVE WORKSPACE ⚡
          </span>
        </div>

        {/* Live Simulation Indicator */}
        <div className="flex items-center space-x-3 text-[11px] font-semibold text-slate-300">
          <span className="flex items-center space-x-1 text-emerald-400">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
            <span>Interactive Multi-Role Sync</span>
          </span>
          <span className="text-slate-600">|</span>
          <span className="text-purple-300 flex items-center space-x-1">
            <Sparkles className="h-3 w-3 text-purple-400" />
            <span>Gemini AI Engine Active</span>
          </span>
        </div>

      </div>
    </div>
  );
};
