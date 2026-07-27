import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { MessageSquare, Send, User, ConciergeBell, X, Sparkles, CheckCheck } from 'lucide-react';

export const TableChatModal = ({ isOpen, onClose }) => {
  const { activeTableNumber, tables } = useApp();
  
  const currentTable = tables.find(t => t.id === Number(activeTableNumber));
  const assignedServer = currentTable?.server || 'Priya Patel';

  const [messages, setMessages] = useState([
    { id: 1, sender: 'waiter', name: assignedServer, text: `Hello! I am ${assignedServer}, your server for Table #${activeTableNumber}. How may I assist your dining experience?`, time: 'Just now' }
  ]);
  const [inputMsg, setInputMsg] = useState('');

  if (!isOpen) return null;

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputMsg.trim()) return;

    const userMsg = { id: Date.now(), sender: 'customer', name: `Table #${activeTableNumber}`, text: inputMsg, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
    setMessages(prev => [...prev, userMsg]);
    setInputMsg('');

    // Simulated Waiter Instant Reply
    setTimeout(() => {
      const waiterReply = { id: Date.now() + 1, sender: 'waiter', name: assignedServer, text: `Got it! I am bringing that right away to Table #${activeTableNumber}.`, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
      setMessages(prev => [...prev, waiterReply]);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-lg glass-panel rounded-3xl p-6 border border-slate-800 shadow-2xl space-y-4 bg-[#090d18]/95 max-h-[85vh] flex flex-col justify-between">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-400">
              <MessageSquare className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-base text-white">Live Table Chat</h3>
              <p className="text-xs text-slate-400">Direct message server <span className="text-rose-300 font-bold">{assignedServer}</span></p>
            </div>
          </div>

          <button onClick={onClose} className="p-2 rounded-full bg-slate-900 text-slate-400 hover:text-white">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Chat Messages Stream */}
        <div className="flex-1 overflow-y-auto space-y-3 p-2 text-xs">
          {messages.map(m => (
            <div key={m.id} className={`flex ${m.sender === 'customer' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] p-3 rounded-2xl space-y-1 ${m.sender === 'customer' ? 'bg-rose-600 text-white rounded-br-none' : 'bg-slate-900 border border-slate-800 text-slate-200 rounded-bl-none'}`}>
                <div className="flex items-center justify-between space-x-2 text-[10px] font-bold text-slate-300 opacity-80">
                  <span>{m.name}</span>
                  <span>{m.time}</span>
                </div>
                <p className="leading-relaxed font-medium">{m.text}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Input Bar */}
        <form onSubmit={handleSendMessage} className="flex items-center space-x-2 pt-2 border-t border-slate-800">
          <input
            type="text"
            placeholder="Type message to server..."
            value={inputMsg}
            onChange={e => setInputMsg(e.target.value)}
            className="flex-1 p-3 rounded-2xl bg-slate-950 border border-slate-800 text-white font-medium text-xs focus:outline-none focus:border-rose-500"
          />
          <button
            type="submit"
            className="p-3 rounded-2xl bg-rose-600 hover:bg-rose-500 text-white transition flex-shrink-0 shadow-lg shadow-rose-950/50"
          >
            <Send className="h-4 w-4" />
          </button>
        </form>

      </div>
    </div>
  );
};
