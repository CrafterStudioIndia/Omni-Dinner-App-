import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Sparkles, Utensils, Award, Plus, Flame, ShieldCheck, CheckCircle2 } from 'lucide-react';

export const IndianBuffetThalis = () => {
  const { submitOrder, activeTableNumber, menuItems } = useApp();
  const [selectedThali, setSelectedThali] = useState(null);

  const grandThalis = [
    {
      id: 'thali-1',
      name: '👑 Maharaja Royal Unlimited Veg Buffet',
      price: 32.00,
      tag: 'Unlimited Buffet',
      description: 'Unlimited servings of Paneer Butter Masala, Dal Makhani Royale, Malai Kofta, Veg Dum Biryani, Butter Naan, Gulab Jamun & Mango Lassi.',
      includedItems: [
        'Paneer Butter Masala (Unlimited)',
        'Dal Makhani Royale (Unlimited)',
        'Hyderabadi Veg Dum Biryani',
        'Hot Garlic Butter Naan (Unlimited)',
        'Shahi Gulab Jamun with Rabri',
        'Kesari Mango Lassi'
      ],
      isPopular: true
    },
    {
      id: 'thali-2',
      name: '🪔 Shahi Deluxe Punjabi Thali',
      price: 26.00,
      tag: 'Grand Feast Platter',
      description: 'Traditional brass thali with Amritsari Chole, Paneer Tikka Angaara, Jeera Rice, Stuffed Kulcha, Cucumber Raita & Rasmalai.',
      includedItems: [
        'Amritsari Chole & Stuffed Kulcha',
        'Paneer Tikka Angaara (2 Pcs)',
        'Dal Makhani Royale',
        'Aromatic Jeera Rice',
        'Rasmalai Elaichi'
      ],
      isPopular: false
    },
    {
      id: 'thali-3',
      name: '🌴 South Indian Grand Feast Thali',
      price: 22.00,
      tag: 'Regional Specialty',
      description: 'Mini Masala Dosa, Crispy Medu Vada, Steamed Rice, Sambar, Coconut Chutney, Tomato Rasam & Coconut Payasam.',
      includedItems: [
        'Mini Masala Dosa & Sambar',
        'Crispy Medu Vada (2 Pcs)',
        'Lemon Rice & Coconut Chutney',
        'Traditional South Indian Payasam'
      ],
      isPopular: false
    }
  ];

  const handleOrderThali = (thali) => {
    const mainItem = menuItems.find(m => m.name.toLowerCase().includes('paneer') || m.name.toLowerCase().includes('dal')) || menuItems[0];
    const sideItem = menuItems[1] || menuItems[0];
    
    submitOrder(activeTableNumber, `Ordered ${thali.name}`, [
      { item: mainItem, quantity: 1, notes: `[${thali.name} - Includes Unlimited Refills]` },
      { item: sideItem, quantity: 1, notes: `[Part of ${thali.name}]` }
    ]);
  };

  return (
    <div className="glass-panel rounded-3xl p-5 sm:p-6 border border-rose-500/40 bg-gradient-to-r from-rose-950/30 via-slate-900 to-amber-950/30 shadow-2xl space-y-4">
      
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-400">
            <Utensils className="h-6 w-6" />
          </div>
          <div>
            <h2 className="font-extrabold text-base sm:text-lg text-white">Grand Indian Veg Buffets & Thali Platters</h2>
            <p className="text-xs text-slate-400">Unlimited multi-course feast platters cooked fresh to order</p>
          </div>
        </div>

        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs font-extrabold">
          <ShieldCheck className="h-4 w-4 text-emerald-400" />
          <span>100% Pure Veg Unlimited Refills</span>
        </div>
      </div>

      {/* Thali Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {grandThalis.map(thali => (
          <div
            key={thali.id}
            className={`p-5 rounded-3xl bg-slate-900/90 border transition-all duration-300 space-y-4 flex flex-col justify-between relative overflow-hidden ${thali.isPopular ? 'border-amber-500/50 shadow-[0_0_25px_rgba(245,158,11,0.15)] ring-1 ring-amber-500/30' : 'border-slate-800 hover:border-slate-700'}`}
          >
            {thali.isPopular && (
              <div className="absolute top-0 right-0 px-3 py-1 bg-amber-500 text-black font-extrabold text-[9px] uppercase rounded-bl-2xl shadow-md">
                ⭐ Most Popular
              </div>
            )}

            <div>
              <span className="text-[10px] font-extrabold text-amber-400 uppercase tracking-wider">{thali.tag}</span>
              <h3 className="font-extrabold text-sm sm:text-base text-white mt-1 leading-snug">{thali.name}</h3>
              <p className="text-xs text-slate-300 mt-2 leading-relaxed">{thali.description}</p>

              {/* Items List */}
              <div className="mt-3 pt-3 border-t border-slate-800 space-y-1.5 text-[11px]">
                <span className="font-bold text-slate-400 uppercase text-[9px]">Included Feast Items:</span>
                {thali.includedItems.map((item, idx) => (
                  <div key={idx} className="flex items-center space-x-1.5 text-slate-300">
                    <CheckCircle2 className="h-3 w-3 text-emerald-400 flex-shrink-0" />
                    <span className="truncate">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-slate-800">
              <div>
                <span className="text-base font-extrabold text-white">${thali.price.toFixed(2)}</span>
                <span className="text-[10px] text-slate-400 block">per person cover</span>
              </div>

              <button
                onClick={() => handleOrderThali(thali)}
                className="px-4 py-2 rounded-2xl bg-gradient-to-r from-rose-600 to-amber-500 text-white font-extrabold text-xs shadow-lg hover:opacity-95 transition flex items-center space-x-1.5"
              >
                <Plus className="h-4 w-4" />
                <span>Order Platter</span>
              </button>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};
