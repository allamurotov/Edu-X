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
  X,
  Moon,
  Sun,
  Globe
} from 'lucide-react';
import { useState, useEffect } from 'react';


const translations = {
  uz: {
    asosiy: 'Asosiy',
    talabalar: 'Talabalar',
    ustozlar: 'Ustozlar',
    guruhlar: 'Guruhlar',
    jadval: 'Jadval',
    moliya: 'Moliya',
    uyIshi: 'Uy ishi',
    davomat: 'Davomat',
    kurslar: 'Kurslar',
    lidlar: 'Lidlar',
    sozlamalar: 'Sozlamalar',
    dokon: 'Do\'kon',
    administrator: 'Administrator',
    ustoz: 'Ustoz',
    chiqish: 'Chiqish',
    meningGuruhlarim: 'Mening guruhlarim',
    meningTalabalarim: 'Mening talabalarim'
  },
  ru: {
    asosiy: 'Основной',
    talabalar: 'Студенты',
    ustozlar: 'Учителя',
    guruhlar: 'Группы',
    jadval: 'Расписание',
    moliya: 'Финансы',
    uyIshi: 'Домашние задания',
    davomat: 'Посещаемость',
    kurslar: 'Курсы',
    lidlar: 'Лиды',
    sozlamalar: 'Настройки',
    dokon: 'Магазин',
    administrator: 'Администратор',
    ustoz: 'Учитель',
    chiqish: 'Выйти',
    meningGuruhlarim: 'Мои группы',
    meningTalabalarim: 'Мои студенты'
  },
  en: {
    asosiy: 'Dashboard',
    talabalar: 'Students',
    ustozlar: 'Teachers',
    guruhlar: 'Groups',
    jadval: 'Schedule',
    moliya: 'Finance',
    uyIshi: 'Homework',
    davomat: 'Attendance',
    kurslar: 'Courses',
    lidlar: 'Leads',
    sozlamalar: 'Settings',
    dokon: 'Shop',
    administrator: 'Administrator',
    ustoz: 'Teacher',
    chiqish: 'Logout',
    meningGuruhlarim: 'My Groups',
    meningTalabalarim: 'My Students'
  }
};

const adminMenu = [
  { name: 'talabalar', path: '/admin/dashboard/students', icon: Users },
  { name: 'ustozlar', path: '/admin/dashboard/teachers', icon: UserCheck },
  { name: 'guruhlar', path: '/admin/dashboard/groups', icon: Layers },
  { name: 'jadval', path: '/admin/dashboard/schedule', icon: Calendar },
  { name: 'moliya', path: '/admin/dashboard/finance', icon: Wallet },
  { name: 'kurslar', path: '/admin/dashboard/courses', icon: BookOpen },
  { name: 'lidlar', path: '/admin/dashboard/leads', icon: MessageSquare },
  { name: 'sozlamalar', path: '/admin/dashboard/settings', icon: Settings },
  { name: 'dokon', path: '/admin/dashboard/shop', icon: Store },
];

const teacherMenu = [
  { name: 'asosiy', path: '/teacher', icon: LayoutDashboard, end: true },
  { name: 'meningGuruhlarim', path: '/teacher/my-groups', icon: Layers },
  { name: 'meningTalabalarim', path: '/teacher/my-students', icon: Users },
];

