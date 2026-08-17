import { useState, useEffect, useRef, useCallback, type MouseEvent } from 'react'

// ─── Data ────────────────────────────────────────────────────────────────────

const PRODUCTS = [
  {
    id: 1, name: 'Butter Croissant', desc: 'Flaky, golden layers of pure indulgence',
    price: 80, category: 'Pastries', emoji: '🥐',
    img: 'https://images.unsplash.com/photo-1763207291761-e27bb059d851?w=400&h=400&fit=crop&auto=format',
    badge: 'Bestseller',
  },
  {
    id: 2, name: 'Chocolate Fudge Cake', desc: 'Dark velvet ganache, moist cocoa sponge',
    price: 250, category: 'Cakes', emoji: '🍰',
    img: 'https://images.unsplash.com/photo-1576618148423-df549bcb6972?w=400&h=400&fit=crop&auto=format',
    badge: "Chef's Pick",
  },
  {
    id: 3, name: 'French Macarons (6 pcs)', desc: 'Delicate almond shells with silky fillings',
    price: 200, category: 'Sweets', emoji: '🫠',
    img: 'https://images.unsplash.com/photo-1569864358642-9d1684040f43?w=400&h=400&fit=crop&auto=format',
    badge: 'New',
  },
  {
    id: 4, name: 'Sourdough Loaf', desc: 'Slow-fermented, crisp crust, open crumb',
    price: 180, category: 'Breads', emoji: '🍞',
    img: 'https://images.unsplash.com/photo-1559811814-e2c57b5e69df?w=400&h=400&fit=crop&auto=format',
    badge: '',
  },
  {
    id: 5, name: 'Assorted Pastry Box', desc: 'A curated selection of our finest bakes',
    price: 320, category: 'Specials', emoji: '🎁',
    img: 'https://images.unsplash.com/photo-1777544575746-96654957db13?w=400&h=400&fit=crop&auto=format',
    badge: 'Limited',
  },
  {
    id: 6, name: 'Almond Croissant', desc: 'Twice-baked with frangipane & toasted almonds',
    price: 110, category: 'Pastries', emoji: '🥐',
    img: 'https://images.unsplash.com/photo-1763207291707-e2cf471ed72b?w=400&h=400&fit=crop&auto=format',
    badge: '',
  },
]

const CATEGORIES = ['All', 'Pastries', 'Cakes', 'Sweets', 'Breads', 'Specials']

type CartItem = { id: number; qty: number }
type Step = 'shop' | 'cart' | 'details' | 'payment' | 'confirmed'

// ─── Hooks ───────────────────────────────────────────────────────────────────

function useConfetti() {
  const [pieces, setPieces] = useState<{ id: number; x: number; color: string; delay: number; size: number; shape: string }[]>([])
  const fire = () => {
    const colors = ['#c8882a', '#e8a84a', '#f5c86a', '#6b3a1f', '#fdf8f0', '#e85a2a', '#d9822b']
    const shapes = ['square', 'circle', 'star']
    const newPieces = Array.from({ length: 60 }, (_, i) => ({
      id: Date.now() + i,
      x: Math.random() * 100,
      color: colors[Math.floor(Math.random() * colors.length)],
      delay: Math.random() * 2,
      size: 6 + Math.random() * 12,
      shape: shapes[Math.floor(Math.random() * shapes.length)],
    }))
    setPieces(newPieces)
    setTimeout(() => setPieces([]), 5000)
  }
  return { pieces, fire }
}

function useRipple() {
  const createRipple = useCallback((e: MouseEvent<HTMLElement>) => {
    const el = e.currentTarget
    const rect = el.getBoundingClientRect()
    const size = Math.max(rect.width, rect.height) * 2
    const x = e.clientX - rect.left - size / 2
    const y = e.clientY - rect.top - size / 2
    const ripple = document.createElement('span')
    ripple.className = 'ripple'
    ripple.style.cssText = `width:${size}px;height:${size}px;left:${x}px;top:${y}px;`
    el.appendChild(ripple)
    setTimeout(() => ripple.remove(), 600)
  }, [])
  return createRipple
}

function useTilt() {
  const ref = useRef<HTMLDivElement>(null)
  const handleMove = useCallback((e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    el.style.transform = `perspective(800px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) scale3d(1.02,1.02,1.02)`
  }, [])
  const handleLeave = useCallback(() => {
    if (ref.current) ref.current.style.transform = 'perspective(800px) rotateY(0) rotateX(0) scale3d(1,1,1)'
  }, [])
  return { ref, handleMove, handleLeave }
}

// ─── Particles Background ────────────────────────────────────────────────────

function Particles() {
  const particles = useRef(Array.from({ length: 18 }, (_, i) => ({
    id: i,
    size: 3 + Math.random() * 5,
    left: Math.random() * 100,
    delay: Math.random() * 12,
    duration: 10 + Math.random() * 14,
    opacity: 0.15 + Math.random() * 0.25,
  }))).current

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map(p => (
        <div key={p.id} className="particle"
          style={{
            width: p.size, height: p.size,
            left: `${p.left}%`, bottom: '-5%',
            background: `rgba(245,200,106,${p.opacity})`,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
          }} />
      ))}
    </div>
  )
}

