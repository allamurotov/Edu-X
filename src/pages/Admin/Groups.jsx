import { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addGroup, deleteGroup, assignStudentToGroup, assignTeacherToGroup } from '../../store/eduCenterSlice';
import { COURSE_CATALOG, formatGroupName } from '../../constants/courses';
import { Badge } from '../../components/ui/Badge';
import { 
  Layers, 
  Plus, 
  Trash2, 
  Users, 
  ChevronDown, 
  ChevronUp, 
  UserPlus, 
  GraduationCap, 
  Search,
  MoreVertical,
  MoreHorizontal,
  Clock
} from 'lucide-react';
import { useT } from '../../i18n/useT';

const inputClass =
  'w-full rounded-xl border border-[rgba(0,255,136,0.20)] bg-[#020403] px-4 py-2.5 text-sm text-[#FFFFFF] outline-none transition focus:border-[#00FF88] focus:ring-4 focus:ring-[rgba(0,255,136,0.10)]';

export default function Groups() {
  const t = useT();
  const dispatch = useDispatch();
  const { groups, students, teachers } = useSelector((s) => s.eduCenter);

  const [isAdding, setIsAdding] = useState(false);
  const [courseId, setCourseId] = useState(COURSE_CATALOG[0].id);
  const [level, setLevel] = useState(1);
  const [expandedId, setExpandedId] = useState(null);

  const courseLabel = (id) => {
    const tr = t(`courses.${id}`);
    return tr === `courses.${id}` ? COURSE_CATALOG.find((c) => c.id === id)?.label ?? id : tr;
  };

  const sortedGroups = useMemo(
    () => [...groups].sort((a, b) => a.name.localeCompare(b.name)),
    [groups]
  );

  const handleCreate = (e) => {
    e.preventDefault();
    dispatch(addGroup({ courseId, level: Number(level) || 1 }));
    setIsAdding(false);
  };

  const activeStudents = useMemo(
    () => students.filter((s) => s.status === 'active'),
    [students]
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[#FFFFFF]">
            {t('groups.title')}
          </h1>
          <p className="text-sm text-[#9AE6B4]">
            Create and manage learning groups, assign teachers, and track student enrollment.
          </p>
        </div>
        
        <button 
          onClick={() => setIsAdding(true)}
          className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#00FF88] to-[#22C55E] px-5 py-2.5 text-sm font-bold text-[#020403] shadow-lg shadow-[#00FF88]/30 transition hover:from-[#22C55E] hover:to-[#00FF88]"
        >
          <Plus size={18} />
          {t('groups.newTitle')}
        </button>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {sortedGroups.map((g) => {
          const members = g.studentIds.map((id) => students.find((s) => s.id === id)).filter(Boolean);
          const teacher = teachers.find(t => t.id === g.teacherId);
          const isOpen = expandedId === g.id;

          return (
            <div key={g.id} className="flex flex-col rounded-3xl border border-[rgba(0,255,136,0.20)] bg-[#050505] shadow-sm transition-all hover:shadow-xl shadow-[#00FF88]/10">
              <div className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[rgba(0,255,136,0.1)] text-[#00FF88]">
                      <Users size={24} />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-[#FFFFFF]">{g.name}</h3>
                      <p className="text-xs font-medium text-[#9AE6B4]">{courseLabel(g.courseId)}</p>
                    </div>
                  </div>
                  <button className="text-[#9AE6B4] hover:text-[#FFFFFF]">
                    <MoreHorizontal size={20} />
                  </button>
                </div>

                <div className="mt-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs font-bold text-[#9AE6B4] uppercase tracking-widest">
                      <GraduationCap size={14} className="text-[#00FF88]" />
                      Teacher
                    </div>
                    {teacher ? (
                      <span className="text-sm font-bold text-[#FFFFFF]">{teacher.firstName} {teacher.lastName}</span>
                    ) : (
                      <button className="text-xs font-bold text-[#00FF88] hover:underline">Assign Teacher</button>
                    )}
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs font-bold text-[#9AE6B4] uppercase tracking-widest">
                      <Users size={14} className="text-[#00FF88]" />
                      Students
                    </div>
                    <span className="text-sm font-bold text-[#FFFFFF]">{members.length} / 15</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs font-bold text-[#9AE6B4] uppercase tracking-widest">
                      <Clock size={14} className="text-[#00FF88]" />
                      Schedule
                    </div>
                    <span className="text-sm font-bold text-[#FFFFFF]">Mon, Wed, Fri</span>
                  </div>
                </div>

                <div className="mt-6 flex items-center -space-x-2">
                   {members.slice(0, 5).map(m => (
                     <div key={m.id} className="h-8 w-8 rounded-full border-2 border-[#000000] bg-[#020403]" />
                   ))}
                   {members.length > 5 && (
                     <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-[#000000] bg-[#050505] text-[10px] font-bold text-[#9AE6B4]">
                       +{members.length - 5}
                     </div>
                   )}
                </div>
              </div>

              <div className="mt-auto border-t border-[rgba(0,255,136,0.20)]">
                 <button 
                   onClick={() => setExpandedId(isOpen ? null : g.id)}
                   className="flex w-full items-center justify-center gap-2 py-4 text-xs font-bold text-[#9AE6B4] hover:text-[#FFFFFF] transition"
                 >
                   {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                   {isOpen ? 'Close Members' : 'View Members'}
                 </button>
              </div>

              {isOpen && (
                <div className="border-t border-[rgba(0,255,136,0.20)] bg-[#020403] p-6">
                   <div className="flex items-center justify-between mb-4">
                      <h4 className="text-xs font-bold uppercase tracking-widest text-[#9AE6B4]">Roster</h4>
                      <button className="text-[10px] font-bold text-[#00FF88] hover:underline uppercase tracking-widest">+ Add Student</button>
                   </div>
                   <div className="space-y-3">
                      {members.map(m => (
                        <div key={m.id} className="flex items-center justify-between rounded-xl bg-[#050505] p-3 shadow-sm border border-[rgba(0,255,136,0.20)]">
                           <div className="flex items-center gap-3">
                              <div className="h-8 w-8 rounded-lg bg-[#020403] flex items-center justify-center text-[10px] font-bold text-[#9AE6B4]">
                                {m.firstName[0]}{m.lastName[0]}
                              </div>
                              <span className="text-xs font-bold text-[#FFFFFF]">{m.firstName} {m.lastName}</span>
                           </div>
                           <button className="text-[#9AE6B4] hover:text-[#FF4444]">
                             <Trash2 size={14} />
                           </button>
                        </div>
                      ))}
                      {members.length === 0 && <p className="text-center text-xs text-[#9AE6B4] py-2">No students yet.</p>}
                   </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Add Group Modal */}
      {isAdding && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
           <div className="w-full max-w-md rounded-3xl border border-[rgba(0,255,136,0.20)] bg-[#050505] p-8 shadow-2xl shadow-[#00FF88]/10">
              <h3 className="text-xl font-bold text-[#FFFFFF]">{t('groups.newTitle')}</h3>
              <p className="mt-2 text-sm text-[#9AE6B4]">Create a new student group for a specific course.</p>
              
              <form onSubmit={handleCreate} className="mt-8 space-y-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#9AE6B4]">{t('groups.course')}</label>
                  <select value={courseId} onChange={e => setCourseId(e.target.value)} className={inputClass}>
                    {COURSE_CATALOG.map(c => <option key={c.id} value={c.id}>{courseLabel(c.id)}</option>)}
                  </select>
                </div>
                
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#9AE6B4]">{t('groups.level')}</label>
                  <input type="number" min={1} value={level} onChange={e => setLevel(e.target.value)} className={inputClass} />
                </div>
                
                <div className="pt-4 flex gap-3">
                   <button type="submit" className="flex-1 rounded-xl bg-gradient-to-r from-[#00FF88] to-[#22C55E] py-3 text-sm font-bold text-[#020403] shadow-lg shadow-[#00FF88]/30 transition hover:from-[#22C55E] hover:to-[#00FF88]">
                     Create Group
                   </button>
                   <button type="button" onClick={() => setIsAdding(false)} className="flex-1 rounded-xl bg-[#020403] py-3 text-sm font-bold text-[#9AE6B4] transition hover:bg-[rgba(0,255,136,0.08)] hover:text-[#FFFFFF] border border-[rgba(0,255,136,0.20)]">
                     Cancel
                   </button>
                </div>
              </form>
           </div>
        </div>
      )}
    </div>
  );
}