export default function AdminLayout() {
  const { user, role } = useSelector((state) => state.auth);
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('eduXTheme');
    return saved !== null ? saved === 'dark' : true; // Default to dark
  });
  const [language, setLanguage] = useState(() => {
    const saved = localStorage.getItem('eduXLang');
    return saved || 'uz'; // Default to Uzbek
  });

  useEffect(() => {
    localStorage.setItem('eduXTheme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  useEffect(() => {
    localStorage.setItem('eduXLang', language);
  }, [language]);

  const t = translations[language];
  const menu = role === 'admin' ? adminMenu : teacherMenu;

  const handleLogout = () => {
    // Logout logic here
    window.location.href = '/admin/login';
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-[#000000]' : 'bg-[#F8FAFC]'}`}>
      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 rounded-lg bg-gradient-to-r from-[#00FF88] to-[#22C55E] text-white shadow-lg shadow-[#00FF88]/25 hover:shadow-[#00FF88]/40 transition-all"
        >
          {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-40 w-64 backdrop-blur-md transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
        isDarkMode 
          ? 'bg-[#000000] border-r border-[rgba(0,255,136,0.20)]' 
          : 'bg-[#FFFFFF] border-r border-[#D1D5DB]'
      } ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className={`flex h-16 items-center gap-2 px-6 border-b ${
            isDarkMode ? 'border-[rgba(0,255,136,0.20)]' : 'border-[#D1D5DB]'
          }`}>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-r from-[#00FF88] to-[#22C55E] text-white shadow-lg shadow-[#00FF88]/50">
              <LayoutDashboard size={16} />
            </div>
            <span className={`text-xl font-bold ${isDarkMode ? 'text-[#FFFFFF]' : 'text-[#0F172A]'}`}>
              Edu-X
            </span>
          </div>

          {/* User info */}
          <div className={`p-6 border-b ${
            isDarkMode ? 'border-[rgba(0,255,136,0.20)]' : 'border-[#D1D5DB]'
          }`}>
            <div className="flex items-center gap-3">
              <div className={`flex h-10 w-10 items-center justify-center rounded-full ${
                isDarkMode ? 'bg-[rgba(0,255,136,0.1)] text-[#00FF88]' : 'bg-[#DCFCE7] text-[#16A34A]'
              }`}>
                {role === 'admin' ? <UserCheck size={20} /> : <BookOpen size={20} />}
              </div>
              <div>
                <p className={`text-sm font-medium ${isDarkMode ? 'text-[#FFFFFF]' : 'text-[#0F172A]'}`}>
                  {user?.name || 'Admin'}
                </p>
                <p className={`text-xs ${isDarkMode ? 'text-[#A7F3D0]' : 'text-[#475569]'}`}>
                  {role === 'admin' ? t.administrator : t.ustoz}
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
                  className={`flex items-center gap-3 px-3 py-2 rounded-xl transition-all ${
                    isActive
                      ? isDarkMode 
                        ? 'bg-[rgba(0,255,136,0.15)] text-[#00FF88] shadow-[#00FF88]/10'
                        : 'bg-[#DCFCE7] text-[#16A34A] shadow-[#16A34A]/10'
                      : isDarkMode
                        ? 'text-[#A7F3D0] hover:bg-[rgba(0,255,136,0.08)] hover:text-[#FFFFFF]'
                        : 'text-[#475569] hover:bg-[#DCFCE7] hover:text-[#16A34A]'
                  }`}
                >
                  <Icon size={20} />
                  <span className="text-sm font-medium">{t[item.name]}</span>
                </Link>
              );
            })}
          </nav>

          {/* Logout */}
          <div className={`p-4 border-t ${
            isDarkMode ? 'border-[rgba(0,255,136,0.20)]' : 'border-[#D1D5DB]'
          }`}>
            <button
              onClick={handleLogout}
              className={`flex items-center gap-3 w-full px-3 py-2 rounded-xl transition-all ${
                isDarkMode
                  ? 'text-[#A7F3D0] hover:bg-[rgba(0,255,136,0.08)] hover:text-[#FFFFFF]'
                  : 'text-[#475569] hover:bg-[#DCFCE7] hover:text-[#16A34A]'
              }`}
            >
              <LogOut size={20} />
              <span className="text-sm font-medium">{t.chiqish}</span>
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
        <header className={`h-16 backdrop-blur-md border-b ${
          isDarkMode 
            ? 'bg-[#020403] border-[rgba(0,255,136,0.20)]' 
            : 'bg-[#FFFFFF] border-[#D1D5DB]'
        }`}>
          <div className="flex h-16 items-center justify-between px-6">
            <div className="flex-1">
              <h1 className={`text-xl font-semibold ${
                isDarkMode ? 'text-[#FFFFFF]' : 'text-[#0F172A]'
              }`}>
                {t[menu.find(item => {
                  const isActive = item.end 
                    ? location.pathname === item.path 
                    : location.pathname.startsWith(item.path);
                  return isActive;
                })?.name] || t.asosiy}
              </h1>
            </div>
            <div className="flex items-center gap-4">
              {/* Language Switcher */}
              <div className="flex items-center gap-2">
                <Globe size={16} className={isDarkMode ? 'text-[#6EE7B7]' : 'text-[#475569]'} />
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className={`text-sm font-medium bg-transparent border-none outline-none cursor-pointer ${
                    isDarkMode ? 'text-[#6EE7B7]' : 'text-[#475569]'
                  }`}
                >
                  <option value="uz">UZ</option>
                  <option value="ru">RU</option>
                  <option value="en">EN</option>
                </select>
              </div>
              
              {/* Dark Mode Toggle */}
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className={`p-2 rounded-lg transition-all ${
                  isDarkMode 
                    ? 'bg-[rgba(0,255,136,0.1)] text-[#00FF88] hover:bg-[rgba(0,255,136,0.2)]' 
                    : 'bg-[#DCFCE7] text-[#16A34A] hover:bg-[#22C55E]'
                }`}
              >
                {isDarkMode ? <Sun size={16} /> : <Moon size={16} />}
              </button>
              
              <div className={`text-sm ${
                isDarkMode ? 'text-[#6EE7B7]' : 'text-[#475569]'
              }`}>
                {new Date().toLocaleDateString(language === 'ru' ? 'ru-RU' : language === 'en' ? 'en-US' : 'uz-UZ', { 
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
        <main className={`p-6 ${isDarkMode ? 'bg-[#000000]' : 'bg-[#F8FAFC]'}`}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
