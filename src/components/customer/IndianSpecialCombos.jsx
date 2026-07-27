import React from 'react';
import { useApp } from '../../context/AppContext';
import { Sparkles, Utensils, Award, Plus, Check } from 'lucide-react';

export const IndianSpecialCombos = () => {
  const { addToCart, submitOrder, activeTableNumber, menuItems } = useApp();

  const specialCombos = [
    {
      id: 'combo-1',
      name: '👑 Royal Shahi Thali',
      price: 28.50,
      savings: 'Save $6.00',
      description: 'Paneer Butter Masala + Dal Makhani Royale + Garlic Naan + Kesari Mango Lassi',
      dishes: ['Paneer Butter Masala', 'Dal Makhani Royale', 'Kesari Mango Lassi'],
      badge: 'Bestseller Thali',
      isJainAvailable: true
    },
    {
      id: 'combo-2',
      name: '🔥 Tandoori Feast Platter',
      price: 24.00,
      savings: 'Save $4.50',
      description: 'Paneer Tikka Angaara + Crispy Samosa Chaat + Masala Cutting Chai',
      dishes: ['Paneer Tikka Angaara', 'Crispy Samosa Chaat', 'Masala Cutting Chai'],
      badge: 'Chef Special',
      isJainAvailable: false
    }
  ];

  const handleOrderCombo = (combo) => {
    const itemsToAdd = [];
    combo.dishes.forEach((dishName, idx) => {
      const found = menuItems.find(m => m.name.toLowerCase().includes(dishName.toLowerCase()) || dishName.toLowerCase().includes(m.name.toLowerCase())) || menuItems[idx % menuItems.length] || menuItems[0];
      if (found) {
        itemsToAdd.push({ item: found, quantity: 1, notes: `[Part of ${combo.name}]` });
      }
    });

    const finalItems = itemsToAdd.length > 0 ? itemsToAdd : [{ item: menuItems[0], quantity: 1, notes: `[${combo.name}]` }];
    submitOrder(activeTableNumber, `Ordered ${combo.name}`, finalItems);
  };

  return (
    <div className="glass-panel rounded-3xl p-5 sm:p-6 border border-amber-500/30 bg-gradient-to-br from-amber-950/20 via-slate-900 to-rose-950/20 shadow-xl space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <Award className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-extrabold text-sm sm:text-base text-white">Authentic Indian Thali Combos</h3>
            <p className="text-[11px] text-slate-400">Curated multi-course meals served with authentic sides</p>
          </div>
        </div>

        <span className="text-[10px] px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-300 font-extrabold border border-amber-500/30">
          🌱 100% Pure Veg
        </span>
      </div>

      {/* Combo Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {specialCombos.map(combo => (
          <div key={combo.id} className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-amber-500/40 transition space-y-3 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold text-amber-300">{combo.badge}</span>
                <span className="text-[10px] text-emerald-400 font-bold px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">{combo.savings}</span>
              </div>

              <h4 className="font-extrabold text-sm text-white mt-1">{combo.name}</h4>
              <p className="text-[11px] text-slate-300 mt-1 leading-relaxed">{combo.description}</p>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-slate-800">
              <span className="text-sm font-extrabold text-white">${combo.price.toFixed(2)}</span>

              <button
                onClick={() => handleOrderCombo(combo)}
                className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-amber-600 to-amber-500 hover:opacity-95 text-white font-extrabold text-xs shadow-md transition flex items-center space-x-1"
              >
                <Plus className="h-3.5 w-3.5" />
                <span>1-Click Order</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
