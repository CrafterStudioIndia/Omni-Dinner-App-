import React, { useState } from 'react';
import { useAI } from '../../context/AIContext';
import { useApp } from '../../context/AppContext';
import { Sparkles, Send, Key, Bot, User, Brain, AlertTriangle, TrendingUp, RefreshCw } from 'lucide-react';

export const AIDineSensePanel = () => {
  const { isAIModalOpen, setIsAIModalOpen } = useApp();
  const { apiKey, setApiKey, isAnalyzing, aiChatHistory, askAI, generateDemandForecast } = useAI();

  const [inputQuery, setInputQuery] = useState('');
  const [showApiKeyInput, setShowApiKeyInput] = useState(false);

  if (!isAIModalOpen) return null;

  const forecast = generateDemandForecast();

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputQuery.trim()) return;
    askAI(inputQuery);
    setInputQuery('');
  };

  const samplePrompts = [
    "What dishes pair best with Truffle Mushroom Risotto?",
    "Generate AI inventory waste prediction for tonight",
    "How can we increase average table order check size?",
    "Suggest allergen-free options for Table #3"
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-2xl glass-panel rounded-3xl p-6 shadow-2xl border border-purple-500/40 max-h-[90vh] flex flex-col justify-between overflow-hidden bg-[#0e0a1a]">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-purple-500/20">
          <div className="flex items-center space-x-2">
            <div className="h-9 w-9 rounded-xl bg-purple-500/20 text-purple-300 flex items-center justify-center border border-purple-500/30">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-base text-white">DineSense AI Copilot</h3>
              <p className="text-[11px] text-purple-300">Platinum Level Intelligent Restaurant Assistant • Gemini API</p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setShowApiKeyInput(!showApiKeyInput)}
              className="px-2.5 py-1 rounded-lg bg-purple-950/60 border border-purple-500/30 text-purple-200 text-[10px] font-bold flex items-center space-x-1"
            >
              <Key className="h-3 w-3" />
              <span>{apiKey ? 'API Key Active' : 'Set Gemini Key'}</span>
            </button>
            <button
              onClick={() => setIsAIModalOpen(false)}
              className="p-1.5 rounded-full bg-slate-900 text-slate-400 hover:text-white"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Optional Gemini API Key Drawer */}
        {showApiKeyInput && (
          <div className="p-3 rounded-2xl bg-purple-950/60 border border-purple-500/30 my-2 text-xs space-y-2">
            <label className="block text-[11px] text-purple-200 font-semibold">Enter Optional Gemini API Key (Fallback heuristics active if empty)</label>
            <input
              type="password"
              value={apiKey}
              onChange={e => setApiKey(e.target.value)}
              placeholder="AIzaSy..."
              className="w-full px-3 py-1.5 bg-slate-900 border border-purple-500/40 rounded-xl text-xs text-white focus:outline-none"
            />
          </div>
        )}

        {/* AI Quick Prompts Carousel */}
        <div className="mt-3 flex items-center space-x-2 overflow-x-auto pb-1 no-scrollbar">
          {samplePrompts.map((p, idx) => (
            <button
              key={idx}
              onClick={() => askAI(p)}
              className="px-3 py-1.5 rounded-xl bg-purple-950/40 hover:bg-purple-900/60 text-purple-200 text-[11px] font-medium border border-purple-500/20 whitespace-nowrap transition"
            >
              ✨ {p}
            </button>
          ))}
        </div>

        {/* Chat History Box */}
        <div className="mt-3 flex-1 overflow-y-auto space-y-3 p-3 rounded-2xl bg-slate-950/80 border border-purple-950 max-h-[50vh]">
          {aiChatHistory.map((msg, idx) => (
            <div
              key={idx}
              className={`flex items-start space-x-2 text-xs ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.sender === 'ai' && (
                <div className="h-7 w-7 rounded-lg bg-purple-600/30 text-purple-300 flex items-center justify-center border border-purple-500/30 flex-shrink-0">
                  <Bot className="h-4 w-4" />
                </div>
              )}
              <div
                className={`p-3 rounded-2xl max-w-[80%] leading-relaxed ${msg.sender === 'user' ? 'bg-rose-600 text-white rounded-tr-none' : 'bg-purple-950/60 border border-purple-500/30 text-purple-100 rounded-tl-none'}`}
              >
                <div className="text-[10px] opacity-60 mb-0.5">{msg.timestamp}</div>
                <div className="whitespace-pre-line">{msg.text}</div>
              </div>
            </div>
          ))}

          {isAnalyzing && (
            <div className="flex items-center space-x-2 text-xs text-purple-300 p-2">
              <Sparkles className="h-4 w-4 text-purple-400 animate-spin" />
              <span>DineSense AI is thinking...</span>
            </div>
          )}
        </div>

        {/* Input Form */}
        <form onSubmit={handleSend} className="mt-4 flex items-center space-x-2">
          <input
            type="text"
            value={inputQuery}
            onChange={e => setInputQuery(e.target.value)}
            placeholder="Ask DineSense AI anything about menu, prep, stock..."
            className="flex-1 px-4 py-2.5 bg-slate-900 border border-purple-500/30 rounded-2xl text-xs text-white focus:outline-none focus:border-purple-400"
          />
          <button
            type="submit"
            disabled={isAnalyzing}
            className="p-2.5 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:opacity-90 transition shadow-lg shadow-purple-950/50"
          >
            <Send className="h-4 w-4" />
          </button>
        </form>

      </div>
    </div>
  );
};
