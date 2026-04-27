import { useState } from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, ArrowRight, Code, Users2, Rocket, Monitor, Database, Palette } from 'lucide-react';
import CourseRegistrationModal from './CourseRegistrationModal';

export default function PublicLanding() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="min-h-screen bg-[#121212] text-white">
      {/* Navigation */}
      <nav className="border-b border-gray-800 bg-black/50 backdrop-blur-xl">
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
                className="inline-flex items-center gap-2 rounded-xl border border-gray-700 bg-gray-900 px-4 py-2 text-sm font-medium text-gray-300 transition-all hover:bg-gray-800 hover:text-white"
              >
                KIRISH
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-32">
          <div className="text-center">
            <h1 className="text-5xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl animate-fade-in">
              IT olamiga kirishni
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-400">
                Edu-X bilan boshlang!
              </span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-300 sm:text-xl animate-fade-in-delay-1">
              Ko'pchilik IT sohasini murakkab deb o'ylaydi. Bizning vazifamiz – murakkab kodlarni oddiy tilda tushuntirish va sizni noldan professional darajaga olib chiqish. Edu-X – bu shunchaki kurs emas, bu sizning yangi karyerangiz boshlang'ich nuqtasi.
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center sm:gap-6">
              <button
                onClick={openModal}
                className="inline-flex items-center gap-3 rounded-xl bg-gradient-to-r from-green-400 to-emerald-500 px-8 py-4 text-lg font-semibold text-white shadow-lg shadow-green-500/20 transition-all hover:from-green-500 hover:to-emerald-600 hover:shadow-green-500/30 hover:-translate-y-px animate-fade-in-delay-2"
              >
                Kursga yozilish
                <ArrowRight size={20} />
              </button>
              <Link
                to="/course-details"
                className="inline-flex items-center gap-3 rounded-xl border border-gray-700 bg-gray-900 px-8 py-4 text-lg font-semibold text-gray-300 transition-all hover:bg-gray-800 hover:text-white animate-fade-in-delay-2"
              >
                Batafsil ma'lumot
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* Tushuntirish Section */}
      <section className="border-t border-gray-800 bg-black/30 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-4xl font-bold text-white sm:text-5xl">
              Nega aynan Edu-X?
            </h2>
            <p className="mt-6 text-lg text-gray-300">
              Foydalanuvchi nimalarni o'rganishini tushunishi uchun 3 ta asosiy blok
            </p>
          </div>
          <div className="mx-auto mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div className="group relative rounded-xl border border-gray-800 bg-gray-900/50 p-8 transition-all hover:border-green-500/30 hover:bg-gray-900/80 hover:shadow-lg hover:shadow-green-500/10">
              <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-r from-green-400 to-emerald-500 text-white shadow-lg shadow-green-500/20">
                <Code size={32} />
              </div>
              <h3 className="mt-6 text-xl font-semibold text-white">
                💻 Zamonaviy Texnologiyalar
              </h3>
              <p className="mt-4 text-gray-300">
                Bizda faqat bugungi kunda bozor talab qilayotgan texnologiyalar o'rgatiladi. Frontend (HTML, CSS, JS) dan boshlab, Backend (Node.js, PostgreSQL) gacha.
              </p>
            </div>

            <div className="group relative rounded-xl border border-gray-800 bg-gray-900/50 p-8 transition-all hover:border-green-500/30 hover:bg-gray-900/80 hover:shadow-lg hover:shadow-green-500/10">
              <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-r from-green-400 to-emerald-500 text-white shadow-lg shadow-green-500/20">
                <Users2 size={32} />
              </div>
              <h3 className="mt-6 text-xl font-semibold text-white">
                🛠 Amaliy Tajriba
              </h3>
              <p className="mt-4 text-gray-300">
                Nazariya – bu faqat 20%. Qolgan 80% vaqtingizni real loyihalar ustida ishlashga sarflaysiz. Kurs oxirida sizda shaxsiy portfoli bo'ladi.
              </p>
            </div>

            <div className="group relative rounded-xl border border-gray-800 bg-gray-900/50 p-8 transition-all hover:border-green-500/30 hover:bg-gray-900/80 hover:shadow-lg hover:shadow-green-500/10">
              <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-r from-green-400 to-emerald-500 text-white shadow-lg shadow-green-500/20">
                <Rocket size={32} />
              </div>
              <h3 className="mt-6 text-xl font-semibold text-white">
                🚀 Tezkor Start
              </h3>
              <p className="mt-4 text-gray-300">
                Biz sizga keraksiz ma'lumotlarni bermaymiz. Maqsadimiz – sizni eng qisqa vaqt ichida junior dasturchi darajasiga yetkazish va ishga tayyorlash.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Yo'nalishlarimiz Section */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-4xl font-bold text-white sm:text-5xl">
              Yo'nalishlarimiz
            </h2>
            <p className="mt-6 text-lg text-gray-300">
              IT sohasini tushunmaganlar uchun yo'nalishlarni tushuntirish
            </p>
          </div>
          <div className="mx-auto mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div className="group relative rounded-xl border border-gray-800 bg-gray-900/50 p-8 transition-all hover:border-green-500/30 hover:bg-gray-900/80 hover:shadow-lg hover:shadow-green-500/10">
              <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-r from-blue-400 to-blue-500 text-white shadow-lg shadow-blue-500/20">
                <Monitor size={32} />
              </div>
              <h3 className="mt-6 text-xl font-semibold text-white">
                Web Development
              </h3>
              <p className="mt-4 text-gray-300">
                Saytlar yaratish va ularni boshqarish (Frontend & Backend).
              </p>
            </div>

            <div className="group relative rounded-xl border border-gray-800 bg-gray-900/50 p-8 transition-all hover:border-green-500/30 hover:bg-gray-900/80 hover:shadow-lg hover:shadow-green-500/10">
              <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-r from-purple-400 to-purple-500 text-white shadow-lg shadow-purple-500/20">
                <Database size={32} />
              </div>
              <h3 className="mt-6 text-xl font-semibold text-white">
                Database Management
              </h3>
              <p className="mt-4 text-gray-300">
                Ma'lumotlar bilan ishlash va ularni xavfsiz saqlash (PostgreSQL).
              </p>
            </div>

            <div className="group relative rounded-xl border border-gray-800 bg-gray-900/50 p-8 transition-all hover:border-green-500/30 hover:bg-gray-900/80 hover:shadow-lg hover:shadow-green-500/10">
              <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-r from-pink-400 to-pink-500 text-white shadow-lg shadow-pink-500/20">
                <Palette size={32} />
              </div>
              <h3 className="mt-6 text-xl font-semibold text-white">
                UI/UX Design
              </h3>
              <p className="mt-4 text-gray-300">
                Sayt va ilovalarning chiroyli va qulay ko'rinishini loyihalash (Figma).
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t border-gray-800 bg-black/30 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="mx-auto max-w-3xl">
              <h2 className="text-4xl font-bold text-white sm:text-5xl">
                IT sohasini o'rganishni ertaga qoldirmang
              </h2>
              <p className="mt-6 text-xl text-gray-300">
                Hozir ro'yxatdan o'ting va birinchi bepul darsimizda qatnashing!
              </p>
              <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center sm:gap-6">
                <button
                  onClick={openModal}
                  className="inline-flex items-center gap-3 rounded-xl bg-gradient-to-r from-green-400 to-emerald-500 px-8 py-4 text-lg font-semibold text-white shadow-lg shadow-green-500/20 transition-all hover:from-green-500 hover:to-emerald-600 hover:shadow-green-500/30 hover:-translate-y-px"
                >
                  Kursga yozilish
                  <ArrowRight size={20} />
                </button>
                <Link
                  to="/course-details"
                  className="inline-flex items-center gap-3 rounded-xl border border-gray-700 bg-gray-900 px-8 py-4 text-lg font-semibold text-gray-300 transition-all hover:bg-gray-800 hover:text-white"
                >
                  Batafsil ma'lumot
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 bg-black/50 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <p className="text-center text-gray-400">
            © 2024 Edu-X. Barcha huquqlar himoyalangan.
          </p>
        </div>
      </footer>

      {/* Course Registration Modal */}
      <CourseRegistrationModal isOpen={isModalOpen} onClose={closeModal} />

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fade-in-delay-1 {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          40% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fade-in-delay-2 {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          60% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
        }

        .animate-fade-in-delay-1 {
          animation: fade-in-delay-1 1.2s ease-out forwards;
        }

        .animate-fade-in-delay-2 {
          animation: fade-in-delay-2 1.6s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
