import { Moon, Sun } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { setLocale, toggleTheme } from '../store/settingsSlice';
import { useT } from '../i18n/useT';
import { cn } from '../utils/cn';

export function ThemeLangControls({ className }) {
  const dispatch = useDispatch();
  const theme = useSelector((s) => s.settings.theme);
  const locale = useSelector((s) => s.settings.locale);
  const t = useT();
  const isDark = theme === 'dark';

  return (
    <div className={cn('flex flex-wrap items-center gap-2', className)}>
      <button
        type="button"
        onClick={() => dispatch(toggleTheme())}
        title={isDark ? t('topbar.themeToLight') : t('topbar.themeToDark')}
        className={cn(
          'flex h-10 w-10 items-center justify-center rounded-xl border font-mono text-xs transition',
          'border-emerald-200/90 bg-white/80 text-emerald-900 shadow-sm hover:bg-emerald-50',
          'dark:border-lime-500/25 dark:bg-emerald-950/60 dark:text-lime-300 dark:hover:bg-emerald-900/70'
        )}
      >
        {isDark ? <Sun size={18} strokeWidth={1.75} /> : <Moon size={18} strokeWidth={1.75} />}
      </button>

      <div
        className={cn(
          'flex rounded-xl border p-0.5 shadow-sm',
          'border-emerald-200/80 bg-white/60 dark:border-lime-500/20 dark:bg-emerald-950/50'
        )}
        role="group"
        aria-label="Language"
      >
        {(['uz', 'ru', 'en']).map((code) => (
          <button
            key={code}
            type="button"
            onClick={() => dispatch(setLocale(code))}
            className={cn(
              'min-w-[2.25rem] rounded-lg px-2 py-1.5 font-mono text-[11px] font-bold uppercase tracking-wide transition',
              locale === code
                ? 'bg-emerald-600 text-white shadow dark:bg-lime-500 dark:text-emerald-950'
                : 'text-emerald-900/70 hover:bg-emerald-50/90 dark:text-lime-200/70 dark:hover:bg-emerald-900/50'
            )}
          >
            {code}
          </button>
        ))}
      </div>
    </div>
  );
}
