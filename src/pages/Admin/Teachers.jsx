import { useEffect, useMemo, useState } from 'react';
import { allocateFiveDigitLogin } from '../../utils/credentials';
import { useDispatch, useSelector } from 'react-redux';
import {
  addTeacher,
  updateTeacher,
  deleteTeacher,
} from '../../store/eduCenterSlice';
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
  Filter,
  Phone,
  Layers,
  Award
} from 'lucide-react';
import { useT } from '../../i18n/useT';
import { Badge } from '../../components/ui/Badge';

const emptyForm = {
  firstName: '',
  lastName: '',
  fatherName: '',
  phone: '',
  password: '',
};

const inputClass =
  'w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-900 outline-none transition focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10 dark:border-slate-800 dark:bg-slate-900/50 dark:text-white dark:focus:border-violet-500/50';

export default function Teachers() {
  const t = useT();
  const dispatch = useDispatch();
  const { teachers, groups } = useSelector((s) => s.eduCenter);
  const search = useSelector((s) => s.ui.adminSearch);

  const [isAdding, setIsAdding] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [editId, setEditId] = useState(null);
  const [createdCreds, setCreatedCreds] = useState(null);
  const [copied, setCopied] = useState(false);

  const filtered = useMemo(
    () => teachers.filter(t => 
      `${t.firstName} ${t.lastName} ${t.loginId}`.toLowerCase().includes(search.toLowerCase())
    ),
    [teachers, search]
  );

  const submit = (e) => {
    e.preventDefault();
    const _issuedLogin = allocateFiveDigitLogin(teachers.map((x) => x.loginNumericId));
    dispatch(addTeacher({ ...form, _issuedLogin }));
    setCreatedCreds({ loginId: _issuedLogin.loginId, password: form.password });
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

  const editTeacher = (teacher) => {
    setEditId(teacher.id);
    setForm({
      firstName: teacher.firstName,
      lastName: teacher.lastName,
      fatherName: teacher.fatherName,
      phone: teacher.phone,
      password: '',
    });
  };

  const saveEdit = () => {
    dispatch(updateTeacher({ id: editId, ...form }));
    setEditId(null);
    setForm(emptyForm);
  };

  const deleteTeacherItem = (id) => {
    if (window.confirm(t('teachers.confirmDelete'))) {
      dispatch(deleteTeacher(id));
    }
  };

  const getTeacherGroups = (teacherId) => {
    return groups.filter((group) => group.teacherId === teacherId);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            {t('teachers.title')}
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Manage your faculty, assign groups, and monitor teacher performance.
          </p>
        </div>
        
        <button 
          onClick={() => setIsAdding(true)}
          className="flex items-center gap-2 rounded-xl bg-violet-600 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-violet-500/30 transition hover:bg-violet-700"
        >
          <Plus size={18} />
          {t('teachers.newTitle')}
        </button>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map(teacher => {
          const teacherGroups = getTeacherGroups(teacher.id);
          return (
            <div key={teacher.id} className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-xl dark:border-slate-800 dark:bg-[#0B0F19]">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-100 text-lg font-bold text-violet-600 dark:bg-violet-500/10 dark:text-violet-400">
                    {teacher.firstName[0]}{teacher.lastName[0]}
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white">{teacher.firstName} {teacher.lastName}</h3>
                    <p className="text-xs font-medium text-slate-400">ID: {teacher.loginId}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                   <button onClick={() => editTeacher(teacher)} className="h-8 w-8 rounded-lg text-slate-400 hover:bg-slate-100 hover:text-violet-600 dark:hover:bg-slate-800">
                     <Edit2 size={16} />
                   </button>
                   <button onClick={() => deleteTeacherItem(teacher.id)} className="h-8 w-8 rounded-lg text-slate-400 hover:bg-slate-100 hover:text-rose-600 dark:hover:bg-slate-800">
                     <Trash2 size={16} />
                   </button>
                </div>
              </div>
              
              <div className="mt-6 space-y-3">
                <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400">
                  <Phone size={14} className="text-slate-400" />
                  {teacher.phone || 'No phone'}
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400">
                  <Layers size={14} className="text-slate-400" />
                  <div className="flex flex-wrap gap-1">
                    {teacherGroups.length > 0 ? (
                      teacherGroups.map(g => <span key={g.id} className="text-xs font-bold text-violet-500">{g.name}</span>)
                    ) : (
                      <span className="text-xs text-slate-400 italic">No groups assigned</span>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4 dark:border-slate-800/50">
                 <div className="flex items-center gap-1.5">
                    <Award size={14} className="text-amber-500" />
                    <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Senior Teacher</span>
                 </div>
                 <span className="inline-flex rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400">
                   Active
                 </span>
              </div>
            </div>
          );
        })}
        
        <button 
          onClick={() => setIsAdding(true)}
          className="flex flex-col items-center justify-center rounded-3xl border-2 border-dashed border-slate-200 p-6 transition hover:border-violet-500/50 hover:bg-violet-50/30 dark:border-slate-800 dark:hover:bg-violet-500/5"
        >
          <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-400 dark:bg-slate-800">
            <Plus size={24} />
          </div>
          <span className="text-sm font-bold text-slate-400">Add New Teacher</span>
        </button>
      </div>

      {/* Add/Edit Modal */}
      {(isAdding || editId) && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-sm dark:bg-black/60">
           <div className="w-full max-w-lg overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl dark:border-slate-800 dark:bg-[#0B0F19]">
              <div className="flex items-center justify-between border-b border-slate-100 p-6 dark:border-slate-800/50">
                 <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                   {editId ? 'Edit Teacher' : t('teachers.newTitle')}
                 </h3>
                 <button onClick={() => { setIsAdding(false); setEditId(null); setForm(emptyForm); }} className="text-slate-400 hover:text-slate-600">
                   <Check size={20} />
                 </button>
              </div>
              
              <form onSubmit={editId ? (e) => { e.preventDefault(); saveEdit(); } : submit} className="p-6">
                 <div className="grid gap-6 sm:grid-cols-2">
                    <div className="space-y-2">
                       <label className="text-xs font-bold uppercase tracking-wider text-slate-400">{t('teachers.firstName')}</label>
                       <input required value={form.firstName} onChange={e => setForm({...form, firstName: e.target.value})} className={inputClass} />
                    </div>
                    <div className="space-y-2">
                       <label className="text-xs font-bold uppercase tracking-wider text-slate-400">{t('teachers.lastName')}</label>
                       <input required value={form.lastName} onChange={e => setForm({...form, lastName: e.target.value})} className={inputClass} />
                    </div>
                    <div className="space-y-2 sm:col-span-2">
                       <label className="text-xs font-bold uppercase tracking-wider text-slate-400">{t('teachers.fatherName')}</label>
                       <input value={form.fatherName} onChange={e => setForm({...form, fatherName: e.target.value})} className={inputClass} />
                    </div>
                    <div className="space-y-2">
                       <label className="text-xs font-bold uppercase tracking-wider text-slate-400">{t('teachers.phone')}</label>
                       <input value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} className={inputClass} placeholder="+998" />
                    </div>
                    {!editId && (
                      <div className="space-y-2">
                         <label className="text-xs font-bold uppercase tracking-wider text-slate-400">{t('teachers.password')}</label>
                         <input required type="password" value={form.password} onChange={e => setForm({...form, password: e.target.value})} className={inputClass} />
                      </div>
                    )}
                 </div>
                 
                 <div className="mt-8 flex gap-3">
                    <button type="submit" className="flex-1 rounded-xl bg-violet-600 py-3 text-sm font-bold text-white shadow-lg shadow-violet-500/30 transition hover:bg-violet-700">
                      {editId ? 'Save Changes' : 'Create Teacher'}
                    </button>
                    <button type="button" onClick={() => { setIsAdding(false); setEditId(null); setForm(emptyForm); }} className="flex-1 rounded-xl bg-slate-100 py-3 text-sm font-bold text-slate-600 transition hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-400">
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
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">Teacher Created!</h3>
              <p className="mt-2 text-sm text-slate-500">Credentials for the new teacher.</p>
              
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
    </div>
  );
}
