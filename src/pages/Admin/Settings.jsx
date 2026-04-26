import { useState } from 'react';
import { User, Building, Shield, Bell, Globe, Save } from 'lucide-react';
import { useT } from '../../i18n/useT';

export default function Settings() {
  const t = useT();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
          {t('nav.settings')}
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Configure your educational center and profile preferences.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-4">
        <div className="lg:col-span-1">
          <nav className="space-y-1">
            {[
              { id: 'profile', label: 'Profile', icon: User },
              { id: 'center', label: 'Center Info', icon: Building },
              { id: 'security', label: 'Security', icon: Shield },
              { id: 'notifications', label: 'Notifications', icon: Bell },
              { id: 'localization', label: 'Localization', icon: Globe },
            ].map(item => (
              <button
                key={item.id}
                className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${
                  item.id === 'profile' 
                    ? 'bg-violet-50 text-violet-600 dark:bg-violet-500/10 dark:text-violet-400' 
                    : 'text-slate-600 hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-800'
                }`}
              >
                <item.icon size={18} />
                {item.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="lg:col-span-3">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-[#0B0F19]">
            <div className="mb-8 flex items-center justify-between">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Profile Information</h3>
              <button className="flex items-center gap-2 rounded-xl bg-violet-600 px-4 py-2 text-sm font-bold text-white shadow-lg shadow-violet-500/30 transition hover:bg-violet-700">
                <Save size={16} />
                Save Changes
              </button>
            </div>
            
            <div className="space-y-6">
              <div className="flex items-center gap-6">
                <div className="relative">
                  <div className="h-20 w-20 rounded-2xl bg-slate-100 dark:bg-slate-800" />
                  <button className="absolute -bottom-2 -right-2 flex h-8 w-8 items-center justify-center rounded-lg bg-white border border-slate-200 text-slate-600 shadow-sm dark:bg-slate-900 dark:border-slate-700 dark:text-slate-400">
                    <User size={16} />
                  </button>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">Your Avatar</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">PNG or JPG, max 5MB.</p>
                </div>
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-400">First Name</label>
                  <input type="text" className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm outline-none focus:border-violet-500 dark:border-slate-800 dark:bg-slate-900 dark:text-white" defaultValue="Super" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Last Name</label>
                  <input type="text" className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm outline-none focus:border-violet-500 dark:border-slate-800 dark:bg-slate-900 dark:text-white" defaultValue="Admin" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Email Address</label>
                  <input type="email" className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm outline-none focus:border-violet-500 dark:border-slate-800 dark:bg-slate-900 dark:text-white" defaultValue="admin@edu-x.app" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Phone Number</label>
                  <input type="text" className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm outline-none focus:border-violet-500 dark:border-slate-800 dark:bg-slate-900 dark:text-white" defaultValue="+998 90 123 45 67" />
                </div>
              </div>
            </div>
            
            <div className="mt-12 border-t border-slate-100 pt-8 dark:border-slate-800">
              <h3 className="mb-6 text-lg font-bold text-slate-900 dark:text-white">Educational Center Information</h3>
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Center Name</label>
                  <input type="text" className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm outline-none focus:border-violet-500 dark:border-slate-800 dark:bg-slate-900 dark:text-white" defaultValue="Edu-X Learning Academy" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Address</label>
                  <input type="text" className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm outline-none focus:border-violet-500 dark:border-slate-800 dark:bg-slate-900 dark:text-white" defaultValue="Tashkent, Uzbekistan" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
