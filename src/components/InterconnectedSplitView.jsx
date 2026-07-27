import React from 'react';
import { useApp } from '../context/AppContext';
import { Network, User, ConciergeBell, ChefHat, LayoutDashboard, Send, CheckCircle2, Flame, Clock, ArrowRight, Bell, Sparkles } from 'lucide-react';

export const InterconnectedSplitView = () => {
  const {
    activeTableNumber,
    cart,
    addToCart,
    submitOrder,
    orders,
    waiterAcknowledgeOrder,
    bumpOrderStatus,
    serviceCalls,
    triggerServiceCall,
    resolveServiceCall,
    interconnectivityLogs,
    menuItems
  } = useApp();

  // Active items for demonstration
  const pendingCustomerOrders = orders.filter(o => o.status === 'Customer Placed');
  const pendingKitchenTickets = orders.filter(o => o.status === 'Received' || o.status === 'In Prep' || o.status === 'Ready');
  const activeServiceCalls = serviceCalls.filter(c => c.status !== 'Resolved');

  return (
    <div className="space-y-6">
      
      {/* Banner */}
      <div className="glass-panel rounded-3xl p-6 border border-rose-500/40 bg-gradient-to-r from-rose-950/30 via-slate-900 to-purple-950/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs font-bold mb-2">
            <Network className="h-4 w-4 text-amber-400 animate-pulse" />
            <span>Real-Time 4-Role Live Interconnectivity Screen</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-white">
            Watch Actions Flow Live Across <span className="gradient-text">All 4 Roles</span> Simultaneously
          </h2>
          <p className="text-xs text-slate-300 mt-1">
            Perform an action in the Customer column below and watch it instantly trigger alerts in the Waiter, Chef, and Manager Admin columns!
          </p>
        </div>

        <button
          onClick={() => {
            addToCart(menuItems[0], 1, 'Extra spicy');
            submitOrder(activeTableNumber, 'Live interconnectivity demo');
          }}
          className="px-4 py-2.5 rounded-2xl bg-gradient-to-r from-rose-600 via-rose-500 to-amber-500 text-white font-extrabold text-xs shadow-xl shadow-rose-950/50 hover:opacity-95 transition flex items-center space-x-2 whitespace-nowrap"
        >
          <Sparkles className="h-4 w-4" />
          <span>⚡ Trigger Test Order Flow</span>
        </button>
      </div>

      {/* 4-Column Live Side-by-Side Interconnected Pipeline */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* COLUMN 1: CUSTOMER VIEW */}
        <div className="glass-panel rounded-3xl p-5 border border-blue-500/40 space-y-4 bg-blue-950/10 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-blue-500/20">
              <div className="flex items-center space-x-2 text-blue-400">
                <User className="h-5 w-5" />
                <h3 className="font-extrabold text-sm text-white">1. Customer (Table #{activeTableNumber})</h3>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 font-bold">Stage 1</span>
            </div>

            <div className="mt-3 space-y-3">
              <p className="text-[11px] text-slate-300">Place an order or request table service below:</p>
              
              <div className="space-y-2">
                <button
                  onClick={() => triggerServiceCall(activeTableNumber, 'Water Refill')}
                  className="w-full py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-blue-500/30 text-xs text-blue-300 font-bold transition flex items-center justify-center space-x-1.5"
                >
                  <Bell className="h-3.5 w-3.5 text-amber-400" />
                  <span>Call Waiter for Water</span>
                </button>

                <button
                  onClick={() => {
                    const paneerItem = menuItems.find(m => m.name.includes('Paneer')) || menuItems[0];
                    submitOrder(activeTableNumber, 'Paneer Butter Masala order', [{ item: paneerItem, quantity: 1, notes: 'Extra butter & medium spicy' }]);
                  }}
                  className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md transition flex items-center justify-center space-x-1.5"
                >
                  <Send className="h-3.5 w-3.5" />
                  <span>Send Paneer Butter Masala Order</span>
                </button>
              </div>

              {/* Customer Active Orders List */}
              <div className="pt-2">
                <span className="text-[10px] font-bold text-slate-400 uppercase">My Active Table Orders</span>
                <div className="mt-1 space-y-1.5 max-h-36 overflow-y-auto">
                  {orders.filter(o => o.tableNumber === Number(activeTableNumber)).slice(0, 3).map(o => (
                    <div key={o.id} className="p-2 rounded-xl bg-slate-900/90 border border-slate-800 text-[11px]">
                      <div className="flex justify-between font-bold text-white">
                        <span>{o.id}</span>
                        <span className="text-amber-400">{o.status}</span>
                      </div>
                      <div className="text-[10px] text-slate-400 mt-0.5">${o.total.toFixed(2)}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="text-[10px] text-blue-300 italic text-center pt-2 border-t border-blue-500/20">
            ➔ Action sends instant ping to Waitstaff!
          </div>
        </div>

        {/* COLUMN 2: WAITSTAFF VIEW */}
        <div className="glass-panel rounded-3xl p-5 border border-amber-500/40 space-y-4 bg-amber-950/10 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-amber-500/20">
              <div className="flex items-center space-x-2 text-amber-400">
                <ConciergeBell className="h-5 w-5" />
                <h3 className="font-extrabold text-sm text-white">2. Waitstaff Floor</h3>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold">Stage 2</span>
            </div>

            <div className="mt-3 space-y-3">
              <span className="text-[10px] font-bold text-slate-400 uppercase">Incoming Customer Dispatches ({pendingCustomerOrders.length})</span>
              
              <div className="space-y-2 max-h-52 overflow-y-auto pr-1">
                {pendingCustomerOrders.length === 0 ? (
                  <div className="p-3 text-center text-[11px] text-slate-500 bg-slate-900/40 rounded-xl">
                    No orders waiting waiter dispatch. Click button in Customer column to test!
                  </div>
                ) : (
                  pendingCustomerOrders.map(ord => (
                    <div key={ord.id} className="p-2.5 rounded-xl bg-slate-900 border border-amber-500/30 text-[11px] space-y-1.5 animate-pulse">
                      <div className="flex justify-between font-bold text-white">
                        <span>Table #{ord.tableNumber}</span>
                        <span className="text-amber-400">{ord.id}</span>
                      </div>
                      <div className="text-[10px] text-slate-300">{ord.items.map(i => `${i.quantity}x ${i.name}`).join(', ')}</div>
                      <button
                        onClick={() => waiterAcknowledgeOrder(ord.id)}
                        className="w-full py-1.5 rounded-lg bg-amber-600 hover:bg-amber-500 text-white font-bold text-[10px] transition"
                      >
                        Acknowledge & Send to Chef ➔
                      </button>
                    </div>
                  ))
                )}
              </div>

              {/* Service Calls */}
              {activeServiceCalls.length > 0 && (
                <div className="pt-2">
                  <span className="text-[10px] font-bold text-amber-400 uppercase">Table Calls ({activeServiceCalls.length})</span>
                  {activeServiceCalls.slice(0, 2).map(c => (
                    <div key={c.id} className="p-2 mt-1 rounded-xl bg-amber-950/40 border border-amber-500/30 flex justify-between items-center text-[10px]">
                      <span className="text-white font-bold">Table #{c.tableNumber}: {c.type}</span>
                      <button onClick={() => resolveServiceCall(c.id)} className="px-2 py-0.5 rounded bg-emerald-600 text-white font-bold">Done</button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="text-[10px] text-amber-300 italic text-center pt-2 border-t border-amber-500/20">
            ➔ Waiter dispatch sends ticket to Kitchen KDS!
          </div>
        </div>

        {/* COLUMN 3: KITCHEN CHEF VIEW */}
        <div className="glass-panel rounded-3xl p-5 border border-rose-500/40 space-y-4 bg-rose-950/10 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-rose-500/20">
              <div className="flex items-center space-x-2 text-rose-400">
                <ChefHat className="h-5 w-5" />
                <h3 className="font-extrabold text-sm text-white">3. Kitchen Chef KDS</h3>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 font-bold">Stage 3</span>
            </div>

            <div className="mt-3 space-y-3">
              <span className="text-[10px] font-bold text-slate-400 uppercase">Active Kitchen Tickets ({pendingKitchenTickets.length})</span>

              <div className="space-y-2 max-h-52 overflow-y-auto pr-1">
                {pendingKitchenTickets.length === 0 ? (
                  <div className="p-3 text-center text-[11px] text-slate-500 bg-slate-900/40 rounded-xl">
                    Kitchen line clear. Acknowledge an order in Waiter column to send ticket here!
                  </div>
                ) : (
                  pendingKitchenTickets.map(t => (
                    <div key={t.id} className="p-2.5 rounded-xl bg-slate-900 border border-rose-500/30 text-[11px] space-y-1.5">
                      <div className="flex justify-between font-bold text-white">
                        <span>{t.id} (Table #{t.tableNumber})</span>
                        <span className="text-rose-400">{t.status}</span>
                      </div>
                      <div className="text-[10px] text-slate-300">{t.items?.map(i => `${i.quantity}x ${i.name}`).join(', ') || 'No items'}</div>
                      
                      {t.status === 'Received' && (
                        <button
                          onClick={() => bumpOrderStatus(t.id, 'In Prep')}
                          className="w-full py-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-bold text-[10px] transition"
                        >
                          🔥 Start Cooking (In Prep)
                        </button>
                      )}
                      {t.status === 'In Prep' && (
                        <button
                          onClick={() => bumpOrderStatus(t.id, 'Ready')}
                          className="w-full py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[10px] transition"
                        >
                          ✅ Mark Ready for Pickup
                        </button>
                      )}
                      {t.status === 'Ready' && (
                        <button
                          onClick={() => bumpOrderStatus(t.id, 'Served')}
                          className="w-full py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold text-[10px] transition"
                        >
                          🍽️ Hand to Server (Served)
                        </button>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          <div className="text-[10px] text-rose-300 italic text-center pt-2 border-t border-rose-500/20">
            ➔ Chef status bump updates Customer & Manager Audit!
          </div>
        </div>

        {/* COLUMN 4: MANAGER ADMIN VIEW */}
        <div className="glass-panel rounded-3xl p-5 border border-emerald-500/40 space-y-4 bg-emerald-950/10 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-emerald-500/20">
              <div className="flex items-center space-x-2 text-emerald-400">
                <LayoutDashboard className="h-5 w-5" />
                <h3 className="font-extrabold text-sm text-white">4. Manager Admin Audit</h3>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold">Stage 4</span>
            </div>

            <div className="mt-3 space-y-3">
              <span className="text-[10px] font-bold text-slate-400 uppercase">Live Interconnectivity Logs</span>

              <div className="space-y-2 max-h-52 overflow-y-auto pr-1">
                {interconnectivityLogs.slice(0, 3).map(l => (
                  <div key={l.id} className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-[10px] space-y-1">
                    <div className="flex justify-between font-bold text-white">
                      <span>Table #{l.tableNumber}</span>
                      <span className="text-emerald-400">{l.stage}</span>
                    </div>
                    <p className="text-slate-400 text-[9px] truncate">{l.title}</p>
                    <div className="text-[9px] text-emerald-300 font-semibold">
                      Steps completed: {l.chain?.filter(c => c.status === 'done')?.length || 0} / {l.chain?.length || 0}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="text-[10px] text-emerald-300 italic text-center pt-2 border-t border-emerald-500/20">
            ✅ Real-time compliance & SLA audit logged!
          </div>
        </div>

      </div>

    </div>
  );
};
