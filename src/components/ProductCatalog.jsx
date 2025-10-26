import { Plus } from 'lucide-react';

export default function ProductCatalog({ products, onAdd }) {
  return (
    <div id="catalog" className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {products.map((p) => (
        <button
          key={p.id}
          onClick={() => onAdd(p)}
          className="group relative overflow-hidden rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition focus:outline-none focus:ring-2 focus:ring-cyan-400/60 text-left"
        >
          <div className={`h-28 md:h-32 w-full bg-gradient-to-br ${p.color} opacity-90`} />
          <div className="p-3">
            <div className="flex items-start justify-between gap-2">
              <div>
                <h3 className="font-medium leading-tight">{p.name}</h3>
                <p className="text-xs text-slate-400 mt-0.5">{p.category}</p>
              </div>
              <span className="text-sm font-semibold">${p.price.toFixed(2)}</span>
            </div>
            <div className="mt-3 flex items-center justify-end">
              <span className="inline-flex items-center gap-2 text-xs text-cyan-300 group-hover:text-cyan-200">
                <Plus size={16} /> Add
              </span>
            </div>
          </div>
        </button>
      ))}
    </div>
  );
}
