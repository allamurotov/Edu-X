import { Link } from 'react-router-dom';
import { GraduationCap, ArrowRight, BookOpen, Users, Award, CreditCard, Calendar, UserCheck, Play, CheckSquare, MapPin, Phone, MessageSquare } from 'lucide-react';

export default function PublicLanding() {
  return (
    <div className="min-h-screen bg-black">
      <div className="flex min-h-screen flex-col">
        {/* Navigation */}
        <nav className="border-b border-green-500/20 bg-black/80 backdrop-blur-md">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg shadow-green-500/50">
                  <GraduationCap size={20} />
                </div>
                <span className="text-xl font-bold text-green-400">
                  Edu-X
                </span>
              </div>
              <div className="flex items-center gap-4">
                <Link
                  to="/student/login"
                  className="inline-flex items-center gap-2 rounded-xl border-2 border-green-500 bg-transparent px-4 py-2 text-sm font-medium text-green-400 shadow-lg shadow-green-500/25 transition hover:bg-green-900/30 hover:-translate-y-px hover:shadow-green-500/25"
                >
                  O'quvchi kirish
                </Link>
                <Link
                  to="/admin"
                  className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-green-500 to-green-600 px-4 py-2 text-sm font-medium text-white shadow-lg shadow-green-500/25 transition hover:from-green-600 hover:to-green-700 hover:-translate-y-px hover:shadow-green-500/25"
                >
                  Admin bilan bog'lanish
                </Link>
              </div>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <main className="flex-1">
          <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-20">
            <div className="text-center">
              <h1 className="text-4xl font-bold tracking-tight text-green-400 sm:text-5xl lg:text-6xl">
                Edu-X — O'quv markazlar uchun zamonaviy boshqaruv tizimi
              </h1>
              <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-green-300">
                O'quvchilar, ustozlar, guruhlar, dars jadvali va to'lovlarni bitta tizimda oson boshqaring.
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <Link
                  to="/student/login"
                  className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-green-500 to-green-600 px-6 py-3 text-base font-semibold text-white shadow-lg shadow-green-500/25 transition hover:from-green-600 hover:to-green-700 hover:-translate-y-px hover:shadow-green-500/25"
                >
                  Kirish
                  <ArrowRight size={20} />
                </Link>
                <Link
                  to="/admin"
                  className="inline-flex items-center gap-2 rounded-xl border-2 border-green-500 bg-transparent px-6 py-3 text-base font-semibold text-green-400 shadow-lg shadow-green-500/25 transition hover:bg-green-900/30 hover:-translate-y-px hover:shadow-green-500/25"
                >
                  Admin bilan bog'lanish
                </Link>
              </div>
            </div>
          </div>
        </main>

        {/* Edu-X nima? Section */}
        <section className="bg-black/50 border-t border-green-500/20">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-green-400 sm:text-4xl">
                Edu-X nima?
              </h2>
              <p className="mx-auto mt-4 max-w-3xl text-lg text-green-300">
                Edu-X bu o'quv markazlar uchun yaratilgan boshqaruv platformasi. Tizim orqali markaz faoliyatini tartibli yuritish, o'quvchilarni nazorat qilish, to'lovlarni ko'rish va dars jarayonlarini boshqarish mumkin.
              </p>
            </div>
          </div>
        </section>

        {/* Nimalar qilsa bo'ladi? Section */}
        <section className="py-16 bg-black/50">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-green-400 sm:text-4xl">
                Nimalar qilsa bo'ladi?
              </h2>
            </div>
            <div className="mx-auto mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <div className="rounded-2xl border border-green-500/20 bg-black/80 p-6 shadow-lg shadow-green-500/25">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg shadow-green-500/50">
                  <Users size={24} />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-green-400">
                  O'quvchilarni boshqarish
                </h3>
                <p className="mt-2 text-sm text-green-300">
                  O'quvchilarni ro'yxatdan o'tkazing, guruhlarga qo'shing va ma'lumotlarini saqlang.
                </p>
              </div>

              <div className="rounded-2xl border border-green-500/20 bg-black/80 p-6 shadow-lg shadow-green-500/25">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg shadow-green-500/50">
                  <Calendar size={24} />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-green-400">
                  Guruh va jadval
                </h3>
                <p className="mt-2 text-sm text-green-300">
                  Guruhlar yarating, ustozlarni biriktiring va dars vaqtlarini belgilang.
                </p>
              </div>

              <div className="rounded-2xl border border-green-500/20 bg-black/80 p-6 shadow-lg shadow-green-500/25">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg shadow-green-500/50">
                  <CreditCard size={24} />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-green-400">
                  To'lov nazorati
                </h3>
                <p className="mt-2 text-sm text-green-300">
                  Kim to'lagan, kim qarzdor — hammasini bitta joyda ko'ring.
                </p>
              </div>

              <div className="rounded-2xl border border-green-500/20 bg-black/80 p-6 shadow-lg shadow-green-500/25">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg shadow-green-500/50">
                  <UserCheck size={24} />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-green-400">
                  Ustozlar paneli
                </h3>
                <p className="mt-2 text-sm text-green-300">
                  Ustozlar o'z guruhlari, darslari va davomatni ko'ra oladi.
                </p>
              </div>

              <div className="rounded-2xl border border-green-500/20 bg-black/80 p-6 shadow-lg shadow-green-500/25">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg shadow-green-500/50">
                  <BookOpen size={24} />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-green-400">
                  O'quvchi paneli
                </h3>
                <p className="mt-2 text-sm text-green-300">
                  O'quvchilar o'z darslari, ballari, natijalari va ma'lumotlarini ko'ra oladi.
                </p>
              </div>

              <div className="rounded-2xl border border-green-500/20 bg-black/80 p-6 shadow-lg shadow-green-500/25">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg shadow-green-500/50">
                  <Award size={24} />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-green-400">
                  Hisobotlar
                </h3>
                <p className="mt-2 text-sm text-green-300">
                  Markaz faoliyati bo'yicha umumiy statistikalarni kuzating.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Kimlar uchun? Section */}
        <section className="bg-black/50 border-t border-green-500/20 py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-green-400 sm:text-4xl">
                Kimlar uchun?
              </h2>
            </div>
            <div className="mx-auto mt-12 flex flex-wrap justify-center gap-4">
              <div className="flex items-center gap-2 rounded-full bg-green-500/20 px-4 py-2 text-sm font-medium text-green-400 border border-green-500/30">
                <UserCheck size={16} />
                O'quv markaz egalari
              </div>
              <div className="flex items-center gap-2 rounded-full bg-green-500/20 px-4 py-2 text-sm font-medium text-green-400 border border-green-500/30">
                <Award size={16} />
                Administratorlar
              </div>
              <div className="flex items-center gap-2 rounded-full bg-green-500/20 px-4 py-2 text-sm font-medium text-green-400 border border-green-500/30">
                <BookOpen size={16} />
                O'qituvchilar
              </div>
              <div className="flex items-center gap-2 rounded-full bg-green-500/20 px-4 py-2 text-sm font-medium text-green-400 border border-green-500/30">
                <Users size={16} />
                O'quvchilar
              </div>
              <div className="flex items-center gap-2 rounded-full bg-green-500/20 px-4 py-2 text-sm font-medium text-green-400 border border-green-500/30">
                <Phone size={16} />
                Ota-onalar
              </div>
            </div>
          </div>
        </section>

        {/* Admin bilan bog'lanish Section */}
        <section className="py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-green-400 sm:text-4xl">
                Admin bilan bog'lanish
              </h2>
            </div>
            <div className="mx-auto mt-12 grid gap-8 lg:grid-cols-2">
              <div className="rounded-2xl border border-green-500/20 bg-black/80 p-6 shadow-lg shadow-green-500/25">
                <h3 className="text-lg font-semibold text-green-400">
                  Bog'lanish ma'lumotlari
                </h3>
                <div className="mt-4 space-y-3">
                  <div className="flex items-center gap-3">
                    <Phone size={20} className="text-green-400" />
                    <span className="text-sm text-green-300">+998 90 000 00 00</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <MessageSquare size={20} className="text-green-400" />
                    <span className="text-sm text-green-300">@edux_admin</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Calendar size={20} className="text-green-400" />
                    <span className="text-sm text-green-300">Dushanba - Shanba, 09:00 - 18:00</span>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-green-500/20 bg-black/80 p-6 shadow-lg shadow-green-500/25">
                <h3 className="text-lg font-semibold text-green-400">
                  Xabar yuborish
                </h3>
                <form className="mt-4 space-y-4">
                  <input
                    type="text"
                    placeholder="Ism"
                    className="w-full rounded-xl border border-green-500/20 bg-black/80 px-4 py-2 text-sm text-green-400 placeholder-green-500/50 shadow-lg shadow-green-500/25"
                  />
                  <input
                    type="tel"
                    placeholder="Telefon raqam"
                    className="w-full rounded-xl border border-green-500/20 bg-black/80 px-4 py-2 text-sm text-green-400 placeholder-green-500/50 shadow-lg shadow-green-500/25"
                  />
                  <textarea
                    placeholder="Xabar"
                    rows={3}
                    className="w-full rounded-xl border border-green-500/20 bg-black/80 px-4 py-2 text-sm text-green-400 placeholder-green-500/50 shadow-lg shadow-green-500/25"
                  />
                  <button
                    type="submit"
                    className="w-full rounded-xl bg-gradient-to-r from-green-500 to-green-600 px-4 py-2 text-sm font-medium text-white shadow-lg shadow-green-500/25 hover:from-green-600 hover:to-green-700 hover:-translate-y-px hover:shadow-green-500/25"
                  >
                    Yuborish
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* Manzil Section */}
        <section className="bg-black/50 border-t border-green-500/20 py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-green-400 sm:text-4xl">
                Manzil
              </h2>
            </div>
            <div className="mx-auto mt-12 max-w-2xl">
              <div className="rounded-2xl border border-green-500/20 bg-black/80 p-6 shadow-lg shadow-green-500/25">
                <div className="flex items-center gap-3">
                  <MapPin size={24} className="text-green-400" />
                  <span className="text-lg font-medium text-green-400">
                    Toshkent, Uzbekistan
                  </span>
                </div>
                <div className="mt-6 rounded-xl border border-green-500/20 bg-green-900/30 p-8">
                  <div className="text-center text-green-300">
                    <MapPin size={48} className="mx-auto mb-4 text-green-400/50" />
                    <p>Xarita joylashuvi</p>
                  </div>
                </div>
                <button className="mt-4 w-full rounded-xl bg-gradient-to-r from-green-500 to-green-600 px-4 py-2 text-sm font-medium text-white shadow-lg shadow-green-500/25 hover:from-green-600 hover:to-green-700 hover:-translate-y-px hover:shadow-green-500/25">
                  Lokatsiyani ko'rish
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-green-500/20 bg-black/80 backdrop-blur-md">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <p className="text-center text-sm text-green-300">
              © 2024 Edu-X. Barcha huquqlar himoyalangan.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
