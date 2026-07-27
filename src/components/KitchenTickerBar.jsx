import React from 'react';
import { Flame, ShieldCheck, Zap, ConciergeBell } from 'lucide-react';

export const KitchenTickerBar = () => {
  return (
    <div className="w-full bg-slate-900/90 border-y border-slate-800 py-2 px-4 backdrop-blur-md overflow-x-auto text-[11px] font-semibold text-slate-300 flex items-center justify-between gap-4 whitespace-nowrap">
      
      <div className="flex items-center space-x-6">
        <div className="flex items-center space-x-1.5 text-rose-400">
          <Flame className="h-3.5 w-3.5 animate-bounce text-rose-500" />
          <span className="font-extrabold text-white">Live Tandoor:</span>
          <span>350°C Clay Oven Active</span>
        </div>

        <div className="flex items-center space-x-1.5 text-emerald-400">
          <ShieldCheck className="h-3.5 w-3.5" />
          <span className="font-extrabold text-white">Dietary Assurance:</span>
          <span>100% Pure Veg & Jain Preparation Available</span>
        </div>

        <div className="flex items-center space-x-1.5 text-amber-400">
          <Zap className="h-3.5 w-3.5" />
          <span className="font-extrabold text-white">Prep SLA:</span>
          <span>Avg 11.5 mins Table Delivery</span>
        </div>
      </div>

      <div className="hidden md:flex items-center space-x-2 text-slate-400">
        <ConciergeBell className="h-3.5 w-3.5 text-purple-400" />
        <span>OmniDine AI Kitchen Engine • Live Operations</span>
      </div>

    </div>
  );
};
