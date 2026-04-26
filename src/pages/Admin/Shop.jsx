import { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addShopItem, deleteShopItem } from '../../store/eduCenterSlice';
import { useT } from '../../i18n/useT';
import { ShoppingBag, Plus, Trash2, Edit2, Image as ImageIcon, Sparkles } from 'lucide-react';

const inputClass =
  'w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-900 outline-none transition focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10 dark:border-slate-800 dark:bg-slate-900/50 dark:text-white dark:focus:border-violet-500/50';

export default function Shop() {
  const t = useT();
  const dispatch = useDispatch();
  const { shopItems } = useSelector((s) => s.eduCenter);

  const [isAdding, setIsAdding] = useState(false);
  const [form, setForm] = useState({
    name: '',
    priceKumush: '',
    description: '',
    imageUrl: '',
  });

  const sorted = useMemo(
    () => [...shopItems].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)),
    [shopItems]
  );

  const submit = (e) => {
    e.preventDefault();
    dispatch(
      addShopItem({
        name: form.name,
        priceKumush: form.priceKumush,
        description: form.description,
        imageUrl: form.imageUrl,
      })
    );
    setForm({ name: '', priceKumush: '', description: '', imageUrl: '' });
    setIsAdding(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            {t('shop.title')}
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Manage rewards and items students can purchase with their earned silver (kumush).
          </p>
        </div>
        
        <button 
          onClick={() => setIsAdding(true)}
          className="flex items-center gap-2 rounded-xl bg-violet-600 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-violet-500/30 transition hover:bg-violet-700"
        >
          <Plus size={18} />
          {t('shop.addTitle')}
        </button>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {sorted.map((item) => (
          <div key={item.id} className="group flex flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition-all hover:shadow-xl dark:border-slate-800 dark:bg-[#0B0F19]">
            <div className="relative aspect-square w-full bg-slate-100 dark:bg-slate-900">
              {item.imageUrl ? (
                <img src={item.imageUrl} alt={item.name} className="h-full w-full object-cover transition duration-500 group-hover:scale-110" />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-slate-300 dark:text-slate-700">
                  <ShoppingBag size={48} />
                </div>
              )}
              <div className="absolute right-3 top-3 flex h-10 items-center gap-1.5 rounded-xl bg-white/90 px-3 text-sm font-bold text-slate-900 shadow-xl backdrop-blur-md dark:bg-slate-900/90 dark:text-white">
                <Sparkles size={14} className="text-amber-500" />
                {item.priceKumush}
              </div>
            </div>
            
            <div className="flex flex-1 flex-col p-5">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">{item.name}</h3>
              <p className="mt-2 line-clamp-2 text-xs text-slate-500 dark:text-slate-400">{item.description}</p>
              
              <div className="mt-auto pt-6 flex items-center justify-between">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-50 text-slate-400 transition hover:bg-slate-100 hover:text-violet-600 dark:bg-slate-900 dark:hover:bg-slate-800 dark:hover:text-violet-400 cursor-pointer">
                   <Edit2 size={14} />
                </div>
                <button 
                  onClick={() => { if (window.confirm(t('shop.confirmDelete'))) dispatch(deleteShopItem(item.id)); }}
                  className="flex h-8 w-8 items-center justify-center rounded-lg bg-rose-50 text-rose-500 transition hover:bg-rose-100 dark:bg-rose-500/10 dark:text-rose-400 dark:hover:bg-rose-500/20"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          </div>
        ))}

        <button 
          onClick={() => setIsAdding(true)}
          className="flex flex-col items-center justify-center rounded-3xl border-2 border-dashed border-slate-200 p-8 transition hover:border-violet-500/50 hover:bg-violet-50/30 dark:border-slate-800 dark:hover:bg-violet-500/5"
        >
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 text-slate-400 dark:bg-slate-800">
            <Plus size={32} />
          </div>
          <p className="text-sm font-bold text-slate-400">Add Shop Item</p>
        </button>
      </div>

      {/* Add Item Modal */}
      {isAdding && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-sm dark:bg-black/60">
           <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 shadow-2xl dark:border-slate-800 dark:bg-[#0B0F19]">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">{t('shop.addTitle')}</h3>
              
              <form onSubmit={submit} className="mt-8 space-y-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-400">{t('shop.name')}</label>
                  <input required value={form.name} onChange={e => setForm({...form, name: e.target.value})} className={inputClass} />
                </div>
                
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-400">{t('shop.price')} (Silver)</label>
                  <input type="number" required min={1} value={form.priceKumush} onChange={e => setForm({...form, priceKumush: e.target.value})} className={inputClass} />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-400">{t('shop.imageUrl')}</label>
                  <div className="relative">
                    <ImageIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                    <input value={form.imageUrl} onChange={e => setForm({...form, imageUrl: e.target.value})} className={`${inputClass} pl-10`} placeholder="https://..." />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-400">{t('shop.description')}</label>
                  <textarea rows={3} value={form.description} onChange={e => setForm({...form, description: e.target.value})} className={`${inputClass} resize-none`} />
                </div>
                
                <div className="pt-4 flex gap-3">
                   <button type="submit" className="flex-1 rounded-xl bg-violet-600 py-3 text-sm font-bold text-white shadow-lg shadow-violet-500/30 transition hover:bg-violet-700">
                     Add Item
                   </button>
                   <button type="button" onClick={() => setIsAdding(false)} className="flex-1 rounded-xl bg-slate-100 py-3 text-sm font-bold text-slate-600 dark:bg-slate-800 dark:text-slate-400">
                     Cancel
                   </button>
                </div>
              </form>
           </div>
        </div>
      )}
    </div>
  );
}
