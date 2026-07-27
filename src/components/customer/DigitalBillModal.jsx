import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { InstantUPIPayModal } from './InstantUPIPayModal';
import confetti from 'canvas-confetti';
import { Receipt, DollarSign, QrCode, Users, CheckCircle2, Download, CreditCard, Sparkles } from 'lucide-react';

export const DigitalBillModal = () => {
  const { isBillModalOpen, setIsBillModalOpen, orders, activeTableNumber, addNotification, restaurantInfo } = useApp();

  const [splitPersons, setSplitPersons] = useState(1);
  const [selectedTipPercent, setSelectedTipPercent] = useState(15);
  const [isPaid, setIsPaid] = useState(false);
  const [isUPIPayOpen, setIsUPIPayOpen] = useState(false);

  if (!isBillModalOpen) return null;

  // Aggregate active orders for current table
  const tableOrders = orders.filter(o => o.tableNumber === Number(activeTableNumber));
  
  const allItems = tableOrders.flatMap(o => o.items || []);
  const subtotal = allItems.reduce((sum, item) => sum + ((item?.price || 0) * (item?.quantity || 1)), 0) || 0.00;
  const tax = subtotal * 0.08;
  const tipAmount = subtotal * (selectedTipPercent / 100);
  const grandTotal = subtotal + tax + tipAmount;
  const perPersonAmount = grandTotal / splitPersons;

  const handleSimulatePayment = () => {
    setIsPaid(true);
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
    addNotification('Payment Processed', `Table #${activeTableNumber} bill of $${grandTotal.toFixed(2)} paid via Digital QR Pay`, 'success');
  };

  const handlePrintReceipt = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-lg glass-panel rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-700 max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center space-x-2">
            <Receipt className="h-6 w-6 text-rose-400" />
            <div>
              <h3 className="font-extrabold text-lg text-white">Table #{activeTableNumber} Checkout</h3>
              <p className="text-[11px] text-slate-400">Digital Itemized Invoice & Instant Split Pay</p>
            </div>
          </div>
          <button
            onClick={() => setIsBillModalOpen(false)}
            className="p-1.5 rounded-full bg-slate-900 text-slate-400 hover:text-white"
          >
            ✕
          </button>
        </div>

        {!isPaid ? (
          <div className="mt-4 space-y-5">
            
            {/* Item Breakdown */}
            <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Ordered Items</span>
              {allItems.length === 0 ? (
                <div className="text-xs text-slate-400">Default demo items loaded.</div>
              ) : (
                allItems.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center text-xs py-1 border-b border-slate-800/60">
                    <span className="text-slate-200">{item.quantity}x {item.name}</span>
                    <span className="font-semibold text-slate-300">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))
              )}
            </div>

            {/* Split Bill Calculator */}
            <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-1.5 text-xs font-bold text-slate-200">
                  <Users className="h-4 w-4 text-amber-400" />
                  <span>Split Bill Equally</span>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setSplitPersons(Math.max(1, splitPersons - 1))}
                    className="h-7 w-7 rounded-lg bg-slate-800 font-bold text-xs hover:bg-slate-700"
                  >
                    -
                  </button>
                  <span className="font-extrabold text-xs text-white px-2">{splitPersons} People</span>
                  <button
                    onClick={() => setSplitPersons(splitPersons + 1)}
                    className="h-7 w-7 rounded-lg bg-slate-800 font-bold text-xs hover:bg-slate-700"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Tip Selection */}
              <div>
                <label className="block text-[11px] font-semibold text-slate-400 mb-1.5">Add Staff Gratuity Tip</label>
                <div className="grid grid-cols-4 gap-2">
                  {[0, 10, 15, 20].map(pct => (
                    <button
                      key={pct}
                      onClick={() => setSelectedTipPercent(pct)}
                      className={`py-1.5 text-xs font-bold rounded-xl border transition ${selectedTipPercent === pct ? 'bg-rose-600 text-white border-rose-500' : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-white'}`}
                    >
                      {pct === 0 ? 'No Tip' : `${pct}%`}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Financial Summary */}
            <div className="space-y-2 text-xs pt-2 border-t border-slate-800">
              <div className="flex justify-between text-slate-400">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>State Tax (8%)</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Gratuity Tip ({selectedTipPercent}%)</span>
                <span>${tipAmount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-base font-extrabold text-white pt-2 border-t border-slate-800">
                <span>Total Due</span>
                <span className="text-rose-400">${grandTotal.toFixed(2)}</span>
              </div>
              {splitPersons > 1 && (
                <div className="p-2.5 rounded-xl bg-rose-950/40 border border-rose-500/30 flex justify-between font-bold text-xs text-rose-200">
                  <span>Per Person ({splitPersons}x)</span>
                  <span>${perPersonAmount.toFixed(2)} each</span>
                </div>
              )}
            </div>

            {/* Simulated Payment Actions */}
            <div className="pt-2 space-y-2">
              <button
                onClick={() => setIsUPIPayOpen(true)}
                className="w-full py-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-xs font-extrabold shadow-xl hover:opacity-95 transition flex items-center justify-center space-x-2"
              >
                <QrCode className="h-4 w-4" />
                <span>Pay via UPI / PhonePe / GPay ({restaurantInfo.currency || '₹'}{grandTotal.toFixed(2)})</span>
              </button>

              <button
                onClick={handleSimulatePayment}
                className="w-full py-2.5 rounded-2xl bg-slate-900 border border-slate-800 text-slate-300 text-xs font-bold hover:bg-slate-800 transition flex items-center justify-center space-x-2"
              >
                <CreditCard className="h-4 w-4" />
                <span>Pay with Card / POS terminal</span>
              </button>
            </div>

          </div>
        ) : (
          /* Payment Receipt View */
          <div className="mt-4 text-center space-y-4 py-4">
            <div className="h-14 w-14 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/30">
              <CheckCircle2 className="h-8 w-8" />
            </div>
            <div>
              <h4 className="text-lg font-extrabold text-white">Payment Completed!</h4>
              <p className="text-xs text-slate-400 mt-0.5">Invoice #INV-9021 • Table #{activeTableNumber}</p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 text-xs space-y-1.5 text-left">
              <div className="flex justify-between font-bold text-white">
                <span>Amount Paid:</span>
                <span className="text-emerald-400">${grandTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Payment Method:</span>
                <span>Apple Pay / Contactless QR</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Date & Time:</span>
                <span>{new Date().toLocaleString()}</span>
              </div>
            </div>

            <div className="flex space-x-2">
              <button
                onClick={handlePrintReceipt}
                className="flex-1 py-2.5 rounded-xl bg-slate-800 text-slate-200 text-xs font-bold hover:bg-slate-700 flex items-center justify-center space-x-1.5"
              >
                <Download className="h-4 w-4" />
                <span>Print PDF Receipt</span>
              </button>
              <button
                onClick={() => setIsBillModalOpen(false)}
                className="flex-1 py-2.5 rounded-xl bg-rose-600 text-white text-xs font-bold hover:bg-rose-500"
              >
                Close Window
              </button>
            </div>
          </div>
        )}

      </div>

      <InstantUPIPayModal
        isOpen={isUPIPayOpen}
        onClose={() => setIsUPIPayOpen(false)}
        orderTotal={grandTotal}
      />
    </div>
  );
};
