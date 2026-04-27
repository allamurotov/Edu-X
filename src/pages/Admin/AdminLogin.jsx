import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../store/authSlice';
import { useNavigate } from 'react-router-dom';
import { GraduationCap, Lock, Hash } from 'lucide-react';

export default function AdminLogin() {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const adminUsers = useSelector((state) => state.admin.users);
  const teachers = useSelector((state) => state.eduCenter.teachers);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (!userId || !password) {
      setError('Barcha maydonlarni to\'ldiring');
      return;
    }

    const id = Number(userId);
    const allUsers = [...adminUsers, ...teachers];
    const matchedUser = allUsers.find((user) => user.loginNumericId === id && user.password === password);

    if (!matchedUser) {
      setError('ID yoki parol noto\'g\'ri');
      return;
    }

    if (matchedUser.role !== 'admin' && matchedUser.role !== 'teacher') {
      setError('Faqat admin va teacher kirishi mumkin');
      return;
    }

    dispatch(login(matchedUser));
    navigate(matchedUser.role === 'admin' ? '/admin/dashboard' : '/teacher');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#020617] via-[#000000] to-[#020617] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="rounded-2xl border border-[rgba(0,255,136,0.15)] bg-[#020617] p-8 shadow-lg backdrop-blur-sm shadow-[#00FF88]/10">
          <div className="text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-r from-[#00FF88] to-[#22C55E] text-white shadow-lg shadow-[#00FF88]/50">
              <GraduationCap size={24} />
            </div>
            <h1 className="mt-4 text-2xl font-bold text-[#F8FFF8]">
              Admin kirish
            </h1>
            <p className="mt-2 text-sm text-[#9AE6B4]">
              Edu-X boshqaruv tizimiga kirish
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
            <p className="text-xs text-[#9AE6B4]">
              Demo: ID 00001, parol admin123
            </p>
          </div>

          <div className="mt-6 text-center">
            <a
              href="/"
              className="text-sm text-[#00FF88] hover:text-[#22C55E]"
            >
              Asosiy sahifaga qaytish
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
