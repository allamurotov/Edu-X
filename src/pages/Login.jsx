import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../store/authSlice';
import { useNavigate } from 'react-router-dom';
import { GraduationCap, Lock, Hash } from 'lucide-react';
import { useT } from '../i18n/useT';
import { ThemeLangControls } from '../components/ThemeLangControls';

export default function Login() {
  const t = useT();
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loginIdReadOnly, setLoginIdReadOnly] = useState(true);
  const adminUsers = useSelector((state) => state.admin.users);
  const teachers = useSelector((state) => state.eduCenter.teachers);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (!userId || !password) {
      setError(t('login.errEmpty'));
      return;
    }

    const id = Number(userId);
    const allUsers = [...adminUsers, ...teachers];
    const matchedUser = allUsers.find((user) => user.loginNumericId === id && user.password === password);

    if (!matchedUser) {
      setError(t('login.errBad'));
      return;
    }

    if (matchedUser.role !== 'admin' && matchedUser.role !== 'teacher') {
      setError(t('login.errRole'));
      return;
    }

    const safeUser = { ...matchedUser };
    delete safeUser.password;
    dispatch(login(safeUser));
    navigate('/');
  };

  const inputClass =
    'w-full rounded-2xl border px-4 py-3.5 font-mono text-sm outline-none transition ' +
    'border-emerald-200/90 bg-white/90 text-emerald-950 placeholder:text-emerald-600/45 focus:border-lime-500 focus:ring-2 focus:ring-lime-500/25 ' +
    'dark:border-lime-500/25 dark:bg-emerald-950/70 dark:text-lime-100 dark:placeholder:text-lime-500/40 dark:focus:border-lime-400 dark:focus:ring-lime-400/20';

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-emerald-50 via-lime-50/80 to-green-100 dark:from-[#020805] dark:via-[#051208] dark:to-[#030a06]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(34,197,94,0.18),transparent)] dark:bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(0,255,136,0.06),transparent)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_100%_100%,rgba(163,230,53,0.14),transparent)] dark:bg-[radial-gradient(ellipse_60%_40%_at_100%_100%,rgba(34,197,94,0.08),transparent)]" />

      <div className="absolute right-4 top-4 z-20 md:right-8 md:top-6">
        <ThemeLangControls />
      </div>

      <div className="relative mx-auto flex min-h-screen max-w-6xl flex-col items-center justify-center p-6 pt-20 lg:flex-row lg:gap-12 lg:p-10 lg:pt-10">
        <div className="mb-10 hidden max-w-md flex-1 lg:block">
          <div className="mb-6 inline-flex items-center gap-2 rounded-2xl border border-lime-400/40 bg-white/75 px-4 py-2 font-mono text-sm font-medium text-emerald-900 shadow-sm backdrop-blur-md dark:border-lime-500/25 dark:bg-emerald-950/50 dark:text-lime-200">
            <GraduationCap className="text-emerald-600 dark:text-lime-400" size={20} />
            {t('login.brand')}
          </div>
          <h1 className="text-4xl font-semibold leading-tight tracking-tight text-emerald-950 dark:text-lime-50">
            {t('login.heroTitle')}
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-emerald-900/75 dark:text-lime-100/60">{t('login.heroText')}</p>
          <div className="mt-10 grid gap-3 font-mono text-xs text-emerald-800/70 dark:text-lime-200/55">
            <div className="rounded-xl border border-emerald-200/80 bg-white/65 px-4 py-3 backdrop-blur-md dark:border-lime-500/20 dark:bg-emerald-950/40">
              {t('login.demo', { id: '00001', pw: 'admin123' })}
            </div>
          </div>
        </div>

        <div className="w-full max-w-md">
          <div className="rounded-3xl border border-emerald-200/80 bg-white/80 p-8 shadow-2xl shadow-emerald-200/40 backdrop-blur-2xl dark:border-lime-500/20 dark:bg-emerald-950/50 dark:shadow-[0_0_60px_rgba(34,197,94,0.12)]">
            <div className="mb-8 text-center lg:text-left">
              <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700 dark:text-lime-400">
                {t('login.signIn')}
              </p>
              <h2 className="mt-2 text-2xl font-semibold text-emerald-950 dark:text-lime-50">{t('login.accountTitle')}</h2>
              <p className="mt-2 text-sm text-emerald-900/70 dark:text-lime-100/55">{t('login.accountHint')}</p>
            </div>

            {error && (
              <div className="mb-5 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800 dark:border-red-500/30 dark:bg-red-950/40 dark:text-red-200">
                {error}
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-5" autoComplete="off">
              <div>
                <label
                  className="mb-2 flex items-center gap-2 font-mono text-xs font-medium text-emerald-900/85 dark:text-lime-200/80"
                  htmlFor="login-id"
                >
                  <Hash size={14} />
                  {t('login.loginId')}
                </label>
                <input
                  id="login-id"
                  name="login-id"
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                  onFocus={() => setLoginIdReadOnly(false)}
                  readOnly={loginIdReadOnly}
                  className={inputClass}
                  placeholder={t('login.loginIdPh')}
                  autoComplete="off"
                  autoCorrect="off"
                  autoCapitalize="off"
                  spellCheck={false}
                  data-lpignore="true"
                  data-1p-ignore="true"
                  data-form-type="other"
                  data-bwignore="true"
                  data-kwimpalastatus="ignore"
                  data-mswebimagedisabled="true"
                />
              </div>

              <div>
                <label
                  className="mb-2 flex items-center gap-2 font-mono text-xs font-medium text-emerald-900/85 dark:text-lime-200/80"
                  htmlFor="password-field"
                >
                  <Lock size={14} />
                  {t('login.password')}
                </label>
                <input
                  id="password-field"
                  name="password-field"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={inputClass}
                  placeholder="••••••••"
                  autoComplete="new-password"
                  data-lpignore="true"
                  data-1p-ignore="true"
                  data-form-type="other"
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-2xl bg-gradient-to-r from-emerald-700 via-green-600 to-lime-500 py-3.5 font-mono text-sm font-semibold text-white shadow-lg shadow-emerald-600/30 transition hover:brightness-110 dark:from-lime-500 dark:via-emerald-500 dark:to-lime-400 dark:text-emerald-950"
              >
                {t('login.submit')}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
