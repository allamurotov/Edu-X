import { LogOut, Menu, Search, Bell, User } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../store/authSlice';
import { setAdminSearch } from '../store/uiSlice';
import { useNavigate } from 'react-router-dom';
import { useT } from '../i18n/useT';
import { ThemeLangControls } from './ThemeLangControls';

export default function Topbar({ onMenuClick }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const adminSearch = useSelector((state) => state.ui.adminSearch);
  const { user } = useSelector((state) => state.auth);
  const t = useT();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <header className="sticky top-0 z-30 h-16 border-b border-slate-200 bg-white/80 backdrop-blur-md dark:border-slate-800 dark:bg-[#0B0F19]/80">
      <div className="flex h-full items-center justify-between gap-4 px-4 md:px-8">
        <div className="flex flex-1 items-center gap-4">
          <button
            type="button"
            onClick={onMenuClick}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-600 transition hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700 md:hidden"
            aria-label={t('topbar.menu')}
          >
            <Menu size={20} />
          </button>

          <div className="relative max-w-md flex-1">
            <Search
              className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
              strokeWidth={2}
            />
            <input
              type="search"
              value={adminSearch}
              onChange={(e) => dispatch(setAdminSearch(e.target.value))}
              placeholder={t('topbar.searchPlaceholder')}
              className="h-10 w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10 dark:border-slate-800 dark:bg-slate-900/50 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:border-violet-500/50"
            />
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-2 md:gap-4">
          <ThemeLangControls />
          
          <button className="relative flex h-10 w-10 items-center justify-center rounded-xl text-slate-600 transition hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800">
            <Bell size={20} strokeWidth={2} />
            <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full border-2 border-white bg-rose-500 dark:border-[#0B0F19]" />
          </button>

          <div className="h-6 w-px bg-slate-200 dark:bg-slate-800" />

          <div className="flex items-center gap-3">
            <div className="hidden text-right md:block">
              <p className="text-xs font-semibold text-slate-900 dark:text-slate-100">
                {user?.firstName} {user?.lastName}
              </p>
              <p className="text-[10px] font-medium text-slate-500 dark:text-slate-400">
                {user?.role === 'admin' ? t('topbar.admin') : user?.role}
              </p>
            </div>
            
            <div className="group relative">
              <button className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl bg-violet-100 text-violet-600 ring-2 ring-violet-500/20 transition group-hover:ring-violet-500/40 dark:bg-violet-500/10 dark:text-violet-400">
                <User size={20} strokeWidth={2.25} />
              </button>
              
              <div className="invisible absolute right-0 top-full mt-2 w-48 scale-95 rounded-xl border border-slate-200 bg-white p-1.5 opacity-0 shadow-xl ring-1 ring-slate-950/5 transition-all group-hover:visible group-hover:scale-100 group-hover:opacity-100 dark:border-slate-800 dark:bg-[#0B0F19]">
                <button
                  onClick={handleLogout}
                  className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-rose-600 transition hover:bg-rose-50 dark:text-rose-400 dark:hover:bg-rose-500/10"
                >
                  <LogOut size={16} />
                  {t('topbar.logout')}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
