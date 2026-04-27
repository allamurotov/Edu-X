import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../store/authSlice';
import { useNavigate } from 'react-router-dom';
import { GraduationCap, Lock, Hash } from 'lucide-react';

export default function StudentLogin() {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
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
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-lime-50 dark:from-emerald-950 dark:via-emerald-900 dark:to-lime-950 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="rounded-2xl border border-emerald-200/60 bg-white/80 p-8 shadow-lg backdrop-blur-sm dark:border-lime-500/20 dark:bg-emerald-950/50 dark:shadow-emerald-900/50">
          <div className="text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-600 text-white shadow-lg shadow-emerald-600/50">
              <GraduationCap size={24} />
            </div>
            <h1 className="mt-4 text-2xl font-bold text-emerald-950 dark:text-lime-50">
              O'quvchi kirish
            </h1>
            <p className="mt-2 text-sm text-emerald-900/75 dark:text-lime-100/60">
              O'z darslaringiz va natijalaringizni ko'ring
            </p>
          </div>

          <form onSubmit={handleLogin} className="mt-8 space-y-6">
            <div>
              <label className="block text-sm font-medium text-emerald-950 dark:text-lime-50">
                ID
              </label>
              <div className="mt-2 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Hash size={20} className="text-emerald-900/50 dark:text-lime-100/50" />
                </div>
                <input
                  type="text"
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-emerald-200/60 bg-white/80 rounded-xl text-emerald-950 placeholder-emerald-900/50 shadow-lg backdrop-blur-sm dark:border-lime-500/20 dark:bg-emerald-950/50 dark:text-lime-50 dark:placeholder-lime-100/50 dark:shadow-emerald-900/50 focus:outline-none focus:ring-2 focus:ring-emerald-600/50 dark:focus:ring-lime-400/50"
                  placeholder="ID raqamini kiriting"
                  autoComplete="off"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-emerald-950 dark:text-lime-50">
                Parol
              </label>
              <div className="mt-2 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock size={20} className="text-emerald-900/50 dark:text-lime-100/50" />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-emerald-200/60 bg-white/80 rounded-xl text-emerald-950 placeholder-emerald-900/50 shadow-lg backdrop-blur-sm dark:border-lime-500/20 dark:bg-emerald-950/50 dark:text-lime-50 dark:placeholder-lime-100/50 dark:shadow-emerald-900/50 focus:outline-none focus:ring-2 focus:ring-emerald-600/50 dark:focus:ring-lime-400/50"
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
              className="w-full rounded-xl bg-emerald-600 px-4 py-2 text-sm font-medium text-white shadow-lg shadow-emerald-600/25 transition hover:bg-emerald-700 hover:-translate-y-px hover:shadow-emerald-700/25 dark:bg-lime-500 dark:text-emerald-950 dark:hover:bg-lime-400 dark:shadow-lime-500/25"
            >
              Kirish
            </button>
          </form>

          <div className="mt-6 text-center">
            <a
              href="/"
              className="text-sm text-emerald-600 hover:text-emerald-700 dark:text-lime-400 dark:hover:text-lime-300"
            >
              Asosiy sahifaga qaytish
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
