export const INITIAL_MENU_ITEMS = [
  {
    id: 'm10',
    name: 'Paneer Butter Masala',
    category: 'Mains',
    price: 19.50,
    description: 'Soft cottage cheese cubes cooked in a rich, creamy tomato cashew gravy finished with butter and kasuri methi.',
    image: '/images/paneer_butter_masala.jpg',
    tags: ['Pure Veg', 'Bestseller', 'Chef Special'],
    isVeg: true,
    calories: 580,
    prepTimeMin: 15,
    isAvailable: true,
    stockCount: 22,
    rating: 4.98,
    aiRecommendationReason: 'All-time favorite Indian main course; highest rated dish!'
  },
  {
    id: 'm1',
    name: 'Dal Makhani Royale',
    category: 'Mains',
    price: 17.99,
    description: 'Slow-cooked whole black lentils simmered overnight with cream, white butter, and aromatic Indian spices.',
    image: '/images/dal_makhani.jpg',
    tags: ['Pure Veg', 'Popular', 'Gluten-Free'],
    isVeg: true,
    calories: 520,
    prepTimeMin: 12,
    isAvailable: true,
    stockCount: 25,
    rating: 4.95,
    aiRecommendationReason: 'Authentic Punjabi specialty simmered for 12 hours.'
  },
  {
    id: 'm2',
    name: 'Hyderabadi Veg Dum Biryani',
    category: 'Mains',
    price: 21.00,
    description: 'Fragrant long-grain Basmati rice dum-cooked with spiced garden vegetables, saffron, mint, and caramelized onions served with Cucumber Raita.',
    image: '/images/hyderabadi_biryani.jpg',
    tags: ['Pure Veg', 'Bestseller'],
    isVeg: true,
    calories: 650,
    prepTimeMin: 18,
    isAvailable: true,
    stockCount: 18,
    rating: 4.96,
    aiRecommendationReason: 'Royal Nizami recipe served with authentic mint burani raita.'
  },
  {
    id: 'm3',
    name: 'Amritsari Chole Kulcha',
    category: 'Mains',
    price: 16.50,
    description: 'Tangy chickpea curry cooked in authentic Amritsari spices, served with two stuffed buttered kulchas and spicy pickled onions.',
    image: '/images/amritsari_chole_kulcha.jpg',
    tags: ['Pure Veg', 'Chef Special'],
    isVeg: true,
    calories: 620,
    prepTimeMin: 14,
    isAvailable: true,
    stockCount: 16,
    rating: 4.91
  },
  {
    id: 'm4',
    name: 'Malai Kofta Curry',
    category: 'Mains',
    price: 20.00,
    description: 'Melt-in-mouth cottage cheese & potato dumplings simmered in a velvety cashew nut and melon seed gravy.',
    image: '/images/paneer_butter_masala.jpg',
    tags: ['Pure Veg', 'Royal Specialty'],
    isVeg: true,
    calories: 680,
    prepTimeMin: 16,
    isAvailable: true,
    stockCount: 14,
    rating: 4.93
  },
  {
    id: 'm5',
    name: 'Paneer Tikka Angaara',
    category: 'Starters',
    price: 16.00,
    description: 'Smoky clay-oven grilled paneer cubes marinated in mustard oil, tandoori spices, and mint-coriander chutney.',
    image: '/images/paneer_tikka_angaara.jpg',
    tags: ['Pure Veg', 'Spicy', 'Tandoori'],
    isVeg: true,
    calories: 450,
    prepTimeMin: 12,
    isAvailable: true,
    stockCount: 20,
    rating: 4.97,
    aiRecommendationReason: 'Must-order starter; charcoal smoky flavor profile!'
  },
  {
    id: 'm6',
    name: 'Crispy Samosa Chaat',
    category: 'Starters',
    price: 12.50,
    description: 'Golden spiced potato samosas crushed and layered with sweet yogurt, tamarind chutney, mint sauce, and crisp nylon sev.',
    image: '/images/samosa_chaat.jpg',
    tags: ['Pure Veg', 'Street Food Bestseller'],
    isVeg: true,
    calories: 410,
    prepTimeMin: 8,
    isAvailable: true,
    stockCount: 24,
    rating: 4.88
  },
  {
    id: 'm7',
    name: 'Mumbai Butter Pav Bhaji',
    category: 'Starters',
    price: 14.00,
    description: 'Slow-mashed spiced vegetable curry topped with generous Amul butter, served with toasted butter pav buns and chopped onions.',
    image: '/images/paneer_tikka_angaara.jpg',
    tags: ['Pure Veg', 'Popular'],
    isVeg: true,
    calories: 540,
    prepTimeMin: 10,
    isAvailable: true,
    stockCount: 20,
    rating: 4.90
  },
  {
    id: 'm8',
    name: 'Kesari Mango Lassi',
    category: 'Drinks',
    price: 6.50,
    description: 'Chilled thick yogurt drink blended with sweet Alphonso mango pulp, saffron strands, and crushed pistachios.',
    image: '/images/mango_lassi.jpg',
    tags: ['Pure Veg', 'Refreshing', 'Bestseller'],
    isVeg: true,
    calories: 240,
    prepTimeMin: 4,
    isAvailable: true,
    stockCount: 40,
    rating: 4.99
  },
  {
    id: 'm13',
    name: 'Masala Cutting Chai',
    category: 'Drinks',
    price: 4.50,
    description: 'Authentic Indian spiced tea brewed with fresh crushed ginger, green cardamom, cloves, and whole milk.',
    image: '/images/mango_lassi.jpg',
    tags: ['Pure Veg', 'Hot Beverage'],
    isVeg: true,
    calories: 120,
    prepTimeMin: 5,
    isAvailable: true,
    stockCount: 50,
    rating: 4.92
  },
  {
    id: 'm9',
    name: 'Shahi Gulab Jamun with Rabri',
    category: 'Desserts',
    price: 9.50,
    description: 'Warm golden milk dumplings soaked in rose saffron syrup served over thick chilled cardamom rabri.',
    image: '/images/gulab_jamun.jpg',
    tags: ['Pure Veg', 'Dessert', 'Bestseller'],
    isVeg: true,
    calories: 480,
    prepTimeMin: 5,
    isAvailable: true,
    stockCount: 30,
    rating: 4.98
  },
  {
    id: 'm12',
    name: 'Rasmalai Elaichi',
    category: 'Desserts',
    price: 10.50,
    description: 'Soft cottage cheese discs soaked in chilled thickened milk flavored with green cardamom, saffron, and slivered almonds.',
    image: '/images/gulab_jamun.jpg',
    tags: ['Pure Veg', 'Dessert'],
    isVeg: true,
    calories: 390,
    prepTimeMin: 4,
    isAvailable: true,
    stockCount: 28,
    rating: 4.96
  }
];

