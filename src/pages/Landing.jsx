import { Link } from 'react-router-dom';
import { GraduationCap, ArrowRight, BookOpen, Users, Award } from 'lucide-react';
import { useT } from '../i18n/useT';

export default function Landing() {
  const t = useT();

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-lime-50 dark:from-emerald-950 dark:via-emerald-900 dark:to-lime-950">
      <div className="flex min-h-screen flex-col">
        {/* Navigation */}
        <nav className="border-b border-emerald-200/50 bg-white/80 backdrop-blur-md dark:border-lime-500/20 dark:bg-emerald-950/50">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-600 text-white">
                  <GraduationCap size={20} />
                </div>
                <span className="text-xl font-bold text-emerald-950 dark:text-lime-50">
                  Edu-X
                </span>
              </div>
              <Link
                to="/login"
                className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2 text-sm font-medium text-white shadow-lg transition hover:bg-emerald-700 hover:-translate-y-px dark:bg-lime-500 dark:text-emerald-950 dark:hover:bg-lime-400"
              >
                {t('login.signIn')}
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <main className="flex-1">
          <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-20">
            <div className="text-center">
              <h1 className="text-4xl font-bold tracking-tight text-emerald-950 dark:text-lime-50 sm:text-5xl lg:text-6xl">
                {t('landing.title')}
              </h1>
              <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-emerald-900/75 dark:text-lime-100/60">
                {t('landing.subtitle')}
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <Link
                  to="/login"
                  className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-6 py-3 text-base font-semibold text-white shadow-lg transition hover:bg-emerald-700 hover:-translate-y-px dark:bg-lime-500 dark:text-emerald-950 dark:hover:bg-lime-400"
                >
                  {t('login.signIn')}
                  <ArrowRight size={20} />
                </Link>
              </div>
            </div>

            {/* Features */}
            <div className="mx-auto mt-20 max-w-2xl lg:mt-24 lg:max-w-none">
              <div className="grid gap-8 lg:grid-cols-3">
                <div className="text-center">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-800 dark:bg-emerald-950/70 dark:text-lime-300">
                    <BookOpen size={32} />
                  </div>
                  <h3 className="mt-6 text-lg font-semibold text-emerald-950 dark:text-lime-50">
                    {t('landing.feature1Title')}
                  </h3>
                  <p className="mt-2 text-sm text-emerald-900/75 dark:text-lime-100/60">
                    {t('landing.feature1Desc')}
                  </p>
                </div>
                <div className="text-center">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-100 text-blue-800 dark:bg-blue-950/70 dark:text-blue-300">
                    <Users size={32} />
                  </div>
                  <h3 className="mt-6 text-lg font-semibold text-emerald-950 dark:text-lime-50">
                    {t('landing.feature2Title')}
                  </h3>
                  <p className="mt-2 text-sm text-emerald-900/75 dark:text-lime-100/60">
                    {t('landing.feature2Desc')}
                  </p>
                </div>
                <div className="text-center">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-purple-100 text-purple-800 dark:bg-purple-950/70 dark:text-purple-300">
                    <Award size={32} />
                  </div>
                  <h3 className="mt-6 text-lg font-semibold text-emerald-950 dark:text-lime-50">
                    {t('landing.feature3Title')}
                  </h3>
                  <p className="mt-2 text-sm text-emerald-900/75 dark:text-lime-100/60">
                    {t('landing.feature3Desc')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="border-t border-emerald-200/50 bg-white/80 backdrop-blur-md dark:border-lime-500/20 dark:bg-emerald-950/50">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <p className="text-center text-sm text-emerald-900/75 dark:text-lime-100/60">
              © 2024 Edu-X. {t('landing.footer')}
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
