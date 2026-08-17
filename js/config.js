// ============================================================
// STORE CONFIG — edit these values for your business
// ============================================================
const STORE = {
  name: 'FreshBakes',
  tagline: 'Local Bakery & Cafe',
  address: '12, Gandhi Street, Near City Park, Coimbatore, Tamil Nadu 641001',
  phone: '9618861300',
  phoneIntl: '919618861300', // WhatsApp number with country code (no +)
  email: 'hello@freshbakes.in',
  hours: 'Mon–Sun 8:00 AM – 10:00 PM',

  // WhatsApp business number used for all order messages
  whatsappNumber: '919618861300',

  // PhonePe payment details
  paymentMode: 'PhonePe',
  phonepeNumber: '9618861300',
  upiId: '9618861300@ybl', // UPI ID for the payment link (edit if yours differs)
  upiName: 'FreshBakes',

  // Extra convenience numbers shown on the contact page
  whatsappDisplay: '9618861300',
  phonepeDisplay: '9618861300',

  // Delivery charges (in ₹) — home delivery fee & free delivery threshold
  deliveryFee: 40,
  freeDeliveryAbove: 500,

  currency: '₹',
};

// Default admin login password (change it inside the Admin panel once logged in)
const DEFAULT_ADMIN_PASSWORD = 'admin123';
