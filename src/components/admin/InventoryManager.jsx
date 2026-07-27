import React from 'react';
import { useApp } from '../../context/AppContext';
import { Package, AlertTriangle, RefreshCw, CheckCircle2, Truck } from 'lucide-react';

export const InventoryManager = () => {
  const { inventory, replenishStock } = useApp();

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 glass-panel rounded-3xl p-6 border border-slate-800">
        <div className="flex items-center space-x-3">
          <div className="h-10 w-10 rounded-2xl bg-rose-500/20 text-rose-400 flex items-center justify-center border border-rose-500/30">
            <Package className="h-6 w-6" />
          </div>
          <div>
            <h2 className="text-xl font-extrabold text-white">Smart Inventory & Stock Replenishment</h2>
            <p className="text-xs text-slate-400">Automated stock depletion tracking and instant supplier reordering.</p>
          </div>
        </div>

        <div className="text-xs font-bold text-slate-300">
          Total Ingredients: <span className="text-rose-400">{inventory.length}</span>
        </div>
      </div>

      {/* Inventory Table */}
      <div className="glass-panel rounded-3xl p-6 border border-slate-800 overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-slate-800 text-slate-400 uppercase tracking-wider text-[10px]">
              <th className="pb-3 pl-2">Ingredient Name</th>
              <th className="pb-3">Category</th>
              <th className="pb-3">Current Stock</th>
              <th className="pb-3">Min Threshold</th>
              <th className="pb-3">Supplier</th>
              <th className="pb-3">Stock Status</th>
              <th className="pb-3 text-right pr-2">Quick Reorder</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60">
            {inventory.map(item => {
              const isLow = item.currentStock <= item.minThreshold;
              const isOut = item.currentStock === 0;

              return (
                <tr key={item.id} className="hover:bg-slate-900/60 transition">
                  <td className="py-3.5 pl-2 font-bold text-white">{item.name}</td>
                  <td className="py-3.5 text-slate-400">{item.category}</td>
                  <td className="py-3.5 font-bold text-rose-300">{item.currentStock} {item.unit}</td>
                  <td className="py-3.5 text-slate-400">{item.minThreshold} {item.unit}</td>
                  <td className="py-3.5 text-slate-300 font-medium">{item.supplier}</td>
                  <td className="py-3.5">
                    {isOut ? (
                      <span className="px-2.5 py-1 rounded-full bg-rose-600/90 text-white font-bold text-[10px]">
                        Out of Stock
                      </span>
                    ) : isLow ? (
                      <span className="px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-300 font-bold text-[10px] border border-amber-500/30 flex items-center space-x-1 w-fit">
                        <AlertTriangle className="h-3 w-3" />
                        <span>Low Stock</span>
                      </span>
                    ) : (
                      <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-semibold text-[10px] border border-emerald-500/30">
                        Optimal
                      </span>
                    )}
                  </td>
                  <td className="py-3.5 text-right pr-2">
                    <button
                      onClick={() => replenishStock(item.id, 15)}
                      className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-rose-300 border border-slate-800 font-bold text-[11px] transition flex items-center space-x-1.5 ml-auto"
                    >
                      <Truck className="h-3.5 w-3.5 text-rose-400" />
                      <span>Reorder +15</span>
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

    </div>
  );
};
