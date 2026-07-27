import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { AIProvider } from './context/AIContext';
import { ErrorBoundary } from './components/ErrorBoundary';
import { Navbar } from './components/Navbar';
import { DigitalMenu } from './components/customer/DigitalMenu';
import { LiveOrderTracker } from './components/customer/LiveOrderTracker';
import { SmartReservations } from './components/customer/SmartReservations';
import { KitchenDisplay } from './components/kitchen/KitchenDisplay';
import { DashboardOverview } from './components/admin/DashboardOverview';
import { TableFloorplan } from './components/admin/TableFloorplan';
import { InventoryManager } from './components/admin/InventoryManager';
import { StaffRoster } from './components/admin/StaffRoster';
import { CartDrawer } from './components/customer/CartDrawer';
import { DigitalBillModal } from './components/customer/DigitalBillModal';
import { AuthModal } from './components/AuthModal';
import { AIDineSensePanel } from './components/ai/AIDineSensePanel';
import { InterconnectivityHub } from './components/InterconnectivityHub';
import { InterconnectedSplitView } from './components/InterconnectedSplitView';
import { SleekBottomBar } from './components/customer/SleekBottomBar';
import { InitialLoginScreen } from './components/InitialLoginScreen';
import {
  Utensils,
  ChefHat,
  LayoutDashboard,
  Calendar,
  Package,
  Users,
  Clock,
  Sparkles,
  Award,
  BookOpen,
  Network
} from 'lucide-react';

const MainAppContent = () => {
  const { currentUser, setIsAIModalOpen } = useApp();

  const [hasLoggedIn, setHasLoggedIn] = useState(false);
  const [customerActiveTab, setCustomerActiveTab] = useState('pipeline'); // 'pipeline' | 'menu' | 'tracker' | 'reservations'
  const [adminActiveTab, setAdminActiveTab] = useState('overview'); // 'overview' | 'tables' | 'inventory' | 'staff'

  if (!hasLoggedIn) {
    return <InitialLoginScreen onLoginSuccess={() => setHasLoggedIn(true)} />;
  }

  return (
    <div className="min-h-screen bg-[#080c14] text-slate-100 flex flex-col justify-between">
      
      <div>
        <Navbar />
        
        {/* Main Content Area based on User Role */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-28">
          
          {/* Customer View Tabs */}
          {currentUser.role === 'customer' && (
            <div className="mb-6 flex justify-between items-center border-b border-slate-800 pb-3">
              <div className="flex space-x-2">
                <button
                  onClick={() => setCustomerActiveTab('menu')}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold transition flex items-center space-x-2 ${customerActiveTab === 'menu' ? 'bg-rose-600 text-white shadow-md' : 'bg-slate-900 text-slate-400 hover:text-white'}`}
                >
                  <Utensils className="h-4 w-4" />
                  <span>Digital Menu & QR Order</span>
                </button>

                <button
                  onClick={() => setCustomerActiveTab('pipeline')}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold transition flex items-center space-x-2 ${customerActiveTab === 'pipeline' ? 'bg-rose-600 text-white shadow-md' : 'bg-slate-900 text-slate-400 hover:text-white'}`}
                >
                  <Network className="h-4 w-4" />
                  <span>4-Role Interconnected View</span>
                </button>

                <button
                  onClick={() => setCustomerActiveTab('tracker')}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold transition flex items-center space-x-2 ${customerActiveTab === 'tracker' ? 'bg-rose-600 text-white shadow-md' : 'bg-slate-900 text-slate-400 hover:text-white'}`}
                >
                  <Clock className="h-4 w-4" />
                  <span>Live Tracker</span>
                </button>
              </div>
            </div>
          )}

          {/* Admin / Manager View Tabs */}
          {currentUser.role === 'admin' && (
            <div className="mb-6 flex justify-between items-center border-b border-slate-800 pb-3">
              <div className="flex space-x-2 overflow-x-auto pb-1">
                <button
                  onClick={() => setAdminActiveTab('overview')}
                  className={`px-4 py-2 rounded-2xl text-xs font-bold transition flex items-center space-x-1.5 ${adminActiveTab === 'overview' ? 'bg-rose-600 text-white shadow-lg' : 'glass-card text-slate-400 hover:text-white'}`}
                >
                  <LayoutDashboard className="h-4 w-4" />
                  <span>Dashboard & Analytics</span>
                </button>
                <button
                  onClick={() => setAdminActiveTab('tables')}
                  className={`px-4 py-2 rounded-2xl text-xs font-bold transition flex items-center space-x-1.5 ${adminActiveTab === 'tables' ? 'bg-rose-600 text-white shadow-lg' : 'glass-card text-slate-400 hover:text-white'}`}
                >
                  <Utensils className="h-4 w-4" />
                  <span>Table Floorplan</span>
                </button>
                <button
                  onClick={() => setAdminActiveTab('inventory')}
                  className={`px-4 py-2 rounded-2xl text-xs font-bold transition flex items-center space-x-1.5 ${adminActiveTab === 'inventory' ? 'bg-rose-600 text-white shadow-lg' : 'glass-card text-slate-400 hover:text-white'}`}
                >
                  <Package className="h-4 w-4" />
                  <span>Inventory & Stock</span>
                </button>
                <button
                  onClick={() => setAdminActiveTab('staff')}
                  className={`px-4 py-2 rounded-2xl text-xs font-bold transition flex items-center space-x-1.5 ${adminActiveTab === 'staff' ? 'bg-rose-600 text-white shadow-lg' : 'glass-card text-slate-400 hover:text-white'}`}
                >
                  <Users className="h-4 w-4" />
                  <span>Staff & Service Calls</span>
                </button>
              </div>
            </div>
          )}

          {/* Render Active View based on Role */}
          {currentUser.role === 'customer' && (
            <>
              {customerActiveTab === 'menu' && <DigitalMenu />}
              {customerActiveTab === 'pipeline' && <InterconnectedSplitView />}
              {customerActiveTab === 'tracker' && <LiveOrderTracker />}
              {customerActiveTab === 'reservations' && <SmartReservations />}
            </>
          )}

          {currentUser.role === 'kitchen' && <KitchenDisplay />}

          {currentUser.role === 'waiter' && (
            <div className="space-y-6">
              <StaffRoster />
              <TableFloorplan />
            </div>
          )}

          {currentUser.role === 'admin' && (
            <>
              {adminActiveTab === 'overview' && <DashboardOverview />}
              {adminActiveTab === 'tables' && <TableFloorplan />}
              {adminActiveTab === 'inventory' && <InventoryManager />}
              {adminActiveTab === 'staff' && <StaffRoster />}
            </>
          )}

        </main>
      </div>

      {/* Global Drawers & Modals */}
      <CartDrawer />
      <DigitalBillModal />
      <AuthModal />
      <AIDineSensePanel />
      <InterconnectivityHub />
      <SleekBottomBar />

      <footer className="bg-slate-950/80 border-t border-slate-900 py-4 text-center text-xs text-slate-500">
        <p>OmniDine AI • Production SaaS Restaurant Operating System</p>
      </footer>

    </div>
  );
};

export function App() {
  return (
    <ErrorBoundary>
      <AppProvider>
        <AIProvider>
          <MainAppContent />
        </AIProvider>
      </AppProvider>
    </ErrorBoundary>
  );
}

export default App;