// ─── Cursor Glow ─────────────────────────────────────────────────────────────

function CursorGlow() {
  const [pos, setPos] = useState({ x: -200, y: -200 })
  useEffect(() => {
    const handler = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY })
    window.addEventListener('mousemove', handler)
    return () => window.removeEventListener('mousemove', handler)
  }, [])
  return <div className="cursor-glow hidden sm:block" style={{ left: pos.x, top: pos.y }} />
}

// ─── Image with Skeleton ─────────────────────────────────────────────────────

function ProductImage({ src, alt, emoji }: { src: string; alt: string; emoji: string }) {
  const [state, setState] = useState<'loading' | 'loaded' | 'error'>('loading')
  return (
    <div className="relative w-full h-full">
      {state === 'loading' && (
        <div className="absolute inset-0 skeleton" />
      )}
      {state !== 'error' && (
        <img
          src={src} alt={alt}
          onLoad={() => setState('loaded')}
          onError={() => setState('error')}
          className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-110 ${
            state === 'loaded' ? 'opacity-100' : 'opacity-0'
          }`}
        />
      )}
      {(state === 'loading' || state === 'error') && (
        <div className="absolute inset-0 flex items-center justify-center text-5xl"
          style={{ background: 'linear-gradient(135deg, #f5eddc, #ede0cf)' }}>
          {emoji}
        </div>
      )}
    </div>
  )
}

// ─── Product Card ────────────────────────────────────────────────────────────

function ProductCard({ p, qty, onAdd, onRemove, index }: {
  p: typeof PRODUCTS[0]; qty: number
  onAdd: () => void; onRemove: () => void; index: number
}) {
  const tilt = useTilt()
  const ripple = useRipple()
  const [justAdded, setJustAdded] = useState(false)

  const handleAdd = () => {
    onAdd()
    setJustAdded(true)
    setTimeout(() => setJustAdded(false), 400)
  }

  return (
    <div className="card-3d w-full">
      <div
        ref={tilt.ref}
        className="card-3d-inner rounded-2xl overflow-hidden group cursor-pointer w-full"
        onMouseMove={tilt.handleMove}
        onMouseLeave={tilt.handleLeave}
        style={{
          background: '#fffdf8',
          border: '1px solid rgba(61,31,14,0.08)',
        }}
      >
        <div className="relative overflow-hidden" style={{ height: 210, background: 'linear-gradient(135deg, #f5eddc, #ede0cf)' }}>
          <ProductImage src={p.img} alt={p.name} emoji={p.emoji} />

          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{ background: 'linear-gradient(to top, rgba(61,31,14,0.55) 0%, transparent 55%)' }} />

          {p.badge && (
            <span className="absolute top-3 left-3 text-xs font-bold px-3 py-1.5 rounded-full tracking-wide"
              style={{
                background: 'linear-gradient(135deg,#c8882a,#e8a84a)',
                color: '#fdf8f0',
                fontFamily: "'DM Sans'",
                boxShadow: '0 4px 12px rgba(200,136,42,0.35)',
              }}>
              {p.badge}
            </span>
          )}

          <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-400 translate-y-3 group-hover:translate-y-0">
            <span className="glass text-xs font-semibold px-3 py-1.5 rounded-xl" style={{ color: '#3d1f0e' }}>
              {p.category}
            </span>
          </div>
        </div>

        <div className="p-5">
          <h3 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 600, fontSize: '1.1rem', color: '#3d1f0e', lineHeight: 1.3 }}>
            {p.name}
          </h3>
          <p className="text-sm mt-1.5 mb-4" style={{ color: '#8a7468', fontFamily: "'Lora', serif", fontStyle: 'italic', lineHeight: 1.5 }}>
            {p.desc}
          </p>
          <div className="flex items-center justify-between">
            <span style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: '1.2rem', color: '#c8882a' }}>
              ₹{p.price}
            </span>
            {qty === 0 ? (
              <button onClick={(e) => { ripple(e); handleAdd() }}
                className="btn-primary ripple-container rounded-xl px-5 py-2.5 text-sm flex items-center gap-1.5">
                <span className="text-base leading-none">+</span> Add
              </button>
            ) : (
              <div className="flex items-center gap-2.5">
                <button onClick={onRemove}
                  className="w-9 h-9 rounded-full flex items-center justify-center text-lg font-bold transition-all hover:scale-110 active:scale-90"
                  style={{ background: '#f5eddc', color: '#c8882a', border: '1.5px solid rgba(200,136,42,0.25)' }}>
                  −
                </button>
                <span key={qty} className="w-7 text-center font-bold qty-bounce" style={{ color: '#3d1f0e', fontFamily: "'DM Sans'" }}>
                  {qty}
                </span>
                <button onClick={(e) => { ripple(e); handleAdd() }}
                  className="w-9 h-9 rounded-full flex items-center justify-center text-lg font-bold transition-all hover:scale-110 active:scale-90 ripple-container"
                  style={{ background: 'linear-gradient(135deg,#c8882a,#e8a84a)', color: '#fdf8f0' }}>
                  +
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Step Indicator ──────────────────────────────────────────────────────────

function Steps({ step }: { step: Step }) {
  const steps: { key: Step; label: string; icon: string }[] = [
    { key: 'shop', label: 'Menu', icon: '🛍️' },
    { key: 'cart', label: 'Cart', icon: '🛒' },
    { key: 'details', label: 'Details', icon: '📋' },
    { key: 'payment', label: 'Payment', icon: '💳' },
    { key: 'confirmed', label: 'Done', icon: '✅' },
  ]
  const idx = steps.findIndex(s => s.key === step)
  const progress = ((idx) / (steps.length - 1)) * 100

  return (
    <div className="mb-8">
      <div className="flex items-center justify-center gap-0">
        {steps.map((s, i) => (
          <div key={s.key} className="flex items-center">
            <div className="flex flex-col items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm transition-all duration-500 step-dot ${
                i < idx ? 'step-active-glow' : ''
              }`}
                style={{
                  background: i < idx ? '#c8882a' : i === idx ? 'linear-gradient(135deg,#c8882a,#e8a84a)' : '#f5eddc',
                  color: i <= idx ? '#fdf8f0' : '#8a7468',
                  boxShadow: i === idx ? '0 6px 20px rgba(200,136,42,0.4)' : i < idx ? '0 4px 12px rgba(200,136,42,0.25)' : 'none',
                  transform: i === idx ? 'scale(1.18)' : 'scale(1)',
                }}>
                {i < idx ? '✓' : s.icon}
              </div>
              <span className="text-xs mt-1.5 font-semibold hidden sm:block"
                style={{ color: i <= idx ? '#c8882a' : '#8a7468', fontFamily: "'DM Sans'" }}>
                {s.label}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div className="w-8 sm:w-14 h-0.5 mx-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(61,31,14,0.08)' }}>
                <div className="h-full rounded-full transition-all duration-700"
                  style={{
                    width: i < idx ? '100%' : i === idx ? '50%' : '0%',
                    background: 'linear-gradient(90deg, #c8882a, #e8a84a)',
                  }} />
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="progress-track mt-4 mx-auto" style={{ maxWidth: 320 }}>
        <div className="progress-fill" style={{ width: `${progress}%` }} />
      </div>
    </div>
  )
}

// ─── Hero ────────────────────────────────────────────────────────────────────

function Hero({ cartCount, onCartClick }: { cartCount: number; onCartClick: () => void }) {
  return (
    <div className="relative overflow-hidden" style={{
      background: 'linear-gradient(135deg, #2a1508 0%, #3d1f0e 25%, #6b3a1f 55%, #8b4c2a 100%)',
      minHeight: 300,
    }}>
      <Particles />

      <div className="absolute inset-0 opacity-10" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
      }} />

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="animate-float absolute opacity-20" style={{ top: 15, right: '6%', width: 140, height: 140, borderRadius: '40% 60% 60% 40% / 40% 40% 60% 60%' }}>
          <img src="https://images.unsplash.com/photo-1763207291761-e27bb059d851?w=280&h=280&fit=crop&auto=format"
            alt="" className="w-full h-full object-cover animate-morph" style={{ filter: 'saturate(1.3) brightness(1.1)' }} />
        </div>
        <div className="animate-float-delay absolute opacity-15" style={{ top: -15, right: '26%', width: 100, height: 100 }}>
          <img src="https://images.unsplash.com/photo-1569864358642-9d1684040f43?w=200&h=200&fit=crop&auto=format"
            alt="" className="w-full h-full object-cover rounded-full" />
        </div>
        <div className="animate-float-delay2 absolute opacity-15" style={{ bottom: -5, right: '14%', width: 90, height: 90 }}>
          <img src="https://images.unsplash.com/photo-1576618148423-df549bcb6972?w=180&h=180&fit=crop&auto=format"
            alt="" className="w-full h-full object-cover rounded-full" />
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0" style={{ height: 50 }}>
        <svg viewBox="0 0 1200 50" preserveAspectRatio="none" style={{ width: '100%', height: '100%' }}>
          <path d="M0,50 Q300,5 600,25 Q900,45 1200,10 L1200,50 L0,50 Z" fill="#fdf8f0" />
        </svg>
      </div>

      <div className="relative z-10 px-6 pt-12 pb-16 flex items-start justify-between max-w-4xl mx-auto">
        <div className="animate-fade-up">
          <div className="flex items-center gap-2.5 mb-3">
            <span className="text-3xl">🥐</span>
            <span className="text-sm font-bold tracking-[0.2em] uppercase" style={{ color: 'rgba(245,200,106,0.85)', fontFamily: "'DM Sans'" }}>
              FreshBakes
            </span>
          </div>
          <h1 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(2.2rem, 5.5vw, 3.4rem)',
            fontWeight: 700,
            color: '#fdf8f0',
            lineHeight: 1.08,
            letterSpacing: '-0.025em',
          }}>
            Place Your <span className="shimmer-text">Order</span>
          </h1>
          <p className="mt-3 text-base" style={{ color: 'rgba(245,220,180,0.7)', fontFamily: "'Lora', serif", fontStyle: 'italic' }}>
            Baked fresh every morning — picked or delivered to you
          </p>
        </div>
        <button onClick={onCartClick}
          className="relative flex items-center gap-2.5 px-5 py-3 rounded-2xl transition-all hover:scale-105 active:scale-95 animate-fade-up"
          style={{
            background: 'rgba(245,200,106,0.12)',
            border: '1.5px solid rgba(245,200,106,0.25)',
            color: '#fdf8f0',
            backdropFilter: 'blur(12px)',
          }}>
          <span className="text-xl">🛒</span>
          <span className="font-semibold text-sm" style={{ fontFamily: "'DM Sans'" }}>Cart</span>
          {cartCount > 0 && (
            <span key={cartCount} className="absolute -top-2.5 -right-2.5 w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center qty-bounce"
              style={{ background: 'linear-gradient(135deg, #e85a2a, #d94520)', color: '#fff', boxShadow: '0 4px 12px rgba(232,90,42,0.5)' }}>
              {cartCount}
            </span>
          )}
        </button>
      </div>
    </div>
  )
}

