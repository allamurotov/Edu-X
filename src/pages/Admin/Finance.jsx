import { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTransaction } from '../../store/eduCenterSlice';
import { formatUZS, formatDate } from '../../utils/format';
import { ArrowDownLeft, ArrowUpRight, Wallet, Filter, Search, Plus, CreditCard, DollarSign, MoreVertical } from 'lucide-react';
import { useT } from '../../i18n/useT';

const PAYMENT_METHODS = ['Naqd', 'Uzcard', 'Humo', 'Payme', 'Click', 'Boshqa'];

const inputClass =
  'w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-900 outline-none transition focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10 dark:border-slate-800 dark:bg-slate-900/50 dark:text-white dark:focus:border-violet-500/50';

export default function Finance() {
  const t = useT();
  const dispatch = useDispatch();
  const { transactions, students } = useSelector((s) => s.eduCenter);

  const [isAddingIncome, setIsAddingIncome] = useState(false);
  const [incomeForm, setIncomeForm] = useState({
    amount: '',
    note: '',
    studentId: '',
    method: 'Naqd',
  });

  const totals = useMemo(() => {
    const income = transactions.filter((tx) => tx.type === 'income').reduce((a, tx) => a + tx.amount, 0);
    const expense = transactions.filter((tx) => tx.type === 'expense').reduce((a, tx) => a + tx.amount, 0);
    return { income, expense, balance: income - expense };
  }, [transactions]);

  const sortedTx = useMemo(
    () => [...transactions].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)),
    [transactions]
  );

  const studentName = (id) => {
    if (!id) return null;
    const s = students.find((x) => x.id === id);
    return s ? `${s.firstName} ${s.lastName}` : null;
  };

  const submitIncome = (e) => {
    e.preventDefault();
    const amount = Number(incomeForm.amount);
    if (!amount || amount <= 0) return;
    dispatch(addTransaction({ type: 'income', amount, note: incomeForm.note, studentId: incomeForm.studentId || null, method: incomeForm.method }));
    setIncomeForm({ amount: '', note: '', studentId: '', method: 'Naqd' });
    setIsAddingIncome(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            {t('finance.title')}
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Track your center's financial health, monitor payments and manage expenses.
          </p>
        </div>
        
        <button 
          onClick={() => setIsAddingIncome(true)}
          className="flex items-center gap-2 rounded-xl bg-violet-600 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-violet-500/30 transition hover:bg-violet-700"
        >
          <Plus size={18} />
          {t('finance.addIncome')}
        </button>
      </div>

      <div className="grid gap-6 sm:grid-cols-3">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-[#0B0F19]">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400">
            <ArrowDownLeft size={20} />
          </div>
          <p className="mt-4 text-xs font-bold uppercase tracking-widest text-slate-400">{t('finance.income')}</p>
          <p className="mt-1 text-2xl font-bold text-slate-900 dark:text-white">{formatUZS(totals.income)}</p>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-[#0B0F19]">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-100 text-rose-600 dark:bg-rose-500/10 dark:text-rose-400">
            <ArrowUpRight size={20} />
          </div>
          <p className="mt-4 text-xs font-bold uppercase tracking-widest text-slate-400">{t('finance.expense')}</p>
          <p className="mt-1 text-2xl font-bold text-slate-900 dark:text-white">{formatUZS(totals.expense)}</p>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-[#0B0F19]">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-100 text-violet-600 dark:bg-violet-500/10 dark:text-violet-400">
            <Wallet size={20} />
          </div>
          <p className="mt-4 text-xs font-bold uppercase tracking-widest text-slate-400">{t('finance.balance')}</p>
          <p className="mt-1 text-2xl font-bold text-slate-900 dark:text-white">{formatUZS(totals.balance)}</p>
        </div>
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-[#0B0F19]">
        <div className="flex flex-col gap-4 border-b border-slate-100 p-6 dark:border-slate-800/50 sm:flex-row sm:items-center sm:justify-between">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">{t('finance.history')}</h3>
          <div className="flex items-center gap-3">
             <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input 
                  type="text" 
                  placeholder="Search transactions..." 
                  className="h-10 w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-4 text-sm outline-none focus:border-violet-500 dark:border-slate-800 dark:bg-slate-900/50 dark:text-white sm:w-64" 
                />
             </div>
             <button className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 transition hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400">
               <Filter size={18} />
             </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/50 text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:border-slate-800 dark:bg-slate-900/50">
                <th className="p-5">{t('finance.colDate')}</th>
                <th className="p-5">{t('finance.colStudent')}</th>
                <th className="p-5">{t('finance.method')}</th>
                <th className="p-5">{t('finance.colAmount')}</th>
                <th className="p-5">{t('finance.colType')}</th>
                <th className="p-5"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/50">
              {sortedTx.map((tx) => (
                <tr key={tx.id} className="transition hover:bg-slate-50/50 dark:hover:bg-slate-800/20">
                  <td className="p-5">
                    <p className="text-sm font-medium text-slate-900 dark:text-white">{formatDate(tx.createdAt)}</p>
                    <p className="text-[10px] text-slate-400">{new Date(tx.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                  </td>
                  <td className="p-5">
                    {tx.studentId ? (
                      <div className="flex items-center gap-2">
                        <div className="h-6 w-6 rounded-full bg-violet-100 flex items-center justify-center text-[8px] font-bold text-violet-600 dark:bg-violet-500/10 dark:text-violet-400">
                          {studentName(tx.studentId)?.split(' ').map(n => n[0]).join('')}
                        </div>
                        <span className="text-sm font-bold text-slate-900 dark:text-white">{studentName(tx.studentId)}</span>
                      </div>
                    ) : (
                      <span className="text-xs text-slate-400">—</span>
                    )}
                  </td>
                  <td className="p-5">
                    <span className="text-sm text-slate-600 dark:text-slate-400">{tx.method || '—'}</span>
                  </td>
                  <td className="p-5">
                    <span className={`text-sm font-bold ${tx.type === 'income' ? 'text-emerald-600' : 'text-rose-600'}`}>
                      {tx.type === 'income' ? '+' : '-'}{formatUZS(tx.amount)}
                    </span>
                  </td>
                  <td className="p-5">
                    <span className={`inline-flex rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                      tx.type === 'income' ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400' : 'bg-rose-100 text-rose-600 dark:bg-rose-500/10 dark:text-rose-400'
                    }`}>
                      {tx.type}
                    </span>
                  </td>
                  <td className="p-5 text-right text-slate-400">
                    <MoreVertical size={16} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Income Modal */}
      {isAddingIncome && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-sm dark:bg-black/60">
           <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 shadow-2xl dark:border-slate-800 dark:bg-[#0B0F19]">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">{t('finance.incomeFormTitle')}</h3>
              
              <form onSubmit={submitIncome} className="mt-8 space-y-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-400">{t('finance.amount')}</label>
                  <div className="relative">
                    <input type="number" required value={incomeForm.amount} onChange={e => setIncomeForm({...incomeForm, amount: e.target.value})} className={inputClass} />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">UZS</span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-400">{t('finance.studentOpt')}</label>
                  <select value={incomeForm.studentId} onChange={e => setIncomeForm({...incomeForm, studentId: e.target.value})} className={inputClass}>
                    <option value="">— No student —</option>
                    {students.map(s => <option key={s.id} value={s.id}>{s.firstName} {s.lastName}</option>)}
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-400">{t('finance.method')}</label>
                  <select value={incomeForm.method} onChange={e => setIncomeForm({...incomeForm, method: e.target.value})} className={inputClass}>
                    {PAYMENT_METHODS.map(m => <option key={m} value={m}>{m}</option>)}
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-400">{t('finance.note')}</label>
                  <input value={incomeForm.note} onChange={e => setIncomeForm({...incomeForm, note: e.target.value})} className={inputClass} placeholder="e.g. Monthly payment" />
                </div>
                
                <div className="pt-4 flex gap-3">
                   <button type="submit" className="flex-1 rounded-xl bg-violet-600 py-3 text-sm font-bold text-white shadow-lg shadow-violet-500/30 transition hover:bg-violet-700">
                     Add Payment
                   </button>
                   <button type="button" onClick={() => setIsAddingIncome(false)} className="flex-1 rounded-xl bg-slate-100 py-3 text-sm font-bold text-slate-600 dark:bg-slate-800 dark:text-slate-400">
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
