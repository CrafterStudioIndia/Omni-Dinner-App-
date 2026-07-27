import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { RestaurantSetupModal } from './RestaurantSetupModal';
import { GoogleMailAuthModal } from './GoogleMailAuthModal';
import {
  Utensils,
  ChefHat,
  LayoutDashboard,
  ConciergeBell,
  Sparkles,
  Bell,
  LogOut,
  User,
  Shield,
  Clock,
  Layers,
  Building2,
  QrCode,
  ChevronDown,
  ShoppingBag,
  Network,
  UserCheck,
  Mail
} from 'lucide-react';

export const Navbar = () => {
  const {
    currentUser,
    setCurrentUser,
    activeTableNumber,
    setActiveTableNumber,
    tables,
    notifications,
    cart,
    setIsCartOpen,
    setIsAuthModalOpen,
    setIsAIModalOpen,
    setIsInterconnectivityModalOpen,
    triggerServiceCall,
    serviceCalls,
    restaurantInfo
  } = useApp();

  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isTableDropdownOpen, setIsTableDropdownOpen] = useState(false);
  const [isRoleDropdownOpen, setIsRoleDropdownOpen] = useState(false);
  const [isSetupModalOpen, setIsSetupModalOpen] = useState(false);
  const [isGoogleModalOpen, setIsGoogleModalOpen] = useState(false);

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const pendingServiceCalls = serviceCalls.filter(c => c.status === 'Pending').length;

  const roles = [
    { id: 'customer', label: 'Customer View', icon: Utensils, badge: 'Table Mode' },
    { id: 'waiter', label: 'Waitstaff View', icon: ConciergeBell, badge: 'Floor Mode' },
    { id: 'kitchen', label: 'Kitchen KDS', icon: ChefHat, badge: 'Prep Screen' },
    { id: 'admin', label: 'Manager Dashboard', icon: LayoutDashboard, badge: 'Analytics' }
  ];

  return (
    <>
      <header className="sticky top-0 z-40 w-full glass-panel border-b border-slate-800/80 bg-[#080c14]/90 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            
            {/* Custom Restaurant Logo & Brand */}
            <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setIsSetupModalOpen(true)}>
              <div className="h-10 w-10 rounded-2xl bg-gradient-to-tr from-rose-600 via-rose-500 to-amber-500 flex items-center justify-center text-lg font-extrabold shadow-lg shadow-rose-950/50 overflow-hidden">
                {restaurantInfo.logo?.startsWith('data:') || restaurantInfo.logo?.startsWith('http') || restaurantInfo.logo?.startsWith('/') ? (
                  <img src={restaurantInfo.logo} alt="Logo" className="h-full w-full object-cover" />
                ) : (
                  <span>{restaurantInfo.logo || '🍽️'}</span>
                )}
              </div>
              <div>
                <div className="flex items-center space-x-1.5">
                  <span className="font-extrabold text-base tracking-tight text-white">{restaurantInfo.name}</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 font-extrabold border border-rose-500/30">
                    SaaS OS
                  </span>
                </div>
                <p className="text-[10px] text-slate-400 hidden sm:block">{restaurantInfo.tagline}</p>
              </div>
            </div>

            {/* Quick Actions & Role Switcher */}
            <div className="flex items-center space-x-2 sm:space-x-3">
              
              {/* Table Selector Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setIsTableDropdownOpen(!isTableDropdownOpen)}
                  className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-slate-900/90 border border-slate-800 hover:border-slate-700 text-xs font-semibold text-slate-200 transition"
                >
                  <QrCode className="h-3.5 w-3.5 text-amber-400" />
                  <span>Table #{activeTableNumber}</span>
                  <ChevronDown className="h-3 w-3 text-slate-400" />
                </button>

                {isTableDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-44 glass-dropdown rounded-xl shadow-2xl py-1 z-50">
                    <div className="px-3 py-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-800">
                      Select Table Seating
                    </div>
                    {[1, 2, 3, 4, 5, 6].map(num => (
                      <button
                        key={num}
                        onClick={() => {
                          setActiveTableNumber(num);
                          setIsTableDropdownOpen(false);
                        }}
                        className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-slate-800/60 transition ${activeTableNumber === num ? 'text-rose-400 font-bold bg-rose-500/10' : 'text-slate-300'}`}
                      >
                        <span>Table #{num}</span>
                        {activeTableNumber === num && <span className="h-1.5 w-1.5 rounded-full bg-rose-500"></span>}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Role Switcher Pill */}
              <div className="relative">
                <button
                  onClick={() => setIsRoleDropdownOpen(!isRoleDropdownOpen)}
                  className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-rose-950/40 border border-rose-500/30 text-rose-200 hover:bg-rose-900/50 text-xs font-medium transition"
                >
                  <Layers className="h-3.5 w-3.5 text-rose-400" />
                  <span className="capitalize font-semibold hidden md:inline">{currentUser.role} View</span>
                  <span className="capitalize font-semibold md:hidden">{currentUser.role}</span>
                  <ChevronDown className="h-3 w-3 text-rose-400" />
                </button>

                {isRoleDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 glass-dropdown rounded-xl shadow-2xl py-1.5 z-50">
                    <div className="px-3 py-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-800">
                      Switch App Role
                    </div>
                    {roles.map(r => {
                      const Icon = r.icon;
                      return (
                        <button
                          key={r.id}
                          onClick={() => {
                            setCurrentUser(prev => ({ ...prev, role: r.id }));
                            setIsRoleDropdownOpen(false);
                          }}
                          className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-slate-800/80 transition ${currentUser.role === r.id ? 'text-rose-400 font-bold bg-rose-500/10' : 'text-slate-300'}`}
                        >
                          <div className="flex items-center space-x-2">
                            <Icon className="h-4 w-4" />
                            <span>{r.label}</span>
                          </div>
                          <span className="text-[9px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-400">{r.badge}</span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Setup Restaurant Button */}
              <button
                onClick={() => setIsSetupModalOpen(true)}
                className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 text-xs font-medium transition"
                title="Set restaurant name & logo"
              >
                <span>⚙️ Setup</span>
              </button>

              {/* Reset Session Button */}
              <button
                onClick={() => {
                  localStorage.clear();
                  window.location.reload();
                }}
                className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-rose-500/40 text-slate-400 hover:text-rose-300 text-xs font-medium transition"
                title="Clear cached active session"
              >
                <span>🔄 Reset</span>
              </button>

              {/* Cart Drawer Trigger Button */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative p-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold transition flex items-center space-x-1.5 shadow-md"
              >
                <ShoppingBag className="h-4 w-4" />
                {totalCartCount > 0 && (
                  <span className="h-4 w-4 rounded-full bg-white text-rose-600 font-extrabold text-[10px] flex items-center justify-center">
                    {totalCartCount}
                  </span>
                )}
              </button>

            </div>

          </div>
        </div>
      </header>

      <RestaurantSetupModal
        isOpen={isSetupModalOpen}
        onClose={() => setIsSetupModalOpen(false)}
      />

      <GoogleMailAuthModal
        isOpen={isGoogleModalOpen}
        onClose={() => setIsGoogleModalOpen(false)}
      />
    </>
  );
};
