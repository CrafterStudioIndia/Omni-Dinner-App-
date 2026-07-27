import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { QrCode, CheckCircle2, DollarSign, Smartphone, CreditCard, ShieldCheck, X } from 'lucide-react';

export const InstantUPIPayModal = ({ isOpen, onClose, orderTotal }) => {
  const { restaurantInfo, activeTableNumber } = useApp();
  const [payMethod, setPayMethod] = useState('upi'); // 'upi' | 'gpay' | 'phonepe' | 'card'
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const currencySymbol = restaurantInfo.currency || '₹';
  const totalAmount = orderTotal || 56.99;

  const handleConfirmPay = () => {
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      onClose();
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-md glass-panel rounded-3xl p-6 border border-emerald-500/40 shadow-2xl space-y-4 bg-[#090d18]/95">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center space-x-2">
            <div className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
              <QrCode className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-base text-white">Instant UPI & Table Pay</h3>
              <p className="text-xs text-slate-400">Table #{activeTableNumber} • {restaurantInfo.name}</p>
            </div>
          </div>

          <button onClick={onClose} className="p-1.5 rounded-full bg-slate-900 text-slate-400 hover:text-white">
            <X className="h-4 w-4" />
          </button>
        </div>

        {isSuccess ? (
          <div className="p-8 text-center space-y-3 animate-fadeIn">
            <div className="h-16 w-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/40">
              <CheckCircle2 className="h-8 w-8 animate-bounce" />
            </div>
            <h4 className="font-extrabold text-lg text-white">Payment Received!</h4>
            <p className="text-xs text-slate-300">Transaction ID #TXN-{Math.floor(100000 + Math.random() * 900000)} verified.</p>
            <span className="text-emerald-400 text-xs font-bold block">Thank you for dining with us!</span>
          </div>
        ) : (
          <div className="space-y-4">
            
            {/* Amount Box */}
            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 text-center space-y-1">
              <span className="text-xs text-slate-400 uppercase font-bold">Total Bill Payable</span>
              <div className="text-3xl font-extrabold text-emerald-300">{currencySymbol}{totalAmount.toFixed(2)}</div>
            </div>

            {/* Payment Method Selector */}
            <div className="grid grid-cols-3 gap-2 text-xs font-bold">
              <button
                type="button"
                onClick={() => setPayMethod('upi')}
                className={`p-3 rounded-2xl border transition text-center ${payMethod === 'upi' ? 'bg-emerald-950/60 border-emerald-500 text-emerald-300' : 'bg-slate-900 border-slate-800 text-slate-400'}`}
              >
                📱 UPI QR
              </button>
              <button
                type="button"
                onClick={() => setPayMethod('gpay')}
                className={`p-3 rounded-2xl border transition text-center ${payMethod === 'gpay' ? 'bg-emerald-950/60 border-emerald-500 text-emerald-300' : 'bg-slate-900 border-slate-800 text-slate-400'}`}
              >
                🟢 GPay / PhonePe
              </button>
              <button
                type="button"
                onClick={() => setPayMethod('card')}
                className={`p-3 rounded-2xl border transition text-center ${payMethod === 'card' ? 'bg-emerald-950/60 border-emerald-500 text-emerald-300' : 'bg-slate-900 border-slate-800 text-slate-400'}`}
              >
                💳 Card / POS
              </button>
            </div>

            {/* Dynamic QR Code Simulation */}
            {payMethod === 'upi' && (
              <div className="p-4 rounded-2xl bg-white flex flex-col items-center justify-center space-y-2 border border-slate-700">
                <img
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=upi://pay?pa=restaurant@upi&pn=${encodeURIComponent(restaurantInfo.name)}&am=${totalAmount}&cu=INR`}
                  alt="UPI QR Code"
                  className="h-36 w-36 object-contain"
                />
                <span className="text-[10px] text-slate-700 font-bold">Scan with any UPI App (GPay, PhonePe, Paytm)</span>
              </div>
            )}

            <button
              onClick={handleConfirmPay}
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-emerald-500 text-white font-extrabold text-xs shadow-xl shadow-emerald-950/50 hover:opacity-95 transition flex items-center justify-center space-x-2"
            >
              <ShieldCheck className="h-4 w-4" />
              <span>Confirm & Pay {currencySymbol}{totalAmount.toFixed(2)}</span>
            </button>

          </div>
        )}

      </div>
    </div>
  );
};
