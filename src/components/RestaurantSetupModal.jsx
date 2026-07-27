import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Building2, Image, DollarSign, Trash2, CheckCircle2, Sparkles, X } from 'lucide-react';

export const RestaurantSetupModal = ({ isOpen, onClose }) => {
  const { restaurantInfo, updateRestaurantInfo, resetToZeroState } = useApp();

  const [name, setName] = useState(restaurantInfo.name);
  const [logo, setLogo] = useState(restaurantInfo.logo);
  const [tagline, setTagline] = useState(restaurantInfo.tagline);
  const [currency, setCurrency] = useState(restaurantInfo.currency || '$');
  const [isSavedAlert, setIsSavedAlert] = useState(false);

  if (!isOpen) return null;

  const handleSaveSetup = (e) => {
    e.preventDefault();
    updateRestaurantInfo({ name, logo, tagline, currency });
    setIsSavedAlert(true);
    setTimeout(() => {
      setIsSavedAlert(false);
      onClose();
    }, 1000);
  };

  const handleStartFromZero = () => {
    if (window.confirm('Are you sure you want to clear all orders & start completely fresh from zero?')) {
      resetToZeroState();
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-lg glass-panel rounded-3xl p-6 border border-amber-500/40 shadow-2xl space-y-5 bg-[#090d18]/95">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400">
              <Building2 className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-extrabold text-lg text-white">Restaurant Setup & Branding</h3>
              <p className="text-xs text-slate-400">Customize your restaurant name, logo & start fresh</p>
            </div>
          </div>

          <button onClick={onClose} className="p-2 rounded-full bg-slate-900 text-slate-400 hover:text-white">
            <X className="h-5 w-5" />
          </button>
        </div>

        {isSavedAlert && (
          <div className="p-3 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs font-bold flex items-center space-x-2 animate-fadeIn">
            <CheckCircle2 className="h-4 w-4 text-emerald-400" />
            <span>Restaurant branding updated successfully!</span>
          </div>
        )}

        <form onSubmit={handleSaveSetup} className="space-y-4 text-xs">
          
          <div>
            <label className="block text-slate-300 font-bold mb-1">Restaurant Name</label>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="e.g. Royal Taj Fine Dining"
              className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-white font-bold text-sm focus:outline-none focus:border-amber-500"
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-300 font-bold mb-1">Upload Logo Image File / Emoji</label>
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={logo}
                  onChange={e => setLogo(e.target.value)}
                  placeholder="Emoji (👑) or Image URL"
                  className="flex-1 p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white font-bold text-xs focus:outline-none focus:border-amber-500"
                  required
                />
                <label className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 cursor-pointer text-xs font-bold transition flex items-center space-x-1">
                  <span>📁 Upload</span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={e => {
                      const file = e.target.files[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onloadend = () => setLogo(reader.result);
                        reader.readAsDataURL(file);
                      }
                    }}
                  />
                </label>
              </div>
            </div>

            <div>
              <label className="block text-slate-300 font-bold mb-1">Currency Symbol</label>
              <select
                value={currency}
                onChange={e => setCurrency(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white font-bold text-sm focus:outline-none focus:border-amber-500"
              >
                <option value="₹">₹ (INR - Rupee)</option>
                <option value="$">$ (USD - Dollar)</option>
                <option value="€">€ (EUR - Euro)</option>
                <option value="£">£ (GBP - Pound)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-slate-300 font-bold mb-1">Tagline</label>
            <input
              type="text"
              value={tagline}
              onChange={e => setTagline(e.target.value)}
              placeholder="e.g. Authentic Pure Veg Cuisine"
              className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-amber-500"
            />
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-slate-800">
            <button
              type="button"
              onClick={handleStartFromZero}
              className="w-full sm:w-auto px-3.5 py-2 rounded-xl bg-rose-950/60 hover:bg-rose-900/80 border border-rose-500/40 text-rose-300 text-xs font-bold transition flex items-center justify-center space-x-1.5"
            >
              <Trash2 className="h-4 w-4 text-rose-400" />
              <span>Start Fresh (Zero State)</span>
            </button>

            <button
              type="submit"
              className="w-full sm:w-auto px-5 py-2 rounded-xl bg-gradient-to-r from-amber-600 to-amber-500 text-white font-extrabold text-xs shadow-lg hover:opacity-95 transition"
            >
              Save Branding Setup
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
