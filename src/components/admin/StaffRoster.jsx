import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { StaffErrorReportModal } from './StaffErrorReportModal';
import { Users, ConciergeBell, Clock, AlertTriangle, CheckCircle2, ShieldAlert, ConciergeBell as ConciergeBellIcon, UserCheck, Shield, Send, Utensils, ArrowRight } from 'lucide-react';

export const StaffRoster = () => {
  const { serviceCalls, resolveServiceCall, orders, waiterAcknowledgeOrder, staffErrors } = useApp();
  const [isStaffErrorModalOpen, setIsStaffErrorModalOpen] = useState(false);

  // Orders placed by customers waiting for waiter acknowledgement before sending to chef
  const pendingWaiterOrders = orders.filter(o => o.status === 'Customer Placed');

  const staffList = [
    { id: 's1', name: 'Alex Vance', role: 'Head Waiter', tables: 'Tables 1 & 2', shift: '16:00 - 00:00', rating: '4.95 ⭐' },
    { id: 's2', name: 'Sarah Connor', role: 'Floor Server', tables: 'Tables 3 & 4', shift: '17:00 - 01:00', rating: '4.90 ⭐' },
    { id: 's3', name: 'Gordon Ramsay', role: 'Executive Chef', tables: 'Kitchen Line', shift: '12:00 - 22:00', rating: '5.00 ⭐' },
  ];

  return (
    <div className="space-y-6">

      {/* Customer Orders Awaiting Waiter Acknowledgement */}
      {pendingWaiterOrders.length > 0 && (
        <div className="glass-panel rounded-3xl p-6 border border-rose-500/40 space-y-4 bg-rose-950/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-rose-400">
              <Utensils className="h-5 w-5 animate-pulse" />
              <h3 className="font-extrabold text-base text-white">
                Customer Orders Awaiting Waiter Dispatch ({pendingWaiterOrders.length})
              </h3>
            </div>
            <span className="text-xs text-rose-300 font-semibold">Stage 2 of Interconnected Workflow</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {pendingWaiterOrders.map(ord => (
              <div key={ord.id} className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
                <div className="flex justify-between items-center text-xs font-bold text-white">
                  <span>{ord.id} — Table #{ord.tableNumber}</span>
                  <span className="text-amber-400 font-normal">{ord.timestamp}</span>
                </div>
                <div className="text-xs text-slate-300">
                  Guest: <strong>{ord.customerName}</strong> • Server: <span className="text-rose-300">{ord.assignedWaiter}</span>
                </div>
                <div className="text-xs text-slate-400 font-semibold">
                  Items: {ord.items?.map(i => `${i.quantity}x ${i.name}`).join(', ') || 'No items'}
                </div>
                <button
                  onClick={() => waiterAcknowledgeOrder(ord.id)}
                  className="w-full py-2.5 rounded-xl bg-gradient-to-r from-rose-600 to-amber-600 text-white font-bold text-xs hover:opacity-90 transition flex items-center justify-center space-x-2 shadow-lg"
                >
                  <Send className="h-3.5 w-3.5" />
                  <span>Acknowledge & Send to Kitchen Chef KDS</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Pending Service Requests Log */}
      <div className="glass-panel rounded-3xl p-6 border border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 text-amber-400">
            <ConciergeBell className="h-5 w-5" />
            <h3 className="font-extrabold text-base text-white">Live Customer Service Requests ({serviceCalls.length})</h3>
          </div>
          <span className="text-xs text-slate-400">Pings from table QR buttons</span>
        </div>

        <div className="space-y-2.5">
          {serviceCalls.length === 0 ? (
            <p className="text-xs text-slate-500 py-4 text-center">No active service calls. Floor staff fully clear!</p>
          ) : (
            serviceCalls.map(call => (
              <div key={call.id} className="p-3.5 rounded-2xl bg-amber-950/20 border border-amber-500/30 flex items-center justify-between">
                <div>
                  <div className="font-bold text-xs text-white">
                    Table #{call.tableNumber} — <span className="text-amber-300">{call.type}</span>
                  </div>
                  <span className="text-[10px] text-slate-400">Requested at {call.time}</span>
                </div>

                <button
                  onClick={() => resolveServiceCall(call.id)}
                  className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition flex items-center space-x-1"
                >
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  <span>Resolve Ping</span>
                </button>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Staff Roster Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {staffList.map(st => (
          <div key={st.id} className="glass-panel rounded-3xl p-5 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-bold text-sm text-white">{st.name}</h4>
                <span className="text-xs text-rose-400 font-semibold">{st.role}</span>
              </div>
              <span className="text-xs font-bold text-amber-400 bg-slate-900 px-2 py-1 rounded-lg border border-slate-800">
                {st.rating}
              </span>
            </div>

            <div className="space-y-1 text-xs text-slate-300 pt-2 border-t border-slate-800">
              <div className="flex justify-between text-slate-400">
                <span>Assigned Zone:</span>
                <span className="font-bold text-slate-200">{st.tables}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Shift Schedule:</span>
                <span className="font-bold text-slate-200">{st.shift}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Worker Error Report Button & Header Action */}
      <div className="flex items-center justify-between glass-panel p-4 rounded-2xl border border-rose-500/30">
        <div className="flex items-center space-x-2 text-rose-300">
          <ShieldAlert className="h-5 w-5 animate-pulse" />
          <div>
            <h4 className="font-extrabold text-sm text-white">Worker Error & Operational Incident Log</h4>
            <p className="text-[11px] text-slate-400">Track staff delays, order customization errors, and resolution actions</p>
          </div>
        </div>

        <button
          onClick={() => setIsStaffErrorModalOpen(true)}
          className="px-4 py-2 rounded-xl bg-gradient-to-r from-rose-600 to-rose-500 hover:opacity-95 text-white font-extrabold text-xs shadow-lg flex items-center space-x-1.5 transition"
        >
          <AlertTriangle className="h-4 w-4" />
          <span>Worker Error Log ({staffErrors ? staffErrors.filter(e => e.status !== 'Resolved').length : 0} Open)</span>
        </button>
      </div>

      <StaffErrorReportModal
        isOpen={isStaffErrorModalOpen}
        onClose={() => setIsStaffErrorModalOpen(false)}
      />
    </div>
  );
};
