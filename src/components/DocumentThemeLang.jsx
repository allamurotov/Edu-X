import { useEffect } from 'react';
import { useSelector } from 'react-redux';

/** Syncs Redux theme/locale to <html> class and lang (for Tailwind `dark:` and a11y). */
export function DocumentThemeLang() {
  const theme = useSelector((s) => s.settings.theme);
  const locale = useSelector((s) => s.settings.locale);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle('dark', theme === 'dark');
    root.lang = locale === 'uz' ? 'uz' : locale === 'ru' ? 'ru' : 'en';
  }, [theme, locale]);

  return null;
}
