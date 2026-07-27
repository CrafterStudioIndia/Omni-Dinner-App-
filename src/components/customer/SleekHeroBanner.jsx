import React from 'react';
import { useApp } from '../../context/AppContext';
import { useAI } from '../../context/AIContext';
import { Sparkles, Utensils, QrCode, Clock, ShieldCheck, Flame, Leaf } from 'lucide-react';

export const SleekHeroBanner = ({ isVegOnly, setIsVegOnly, selectedCategory, setSelectedCategory }) => {
  const { activeTableNumber, triggerServiceCall } = useApp();
  const { askAI } = useAI();

  return (
    <div className="relative rounded-3xl overflow-hidden glass-panel p-6 sm:p-8 border border-slate-800 bg-gradient-to-br from-[#0e1424] via-[#090d18] to-[#050811] shadow-2xl">
      
      {/* Background Ambient Glows */}
      <div className="absolute top-0 right-0 h-64 w-64 rounded-full bg-rose-500/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 h-64 w-64 rounded-full bg-purple-500/10 blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        
        {/* Title & Tagline */}
        <div className="max-w-xl space-y-2">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-slate-900/90 border border-slate-800 text-xs font-semibold text-slate-300">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="font-bold text-white">Table #{activeTableNumber} Connected</span>
            <span className="text-slate-500">•</span>
            <span className="text-slate-400">Live Kitchen Sync</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
            Crafted Gastronomy <span className="gradient-text">Digitized</span>
          </h1>

          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
            Sleek contactless QR ordering, real-time kitchen display tracking, and Gemini AI-driven dish pairings.
          </p>
        </div>

        {/* Quick Minimal Action Cards */}
        <div className="flex flex-wrap md:flex-col gap-2 flex-shrink-0">
          
          {/* 100% Pure Veg Pill Toggle */}
          <button
            onClick={() => setIsVegOnly(!isVegOnly)}
            className={`px-4 py-2.5 rounded-2xl text-xs font-extrabold transition flex items-center justify-between space-x-3 border shadow-lg ${isVegOnly ? 'bg-emerald-600 text-white border-emerald-400 ring-2 ring-emerald-500/30' : 'bg-slate-900/90 text-emerald-400 border-emerald-500/30 hover:bg-emerald-950/40'}`}
          >
            <div className="flex items-center space-x-2">
              <Leaf className="h-4 w-4 text-emerald-400" />
              <span>100% Pure Veg</span>
            </div>
            <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${isVegOnly ? 'bg-emerald-950 text-emerald-200' : 'bg-emerald-500/20 text-emerald-300'}`}>
              {isVegOnly ? 'ACTIVE' : 'OFF'}
            </span>
          </button>

          {/* AI Wine & Food Pairing Button */}
          <button
            onClick={() => askAI(`Suggest top wine and food pairing for Table ${activeTableNumber}`)}
            className="px-4 py-2.5 rounded-2xl bg-purple-950/50 hover:bg-purple-900/70 border border-purple-500/40 text-purple-200 text-xs font-extrabold transition flex items-center space-x-2 shadow-lg"
          >
            <Sparkles className="h-4 w-4 text-purple-400" />
            <span>AI Chef Pairings</span>
          </button>

        </div>

      </div>

    </div>
  );
};
