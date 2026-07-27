import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { TableChatModal } from './TableChatModal';
import { ShoppingBag, Receipt, ConciergeBell, Sparkles, Clock, QrCode, MessageSquare } from 'lucide-react';

export const SleekBottomBar = () => {
  const {
    activeTableNumber,
    cart,
    orders,
    setIsCartOpen,
    setIsBillModalOpen,
    setIsAIModalOpen,
    triggerServiceCall,
    currentUser,
    restaurantInfo
  } = useApp();

  const [isChatOpen, setIsChatOpen] = useState(false);

  if (currentUser.role !== 'customer') return null;

  const activeTableOrders = orders.filter(o => o.tableNumber === Number(activeTableNumber));
  const activeOrder = activeTableOrders[0];
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cart.reduce((sum, entry) => sum + (entry.item.price * entry.quantity), 0);
  const currencySymbol = restaurantInfo?.currency || '₹';

  return (
    <>
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 w-[92%] max-w-2xl glass-panel rounded-full p-2.5 px-4 border border-slate-700/80 shadow-2xl bg-[#090d18]/90 backdrop-blur-xl flex items-center justify-between gap-2 animate-fadeIn">
        
        {/* Table & Order Status Pill */}
        <div className="flex items-center space-x-2 truncate">
          <div className="h-8 w-8 rounded-full bg-rose-500/15 border border-rose-500/30 text-rose-400 flex items-center justify-center flex-shrink-0">
            <QrCode className="h-4 w-4" />
          </div>
          <div className="truncate">
            <div className="flex items-center space-x-1.5 text-xs font-extrabold text-white">
              <span>Table #{activeTableNumber}</span>
              {activeOrder && (
                <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-bold text-[9px] border border-amber-500/30">
                  {activeOrder.status}
                </span>
              )}
            </div>
            <p className="text-[10px] text-slate-400 truncate">
              {activeOrder ? `${activeOrder.items?.length || 0} dishes in kitchen line` : cartCount > 0 ? `${cartCount} items in cart` : 'Ready to order'}
            </p>
          </div>
        </div>

        {/* Action Pills */}
        <div className="flex items-center space-x-1.5 flex-shrink-0">
          
          {/* Live Table Chat Trigger */}
          <button
            onClick={() => setIsChatOpen(true)}
            className="p-2 sm:px-3 sm:py-1.5 rounded-full bg-rose-950/60 hover:bg-rose-900/80 border border-rose-500/40 text-rose-300 text-xs font-semibold transition flex items-center space-x-1"
            title="Live Chat with Server"
          >
            <MessageSquare className="h-3.5 w-3.5 text-rose-400" />
            <span className="hidden sm:inline">Chat</span>
          </button>

          {/* Call Waiter */}
          <button
            onClick={() => triggerServiceCall(activeTableNumber, 'Waiter Service')}
            className="p-2 sm:px-3 sm:py-1.5 rounded-full bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 text-xs font-semibold transition flex items-center space-x-1"
            title="Call Waiter"
          >
            <ConciergeBell className="h-3.5 w-3.5 text-amber-400" />
            <span className="hidden sm:inline">Call</span>
          </button>

          {/* AI DineSense */}
          <button
            onClick={() => setIsAIModalOpen(true)}
            className="p-2 sm:px-3 sm:py-1.5 rounded-full bg-purple-950/60 hover:bg-purple-900/80 border border-purple-500/40 text-purple-200 text-xs font-semibold transition flex items-center space-x-1"
            title="AI DineSense Assistant"
          >
            <Sparkles className="h-3.5 w-3.5 text-purple-400" />
            <span className="hidden sm:inline">AI</span>
          </button>

          {/* Digital Bill */}
          {activeOrder && (
            <button
              onClick={() => setIsBillModalOpen(true)}
              className="px-3 py-1.5 rounded-full bg-emerald-950/60 hover:bg-emerald-900/80 border border-emerald-500/40 text-emerald-300 text-xs font-extrabold transition flex items-center space-x-1"
            >
              <Receipt className="h-3.5 w-3.5" />
              <span>Bill</span>
            </button>
          )}

          {/* Cart Trigger Button */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="px-3.5 py-1.5 rounded-full bg-gradient-to-r from-rose-600 to-rose-500 text-white font-extrabold text-xs shadow-lg shadow-rose-950/60 hover:opacity-95 transition flex items-center space-x-1.5"
          >
            <ShoppingBag className="h-3.5 w-3.5" />
            <span>{cartCount > 0 ? `${currencySymbol}${cartTotal.toFixed(2)}` : 'Cart'}</span>
            {cartCount > 0 && (
              <span className="h-4 w-4 rounded-full bg-white text-rose-600 font-bold text-[9px] flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>

        </div>

      </div>

      <TableChatModal
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
      />
    </>
  );
};
