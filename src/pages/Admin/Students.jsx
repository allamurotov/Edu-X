import { useEffect, useMemo, useState } from 'react';
import { allocateFiveDigitLogin } from '../../utils/credentials';
import { useDispatch, useSelector } from 'react-redux';
import {
  addStudent,
  assignStudentToGroup,
  markStudentFinished,
  reactivateStudent,
  updateStudent,
} from '../../store/eduCenterSlice';
import { COURSE_CATALOG, courseLabelById } from '../../constants/courses';
import {
  Search,
  Plus,
  MoreVertical,
  Edit2,
  Trash2,
  Copy,
  Check,
  UserPlus,
  KeyRound,
  Filter
} from 'lucide-react';
import { useT } from '../../i18n/useT';
import { Badge } from '../../components/ui/Badge';

const emptyForm = {
  firstName: '',
  lastName: '',
  fatherName: '',
  phone: '',
  parentPhone: '',
  password: '',
  previousEducation: '',
  selectedCourse: COURSE_CATALOG[0].id,
};

const inputClass =
  'w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-900 outline-none transition focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10 dark:border-slate-800 dark:bg-slate-900/50 dark:text-white dark:focus:border-violet-500/50';

function XpProgressBar({ xp, goal }) {
  const x = Math.max(0, Number(xp) || 0);
  const g = Math.max(1, Number(goal) || 750);
  const pct = Math.min(100, (x / g) * 100);
  return (
    <div className="w-24">
      <div className="mb-1 flex justify-between text-[10px] font-bold text-slate-400">
        <span>{x}</span>
        <span>{g}</span>
      </div>
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
        <div
          className="h-full rounded-full bg-violet-600 transition-all dark:bg-violet-500 shadow-[0_0_8px_rgba(124,58,237,0.4)]"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

export default function Students() {
  const t = useT();
  const dispatch = useDispatch();
  const { students, groups } = useSelector((s) => s.eduCenter);
  const search = useSelector((s) => s.ui.adminSearch);

  const [isAdding, setIsAdding] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [createdCreds, setCreatedCreds] = useState(null);
  const [copied, setCopied] = useState(false);
  const [editId, setEditId] = useState(null);
  const [gf, setGf] = useState({
    kumush: 0,
    xp: 0,
    xpGoal: 750,
    level: 1,
    rank: 0,
  });

  const filtered = useMemo(
    () => students.filter(s => 
      `${s.firstName} ${s.lastName} ${s.loginId}`.toLowerCase().includes(search.toLowerCase())
    ),
    [students, search]
  );

  const editStudent = useMemo(
    () => (editId ? students.find((s) => s.id === editId) : null),
    [editId, students]
  );

  useEffect(() => {
    if (!editStudent) return;
    setGf({
      kumush: editStudent.kumush ?? 0,
      xp: editStudent.xp ?? 0,
      xpGoal: editStudent.xpGoal ?? 750,
      level: editStudent.level ?? 1,
      rank: editStudent.rank ?? 0,
    });
  }, [editStudent]);

  const courseLabel = (id) => {
    const tr = t(`courses.${id}`);
    return tr === `courses.${id}` ? courseLabelById(id) : tr;
  };

  const handleAdd = (e) => {
    e.preventDefault();
    if (!form.firstName.trim() || !form.lastName.trim()) return;
    const pw = form.password.trim();
    if (!pw) return;
    const issued = allocateFiveDigitLogin(students.map((s) => s.loginNumericId));
    dispatch(
      addStudent({
        ...form,
        password: pw,
        _issuedLogin: issued,
      })
    );
    setCreatedCreds({ loginId: issued.loginId, password: pw });
    setForm(emptyForm);
    setIsAdding(false);
  };

  const copyCreds = async (loginId, password) => {
    const text = `ID: ${loginId}\nPassword: ${password}`;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch { /* ignore */ }
  };

  const saveGamify = () => {
    if (!editId) return;
    dispatch(
      updateStudent({
        id: editId,
        ...gf,
        kumush: Number(gf.kumush),
        xp: Number(gf.xp),
        xpGoal: Number(gf.xpGoal),
        level: Number(gf.level),
        rank: Number(gf.rank),
      })
    );
    setEditId(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            {t('students.title')}
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Manage your student directory, monitor progress, and handle enrollments.
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setIsAdding(true)}
            className="flex items-center gap-2 rounded-xl bg-violet-600 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-violet-500/30 transition hover:bg-violet-700"
          >
            <Plus size={18} />
            {t('students.newTitle')}
          </button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-4">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-[#0B0F19]">
          <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Total Students</p>
          <p className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">{students.length}</p>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-[#0B0F19]">
          <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Active Now</p>
          <p className="mt-2 text-3xl font-bold text-emerald-500">{students.filter(s => s.status === 'active').length}</p>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-[#0B0F19]">
          <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Graduated</p>
          <p className="mt-2 text-3xl font-bold text-blue-500">{students.filter(s => s.status === 'finished').length}</p>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-[#0B0F19]">
          <p className="text-xs font-bold uppercase tracking-widest text-slate-400">New This Month</p>
          <p className="mt-2 text-3xl font-bold text-violet-500">+12</p>
        </div>
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-[#0B0F19]">
        <div className="flex flex-col gap-4 border-b border-slate-100 p-6 dark:border-slate-800/50 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
             <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input 
                  type="text" 
                  placeholder="Search students..." 
                  className="h-10 w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-4 text-sm outline-none focus:border-violet-500 dark:border-slate-800 dark:bg-slate-900/50 dark:text-white sm:w-64" 
                />
             </div>
             <button className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 transition hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400">
               <Filter size={18} />
             </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/50 text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:border-slate-800 dark:bg-slate-900/50">
                <th className="p-5">Student</th>
                <th className="p-5">Contact</th>
                <th className="p-5">Course / Group</th>
                <th className="p-5">Progress</th>
                <th className="p-5">Status</th>
                <th className="p-5"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/50">
              {filtered.map((s) => {
                const g = s.groupId ? groups.find((x) => x.id === s.groupId) : null;
                return (
                  <tr key={s.id} className="transition hover:bg-slate-50/50 dark:hover:bg-slate-800/20">
                    <td className="p-5">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-100 text-sm font-bold text-violet-600 dark:bg-violet-500/10 dark:text-violet-400">
                          {s.firstName[0]}{s.lastName[0]}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-slate-900 dark:text-white">{s.firstName} {s.lastName}</p>
                          <p className="text-xs font-medium text-slate-400">ID: {s.loginId}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-5">
                      <p className="text-sm text-slate-600 dark:text-slate-400">{s.phone}</p>
                      <p className="text-[10px] text-slate-400">Parent: {s.parentPhone}</p>
                    </td>
                    <td className="p-5">
                      <p className="text-sm font-medium text-slate-700 dark:text-slate-300">{courseLabel(s.selectedCourse)}</p>
                      <div className="mt-1">
                        {g ? <span className="text-xs font-bold text-violet-500">{g.name}</span> : <span className="text-xs text-slate-400">No Group</span>}
                      </div>
                    </td>
                    <td className="p-5">
                      <XpProgressBar xp={s.xp} goal={s.xpGoal} />
                    </td>
                    <td className="p-5">
                      <span className={`inline-flex rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide ${
                        s.status === 'active' 
                          ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400' 
                          : 'bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400'
                      }`}>
                        {s.status}
                      </span>
                    </td>
                    <td className="p-5 text-right">
                      <div className="flex items-center justify-end gap-2">
                         <button 
                           onClick={() => setEditId(s.id)}
                           className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-violet-600 dark:hover:bg-slate-800 dark:hover:text-violet-400"
                         >
                           <Edit2 size={16} />
                         </button>
                         <button className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-rose-600 dark:hover:bg-slate-800 dark:hover:text-rose-400">
                           <Trash2 size={16} />
                         </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Student Modal */}
      {isAdding && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-sm dark:bg-black/60">
          <div className="w-full max-w-2xl overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl dark:border-slate-800 dark:bg-[#0B0F19]">
             <div className="flex items-center justify-between border-b border-slate-100 p-6 dark:border-slate-800/50">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">{t('students.newTitle')}</h3>
                <button onClick={() => setIsAdding(false)} className="text-slate-400 hover:text-slate-600">
                  <Check size={20} />
                </button>
             </div>
             
             <form onSubmit={handleAdd} className="p-6">
                <div className="grid gap-6 sm:grid-cols-2">
                   <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-400">{t('students.firstName')}</label>
                      <input required value={form.firstName} onChange={e => setForm({...form, firstName: e.target.value})} className={inputClass} />
                   </div>
                   <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-400">{t('students.lastName')}</label>
                      <input required value={form.lastName} onChange={e => setForm({...form, lastName: e.target.value})} className={inputClass} />
                   </div>
                   <div className="space-y-2 sm:col-span-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-400">{t('students.fatherName')}</label>
                      <input value={form.fatherName} onChange={e => setForm({...form, fatherName: e.target.value})} className={inputClass} />
                   </div>
                   <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-400">{t('students.phone')}</label>
                      <input value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} className={inputClass} placeholder="+998" />
                   </div>
                   <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-400">{t('students.parentPhone')}</label>
                      <input value={form.parentPhone} onChange={e => setForm({...form, parentPhone: e.target.value})} className={inputClass} placeholder="+998" />
                   </div>
                   <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-400">{t('students.password')}</label>
                      <input required type="password" value={form.password} onChange={e => setForm({...form, password: e.target.value})} className={inputClass} />
                   </div>
                   <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-400">{t('students.course')}</label>
                      <select value={form.selectedCourse} onChange={e => setForm({...form, selectedCourse: e.target.value})} className={inputClass}>
                        {COURSE_CATALOG.map(c => <option key={c.id} value={c.id}>{courseLabel(c.id)}</option>)}
                      </select>
                   </div>
                </div>
                
                <div className="mt-8 flex gap-3">
                   <button type="submit" className="flex-1 rounded-xl bg-violet-600 py-3 text-sm font-bold text-white shadow-lg shadow-violet-500/30 transition hover:bg-violet-700">
                     Create Student
                   </button>
                   <button type="button" onClick={() => setIsAdding(false)} className="flex-1 rounded-xl bg-slate-100 py-3 text-sm font-bold text-slate-600 transition hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-400">
                     Cancel
                   </button>
                </div>
             </form>
          </div>
        </div>
      )}

      {/* Credentials Modal */}
      {createdCreds && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-sm">
           <div className="w-full max-w-sm rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-2xl dark:border-slate-800 dark:bg-[#0B0F19]">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400">
                <Check size={32} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">Student Created!</h3>
              <p className="mt-2 text-sm text-slate-500">Here are the login credentials for the new student.</p>
              
              <div className="mt-6 space-y-4 rounded-2xl bg-slate-50 p-6 text-left dark:bg-slate-900">
                 <div>
                    <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Login ID</label>
                    <p className="text-lg font-bold text-slate-900 dark:text-white">{createdCreds.loginId}</p>
                 </div>
                 <div>
                    <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Password</label>
                    <p className="text-lg font-bold text-slate-900 dark:text-white">{createdCreds.password}</p>
                 </div>
              </div>
              
              <div className="mt-8 space-y-3">
                 <button 
                   onClick={() => copyCreds(createdCreds.loginId, createdCreds.password)}
                   className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-50 dark:border-slate-800 dark:text-slate-300 dark:hover:bg-slate-800"
                 >
                   {copied ? <Check size={18} /> : <Copy size={18} />}
                   {copied ? 'Copied!' : 'Copy Credentials'}
                 </button>
                 <button 
                   onClick={() => setCreatedCreds(null)}
                   className="w-full rounded-xl bg-violet-600 py-3 text-sm font-bold text-white transition hover:bg-violet-700"
                 >
                   Done
                 </button>
              </div>
           </div>
        </div>
      )}

      {/* Gamify Modal */}
      {editId && editStudent && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-sm dark:bg-black/60">
           <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl dark:border-slate-800 dark:bg-[#0B0F19]">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Edit Student Progress</h3>
              <p className="mt-1 text-sm text-slate-500">{editStudent.firstName} {editStudent.lastName}</p>
              
              <div className="mt-6 grid gap-4">
                 <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-400">Silver (Kumush)</label>
                    <input type="number" value={gf.kumush} onChange={e => setGf({...gf, kumush: e.target.value})} className={inputClass} />
                 </div>
                 <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-400">XP Points</label>
                    <input type="number" value={gf.xp} onChange={e => setGf({...gf, xp: e.target.value})} className={inputClass} />
                 </div>
                 <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-400">Level</label>
                    <input type="number" value={gf.level} onChange={e => setGf({...gf, level: e.target.value})} className={inputClass} />
                 </div>
              </div>
              
              <div className="mt-8 flex gap-3">
                 <button onClick={saveGamify} className="flex-1 rounded-xl bg-violet-600 py-3 text-sm font-bold text-white transition hover:bg-violet-700">Save Progress</button>
                 <button onClick={() => setEditId(null)} className="flex-1 rounded-xl bg-slate-100 py-3 text-sm font-bold text-slate-600 dark:bg-slate-800 dark:text-slate-400">Cancel</button>
              </div>
           </div>
        </div>
      )}
    </div>
  );
}
