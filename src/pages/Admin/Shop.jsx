import { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addShopItem, deleteShopItem } from '../../store/eduCenterSlice';
import { GlassPanel } from '../../components/GlassPanel';
import { useT } from '../../i18n/useT';
import { ShoppingBag, Plus, Trash2 } from 'lucide-react';

const inputClass =
  'w-full rounded-xl border border-emerald-200/80 bg-white/80 px-4 py-2.5 font-mono text-sm text-emerald-950 outline-none transition focus:border-lime-500 focus:ring-2 focus:ring-lime-500/20 dark:border-lime-500/20 dark:bg-emerald-950/50 dark:text-lime-100';

export default function Shop() {
  const t = useT();
  const dispatch = useDispatch();
  const { shopItems } = useSelector((s) => s.eduCenter);

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
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight text-emerald-950 dark:text-lime-50">
          {t('shop.title')}
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-emerald-900/75 dark:text-lime-100/60">{t('shop.subtitle')}</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,400px)_1fr]">
        <GlassPanel className="p-6 md:p-8">
          <div className="mb-6 flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-lime-400/20 text-emerald-800 dark:bg-lime-500/15 dark:text-lime-300">
              <Plus size={20} />
            </div>
            <h2 className="text-lg font-semibold text-emerald-950 dark:text-lime-50">{t('shop.addTitle')}</h2>
          </div>
          <form onSubmit={submit} className="space-y-4">
            <div>
              <label className="mb-1.5 block text-xs font-medium text-emerald-900/85 dark:text-lime-200/80">
                {t('shop.name')}
              </label>
              <input
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className={inputClass}
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-emerald-900/85 dark:text-lime-200/80">
                {t('shop.price')}
              </label>
              <input
                required
                type="number"
                min={1}
                value={form.priceKumush}
                onChange={(e) => setForm({ ...form, priceKumush: e.target.value })}
                className={inputClass}
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-emerald-900/85 dark:text-lime-200/80">
                {t('shop.description')}
              </label>
              <textarea
                rows={2}
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                className={`${inputClass} resize-none`}
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-emerald-900/85 dark:text-lime-200/80">
                {t('shop.imageUrl')}
              </label>
              <input
                value={form.imageUrl}
                onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
                className={inputClass}
                placeholder="https://..."
              />
            </div>
            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-900 py-3 font-mono text-sm font-semibold text-lime-100 shadow-lg transition hover:bg-emerald-800 dark:bg-lime-500 dark:text-emerald-950 dark:hover:bg-lime-400"
            >
              <ShoppingBag size={18} />
              {t('shop.addBtn')}
            </button>
          </form>
        </GlassPanel>

        <GlassPanel className="overflow-hidden p-0">
          <div className="border-b border-emerald-200/50 px-6 py-4 dark:border-lime-500/15">
            <h2 className="text-lg font-semibold text-emerald-950 dark:text-lime-50">{t('shop.listTitle')}</h2>
            <p className="text-xs text-emerald-800/60 dark:text-lime-200/50">{sorted.length}</p>
          </div>
          {sorted.length === 0 ? (
            <p className="p-10 text-center text-sm text-emerald-800/60 dark:text-lime-200/50">{t('shop.empty')}</p>
          ) : (
            <ul className="divide-y divide-emerald-200/50 dark:divide-lime-500/15">
              {sorted.map((item) => (
                <li
                  key={item.id}
                  className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="flex min-w-0 flex-1 gap-4">
                    {item.imageUrl ? (
                      <img
                        src={item.imageUrl}
                        alt=""
                        className="h-16 w-16 shrink-0 rounded-xl border border-emerald-200/60 object-cover dark:border-lime-500/20"
                      />
                    ) : (
                      <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl border border-dashed border-emerald-300/60 bg-emerald-50/50 dark:border-lime-500/25 dark:bg-emerald-950/40">
                        <ShoppingBag className="text-emerald-600/50 dark:text-lime-500/40" size={24} />
                      </div>
                    )}
                    <div className="min-w-0">
                      <p className="font-semibold text-emerald-950 dark:text-lime-50">{item.name}</p>
                      <p className="font-mono text-sm text-lime-700 dark:text-lime-300">
                        {item.priceKumush} {t('shop.kumushShort')}
                      </p>
                      {item.description && (
                        <p className="mt-1 line-clamp-2 text-xs text-emerald-800/70 dark:text-lime-200/55">
                          {item.description}
                        </p>
                      )}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      if (window.confirm(t('shop.confirmDelete'))) dispatch(deleteShopItem(item.id));
                    }}
                    className="inline-flex shrink-0 items-center gap-2 rounded-lg border border-rose-200/80 px-3 py-2 text-xs font-medium text-rose-700 transition hover:bg-rose-50 dark:border-rose-500/30 dark:text-rose-300 dark:hover:bg-rose-950/40"
                  >
                    <Trash2 size={14} />
                    {t('shop.delete')}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </GlassPanel>
      </div>
    </div>
  );
}
