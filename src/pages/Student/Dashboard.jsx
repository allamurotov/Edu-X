import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ProgressBar } from '../../components/ui/ProgressBar';
import { updateProfile } from '../../store/studentSlice';

export default function StudentDashboard() {
  const dispatch = useDispatch();
  const { user, notifications } = useSelector((state) => state.auth);
  const { profile } = useSelector((state) => state.student);
  const [form, setForm] = useState({
    phone: profile.phone || '',
    city: profile.city || '',
    note: profile.note || '',
  });

  useEffect(() => {
    setForm({
      phone: profile.phone || '',
      city: profile.city || '',
      note: profile.note || '',
    });
  }, [profile]);

  const handleSave = (e) => {
    e.preventDefault();
    dispatch(updateProfile(form));
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-textMain">Xush kelibsiz, {user?.name || 'Oʻquvchi'}!</h1>

      <div className="grid grid-cols-1 xl:grid-cols-[1.25fr_0.75fr] gap-6">
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex flex-col justify-between">
              <div>
                <h3 className="text-gray-500 text-sm font-medium mb-2">Joriy bosqich</h3>
                <p className="text-3xl font-bold text-primary mb-4">{profile.stage}</p>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-xs text-gray-500">
                  <span>Progress</span>
                  <span>75%</span>
                </div>
                <ProgressBar progress={75} colorClass="bg-primary" />
              </div>
            </div>

            <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex flex-col justify-between">
              <h3 className="text-gray-500 text-sm font-medium mb-2">XP Ballar</h3>
              <p className="text-3xl font-bold text-textMain">{profile.xp.toLocaleString()}</p>
              <p className="text-xs text-green-500 mt-2">Darsda qatnashganingiz uchun +25 XP sovgʻa</p>
            </div>

            <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex flex-col justify-between">
              <h3 className="text-gray-500 text-sm font-medium mb-2">Balans</h3>
              <p className="text-3xl font-bold text-[#eab308]">{profile.balance} 🪙</p>
              <p className="text-xs text-gray-500 mt-2">Keyingi mukofotga {50 - (profile.balance % 50)} qoldi</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-lg font-semibold text-textMain">Profil ma'lumotlari</h2>
                <p className="text-sm text-textMuted">Bu bo'lim ixtiyoriy. O'zingiz haqingizdagi ma'lumotlarni joylashtiring.</p>
              </div>
            </div>
            <form onSubmit={handleSave} className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="block text-xs font-medium text-textMain mb-1">Telefon</label>
                <input
                  type="text"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full rounded-2xl border border-gray-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
                  placeholder="+998901234567"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-textMain mb-1">Shahar</label>
                <input
                  type="text"
                  value={form.city}
                  onChange={(e) => setForm({ ...form, city: e.target.value })}
                  className="w-full rounded-2xl border border-gray-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
                  placeholder="Toshkent"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs font-medium text-textMain mb-1">Qo'shimcha ma'lumot</label>
                <textarea
                  value={form.note}
                  onChange={(e) => setForm({ ...form, note: e.target.value })}
                  className="w-full min-h-[120px] rounded-2xl border border-gray-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
                  placeholder="Yaxshi o'quvchi bo'lish uchun qolgan maqsadlaringizni yozing..."
                />
              </div>
              <div className="md:col-span-2 text-right">
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 rounded-2xl bg-primary px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-primary/20 hover:bg-[#a67c4f] transition"
                >
                  Profilni saqlash
                </button>
              </div>
            </form>
          </div>
        </div>

        <aside className="space-y-6">
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
            <div className="mb-4">
              <h2 className="text-lg font-semibold text-textMain">Bildirishnomalar</h2>
              <p className="text-sm text-textMuted">To'lov, guruh va bonus xabarlari bu yerda ko'rinadi.</p>
            </div>
            <div className="space-y-3">
              {notifications.length ? (
                notifications.map((item) => (
                  <div key={item.id} className="rounded-3xl border border-slate-200 bg-slate-50 p-4 text-sm">
                    <div className="font-semibold text-textMain mb-1">{item.title}</div>
                    <div className="text-slate-600 leading-6">{item.message}</div>
                  </div>
                ))
              ) : (
                <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-500">
                  Hozircha bildirishnoma yo'q.
                </div>
              )}
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
            <h2 className="text-lg font-semibold text-textMain mb-3">XP va sovgʻa</h2>
            <div className="rounded-3xl bg-gradient-to-r from-amber-200 via-white to-slate-50 p-5 shadow-sm">
              <p className="text-sm text-slate-600 mb-2">Uy ishi topshirilgach, qo'shimcha XP va sovg'a ballar beriladi.</p>
              <p className="text-2xl font-bold text-textMain">+25 XP</p>
              <p className="text-xs text-slate-500 mt-3">Bu sizni darslarda faol bo'lishga rag'batlantiradi.</p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
