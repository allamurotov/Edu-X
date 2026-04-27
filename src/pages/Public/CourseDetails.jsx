import { Link } from 'react-router-dom';
import { GraduationCap, ArrowLeft, Clock, MapPin, Phone, Calendar, Users, Star, Check, Database } from 'lucide-react';

export default function CourseDetails() {
  return (
    <div className="min-h-screen bg-[#121212] text-white">
      {/* Navigation */}
      <nav className="border-b border-gray-800 bg-black/50 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-3">
              <Link to="/" className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors">
                <ArrowLeft size={20} />
                <span>Orqaga</span>
              </Link>
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

      {/* Course Details Content */}
      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
          {/* Course Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-white sm:text-5xl mb-4">
              Kurslar haqida batafsil ma'lumot
            </h1>
            <p className="text-xl text-gray-300">
              Edu-X IT Academy da o'qish uchun barcha kerakli ma'lumotlar
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            {/* Main Course Info */}
            <div className="lg:col-span-2 space-y-8">
              {/* Web Development Course */}
              <div className="rounded-xl border border-gray-800 bg-gray-900/50 p-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r from-blue-400 to-blue-500 text-white shadow-lg shadow-blue-500/20">
                    <Calendar size={24} />
                  </div>
                  <h3 className="text-2xl font-bold text-white">Web Development</h3>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Clock className="text-green-400" size={20} />
                    <span className="text-gray-300">Davomiyligi: 6 oy</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Users className="text-green-400" size={20} />
                    <span className="text-gray-300">Guruh hajmi: 10-15 o'quvchi</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Star className="text-green-400" size={20} />
                    <span className="text-gray-300">Sertifikat: Ha</span>
                  </div>
                </div>

                <div className="mt-6">
                  <h4 className="text-lg font-semibold text-white mb-3">O'qitish dasturi:</h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-gray-300">
                      <Check className="text-green-400" size={16} />
                      <span>HTML, CSS, JavaScript asoslari</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-300">
                      <Check className="text-green-400" size={16} />
                      <span>React.js va modern frontend texnologiyalari</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-300">
                      <Check className="text-green-400" size={16} />
                      <span>Node.js, Express va backend dasturlash</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-300">
                      <Check className="text-green-400" size={16} />
                      <span>PostgreSQL ma'lumotlar bazasi</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-300">
                      <Check className="text-green-400" size={16} />
                      <span>Real loyihalar va portfoliyo yaratish</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Other Courses */}
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="rounded-xl border border-gray-800 bg-gray-900/50 p-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r from-purple-400 to-purple-500 text-white shadow-lg shadow-purple-500/20 mb-4">
                    <Database size={24} />
                  </div>
                  <h4 className="text-xl font-bold text-white mb-2">Database Management</h4>
                  <p className="text-gray-300 mb-4">Ma'lumotlar bilan ishlash va ularni xavfsiz saqlash</p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <Clock size={16} />
                      <span>4 oy</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <Users size={16} />
                      <span>8-12 o'quvchi</span>
                    </div>
                  </div>
                </div>

                <div className="rounded-xl border border-gray-800 bg-gray-900/50 p-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r from-pink-400 to-pink-500 text-white shadow-lg shadow-pink-500/20 mb-4">
                    <Calendar size={24} />
                  </div>
                  <h4 className="text-xl font-bold text-white mb-2">UI/UX Design</h4>
                  <p className="text-gray-300 mb-4">Sayt va ilovalarning chiroyli va qulay ko'rinishini loyihalash</p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <Clock size={16} />
                      <span>3 oy</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <Users size={16} />
                      <span>6-10 o'quvchi</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Schedule and Location Sidebar */}
            <div className="space-y-8">
              {/* Schedule */}
              <div className="rounded-xl border border-gray-800 bg-gray-900/50 p-6">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <Clock className="text-green-400" size={20} />
                  Dars jadvali
                </h3>
                <div className="space-y-3">
                  <div className="border-l-2 border-green-500 pl-4">
                    <p className="font-medium text-white">Dushanba - Chorshanba</p>
                    <p className="text-gray-400">18:00 - 20:00</p>
                  </div>
                  <div className="border-l-2 border-green-500 pl-4">
                    <p className="font-medium text-white">Juma - Shanba</p>
                    <p className="text-gray-400">14:00 - 16:00</p>
                  </div>
                  <div className="border-l-2 border-gray-600 pl-4">
                    <p className="font-medium text-gray-400">Yakshanba</p>
                    <p className="text-gray-500">Dam olish kuni</p>
                  </div>
                </div>
              </div>

              {/* Locations */}
              <div className="rounded-xl border border-gray-800 bg-gray-900/50 p-6">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <MapPin className="text-green-400" size={20} />
                  Joylashuv
                </h3>
                <div className="space-y-4">
                  <div className="border-l-2 border-green-500 pl-4">
                    <p className="font-medium text-white">Chilonzor filiali</p>
                    <p className="text-gray-400 text-sm">Chilonzor ko'chasi, 15-uy</p>
                    <p className="text-gray-500 text-xs">Metro: Chilonzor</p>
                  </div>
                  <div className="border-l-2 border-green-500 pl-4">
                    <p className="font-medium text-white">Farg'ona filiali</p>
                    <p className="text-gray-400 text-sm">Mustaqillik ko'chasi, 42-uy</p>
                    <p className="text-gray-500 text-xs">Markaz</p>
                  </div>
                  <div className="border-l-2 border-green-500 pl-4">
                    <p className="font-medium text-white">Samarqand filiali</p>
                    <p className="text-gray-400 text-sm">Buxoro ko'chasi, 28-uy</p>
                    <p className="text-gray-500 text-xs">Eski shahar</p>
                  </div>
                </div>
              </div>

              {/* Contact */}
              <div className="rounded-xl border border-gray-800 bg-gray-900/50 p-6">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <Phone className="text-green-400" size={20} />
                  Biz bilan bog'lanish
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Phone className="text-gray-400" size={16} />
                    <span className="text-gray-300">+998 90 123 45 67</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="text-gray-400" size={16} />
                    <span className="text-gray-300">+998 95 876 54 32</span>
                  </div>
                  <div className="mt-4">
                    <p className="text-sm text-gray-400 mb-2">Ish vaqti:</p>
                    <p className="text-gray-300">Dushanba - Shanba: 09:00 - 18:00</p>
                    <p className="text-gray-300">Yakshanba: Dam olish kuni</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-800 bg-black/50 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <p className="text-center text-gray-400">
            © 2024 Edu-X. Barcha huquqlar himoyalangan.
          </p>
        </div>
      </footer>
    </div>
  );
}
