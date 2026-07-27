import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { sounds } from '../utils/sound';
import { Play, Pause, Zap, Activity, Volume2, VolumeX, Sparkles } from 'lucide-react';

export const LiveSimulationBar = () => {
  const {
    submitOrder,
    waiterAcknowledgeOrder,
    bumpOrderStatus,
    triggerServiceCall,
    orders,
    tables,
    addNotification
  } = useApp();

  const [isSimulating, setIsSimulating] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [simSpeed, setSimSpeed] = useState(5000); // 5000ms
  const [eventCount, setEventCount] = useState(0);
  const [lastSimEvent, setLastSimEvent] = useState('Simulator Standby • Click Play to start live dining traffic');

  useEffect(() => {
    if (!isSimulating) return;

    const interval = setInterval(() => {
      setEventCount(prev => prev + 1);

      // Randomly pick a realistic simulated dining event
      const eventType = Math.floor(Math.random() * 4);

      if (eventType === 0) {
        // Customer places new order at Table 2
        const randomTable = [2, 4, 6][Math.floor(Math.random() * 3)];
        submitOrder(randomTable, 'Extra sauce please');
        if (soundEnabled) sounds.playOrderChime();
        setLastSimEvent(`🤖 Sim: Guest at Table #${randomTable} placed new gourmet order!`);
      } else if (eventType === 1) {
        // Waiter acknowledges customer order
        const pendingOrders = orders.filter(o => o.status === 'Customer Placed');
        if (pendingOrders.length > 0) {
          const target = pendingOrders[0];
          waiterAcknowledgeOrder(target.id);
          if (soundEnabled) sounds.playChefPing();
          setLastSimEvent(`🤖 Sim: Server ${target.assignedWaiter} acknowledged Order ${target.id} ➔ Sent to KDS!`);
        } else {
          // Trigger service call instead
          const tableNum = [1, 3, 5][Math.floor(Math.random() * 3)];
          triggerServiceCall(tableNum, 'Water Refill');
          if (soundEnabled) sounds.playServiceBell();
          setLastSimEvent(`🤖 Sim: Table #${tableNum} pinged server for Water Refill`);
        }
      } else if (eventType === 2) {
        // Kitchen Chef bumps cooking order to Ready
        const chefOrders = orders.filter(o => o.status === 'Received' || o.status === 'In Prep');
        if (chefOrders.length > 0) {
          const target = chefOrders[0];
          const nextStatus = target.status === 'Received' ? 'In Prep' : 'Ready';
          bumpOrderStatus(target.id, nextStatus);
          if (soundEnabled) sounds.playChefPing();
          setLastSimEvent(`🤖 Sim: Head Chef marked Order ${target.id} as ${nextStatus}!`);
        }
      } else if (eventType === 3) {
        // Customer calls waiter or asks for bill
        const tableNum = Math.floor(Math.random() * 6) + 1;
        triggerServiceCall(tableNum, 'Cutlery & Napkins');
        if (soundEnabled) sounds.playServiceBell();
        setLastSimEvent(`🤖 Sim: Table #${tableNum} requested Cutlery & Napkins`);
      }

    }, simSpeed);

    return () => clearInterval(interval);
  }, [isSimulating, simSpeed, orders, soundEnabled]);

  return (
    <div className="w-full glass-panel border-b border-rose-500/30 bg-[#090b16]/95 backdrop-blur-md px-4 py-2 text-xs flex flex-col sm:flex-row items-center justify-between gap-2 shadow-lg z-30">
      
      {/* Status & Last Event Ticker */}
      <div className="flex items-center space-x-2 truncate max-w-full">
        <div className={`h-2.5 w-2.5 rounded-full flex-shrink-0 ${isSimulating ? 'bg-emerald-400 animate-ping' : 'bg-slate-600'}`} />
        <span className="font-extrabold text-white uppercase tracking-wider text-[10px] bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
          {isSimulating ? 'LIVE SIMULATION' : 'SIMULATOR PAUSED'}
        </span>
        <span className="text-slate-300 font-medium truncate text-[11px]">{lastSimEvent}</span>
      </div>

      {/* Control Buttons */}
      <div className="flex items-center space-x-2 flex-shrink-0">
        
        {/* Mute/Unmute Audio Chime */}
        <button
          onClick={() => setSoundEnabled(!soundEnabled)}
          className={`p-1.5 rounded-lg border transition ${soundEnabled ? 'bg-purple-950/60 border-purple-500/40 text-purple-300' : 'bg-slate-900 border-slate-800 text-slate-500'}`}
          title={soundEnabled ? 'Audio Chimes Enabled' : 'Audio Muted'}
        >
          {soundEnabled ? <Volume2 className="h-3.5 w-3.5" /> : <VolumeX className="h-3.5 w-3.5" />}
        </button>

        {/* Speed Selector */}
        <select
          value={simSpeed}
          onChange={e => setSimSpeed(Number(e.target.value))}
          className="px-2 py-1 bg-slate-900 border border-slate-800 rounded-lg text-[10px] font-bold text-slate-300 focus:outline-none"
        >
          <option value={6000}>Speed: Normal (6s)</option>
          <option value={3000}>Speed: Fast (3s)</option>
          <option value={1500}>Speed: Hyper (1.5s)</option>
        </select>

        {/* Toggle Simulation Button */}
        <button
          onClick={() => {
            setIsSimulating(!isSimulating);
            if (!isSimulating) addNotification('Live Simulation Started', 'Simulating customer orders, waiter dispatches, and kitchen bumps live!', 'success');
          }}
          className={`px-3 py-1 rounded-xl font-extrabold text-xs transition flex items-center space-x-1 shadow-md ${isSimulating ? 'bg-rose-600 text-white hover:bg-rose-500' : 'bg-emerald-600 text-white hover:bg-emerald-500'}`}
        >
          {isSimulating ? (
            <>
              <Pause className="h-3.5 w-3.5 fill-current" />
              <span>Pause Sim</span>
            </>
          ) : (
            <>
              <Play className="h-3.5 w-3.5 fill-current" />
              <span>Auto-Simulate Dining</span>
            </>
          )}
        </button>

      </div>

    </div>
  );
};