// ─── Shop Step ───────────────────────────────────────────────────────────────

function ShopStep({ cart, onAdd, onRemove, onNext }: {
  cart: CartItem[]; onAdd: (id: number) => void
  onRemove: (id: number) => void; onNext: () => void
}) {
  const [cat, setCat] = useState('All')
  const filtered = cat === 'All' ? PRODUCTS : PRODUCTS.filter(p => p.category === cat)
  const totalItems = cart.reduce((s, i) => s + i.qty, 0)
  const ripple = useRipple()

  return (
    <div className="page-enter">
      <div className="flex gap-2.5 overflow-x-auto pb-3 mb-8 hide-scrollbar" style={{ scrollbarWidth: 'none' }}>
        {CATEGORIES.map(c => (
          <button key={c} onClick={(e) => { ripple(e); setCat(c) }}
            className={`cat-pill whitespace-nowrap px-5 py-2.5 rounded-full text-sm font-semibold shrink-0 ripple-container ${
              cat === c ? 'active' : ''
            }`}
            style={{
              background: cat === c ? undefined : 'rgba(61,31,14,0.06)',
              color: cat === c ? undefined : '#6b3a1f',
              fontFamily: "'DM Sans'",
              border: 'none',
            }}>
            {c}
          </button>
        ))}
      </div>

      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
        {filtered.map((p, i) => {
          const item = cart.find(c => c.id === p.id)
          return (
            <ProductCard
              key={p.id} p={p} index={i}
              qty={item?.qty ?? 0}
              onAdd={() => onAdd(p.id)}
              onRemove={() => onRemove(p.id)}
            />
          )
        })}
      </div>

      {totalItems > 0 && (
        <div className="sticky bottom-5 z-10 animate-slide-up">
          <button onClick={(e) => { ripple(e); onNext() }}
            className="btn-primary ripple-container w-full py-4.5 rounded-2xl text-base flex items-center justify-center gap-3"
            style={{ boxShadow: '0 8px 30px rgba(200,136,42,0.4)' }}>
            <span>View Cart</span>
            <span className="w-7 h-7 rounded-full bg-white flex items-center justify-center text-sm font-bold"
              style={{ color: '#c8882a' }}>
              {totalItems}
            </span>
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </button>
        </div>
      )}
    </div>
  )
}

