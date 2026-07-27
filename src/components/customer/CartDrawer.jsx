import React from 'react';
import { useApp } from '../../context/AppContext';
import confetti from 'canvas-confetti';
import { ShoppingBag, Trash2, Plus, Minus, Send, ArrowRight, Utensils } from 'lucide-react';

export const CartDrawer = () => {
  const {
    isCartOpen,
    setIsCartOpen,
    cart,
    updateCartQuantity,
    removeFromCart,
    submitOrder,
    activeTableNumber
  } = useApp();

  if (!isCartOpen) return null;

  const subtotal = cart.reduce((sum, entry) => sum + (entry.item.price * entry.quantity), 0);
  const tax = subtotal * 0.08;
  const grandTotal = subtotal + tax;

  const handleSendToKitchen = () => {
    const createdOrder = submitOrder(activeTableNumber);
    if (createdOrder) {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 }
      });
      setIsCartOpen(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/70 backdrop-blur-sm animate-fadeIn">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md glass-panel border-l border-slate-800 bg-[#0b0f17] text-slate-100 p-6 flex flex-col justify-between shadow-2xl">
          
          {/* Header */}
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center space-x-2">
                <ShoppingBag className="h-5 w-5 text-rose-400" />
                <h2 className="font-extrabold text-lg text-white">Table #{activeTableNumber} Order Cart</h2>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="p-1.5 rounded-full bg-slate-900 text-slate-400 hover:text-white transition"
              >
                ✕
              </button>
            </div>

            {/* Cart Items List */}
            <div className="mt-4 space-y-3 max-h-[55vh] overflow-y-auto pr-1">
              {cart.length === 0 ? (
                <div className="text-center py-12">
                  <Utensils className="h-10 w-10 text-slate-600 mx-auto mb-2" />
                  <p className="text-sm font-semibold text-slate-400">Your order cart is empty</p>
                  <p className="text-xs text-slate-500 mt-1">Select dishes from the digital menu to build your meal.</p>
                </div>
              ) : (
                cart.map(entry => (
                  <div key={entry.item.id} className="p-3 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <img src={entry.item.image} alt={entry.item.name} className="h-12 w-12 rounded-xl object-cover" />
                      <div>
                        <h4 className="font-bold text-xs text-white">{entry.item.name}</h4>
                        <div className="text-xs text-rose-400 font-semibold">${entry.item.price.toFixed(2)}</div>
                        {entry.notes && <p className="text-[10px] text-amber-300 italic">Note: "{entry.notes}"</p>}
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <div className="flex items-center space-x-1.5 bg-slate-800 rounded-lg px-2 py-1">
                        <button onClick={() => updateCartQuantity(entry.item.id, -1)} className="text-slate-400 hover:text-white">
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="text-xs font-bold text-white px-1">{entry.quantity}</span>
                        <button onClick={() => updateCartQuantity(entry.item.id, 1)} className="text-slate-400 hover:text-white">
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                      <button onClick={() => removeFromCart(entry.item.id)} className="p-1 text-slate-500 hover:text-rose-400">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Footer Totals & Action */}
          {cart.length > 0 && (
            <div className="pt-4 border-t border-slate-800 space-y-3">
              <div className="space-y-1.5 text-xs text-slate-400">
                <div className="flex justify-between">
                  <span>Items Subtotal</span>
                  <span className="font-semibold text-slate-200">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Estimated Tax (8%)</span>
                  <span className="font-semibold text-slate-200">${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm font-extrabold text-white pt-2 border-t border-slate-800">
                  <span>Grand Total</span>
                  <span className="text-rose-400">${grandTotal.toFixed(2)}</span>
                </div>
              </div>

              <button
                onClick={handleSendToKitchen}
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-rose-600 via-rose-500 to-amber-500 text-white font-bold text-xs tracking-wide shadow-xl shadow-rose-950/60 hover:opacity-95 transition flex items-center justify-center space-x-2"
              >
                <Send className="h-4 w-4" />
                <span>Send Order directly to Kitchen Display</span>
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
