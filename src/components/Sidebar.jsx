import { NavLink } from 'react-router-dom';
import { cn } from '../utils/cn';
import { 
  LayoutDashboard, 
  Users, 
  Layers, 
  Wallet, 
  Store, 
  Calendar, 
  CheckSquare, 
  BookOpen, 
  MessageSquare, 
  Settings,
  UserCheck
} from 'lucide-react';
import { useT } from '../i18n/useT';
import { useSelector } from 'react-redux';

const adminMenu = [
  { nameKey: 'nav.dashboard', path: '/', icon: LayoutDashboard, end: true },
  { nameKey: 'nav.students', path: '/students', icon: Users },
  { nameKey: 'nav.teachers', path: '/teachers', icon: UserCheck },
  { nameKey: 'nav.groups', path: '/groups', icon: Layers },
  { nameKey: 'nav.schedule', path: '/schedule', icon: Calendar },
  { nameKey: 'nav.finance', path: '/finance', icon: Wallet },
  { nameKey: 'nav.homework', path: '/homework', icon: BookOpen },
  { nameKey: 'nav.attendance', path: '/attendance', icon: CheckSquare },
  { nameKey: 'nav.courses', path: '/courses', icon: BookOpen },
  { nameKey: 'nav.leads', path: '/leads', icon: MessageSquare },
  { nameKey: 'nav.settings', path: '/settings', icon: Settings },
];

const teacherMenu = [
  { nameKey: 'nav.dashboard', path: '/', icon: LayoutDashboard, end: true },
  { nameKey: 'nav.myGroups', path: '/my-groups', icon: Layers },
  { nameKey: 'nav.myStudents', path: '/my-students', icon: Users },
];

export default function Sidebar({ isOpen, onNavigate }) {
  const t = useT();
  const { role } = useSelector((state) => state.auth);
  
  const menuItems = role === 'admin' ? adminMenu : teacherMenu;

  return (
    <aside
      className={cn(
        'z-40 h-full w-[260px] shrink-0 border-r transition-transform duration-300',
        'border-slate-200 bg-white py-6',
        'dark:border-slate-800 dark:bg-[#0B0F19]',
        'absolute md:relative',
        isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
      )}
    >
      <div className="mb-10 px-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-600 font-bold text-white shadow-lg shadow-violet-500/30">
            X
          </div>
          <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
            Edu-X
          </span>
        </div>
      </div>
      
      <nav className="px-4">
        <ul className="flex flex-col gap-1.5">
          {menuItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                end={item.end}
                onClick={() => onNavigate?.()}
                className={({ isActive }) =>
                  cn(
                    'flex items-center gap-3.5 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200',
                    'text-slate-600 hover:bg-slate-50 hover:text-slate-900',
                    'dark:text-slate-400 dark:hover:bg-slate-800/50 dark:hover:text-slate-100',
                    isActive &&
                      'bg-violet-50 text-violet-600 dark:bg-violet-500/10 dark:text-violet-400'
                  )
                }
              >
                <item.icon size={19} strokeWidth={isActive ? 2.25 : 1.75} className="shrink-0" />
                <span>{t(item.nameKey)}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="absolute bottom-8 left-0 w-full px-6">
        <div className="rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-700 p-5 shadow-xl shadow-violet-500/20">
          <p className="text-sm font-semibold text-white">Upgrade to Pro</p>
          <p className="mt-1 text-xs text-violet-100/80">Get advanced analytics & more</p>
          <button className="mt-4 w-full rounded-lg bg-white/20 py-2 text-xs font-bold text-white backdrop-blur-sm transition hover:bg-white/30">
            Upgrade
          </button>
        </div>
      </div>
    </aside>
  );
}