// ─── Cart Step ───────────────────────────────────────────────────────────────

function CartStep({ cart, onAdd, onRemove, onNext, onBack }: {
  cart: CartItem[]; onAdd: (id: number) => void
  onRemove: (id: number) => void; onNext: () => void; onBack: () => void
}) {
  const items = cart.filter(c => c.qty > 0).map(c => ({ ...c, product: PRODUCTS.find(p => p.id === c.id)! }))
  const subtotal = items.reduce((s, i) => s + i.qty * i.product.price, 0)
  const gst = Math.round(subtotal * 0.05)
  const total = subtotal + gst
  const ripple = useRipple()

  if (items.length === 0) {
    return (
      <div className="animate-scale-in text-center py-20">
        <div className="text-7xl mb-5 animate-float">🛒</div>
        <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.5rem', color: '#3d1f0e' }}>Your cart is empty</h3>
        <p className="mt-2.5 text-sm" style={{ color: '#8a7468' }}>Add some delicious bakes to get started</p>
        <button onClick={onBack} className="btn-primary mt-7 px-10 py-3.5 rounded-xl inline-block">
          ← Browse Menu
        </button>
      </div>
    )
  }

  return (
    <div className="page-enter max-w-lg mx-auto">
      <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.6rem', color: '#3d1f0e', marginBottom: 24 }}>
        Your Cart 🛒
      </h2>

      <div className="section-card p-5 mb-5 space-y-0">
        {items.map(({ id, qty, product: p }, i) => (
          <div key={id} className="flex items-center gap-4 py-3 border-b last:border-0"
            style={{ borderColor: 'rgba(61,31,14,0.07)' }}>
            <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0" style={{ background: 'linear-gradient(135deg, #f5eddc, #ede0cf)' }}>
              <img src={p.img} alt={p.name} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-sm truncate" style={{ fontFamily: "'DM Sans'", color: '#3d1f0e' }}>{p.name}</p>
              <p className="text-xs mt-0.5" style={{ color: '#8a7468' }}>₹{p.price} each</p>
            </div>
            <div className="flex items-center gap-2.5 shrink-0">
              <button onClick={() => onRemove(id)}
                className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all hover:scale-110 active:scale-90"
                style={{ background: '#f5eddc', color: '#c8882a', border: '1.5px solid rgba(200,136,42,0.2)' }}>
                −
              </button>
              <span key={qty} className="w-6 text-center text-sm font-bold qty-bounce" style={{ color: '#3d1f0e' }}>{qty}</span>
              <button onClick={() => onAdd(id)}
                className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all hover:scale-110 active:scale-90"
                style={{ background: 'linear-gradient(135deg,#c8882a,#e8a84a)', color: '#fdf8f0' }}>
                +
              </button>
            </div>
            <span className="text-sm font-bold w-16 text-right shrink-0" style={{ color: '#c8882a', fontFamily: "'Playfair Display', serif" }}>
              ₹{qty * p.price}
            </span>
          </div>
        ))}
      </div>

      <div className="section-card p-5 mb-7">
        <h3 className="text-sm font-bold mb-3.5" style={{ color: '#6b3a1f', fontFamily: "'DM Sans'" }}>🧾 Bill Summary</h3>
        <div className="space-y-2.5 text-sm">
          <div className="flex justify-between" style={{ color: '#8a7468' }}>
            <span>Subtotal</span><span>₹{subtotal}</span>
          </div>
          <div className="flex justify-between" style={{ color: '#8a7468' }}>
            <span>GST (5%)</span><span>₹{gst}</span>
          </div>
          <div className="flex justify-between font-bold text-base pt-3 border-t" style={{ borderColor: 'rgba(61,31,14,0.08)', color: '#3d1f0e', fontFamily: "'Playfair Display', serif" }}>
            <span>Total</span><span className="shimmer-text">₹{total}</span>
          </div>
        </div>
      </div>

      <div className="flex gap-3.5">
        <button onClick={onBack} className="flex-1 py-4 rounded-xl font-semibold text-sm transition-all hover:scale-[1.02] active:scale-[0.98]"
          style={{ background: '#f5eddc', color: '#6b3a1f', fontFamily: "'DM Sans'", border: 'none', cursor: 'pointer' }}>
          ← Menu
        </button>
        <button onClick={(e) => { ripple(e); onNext() }}
          className="btn-primary ripple-container flex-[2] py-4 rounded-xl text-sm">
          Continue to Details →
        </button>
      </div>
    </div>
  )
}

