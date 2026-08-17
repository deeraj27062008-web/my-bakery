// ============================================================
// PRODUCT CATALOG
// Add / edit / remove products here. They appear on Menu & Order.
// `img` = product photo (Unsplash). If it can't load, the emoji shows.
// ============================================================
const PRODUCTS = [
  // --- Cakes ---
  { id: 'c1', name: 'Classic Chocolate Cake', category: 'Cakes', price: 450, unit: '500g', desc: 'Rich chocolate sponge with dark ganache.', emoji: '🍫', img: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600&q=80&auto=format&fit=crop' },
  { id: 'c2', name: 'Red Velvet Cake', category: 'Cakes', price: 550, unit: '500g', desc: 'Soft red velvet with cream cheese frosting.', emoji: '🍰', img: 'https://images.unsplash.com/photo-1621303837174-89787a7d4729?w=600&q=80&auto=format&fit=crop' },
  { id: 'c3', name: 'Vanilla Sponge Cake', category: 'Cakes', price: 400, unit: '500g', desc: 'Light vanilla sponge with fresh cream.', emoji: '🎂', img: 'https://images.unsplash.com/photo-1562440499-64c9a111f713?w=600&q=80&auto=format&fit=crop' },
  { id: 'c4', name: 'Black Forest Cake', category: 'Cakes', price: 520, unit: '500g', desc: 'Chocolate sponge, cherries & cream.', emoji: '🍒', img: 'https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?w=600&q=80&auto=format&fit=crop' },
  { id: 'c5', name: 'Butterscotch Cake', category: 'Cakes', price: 480, unit: '500g', desc: 'Caramelised butterscotch crunch cake.', emoji: '🍮', img: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=600&q=80&auto=format&fit=crop' },
  { id: 'c6', name: 'Fruit Cake', category: 'Cakes', price: 430, unit: '500g', desc: 'Loaded with fresh seasonal fruits.', emoji: '🍓', img: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=600&q=80&auto=format&fit=crop' },

  // --- Breads ---
  { id: 'b1', name: 'Sourdough Bread', category: 'Breads', price: 180, unit: '1 loaf', desc: 'Slow fermented, crusty sourdough.', emoji: '🍞', img: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&q=80&auto=format&fit=crop' },
  { id: 'b2', name: 'Butter Croissant', category: 'Breads', price: 120, unit: '1 pc', desc: 'Flaky, buttery French croissant.', emoji: '🥐', img: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=600&q=80&auto=format&fit=crop' },
  { id: 'b3', name: 'Chocolate Croissant', category: 'Breads', price: 150, unit: '1 pc', desc: 'Croissant filled with chocolate.', emoji: '🥐', img: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=600&q=80&auto=format&fit=crop' },
  { id: 'b4', name: 'Garlic Breadsticks', category: 'Breads', price: 140, unit: '4 pcs', desc: 'Oven baked with garlic butter.', emoji: '🥖', img: 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=600&q=80&auto=format&fit=crop' },
  { id: 'b5', name: 'Whole Wheat Bread', category: 'Breads', price: 90, unit: '1 loaf', desc: 'Healthy daily bread, no preservatives.', emoji: '🍞', img: 'https://images.unsplash.com/photo-1549931319-a545dcf3bc73?w=600&q=80&auto=format&fit=crop' },

  // --- Pastries & Desserts ---
  { id: 'p1', name: 'Blueberry Muffin', category: 'Pastries', price: 80, unit: '1 pc', desc: 'Moist muffin with real blueberries.', emoji: '🧁', img: 'https://images.unsplash.com/photo-1607958996333-41aef7caefaa?w=600&q=80&auto=format&fit=crop' },
  { id: 'p2', name: 'Coffee Cupcake', category: 'Pastries', price: 90, unit: '1 pc', desc: 'Coffee sponge with coffee frosting.', emoji: '☕', img: 'https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?w=600&q=80&auto=format&fit=crop' },
  { id: 'p3', name: 'Apple Pie', category: 'Pastries', price: 350, unit: 'serves 4', desc: 'Classic apple pie with cinnamon.', emoji: '🥧', img: 'https://images.unsplash.com/photo-1519676867240-f03562e64548?w=600&q=80&auto=format&fit=crop' },
  { id: 'p4', name: 'Tiramisu Cup', category: 'Pastries', price: 160, unit: '1 cup', desc: 'Espresso-soaked ladyfingers, mascarpone.', emoji: '🍮', img: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=600&q=80&auto=format&fit=crop' },
  { id: 'p5', name: 'Cheesecake Slice', category: 'Pastries', price: 140, unit: '1 slice', desc: 'Creamy baked cheesecake, berry topping.', emoji: '🍰', img: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=600&q=80&auto=format&fit=crop' },

  // --- Cookies & Snacks ---
  { id: 's1', name: 'Chocolate Chip Cookie', category: 'Cookies', price: 60, unit: '1 pc', desc: 'Chewy cookie loaded with chocolate chips.', emoji: '🍪', img: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=600&q=80&auto=format&fit=crop' },
  { id: 's2', name: 'Cream Donuts', category: 'Cookies', price: 70, unit: '1 pc', desc: 'Soft donut filled with vanilla cream.', emoji: '🍩', img: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=600&q=80&auto=format&fit=crop' },
  { id: 's3', name: 'Brownie', category: 'Cookies', price: 75, unit: '1 pc', desc: 'Fudgy dark chocolate brownie.', emoji: '🍫', img: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=600&q=80&auto=format&fit=crop' },
  { id: 's4', name: 'Salted Caramel Tart', category: 'Cookies', price: 110, unit: '1 pc', desc: 'Buttery tart with salted caramel.', emoji: '🍯', img: 'https://images.unsplash.com/photo-1607478900766-efe13248b125?w=600&q=80&auto=format&fit=crop' },
  { id: 's5', name: 'Namkeen Cookies', category: 'Cookies', price: 100, unit: '200g', desc: 'Indian spiced savoury cookies.', emoji: '🥨', img: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=600&q=80&auto=format&fit=crop' },

  // --- Beverages ---
  { id: 'd1', name: 'Cold Coffee', category: 'Beverages', price: 110, unit: '1 cup', desc: 'Thick cold coffee with ice cream.', emoji: '🥤', img: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=600&q=80&auto=format&fit=crop' },
  { id: 'd2', name: 'Fresh Lime Soda', category: 'Beverages', price: 60, unit: '1 glass', desc: 'Sweet, salted or mixed.', emoji: '🍋', img: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=600&q=80&auto=format&fit=crop' },
  { id: 'd3', name: 'Masala Chai', category: 'Beverages', price: 40, unit: '1 cup', desc: 'Traditional Indian masala chai.', emoji: '🫖', img: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=600&q=80&auto=format&fit=crop' },
  { id: 'd4', name: 'Hot Chocolate', category: 'Beverages', price: 130, unit: '1 cup', desc: 'Silky Belgian hot chocolate.', emoji: '☕', img: 'https://images.unsplash.com/photo-1542990253-a781e04c0082?w=600&q=80&auto=format&fit=crop' },
];

// ============================================================
// OFFERS / DEALS  (shown on Offers page)
// ============================================================
const OFFERS = [
  { id: 'o1', title: 'Monsoon Madness', detail: '10% OFF on all Cakes', code: 'RAIN10', until: 'Valid till month end' },
  { id: 'o2', title: 'Donut Happy Hour', detail: 'Buy 6 Donuts, get 1 FREE', code: 'DONUT6', until: 'Every day 4–6 PM' },
  { id: 'o3', title: 'Birthday Special', detail: 'Free message writing on custom cakes', code: 'BDAY', until: 'All year' },
  { id: 'o4', title: 'Office Party Combo', detail: 'Bulk orders above ₹2,000 get 5% OFF', code: 'OFFICE5', until: 'Call to order' },
];

// ============================================================
// CUSTOM CAKE OPTIONS (shown on Custom Cakes page)
// ============================================================
const CAKE_OPTIONS = {
  flavours: ['Chocolate', 'Vanilla', 'Red Velvet', 'Butterscotch', 'Black Forest', 'Pineapple', 'Fruit', 'Blueberry', 'Mango'],
  weights: ['250g', '500g', '1kg', '1.5kg', '2kg', '3kg+'],
  occasions: ['Birthday', 'Anniversary', 'Wedding', 'Baby Shower', 'Corporate', 'Just Because'],
};
