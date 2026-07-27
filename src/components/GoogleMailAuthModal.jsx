import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Mail, CheckCircle2, ShieldCheck, ArrowRight, X, Lock } from 'lucide-react';

export const GoogleMailAuthModal = ({ isOpen, onClose }) => {
  const { setCurrentUser } = useApp();

  const [step, setStep] = useState('choose'); // 'choose' | 'otp' | 'success'
  const [gmail, setGmail] = useState('user@gmail.com');
  const [otpCode, setOtpCode] = useState('');
  const [generatedOtp, setGeneratedOtp] = useState('482910');

  if (!isOpen) return null;

  const handleSendOtp = (e) => {
    e.preventDefault();
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(code);
    setStep('otp');
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    setStep('success');
    setTimeout(() => {
      setCurrentUser(prev => ({
        ...prev,
        name: gmail.split('@')[0].toUpperCase(),
        email: gmail,
        isAuthenticated: true
      }));
      setStep('choose');
      onClose();
    }, 1500);
  };

  const handleGuestSkip = () => {
    setCurrentUser(prev => ({
      ...prev,
      name: 'Guest Diner',
      email: 'guest@omnidine.ai',
      isAuthenticated: true
    }));
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-md glass-panel rounded-3xl p-6 border border-slate-700 shadow-2xl space-y-4 bg-[#090d18]/95">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center space-x-2">
            <div className="h-7 w-7 rounded-full bg-white flex items-center justify-center font-extrabold text-slate-900 text-xs shadow-md">
              G
            </div>
            <div>
              <h3 className="font-extrabold text-base text-white">Google Account Verification</h3>
              <p className="text-[10px] text-slate-400">Secure 1-Click Identity Authentication</p>
            </div>
          </div>

          <button onClick={onClose} className="p-1 rounded-full bg-slate-900 text-slate-400 hover:text-white">
            <X className="h-4 w-4" />
          </button>
        </div>

        {step === 'choose' && (
          <form onSubmit={handleSendOtp} className="space-y-4 text-xs">
            <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3">
              <label className="block text-slate-300 font-bold">Google Email Address</label>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-slate-400" />
                <input
                  type="email"
                  value={gmail}
                  onChange={e => setGmail(e.target.value)}
                  placeholder="name@gmail.com"
                  className="flex-1 p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white font-bold focus:outline-none focus:border-rose-500"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-extrabold shadow-lg hover:opacity-95 transition flex items-center justify-center space-x-2"
            >
              <span>SEND 6-DIGIT VERIFICATION CODE</span>
              <ArrowRight className="h-4 w-4" />
            </button>

            <button
              type="button"
              onClick={handleGuestSkip}
              className="w-full py-2.5 rounded-2xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white font-bold transition text-[11px]"
            >
              (Optional) Skip & Continue as Guest
            </button>
          </form>
        )}

        {step === 'otp' && (
          <form onSubmit={handleVerifyOtp} className="space-y-4 text-xs animate-fadeIn">
            <div className="p-4 rounded-2xl bg-cyan-950/30 border border-cyan-500/30 text-center space-y-2">
              <span className="text-cyan-300 font-bold block">Verification Code Sent!</span>
              <p className="text-[11px] text-slate-400">We emailed a code to <span className="text-white font-bold">{gmail}</span></p>
              <div className="p-2 rounded-xl bg-slate-950 text-cyan-400 font-mono font-extrabold text-sm border border-cyan-500/40">
                Demo Code: {generatedOtp}
              </div>
            </div>

            <div>
              <label className="block text-slate-300 font-bold mb-1">Enter 6-Digit OTP</label>
              <input
                type="text"
                maxLength={6}
                value={otpCode}
                onChange={e => setOtpCode(e.target.value)}
                placeholder="123456"
                className="w-full p-3 rounded-2xl bg-slate-950 border border-slate-800 text-white font-extrabold text-center text-lg tracking-widest focus:outline-none focus:border-cyan-500"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-extrabold shadow-xl hover:opacity-95 transition flex items-center justify-center space-x-2"
            >
              <ShieldCheck className="h-4 w-4" />
              <span>VERIFY & SIGN IN</span>
            </button>
          </form>
        )}

        {step === 'success' && (
          <div className="p-6 text-center space-y-3 animate-fadeIn">
            <div className="h-14 w-14 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/40">
              <CheckCircle2 className="h-8 w-8 animate-bounce" />
            </div>
            <h4 className="font-extrabold text-base text-white">Google Email Verified!</h4>
            <p className="text-xs text-slate-400">Authenticated as <span className="text-emerald-300 font-bold">{gmail}</span></p>
          </div>
        )}

      </div>
    </div>
  );
};