// ─── Details Step ────────────────────────────────────────────────────────────

function DetailsStep({ onNext, onBack, form, setForm }: {
  onNext: () => void; onBack: () => void
  form: Record<string, string>; setForm: (f: Record<string, string>) => void
}) {
  const [errors, setErrors] = useState<Record<string, string>>({})
  const ripple = useRipple()
  const set = (k: string, v: string) => setForm({ ...form, [k]: v })

  const validate = () => {
    const e: Record<string, string> = {}
    if (!form.name?.trim()) e.name = 'Name is required'
    if (!form.phone?.trim() || !/^\d{10}$/.test(form.phone.trim())) e.phone = 'Enter a valid 10-digit number'
    if (form.delivery === 'home' && !form.address?.trim()) e.address = 'Address is required for home delivery'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  return (
    <div className="page-enter max-w-lg mx-auto">
      <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.6rem', color: '#3d1f0e', marginBottom: 24 }}>
        Your Details 📋
      </h2>

      <div className="section-card p-6 mb-5 space-y-5">
        <div className="animate-fade-up">
          <label className="block text-xs font-bold mb-2 uppercase tracking-wider" style={{ color: '#8a7468', fontFamily: "'DM Sans'" }}>
            Full Name *
          </label>
          <input className="input-field" placeholder="e.g. Meera Krishnan" value={form.name ?? ''} onChange={e => set('name', e.target.value)} />
          {errors.name && <p className="text-xs mt-1.5 font-medium animate-fade-in" style={{ color: '#e85a2a' }}>{errors.name}</p>}
        </div>
        <div className="animate-fade-up">
          <label className="block text-xs font-bold mb-2 uppercase tracking-wider" style={{ color: '#8a7468', fontFamily: "'DM Sans'" }}>
            Phone Number *
          </label>
          <input className="input-field" placeholder="10-digit mobile number" value={form.phone ?? ''} onChange={e => set('phone', e.target.value)} maxLength={10} />
          {errors.phone && <p className="text-xs mt-1.5 font-medium animate-fade-in" style={{ color: '#e85a2a' }}>{errors.phone}</p>}
        </div>
        <div className="animate-fade-up">
          <label className="block text-xs font-bold mb-2.5 uppercase tracking-wider" style={{ color: '#8a7468', fontFamily: "'DM Sans'" }}>
            Delivery Preference
          </label>
          <div className="flex gap-3">
            {[{ v: 'pickup', label: '🏪 Pickup', sub: 'Ready in 30 min' }, { v: 'home', label: '🛵 Home Delivery', sub: '45–60 min' }].map(opt => (
              <button key={opt.v} onClick={() => set('delivery', opt.v)}
                className="flex-1 py-3.5 px-4 rounded-xl text-left transition-all duration-300"
                style={{
                  border: `2px solid ${form.delivery === opt.v ? '#c8882a' : 'rgba(61,31,14,0.1)'}`,
                  background: form.delivery === opt.v ? 'rgba(200,136,42,0.06)' : 'white',
                  cursor: 'pointer',
                  boxShadow: form.delivery === opt.v ? '0 4px 16px rgba(200,136,42,0.12)' : 'none',
                  transform: form.delivery === opt.v ? 'scale(1.02)' : 'scale(1)',
                }}>
                <p className="text-sm font-bold" style={{ color: '#3d1f0e', fontFamily: "'DM Sans'" }}>{opt.label}</p>
                <p className="text-xs mt-0.5" style={{ color: '#8a7468' }}>{opt.sub}</p>
              </button>
            ))}
          </div>
        </div>
        {form.delivery === 'home' && (
          <div className="animate-fade-up">
            <label className="block text-xs font-bold mb-2 uppercase tracking-wider" style={{ color: '#8a7468', fontFamily: "'DM Sans'" }}>
              Delivery Address *
            </label>
            <textarea className="input-field" rows={3} placeholder="House/flat, street, landmark, city…"
              value={form.address ?? ''} onChange={e => set('address', e.target.value)} />
            {errors.address && <p className="text-xs mt-1.5 font-medium animate-fade-in" style={{ color: '#e85a2a' }}>{errors.address}</p>}
          </div>
        )}
        <div className="animate-fade-up">
          <label className="block text-xs font-bold mb-2 uppercase tracking-wider" style={{ color: '#8a7468', fontFamily: "'DM Sans'" }}>
            Special Notes
          </label>
          <textarea className="input-field" rows={2} placeholder="Allergies, customisation, occasion…"
            value={form.notes ?? ''} onChange={e => set('notes', e.target.value)} />
        </div>
      </div>

      <div className="flex gap-3.5">
        <button onClick={onBack} className="flex-1 py-4 rounded-xl font-semibold text-sm transition-all hover:scale-[1.02] active:scale-[0.98]"
          style={{ background: '#f5eddc', color: '#6b3a1f', fontFamily: "'DM Sans'", border: 'none', cursor: 'pointer' }}>
          ← Cart
        </button>
        <button onClick={(e) => { if (validate()) { ripple(e); onNext() } }} className="btn-primary ripple-container flex-[2] py-4 rounded-xl text-sm">
          Choose Payment →
        </button>
      </div>
    </div>
  )
}

// ─── Payment Step ────────────────────────────────────────────────────────────

function PaymentStep({ cart, form, onNext, onBack }: {
  cart: CartItem[]; form: Record<string, string>
  onNext: (method: string) => void; onBack: () => void
}) {
  const [method, setMethod] = useState('')
  const [showUPI, setShowUPI] = useState(false)
  const ripple = useRipple()

  const items = cart.filter(c => c.qty > 0).map(c => ({ ...c, product: PRODUCTS.find(p => p.id === c.id)! }))
  const subtotal = items.reduce((s, i) => s + i.qty * i.product.price, 0)
  const total = subtotal + Math.round(subtotal * 0.05)

  const buildWhatsApp = () => {
    const lines = [
      `🥐 *FreshBakes Order*`, ``,
      `*Customer:* ${form.name}`, `*Phone:* ${form.phone}`,
      `*Delivery:* ${form.delivery === 'home' ? `Home – ${form.address}` : 'Store Pickup'}`, ``,
      `*Items:*`,
      ...items.map(i => `• ${i.product.name} × ${i.qty} = ₹${i.qty * i.product.price}`),
      ``, `*Total: ₹${total}* (incl. GST)`,
      `*Payment:* ${method === 'upi' ? 'PhonePe/UPI' : 'Cash on Delivery'}`,
      form.notes ? `*Notes:* ${form.notes}` : '',
    ].filter(Boolean).join('\n')
    return `https://wa.me/919618861300?text=${encodeURIComponent(lines)}`
  }

  return (
    <div className="page-enter max-w-lg mx-auto">
      <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.6rem', color: '#3d1f0e', marginBottom: 24 }}>
        Payment 💳
      </h2>

      <div className="section-card p-5 mb-5">
        <p className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: '#8a7468' }}>Order Summary</p>
        {items.map(i => (
          <div key={i.id} className="flex justify-between text-sm py-1.5" style={{ color: '#6b3a1f' }}>
            <span>{i.product.name} × {i.qty}</span>
            <span>₹{i.qty * i.product.price}</span>
          </div>
        ))}
        <div className="flex justify-between font-bold text-base mt-3 pt-3 border-t" style={{ borderColor: 'rgba(61,31,14,0.08)', color: '#3d1f0e', fontFamily: "'Playfair Display', serif" }}>
          <span>Total</span><span className="shimmer-text">₹{total}</span>
        </div>
      </div>

      <div className="space-y-3.5 mb-7">
        {[
          { id: 'upi', icon: '📱', title: 'PhonePe / UPI', sub: 'Scan QR or pay via app — instant confirmation' },
          { id: 'cod', icon: '💵', title: 'Cash on Delivery', sub: 'Pay when your order arrives or at pickup' },
        ].map((opt, i) => (
          <button key={opt.id} onClick={() => { setMethod(opt.id); if (opt.id === 'upi') setShowUPI(true) }}
            className="w-full p-5 rounded-xl text-left transition-all duration-300"
            style={{
              border: `2px solid ${method === opt.id ? '#c8882a' : 'rgba(61,31,14,0.1)'}`,
              background: method === opt.id ? 'rgba(200,136,42,0.06)' : 'white',
              cursor: 'pointer',
              boxShadow: method === opt.id ? '0 4px 20px rgba(200,136,42,0.12)' : 'none',
              transform: method === opt.id ? 'scale(1.01)' : 'scale(1)',
            }}>
            <div className="flex items-start gap-4">
              <span className="text-2xl">{opt.icon}</span>
              <div className="flex-1">
                <p className="font-bold text-sm" style={{ color: '#3d1f0e', fontFamily: "'DM Sans'" }}>{opt.title}</p>
                <p className="text-xs mt-1" style={{ color: '#8a7468' }}>{opt.sub}</p>
              </div>
              <div className="mt-1">
                <div className="w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-300"
                  style={{
                    borderColor: method === opt.id ? '#c8882a' : 'rgba(61,31,14,0.2)',
                    transform: method === opt.id ? 'scale(1.1)' : 'scale(1)',
                  }}>
                  {method === opt.id && <div className="w-2.5 h-2.5 rounded-full animate-bounce-in" style={{ background: '#c8882a' }} />}
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>

      {showUPI && method === 'upi' && (
        <div className="section-card p-6 mb-7 text-center animate-scale-in">
          <p className="text-sm font-bold mb-4" style={{ color: '#6b3a1f', fontFamily: "'DM Sans'" }}>Scan to Pay ₹{total}</p>
          <div className="mx-auto w-40 h-40 rounded-2xl flex items-center justify-center mb-4 animate-morph"
            style={{ background: 'linear-gradient(135deg,#f5eddc,#e8ddd1)', border: '2px dashed rgba(200,136,42,0.3)' }}>
            <div className="text-5xl">📲</div>
          </div>
          <p className="text-sm font-semibold" style={{ color: '#3d1f0e' }}>UPI ID: 9618861300@ybl</p>
          <p className="text-xs mt-1.5" style={{ color: '#8a7468' }}>After payment, click confirm below</p>
        </div>
      )}

      <div className="flex gap-3.5">
        <button onClick={onBack} className="flex-1 py-4 rounded-xl font-semibold text-sm transition-all hover:scale-[1.02] active:scale-[0.98]"
          style={{ background: '#f5eddc', color: '#6b3a1f', fontFamily: "'DM Sans'", border: 'none', cursor: 'pointer' }}>
          ← Back
        </button>
        {method === 'upi' ? (
          <a href={buildWhatsApp()} target="_blank" rel="noreferrer"
            onClick={() => setTimeout(() => onNext(method), 500)}
            className="btn-primary flex-[2] py-4 rounded-xl text-center flex items-center justify-center gap-2.5 text-sm no-underline">
            ✅ I've Paid — Confirm via WhatsApp
          </a>
        ) : method === 'cod' ? (
          <a href={buildWhatsApp()} target="_blank" rel="noreferrer"
            onClick={() => setTimeout(() => onNext(method), 500)}
            className="btn-primary flex-[2] py-4 rounded-xl text-center flex items-center justify-center gap-2.5 text-sm no-underline">
            💬 Order via WhatsApp
          </a>
        ) : (
          <button disabled className="flex-[2] py-4 rounded-xl text-sm font-medium"
            style={{ background: '#e8ddd1', color: '#8a7468', cursor: 'not-allowed', fontFamily: "'DM Sans'", border: 'none' }}>
            Select a Payment Method
          </button>
        )}
      </div>
    </div>
  )
}

// ─── Confirmed Step ──────────────────────────────────────────────────────────

function ConfirmedStep({ orderId, onReset }: { orderId: string; onReset: () => void }) {
  const { pieces, fire } = useConfetti()
  const ripple = useRipple()

  useEffect(() => { fire() }, [])

  return (
    <div className="page-enter max-w-md mx-auto text-center py-8">
      {pieces.map(p => (
        <div key={p.id} className={`confetti-piece ${p.shape}`}
          style={{
            left: `${p.x}%`, background: p.color,
            width: p.size, height: p.size,
            animationDuration: `${2 + Math.random() * 2.5}s`,
            animationDelay: `${p.delay}s`,
          }} />
      ))}

      <div className="w-28 h-28 rounded-full mx-auto mb-7 flex items-center justify-center animate-bounce-in"
        style={{ background: 'linear-gradient(135deg, #c8882a, #e8a84a)', boxShadow: '0 12px 40px rgba(200,136,42,0.45)' }}>
        <span className="text-5xl">✅</span>
      </div>

      <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '2rem', color: '#3d1f0e', fontWeight: 700 }}>
        Order Placed!
      </h2>
      <p className="mt-3 text-base" style={{ color: '#8a7468', fontFamily: "'Lora', serif", fontStyle: 'italic' }}>
        Your bakes are being prepared with love.
      </p>

      <div className="section-card px-7 py-5 mt-7 mb-7 inline-block w-full">
        <p className="text-xs font-bold uppercase tracking-wider mb-1.5" style={{ color: '#8a7468', fontFamily: "'DM Sans'" }}>Order ID</p>
        <p className="text-2xl font-bold" style={{ fontFamily: "'Playfair Display', serif", color: '#c8882a' }}>
          {orderId}
        </p>
      </div>

      <div className="section-card p-5 mb-7 text-left">
        <p className="text-sm font-bold mb-3" style={{ color: '#3d1f0e', fontFamily: "'DM Sans'" }}>What's next?</p>
        {[
          { icon: '💬', text: "We'll confirm your order via WhatsApp shortly" },
          { icon: '🔔', text: "You'll receive a notification when it's ready" },
          { icon: '⏱️', text: 'Pickup: ~30 min · Delivery: 45–60 min' },
        ].map((s, i) => (
          <div key={i} className="flex gap-3.5 items-start py-2.5 border-b last:border-0"
            style={{ borderColor: 'rgba(61,31,14,0.07)' }}>
            <span className="text-lg shrink-0">{s.icon}</span>
            <p className="text-sm" style={{ color: '#6b3a1f', fontFamily: "'DM Sans'" }}>{s.text}</p>
          </div>
        ))}
      </div>

      <button onClick={(e) => { ripple(e); onReset() }}
        className="btn-primary ripple-container w-full py-4.5 rounded-2xl text-base"
        style={{ boxShadow: '0 8px 30px rgba(200,136,42,0.4)' }}>
        🥐 Order Again
      </button>
    </div>
  )
}

