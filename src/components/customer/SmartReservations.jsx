import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Calendar, Users, Clock, Phone, CheckCircle2, Ticket, Sparkles } from 'lucide-react';

export const SmartReservations = () => {
  const { reservations, waitlist, addToWaitlist } = useApp();

  const [activeTab, setActiveTab] = useState('waitlist'); // 'waitlist' | 'reserve'
  
  // Waitlist Form
  const [guestName, setGuestName] = useState('');
  const [partySize, setPartySize] = useState(2);
  const [phone, setPhone] = useState('');
  const [activeQueueTicket, setActiveQueueTicket] = useState(null);

  // Reservation Form
  const [resDate, setResDate] = useState('2026-07-25');
  const [resTime, setResTime] = useState('20:00');
  const [resName, setResName] = useState('');
  const [resPhone, setResPhone] = useState('');
  const [resParty, setResParty] = useState(4);
  const [resConfirmed, setResConfirmed] = useState(false);

  const handleJoinWaitlist = (e) => {
    e.preventDefault();
    if (!guestName || !phone) return;
    const ticket = addToWaitlist({ name: guestName, partySize, phone });
    setActiveQueueTicket(ticket);
    setGuestName('');
    setPhone('');
  };

  const handleCreateReservation = (e) => {
    e.preventDefault();
    setResConfirmed(true);
  };

  return (
    <div className="space-y-6">
      
      {/* Title & Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-white">Smart Table & Waitlist Operations</h2>
          <p className="text-xs text-slate-400">Avoid long waiting queues with instant digital ticketing and smart table booking.</p>
        </div>

        <div className="flex rounded-2xl bg-slate-900 p-1 border border-slate-800">
          <button
            onClick={() => setActiveTab('waitlist')}
            className={`px-4 py-2 text-xs font-bold rounded-xl transition ${activeTab === 'waitlist' ? 'bg-rose-600 text-white shadow-md' : 'text-slate-400 hover:text-white'}`}
          >
            Digital Waitlist Queue
          </button>
          <button
            onClick={() => setActiveTab('reserve')}
            className={`px-4 py-2 text-xs font-bold rounded-xl transition ${activeTab === 'reserve' ? 'bg-rose-600 text-white shadow-md' : 'text-slate-400 hover:text-white'}`}
          >
            Book Table Reservation
          </button>
        </div>
      </div>

      {activeTab === 'waitlist' ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Join Queue Form */}
          <div className="glass-panel rounded-3xl p-6 border border-slate-800 space-y-4">
            <div className="flex items-center space-x-2 text-rose-400">
              <Ticket className="h-5 w-5" />
              <h3 className="font-extrabold text-sm text-white">Join Walk-in Waitlist</h3>
            </div>

            <form onSubmit={handleJoinWaitlist} className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Guest Full Name</label>
                <input
                  type="text"
                  required
                  value={guestName}
                  onChange={e => setGuestName(e.target.value)}
                  placeholder="e.g. Jordan Smith"
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-rose-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Party Size</label>
                  <select
                    value={partySize}
                    onChange={e => setPartySize(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-rose-500"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8].map(n => (
                      <option key={n} value={n}>{n} Guests</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Phone Number</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    placeholder="+1 555-0192"
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-rose-500"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-rose-600 to-rose-700 text-white font-bold text-xs shadow-lg hover:opacity-95 transition"
              >
                Get Digital Queue Ticket
              </button>
            </form>

            {activeQueueTicket && (
              <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 text-xs space-y-1">
                <div className="flex items-center justify-between font-bold">
                  <span>Your Queue Number:</span>
                  <span className="text-base text-white">{activeQueueTicket.queueNo}</span>
                </div>
                <p className="text-[11px] text-slate-400">Estimated wait time: <strong>{activeQueueTicket.waitTimeEst}</strong>. We will notify your phone via SMS!</p>
              </div>
            )}
          </div>

          {/* Current Live Queue List */}
          <div className="lg:col-span-2 glass-panel rounded-3xl p-6 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-extrabold text-sm text-white">Live Restaurant Waitlist ({waitlist.length})</h3>
              <span className="text-xs text-slate-400">Avg Wait: ~18 mins</span>
            </div>

            <div className="space-y-2.5">
              {waitlist.length === 0 ? (
                <p className="text-xs text-slate-500 text-center py-6">No walk-in parties currently waiting. Tables are immediately available!</p>
              ) : (
                waitlist.map(party => (
                  <div key={party.id} className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="h-9 w-9 rounded-xl bg-rose-500/10 text-rose-400 font-extrabold text-xs flex items-center justify-center border border-rose-500/20">
                        {party.queueNo}
                      </div>
                      <div>
                        <h4 className="font-bold text-xs text-white">{party.name}</h4>
                        <p className="text-[11px] text-slate-400">{party.partySize} Guests • {party.phone}</p>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-300 font-bold text-[10px] border border-amber-500/20">
                        {party.waitTimeEst}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

        </div>
      ) : (
        /* Reservation Form */
        <div className="max-w-xl mx-auto glass-panel rounded-3xl p-6 sm:p-8 border border-slate-800 space-y-4">
          <div className="text-center">
            <Calendar className="h-8 w-8 text-rose-400 mx-auto mb-2" />
            <h3 className="font-extrabold text-lg text-white">Reserve a Dining Table</h3>
            <p className="text-xs text-slate-400 mt-0.5">Select preferred date, time, and table preferences.</p>
          </div>

          {!resConfirmed ? (
            <form onSubmit={handleCreateReservation} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={resName}
                  onChange={e => setResName(e.target.value)}
                  placeholder="e.g. Samantha Vance"
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-rose-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Date</label>
                  <input
                    type="date"
                    required
                    value={resDate}
                    onChange={e => setResDate(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-rose-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Time Slot</label>
                  <input
                    type="time"
                    required
                    value={resTime}
                    onChange={e => setResTime(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-rose-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Number of Guests</label>
                  <input
                    type="number"
                    min={1}
                    max={12}
                    value={resParty}
                    onChange={e => setResParty(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-rose-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Phone Number</label>
                  <input
                    type="tel"
                    required
                    value={resPhone}
                    onChange={e => setResPhone(e.target.value)}
                    placeholder="+1 555-0144"
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-rose-500"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-rose-600 to-rose-700 text-white font-bold text-xs shadow-xl hover:opacity-95 transition"
              >
                Confirm Table Reservation
              </button>
            </form>
          ) : (
            <div className="p-6 rounded-2xl bg-emerald-950/50 border border-emerald-500/40 text-center space-y-3">
              <CheckCircle2 className="h-10 w-10 text-emerald-400 mx-auto" />
              <h4 className="text-base font-extrabold text-white">Reservation Confirmed!</h4>
              <p className="text-xs text-slate-300">
                We reserved a table for <strong>{resParty} guests</strong> on <strong>{resDate} at {resTime}</strong> under {resName}.
              </p>
              <button
                onClick={() => setResConfirmed(false)}
                className="px-4 py-2 rounded-xl bg-slate-900 text-xs font-semibold text-slate-300 border border-slate-800 hover:text-white"
              >
                Make Another Reservation
              </button>
            </div>
          )}
        </div>
      )}

    </div>
  );
};
