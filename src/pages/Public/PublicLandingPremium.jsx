import { Link } from 'react-router-dom';
import { GraduationCap, ArrowRight, BookOpen, Users, Award, CreditCard, Calendar, UserCheck, CheckSquare, MapPin, Phone, MessageSquare, Zap, DollarSign, BarChart3, Brain, Monitor, Clock, TrendingUp, Users2, FileText, Settings } from 'lucide-react';

export default function PublicLanding() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-black to-slate-900 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 via-transparent to-emerald-500/5"></div>
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(rgba(0, 255, 136, 0.03) 1px, transparent 1px),
                           linear-gradient(rgba(0, 255, 136, 0.03) 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
          backgroundPosition: '0 0, 25px 25px'
        }}></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-green-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 flex min-h-screen flex-col">
        {/* Navigation */}
        <nav className="border-b border-green-500/10 bg-black/40 backdrop-blur-xl">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-r from-green-400 to-emerald-500 text-white shadow-lg shadow-green-500/20">
                  <GraduationCap size={24} />
                </div>
                <span className="text-2xl font-bold text-white">
                  Edu-X
                </span>
              </div>
              <div className="flex items-center gap-4">
                <Link
                  to="/student/login"
                  className="inline-flex items-center gap-2 rounded-xl border border-green-500/20 bg-white/5 px-4 py-2 text-sm font-medium text-green-400 backdrop-blur-sm transition-all hover:bg-white/10 hover:border-green-500/30 hover:text-green-300 hover:shadow-lg hover:shadow-green-500/10"
                >
                  O'quvchi kirish
                </Link>
                <Link
                  to="/admin"
                  className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-green-400 to-emerald-500 px-4 py-2 text-sm font-medium text-white shadow-lg shadow-green-500/20 transition-all hover:from-green-500 hover:to-emerald-600 hover:shadow-green-500/30 hover:-translate-y-px"
                >
                  Admin bilan bog'lanish
                </Link>
              </div>
            </div>
          </div>
        </nav>

        {/* Hero Section - 2 Columns */}
        <main className="flex-1">
          <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-32">
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
              {/* Left Column */}
              <div className="text-center lg:text-left">
                <h1 className="text-5xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl">
                  Edu-X — O'quv markazni
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-400">
                    boshqarishning eng oson yo'li
                  </span>
                </h1>
                <p className="mt-6 text-lg leading-8 text-gray-300 sm:text-xl">
                  O'quvchilar, ustozlar, guruhlar, dars jadvali va to'lovlarni bitta tizimda tartibli boshqaring.
                </p>
                <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center sm:gap-6">
                  <Link
                    to="/student/login"
                    className="inline-flex items-center gap-3 rounded-2xl bg-gradient-to-r from-green-400 to-emerald-500 px-8 py-4 text-lg font-semibold text-white shadow-lg shadow-green-500/20 transition-all hover:from-green-500 hover:to-emerald-600 hover:shadow-green-500/30 hover:-translate-y-px"
                  >
                    Bepul sinab ko'rish
                    <ArrowRight size={20} />
                  </Link>
                  <Link
                    to="/admin"
                    className="inline-flex items-center gap-3 rounded-2xl border border-green-500/20 bg-white/5 px-8 py-4 text-lg font-semibold text-green-400 backdrop-blur-sm transition-all hover:bg-white/10 hover:border-green-500/30 hover:text-green-300 hover:shadow-lg hover:shadow-green-500/10"
                  >
                    Admin bilan bog'lanish
                  </Link>
                </div>
                <p className="mt-8 text-sm text-gray-500">
                  100+ markazlar tomonidan ishlatilmoqda
                </p>
              </div>

              {/* Right Column - Dashboard Preview */}
              <div className="relative">
                <div className="rounded-2xl border border-green-500/20 bg-gradient-to-br from-slate-900/90 to-slate-800/90 p-1 backdrop-blur-xl shadow-2xl shadow-green-500/10">
                  <div className="rounded-xl bg-black/60 p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <Monitor className="text-green-400" size={20} />
                      <span className="text-sm font-medium text-green-400">Admin Panel Preview</span>
                    </div>
                    
                    {/* Stats Cards */}
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <div className="rounded-lg border border-green-500/10 bg-white/5 p-3">
                        <div className="flex items-center gap-2">
                          <Users2 className="text-green-400" size={16} />
                          <div>
                            <p className="text-2xl font-bold text-white">1,200+</p>
                            <p className="text-xs text-gray-400">O'quvchilar</p>
                          </div>
                        </div>
                      </div>
                      <div className="rounded-lg border border-green-500/10 bg-white/5 p-3">
                        <div className="flex items-center gap-2">
                          <Users className="text-green-400" size={16} />
                          <div>
                            <p className="text-2xl font-bold text-white">45</p>
                            <p className="text-xs text-gray-400">Guruhlar</p>
                          </div>
                        </div>
                      </div>
                      <div className="rounded-lg border border-green-500/10 bg-white/5 p-3">
                        <div className="flex items-center gap-2">
                          <TrendingUp className="text-green-400" size={16} />
                          <div>
                            <p className="text-2xl font-bold text-white">98%</p>
                            <p className="text-xs text-gray-400">To'lov nazorati</p>
                          </div>
                        </div>
                      </div>
                      <div className="rounded-lg border border-green-500/10 bg-white/5 p-3">
                        <div className="flex items-center gap-2">
                          <Clock className="text-green-400" size={16} />
                          <div>
                            <p className="text-2xl font-bold text-white">24/7</p>
                            <p className="text-xs text-gray-400">Nazorat</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Dashboard Mockup */}
                    <div className="mt-4 space-y-2">
                      <div className="flex gap-2">
                        <div className="w-8 h-8 rounded bg-green-500/20 border border-green-500/30"></div>
                        <div className="flex-1 h-8 rounded bg-green-500/10 border border-green-500/20"></div>
                      </div>
                      <div className="flex gap-2">
                        <div className="w-8 h-8 rounded bg-green-500/20 border border-green-500/30"></div>
                        <div className="flex-1 h-8 rounded bg-green-500/10 border border-green-500/20"></div>
                      </div>
                      <div className="flex gap-2">
                        <div className="w-8 h-8 rounded bg-green-500/20 border border-green-500/30"></div>
                        <div className="flex-1 h-8 rounded bg-green-500/10 border border-green-500/20"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Nega Edu-X? Section */}
        <section className="border-t border-green-500/10 bg-black/40 py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-4xl font-bold text-white sm:text-5xl">
                Nega Edu-X?
              </h2>
            </div>
            <div className="mx-auto mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              <div className="group relative rounded-2xl border border-green-500/10 bg-white/5 p-8 backdrop-blur-sm transition-all hover:border-green-500/20 hover:bg-white/10 hover:shadow-lg hover:shadow-green-500/10 hover:-translate-y-1">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-r from-green-400 to-emerald-500 text-white shadow-lg shadow-green-500/20">
                  <Clock size={32} />
                </div>
                <h3 className="mt-6 text-xl font-semibold text-white">
                  Vaqtni tejaydi
                </h3>
                <p className="mt-4 text-gray-300">
                  Avtomatlashtirilgan tizim vaqtni tejaydi
                </p>
              </div>

              <div className="group relative rounded-2xl border border-green-500/10 bg-white/5 p-8 backdrop-blur-sm transition-all hover:border-green-500/20 hover:bg-white/10 hover:shadow-lg hover:shadow-green-500/10 hover:-translate-y-1">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-r from-green-400 to-emerald-500 text-white shadow-lg shadow-green-500/20">
                  <DollarSign size={32} />
                </div>
                <h3 className="mt-6 text-xl font-semibold text-white">
                  Moliya nazorati
                </h3>
                <p className="mt-4 text-gray-300">
                  Daromad va qarzdorlarni aniq ko'ring
                </p>
              </div>

              <div className="group relative rounded-2xl border border-green-500/10 bg-white/5 p-8 backdrop-blur-sm transition-all hover:border-green-500/20 hover:bg-white/10 hover:shadow-lg hover:shadow-green-500/10 hover:-translate-y-1">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-r from-green-400 to-emerald-500 text-white shadow-lg shadow-green-500/20">
                  <Calendar size={32} />
                </div>
                <h3 className="mt-6 text-xl font-semibold text-white">
                  Darslarni tartiblaydi
                </h3>
                <p className="mt-4 text-gray-300">
                  Guruhlar va jadvalni oson boshqaring
                </p>
              </div>

              <div className="group relative rounded-2xl border border-green-500/10 bg-white/5 p-8 backdrop-blur-sm transition-all hover:border-green-500/20 hover:bg-white/10 hover:shadow-lg hover:shadow-green-500/10 hover:-translate-y-1">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-r from-green-400 to-emerald-500 text-white shadow-lg shadow-green-500/20">
                  <BarChart3 size={32} />
                </div>
                <h3 className="mt-6 text-xl font-semibold text-white">
                  Hisobot beradi
                </h3>
                <p className="mt-4 text-gray-300">
                  Statistika va tahlillarni oling
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Edu-X qanday ishlaydi? Section */}
        <section className="py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-4xl font-bold text-white sm:text-5xl">
                Edu-X qanday ishlaydi?
              </h2>
            </div>
            <div className="mx-auto mt-16 max-w-4xl">
              <div className="space-y-8">
                <div className="flex items-start gap-6">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-r from-green-400 to-emerald-500 text-white shadow-lg shadow-green-500/20">
                    <span className="text-lg font-bold">1</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white">
                      Markaz ma'lumotlarini kiriting
                    </h3>
                    <p className="mt-2 text-gray-300">
                      O'quv markazingizning asosiy ma'lumotlarini tizimga kiriting
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-6">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-r from-green-400 to-emerald-500 text-white shadow-lg shadow-green-500/20">
                    <span className="text-lg font-bold">2</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white">
                      Ustoz va o'quvchilarni qo'shing
                    </h3>
                    <p className="mt-2 text-gray-300">
                      O'qituvchilar va o'quvchilarni ro'yxatdan o'tkazing
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-6">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-r from-green-400 to-emerald-500 text-white shadow-lg shadow-green-500/20">
                    <span className="text-lg font-bold">3</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white">
                      Guruh va to'lovlarni boshqaring
                    </h3>
                    <p className="mt-2 text-gray-300">
                      Guruhlar oching va dars jadvalini tuzing
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Admin Panel Preview Section */}
        <section className="border-t border-green-500/10 bg-black/40 py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-4xl font-bold text-white sm:text-5xl">
                Admin Panel Preview
              </h2>
            </div>
            <div className="mx-auto mt-16 max-w-5xl">
              <div className="rounded-2xl border border-green-500/20 bg-gradient-to-br from-slate-900/90 to-slate-800/90 p-1 backdrop-blur-xl shadow-2xl shadow-green-500/10">
                <div className="rounded-xl bg-black/60 p-6">
                  <div className="grid gap-6 lg:grid-cols-3">
                    {/* Sidebar */}
                    <div className="lg:col-span-1">
                      <div className="rounded-lg border border-green-500/10 bg-white/5 p-4">
                        <div className="space-y-3">
                          <div className="h-2 w-full rounded bg-green-500/20"></div>
                          <div className="h-2 w-full rounded bg-green-500/20"></div>
                          <div className="h-2 w-full rounded bg-green-500/20"></div>
                          <div className="h-2 w-full rounded bg-green-500/20"></div>
                          <div className="h-2 w-full rounded bg-green-500/20"></div>
                        </div>
                      </div>
                    </div>

                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-4">
                      {/* Student Table */}
                      <div className="rounded-lg border border-green-500/10 bg-white/5 p-4">
                        <div className="flex items-center gap-2 mb-3">
                          <Users className="text-green-400" size={16} />
                          <span className="text-sm font-medium text-green-400">O'quvchilar</span>
                        </div>
                        <div className="space-y-2">
                          <div className="h-8 rounded bg-green-500/10 border border-green-500/20"></div>
                          <div className="h-8 rounded bg-green-500/10 border border-green-500/20"></div>
                          <div className="h-8 rounded bg-green-500/10 border border-green-500/20"></div>
                        </div>
                      </div>

                      {/* Revenue Card */}
                      <div className="rounded-lg border border-green-500/10 bg-white/5 p-4">
                        <div className="flex items-center gap-2 mb-3">
                          <DollarSign className="text-green-400" size={16} />
                          <span className="text-sm font-medium text-green-400">Daromad</span>
                        </div>
                        <div className="h-16 rounded bg-green-500/10 border border-green-500/20"></div>
                      </div>

                      {/* Schedule Card */}
                      <div className="rounded-lg border border-green-500/10 bg-white/5 p-4">
                        <div className="flex items-center gap-2 mb-3">
                          <Calendar className="text-green-400" size={16} />
                          <span className="text-sm font-medium text-green-400">Jadval</span>
                        </div>
                        <div className="h-16 rounded bg-green-500/10 border border-green-500/20"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-4xl font-bold text-white sm:text-5xl">
                Bog'lanish
              </h2>
            </div>
            <div className="mx-auto mt-16 grid gap-8 lg:grid-cols-3">
              {/* Contact Cards */}
              <div className="group relative rounded-2xl border border-green-500/10 bg-white/5 p-8 backdrop-blur-sm transition-all hover:border-green-500/20 hover:bg-white/10 hover:shadow-lg hover:shadow-green-500/10 hover:-translate-y-1">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-r from-green-400/20 to-emerald-500/20 text-green-400 shadow-lg shadow-green-500/10">
                  <Phone size={32} />
                </div>
                <h3 className="mt-6 text-xl font-semibold text-white">
                  Telefon
                </h3>
                <p className="mt-4 text-gray-300">
                  +998 90 000 00 00
                </p>
              </div>

              <div className="group relative rounded-2xl border border-green-500/10 bg-white/5 p-8 backdrop-blur-sm transition-all hover:border-green-500/20 hover:bg-white/10 hover:shadow-lg hover:shadow-green-500/10 hover:-translate-y-1">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-r from-green-400/20 to-emerald-500/20 text-green-400 shadow-lg shadow-green-500/10">
                  <MessageSquare size={32} />
                </div>
                <h3 className="mt-6 text-xl font-semibold text-white">
                  Telegram
                </h3>
                <p className="mt-4 text-gray-300">
                  @edux_admin
                </p>
              </div>

              <div className="group relative rounded-2xl border border-green-500/10 bg-white/5 p-8 backdrop-blur-sm transition-all hover:border-green-500/20 hover:bg-white/10 hover:shadow-lg hover:shadow-green-500/10 hover:-translate-y-1">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-r from-green-400/20 to-emerald-500/20 text-green-400 shadow-lg shadow-green-500/10">
                  <Clock size={32} />
                </div>
                <h3 className="mt-6 text-xl font-semibold text-white">
                  Ish vaqti
                </h3>
                <p className="mt-4 text-gray-300">
                  Dushanba - Shanba, 09:00 - 18:00
                </p>
              </div>
            </div>

            {/* Contact Form */}
            <div className="mx-auto mt-16 max-w-2xl">
              <div className="rounded-2xl border border-green-500/10 bg-white/5 p-8 backdrop-blur-sm">
                <h3 className="text-xl font-semibold text-white mb-6">
                  Xabar yuborish
                </h3>
                <form className="space-y-4">
                  <input
                    type="text"
                    placeholder="Ism"
                    className="w-full rounded-xl border border-green-500/10 bg-white/5 px-4 py-3 text-white placeholder-gray-500 backdrop-blur-sm transition-all focus:border-green-500/30 focus:bg-white/10 focus:outline-none focus:ring-2 focus:ring-green-500/20"
                  />
                  <input
                    type="tel"
                    placeholder="Telefon raqam"
                    className="w-full rounded-xl border border-green-500/10 bg-white/5 px-4 py-3 text-white placeholder-gray-500 backdrop-blur-sm transition-all focus:border-green-500/30 focus:bg-white/10 focus:outline-none focus:ring-2 focus:ring-green-500/20"
                  />
                  <textarea
                    placeholder="Xabar"
                    rows={4}
                    className="w-full rounded-xl border border-green-500/10 bg-white/5 px-4 py-3 text-white placeholder-gray-500 backdrop-blur-sm transition-all focus:border-green-500/30 focus:bg-white/10 focus:outline-none focus:ring-2 focus:ring-green-500/20"
                  />
                  <button
                    type="submit"
                    className="w-full rounded-xl bg-gradient-to-r from-green-400 to-emerald-500 px-4 py-3 text-sm font-medium text-white shadow-lg shadow-green-500/20 transition-all hover:from-green-500 hover:to-emerald-600 hover:shadow-green-500/30 hover:-translate-y-px"
                  >
                    Yuborish
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-green-500/10 bg-black/40 backdrop-blur-xl">
          <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
            <p className="text-center text-gray-400">
              © 2024 Edu-X. Barcha huquqlar himoyalangan.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
