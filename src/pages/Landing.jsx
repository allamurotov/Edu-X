import { Link } from 'react-router-dom';
import { GraduationCap, ArrowRight, BookOpen, Users, Award, CreditCard, Calendar, UserCheck, Play, CheckSquare } from 'lucide-react';

export default function Landing() {

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-lime-50 dark:from-emerald-950 dark:via-emerald-900 dark:to-lime-950">
      <div className="flex min-h-screen flex-col">
        {/* Navigation */}
        <nav className="border-b border-emerald-200/50 bg-white/80 backdrop-blur-md dark:border-lime-500/20 dark:bg-emerald-950/50">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-600 text-white shadow-lg shadow-emerald-600/50">
                  <GraduationCap size={20} />
                </div>
                <span className="text-xl font-bold text-emerald-950 dark:text-lime-50">
                  Edu-X
                </span>
              </div>
              <Link
                to="/login"
                className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2 text-sm font-medium text-white shadow-lg shadow-emerald-600/25 transition hover:bg-emerald-700 hover:-translate-y-px hover:shadow-emerald-700/25 dark:bg-lime-500 dark:text-emerald-950 dark:hover:bg-lime-400 dark:shadow-lime-500/25"
              >
                Kirish
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
                Edu-X — O'quv markazlar uchun boshqaruv tizimi
              </h1>
              <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-emerald-900/75 dark:text-lime-100/60">
                O'quvchilar, ustozlar, guruhlar va to'lovlarni bitta joyda oson boshqaring
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <Link
                  to="/login"
                  className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-6 py-3 text-base font-semibold text-white shadow-lg shadow-emerald-600/25 transition hover:bg-emerald-700 hover:-translate-y-px hover:shadow-emerald-700/25 dark:bg-lime-500 dark:text-emerald-950 dark:hover:bg-lime-400 dark:shadow-lime-500/25"
                >
                  Kirish
                  <ArrowRight size={20} />
                </Link>
              </div>
            </div>
          </div>
        </main>

        {/* Edu-X orqali o'quv markazingizni oson boshqaring */}
        <section className="bg-emerald-50/50 dark:bg-emerald-950/50">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-emerald-950 dark:text-lime-50 sm:text-4xl">
                Edu-X orqali o'quv markazingizni oson boshqaring
              </h2>
              <p className="mx-auto mt-4 max-w-3xl text-lg text-emerald-900/75 dark:text-lime-100/60">
                Edu-X — bu o'quv markazlar uchun zamonaviy boshqaruv tizimi. Bu tizim yordamida siz o'quvchilar, ustozlar, guruhlar va to'lovlarni bitta joyda nazorat qilib, vaqt va kuchingizni tejaysiz.
              </p>
            </div>

            {/* Benefits Grid */}
            <div className="mx-auto mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-2xl border border-emerald-200/60 bg-white/80 p-6 shadow-lg backdrop-blur-sm dark:border-lime-500/20 dark:bg-emerald-950/50 dark:shadow-emerald-900/50">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-200">
                  <BookOpen size={24} />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-emerald-950 dark:text-lime-50">
                  Hammasi bir joyda
                </h3>
                <p className="mt-2 text-sm text-emerald-900/75 dark:text-lime-100/60">
                  O'quvchilar, guruhlar va to'lovlar — barchasi bitta tizimda
                </p>
              </div>

              <div className="rounded-2xl border border-emerald-200/60 bg-white/80 p-6 shadow-lg backdrop-blur-sm dark:border-lime-500/20 dark:bg-emerald-950/50 dark:shadow-emerald-900/50">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-200">
                  <Calendar size={24} />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-emerald-950 dark:text-lime-50">
                  Vaqtni tejang
                </h3>
                <p className="mt-2 text-sm text-emerald-900/75 dark:text-lime-100/60">
                  Qog'oz va excel o'rniga avtomatik boshqaruv
                </p>
              </div>

              <div className="rounded-2xl border border-emerald-200/60 bg-white/80 p-6 shadow-lg backdrop-blur-sm dark:border-lime-500/20 dark:bg-emerald-950/50 dark:shadow-emerald-900/50">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-200">
                  <CreditCard size={24} />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-emerald-950 dark:text-lime-50">
                  To'lov nazorati
                </h3>
                <p className="mt-2 text-sm text-emerald-900/75 dark:text-lime-100/60">
                  Kim to'lagan, kim qarzdor — darrov ko'rasiz
                </p>
              </div>

              <div className="rounded-2xl border border-emerald-200/60 bg-white/80 p-6 shadow-lg backdrop-blur-sm dark:border-lime-500/20 dark:bg-emerald-950/50 dark:shadow-emerald-900/50">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-200">
                  <Users size={24} />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-emerald-950 dark:text-lime-50">
                  Tartibli darslar
                </h3>
                <p className="mt-2 text-sm text-emerald-900/75 dark:text-lime-100/60">
                  Guruhlar, jadval va ustozlar tizimli boshqariladi
                </p>
              </div>
            </div>

            {/* Natija Section */}
            <div className="mt-16 rounded-2xl border border-emerald-200/60 bg-white/80 p-8 shadow-lg backdrop-blur-sm dark:border-lime-500/20 dark:bg-emerald-950/50 dark:shadow-emerald-900/50">
              <h3 className="text-center text-2xl font-bold text-emerald-950 dark:text-lime-50">
                Natija
              </h3>
              <p className="mx-auto mt-4 text-center text-lg text-emerald-900/75 dark:text-lime-100/60">
                Edu-X orqali siz:
              </p>
              <div className="mx-auto mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-200">
                    <CheckSquare size={16} />
                  </div>
                  <span className="text-sm text-emerald-950 dark:text-lime-50">tartibli o'quv markazga ega bo'lasiz</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-200">
                    <CheckSquare size={16} />
                  </div>
                  <span className="text-sm text-emerald-950 dark:text-lime-50">xatolarni kamaytirasiz</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-200">
                    <CheckSquare size={16} />
                  </div>
                  <span className="text-sm text-emerald-950 dark:text-lime-50">daromadingizni nazorat qilasiz</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-200">
                    <CheckSquare size={16} />
                  </div>
                  <span className="text-sm text-emerald-950 dark:text-lime-50">ish jarayonini tezlashtirasiz</span>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="mt-12 text-center">
              <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                <Link
                  to="/login"
                  className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-8 py-3 text-base font-semibold text-white shadow-lg shadow-emerald-600/25 transition hover:bg-emerald-700 hover:-translate-y-px hover:shadow-emerald-700/25 dark:bg-lime-500 dark:text-emerald-950 dark:hover:bg-lime-400 dark:shadow-lime-500/25"
                >
                  <Play size={20} />
                  Demo ko'rish
                </Link>
                <Link
                  to="/login"
                  className="inline-flex items-center gap-2 rounded-xl border-2 border-emerald-600 bg-transparent px-8 py-3 text-base font-semibold text-emerald-600 shadow-lg shadow-emerald-600/25 transition hover:bg-emerald-50 hover:-translate-y-px hover:shadow-emerald-700/25 dark:border-lime-500 dark:text-lime-400 dark:hover:bg-lime-950/30 dark:shadow-lime-500/25"
                >
                  Boshlash
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-emerald-200/50 bg-white/80 backdrop-blur-md dark:border-lime-500/20 dark:bg-emerald-950/50">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <p className="text-center text-sm text-emerald-900/75 dark:text-lime-100/60">
              © 2024 Edu-X. Barcha huquqlar himoyalangan.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