// ─── App ─────────────────────────────────────────────────────────────────────

export default function App() {
  const [step, setStep] = useState<Step>('shop')
  const [cart, setCart] = useState<CartItem[]>([])
  const [form, setForm] = useState<Record<string, string>>({ delivery: 'pickup' })
  const [orderId] = useState(`FB-${Date.now().toString(36).toUpperCase().slice(-6)}`)
  const [showTop, setShowTop] = useState(false)
  const topRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handler = () => setShowTop(window.scrollY > 400)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  const scrollTop = () => topRef.current?.scrollIntoView({ behavior: 'smooth' })

  const addItem = (id: number) => {
    setCart(prev => {
      const ex = prev.find(c => c.id === id)
      if (ex) return prev.map(c => c.id === id ? { ...c, qty: c.qty + 1 } : c)
      return [...prev, { id, qty: 1 }]
    })
  }

  const removeItem = (id: number) => {
    setCart(prev => prev.map(c => c.id === id ? { ...c, qty: Math.max(0, c.qty - 1) } : c).filter(c => c.qty > 0))
  }

  const go = (s: Step) => { setStep(s); setTimeout(scrollTop, 50) }
  const totalItems = cart.reduce((s, i) => s + i.qty, 0)

  return (
    <div ref={topRef} className="w-full" style={{ background: '#fdf8f0', minHeight: '100vh' }}>
      <CursorGlow />
      <Hero cartCount={totalItems} onCartClick={() => go('cart')} />

      <div className="w-full px-4 sm:px-6 py-8 max-w-4xl mx-auto relative z-10">
        {step !== 'confirmed' && <Steps step={step} />}

        {step === 'shop' && <ShopStep cart={cart} onAdd={addItem} onRemove={removeItem} onNext={() => go('cart')} />}
        {step === 'cart' && <CartStep cart={cart} onAdd={addItem} onRemove={removeItem} onNext={() => go('details')} onBack={() => go('shop')} />}
        {step === 'details' && <DetailsStep form={form} setForm={setForm} onNext={() => go('payment')} onBack={() => go('cart')} />}
        {step === 'payment' && <PaymentStep cart={cart} form={form} onNext={() => go('confirmed')} onBack={() => go('details')} />}
        {step === 'confirmed' && <ConfirmedStep orderId={orderId} onReset={() => { setCart([]); setForm({ delivery: 'pickup' }); go('shop') }} />}
      </div>

      <div className="w-full text-center py-10 mt-6 border-t" style={{ borderColor: 'rgba(61,31,14,0.06)' }}>
        <p className="text-sm" style={{ color: '#8a7468', fontFamily: "'Lora', serif", fontStyle: 'italic' }}>
          🥐 FreshBakes — Baked with love, every morning
        </p>
      </div>

      {showTop && (
        <button onClick={scrollTop} className="fab animate-bounce-in" aria-label="Back to top">
          ↑
        </button>
      )}
    </div>
  )
}
