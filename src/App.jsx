import { useMemo, useState } from 'react';
import HeroSection from './components/HeroSection';
import ProductCatalog from './components/ProductCatalog';
import Cart from './components/Cart';
import CheckoutPanel from './components/CheckoutPanel';

const INITIAL_PRODUCTS = [
  { id: 'p1', name: 'Wireless Reader', price: 129.99, category: 'Hardware', color: 'from-teal-500 to-cyan-500' },
  { id: 'p2', name: 'Smart Terminal', price: 329.0, category: 'Hardware', color: 'from-indigo-500 to-blue-500' },
  { id: 'p3', name: 'Receipt Paper (10x)', price: 19.99, category: 'Supplies', color: 'from-amber-500 to-orange-500' },
  { id: 'p4', name: 'Cash Drawer', price: 89.5, category: 'Hardware', color: 'from-emerald-500 to-green-500' },
  { id: 'p5', name: 'Barcode Scanner', price: 59.0, category: 'Hardware', color: 'from-fuchsia-500 to-pink-500' },
  { id: 'p6', name: 'Service Plan (1y)', price: 149.0, category: 'Service', color: 'from-sky-500 to-blue-400' },
];

export default function App() {
  const [products] = useState(INITIAL_PRODUCTS);
  const [cart, setCart] = useState({}); // id -> { id, name, price, qty }
  const [discountPct, setDiscountPct] = useState(0);
  const [note, setNote] = useState('');
  const taxRate = 0.0825;

  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev[product.id];
      const qty = existing ? existing.qty + 1 : 1;
      return { ...prev, [product.id]: { id: product.id, name: product.name, price: product.price, qty } };
    });
  };

  const increment = (id) => setCart((prev) => ({ ...prev, [id]: { ...prev[id], qty: prev[id].qty + 1 } }));

  const decrement = (id) =>
    setCart((prev) => {
      const item = prev[id];
      if (!item) return prev;
      const nextQty = item.qty - 1;
      if (nextQty <= 0) {
        const { [id]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [id]: { ...item, qty: nextQty } };
    });

  const removeItem = (id) => setCart((prev) => { const { [id]: _, ...rest } = prev; return rest; });

  const clearCart = () => { setCart({}); setDiscountPct(0); setNote(''); };

  const cartArray = useMemo(() => Object.values(cart), [cart]);

  const subtotal = useMemo(() => cartArray.reduce((sum, item) => sum + item.price * item.qty, 0), [cartArray]);
  const discountAmount = useMemo(() => subtotal * (discountPct / 100), [subtotal, discountPct]);
  const taxedSubtotal = Math.max(subtotal - discountAmount, 0);
  const tax = useMemo(() => taxedSubtotal * taxRate, [taxedSubtotal]);
  const total = useMemo(() => taxedSubtotal + tax, [taxedSubtotal, tax]);

  const applyDiscount = (pct) => {
    const value = Math.max(0, Math.min(100, Number(pct) || 0));
    setDiscountPct(value);
  };

  const handlePayment = (method) => {
    if (cartArray.length === 0) return;
    const receiptId = Math.random().toString(36).slice(2, 8).toUpperCase();
    alert(
      `Payment successful\nMethod: ${method}\nTotal: $${total.toFixed(2)}\nDiscount: ${discountPct}%\nTax: $${tax.toFixed(2)}\nItems: ${cartArray
        .map((i) => `${i.name} x${i.qty}`)
        .join(', ')}\nNote: ${note || '-'}\nReceipt: #${receiptId}`
    );
    clearCart();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-100">
      <HeroSection />

      <main className="container mx-auto px-4 pb-24">
        <section className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <div className="xl:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold tracking-tight">Catalog</h2>
              <div className="text-sm text-slate-400">Tap an item to add to cart</div>
            </div>
            <ProductCatalog products={products} onAdd={addToCart} />
          </div>

          <div className="xl:col-span-1 space-y-6">
            <Cart
              items={cartArray}
              onInc={increment}
              onDec={decrement}
              onRemove={removeItem}
              subtotal={subtotal}
              discountPct={discountPct}
              discountAmount={discountAmount}
              tax={tax}
              total={total}
            />
            <CheckoutPanel
              discountPct={discountPct}
              onApplyDiscount={applyDiscount}
              total={total}
              onPay={handlePayment}
              onClear={clearCart}
              note={note}
              onNoteChange={setNote}
            />
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10">
        <div className="container mx-auto px-4 py-6 text-xs text-slate-400 flex items-center justify-between">
          <span>POS Demo • Glassmorphic Fintech UI</span>
          <span>© {new Date().getFullYear()}</span>
        </div>
      </footer>
    </div>
  );
}
