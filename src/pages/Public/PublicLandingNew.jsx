import { Link } from 'react-router-dom';
import { GraduationCap, ArrowRight, BookOpen, Users, Award, CreditCard, Calendar, UserCheck, CheckSquare, MapPin, Phone, MessageSquare, Zap, DollarSign, BarChart3, Brain } from 'lucide-react';

export default function PublicLanding() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-black to-slate-900">
      <div className="flex min-h-screen flex-col">
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

        {/* Hero Section */}
        <main className="flex-1">
          <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-32">
            <div className="text-center">
              <h1 className="text-5xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl">
                Edu-X — O'quv markazni
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-400">
                  boshqarishning eng oson yo'li
                </span>
              </h1>
              <p className="mx-auto mt-8 max-w-3xl text-xl leading-8 text-gray-300 sm:text-2xl">
                O'quvchilar, ustozlar, guruhlar va to'lovlarni bitta tizimda tartibga soling va markazingizni yangi darajaga olib chiqing.
              </p>
              <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center sm:gap-6">
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
          </div>
        </main>

        {/* Edu-X nima? Section */}
        <section className="border-t border-green-500/10 bg-black/40">
          <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-4xl font-bold text-white sm:text-5xl">
                Edu-X nima?
              </h2>
              <p className="mx-auto mt-6 max-w-3xl text-xl text-gray-300">
                Edu-X — bu o'quv markazlar uchun yaratilgan aqlli boshqaruv tizimi. U orqali siz barcha jarayonlarni avtomatlashtirib, vaqtni tejaysiz va tartibli ishlashga erishasiz.
              </p>
            </div>
          </div>
        </section>

        {/* Nega aynan Edu-X? Section */}
        <section className="py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-4xl font-bold text-white sm:text-5xl">
                Nega aynan Edu-X?
              </h2>
            </div>
            <div className="mx-auto mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              <div className="group relative rounded-2xl border border-green-500/10 bg-white/5 p-8 backdrop-blur-sm transition-all hover:border-green-500/20 hover:bg-white/10 hover:shadow-lg hover:shadow-green-500/10 hover:-translate-y-1">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-r from-green-400 to-emerald-500 text-white shadow-lg shadow-green-500/20">
                  <Zap size={32} />
                </div>
                <h3 className="mt-6 text-xl font-semibold text-white">
                  Tez va oson boshqaruv
                </h3>
                <p className="mt-4 text-gray-300">
                  Hamma ma'lumotlar bitta joyda — ortiqcha vaqt ketmaydi
                </p>
              </div>

              <div className="group relative rounded-2xl border border-green-500/10 bg-white/5 p-8 backdrop-blur-sm transition-all hover:border-green-500/20 hover:bg-white/10 hover:shadow-lg hover:shadow-green-500/10 hover:-translate-y-1">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-r from-green-400 to-emerald-500 text-white shadow-lg shadow-green-500/20">
                  <DollarSign size={32} />
                </div>
                <h3 className="mt-6 text-xl font-semibold text-white">
                  To'liq moliya nazorati
                </h3>
                <p className="mt-4 text-gray-300">
                  Daromad va qarzdorlarni aniq ko'rasiz
                </p>
              </div>

              <div className="group relative rounded-2xl border border-green-500/10 bg-white/5 p-8 backdrop-blur-sm transition-all hover:border-green-500/20 hover:bg-white/10 hover:shadow-lg hover:shadow-green-500/10 hover:-translate-y-1">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-r from-green-400 to-emerald-500 text-white shadow-lg shadow-green-500/20">
                  <BarChart3 size={32} />
                </div>
                <h3 className="mt-6 text-xl font-semibold text-white">
                  Real statistikalar
                </h3>
                <p className="mt-4 text-gray-300">
                  Markazingiz qanchalik o'sayotganini kuzating
                </p>
              </div>

              <div className="group relative rounded-2xl border border-green-500/10 bg-white/5 p-8 backdrop-blur-sm transition-all hover:border-green-500/20 hover:bg-white/10 hover:shadow-lg hover:shadow-green-500/10 hover:-translate-y-1">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-r from-green-400 to-emerald-500 text-white shadow-lg shadow-green-500/20">
                  <Brain size={32} />
                </div>
                <h3 className="mt-6 text-xl font-semibold text-white">
                  Aqlli tizim
                </h3>
                <p className="mt-4 text-gray-300">
                  Xatolar kamayadi, ish jarayoni tezlashadi
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Nimalar qila olasiz? Section */}
        <section className="border-t border-green-500/10 bg-black/40 py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-4xl font-bold text-white sm:text-5xl">
                Nimalar qila olasiz?
              </h2>
            </div>
            <div className="mx-auto mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <div className="group relative rounded-2xl border border-green-500/10 bg-white/5 p-8 backdrop-blur-sm transition-all hover:border-green-500/20 hover:bg-white/10 hover:shadow-lg hover:shadow-green-500/10 hover:-translate-y-1">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-r from-green-400/20 to-emerald-500/20 text-green-400 shadow-lg shadow-green-500/10">
                  <Users size={32} />
                </div>
                <h3 className="mt-6 text-xl font-semibold text-white">
                  O'quvchilarni boshqarish
                </h3>
                <p className="mt-4 text-gray-300">
                  O'quvchilarni ro'yxatdan o'tkazing, guruhlarga qo'shing va ma'lumotlarini saqlang.
                </p>
              </div>

              <div className="group relative rounded-2xl border border-green-500/10 bg-white/5 p-8 backdrop-blur-sm transition-all hover:border-green-500/20 hover:bg-white/10 hover:shadow-lg hover:shadow-green-500/10 hover:-translate-y-1">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-r from-green-400/20 to-emerald-500/20 text-green-400 shadow-lg shadow-green-500/10">
                  <Calendar size={32} />
                </div>
                <h3 className="mt-6 text-xl font-semibold text-white">
                  Guruh va jadval
                </h3>
                <p className="mt-4 text-gray-300">
                  Guruhlar yarating, ustozlarni biriktiring va dars vaqtlarini belgilang.
                </p>
              </div>

              <div className="group relative rounded-2xl border border-green-500/10 bg-white/5 p-8 backdrop-blur-sm transition-all hover:border-green-500/20 hover:bg-white/10 hover:shadow-lg hover:shadow-green-500/10 hover:-translate-y-1">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-r from-green-400/20 to-emerald-500/20 text-green-400 shadow-lg shadow-green-500/10">
                  <CreditCard size={32} />
                </div>
                <h3 className="mt-6 text-xl font-semibold text-white">
                  To'lov nazorati
                </h3>
                <p className="mt-4 text-gray-300">
                  Kim to'lagan, kim qarzdor — hammasini bitta joyda ko'ring.
                </p>
              </div>

              <div className="group relative rounded-2xl border border-green-500/10 bg-white/5 p-8 backdrop-blur-sm transition-all hover:border-green-500/20 hover:bg-white/10 hover:shadow-lg hover:shadow-green-500/10 hover:-translate-y-1">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-r from-green-400/20 to-emerald-500/20 text-green-400 shadow-lg shadow-green-500/10">
                  <UserCheck size={32} />
                </div>
                <h3 className="mt-6 text-xl font-semibold text-white">
                  Ustozlar paneli
                </h3>
                <p className="mt-4 text-gray-300">
                  Ustozlar o'z guruhlari, darslari va davomatni ko'ra oladi.
                </p>
              </div>

              <div className="group relative rounded-2xl border border-green-500/10 bg-white/5 p-8 backdrop-blur-sm transition-all hover:border-green-500/20 hover:bg-white/10 hover:shadow-lg hover:shadow-green-500/10 hover:-translate-y-1">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-r from-green-400/20 to-emerald-500/20 text-green-400 shadow-lg shadow-green-500/10">
                  <BookOpen size={32} />
                </div>
                <h3 className="mt-6 text-xl font-semibold text-white">
                  O'quvchi paneli
                </h3>
                <p className="mt-4 text-gray-300">
                  O'quvchilar o'z darslari, ballari, natijalari va ma'lumotlarini ko'ra oladi.
                </p>
              </div>

              <div className="group relative rounded-2xl border border-green-500/10 bg-white/5 p-8 backdrop-blur-sm transition-all hover:border-green-500/20 hover:bg-white/10 hover:shadow-lg hover:shadow-green-500/10 hover:-translate-y-1">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-r from-green-400/20 to-emerald-500/20 text-green-400 shadow-lg shadow-green-500/10">
                  <Award size={32} />
                </div>
                <h3 className="mt-6 text-xl font-semibold text-white">
                  Hisobotlar
                </h3>
                <p className="mt-4 text-gray-300">
                  Markaz faoliyati bo'yicha umumiy statistikalarni kuzating.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Kimlar uchun? Section */}
        <section className="py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-4xl font-bold text-white sm:text-5xl">
                Kimlar uchun?
              </h2>
            </div>
            <div className="mx-auto mt-16 flex flex-wrap justify-center gap-4">
              <div className="group flex items-center gap-3 rounded-full border border-green-500/20 bg-white/5 px-6 py-3 text-sm font-medium text-green-400 backdrop-blur-sm transition-all hover:border-green-500/30 hover:bg-white/10 hover:text-green-300 hover:shadow-lg hover:shadow-green-500/10">
                <UserCheck size={20} />
                O'quv markaz egalari
              </div>
              <div className="group flex items-center gap-3 rounded-full border border-green-500/20 bg-white/5 px-6 py-3 text-sm font-medium text-green-400 backdrop-blur-sm transition-all hover:border-green-500/30 hover:bg-white/10 hover:text-green-300 hover:shadow-lg hover:shadow-green-500/10">
                <Award size={20} />
                Administratorlar
              </div>
              <div className="group flex items-center gap-3 rounded-full border border-green-500/20 bg-white/5 px-6 py-3 text-sm font-medium text-green-400 backdrop-blur-sm transition-all hover:border-green-500/30 hover:bg-white/10 hover:text-green-300 hover:shadow-lg hover:shadow-green-500/10">
                <BookOpen size={20} />
                O'qituvchilar
              </div>
              <div className="group flex items-center gap-3 rounded-full border border-green-500/20 bg-white/5 px-6 py-3 text-sm font-medium text-green-400 backdrop-blur-sm transition-all hover:border-green-500/30 hover:bg-white/10 hover:text-green-300 hover:shadow-lg hover:shadow-green-500/10">
                <Users size={20} />
                O'quvchilar va ota-onalar
              </div>
            </div>
          </div>
        </section>

        {/* Natija Section */}
        <section className="border-t border-green-500/10 bg-black/40 py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-4xl font-bold text-white sm:text-5xl">
                Edu-X bilan natija
              </h2>
              <p className="mx-auto mt-6 max-w-3xl text-xl text-gray-300">
                Edu-X yordamida siz:
              </p>
            </div>
            <div className="mx-auto mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <div className="flex items-center gap-4 rounded-2xl border border-green-500/10 bg-white/5 p-6 backdrop-blur-sm">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r from-green-400/20 to-emerald-500/20 text-green-400">
                  <CheckSquare size={24} />
                </div>
                <span className="text-lg text-white">tartibli tizimga ega bo'lasiz</span>
              </div>
              <div className="flex items-center gap-4 rounded-2xl border border-green-500/10 bg-white/5 p-6 backdrop-blur-sm">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r from-green-400/20 to-emerald-500/20 text-green-400">
                  <CheckSquare size={24} />
                </div>
                <span className="text-lg text-white">vaqtni tejaysiz</span>
              </div>
              <div className="flex items-center gap-4 rounded-2xl border border-green-500/10 bg-white/5 p-6 backdrop-blur-sm">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r from-green-400/20 to-emerald-500/20 text-green-400">
                  <CheckSquare size={24} />
                </div>
                <span className="text-lg text-white">daromadni nazorat qilasiz</span>
              </div>
              <div className="flex items-center gap-4 rounded-2xl border border-green-500/10 bg-white/5 p-6 backdrop-blur-sm">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r from-green-400/20 to-emerald-500/20 text-green-400">
                  <CheckSquare size={24} />
                </div>
                <span className="text-lg text-white">ishni avtomatlashtirasiz</span>
              </div>
            </div>
          </div>
        </section>

        {/* Admin bilan bog'lanish Section */}
        <section className="py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-4xl font-bold text-white sm:text-5xl">
                Admin bilan bog'lanish
              </h2>
            </div>
            <div className="mx-auto mt-16 grid gap-8 lg:grid-cols-2">
              <div className="rounded-2xl border border-green-500/10 bg-white/5 p-8 backdrop-blur-sm">
                <h3 className="text-xl font-semibold text-white">
                  Bog'lanish ma'lumotlari
                </h3>
                <div className="mt-6 space-y-4">
                  <div className="flex items-center gap-3">
                    <Phone size={20} className="text-green-400" />
                    <span className="text-gray-300">+998 90 000 00 00</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <MessageSquare size={20} className="text-green-400" />
                    <span className="text-gray-300">@edux_admin</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Calendar size={20} className="text-green-400" />
                    <span className="text-gray-300">Dushanba - Shanba, 09:00 - 18:00</span>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-green-500/10 bg-white/5 p-8 backdrop-blur-sm">
                <h3 className="text-xl font-semibold text-white">
                  Xabar yuborish
                </h3>
                <form className="mt-6 space-y-4">
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
                    rows={3}
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

        {/* Manzil Section */}
        <section className="border-t border-green-500/10 bg-black/40 py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-4xl font-bold text-white sm:text-5xl">
                Manzil
              </h2>
            </div>
            <div className="mx-auto mt-16 max-w-2xl">
              <div className="rounded-2xl border border-green-500/10 bg-white/5 p-8 backdrop-blur-sm">
                <div className="flex items-center gap-3">
                  <MapPin size={24} className="text-green-400" />
                  <span className="text-xl font-medium text-white">
                    Toshkent, Uzbekistan
                  </span>
                </div>
                <div className="mt-8 rounded-xl border border-green-500/10 bg-green-900/20 p-12">
                  <div className="text-center text-gray-300">
                    <MapPin size={64} className="mx-auto mb-4 text-green-400/30" />
                    <p className="text-lg">Xarita joylashuvi</p>
                  </div>
                </div>
                <button className="mt-6 w-full rounded-xl bg-gradient-to-r from-green-400 to-emerald-500 px-4 py-3 text-sm font-medium text-white shadow-lg shadow-green-500/20 transition-all hover:from-green-500 hover:to-emerald-600 hover:shadow-green-500/30 hover:-translate-y-px">
                  Lokatsiyani ko'rish
                </button>
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
