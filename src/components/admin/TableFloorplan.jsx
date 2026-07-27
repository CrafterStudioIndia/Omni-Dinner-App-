import React from 'react';
import { useApp } from '../../context/AppContext';
import { Users, Clock, QrCode, CheckCircle2, AlertCircle, RefreshCw } from 'lucide-react';

export const TableFloorplan = () => {
  const { tables, updateTableStatus, setActiveTableNumber, activeTableNumber } = useApp();

  const getStatusColor = (status) => {
    switch (status) {
      case 'Occupied': return 'bg-rose-950/50 border-rose-500 text-rose-300';
      case 'Available': return 'bg-emerald-950/50 border-emerald-500 text-emerald-300';
      case 'Reserved': return 'bg-amber-950/50 border-amber-500 text-amber-300';
      case 'Needs Cleaning': return 'bg-slate-900 border-slate-700 text-slate-400';
      default: return 'bg-slate-900 border-slate-800 text-slate-300';
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Floor Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 glass-panel rounded-3xl p-6 border border-slate-800">
        <div>
          <h2 className="text-xl font-extrabold text-white">Interactive Table Floorplan & Seating</h2>
          <p className="text-xs text-slate-400">Live seating layout, assigned waitstaff, and occupancy timers.</p>
        </div>

        <div className="flex flex-wrap gap-2 text-xs font-semibold">
          <span className="px-2.5 py-1 rounded-lg bg-emerald-950/60 border border-emerald-500/40 text-emerald-300">
            Available
          </span>
          <span className="px-2.5 py-1 rounded-lg bg-rose-950/60 border border-rose-500/40 text-rose-300">
            Occupied
          </span>
          <span className="px-2.5 py-1 rounded-lg bg-amber-950/60 border border-amber-500/40 text-amber-300">
            Reserved
          </span>
          <span className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-700 text-slate-400">
            Needs Cleaning
          </span>
        </div>
      </div>

      {/* Grid of Tables */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {tables.map(table => {
          const isSelected = activeTableNumber === table.id;

          return (
            <div
              key={table.id}
              onClick={() => setActiveTableNumber(table.id)}
              className={`glass-panel rounded-3xl p-6 border transition-all duration-300 cursor-pointer space-y-4 shadow-xl ${getStatusColor(table.status)} ${isSelected ? 'ring-2 ring-rose-400 shadow-rose-950/50' : 'hover:border-slate-600'}`}
            >
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <QrCode className="h-5 w-5 text-amber-400" />
                  <span className="font-extrabold text-lg text-white">{table.name}</span>
                </div>
                <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider border bg-slate-950/80">
                  {table.status}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs text-slate-300">
                <div className="p-2 rounded-xl bg-slate-900/80 border border-slate-800">
                  <span className="text-[10px] text-slate-500 block">Capacity</span>
                  <span className="font-bold">{table.seats} Seats</span>
                </div>
                <div className="p-2 rounded-xl bg-slate-900/80 border border-slate-800">
                  <span className="text-[10px] text-slate-500 block">Assigned Server</span>
                  <span className="font-bold text-rose-300">{table.server}</span>
                </div>
              </div>

              {table.status === 'Occupied' && (
                <div className="p-3 rounded-2xl bg-rose-950/60 border border-rose-500/30 flex justify-between items-center text-xs">
                  <span className="text-slate-300">Active Tab:</span>
                  <span className="font-extrabold text-rose-400 text-sm">${table.currentOrderTotal.toFixed(2)}</span>
                </div>
              )}

              {/* Status Action Buttons */}
              <div className="pt-2 border-t border-slate-800/80 flex gap-1.5" onClick={e => e.stopPropagation()}>
                {table.status !== 'Occupied' && (
                  <button
                    onClick={() => updateTableStatus(table.id, 'Occupied')}
                    className="flex-1 py-1.5 rounded-xl bg-rose-600/80 hover:bg-rose-500 text-white font-bold text-[11px]"
                  >
                    Seat Guests
                  </button>
                )}
                {table.status === 'Occupied' && (
                  <button
                    onClick={() => updateTableStatus(table.id, 'Needs Cleaning')}
                    className="flex-1 py-1.5 rounded-xl bg-amber-600/80 hover:bg-amber-500 text-white font-bold text-[11px]"
                  >
                    Clear & Clean
                  </button>
                )}
                {table.status === 'Needs Cleaning' && (
                  <button
                    onClick={() => updateTableStatus(table.id, 'Available')}
                    className="flex-1 py-1.5 rounded-xl bg-emerald-600/80 hover:bg-emerald-500 text-white font-bold text-[11px]"
                  >
                    Mark Ready
                  </button>
                )}
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
};
