import React from 'react';
import { useApp } from '../../context/AppContext';
import { ChefHat, Clock, AlertCircle, CheckCircle2, Flame, ArrowRight, ToggleLeft, ToggleRight } from 'lucide-react';

export const KitchenDisplay = () => {
  const { orders, bumpOrderStatus, menuItems, toggleItemAvailability } = useApp();

  // Active tickets excluding already completed served ones
  const kitchenTickets = orders.filter(o => o.status !== 'Served');

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 glass-panel rounded-3xl p-6 border border-slate-800">
        <div className="flex items-center space-x-3">
          <div className="h-10 w-10 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center border border-amber-500/30">
            <ChefHat className="h-6 w-6" />
          </div>
          <div>
            <h2 className="text-xl font-extrabold text-white">Kitchen Display System (KDS)</h2>
            <p className="text-xs text-slate-400">Live order ticket stream with real-time prep timers and item toggles.</p>
          </div>
        </div>

        <div className="flex items-center space-x-3 text-xs font-bold">
          <span className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300">
            Active Tickets: <strong className="text-rose-400">{kitchenTickets.length}</strong>
          </span>
          <span className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300">
            Avg Prep Target: <strong className="text-amber-400">15 mins</strong>
          </span>
        </div>
      </div>

      {/* Main KDS Board Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {kitchenTickets.length === 0 ? (
          <div className="col-span-full text-center py-16 glass-panel rounded-3xl border border-slate-800">
            <CheckCircle2 className="h-12 w-12 text-emerald-400 mx-auto mb-2" />
            <h3 className="text-base font-extrabold text-white">All Kitchen Orders Clear!</h3>
            <p className="text-xs text-slate-400 mt-1">No pending tickets in prep line right now.</p>
          </div>
        ) : (
          kitchenTickets.map(ticket => {
            const isReceived = ticket.status === 'Received';
            const isInPrep = ticket.status === 'In Prep';
            const isReady = ticket.status === 'Ready';

            return (
              <div
                key={ticket.id}
                className={`glass-panel rounded-3xl p-5 border flex flex-col justify-between shadow-xl transition-all ${isReceived ? 'border-amber-500/50 bg-amber-950/10' : isInPrep ? 'border-rose-500/50 bg-rose-950/10' : 'border-emerald-500/50 bg-emerald-950/10'}`}
              >
                <div>
                  {/* Ticket Header */}
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800/80">
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-extrabold text-base text-white">{ticket.id}</span>
                        <span className="px-2 py-0.5 rounded-md bg-slate-900 text-amber-300 font-extrabold text-xs border border-slate-800">
                          Table #{ticket.tableNumber}
                        </span>
                      </div>
                      <span className="text-[11px] text-slate-400">{ticket.timestamp} • {ticket.customerName}</span>
                    </div>

                    <div className="flex items-center space-x-1 text-xs font-bold text-amber-400">
                      <Clock className="h-3.5 w-3.5" />
                      <span>{ticket.prepTimer}m</span>
                    </div>
                  </div>

                  {/* Items List */}
                  <div className="py-4 space-y-2.5">
                    {ticket.items.map((item, idx) => (
                      <div key={idx} className="flex items-start justify-between text-xs">
                        <div className="flex items-start space-x-2">
                          <span className="h-5 w-5 rounded bg-rose-500/20 text-rose-300 font-bold flex items-center justify-center text-[11px]">
                            {item.quantity}
                          </span>
                          <div>
                            <span className="font-bold text-slate-100">{item.name}</span>
                            {item.notes && <p className="text-[10px] text-amber-300 italic">"{item.notes}"</p>}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Ticket Bump Action */}
                <div className="pt-3 border-t border-slate-800/80">
                  {isReceived && (
                    <button
                      onClick={() => bumpOrderStatus(ticket.id, 'In Prep')}
                      className="w-full py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs transition flex items-center justify-center space-x-2"
                    >
                      <Flame className="h-4 w-4" />
                      <span>Start Cooking (In Prep)</span>
                    </button>
                  )}

                  {isInPrep && (
                    <button
                      onClick={() => bumpOrderStatus(ticket.id, 'Ready')}
                      className="w-full py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs transition flex items-center justify-center space-x-2"
                    >
                      <CheckCircle2 className="h-4 w-4" />
                      <span>Mark Ticket Ready</span>
                    </button>
                  )}

                  {isReady && (
                    <button
                      onClick={() => bumpOrderStatus(ticket.id, 'Served')}
                      className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition flex items-center justify-center space-x-2"
                    >
                      <ArrowRight className="h-4 w-4" />
                      <span>Order Handed to Waiter</span>
                    </button>
                  )}
                </div>

              </div>
            );
          })
        )}
      </div>

      {/* Quick Kitchen Stock Toggle Bar */}
      <div className="glass-panel rounded-3xl p-6 border border-slate-800 space-y-4">
        <h3 className="font-extrabold text-sm text-white">Live Kitchen Stock Availability Control</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {menuItems.map(dish => (
            <div
              key={dish.id}
              onClick={() => toggleItemAvailability(dish.id)}
              className={`p-3 rounded-2xl border cursor-pointer transition flex items-center justify-between ${dish.isAvailable ? 'bg-slate-900/80 border-slate-800 text-slate-200' : 'bg-rose-950/20 border-rose-500/30 text-rose-300 opacity-60'}`}
            >
              <div className="truncate pr-2">
                <div className="font-bold text-xs truncate">{dish.name}</div>
                <div className="text-[10px] text-slate-500">Stock: {dish.stockCount}</div>
              </div>
              <div>
                {dish.isAvailable ? (
                  <ToggleRight className="h-6 w-6 text-emerald-400" />
                ) : (
                  <ToggleLeft className="h-6 w-6 text-rose-500" />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
