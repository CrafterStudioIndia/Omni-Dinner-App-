import React from 'react';
import { useApp } from '../../context/AppContext';
import { Clock, CheckCircle2, ChefHat, Utensils, Receipt, Bell, Sparkles } from 'lucide-react';

export const LiveOrderTracker = () => {
  const { orders, activeTableNumber, setIsBillModalOpen, triggerServiceCall } = useApp();

  // Find active orders for current table
  const activeTableOrders = orders.filter(o => o.tableNumber === Number(activeTableNumber));

  if (activeTableOrders.length === 0) {
    return (
      <div className="glass-panel rounded-3xl p-6 border border-slate-800 text-center">
        <Utensils className="h-8 w-8 text-slate-600 mx-auto mb-2" />
        <h3 className="text-sm font-bold text-slate-300">No Active Order for Table #{activeTableNumber}</h3>
        <p className="text-xs text-slate-500 mt-1">Place an order from the Digital Menu to monitor kitchen preparation live!</p>
      </div>
    );
  }

  const steps = [
    { key: 'Received', label: 'Order Sent', desc: 'Ticket logged at kitchen' },
    { key: 'In Prep', label: 'Chef Preparing', desc: 'Active cooking on line' },
    { key: 'Ready', label: 'Ready for Service', desc: 'Waitstaff en route' },
    { key: 'Served', label: 'Served at Table', desc: 'Bon Appétit!' }
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Clock className="h-5 w-5 text-rose-400 animate-spin" />
          <h2 className="font-extrabold text-base text-white">Live Table #{activeTableNumber} Order Progress</h2>
        </div>

        <button
          onClick={() => setIsBillModalOpen(true)}
          className="px-3.5 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 hover:bg-emerald-500/25 text-xs font-bold transition flex items-center space-x-1.5"
        >
          <Receipt className="h-3.5 w-3.5" />
          <span>Request Digital Bill</span>
        </button>
      </div>

      {activeTableOrders.map(order => {
        const currentStepIndex = steps.findIndex(s => s.key === order.status);

        return (
          <div key={order.id} className="glass-panel rounded-3xl p-6 border border-slate-800 space-y-6">
            
            {/* Ticket Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-800">
              <div>
                <div className="flex items-center space-x-2">
                  <span className="font-extrabold text-white text-base">Order #{order.id}</span>
                  <span className="px-2.5 py-0.5 rounded-full bg-rose-500/20 text-rose-300 font-bold text-[10px]">
                    {order.status}
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-0.5">Placed at {order.timestamp} • Guest: {order.customerName}</p>
              </div>

              <div className="flex items-center space-x-3">
                <div className="text-right">
                  <div className="text-xs text-slate-400">Total Bill</div>
                  <div className="text-base font-extrabold text-rose-400">${order.total.toFixed(2)}</div>
                </div>

                <button
                  onClick={() => triggerServiceCall(activeTableNumber, 'Order Inquiry')}
                  className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-amber-400 hover:bg-slate-800 text-xs font-semibold flex items-center space-x-1"
                >
                  <Bell className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Visual Step Timeline */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {steps.map((step, idx) => {
                const isPassed = idx <= currentStepIndex;
                const isCurrent = idx === currentStepIndex;

                return (
                  <div
                    key={step.key}
                    className={`p-3 rounded-2xl border transition ${isCurrent ? 'bg-rose-950/40 border-rose-500 text-white shadow-lg' : isPassed ? 'bg-slate-900/80 border-slate-700 text-slate-300' : 'bg-slate-950/40 border-slate-900 text-slate-600'}`}
                  >
                    <div className="flex items-center justify-between text-xs font-bold mb-1">
                      <span>{step.label}</span>
                      {isPassed && <CheckCircle2 className="h-3.5 w-3.5 text-rose-400" />}
                    </div>
                    <p className="text-[10px] text-slate-400">{step.desc}</p>
                  </div>
                );
              })}
            </div>

            {/* Itemized Order Summary */}
            <div className="space-y-1.5 pt-2">
              <div className="text-xs font-semibold text-slate-400">Ordered Items ({order.items.length})</div>
              <div className="flex flex-wrap gap-2">
                {order.items.map((it, idx) => (
                  <span key={idx} className="px-2.5 py-1 rounded-lg bg-slate-900 text-xs font-medium text-slate-200 border border-slate-800">
                    {it.quantity}x {it.name} (${(it.price * it.quantity).toFixed(2)})
                  </span>
                ))}
              </div>
            </div>

          </div>
        );
      })}
    </div>
  );
};
