import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import {
  Users,
  UserCheck,
  GraduationCap,
  TrendingUp,
  TrendingDown,
  Wallet,
  Sparkles,
} from 'lucide-react';
import { GlassPanel } from '../../components/GlassPanel';
import { filterStudentsByQuery } from '../../utils/studentSearch';
import { formatUZS } from '../../utils/format';
import { Badge } from '../../components/ui/Badge';
import { Link } from 'react-router-dom';
import { useT } from '../../i18n/useT';

function StatCard({ title, value, subtitle, icon: Icon, accent }) {
  return (
    <GlassPanel className="group relative overflow-hidden p-6 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_40px_rgba(16,185,129,0.15)] dark:hover:shadow-[0_0_48px_rgba(34,197,94,0.18)]">
      <div
        className={`pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full opacity-20 blur-2xl transition group-hover:opacity-30 ${accent}`}
      />
      <div className="relative flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-emerald-800/70 dark:text-lime-400/70">
            {title}
          </p>
          <p className="mt-2 text-3xl font-semibold tracking-tight text-emerald-950 dark:text-lime-50">
            {value}
          </p>
          {subtitle && (
            <p className="mt-1 text-sm text-emerald-800/65 dark:text-lime-200/55">{subtitle}</p>
          )}
        </div>
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-50/90 text-emerald-800 shadow-sm ring-1 ring-lime-400/30 transition group-hover:scale-105 dark:bg-emerald-950/70 dark:text-lime-300 dark:ring-lime-500/25">
          <Icon size={22} strokeWidth={1.75} />
        </div>
      </div>
    </GlassPanel>
  );
}

export default function Overview() {
  const t = useT();
  const { students, groups, transactions } = useSelector((s) => s.eduCenter);
  const search = useSelector((s) => s.ui.adminSearch);

  const stats = useMemo(() => {
    const active = students.filter((x) => x.status === 'active').length;
    const finished = students.filter((x) => x.status === 'finished').length;
    const income = transactions
      .filter((tx) => tx.type === 'income')
      .reduce((a, tx) => a + tx.amount, 0);
    const expense = transactions
      .filter((tx) => tx.type === 'expense')
      .reduce((a, tx) => a + tx.amount, 0);
    return {
      total: students.length,
      active,
      finished,
      income,
      expense,
      balance: income - expense,
    };
  }, [students, transactions]);

  const searchHits = useMemo(() => {
    const list = filterStudentsByQuery(students, search).slice(0, 6);
    return list.map((s) => {
      const g = s.groupId ? groups.find((x) => x.id === s.groupId) : null;
      return { student: s, group: g };
    });
  }, [students, groups, search]);

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-lime-400/35 bg-emerald-50/60 px-3 py-1 font-mono text-xs font-medium text-emerald-900 backdrop-blur-md dark:border-lime-500/25 dark:bg-emerald-950/50 dark:text-lime-200">
            <Sparkles size={14} className="text-lime-500 dark:text-lime-400" />
            {t('overview.badge')}
          </div>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-emerald-950 dark:text-lime-50 md:text-4xl">
            {t('overview.title')}
          </h1>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-emerald-900/75 dark:text-lime-100/60">
            {t('overview.subtitle')}
          </p>
        </div>
      </div>

      {search.trim() && (
        <GlassPanel className="p-5">
          <div className="flex items-center justify-between gap-4">
            <p className="text-sm font-medium text-emerald-950 dark:text-lime-100">
              {t('overview.searchResults')} · <span className="text-emerald-700/70 dark:text-lime-300/60">{search}</span>
            </p>
            <Link
              to="/students"
              className="text-xs font-semibold text-emerald-700 hover:text-emerald-600 dark:text-lime-400 dark:hover:text-lime-300"
            >
              {t('overview.allStudents')}
            </Link>
          </div>
          <ul className="mt-4 divide-y divide-emerald-200/50 dark:divide-lime-500/15">
            {searchHits.length === 0 && (
              <li className="py-6 text-center text-sm text-emerald-800/60 dark:text-lime-300/50">
                {t('overview.noResults')}
              </li>
            )}
            {searchHits.map(({ student: s, group: g }) => (
              <li
                key={s.id}
                className="flex flex-wrap items-center justify-between gap-3 py-3 first:pt-0"
              >
                <div>
                  <p className="font-medium text-emerald-950 dark:text-lime-50">
                    {s.firstName} {s.lastName}
                  </p>
                  <p className="font-mono text-xs text-emerald-800/70 dark:text-lime-300/60">{s.loginId}</p>
                </div>
                <div className="text-right">
                  {s.status === 'finished' ? (
                    <Badge variant="green">{t('overview.courseDone')}</Badge>
                  ) : g ? (
                    <Badge variant="blue">{g.name}</Badge>
                  ) : (
                    <Badge variant="yellow">{t('overview.noGroup')}</Badge>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </GlassPanel>
      )}

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <StatCard
          title={t('overview.stats.totalTitle')}
          value={stats.total}
          subtitle={t('overview.stats.totalSub')}
          icon={Users}
          accent="bg-lime-400"
        />
        <StatCard
          title={t('overview.stats.activeTitle')}
          value={stats.active}
          subtitle={t('overview.stats.activeSub')}
          icon={UserCheck}
          accent="bg-emerald-400"
        />
        <StatCard
          title={t('overview.stats.finishedTitle')}
          value={stats.finished}
          subtitle={t('overview.stats.finishedSub')}
          icon={GraduationCap}
          accent="bg-emerald-500"
        />
        <StatCard
          title={t('overview.stats.incomeTitle')}
          value={formatUZS(stats.income)}
          subtitle={t('overview.stats.incomeSub')}
          icon={TrendingUp}
          accent="bg-teal-400"
        />
        <StatCard
          title={t('overview.stats.expenseTitle')}
          value={formatUZS(stats.expense)}
          subtitle={t('overview.stats.expenseSub')}
          icon={TrendingDown}
          accent="bg-rose-400"
        />
        <StatCard
          title={t('overview.stats.balanceTitle')}
          value={formatUZS(stats.balance)}
          subtitle={t('overview.stats.balanceSub')}
          icon={Wallet}
          accent="bg-amber-400"
        />
      </div>
    </div>
  );
}
