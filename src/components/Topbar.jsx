import { LogOut, Menu, Search } from 'lucide-react';
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
  const t = useT();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <header className="sticky top-0 z-50 border-b border-emerald-200/50 bg-white/50 backdrop-blur-xl dark:border-lime-500/15 dark:bg-emerald-950/40">
      <div className="flex h-[60px] items-center justify-between gap-3 px-4 md:gap-4 md:px-6">
        <div className="flex min-w-0 flex-1 items-center gap-3 md:gap-5">
          <button
            type="button"
            onClick={onMenuClick}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-transparent bg-emerald-900/5 text-emerald-900 transition hover:bg-emerald-900/10 dark:bg-lime-500/10 dark:text-lime-200 dark:hover:bg-lime-500/15 md:hidden"
            aria-label={t('topbar.menu')}
          >
            <Menu size={20} />
          </button>

          <div className="hidden shrink-0 items-center gap-2 font-semibold sm:flex">
            <span className="font-mono text-lg tracking-tight text-transparent bg-gradient-to-br from-emerald-600 via-lime-500 to-green-400 bg-clip-text dark:from-lime-400 dark:via-emerald-300 dark:to-lime-300">
              Edu-X
            </span>
            <span className="rounded-md border border-emerald-200/80 bg-emerald-50/80 px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider text-emerald-800 dark:border-lime-500/25 dark:bg-emerald-950/60 dark:text-lime-300/90">
              {t('topbar.admin')}
            </span>
          </div>

          <div className="relative min-w-0 max-w-xl flex-1">
            <Search
              className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-emerald-600/70 dark:text-lime-500/60"
              strokeWidth={2}
            />
            <input
              type="search"
              value={adminSearch}
              onChange={(e) => dispatch(setAdminSearch(e.target.value))}
              placeholder={t('topbar.searchPlaceholder')}
              className="h-10 w-full rounded-xl border border-emerald-200/80 bg-white/80 pl-10 pr-3 font-mono text-sm text-emerald-950 shadow-sm outline-none transition placeholder:text-emerald-600/50 focus:border-lime-500 focus:ring-2 focus:ring-lime-500/20 dark:border-lime-500/20 dark:bg-emerald-950/50 dark:text-lime-100 dark:placeholder:text-lime-500/40 dark:focus:border-lime-400 dark:focus:ring-lime-400/25"
            />
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-2 md:gap-3">
          <ThemeLangControls />
          <button
            type="button"
            onClick={handleLogout}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-emerald-800 transition hover:bg-emerald-100/80 hover:text-emerald-950 dark:text-lime-300/80 dark:hover:bg-emerald-900/50 dark:hover:text-lime-200"
            title={t('topbar.logout')}
          >
            <LogOut size={20} strokeWidth={1.75} />
          </button>
        </div>
      </div>
    </header>
  );
}
