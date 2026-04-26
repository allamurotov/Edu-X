import { useState } from 'react';
import { Search, Filter, Check, X, Clock, Calendar } from 'lucide-react';
import { useT } from '../../i18n/useT';

const mockStudents = [
  { id: 10021, name: 'Alisher Karimov', group: 'React G1', status: 'present' },
  { id: 10022, name: 'Zulfiya Mamadova', group: 'React G1', status: 'absent' },
  { id: 10023, name: 'Bobur Tursunov', group: 'React G1', status: 'late' },
  { id: 10024, name: 'Nilufar Saidova', group: 'React G1', status: 'present' },
  { id: 10025, name: 'Jasur Holmatov', group: 'React G1', status: 'present' },
];

export default function Attendance() {
  const t = useT();
  const [selectedGroup, setSelectedGroup] = useState('React G1');
  const [date, setDate] = useState('2026-10-26');

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            {t('nav.attendance')}
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Track student attendance for each group and lesson.
          </p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="col-span-1 space-y-4">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-[#0B0F19]">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">Select Group</h3>
            <div className="mt-4 space-y-2">
              {['React G1', 'Python B2', 'Design A1', 'English C3'].map(g => (
                <button
                  key={g}
                  onClick={() => setSelectedGroup(g)}
                  className={`flex w-full items-center justify-between rounded-xl px-4 py-3 text-sm font-medium transition ${
                    selectedGroup === g 
                      ? 'bg-violet-50 text-violet-600 dark:bg-violet-500/10 dark:text-violet-400' 
                      : 'text-slate-600 hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-800'
                  }`}
                >
                  {g}
                  {selectedGroup === g && <div className="h-2 w-2 rounded-full bg-violet-600 shadow-lg shadow-violet-500/50" />}
                </button>
              ))}
            </div>
          </div>
          
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-[#0B0F19]">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">Lesson Info</h3>
            <div className="mt-4 space-y-3">
              <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400">
                <Calendar size={16} className="text-slate-400" />
                <input 
                  type="date" 
                  value={date} 
                  onChange={e => setDate(e.target.value)}
                  className="bg-transparent font-medium focus:outline-none" 
                />
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400">
                <Clock size={16} className="text-slate-400" />
                <span className="font-medium">09:00 - 11:00</span>
              </div>
            </div>
          </div>
        </div>

        <div className="col-span-2 space-y-4">
          <div className="rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-[#0B0F19]">
            <div className="flex items-center justify-between border-b border-slate-200 p-5 dark:border-slate-800">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                Attendance: {selectedGroup}
              </h3>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-400">4 / 5 Marked</span>
              </div>
            </div>
            
            <div className="divide-y divide-slate-100 dark:divide-slate-800/50">
              {mockStudents.map(s => (
                <div key={s.id} className="flex items-center justify-between p-5 transition hover:bg-slate-50/50 dark:hover:bg-slate-800/20">
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 font-bold text-slate-600 dark:bg-slate-800 dark:text-slate-400">
                      {s.name[0]}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-900 dark:text-white">{s.name}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-500">ID: {s.id}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <button className={`flex h-9 items-center gap-2 rounded-lg px-3 text-xs font-bold transition ${
                      s.status === 'present' 
                        ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400' 
                        : 'bg-slate-50 text-slate-400 hover:bg-emerald-50 hover:text-emerald-600 dark:bg-slate-800 dark:text-slate-500 dark:hover:bg-emerald-500/10'
                    }`}>
                      <Check size={14} />
                      Present
                    </button>
                    <button className={`flex h-9 items-center gap-2 rounded-lg px-3 text-xs font-bold transition ${
                      s.status === 'absent' 
                        ? 'bg-rose-100 text-rose-600 dark:bg-rose-500/10 dark:text-rose-400' 
                        : 'bg-slate-50 text-slate-400 hover:bg-rose-50 hover:text-rose-600 dark:bg-slate-800 dark:text-slate-500 dark:hover:bg-rose-500/10'
                    }`}>
                      <X size={14} />
                      Absent
                    </button>
                    <button className={`flex h-9 items-center gap-2 rounded-lg px-3 text-xs font-bold transition ${
                      s.status === 'late' 
                        ? 'bg-amber-100 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400' 
                        : 'bg-slate-50 text-slate-400 hover:bg-amber-50 hover:text-amber-600 dark:bg-slate-800 dark:text-slate-500 dark:hover:bg-amber-500/10'
                    }`}>
                      <Clock size={14} />
                      Late
                    </button>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="border-t border-slate-200 p-5 dark:border-slate-800">
              <button className="w-full rounded-xl bg-violet-600 py-3 text-sm font-bold text-white shadow-lg shadow-violet-500/30 transition hover:bg-violet-700">
                Save Attendance
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