export const INITIAL_TABLES = [
  { id: 1, name: 'Table 1', seats: 2, status: 'Occupied', guestCount: 2, currentOrderTotal: 43.50, occupiedSince: '19:40', server: 'Ramesh Sharma' },
  { id: 2, name: 'Table 2', seats: 4, status: 'Available', guestCount: 0, currentOrderTotal: 0, occupiedSince: null, server: 'Ramesh Sharma' },
  { id: 3, name: 'Table 3', seats: 4, status: 'Occupied', guestCount: 3, currentOrderTotal: 57.00, occupiedSince: '19:25', server: 'Priya Patel' },
  { id: 4, name: 'Table 4', seats: 6, status: 'Reserved', guestCount: 5, currentOrderTotal: 0, occupiedSince: null, server: 'Priya Patel' },
  { id: 5, name: 'Table 5', seats: 2, status: 'Needs Cleaning', guestCount: 0, currentOrderTotal: 0, occupiedSince: null, server: 'Amit Verma' },
  { id: 6, name: 'Table 6', seats: 8, status: 'Available', guestCount: 0, currentOrderTotal: 0, occupiedSince: null, server: 'Amit Verma' },
];

export const INITIAL_ORDERS = [
  {
    id: 'ORD-1092',
    tableNumber: 3,
    customerName: 'Aarav Sharma',
    timestamp: '19:30',
    status: 'In Prep',
    assignedWaiter: 'Priya Patel',
    items: [
      { id: 'm10', name: 'Paneer Butter Masala', quantity: 2, price: 19.50, notes: 'Extra butter & medium spicy' },
      { id: 'm1', name: 'Dal Makhani Royale', quantity: 1, price: 17.99 }
    ],
    total: 56.99,
    paid: false,
    prepTimer: 10
  },
  {
    id: 'ORD-1091',
    tableNumber: 1,
    customerName: 'Ananya Gupta',
    timestamp: '19:42',
    status: 'Received',
    assignedWaiter: 'Ramesh Sharma',
    items: [
      { id: 'm5', name: 'Paneer Tikka Angaara', quantity: 1, price: 16.00 },
      { id: 'm8', name: 'Kesari Mango Lassi', quantity: 2, price: 6.50 }
    ],
    total: 29.00,
    paid: false,
    prepTimer: 12
  },
  {
    id: 'ORD-1089',
    tableNumber: 5,
    customerName: 'Rohan Mehta',
    timestamp: '18:50',
    status: 'Served',
    assignedWaiter: 'Amit Verma',
    items: [
      { id: 'm2', name: 'Hyderabadi Veg Dum Biryani', quantity: 1, price: 21.00 },
      { id: 'm9', name: 'Shahi Gulab Jamun with Rabri', quantity: 1, price: 9.50 }
    ],
    total: 30.50,
    paid: true,
    prepTimer: 0
  }
];

