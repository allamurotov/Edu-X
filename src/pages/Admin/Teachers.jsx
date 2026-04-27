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
import { useTheme } from '../../hooks/useTheme';

const emptyForm = {
  firstName: '',
  lastName: '',
  fatherName: '',
  phone: '',
  password: '',
};

function getInputClass(isDarkMode) {
  return `w-full rounded-xl border border-[rgba(0,255,136,0.20)] px-4 py-2.5 text-sm outline-none transition focus:border-[#00FF88] focus:ring-4 focus:ring-[rgba(0,255,136,0.10)] ${
    isDarkMode 
      ? 'bg-[#020403] text-[#FFFFFF]' 
      : 'bg-[#FFFFFF] text-[#0F172A] border-[#E2E8F0]'
  }`;
}

export default function Teachers() {
  const t = useT();
  const dispatch = useDispatch();
  const { teachers, groups } = useSelector((s) => s.eduCenter);
  const { isDarkMode } = useTheme();
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
          <h1 className="text-2xl font-bold tracking-tight text-[#FFFFFF]">
            {t('teachers.title')}
          </h1>
          <p className="text-sm text-[#9AE6B4]">
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
            <div key={teacher.id} className={`group relative overflow-hidden rounded-3xl border p-6 shadow-sm transition hover:shadow-xl ${
                  isDarkMode 
                    ? 'border-[rgba(0,255,136,0.20)] bg-[#050505] shadow-[#00FF88]/10' 
                    : 'border-[#E2E8F0] bg-[#FFFFFF] shadow-gray-200'
                }`}>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-2xl text-lg font-bold ${
                    isDarkMode 
                      ? 'bg-[rgba(0,255,136,0.1)] text-[#00FF88]' 
                      : 'bg-[#DCFCE7] text-[#16A34A]'
                  }`}>
                    {teacher.firstName[0]}{teacher.lastName[0]}
                  </div>
                  <div>
                    <h3 className={`text-base font-bold ${
                      isDarkMode ? 'text-[#FFFFFF]' : 'text-[#0F172A]'
                    }`}>{teacher.firstName} {teacher.lastName}</h3>
                    <p className={`text-xs font-medium ${
                      isDarkMode ? 'text-[#9AE6B4]' : 'text-[#64748B]'
                    }`}>ID: {teacher.loginId}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                   <button onClick={() => editTeacher(teacher)} className={`h-8 w-8 rounded-lg transition ${
                     isDarkMode 
                       ? 'text-[#9AE6B4] hover:bg-[rgba(0,255,136,0.08)] hover:text-[#00FF88]' 
                       : 'text-[#64748B] hover:bg-[#DCFCE7] hover:text-[#16A34A]'
                   }`}>
                     <Edit2 size={16} />
                   </button>
                   <button onClick={() => deleteTeacherItem(teacher.id)} className={`h-8 w-8 rounded-lg transition ${
                     isDarkMode 
                       ? 'text-[#9AE6B4] hover:bg-[rgba(0,255,136,0.08)] hover:text-[#FF4444]' 
                       : 'text-[#64748B] hover:bg-[#FEE2E2] hover:text-[#DC2626]'
                   }`}>
                     <Trash2 size={16} />
                   </button>
                </div>
              </div>
              
              <div className="mt-6 space-y-3">
                <div className={`flex items-center gap-3 text-sm ${
                  isDarkMode ? 'text-[#9AE6B4]' : 'text-[#64748B]'
                }`}>
                  <Phone size={14} className={isDarkMode ? 'text-[#9AE6B4]' : 'text-[#64748B]'} />
                  {teacher.phone || 'No phone'}
                </div>
                <div className={`flex items-center gap-3 text-sm ${
                  isDarkMode ? 'text-[#9AE6B4]' : 'text-[#64748B]'
                }`}>
                  <Layers size={14} className={isDarkMode ? 'text-[#9AE6B4]' : 'text-[#64748B]'} />
                  <div className="flex flex-wrap gap-1">
                    {teacherGroups.length > 0 ? (
                      teacherGroups.map(g => <span key={g.id} className={`text-xs font-bold ${
                        isDarkMode ? 'text-[#00FF88]' : 'text-[#16A34A]'
                      }`}>{g.name}</span>)
                    ) : (
                      <span className={`text-xs italic ${
                        isDarkMode ? 'text-[#9AE6B4]' : 'text-[#64748B]'
                      }`}>No groups assigned</span>
                    )}
                  </div>
                </div>
              </div>
              
              <div className={`mt-6 flex items-center justify-between border-t pt-4 ${
                 isDarkMode ? 'border-[rgba(0,255,136,0.20)]' : 'border-[#E5E7EB]'
               }`}>
                 <div className="flex items-center gap-1.5">
                    <Award size={14} className="text-amber-500" />
                    <span className={`text-xs font-bold ${
                      isDarkMode ? 'text-[#FFFFFF]' : 'text-[#0F172A]'
                    }`}>Senior Teacher</span>
                 </div>
              </div>
            </div>
          );
        })}
        
        <button
          onClick={() => setIsAdding(true)}
          className={`flex flex-col items-center justify-center rounded-3xl border-2 border-dashed p-6 transition ${
            isDarkMode 
              ? 'border-[rgba(0,255,136,0.20)] hover:border-[rgba(0,255,136,0.30)] hover:bg-[rgba(0,255,136,0.08)]' 
              : 'border-[#E2E8F0] hover:border-[#16A34A] hover:bg-[#DCFCE7]'
          }`}
        >
            <div className={`mb-3 flex h-12 w-12 items-center justify-center rounded-full ${
              isDarkMode ? 'bg-[#020403] text-[#9AE6B4]' : 'bg-[#F8FAFC] text-[#64748B]'
            }`}>
              <Plus size={24} />
            </div>
            <span className={`text-sm font-bold ${
              isDarkMode ? 'text-[#9AE6B4]' : 'text-[#64748B]'
            }`}>Add New Teacher</span>
          </button>
      </div>

      {/* Add/Edit Modal */}
      {(isAdding || editId) && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
           <div className={`w-full max-w-lg overflow-hidden rounded-3xl border shadow-2xl ${
                 isDarkMode 
                   ? 'border-[rgba(0,255,136,0.20)] bg-[#050505] shadow-[#00FF88]/10' 
                   : 'border-[#E2E8F0] bg-[#FFFFFF] shadow-gray-200'
               }`}>
              <div className={`flex items-center justify-between border-b p-6 ${
                isDarkMode ? 'border-[rgba(0,255,136,0.20)]' : 'border-[#E2E8F0]'
              }`}>
                 <h3 className={`text-lg font-bold ${
                   isDarkMode ? 'text-[#FFFFFF]' : 'text-[#0F172A]'
                 }`}>
                   {editId ? 'Edit Teacher' : t('teachers.newTitle')}
                 </h3>
                 <button onClick={() => { setIsAdding(false); setEditId(null); setForm(emptyForm); }} className={`${
                   isDarkMode ? 'text-[#9AE6B4] hover:text-[#FFFFFF]' : 'text-[#64748B] hover:text-[#0F172A]'
                 }`}>
                   <Check size={20} />
                 </button>
              </div>
              
              <form onSubmit={editId ? (e) => { e.preventDefault(); saveEdit(); } : submit} className="p-6">
                 <div className="grid gap-6 sm:grid-cols-2">
                    <div className="space-y-2">
                       <label className="text-xs font-bold uppercase tracking-wider text-[#9AE6B4]">{t('teachers.firstName')}</label>
                       <input required value={form.firstName} onChange={e => setForm({...form, firstName: e.target.value})} className={getInputClass(isDarkMode)} />
                    </div>
                    <div className="space-y-2">
                       <label className={`text-xs font-bold uppercase tracking-wider ${
                        isDarkMode ? 'text-[#9AE6B4]' : 'text-[#64748B]'
                      }`}>{t('teachers.lastName')}</label>
                    </div>
                    <div className="space-y-2 sm:col-span-2">
                       <label className={`text-xs font-bold uppercase tracking-wider ${
                         isDarkMode ? 'text-[#9AE6B4]' : 'text-[#64748B]'
                       }`}>{t('teachers.firstName')}</label>
                    </div>
                    <div className="space-y-2">
                       <label className={`text-xs font-bold uppercase tracking-wider ${
                         isDarkMode ? 'text-[#9AE6B4]' : 'text-[#64748B]'
                       }`}>{t('teachers.lastName')}</label>
                    </div>
                    <div className="space-y-2 sm:col-span-2">
                       <label className={`text-xs font-bold uppercase tracking-wider ${
                         isDarkMode ? 'text-[#9AE6B4]' : 'text-[#64748B]'
                       }`}>{t('teachers.fatherName')}</label>
                    </div>
                    <div className="space-y-2">
                       <label className={`text-xs font-bold uppercase tracking-wider ${
                         isDarkMode ? 'text-[#9AE6B4]' : 'text-[#64748B]'
                       }`}>{t('teachers.phone')}</label>
                    </div>
                    {!editId && (
                      <div className="space-y-2">
                         <label className={`text-xs font-bold uppercase tracking-wider ${
                           isDarkMode ? 'text-[#9AE6B4]' : 'text-[#64748B]'
                         }`}>{t('teachers.password')}</label>
                         <input required type="password" value={form.password} onChange={e => setForm({...form, password: e.target.value})} className={getInputClass(isDarkMode)} />
                      </div>
                    )}
                 </div>
                 
                 <div className="mt-8 flex gap-3">
                    <button type="submit" className={`flex-1 rounded-xl py-3 text-sm font-bold transition ${
                      isDarkMode 
                        ? 'bg-gradient-to-r from-[#00FF88] to-[#22C55E] text-[#020403] shadow-lg shadow-[#00FF88]/30 hover:from-[#22C55E] hover:to-[#00FF88]' 
                        : 'bg-[#16A34A] text-[#FFFFFF] hover:bg-[#15803D]'
                    }`}>
                      {editId ? 'Save Changes' : 'Create Teacher'}
                    </button>
                    <button type="button" onClick={() => { setIsAdding(false); setEditId(null); setForm(emptyForm); }} className={`flex-1 rounded-xl py-3 text-sm font-bold transition border ${
                      isDarkMode 
                        ? 'bg-[#020403] text-[#9AE6B4] hover:bg-[rgba(0,255,136,0.08)] hover:text-[#FFFFFF] border-[rgba(0,255,136,0.20)]' 
                        : 'bg-[#FFFFFF] text-[#64748B] hover:bg-[#F8FAFC] hover:text-[#0F172A] border-[#E2E8F0]'
                    }`}>
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
           <div className={`w-full max-w-sm rounded-3xl border p-8 text-center shadow-2xl ${
                isDarkMode 
                  ? 'border-slate-800 bg-[#0B0F19]' 
                  : 'border-[#E2E8F0] bg-[#FFFFFF]'
              }`}>
              <div className={`mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full ${
                isDarkMode 
                  ? 'bg-emerald-500/10 text-emerald-400' 
                  : 'bg-[#DCFCE7] text-[#16A34A]'
              }`}>
                <Check size={32} />
              </div>
              <h3 className={`text-xl font-bold ${
                isDarkMode ? 'text-white' : 'text-slate-900'
              }`}>Teacher Created!</h3>
              <p className={`mt-2 text-sm ${
                isDarkMode ? 'text-slate-400' : 'text-slate-500'
              }`}>Credentials for the new teacher.</p>
              
              <div className={`mt-6 space-y-4 rounded-2xl p-6 text-left ${
                isDarkMode ? 'bg-slate-900' : 'bg-slate-50'
              }`}>
                 <div>
                    <label className={`text-[10px] font-bold uppercase tracking-widest ${
                      isDarkMode ? 'text-slate-400' : 'text-slate-400'
                    }`}>Login ID</label>
                    <p className={`text-lg font-bold ${
                      isDarkMode ? 'text-white' : 'text-slate-900'
                    }`}>{createdCreds.loginId}</p>
                 </div>
                 <div>
                    <label className={`text-[10px] font-bold uppercase tracking-widest ${
                      isDarkMode ? 'text-slate-400' : 'text-slate-400'
                    }`}>Password</label>
                    <p className={`text-lg font-bold ${
                      isDarkMode ? 'text-white' : 'text-slate-900'
                    }`}>{createdCreds.password}</p>
                 </div>
              </div>
              
              <div className="mt-8 space-y-3">
                 <button 
                   onClick={() => copyCreds(createdCreds.loginId, createdCreds.password)}
                   className={`w-full rounded-xl py-3 text-sm font-bold transition ${
                     isDarkMode 
                       ? 'bg-gradient-to-r from-[#00FF88] to-[#22C55E] text-[#020403] shadow-lg shadow-[#00FF88]/30 hover:from-[#22C55E] hover:to-[#00FF88]' 
                       : 'bg-[#16A34A] text-[#FFFFFF] hover:bg-[#15803D]'
                   }`}
                 >
                   {copied ? 'Copied!' : 'Copy Credentials'}
                 </button>
                 <button 
                   onClick={() => setCreatedCreds(null)}
                   className={`w-full rounded-xl py-3 text-sm font-bold transition border ${
                     isDarkMode 
                       ? 'bg-[#020403] text-[#9AE6B4] hover:bg-[rgba(0,255,136,0.08)] hover:text-[#FFFFFF] border-[rgba(0,255,136,0.20)]' 
                       : 'bg-[#FFFFFF] text-[#64748B] hover:bg-[#F8FAFC] hover:text-[#0F172A] border-[#E2E8F0]'
                   }`}
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
