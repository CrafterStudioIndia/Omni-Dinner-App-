import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { HologramDemoBadge } from './HologramDemoBadge';
import { Utensils, ConciergeBell, ChefHat, LayoutDashboard, Sparkles, ArrowRight, ShieldCheck, Cpu, Building2, Image } from 'lucide-react';

export const InitialLoginScreen = ({ onLoginSuccess }) => {
  const { setCurrentUser, restaurantInfo, updateRestaurantInfo } = useApp();

  const [restaurantName, setRestaurantName] = useState(restaurantInfo.name || 'Royal Taj Fine Dining');
  const [logoSymbol, setLogoSymbol] = useState(restaurantInfo.logo || '👑');
  const [currencySymbol, setCurrencySymbol] = useState(restaurantInfo.currency || '₹');
  const [email, setEmail] = useState('guest@omnidine.ai');
  const [selectedRole, setSelectedRole] = useState('customer');

  const rolePresets = [
    { id: 'customer', title: 'Customer Dining', desc: 'Scan QR menu, place dish orders & call waiter', icon: Utensils, color: 'from-blue-600 to-indigo-600' },
    { id: 'waiter', title: 'Waitstaff Floor', desc: 'Acknowledge customer orders & manage table service', icon: ConciergeBell, color: 'from-amber-600 to-orange-600' },
    { id: 'kitchen', title: 'Kitchen Chef KDS', desc: 'Real-time kitchen line tickets & prep timers', icon: ChefHat, color: 'from-rose-600 to-red-600' },
    { id: 'admin', title: 'Manager Dashboard', desc: 'Live sales analytics, inventory & worker error logs', icon: LayoutDashboard, color: 'from-purple-600 to-indigo-600' },
  ];

  const handleStartDemo = (e) => {
    e.preventDefault();
    
    // Save Restaurant Name & Logo
    updateRestaurantInfo({
      name: restaurantName,
      logo: logoSymbol,
      currency: currencySymbol,
      tagline: 'Authentic Gourmet Dining'
    });

    setCurrentUser({
      name: selectedRole === 'customer' ? 'Guest Customer' : selectedRole === 'waiter' ? 'Ramesh Sharma' : selectedRole === 'kitchen' ? 'Chef Vikram' : 'Manager Admin',
      email,
      role: selectedRole,
      isAuthenticated: true
    });
    onLoginSuccess();
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#050811] text-slate-100 flex flex-col justify-between overflow-y-auto animate-fadeIn">
      
      {/* Holographic Top Banner */}
      <HologramDemoBadge />

      <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12 my-auto w-full space-y-8">
        
        {/* Holographic Brand Hero Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center space-x-3 px-4 py-1.5 rounded-full bg-cyan-950/40 border border-cyan-500/40 text-cyan-300 text-xs font-mono font-extrabold shadow-[0_0_20px_rgba(6,182,212,0.3)]">
            <Cpu className="h-4 w-4 text-cyan-400 animate-pulse" />
            <span>HOLOGRAPHIC SMART RESTAURANT OS • INITIAL ONBOARDING</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white flex items-center justify-center space-x-3">
            {logoSymbol.startsWith('data:') || logoSymbol.startsWith('http') || logoSymbol.startsWith('/') ? (
              <img src={logoSymbol} alt="Logo" className="h-12 w-12 rounded-xl object-cover border border-slate-700 shadow-md inline-block" />
            ) : (
              <span>{logoSymbol}</span>
            )}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-amber-300 to-cyan-400">{restaurantName}</span>
          </h1>

          <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto">
            Configure your restaurant brand details & select your role to enter your custom SaaS dining platform.
          </p>
        </div>

        {/* Role Selection Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {rolePresets.map(preset => {
            const Icon = preset.icon;
            const isSelected = selectedRole === preset.id;
            return (
              <div
                key={preset.id}
                onClick={() => setSelectedRole(preset.id)}
                className={`p-5 rounded-3xl cursor-pointer transition-all duration-300 border space-y-3 relative overflow-hidden ${isSelected ? 'bg-slate-900/90 border-cyan-400 shadow-[0_0_30px_rgba(6,182,212,0.25)] ring-2 ring-cyan-500/40' : 'glass-card border-slate-800 hover:border-slate-700'}`}
              >
                {isSelected && (
                  <div className="absolute top-0 right-0 px-3 py-1 bg-cyan-500 text-black font-extrabold text-[9px] uppercase rounded-bl-2xl shadow-md">
                    Selected
                  </div>
                )}

                <div className="flex items-center space-x-3">
                  <div className={`p-3 rounded-2xl bg-gradient-to-tr ${preset.color} text-white shadow-lg`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-sm text-white">{preset.title}</h3>
                    <span className="text-[10px] text-slate-400 font-mono">Role: {preset.id}</span>
                  </div>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">{preset.desc}</p>
              </div>
            );
          })}
        </div>

        {/* Restaurant Setup & Onboarding Form */}
        <form onSubmit={handleStartDemo} className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4 max-w-xl mx-auto bg-slate-900/90">
          <div className="flex items-center space-x-2 text-amber-400 font-bold text-xs border-b border-slate-800 pb-2">
            <Building2 className="h-4 w-4 text-amber-400" />
            <span>Configure Restaurant Identity</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div>
              <label className="block text-slate-300 font-bold mb-1">Your Restaurant Name</label>
              <input
                type="text"
                value={restaurantName}
                onChange={e => setRestaurantName(e.target.value)}
                placeholder="e.g. Royal Taj Fine Dining"
                className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white font-bold focus:outline-none focus:border-cyan-500"
                required
              />
            </div>

            <div>
              <label className="block text-slate-300 font-bold mb-1">Upload Logo Image File / Emoji</label>
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={logoSymbol}
                  onChange={e => setLogoSymbol(e.target.value)}
                  placeholder="Emoji (👑) or Image URL"
                  className="flex-1 p-2 rounded-xl bg-slate-950 border border-slate-800 text-white font-bold text-xs focus:outline-none focus:border-cyan-500"
                  required
                />
                <label className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 cursor-pointer text-xs font-bold transition flex items-center space-x-1 whitespace-nowrap">
                  <span>📁 Upload</span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={e => {
                      const file = e.target.files[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onloadend = () => setLogoSymbol(reader.result);
                        reader.readAsDataURL(file);
                      }
                    }}
                  />
                </label>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div>
              <label className="block text-slate-300 font-bold mb-1">Currency Symbol</label>
              <select
                value={currencySymbol}
                onChange={e => setCurrencySymbol(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white font-bold focus:outline-none focus:border-cyan-500"
              >
                <option value="₹">₹ (INR - Rupee)</option>
                <option value="$">$ (USD - Dollar)</option>
                <option value="€">€ (EUR - Euro)</option>
                <option value="£">£ (GBP - Pound)</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-300 font-bold mb-1">User Email / Login ID</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white font-bold focus:outline-none focus:border-cyan-500"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-rose-600 via-amber-500 to-cyan-500 text-white font-extrabold text-xs shadow-xl hover:opacity-95 transition flex items-center justify-center space-x-2 pt-3"
          >
            <span>LAUNCH LIVE SYSTEM WORKSPACE</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </form>

      </div>

      {/* Footer */}
      <div className="py-4 text-center text-xs text-slate-500 border-t border-slate-900">
        <span>OmniDine AI • Production SaaS Restaurant Operating System</span>
      </div>

    </div>
  );
};
