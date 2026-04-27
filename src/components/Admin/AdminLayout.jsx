import { Outlet, Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
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
  UserCheck,
  LogOut,
  Menu,
  X
} from 'lucide-react';
import { useState } from 'react';

const adminMenu = [
  { name: 'Asosiy', path: '/admin/dashboard', icon: LayoutDashboard, end: true },
  { name: 'Talabalar', path: '/admin/dashboard/students', icon: Users },
  { name: 'Ustozlar', path: '/admin/dashboard/teachers', icon: UserCheck },
  { name: 'Guruhlar', path: '/admin/dashboard/groups', icon: Layers },
  { name: 'Jadval', path: '/admin/dashboard/schedule', icon: Calendar },
  { name: 'Moliya', path: '/admin/dashboard/finance', icon: Wallet },
  { name: 'Uy ishi', path: '/admin/dashboard/homework', icon: BookOpen },
  { name: 'Davomat', path: '/admin/dashboard/attendance', icon: CheckSquare },
  { name: 'Kurslar', path: '/admin/dashboard/courses', icon: BookOpen },
  { name: 'Lidlar', path: '/admin/dashboard/leads', icon: MessageSquare },
  { name: 'Sozlamalar', path: '/admin/dashboard/settings', icon: Settings },
  { name: 'Do\'kon', path: '/admin/dashboard/shop', icon: Store },
];

const teacherMenu = [
  { name: 'Asosiy', path: '/teacher', icon: LayoutDashboard, end: true },
  { name: 'Mening guruhlarim', path: '/teacher/my-groups', icon: Layers },
  { name: 'Mening talabalarim', path: '/teacher/my-students', icon: Users },
];

export default function AdminLayout() {
  const { user, role } = useSelector((state) => state.auth);
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const menu = role === 'admin' ? adminMenu : teacherMenu;

  const handleLogout = () => {
    // Logout logic here
    window.location.href = '/admin/login';
  };

  return (
    <div className="min-h-screen bg-emerald-50/50 dark:bg-emerald-950/50">
      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 rounded-lg bg-emerald-600 text-white shadow-lg shadow-emerald-600/25 dark:bg-lime-500 dark:text-emerald-950 dark:shadow-lime-500/25"
        >
          {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-40 w-64 bg-white/80 backdrop-blur-md border-r border-emerald-200/60 dark:bg-emerald-950/50 dark:border-lime-500/20 transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex h-16 items-center gap-2 px-6 border-b border-emerald-200/60 dark:border-lime-500/20">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-600 text-white shadow-lg shadow-emerald-600/50">
              <LayoutDashboard size={16} />
            </div>
            <span className="text-xl font-bold text-emerald-950 dark:text-lime-50">
              Edu-X
            </span>
          </div>

          {/* User info */}
          <div className="p-6 border-b border-emerald-200/60 dark:border-lime-500/20">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-200">
                {role === 'admin' ? <UserCheck size={20} /> : <BookOpen size={20} />}
              </div>
              <div>
                <p className="text-sm font-medium text-emerald-950 dark:text-lime-50">
                  {user?.name || 'Admin'}
                </p>
                <p className="text-xs text-emerald-900/75 dark:text-lime-100/60">
                  {role === 'admin' ? 'Administrator' : 'Ustoz'}
                </p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-1">
            {menu.map((item) => {
              const Icon = item.icon;
              const isActive = item.end 
                ? location.pathname === item.path 
                : location.pathname.startsWith(item.path);
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsSidebarOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2 rounded-xl transition-colors ${
                    isActive
                      ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-200'
                      : 'text-emerald-900/75 hover:bg-emerald-50 dark:text-lime-100/60 dark:hover:bg-emerald-900/30'
                  }`}
                >
                  <Icon size={20} />
                  <span className="text-sm font-medium">{item.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* Logout */}
          <div className="p-4 border-t border-emerald-200/60 dark:border-lime-500/20">
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 w-full px-3 py-2 rounded-xl text-emerald-900/75 hover:bg-emerald-50 dark:text-lime-100/60 dark:hover:bg-emerald-900/30 transition-colors"
            >
              <LogOut size={20} />
              <span className="text-sm font-medium">Chiqish</span>
            </button>
          </div>
        </div>
      </div>

      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top bar */}
        <header className="h-16 bg-white/80 backdrop-blur-md border-b border-emerald-200/60 dark:bg-emerald-950/50 dark:border-lime-500/20">
          <div className="flex h-16 items-center justify-between px-6">
            <div className="flex-1">
              <h1 className="text-xl font-semibold text-emerald-950 dark:text-lime-50">
                {menu.find(item => {
                  const isActive = item.end 
                    ? location.pathname === item.path 
                    : location.pathname.startsWith(item.path);
                  return isActive;
                })?.name || 'Dashboard'}
              </h1>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-sm text-emerald-900/75 dark:text-lime-100/60">
                {new Date().toLocaleDateString('uz-UZ', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
