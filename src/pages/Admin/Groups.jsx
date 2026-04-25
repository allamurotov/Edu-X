import { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addGroup, deleteGroup, assignStudentToGroup, assignTeacherToGroup } from '../../store/eduCenterSlice';
import { COURSE_CATALOG, formatGroupName } from '../../constants/courses';
import { GlassPanel } from '../../components/GlassPanel';
import { Badge } from '../../components/ui/Badge';
import { Layers, Plus, Trash2, Users } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../components/ui/Table';
import { useT } from '../../i18n/useT';

const inputClass =
  'w-full rounded-xl border border-emerald-200/80 bg-white/80 px-4 py-2.5 font-mono text-sm text-emerald-950 outline-none focus:ring-2 focus:ring-lime-500/25 dark:border-lime-500/20 dark:bg-emerald-950/50 dark:text-lime-100';

export default function Groups() {
  const t = useT();
  const dispatch = useDispatch();
  const { groups, students, teachers } = useSelector((s) => s.eduCenter);

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
  };

  const activeStudents = useMemo(
    () => students.filter((s) => s.status === 'active'),
    [students]
  );

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight text-emerald-950 dark:text-lime-50">
          {t('groups.title')}
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-emerald-900/75 dark:text-lime-100/60">{t('groups.subtitle')}</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,380px)_1fr]">
        <GlassPanel className="p-6 md:p-8">
          <div className="mb-6 flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-lime-400/20 text-emerald-800 dark:bg-lime-500/15 dark:text-lime-300">
              <Plus size={20} />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-emerald-950 dark:text-lime-50">{t('groups.newTitle')}</h2>
              <p className="font-mono text-xs text-emerald-800/65 dark:text-lime-200/55">
                {formatGroupName(courseId, Number(level) || 1)}
              </p>
            </div>
          </div>
          <form onSubmit={handleCreate} className="space-y-4">
            <div>
              <label className="mb-1.5 block text-xs font-medium text-emerald-900/85 dark:text-lime-200/80">
                {t('groups.course')}
              </label>
              <select
                value={courseId}
                onChange={(e) => setCourseId(e.target.value)}
                className={inputClass}
              >
                {COURSE_CATALOG.map((c) => (
                  <option key={c.id} value={c.id}>
                    {courseLabel(c.id)}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-emerald-900/85 dark:text-lime-200/80">
                {t('groups.level')}
              </label>
              <input
                type="number"
                min={1}
                max={99}
                value={level}
                onChange={(e) => setLevel(e.target.value)}
                className={inputClass}
              />
              <p className="mt-1 text-[11px] text-emerald-800/60 dark:text-lime-200/50">{t('groups.levelHint')}</p>
            </div>
            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-900 py-3 font-mono text-sm font-semibold text-lime-100 shadow-lg transition hover:-translate-y-px hover:bg-emerald-800 dark:bg-lime-500 dark:text-emerald-950 dark:hover:bg-lime-400"
            >
              <Layers size={18} />
              {t('groups.create')}
            </button>
          </form>
        </GlassPanel>

        <div className="space-y-4">
          {sortedGroups.length === 0 && (
            <GlassPanel className="p-10 text-center text-sm text-emerald-800/60 dark:text-lime-200/50">
              {t('groups.empty')}
            </GlassPanel>
          )}
          {sortedGroups.map((g) => {
            const members = g.studentIds
              .map((id) => students.find((s) => s.id === id))
              .filter(Boolean);
            const open = expandedId === g.id;
            return (
              <GlassPanel key={g.id} className="overflow-hidden p-0 transition hover:shadow-lg">
                <button
                  type="button"
                  onClick={() => setExpandedId(open ? null : g.id)}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition hover:bg-emerald-50/50 dark:hover:bg-emerald-950/30"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50/90 text-emerald-800 shadow-sm ring-1 ring-lime-400/30 dark:bg-emerald-950/70 dark:text-lime-300 dark:ring-lime-500/20">
                      <Users size={20} />
                    </div>
                    <div>
                      <p className="font-semibold text-emerald-950 dark:text-lime-50">{g.name}</p>
                      <p className="text-xs text-emerald-800/65 dark:text-lime-200/55">
                        {t('groups.studentsCount', { n: members.length })}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="blue">{members.length}</Badge>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        if (window.confirm(t('groups.confirmDelete'))) {
                          dispatch(deleteGroup(g.id));
                          if (expandedId === g.id) setExpandedId(null);
                        }
                      }}
                      className="rounded-lg p-2 text-slate-400 transition hover:bg-rose-50 hover:text-rose-600 dark:hover:bg-rose-950/40 dark:hover:text-rose-400"
                      title={t('groups.deleteTitle')}
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </button>

                {open && (
                  <div className="border-t border-emerald-200/50 px-6 py-4 dark:border-lime-500/15">
                    <div className="mb-3 flex flex-wrap items-center gap-2">
                      <span className="text-xs font-medium text-emerald-900/75 dark:text-lime-200/70">
                        {t('groups.addTeacher')}
                      </span>
                      <select
                        className="max-w-xs rounded-lg border border-emerald-200/80 bg-white/90 px-3 py-2 font-mono text-xs text-emerald-950 outline-none focus:ring-2 focus:ring-lime-500/25 dark:border-lime-500/20 dark:bg-emerald-950/80 dark:text-lime-100"
                        value={g.teacherId || ''}
                        onChange={(e) => {
                          const teacherId = e.target.value || null;
                          dispatch(assignTeacherToGroup({ groupId: g.id, teacherId }));
                        }}
                      >
                        <option value="">{t('groups.selectTeacher')}</option>
                        {teachers.map((teacher) => (
                          <option key={teacher.id} value={teacher.id}>
                            {teacher.firstName} {teacher.lastName} · {teacher.loginId}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="mb-3 flex flex-wrap items-center gap-2">
                      <span className="text-xs font-medium text-emerald-900/75 dark:text-lime-200/70">
                        {t('groups.addToGroup')}
                      </span>
                      <select
                        className="max-w-xs rounded-lg border border-emerald-200/80 bg-white/90 px-3 py-2 font-mono text-xs text-emerald-950 outline-none focus:ring-2 focus:ring-lime-500/25 dark:border-lime-500/20 dark:bg-emerald-950/80 dark:text-lime-100"
                        defaultValue=""
                        onChange={(e) => {
                          const sid = e.target.value;
                          if (!sid) return;
                          dispatch(assignStudentToGroup({ studentId: sid, groupId: g.id }));
                          e.target.value = '';
                        }}
                      >
                        <option value="">{t('groups.pickStudent')}</option>
                        {activeStudents
                          .filter((s) => s.groupId !== g.id)
                          .map((s) => (
                            <option key={s.id} value={s.id}>
                              {s.firstName} {s.lastName} · {s.loginId}
                            </option>
                          ))}
                      </select>
                    </div>
                    {members.length === 0 ? (
                      <p className="text-sm text-emerald-800/60 dark:text-lime-200/50">{t('groups.groupEmpty')}</p>
                    ) : (
                      <div className="overflow-x-auto rounded-xl border border-emerald-200/50 dark:border-lime-500/15">
                        <Table>
                          <TableHeader>
                            <TableRow className="border-emerald-200/50 hover:bg-transparent dark:border-lime-500/15">
                              <TableHead>{t('groups.colId')}</TableHead>
                              <TableHead>{t('groups.colName')}</TableHead>
                              <TableHead>{t('groups.colPhone')}</TableHead>
                              <TableHead>{t('groups.colStatus')}</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {members.map((s) => (
                              <TableRow key={s.id} className="border-emerald-200/50 dark:border-lime-500/15">
                                <TableCell className="font-mono text-xs text-emerald-900 dark:text-lime-200">
                                  {s.loginId}
                                </TableCell>
                                <TableCell className="font-medium text-emerald-950 dark:text-lime-50">
                                  {s.firstName} {s.lastName}
                                </TableCell>
                                <TableCell className="text-xs text-emerald-800/70 dark:text-lime-200/55">
                                  {s.phone || t('students.dash')}
                                </TableCell>
                                <TableCell>
                                  <Badge variant="primary">{t('students.active')}</Badge>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                    )}
                  </div>
                )}
              </GlassPanel>
            );
          })}
        </div>
      </div>
    </div>
  );
}
