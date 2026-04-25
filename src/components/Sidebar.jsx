import { NavLink } from 'react-router-dom';
import { cn } from '../utils/cn';
import { LayoutDashboard, Users, Layers, Wallet, Store, BookOpen, CheckSquare, Calendar } from 'lucide-react';
import { useT } from '../i18n/useT';
import { useSelector } from 'react-redux';

const adminMenu = [
  { nameKey: 'nav.dashboard', path: '/', icon: LayoutDashboard, end: true },
  { nameKey: 'nav.students', path: '/students', icon: Users },
  { nameKey: 'nav.teachers', path: '/teachers', icon: Users },
  { nameKey: 'nav.groups', path: '/groups', icon: Layers },
  { nameKey: 'nav.finance', path: '/finance', icon: Wallet },
  { nameKey: 'nav.shop', path: '/shop', icon: Store },
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
        'z-40 h-full w-[260px] shrink-0 border-r border-emerald-200/50 bg-white/40 py-6 backdrop-blur-xl transition-transform duration-300',
        'dark:border-lime-500/15 dark:bg-emerald-950/30',
        'absolute md:relative',
        isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
      )}
    >
      <div className="mb-8 px-5 md:hidden">
        <span className="font-mono text-lg font-semibold tracking-tight text-emerald-900 dark:text-lime-300">
          Edu-X
        </span>
      </div>
      <nav className="px-3">
        <ul className="flex flex-col gap-1">
          {menuItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                end={item.end}
                onClick={() => onNavigate?.()}
                className={({ isActive }) =>
                  cn(
                    'flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-emerald-900/80 transition-all duration-200',
                    'hover:bg-emerald-50/90 hover:text-emerald-950',
                    'dark:text-lime-100/70 dark:hover:bg-emerald-900/40 dark:hover:text-lime-50',
                    isActive &&
                      'bg-emerald-100/90 text-emerald-950 shadow-sm ring-1 ring-lime-400/40 dark:bg-emerald-900/60 dark:text-lime-50 dark:ring-lime-500/30'
                  )
                }
              >
                <item.icon size={20} strokeWidth={1.75} className="shrink-0 opacity-85" />
                <span>{t(item.nameKey)}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
