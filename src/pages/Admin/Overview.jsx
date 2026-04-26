import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import {
  Users,
  UserCheck,
  GraduationCap,
  TrendingUp,
  TrendingDown,
  Wallet,
  Calendar,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  MoreHorizontal
} from 'lucide-react';
import { formatUZS } from '../../utils/format';
import { useT } from '../../i18n/useT';

function StatCard({ title, value, delta, icon: Icon, color }) {
  const isPositive = delta.startsWith('+');
  return (
    <div className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-xl dark:border-slate-800 dark:bg-[#0B0F19]">
      <div className="flex items-center justify-between">
        <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${color} bg-opacity-10 text-opacity-100 shadow-sm ring-1 ring-inset ring-current`}>
          <Icon size={24} strokeWidth={2.25} />
        </div>
        <div className={`flex items-center gap-1 rounded-full px-2 py-1 text-xs font-bold ${isPositive ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400' : 'bg-rose-50 text-rose-600 dark:bg-rose-500/10 dark:text-rose-400'}`}>
          {isPositive ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
          {delta}
        </div>
      </div>
      <div className="mt-5">
        <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">{title}</p>
        <p className="mt-1 text-3xl font-bold tracking-tight text-slate-900 dark:text-white">{value}</p>
      </div>
    </div>
  );
}

export default function Overview() {
  const t = useT();
  const { students, groups, transactions } = useSelector((s) => s.eduCenter);

  const statsData = useMemo(() => {
    const active = students.filter((x) => x.status === 'active').length;
    const income = transactions
      .filter((tx) => tx.type === 'income')
      .reduce((a, tx) => a + tx.amount, 0);
    return {
      total: students.length,
      active,
      groups: groups.length,
      income,
    };
  }, [students, groups, transactions]);

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
          {t('overview.title')}
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Welcome back! Here's what's happening at your learning center today.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title={t('overview.stats.totalTitle')}
          value={statsData.total}
          delta="+12.5%"
          icon={Users}
          color="bg-violet-600 text-violet-600"
        />
        <StatCard
          title={t('overview.stats.activeTitle')}
          value={statsData.active}
          delta="+3.2%"
          icon={UserCheck}
          color="bg-emerald-600 text-emerald-600"
        />
        <StatCard
          title="Total Groups"
          value={statsData.groups}
          delta="+4"
          icon={GraduationCap}
          color="bg-blue-600 text-blue-600"
        />
        <StatCard
          title={t('overview.stats.incomeTitle')}
          value={formatUZS(statsData.income)}
          delta="+8.4%"
          icon={Wallet}
          color="bg-amber-600 text-amber-600"
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-7">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-[#0B0F19] lg:col-span-4">
          <div className="mb-6 flex items-center justify-between">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Revenue Overview</h3>
            <select className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-bold outline-none dark:border-slate-800 dark:bg-slate-900 dark:text-white">
              <option>Last 7 days</option>
              <option>Last 30 days</option>
            </select>
          </div>
          <div className="flex h-[300px] items-end justify-between gap-2 pt-4">
            {[60, 45, 80, 55, 90, 75, 100].map((h, i) => (
              <div key={i} className="group relative flex flex-1 flex-col items-center">
                <div 
                  style={{ height: `${h}%` }} 
                  className="w-full rounded-t-xl bg-violet-600/10 transition-all group-hover:bg-violet-600 shadow-[inset_0_0_0_1px_rgba(124,58,237,0.1)]"
                />
                <span className="mt-3 text-[10px] font-bold text-slate-400">
                  {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i]}
                </span>
                <div className="absolute -top-10 scale-90 rounded-lg bg-slate-900 px-2 py-1 text-[10px] font-bold text-white opacity-0 transition group-hover:scale-100 group-hover:opacity-100">
                  ${(h * 150).toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-[#0B0F19] lg:col-span-3">
          <h3 className="mb-6 text-lg font-bold text-slate-900 dark:text-white">Today's Classes</h3>
          <div className="space-y-4">
            {[
              { time: '09:00 AM', group: 'React G1', teacher: 'Anvar Usmonov', status: 'In Progress' },
              { time: '11:30 AM', group: 'Python B2', teacher: 'Madina Yusupova', status: 'Upcoming' },
              { time: '02:00 PM', group: 'Design A1', teacher: 'Kamol Nazarov', status: 'Upcoming' },
              { time: '04:30 PM', group: 'English C3', teacher: 'Dilnoza Karimova', status: 'Upcoming' },
            ].map((c, i) => (
              <div key={i} className="flex items-center gap-4 rounded-2xl border border-slate-100 p-4 transition hover:border-violet-200 hover:bg-violet-50/30 dark:border-slate-800/50 dark:hover:bg-violet-500/5">
                <div className="flex h-12 w-12 flex-col items-center justify-center rounded-xl bg-slate-50 text-[10px] font-bold text-slate-500 dark:bg-slate-900">
                  <Clock size={16} className="mb-1 text-violet-500" />
                  {c.time.split(' ')[0]}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-bold text-slate-900 dark:text-white">{c.group}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{c.teacher}</p>
                </div>
                <span className={`text-[10px] font-bold uppercase tracking-wider ${c.status === 'In Progress' ? 'text-emerald-500' : 'text-slate-400'}`}>
                  {c.status}
                </span>
              </div>
            ))}
          </div>
          <button className="mt-6 w-full rounded-xl bg-slate-50 py-3 text-sm font-bold text-slate-600 transition hover:bg-slate-100 dark:bg-slate-900 dark:text-slate-400 dark:hover:bg-slate-800">
            View Full Schedule
          </button>
        </div>
      </div>
      
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-[#0B0F19]">
        <div className="mb-6 flex items-center justify-between">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">Recent Activity</h3>
          <button className="text-slate-400 hover:text-slate-600">
            <MoreHorizontal size={20} />
          </button>
        </div>
        <div className="space-y-6">
          {[
            { user: 'Alisher Karimov', action: 'paid for October', time: '2 hours ago', icon: Wallet, color: 'bg-emerald-500' },
            { user: 'Madina Yusupova', action: 'marked attendance for React G1', time: '3 hours ago', icon: Calendar, color: 'bg-violet-500' },
            { user: 'New Lead', action: 'requested a demo from website', time: '5 hours ago', icon: Users, color: 'bg-blue-500' },
          ].map((a, i) => (
            <div key={i} className="flex items-start gap-4">
              <div className={`mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${a.color} text-white shadow-md`}>
                <a.icon size={16} />
              </div>
              <div className="flex-1 border-b border-slate-100 pb-4 last:border-0 dark:border-slate-800/50">
                <p className="text-sm text-slate-600 dark:text-slate-300">
                  <span className="font-bold text-slate-900 dark:text-white">{a.user}</span> {a.action}
                </p>
                <p className="mt-1 text-xs text-slate-400">{a.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
