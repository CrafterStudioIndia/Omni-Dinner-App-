import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useAI } from '../../context/AIContext';
import { SleekHeroBanner } from './SleekHeroBanner';
import { IndianSpecialCombos } from './IndianSpecialCombos';
import { IndianBuffetThalis } from './IndianBuffetThalis';
import {
  Search,
  Filter,
  Sparkles,
  Plus,
  Flame,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Heart,
  Info,
  Leaf
} from 'lucide-react';

export const DigitalMenu = () => {
  const {
    menuItems,
    addToCart,
    activeTableNumber,
    restaurantInfo,
    orders
  } = useApp();
  const { askAI } = useAI();

  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState('All');
  const [isVegOnly, setIsVegOnly] = useState(true);
  const [selectedDishModal, setSelectedDishModal] = useState(null);
  const [dishNotes, setDishNotes] = useState('');
  const [dishQty, setDishQty] = useState(1);

  const currencySymbol = restaurantInfo?.currency || '₹';
  const activeTableOrders = orders.filter(o => o.tableNumber === Number(activeTableNumber));
  const activeTableOrder = activeTableOrders[0];

  const categories = ['All', 'Starters', 'Mains', 'Drinks', 'Desserts'];
  const tags = ['All', 'Vegetarian', 'Gluten-Free', 'Chef Special', 'Bestseller'];

  const filteredDishes = menuItems.filter(item => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTag = selectedTag === 'All' || (item.tags && item.tags.includes(selectedTag));
    const matchesVeg = !isVegOnly || item.isVeg === true;
    return matchesCategory && matchesSearch && matchesTag && matchesVeg;
  });

  const handleOpenDishModal = (dish) => {
    if (!dish.isAvailable) return;
    setSelectedDishModal(dish);
    setDishNotes('');
    setDishQty(1);
  };

  const handleConfirmAddToCart = () => {
    if (selectedDishModal) {
      addToCart(selectedDishModal, dishQty, dishNotes);
      setSelectedDishModal(null);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Active Table Order Status Banner */}
      {activeTableOrder && (
        <div className="glass-panel rounded-2xl p-4 border border-emerald-500/40 bg-emerald-950/20 flex items-center justify-between animate-fadeIn">
          <div className="flex items-center space-x-3">
            <div className="h-3 w-3 rounded-full bg-emerald-400 animate-ping" />
            <div>
              <h4 className="font-extrabold text-xs text-white">Active Order #{activeTableOrder.id} ({activeTableOrder.items?.length || 0} items)</h4>
              <p className="text-[11px] text-slate-300">Status: <span className="text-emerald-300 font-bold">{activeTableOrder.status}</span> • Table #{activeTableNumber}</p>
            </div>
          </div>
          <span className="text-xs font-extrabold text-emerald-300 bg-emerald-500/20 px-3 py-1 rounded-xl border border-emerald-500/30">
            Dispatched to Kitchen ➔
          </span>
        </div>
      )}
      
      {/* Sleek Minimalist Hero Banner */}
      <SleekHeroBanner
        isVegOnly={isVegOnly}
        setIsVegOnly={setIsVegOnly}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      {/* Special Indian Thali Combos */}
      <IndianSpecialCombos />

      {/* Grand Indian Veg Buffets & Thali Platters */}
      <IndianBuffetThalis />

      {/* Category Tabs & Search Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        
        {/* Category Pills & Veg Mode Toggle */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-1 no-scrollbar">
          
          {/* 100% Pure Veg Mode Switch Button */}
          <button
            onClick={() => setIsVegOnly(!isVegOnly)}
            className={`px-3.5 py-2 rounded-2xl text-xs font-extrabold transition flex items-center space-x-1.5 shadow-md ${isVegOnly ? 'bg-emerald-600 text-white border border-emerald-400 ring-2 ring-emerald-500/40' : 'bg-slate-900/90 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-950/40'}`}
          >
            <span>🌱</span>
            <span>100% Pure Veg</span>
            <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${isVegOnly ? 'bg-emerald-950 text-emerald-200' : 'bg-emerald-500/20 text-emerald-300'}`}>
              {isVegOnly ? 'ON' : 'OFF'}
            </span>
          </button>

          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-2xl text-xs font-bold transition whitespace-nowrap ${selectedCategory === cat ? 'bg-rose-600 text-white shadow-lg shadow-rose-950/50' : 'glass-card text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Bar & Tag Filter */}
        <div className="flex items-center space-x-2">
          <div className="relative flex-1 sm:w-64">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search dishes or ingredients..."
              className="w-full pl-9 pr-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-rose-500"
            />
          </div>

          <select
            value={selectedTag}
            onChange={e => setSelectedTag(e.target.value)}
            className="px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-slate-300 focus:outline-none focus:border-rose-500"
          >
            {tags.map(t => (
              <option key={t} value={t}>{t === 'All' ? 'All Dietary Tags' : t}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Menu Item Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredDishes.map(dish => (
          <div
            key={dish.id}
            onClick={() => handleOpenDishModal(dish)}
            className={`group glass-panel rounded-3xl overflow-hidden border border-slate-800/80 transition-all duration-300 flex flex-col justify-between ${dish.isAvailable ? 'hover:border-slate-700 hover:shadow-2xl cursor-pointer hover:-translate-y-1' : 'opacity-60 cursor-not-allowed'}`}
          >
            <div>
              {/* Dish Image */}
              <div className="relative h-44 w-full overflow-hidden bg-slate-900">
                <img
                  src={dish.image}
                  alt={dish.name}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent"></div>

                {/* Stock Availability & Veg Badges */}
                <div className="absolute top-3 left-3 flex flex-wrap gap-1">
                  {dish.isVeg && (
                    <span className="px-2 py-0.5 rounded-full bg-emerald-950/90 border border-emerald-400 text-emerald-300 font-extrabold text-[10px] flex items-center space-x-1 shadow">
                      <span>🌱</span>
                      <span>Veg</span>
                    </span>
                  )}
                  {dish.isAvailable ? (
                    dish.stockCount <= 5 ? (
                      <span className="px-2.5 py-1 rounded-full bg-amber-500/90 backdrop-blur-md text-slate-950 font-bold text-[10px] flex items-center space-x-1 shadow">
                        <AlertTriangle className="h-3 w-3" />
                        <span>Only {dish.stockCount} Left</span>
                      </span>
                    ) : (
                      <span className="px-2.5 py-1 rounded-full bg-emerald-500/80 backdrop-blur-md text-white font-semibold text-[10px] flex items-center space-x-1">
                        <CheckCircle2 className="h-3 w-3" />
                        <span>In Stock</span>
                      </span>
                    )
                  ) : (
                    <span className="px-2.5 py-1 rounded-full bg-rose-600/90 backdrop-blur-md text-white font-bold text-[10px]">
                      Sold Out
                    </span>
                  )}
                </div>

                {/* Prep Time & Rating */}
                <div className="absolute bottom-3 right-3 flex items-center space-x-2 text-[11px] font-semibold text-slate-200">
                  <span className="px-2 py-0.5 rounded-lg bg-slate-950/70 backdrop-blur-md flex items-center space-x-1">
                    <Clock className="h-3 w-3 text-amber-400" />
                    <span>{dish.prepTimeMin}m</span>
                  </span>
                  <span className="px-2 py-0.5 rounded-lg bg-slate-950/70 backdrop-blur-md flex items-center space-x-1 text-amber-400">
                    ★ {dish.rating}
                  </span>
                </div>
              </div>

              {/* Dish Metadata */}
              <div className="p-5">
                <div className="flex items-start justify-between">
                  <h3 className="font-bold text-base text-white group-hover:text-rose-400 transition">{dish.name}</h3>
                  <span className="text-base font-extrabold text-rose-400 ml-2">${dish.price.toFixed(2)}</span>
                </div>

                <p className="mt-2 text-xs text-slate-400 line-clamp-2 leading-relaxed">{dish.description}</p>

                {/* Tags */}
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {dish.tags?.map(t => (
                    <span key={t} className="px-2 py-0.5 rounded-md bg-slate-800 text-[10px] font-semibold text-slate-300">
                      {t}
                    </span>
                  ))}
                </div>

                {/* AI Insight Reason (Platinum feature) */}
                {dish.aiRecommendationReason && (
                  <div className="mt-3 p-2 rounded-xl bg-purple-950/30 border border-purple-500/20 text-purple-300 text-[11px] flex items-center space-x-1.5">
                    <Sparkles className="h-3.5 w-3.5 text-purple-400 flex-shrink-0" />
                    <span className="truncate">{dish.aiRecommendationReason}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Quick Add Button */}
            <div className="p-4 pt-0">
              <button
                disabled={!dish.isAvailable}
                onClick={(e) => {
                  e.stopPropagation();
                  handleOpenDishModal(dish);
                }}
                className={`w-full py-2.5 rounded-xl font-bold text-xs flex items-center justify-center space-x-2 transition ${dish.isAvailable ? 'bg-rose-600 hover:bg-rose-500 text-white shadow-lg shadow-rose-950/40' : 'bg-slate-800 text-slate-500'}`}
              >
                <Plus className="h-4 w-4" />
                <span>{dish.isAvailable ? 'Select & Customize' : 'Item Unavailable'}</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Dish Customization Modal */}
      {selectedDishModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-lg glass-panel rounded-3xl p-6 shadow-2xl border border-slate-700 max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div>
                <div className="flex items-center space-x-2">
                  <h3 className="font-extrabold text-lg text-white">{selectedDishModal.name}</h3>
                  {selectedDishModal.isVeg && <span className="text-xs text-emerald-400 font-bold">🌱 Pure Veg</span>}
                </div>
                <span className="text-sm font-bold text-rose-400">${selectedDishModal.price.toFixed(2)}</span>
              </div>
              <button onClick={() => setSelectedDishModal(null)} className="p-1.5 rounded-full bg-slate-900 text-slate-400 hover:text-white">
                ✕
              </button>
            </div>

            <div className="mt-4 space-y-4 text-xs">
              <p className="text-slate-300 leading-relaxed">{selectedDishModal.description}</p>

              {/* Quantity Selector */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Quantity</label>
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => setDishQty(Math.max(1, dishQty - 1))}
                    className="h-8 w-8 rounded-xl bg-slate-800 text-white font-bold hover:bg-slate-700 border border-slate-700"
                  >
                    -
                  </button>
                  <span className="font-extrabold text-sm text-white w-6 text-center">{dishQty}</span>
                  <button
                    onClick={() => setDishQty(dishQty + 1)}
                    className="h-8 w-8 rounded-xl bg-slate-800 text-white font-bold hover:bg-slate-700 border border-slate-700"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Spice Level Selector */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Select Spice Level</label>
                <div className="grid grid-cols-3 gap-2">
                  {['Mild 🌿', 'Medium 🌶️', 'Chef Hot 🌶️🌶️'].map((spice, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setDishNotes(prev => `[Spice: ${spice}] ${prev.replace(/\[Spice: .*?\] /, '')}`)}
                      className="py-2 px-2 text-[11px] font-bold rounded-xl border bg-slate-900 border-slate-800 text-slate-300 hover:border-rose-500 hover:text-white transition"
                    >
                      {spice}
                    </button>
                  ))}
                </div>
              </div>

              {/* Addon Chef Toppings */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Gourmet Addon Toppings</label>
                <div className="space-y-1.5">
                  {[
                    { name: 'Extra Aged Parmesan', price: 2.50 },
                    { name: 'Black Truffle Drizzle', price: 3.50 },
                    { name: 'House Herb Butter', price: 1.50 }
                  ].map((addon, idx) => (
                    <label key={idx} className="flex items-center justify-between p-2 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-300 cursor-pointer hover:border-slate-700">
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          onChange={e => {
                            if (e.target.checked) {
                              setDishNotes(prev => `${prev} + ${addon.name}`);
                            }
                          }}
                          className="rounded text-rose-500 focus:ring-rose-500"
                        />
                        <span className="font-semibold">{addon.name}</span>
                      </div>
                      <span className="text-rose-400 font-bold">+${addon.price.toFixed(2)}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Special Instructions Note */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Kitchen Preparation & Allergy Notes</label>
                <textarea
                  rows={2}
                  value={dishNotes}
                  onChange={e => setDishNotes(e.target.value)}
                  placeholder="e.g. Gluten allergy, sauce on side..."
                  className="w-full p-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-rose-500"
                ></textarea>
              </div>

              <div className="pt-2">
                <button
                  onClick={handleConfirmAddToCart}
                  className="w-full py-3 rounded-2xl bg-gradient-to-r from-rose-600 to-rose-700 text-white text-xs font-extrabold shadow-xl shadow-rose-950/50 hover:opacity-95 transition"
                >
                  Add {dishQty} to Order • ${(selectedDishModal.price * dishQty).toFixed(2)}
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
