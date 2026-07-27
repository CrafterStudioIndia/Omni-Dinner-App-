import React from 'react';
import { Printer, QrCode, CheckCircle2 } from 'lucide-react';

export const ThermalReceiptModal = ({ isOpen, onClose, ticketData }) => {
  if (!isOpen || !ticketData) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-sm glass-panel rounded-3xl p-6 shadow-2xl border border-slate-700 flex flex-col justify-between max-h-[90vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full bg-slate-900 text-slate-400 hover:text-white"
        >
          ✕
        </button>

        <h3 className="font-extrabold text-sm text-white mb-3 text-center">Thermal Kitchen / POS Print Preview</h3>

        {/* Hyper-Realistic Thermal Paper Ticket Box */}
        <div className="bg-[#fefefe] text-slate-900 font-mono p-5 rounded-lg shadow-inner text-xs space-y-3 border-t-8 border-rose-600 relative">
          
          {/* Header */}
          <div className="text-center space-y-1">
            <h2 className="font-bold text-sm uppercase tracking-wider">OMNIDINE AI RESTAURANT</h2>
            <p className="text-[10px] text-slate-600">100 Innovation Way • Suite 500</p>
            <p className="text-[10px] text-slate-600">Tel: +1 (555) 019-2834</p>
            <div className="border-b border-dashed border-slate-400 my-2"></div>
          </div>

          {/* Metadata */}
          <div className="space-y-0.5 text-[11px]">
            <div className="flex justify-between">
              <span>TICKET #:</span>
              <span className="font-bold">{ticketData.id || 'ORD-9021'}</span>
            </div>
            <div className="flex justify-between">
              <span>TABLE #:</span>
              <span className="font-bold">TABLE #{ticketData.tableNumber || 3}</span>
            </div>
            <div className="flex justify-between">
              <span>SERVER:</span>
              <span>{ticketData.customerName || 'Alex M.'}</span>
            </div>
            <div className="flex justify-between">
              <span>DATE/TIME:</span>
              <span>{ticketData.timestamp || new Date().toLocaleTimeString()}</span>
            </div>
            <div className="border-b border-dashed border-slate-400 my-2"></div>
          </div>

          {/* Items Table */}
          <div className="space-y-1.5 text-[11px]">
            <div className="flex justify-between font-bold text-[10px] uppercase">
              <span>QTY ITEM</span>
              <span>PRICE</span>
            </div>
            {ticketData.items?.map((it, idx) => (
              <div key={idx} className="space-y-0.5">
                <div className="flex justify-between">
                  <span>{it.quantity}x {it.name}</span>
                  <span>${(it.price * it.quantity).toFixed(2)}</span>
                </div>
                {it.notes && <div className="text-[9px] text-slate-600 pl-3">↳ Note: {it.notes}</div>}
              </div>
            ))}
            <div className="border-b border-dashed border-slate-400 my-2"></div>
          </div>

          {/* Totals */}
          <div className="space-y-1 text-[11px]">
            <div className="flex justify-between font-bold text-xs">
              <span>TOTAL DUE:</span>
              <span>${ticketData.total?.toFixed(2) || '0.00'}</span>
            </div>
            <div className="flex justify-between text-[10px]">
              <span>PAYMENT METHOD:</span>
              <span>CONTACTLESS QR</span>
            </div>
          </div>

          {/* Footer Tear-off barcode */}
          <div className="text-center pt-2 border-t border-dashed border-slate-400 space-y-1">
            <div className="text-[9px] text-slate-500">*** THANK YOU FOR DINING ***</div>
            <div className="font-mono text-lg tracking-widest font-extrabold text-slate-800">|||| | ||||| || ||| ||||</div>
          </div>

        </div>

        {/* Actions */}
        <div className="mt-4 flex space-x-2">
          <button
            onClick={handlePrint}
            className="flex-1 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition flex items-center justify-center space-x-1.5"
          >
            <Printer className="h-4 w-4" />
            <span>Print Thermal Ticket</span>
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl bg-slate-900 text-slate-300 font-bold text-xs hover:text-white"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
