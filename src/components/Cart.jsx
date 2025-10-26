import { Minus, Plus, Trash2 } from 'lucide-react';

export default function Cart({ items, onInc, onDec, onRemove, subtotal, discountPct, discountAmount, tax, total }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm">
      <div className="p-4 border-b border-white/10 flex items-center justify-between">
        <h3 className="font-semibold">Cart</h3>
        <span className="text-xs text-slate-400">{items.length} item{items.length !== 1 ? 's' : ''}</span>
      </div>

      <div className="max-h-80 overflow-auto divide-y divide-white/10">
        {items.length === 0 && (
          <div className="p-4 text-sm text-slate-400">Your cart is empty. Add products to begin.</div>
        )}
        {items.map((item) => (
          <div key={item.id} className="p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-md bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center text-xs text-slate-300">
              {item.name.split(' ').map((w) => w[0]).slice(0,2).join('')}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <span className="font-medium truncate mr-2">{item.name}</span>
                <span className="text-sm">${(item.price * item.qty).toFixed(2)}</span>
              </div>
              <div className="mt-2 flex items-center justify-between text-sm text-slate-400">
                <span>${item.price.toFixed(2)} each</span>
                <div className="flex items-center gap-2">
                  <button onClick={() => onDec(item.id)} className="p-1 rounded-md hover:bg-white/10">
                    <Minus size={16} />
                  </button>
                  <span className="w-6 text-center text-slate-200">{item.qty}</span>
                  <button onClick={() => onInc(item.id)} className="p-1 rounded-md hover:bg-white/10">
                    <Plus size={16} />
                  </button>
                  <button onClick={() => onRemove(item.id)} className="p-1 rounded-md hover:bg-white/10 text-rose-300">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 space-y-2 text-sm">
        <div className="flex items-center justify-between text-slate-300">
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex items-center justify-between text-slate-300">
          <span>Discount ({discountPct}%)</span>
          <span className="text-emerald-300">- ${discountAmount.toFixed(2)}</span>
        </div>
        <div className="flex items-center justify-between text-slate-300">
          <span>Tax</span>
          <span>${tax.toFixed(2)}</span>
        </div>
        <div className="pt-2 mt-2 border-t border-white/10 flex items-center justify-between text-base">
          <span className="font-semibold">Total</span>
          <span className="font-semibold">${total.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
}
