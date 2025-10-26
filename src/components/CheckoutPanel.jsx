import { CreditCard, DollarSign, RefreshCw } from 'lucide-react';

export default function CheckoutPanel({ discountPct, onApplyDiscount, total, onPay, onClear, note, onNoteChange }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-4 space-y-4">
      <div>
        <label className="block text-sm text-slate-300 mb-1">Discount (%)</label>
        <div className="flex items-center gap-2">
          <input
            type="number"
            min="0"
            max="100"
            value={discountPct}
            onChange={(e) => onApplyDiscount(e.target.value)}
            className="w-24 rounded-lg bg-slate-900/60 border border-white/10 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-400/60"
          />
          <button
            onClick={() => onApplyDiscount(0)}
            className="px-3 py-2 rounded-lg bg-white/10 hover:bg-white/15 text-xs"
          >
            Reset
          </button>
        </div>
      </div>

      <div>
        <label className="block text-sm text-slate-300 mb-1">Order note</label>
        <textarea
          value={note}
          onChange={(e) => onNoteChange(e.target.value)}
          placeholder="Add special instructions"
          rows={2}
          className="w-full rounded-lg bg-slate-900/60 border border-white/10 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-400/60 placeholder:text-slate-500"
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={() => onPay('Card')}
          className="flex items-center justify-center gap-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-medium py-3"
        >
          <CreditCard size={18} /> Pay Card
        </button>
        <button
          onClick={() => onPay('Cash')}
          className="flex items-center justify-center gap-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-medium py-3"
        >
          <DollarSign size={18} /> Pay Cash
        </button>
      </div>

      <div className="flex items-center justify-between">
        <span className="text-sm text-slate-400">Amount due</span>
        <span className="text-xl font-semibold">${total.toFixed(2)}</span>
      </div>

      <button
        onClick={onClear}
        className="w-full inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 py-2.5 text-sm"
      >
        <RefreshCw size={16} /> New Order
      </button>
    </div>
  );
}
