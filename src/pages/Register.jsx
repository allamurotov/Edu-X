import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addUser } from '../store/adminSlice';
import { login } from '../store/authSlice';
import { Link, useNavigate } from 'react-router-dom';
import heroImg from '../assets/hero.png';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const users = useSelector((state) => state.admin.users);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();

    if (!name || !email || !password || !confirmPassword) {
      setError('Iltimos, barcha maydonlarni toʻldiring');
      return;
    }

    if (password !== confirmPassword) {
      setError('Parollar mos emas');
      return;
    }

    if (users.some((user) => user.email.toLowerCase() === email.toLowerCase())) {
      setError('Bu email bilan allaqachon roʻyxatdan oʻtilgan');
      return;
    }

    const nextId = users.length ? Math.max(...users.map((u) => u.id)) + 1 : 1;
    const newUser = {
      name,
      email,
      password,
      role: 'student',
      phone: '',
    };

    dispatch(addUser(newUser));
    dispatch(login({ id: nextId, ...newUser }));
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-[#e8efff] flex items-center justify-center p-4">
      <div className="grid w-full max-w-6xl grid-cols-1 lg:grid-cols-[1.35fr_1fr] gap-6">
        <div className="relative hidden overflow-hidden rounded-[32px] bg-[#1c2a66] lg:flex">
          <img src={heroImg} alt="Edu-X" className="h-full w-full object-cover opacity-95" />
          <div className="absolute inset-0 bg-gradient-to-br from-[#0b1542]/95 via-[#172a67]/75 to-[#172a67]/85" />
          <div className="absolute inset-x-0 top-12 px-10 text-white">
            <div className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold tracking-wide backdrop-blur">
              EDU-X
            </div>
            <h2 className="mt-10 text-4xl font-semibold leading-tight">Oʻqish endi yanada qulay</h2>
            <p className="mt-4 max-w-md text-sm text-slate-200/90">Sizni zamonaviy taʼlim platformasida kutib olishdan xursandmiz. Hisob yaratish uchun maʼlumotlaringizni kiriting.</p>
          </div>
        </div>

        <div className="bg-white rounded-[32px] shadow-2xl border border-slate-200 p-10 flex flex-col justify-center">
          <div className="mb-8 text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">EDU-X</p>
            <h1 className="mt-4 text-4xl font-semibold text-slate-900">Roʻyxatdan oʻtish</h1>
            <p className="mt-2 text-sm text-slate-500">Hisob oching va boshqaruv panelingizga oʻting.</p>
          </div>

          {error && (
            <div className="mb-5 rounded-3xl bg-red-50 p-4 text-sm text-red-700 text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleRegister} className="space-y-5">
            <div className="space-y-3">
              <label className="block text-sm font-medium text-slate-700">Toʻliq ism</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-[24px] border border-slate-200 bg-slate-50 px-4 py-4 text-sm text-slate-900 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-200"
                placeholder="Ismingizni kiriting"
              />
            </div>

            <div className="space-y-3">
              <label className="block text-sm font-medium text-slate-700">EMAIL ID</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-[24px] border border-slate-200 bg-slate-50 px-4 py-4 text-sm text-slate-900 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-200"
                placeholder="kunal@bvp.com"
              />
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <div className="space-y-3">
                <label className="block text-sm font-medium text-slate-700">Parol</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-[24px] border border-slate-200 bg-slate-50 px-4 py-4 text-sm text-slate-900 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-200"
                  placeholder="********"
                />
              </div>
              <div className="space-y-3">
                <label className="block text-sm font-medium text-slate-700">Parolni tasdiqlash</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full rounded-[24px] border border-slate-200 bg-slate-50 px-4 py-4 text-sm text-slate-900 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-200"
                  placeholder="********"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full rounded-[24px] bg-[#1f2f79] py-4 text-sm font-semibold text-white shadow-lg shadow-[#1f2f79]/20 transition hover:bg-[#172763]"
            >
              Roʻyxatdan oʻtish
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-slate-500">
            Allaqachon hisobingiz bormi?{' '}
            <Link to="/login" className="font-semibold text-slate-900 hover:text-blue-600">
              Kirish
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
