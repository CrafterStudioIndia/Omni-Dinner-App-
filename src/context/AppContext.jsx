import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  INITIAL_MENU_ITEMS,
  INITIAL_TABLES,
  INITIAL_ORDERS,
  INITIAL_INVENTORY,
  INITIAL_RESERVATIONS,
  INITIAL_WAITLIST
} from '../data/mockData';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // Helper for localStorage retrieval defined FIRST to prevent TDZ error
  const getSaved = (key, fallback) => {
    try {
      const item = localStorage.getItem(key);
      if (!item || item === 'undefined' || item === 'null') return fallback;
      return JSON.parse(item);
    } catch (e) {
      return fallback;
    }
  };

  // Authentication & Role State
  const [currentUser, setCurrentUser] = useState({
    name: 'Active Operator',
    email: 'operator@omnidine.ai',
    role: 'customer', // 'customer' | 'waiter' | 'kitchen' | 'admin'
    isAuthenticated: true
  });

  // Restaurant Onboarding & Customization State (Default Currency: ₹ Rupee)
  const [restaurantInfo, setRestaurantInfo] = useState(() => getSaved('omnidine_restaurant_info', {
    name: 'Royal Taj Fine Dining',
    logo: '👑',
    tagline: 'Authentic Indian Gourmet SaaS OS',
    currency: '₹'
  }));

  const updateRestaurantInfo = (info) => {
    setRestaurantInfo(prev => {
      const updated = { ...prev, ...info };
      localStorage.setItem('omnidine_restaurant_info', JSON.stringify(updated));
      return updated;
    });
  };

  const resetToZeroState = () => {
    setOrders([]);
    setServiceCalls([]);
    setStaffErrors([]);
    setWaitlist([]);
    setReservations([]);
    setTables(prev => prev.map(t => ({ ...t, status: 'Available', guestCount: 0, currentOrderTotal: 0, occupiedSince: null })));
    localStorage.removeItem('omnidine_orders');
    localStorage.removeItem('omnidine_staff_errors');
    localStorage.removeItem('omnidine_waitlist');
    localStorage.removeItem('omnidine_reservations');
  };

  const [activeTableNumber, setActiveTableNumber] = useState(3);

  // Core Data States with 100% Pure Veg Enforcement
  const [menuItems, setMenuItems] = useState(() => {
    // Pure Veg enforcement
    const vegList = INITIAL_MENU_ITEMS.map(item => ({ ...item, isVeg: true }));
    localStorage.setItem('omnidine_menu', JSON.stringify(vegList));
    return vegList;
  });

  // Core Data States - Starts completely FRESH from 0
  const [tables, setTables] = useState(() => getSaved('omnidine_tables', INITIAL_TABLES));
  const [orders, setOrders] = useState(() => getSaved('omnidine_orders', []));
  const [inventory, setInventory] = useState(() => getSaved('omnidine_inventory', INITIAL_INVENTORY));
  const [reservations, setReservations] = useState(() => getSaved('omnidine_reservations', []));
  const [waitlist, setWaitlist] = useState(() => getSaved('omnidine_waitlist', []));
  const [staffErrors, setStaffErrors] = useState(() => getSaved('omnidine_staff_errors', []));
  const [serviceCalls, setServiceCalls] = useState(() => getSaved('omnidine_service_calls', []));
  const [cart, setCart] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [interconnectivityLogs, setInterconnectivityLogs] = useState([]);

  // Modals & UI Controls
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isBillModalOpen, setIsBillModalOpen] = useState(false);
  const [isAIModalOpen, setIsAIModalOpen] = useState(false);
  const [isInterconnectivityModalOpen, setIsInterconnectivityModalOpen] = useState(false);

  // Staff Error Reporting & Resolution
  const reportStaffError = (staffName, tableNumber, errorType, description, severity = 'Medium') => {
    const errId = `ERR-${Math.floor(100 + Math.random() * 900)}`;
    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const newReport = {
      id: errId,
      timestamp: timeStr,
      staffName,
      tableNumber: Number(tableNumber),
      errorType,
      description,
      severity,
      status: 'Open',
      actionTaken: 'Pending manager review'
    };

    setStaffErrors(prev => {
      const updated = [newReport, ...prev];
      localStorage.setItem('omnidine_staff_errors', JSON.stringify(updated));
      return updated;
    });

    addNotification('Staff Error Reported', `Incident #${errId} logged for ${staffName} on Table ${tableNumber}`, 'warning');
    return newReport;
  };

  const resolveStaffError = (errorId, actionTaken) => {
    setStaffErrors(prev => {
      const updated = prev.map(err => {
        if (err.id === errorId) {
          return { ...err, status: 'Resolved', actionTaken };
        }
        return err;
      });
      localStorage.setItem('omnidine_staff_errors', JSON.stringify(updated));
      return updated;
    });
    addNotification('Staff Error Resolved', `Incident #${errorId} marked as Resolved`, 'success');
  };

  // Save changes to localStorage for persistent session
  useEffect(() => {
    localStorage.setItem('omnidine_menu', JSON.stringify(menuItems));
  }, [menuItems]);

  useEffect(() => {
    localStorage.setItem('omnidine_tables', JSON.stringify(tables));
  }, [tables]);

  useEffect(() => {
    localStorage.setItem('omnidine_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('omnidine_inventory', JSON.stringify(inventory));
  }, [inventory]);

  // Helper notification dispatcher
  const addNotification = (title, message, type = 'info') => {
    const newNotif = {
      id: Date.now(),
      title,
      message,
      type,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setNotifications(prev => [newNotif, ...prev.slice(0, 15)]);
  };

  // Log chain event for Manager Admin Audit Report
  const addInterconnectivityLog = (eventId, tableNumber, customerName, role, action, nextStage) => {
    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setInterconnectivityLogs(prev => {
      const existing = prev.find(l => l.eventId === eventId);
      if (existing) {
        const updatedChain = existing.chain.map(c => c.role.toLowerCase().includes(role.toLowerCase()) ? { ...c, time: timeStr, status: 'done' } : c);
        // Add new step if not present
        if (!updatedChain.some(c => c.action === action)) {
          updatedChain.push({ role, action, time: timeStr, status: 'done' });
        }
        return prev.map(l => l.eventId === eventId ? { ...l, stage: nextStage, chain: updatedChain } : l);
      } else {
        return [
          {
            id: `log-${Date.now()}`,
            eventId,
            tableNumber: Number(tableNumber),
            title: `Order #${eventId} Chain`,
            customerName,
            stage: nextStage,
            chain: [
              { role: 'Customer', action: 'Order Placed at Table', time: timeStr, status: 'done' },
              { role: 'Waitstaff', action: action.includes('Waiter') ? action : 'Pending Waiter Dispatch', time: action.includes('Waiter') ? timeStr : 'Pending', status: action.includes('Waiter') ? 'done' : 'pending' },
              { role: 'Kitchen Chef', action: 'Pending Kitchen Prep', time: 'Pending', status: 'pending' },
              { role: 'Manager Admin', action: 'Reported in Live Audit', time: timeStr, status: 'active' }
            ]
          },
          ...prev
        ];
      }
    });
  };

  // Cart operations with distinct customization keying
  const addToCart = (item, quantity = 1, notes = '') => {
    setCart(prev => {
      // Find item with SAME id AND SAME notes customization
      const existingIndex = prev.findIndex(i => i.item.id === item.id && (i.notes || '') === (notes || ''));
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      }
      return [...prev, { item, quantity, notes }];
    });
    addNotification('Added to Order', `${item.name} (${quantity}) added to cart`, 'success');
  };

  const removeFromCart = (itemId, notes = '') => {
    setCart(prev => prev.filter(i => !(i.item.id === itemId && (i.notes || '') === (notes || ''))));
  };

  const updateCartQuantity = (itemId, delta, notes = '') => {
    setCart(prev => prev.map(i => {
      if (i.item.id === itemId && (i.notes || '') === (notes || '')) {
        const newQty = i.quantity + delta;
        return newQty > 0 ? { ...i, quantity: newQty } : null;
      }
      return i;
    }).filter(Boolean));
  };

  const clearCart = () => setCart([]);

  // Interconnected Submit Order: Customer -> Waiter Dispatch -> Kitchen Chef -> Manager Report
  const submitOrder = (tableNum = activeTableNumber, notes = '', customCartItems = null) => {
    const itemsToProcess = customCartItems || cart;
    if (!itemsToProcess || itemsToProcess.length === 0) return null;

    const total = itemsToProcess.reduce((sum, entry) => sum + (entry.item.price * entry.quantity), 0);
    const orderId = `ORD-${Math.floor(1000 + Math.random() * 9000)}`;
    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const currentTableObj = tables.find(t => t.id === Number(tableNum));
    const assignedServer = currentTableObj?.server || 'Alex M.';

    const newOrder = {
      id: orderId,
      tableNumber: Number(tableNum),
      customerName: currentUser.name || `Table ${tableNum} Guest`,
      timestamp: timeStr,
      status: 'Customer Placed',
      assignedWaiter: assignedServer,
      items: itemsToProcess.map(c => ({
        id: c.item.id,
        name: c.item.name,
        quantity: c.quantity,
        price: c.item.price,
        notes: c.notes || ''
      })),
      total: Number(total.toFixed(2)),
      paid: false,
      prepTimer: 15
    };

    setOrders(prev => [newOrder, ...prev]);
    addNotification('Order Placed Successfully', `Ticket #${newOrder.id} dispatched to kitchen for Table #${tableNum}`, 'success');

    // Update Table status to Occupied
    setTables(prev => prev.map(t => {
      if (t.id === Number(tableNum)) {
        return {
          ...t,
          status: 'Occupied',
          guestCount: t.guestCount || 2,
          currentOrderTotal: Number((t.currentOrderTotal + total).toFixed(2)),
          occupiedSince: t.occupiedSince || timeStr
        };
      }
      return t;
    }));

    // Deduct stock accurately for each item
    setMenuItems(prev => prev.map(m => {
      const orderedCount = itemsToProcess
        .filter(c => c.item.id === m.id)
        .reduce((sum, c) => sum + c.quantity, 0);
      
      if (orderedCount > 0) {
        const newStock = Math.max(0, m.stockCount - orderedCount);
        return {
          ...m,
          stockCount: newStock,
          isAvailable: newStock > 0
        };
      }
      return m;
    }));

    // Log interconnectivity event
    addInterconnectivityLog(
      orderId,
      tableNum,
      newOrder.customerName,
      'Customer',
      'Order Placed at Table',
      'Sent to Waiter'
    );

    if (!customCartItems) clearCart();
    addNotification('Order Sent to Waiter!', `Order #${orderId} for Table ${tableNum} dispatched to assigned server (${assignedServer}).`, 'success');
    return newOrder;
  };

  // Waiter Acknowledges & Sends Order to Kitchen Display System (KDS)
  const waiterAcknowledgeOrder = (orderId) => {
    setOrders(prev => prev.map(ord => {
      if (ord.id === orderId) {
        const updated = { ...ord, status: 'Received' }; // Received by Chef
        addInterconnectivityLog(
          orderId,
          ord.tableNumber,
          ord.customerName,
          `Waiter (${ord.assignedWaiter || 'Server'})`,
          'Acknowledged & Dispatched to Kitchen',
          'Chef Prep Line'
        );
        addNotification('Waiter Dispatched Order', `Order ${orderId} sent to Kitchen Chef KDS line!`, 'success');
        return updated;
      }
      return ord;
    }));
  };

  // Kitchen Chef Order bump status (Received -> In Prep -> Ready -> Served)
  const bumpOrderStatus = (orderId, nextStatus) => {
    setOrders(prev => prev.map(ord => {
      if (ord.id === orderId) {
        const updated = { ...ord, status: nextStatus };
        
        let logRole = 'Kitchen Chef';
        let actionDesc = `Kitchen marked order as ${nextStatus}`;
        if (nextStatus === 'In Prep') actionDesc = 'Chef started cooking on line';
        if (nextStatus === 'Ready') actionDesc = 'Chef completed dish — Notified Waiter for pickup';
        if (nextStatus === 'Served') {
          logRole = 'Waitstaff';
          actionDesc = 'Waiter served dish to customer table';
        }

        addInterconnectivityLog(
          orderId,
          ord.tableNumber,
          ord.customerName,
          logRole,
          actionDesc,
          nextStatus
        );

        addNotification('Interconnected Lifecycle Alert', `Order ${orderId}: ${actionDesc}`, 'info');
        return updated;
      }
      return ord;
    }));
  };

  // Menu Item Management (Admin/Kitchen)
  const toggleItemAvailability = (itemId) => {
    setMenuItems(prev => prev.map(item => {
      if (item.id === itemId) {
        const updated = !item.isAvailable;
        addNotification('Menu Updated', `${item.name} is now ${updated ? 'Available' : 'Sold Out'}`, 'warning');
        return { ...item, isAvailable: updated };
      }
      return item;
    }));
  };

  // Service Request Button ("Call Waiter", "Water Refill", "Bill Request")
  const triggerServiceCall = (tableNum = activeTableNumber, type = 'Waiter Assistance') => {
    const newCall = {
      id: `sc-${Date.now()}`,
      tableNumber: Number(tableNum),
      type,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'Pending'
    };
    setServiceCalls(prev => [newCall, ...prev]);
    addNotification('Service Requested', `Staff notified for Table #${tableNum} (${type})`, 'success');
  };

  const resolveServiceCall = (callId) => {
    setServiceCalls(prev => prev.filter(c => c.id !== callId));
  };

  // Table Status Update (Admin/Waitstaff)
  const updateTableStatus = (tableId, newStatus) => {
    setTables(prev => prev.map(t => t.id === tableId ? { ...t, status: newStatus } : t));
    addNotification('Table Status Updated', `Table #${tableId} set to ${newStatus}`, 'info');
  };

  // Waitlist Operations
  const addToWaitlist = (party) => {
    const newQueueItem = {
      id: `w-${Date.now()}`,
      name: party.name,
      partySize: party.partySize,
      phone: party.phone,
      waitTimeEst: `${15 + waitlist.length * 5} mins`,
      queueNo: `Q-0${waitlist.length + 1}`,
      status: 'Waiting'
    };
    setWaitlist(prev => [...prev, newQueueItem]);
    addNotification('Waitlist Joined', `Ticket ${newQueueItem.queueNo} created for ${party.name}`, 'success');
    return newQueueItem;
  };

  const seatWaitlistParty = (waitlistId) => {
    setWaitlist(prev => prev.filter(w => w.id !== waitlistId));
    addNotification('Guest Seated', `Waitlist guest seated at available table`, 'success');
  };

  // Restock Inventory
  const replenishStock = (inventoryId, amount = 10) => {
    setInventory(prev => prev.map(item => {
      if (item.id === inventoryId) {
        const newStock = item.currentStock + amount;
        return {
          ...item,
          currentStock: newStock,
          status: newStock > item.minThreshold ? 'Optimal' : 'Low Stock'
        };
      }
      return item;
    }));
    addNotification('Inventory Replenished', `Stock updated successfully.`, 'success');
  };

  return (
    <AppContext.Provider value={{
      restaurantInfo,
      updateRestaurantInfo,
      resetToZeroState,
      currentUser,
      setCurrentUser,
      activeTableNumber,
      setActiveTableNumber,
      menuItems,
      setMenuItems,
      tables,
      orders,
      inventory,
      reservations,
      waitlist,
      cart,
      notifications,
      serviceCalls,
      staffErrors,
      reportStaffError,
      resolveStaffError,
      interconnectivityLogs,
      isAuthModalOpen,
      setIsAuthModalOpen,
      isCartOpen,
      setIsCartOpen,
      isBillModalOpen,
      setIsBillModalOpen,
      isAIModalOpen,
      setIsAIModalOpen,
      isInterconnectivityModalOpen,
      setIsInterconnectivityModalOpen,
      addToCart,
      removeFromCart,
      updateCartQuantity,
      clearCart,
      submitOrder,
      waiterAcknowledgeOrder,
      bumpOrderStatus,
      toggleItemAvailability,
      triggerServiceCall,
      resolveServiceCall,
      updateTableStatus,
      addToWaitlist,
      seatWaitlistParty,
      replenishStock,
      addNotification
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within an AppProvider');
  return context;
};
