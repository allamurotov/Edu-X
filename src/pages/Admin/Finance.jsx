import { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTransaction } from '../../store/eduCenterSlice';
import { GlassPanel } from '../../components/GlassPanel';
import { formatUZS, formatDate } from '../../utils/format';
import { ArrowDownLeft, ArrowUpRight, Wallet } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../components/ui/Table';
import { Badge } from '../../components/ui/Badge';
import { useT } from '../../i18n/useT';

const PAYMENT_METHODS = ['Naqd', 'Uzcard', 'Humo', 'Payme', 'Click', 'Boshqa'];

const inputClass =
  'w-full rounded-xl border border-emerald-200/80 bg-white/80 px-4 py-2.5 font-mono text-sm text-emerald-950 outline-none dark:border-lime-500/20 dark:bg-emerald-950/50 dark:text-lime-100';

export default function Finance() {
  const t = useT();
  const dispatch = useDispatch();
  const { transactions, students } = useSelector((s) => s.eduCenter);

  const [incomeForm, setIncomeForm] = useState({
    amount: '',
    note: '',
    studentId: '',
    method: 'Naqd',
  });
  const [expenseForm, setExpenseForm] = useState({
    amount: '',
    note: '',
  });

  const payLabel = (m) => {
    const key = `finance.payMethods.${m}`;
    const tr = t(key);
    return tr === key ? m : tr;
  };

  const totals = useMemo(() => {
    const income = transactions
      .filter((tx) => tx.type === 'income')
      .reduce((a, tx) => a + tx.amount, 0);
    const expense = transactions
      .filter((tx) => tx.type === 'expense')
      .reduce((a, tx) => a + tx.amount, 0);
    return { income, expense, balance: income - expense };
  }, [transactions]);

  const sortedTx = useMemo(
    () =>
      [...transactions].sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      ),
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
    dispatch(
      addTransaction({
        type: 'income',
        amount,
        note: incomeForm.note,
        studentId: incomeForm.studentId || null,
        method: incomeForm.method,
      })
    );
    setIncomeForm({ amount: '', note: '', studentId: '', method: incomeForm.method });
  };

  const submitExpense = (e) => {
    e.preventDefault();
    const amount = Number(expenseForm.amount);
    if (!amount || amount <= 0) return;
    dispatch(
      addTransaction({
        type: 'expense',
        amount,
        note: expenseForm.note,
      })
    );
    setExpenseForm({ amount: '', note: '' });
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight text-emerald-950 dark:text-lime-50">
          {t('finance.title')}
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-emerald-900/75 dark:text-lime-100/60">{t('finance.subtitle')}</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <GlassPanel className="p-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-700 dark:text-emerald-400">
              <ArrowDownLeft size={20} />
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-emerald-800/65 dark:text-lime-200/55">
                {t('finance.income')}
              </p>
              <p className="font-mono text-xl font-semibold text-emerald-950 dark:text-lime-50">{formatUZS(totals.income)}</p>
            </div>
          </div>
        </GlassPanel>
        <GlassPanel className="p-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-500/15 text-rose-700 dark:text-rose-400">
              <ArrowUpRight size={20} />
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-emerald-800/65 dark:text-lime-200/55">
                {t('finance.expense')}
              </p>
              <p className="font-mono text-xl font-semibold text-emerald-950 dark:text-lime-50">{formatUZS(totals.expense)}</p>
            </div>
          </div>
        </GlassPanel>
        <GlassPanel className="p-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-lime-400/20 text-emerald-800 dark:bg-lime-500/15 dark:text-lime-300">
              <Wallet size={20} />
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-emerald-800/65 dark:text-lime-200/55">
                {t('finance.balance')}
              </p>
              <p className="font-mono text-xl font-semibold text-emerald-950 dark:text-lime-50">{formatUZS(totals.balance)}</p>
            </div>
          </div>
        </GlassPanel>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <GlassPanel className="p-6 md:p-8">
          <h2 className="text-lg font-semibold text-emerald-950 dark:text-lime-50">{t('finance.incomeFormTitle')}</h2>
          <form onSubmit={submitIncome} className="mt-4 space-y-4">
            <div>
              <label className="mb-1.5 block text-xs font-medium text-emerald-900/85 dark:text-lime-200/80">
                {t('finance.amount')}
              </label>
              <input
                type="number"
                min={1}
                required
                value={incomeForm.amount}
                onChange={(e) => setIncomeForm({ ...incomeForm, amount: e.target.value })}
                className={`${inputClass} focus:ring-2 focus:ring-emerald-500/20`}
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-emerald-900/85 dark:text-lime-200/80">
                {t('finance.studentOpt')}
              </label>
              <select
                value={incomeForm.studentId}
                onChange={(e) => setIncomeForm({ ...incomeForm, studentId: e.target.value })}
                className={`${inputClass} focus:ring-2 focus:ring-emerald-500/20`}
              >
                <option value="">—</option>
                {students.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.firstName} {s.lastName} · {s.loginId}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-emerald-900/85 dark:text-lime-200/80">
                {t('finance.method')}
              </label>
              <select
                value={incomeForm.method}
                onChange={(e) => setIncomeForm({ ...incomeForm, method: e.target.value })}
                className={`${inputClass} focus:ring-2 focus:ring-emerald-500/20`}
              >
                {PAYMENT_METHODS.map((m) => (
                  <option key={m} value={m}>
                    {payLabel(m)}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-emerald-900/85 dark:text-lime-200/80">
                {t('finance.note')}
              </label>
              <input
                value={incomeForm.note}
                onChange={(e) => setIncomeForm({ ...incomeForm, note: e.target.value })}
                className={`${inputClass} focus:ring-2 focus:ring-emerald-500/20`}
                placeholder={t('finance.noteIncomePh')}
              />
            </div>
            <button
              type="submit"
              className="w-full rounded-xl bg-emerald-600 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-600/20 transition hover:bg-emerald-500 dark:shadow-emerald-900/30"
            >
              {t('finance.addIncome')}
            </button>
          </form>
        </GlassPanel>

        <GlassPanel className="p-6 md:p-8">
          <h2 className="text-lg font-semibold text-emerald-950 dark:text-lime-50">{t('finance.expenseFormTitle')}</h2>
          <form onSubmit={submitExpense} className="mt-4 space-y-4">
            <div>
              <label className="mb-1.5 block text-xs font-medium text-emerald-900/85 dark:text-lime-200/80">
                {t('finance.amount')}
              </label>
              <input
                type="number"
                min={1}
                required
                value={expenseForm.amount}
                onChange={(e) => setExpenseForm({ ...expenseForm, amount: e.target.value })}
                className={`${inputClass} focus:ring-2 focus:ring-rose-500/20`}
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-emerald-900/85 dark:text-lime-200/80">
                {t('finance.note')}
              </label>
              <input
                value={expenseForm.note}
                onChange={(e) => setExpenseForm({ ...expenseForm, note: e.target.value })}
                className={`${inputClass} focus:ring-2 focus:ring-rose-500/20`}
                placeholder={t('finance.noteExpensePh')}
              />
            </div>
            <button
              type="submit"
              className="w-full rounded-xl bg-rose-600 py-3 text-sm font-semibold text-white shadow-lg shadow-rose-600/20 transition hover:bg-rose-500 dark:shadow-rose-900/30"
            >
              {t('finance.addExpense')}
            </button>
          </form>
        </GlassPanel>
      </div>

      <GlassPanel className="overflow-hidden p-0">
        <div className="border-b border-emerald-200/50 px-6 py-4 dark:border-lime-500/15">
          <h2 className="text-lg font-semibold text-emerald-950 dark:text-lime-50">{t('finance.history')}</h2>
          <p className="text-xs text-emerald-800/60 dark:text-lime-200/50">
            {t('finance.historyCount', { n: sortedTx.length })}
          </p>
        </div>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-emerald-200/50 hover:bg-transparent dark:border-lime-500/15">
                <TableHead>{t('finance.colDate')}</TableHead>
                <TableHead>{t('finance.colType')}</TableHead>
                <TableHead>{t('finance.colAmount')}</TableHead>
                <TableHead>{t('finance.colStudent')}</TableHead>
                <TableHead>{t('finance.colNote')}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedTx.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="py-12 text-center text-sm text-emerald-800/60 dark:text-lime-200/50">
                    {t('finance.noTx')}
                  </TableCell>
                </TableRow>
              )}
              {sortedTx.map((tx) => (
                <TableRow key={tx.id} className="border-emerald-200/50 dark:border-lime-500/15">
                  <TableCell className="text-xs text-emerald-800/70 dark:text-lime-200/55">
                    {formatDate(tx.createdAt)}
                  </TableCell>
                  <TableCell>
                    {tx.type === 'income' ? (
                      <Badge variant="green">{t('finance.badgeIncome')}</Badge>
                    ) : (
                      <Badge variant="red">{t('finance.badgeExpense')}</Badge>
                    )}
                  </TableCell>
                  <TableCell className="font-mono font-medium text-emerald-950 dark:text-lime-50">
                    {formatUZS(tx.amount)}
                  </TableCell>
                  <TableCell className="text-xs text-emerald-800/70 dark:text-lime-200/55">
                    {tx.studentId ? (
                      <span className="font-medium text-emerald-950 dark:text-lime-50">
                        {studentName(tx.studentId)}
                      </span>
                    ) : tx.type === 'income' && tx.method ? (
                      payLabel(tx.method)
                    ) : (
                      t('students.dash')
                    )}
                    {tx.studentId && tx.method && (
                      <span className="mt-0.5 block text-[10px] font-normal text-emerald-700/60 dark:text-lime-300/45">
                        {payLabel(tx.method)}
                      </span>
                    )}
                  </TableCell>
                  <TableCell className="max-w-[220px] truncate text-xs text-emerald-800/70 dark:text-lime-200/55">
                    {tx.note || t('students.dash')}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </GlassPanel>
    </div>
  );
}