export const INITIAL_INVENTORY = [
  { id: 'i10', name: 'Fresh Cottage Cheese (Paneer)', category: 'Dairy', currentStock: 30, unit: 'kg', minThreshold: 8, status: 'Optimal', supplier: 'Amul Fresh Dairy' },
  { id: 'i2', name: 'Aromatic Basmati Rice', category: 'Grains', currentStock: 45, unit: 'kg', minThreshold: 10, status: 'Optimal', supplier: 'India Gate Organics' },
  { id: 'i3', name: 'Whole Black Lentils (Urad)', category: 'Pulses', currentStock: 25, unit: 'kg', minThreshold: 6, status: 'Optimal', supplier: 'Royal Spices & Grains' },
  { id: 'i4', name: 'Amul Butter & Fresh Cream', category: 'Dairy', currentStock: 20, unit: 'kg', minThreshold: 5, status: 'Optimal', supplier: 'Amul Fresh Dairy' },
  { id: 'i1', name: 'Kashmiri Red Chili & Spices', category: 'Spices', currentStock: 15, unit: 'kg', minThreshold: 3, status: 'Optimal', supplier: 'MDH Spice Supplies' },
  { id: 'i5', name: 'Alphonso Mango Pulp', category: 'Fruit', currentStock: 25, unit: 'cans', minThreshold: 6, status: 'Optimal', supplier: 'Ratnagiri Farms' },
];

export const INITIAL_RESERVATIONS = [
  { id: 'r1', customerName: 'Vikram & Family', partySize: 6, time: '20:15', date: '2026-07-25', status: 'Confirmed', phone: '+91 98765 43210', notes: 'Pure Veg Family Dinner • Require High Chair' },
  { id: 'r2', customerName: 'Neha Deshmukh', partySize: 4, time: '20:45', date: '2026-07-25', status: 'Confirmed', phone: '+91 98123 45678', notes: 'Anniversary celebration • Recommend Rabri Gulab Jamun' },
];

export const INITIAL_WAITLIST = [
  { id: 'w1', name: 'Kabir Kapoor', partySize: 3, phone: '+91 99887 76655', waitTimeEst: '15 mins', queueNo: 'Q-01', status: 'Waiting' },
  { id: 'w2', name: 'Pooja Agarwal', partySize: 2, phone: '+91 98765 12345', waitTimeEst: '25 mins', queueNo: 'Q-02', status: 'Waiting' },
];

export const SALES_ANALYTICS_DATA = [
  { time: '12 PM', sales: 480, orders: 15 },
  { time: '2 PM', sales: 750, orders: 22 },
  { time: '4 PM', sales: 380, orders: 11 },
  { time: '6 PM', sales: 1420, orders: 38 },
  { time: '8 PM', sales: 2150, orders: 54 },
  { time: '10 PM', sales: 1100, orders: 26 },
];
