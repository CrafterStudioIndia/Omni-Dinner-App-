import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, Lock, Mail, Key, ShieldCheck, LogIn, Sparkles, CheckCircle2 } from 'lucide-react';

export const AuthModal = () => {
  const { isAuthModalOpen, setIsAuthModalOpen, currentUser, setCurrentUser, addNotification } = useApp();

  const [activeTab, setActiveTab] = useState('email'); // 'email' | 'google'
  const [email, setEmail] = useState(currentUser.email || '');
  const [password, setPassword] = useState('');
  const [otpStep, setOtpStep] = useState(false);
  const [otpCode, setOtpCode] = useState('');
  const [selectedRole, setSelectedRole] = useState(currentUser.role || 'customer');

  if (!isAuthModalOpen) return null;

  const handleSendOTP = (e) => {
    e.preventDefault();
    if (!email) return;
    setOtpStep(true);
    addNotification('OTP Sent', `Verification code sent to ${email} (Use code: 4242)`, 'info');
  };

  const handleVerifyOTP = (e) => {
    e.preventDefault();
    setCurrentUser({
      name: email.split('@')[0].toUpperCase(),
      email,
      role: selectedRole,
      isAuthenticated: true
    });
    setOtpStep(false);
    setIsAuthModalOpen(false);
    addNotification('Authenticated', `Logged in successfully as ${selectedRole.toUpperCase()}`, 'success');
  };

  const handleGoogleOAuth = () => {
    setCurrentUser({
      name: 'Alex Rivera (Google SSO)',
      email: 'alex.rivera@gmail.com',
      role: selectedRole,
      isAuthenticated: true
    });
    setIsAuthModalOpen(false);
    addNotification('Google OAuth Verified', 'Signed in via Google OAuth 2.0', 'success');
  };

  const quickSwitch = (role, name, mail) => {
    setCurrentUser({ name, email: mail, role, isAuthenticated: true });
    setIsAuthModalOpen(false);
    addNotification('Role Switched', `Logged in as ${name} (${role.toUpperCase()})`, 'success');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-md glass-panel rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-700/60 overflow-hidden">
        
        {/* Close Button */}
        <button
          onClick={() => setIsAuthModalOpen(false)}
          className="absolute top-4 right-4 p-2 rounded-full bg-slate-900/80 hover:bg-slate-800 text-slate-400 hover:text-white transition"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Header Title */}
        <div className="text-center">
          <div className="inline-flex p-3 rounded-2xl bg-rose-500/10 border border-rose-500/20 mb-3">
            <ShieldCheck className="h-7 w-7 text-rose-400" />
          </div>
          <h2 className="text-xl font-extrabold text-white">OmniDine Auth Portal</h2>
          <p className="text-xs text-slate-400 mt-1">Silver Level Security • Role-Based Access Control</p>
        </div>

        {/* Role Selector Cards */}
        <div className="mt-5">
          <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-2">Select Target Access Role</label>
          <div className="grid grid-cols-2 gap-2">
            {[
              { id: 'customer', title: 'Customer', desc: 'Menu & Table Orders' },
              { id: 'waiter', title: 'Waitstaff', desc: 'Floor & Service Calls' },
              { id: 'kitchen', title: 'Kitchen Chef', desc: 'KDS Prep Display' },
              { id: 'admin', title: 'Restaurant Admin', desc: 'Analytics & Stock' }
            ].map(r => (
              <button
                key={r.id}
                type="button"
                onClick={() => setSelectedRole(r.id)}
                className={`p-2.5 rounded-xl text-left border transition ${selectedRole === r.id ? 'bg-rose-950/60 border-rose-500 text-white' : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700'}`}
              >
                <div className="flex items-center justify-between text-xs font-bold">
                  <span>{r.title}</span>
                  {selectedRole === r.id && <CheckCircle2 className="h-3.5 w-3.5 text-rose-400" />}
                </div>
                <div className="text-[10px] text-slate-500 mt-0.5">{r.desc}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Auth Method Tabs */}
        <div className="mt-5 flex rounded-xl bg-slate-900 p-1 border border-slate-800">
          <button
            onClick={() => { setActiveTab('email'); setOtpStep(false); }}
            className={`flex-1 py-2 text-xs font-semibold rounded-lg transition ${activeTab === 'email' ? 'bg-rose-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'}`}
          >
            Email + OTP
          </button>
          <button
            onClick={() => setActiveTab('google')}
            className={`flex-1 py-2 text-xs font-semibold rounded-lg transition ${activeTab === 'google' ? 'bg-rose-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'}`}
          >
            Google OAuth
          </button>
        </div>

        {/* Email + OTP Form */}
        {activeTab === 'email' && (
          <form onSubmit={otpStep ? handleVerifyOTP : handleSendOTP} className="mt-4 space-y-3">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="manager@restaurant.com"
                  className="w-full pl-9 pr-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-rose-500"
                />
              </div>
            </div>

            {!otpStep ? (
              <>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
                    <input
                      type="password"
                      required
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      placeholder="••••••••••••"
                      className="w-full pl-9 pr-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-rose-500"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-gradient-to-r from-rose-600 to-rose-700 text-white text-xs font-bold hover:opacity-90 transition shadow-lg shadow-rose-900/30 flex items-center justify-center space-x-2"
                >
                  <Key className="h-3.5 w-3.5" />
                  <span>Send OTP Verification Code</span>
                </button>
              </>
            ) : (
              <>
                <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs">
                  🔒 Enter 4-digit code sent to your email (Demo PIN: <strong>4242</strong>)
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Enter OTP Code</label>
                  <input
                    type="text"
                    required
                    maxLength={4}
                    value={otpCode}
                    onChange={e => setOtpCode(e.target.value)}
                    placeholder="4242"
                    className="w-full text-center tracking-widest text-lg font-bold py-2 bg-slate-900 border border-slate-800 rounded-xl text-rose-400 focus:outline-none focus:border-rose-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-500 transition shadow-lg flex items-center justify-center space-x-2"
                >
                  <LogIn className="h-3.5 w-3.5" />
                  <span>Verify & Sign In</span>
                </button>
              </>
            )}
          </form>
        )}

        {/* Google OAuth Simulation */}
        {activeTab === 'google' && (
          <div className="mt-4 space-y-4 text-center">
            <p className="text-xs text-slate-400">Authenticate securely using Google Workspace identity provider.</p>
            <button
              onClick={handleGoogleOAuth}
              className="w-full py-3 rounded-xl bg-white text-slate-900 font-bold text-xs hover:bg-slate-100 transition flex items-center justify-center space-x-3 shadow-md"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
              </svg>
              <span>Continue with Google Account</span>
            </button>
          </div>
        )}

        {/* Quick Presets for Demo */}
        <div className="mt-6 pt-4 border-t border-slate-800">
          <div className="flex items-center space-x-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
            <Sparkles className="h-3 w-3 text-amber-400" />
            <span>1-Click Hackathon Presets</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            <button
              onClick={() => quickSwitch('customer', 'Customer Guest', 'guest@omnidine.ai')}
              className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-[11px] font-medium text-slate-300 border border-slate-800"
            >
              👤 Guest Customer
            </button>
            <button
              onClick={() => quickSwitch('kitchen', 'Chef Gordon (Head Chef)', 'kitchen@omnidine.ai')}
              className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-[11px] font-medium text-amber-300 border border-slate-800"
            >
              👨‍🍳 Head Chef
            </button>
            <button
              onClick={() => quickSwitch('admin', 'Elena Rostova (General Manager)', 'manager@omnidine.ai')}
              className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-[11px] font-medium text-rose-300 border border-slate-800"
            >
              💼 Manager Admin
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
