import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../store/authSlice';
import { useNavigate } from 'react-router-dom';
import { GraduationCap, Lock, Hash, X, Calendar, Eye, DollarSign, Phone } from 'lucide-react';

export default function StudentLogin() {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showAboutModal, setShowAboutModal] = useState(false);
  const students = useSelector((state) => state.student.students);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (!userId || !password) {
      setError('Barcha maydonlarni to\'ldiring');
      return;
    }

    const id = Number(userId);
    const matchedStudent = students.find((student) => student.loginNumericId === id && student.password === password);

    if (!matchedStudent) {
      setError('ID yoki parol noto\'g\'ri');
      return;
    }

    dispatch(login(matchedStudent));
    navigate('/student/dashboard');
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-[#020617] via-[#000000] to-[#020617] flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="rounded-2xl border border-[rgba(0,255,136,0.15)] bg-[#020617] p-8 shadow-lg backdrop-blur-sm shadow-[#00FF88]/10">
            <div className="text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-r from-[#00FF88] to-[#22C55E] text-white shadow-lg shadow-[#00FF88]/50">
                <GraduationCap size={24} />
              </div>
              <h1 className="mt-4 text-2xl font-bold text-[#F8FFF8]">
                O'quvchi kirish
              </h1>
              <p className="mt-2 text-sm text-[#9AE6B4]">
                O'z darslaringiz va natijalaringizni ko'ring
              </p>
            </div>

            <form onSubmit={handleLogin} className="mt-8 space-y-6">
              <div>
                <label className="block text-sm font-medium text-[#F8FFF8]">
                  ID
                </label>
                <div className="mt-2 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Hash size={20} className="text-[#9AE6B4]" />
                  </div>
                  <input
                    type="text"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                    className="block w-full pl-10 pr-3 py-2 border border-[rgba(0,255,136,0.15)] bg-[#050A14] rounded-xl text-[#F8FFF8] placeholder-[#9AE6B4] shadow-lg backdrop-blur-sm shadow-[#00FF88]/10 focus:outline-none focus:ring-2 focus:ring-[#00FF88]/50"
                    placeholder="ID raqamini kiriting"
                    autoComplete="off"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#F8FFF8]">
                  Parol
                </label>
                <div className="mt-2 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock size={20} className="text-[#9AE6B4]" />
                  </div>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full pl-10 pr-3 py-2 border border-[rgba(0,255,136,0.15)] bg-[#050A14] rounded-xl text-[#F8FFF8] placeholder-[#9AE6B4] shadow-lg backdrop-blur-sm shadow-[#00FF88]/10 focus:outline-none focus:ring-2 focus:ring-[#00FF88]/50"
                    placeholder="Parolni kiriting"
                  />
                </div>
              </div>

              {error && (
                <div className="rounded-xl bg-red-100/50 p-3 text-sm text-red-800 dark:bg-red-900/30 dark:text-red-200">
                  {error}
                </div>
              )}

              <button
                type="submit"
                className="w-full rounded-xl bg-gradient-to-r from-[#00FF88] to-[#22C55E] px-4 py-2 text-sm font-medium text-[#020617] shadow-lg shadow-[#00FF88]/25 transition hover:from-[#22C55E] hover:to-[#00FF88] hover:-translate-y-px hover:shadow-[#00FF88]/40"
              >
                Kirish
              </button>
            </form>

            <div className="mt-6 text-center">
              <a
                href="/"
                className="text-sm text-[#00FF88] hover:text-[#22C55E]"
              >
                Asosiy sahifaga qaytish
              </a>
            </div>

            <div className="mt-4 text-center">
              <button
                onClick={() => setShowAboutModal(true)}
                className="text-sm text-[#00FF88] hover:text-[#22C55E]"
              >
                Edu-X haqida batafsil
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Edu-X About Modal */}
      {showAboutModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-3xl border border-[rgba(0,255,136,0.20)] bg-[#050505] p-8 shadow-2xl shadow-[#00FF88]/10">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-[#FFFFFF]">Edu-X nima?</h2>
              <button
                onClick={() => setShowAboutModal(false)}
                className="text-[#9AE6B4] hover:text-[#FFFFFF] transition"
              >
                <X size={24} />
              </button>
            </div>

            <p className="text-sm text-[#9AE6B4] mb-6 leading-relaxed">
              Edu-X — o'quv markazlar uchun yaratilgan boshqaruv tizimi. Bu tizim orqali o'quvchilar o'z darslari, natijalari, to'lov holati va ma'lumotlarini ko'ra oladi.
            </p>

            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[rgba(0,255,136,0.1)] text-[#00FF88]">
                  <Calendar size={16} />
                </div>
                <span className="text-sm text-[#FFFFFF]">Dars jadvalini ko'rish</span>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[rgba(0,255,136,0.1)] text-[#00FF88]">
                  <Eye size={16} />
                </div>
                <span className="text-sm text-[#FFFFFF]">Natijalarni kuzatish</span>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[rgba(0,255,136,0.1)] text-[#00FF88]">
                  <Calendar size={16} />
                </div>
                <span className="text-sm text-[#FFFFFF]">Davomatni ko'rish</span>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[rgba(0,255,136,0.1)] text-[#00FF88]">
                  <DollarSign size={16} />
                </div>
                <span className="text-sm text-[#FFFFFF]">To'lov holatini bilish</span>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[rgba(0,255,136,0.1)] text-[#00FF88]">
                  <Phone size={16} />
                </div>
                <span className="text-sm text-[#FFFFFF]">Markaz bilan bog'lanish</span>
              </div>
            </div>

            <div className="mt-8 flex justify-center">
              <button
                onClick={() => setShowAboutModal(false)}
                className="rounded-xl bg-gradient-to-r from-[#00FF88] to-[#22C55E] px-6 py-2.5 text-sm font-bold text-[#020403] shadow-lg shadow-[#00FF88]/30 transition hover:from-[#22C55E] hover:to-[#00FF88]"
              >
                Tushunarli
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
