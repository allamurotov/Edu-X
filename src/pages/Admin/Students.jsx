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
import { GlassPanel } from '../../components/GlassPanel';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../components/ui/Table';
import { Badge } from '../../components/ui/Badge';
import { filterStudentsByQuery } from '../../utils/studentSearch';
import { UserPlus, KeyRound, Copy, Check, Pencil } from 'lucide-react';
import { useT } from '../../i18n/useT';

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
  'w-full rounded-xl border border-emerald-200/80 bg-white/80 px-4 py-2.5 font-mono text-sm text-emerald-950 outline-none transition focus:border-lime-500 focus:ring-2 focus:ring-lime-500/20 dark:border-lime-500/20 dark:bg-emerald-950/50 dark:text-lime-100 dark:focus:border-lime-400 dark:focus:ring-lime-400/25';

function XpMiniBar({ xp, goal }) {
  const x = Math.max(0, Number(xp) || 0);
  const g = Math.max(1, Number(goal) || 750);
  const pct = Math.min(100, (x / g) * 100);
  return (
    <div className="min-w-[88px] max-w-[120px]">
      <div className="mb-0.5 font-mono text-[10px] text-emerald-800/80 dark:text-lime-200/70">
        {x} / {g}
      </div>
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-emerald-200/50 dark:bg-emerald-900/60">
        <div
          className="h-full rounded-full bg-lime-500 transition-all dark:bg-lime-400"
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
    () => filterStudentsByQuery(students, search),
    [students, search]
  );

  const sortedGroups = useMemo(
    () => [...groups].sort((a, b) => a.name.localeCompare(b.name)),
    [groups]
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
  };

  const copyCreds = async (loginId, password) => {
    const text = password
      ? `${t('students.copyLineId')}: ${loginId}\n${t('students.copyLinePw')}: ${password}`
      : `${t('students.copyLineId')}: ${loginId}`;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* ignore */
    }
  };

  const saveGamify = () => {
    if (!editId) return;
    dispatch(
      updateStudent({
        id: editId,
        kumush: Math.max(0, Math.floor(Number(gf.kumush)) || 0),
        xp: Math.max(0, Math.floor(Number(gf.xp)) || 0),
        xpGoal: Math.max(1, Math.floor(Number(gf.xpGoal)) || 750),
        level: Math.max(1, Math.floor(Number(gf.level)) || 1),
        rank: Math.max(0, Math.floor(Number(gf.rank)) || 0),
      })
    );
    setEditId(null);
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight text-emerald-950 dark:text-lime-50">
          {t('students.title')}
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-emerald-900/75 dark:text-lime-100/60">{t('students.subtitle')}</p>
      </div>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]">
        <GlassPanel className="p-6 md:p-8">
          <div className="mb-6 flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-lime-400/20 text-emerald-800 dark:bg-lime-500/15 dark:text-lime-300">
              <UserPlus size={20} />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-emerald-950 dark:text-lime-50">{t('students.newTitle')}</h2>
              <p className="text-xs text-emerald-800/65 dark:text-lime-200/55">{t('students.newHint')}</p>
            </div>
          </div>

          <form onSubmit={handleAdd} className="grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2 grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-xs font-medium text-emerald-900/85 dark:text-lime-200/80">
                  {t('students.firstName')}
                </label>
                <input
                  required
                  value={form.firstName}
                  onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                  className={inputClass}
                />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-medium text-emerald-900/85 dark:text-lime-200/80">
                  {t('students.lastName')}
                </label>
                <input
                  required
                  value={form.lastName}
                  onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                  className={inputClass}
                />
              </div>
            </div>
            <div className="sm:col-span-2">
              <label className="mb-1.5 block text-xs font-medium text-emerald-900/85 dark:text-lime-200/80">
                {t('students.fatherName')}
              </label>
              <input
                value={form.fatherName}
                onChange={(e) => setForm({ ...form, fatherName: e.target.value })}
                className={inputClass}
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-emerald-900/85 dark:text-lime-200/80">
                {t('students.phone')}
              </label>
              <input
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className={inputClass}
                placeholder="+998 …"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-emerald-900/85 dark:text-lime-200/80">
                {t('students.parentPhone')}
              </label>
              <input
                value={form.parentPhone}
                onChange={(e) => setForm({ ...form, parentPhone: e.target.value })}
                className={inputClass}
                placeholder="+998 …"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="mb-1.5 block text-xs font-medium text-emerald-900/85 dark:text-lime-200/80">
                {t('students.password')}
              </label>
              <input
                required
                type="password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className={inputClass}
                autoComplete="new-password"
              />
              <p className="mt-1 text-[11px] text-emerald-800/55 dark:text-lime-200/45">{t('students.passwordHint')}</p>
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-emerald-900/85 dark:text-lime-200/80">
                {t('students.course')}
              </label>
              <select
                value={form.selectedCourse}
                onChange={(e) => setForm({ ...form, selectedCourse: e.target.value })}
                className={inputClass}
              >
                {COURSE_CATALOG.map((c) => (
                  <option key={c.id} value={c.id}>
                    {courseLabel(c.id)}
                  </option>
                ))}
              </select>
            </div>
            <div className="sm:col-span-2">
              <label className="mb-1.5 block text-xs font-medium text-emerald-900/85 dark:text-lime-200/80">
                {t('students.prevEdu')}
              </label>
              <textarea
                rows={2}
                value={form.previousEducation}
                onChange={(e) => setForm({ ...form, previousEducation: e.target.value })}
                className={`${inputClass} resize-none`}
                placeholder={t('students.prevEduPh')}
              />
            </div>
            <div className="sm:col-span-2">
              <button
                type="submit"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-900 py-3 font-mono text-sm font-semibold text-lime-100 shadow-lg shadow-emerald-900/25 transition hover:-translate-y-px hover:bg-emerald-800 sm:w-auto sm:px-8 dark:bg-lime-500 dark:text-emerald-950 dark:shadow-lime-500/20 dark:hover:bg-lime-400"
              >
                <UserPlus size={18} />
                {t('students.submit')}
              </button>
            </div>
          </form>
        </GlassPanel>

        <GlassPanel className="p-6 md:p-8">
          <div className="mb-4 flex items-center gap-2 text-emerald-950 dark:text-lime-50">
            <KeyRound size={20} className="text-emerald-700 dark:text-lime-400" />
            <h2 className="text-lg font-semibold">{t('students.credsTitle')}</h2>
          </div>
          {!createdCreds && (
            <p className="text-sm text-emerald-800/65 dark:text-lime-200/55">{t('students.credsEmpty')}</p>
          )}
          {createdCreds && (
            <div className="space-y-3 rounded-xl border border-lime-400/40 bg-emerald-50/70 p-4 dark:border-lime-500/25 dark:bg-emerald-950/50">
              <p className="text-xs font-medium text-emerald-900 dark:text-lime-300">{t('students.loginId')}</p>
              <p className="font-mono text-lg font-semibold text-emerald-950 dark:text-lime-50">
                {createdCreds.loginId}
              </p>
              {createdCreds.password && (
                <>
                  <p className="text-xs font-medium text-emerald-900 dark:text-lime-300">{t('students.tempPassword')}</p>
                  <p className="font-mono text-lg font-semibold text-emerald-950 dark:text-lime-50">
                    {createdCreds.password}
                  </p>
                </>
              )}
              {createdCreds.password && (
                <button
                  type="button"
                  onClick={() => copyCreds(createdCreds.loginId, createdCreds.password)}
                  className="inline-flex items-center gap-2 rounded-lg border border-lime-400/50 bg-white px-3 py-2 font-mono text-xs font-semibold text-emerald-900 transition hover:bg-emerald-50 dark:border-lime-500/30 dark:bg-emerald-900/60 dark:text-lime-200 dark:hover:bg-emerald-800/60"
                >
                  {copied ? <Check size={14} /> : <Copy size={14} />}
                  {copied ? t('students.copied') : t('students.copy')}
                </button>
              )}
            </div>
          )}
        </GlassPanel>
      </div>

      <GlassPanel className="overflow-hidden p-0">
        <div className="border-b border-emerald-200/50 px-6 py-4 dark:border-lime-500/15">
          <h2 className="text-lg font-semibold text-emerald-950 dark:text-lime-50">{t('students.listTitle')}</h2>
          <p className="text-xs text-emerald-800/60 dark:text-lime-200/50">
            {t('students.listCount', { shown: filtered.length, total: students.length })}
          </p>
        </div>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-emerald-200/50 hover:bg-transparent dark:border-lime-500/15">
                <TableHead>{t('students.colId')}</TableHead>
                <TableHead>{t('students.colName')}</TableHead>
                <TableHead>{t('students.colCourse')}</TableHead>
                <TableHead>{t('students.colGroup')}</TableHead>
                <TableHead>{t('students.colKumush')}</TableHead>
                <TableHead>{t('students.colXp')}</TableHead>
                <TableHead>{t('students.colLevel')}</TableHead>
                <TableHead>{t('students.colRank')}</TableHead>
                <TableHead>{t('students.colStatus')}</TableHead>
                <TableHead className="min-w-[220px]">{t('students.colActions')}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.length === 0 && (
                <TableRow>
                  <TableCell
                    colSpan={10}
                    className="py-12 text-center text-sm text-emerald-800/60 dark:text-lime-200/50"
                  >
                    {t('students.emptyTable')}
                  </TableCell>
                </TableRow>
              )}
              {filtered.map((s) => {
                const g = s.groupId ? groups.find((x) => x.id === s.groupId) : null;
                const ku = s.kumush ?? 0;
                const xp = s.xp ?? 0;
                const goal = s.xpGoal ?? 750;
                const lv = s.level ?? 1;
                const rk = s.rank ?? 0;
                return (
                  <TableRow key={s.id} className="border-emerald-200/50 dark:border-lime-500/15">
                    <TableCell className="font-mono text-xs font-medium text-emerald-900 dark:text-lime-200">
                      {s.loginId}
                    </TableCell>
                    <TableCell>
                      <div className="font-medium text-emerald-950 dark:text-lime-50">
                        {s.firstName} {s.lastName}
                      </div>
                      <div className="text-xs text-emerald-800/65 dark:text-lime-200/55">{s.phone}</div>
                    </TableCell>
                    <TableCell className="text-xs text-emerald-900/80 dark:text-lime-100/70">
                      {courseLabel(s.selectedCourse)}
                    </TableCell>
                    <TableCell>
                      {s.status === 'finished' ? (
                        <span className="text-xs text-emerald-700/40 dark:text-lime-500/35">{t('students.dash')}</span>
                      ) : g ? (
                        <Badge variant="blue">{g.name}</Badge>
                      ) : (
                        <Badge variant="yellow">{t('students.unassigned')}</Badge>
                      )}
                    </TableCell>
                    <TableCell className="font-mono text-sm font-semibold text-lime-700 dark:text-lime-300">
                      {ku}
                    </TableCell>
                    <TableCell>
                      <XpMiniBar xp={xp} goal={goal} />
                    </TableCell>
                    <TableCell className="font-mono text-sm text-emerald-950 dark:text-lime-50">{lv}</TableCell>
                    <TableCell className="text-xs text-amber-800/90 dark:text-amber-200/90">
                      {t('students.rankFmt', { rank: rk })}
                    </TableCell>
                    <TableCell>
                      {s.status === 'finished' ? (
                        <Badge variant="green">{t('students.finished')}</Badge>
                      ) : (
                        <Badge variant="primary">{t('students.active')}</Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap items-center gap-2">
                        <button
                          type="button"
                          onClick={() => setEditId(s.id)}
                          className="inline-flex items-center gap-1 rounded-lg border border-lime-400/50 bg-emerald-50/80 px-2 py-1.5 font-mono text-xs font-medium text-emerald-900 transition hover:bg-emerald-100 dark:border-lime-500/25 dark:bg-emerald-950/60 dark:text-lime-200 dark:hover:bg-emerald-900/70"
                        >
                          <Pencil size={12} />
                          {t('students.editGame')}
                        </button>
                        {s.status === 'active' && (
                          <select
                            value={s.groupId ?? ''}
                            onChange={(e) => {
                              const gid = e.target.value;
                              if (!gid) return;
                              dispatch(assignStudentToGroup({ studentId: s.id, groupId: gid }));
                            }}
                            className="max-w-[140px] rounded-lg border border-emerald-200/80 bg-white/90 px-2 py-1.5 font-mono text-xs text-emerald-950 outline-none focus:ring-2 focus:ring-lime-500/25 dark:border-lime-500/20 dark:bg-emerald-950/70 dark:text-lime-100"
                          >
                            <option value="">{t('students.selectGroup')}</option>
                            {sortedGroups.map((gr) => (
                              <option key={gr.id} value={gr.id}>
                                {gr.name}
                              </option>
                            ))}
                          </select>
                        )}
                        {s.status === 'active' ? (
                          <button
                            type="button"
                            onClick={() => dispatch(markStudentFinished(s.id))}
                            className="rounded-lg border border-emerald-200/80 bg-white px-2 py-1.5 text-xs font-medium text-emerald-900 transition hover:bg-emerald-50 dark:border-lime-500/20 dark:bg-emerald-950/60 dark:text-lime-100 dark:hover:bg-emerald-900/70"
                          >
                            {t('students.finish')}
                          </button>
                        ) : (
                          <button
                            type="button"
                            onClick={() => dispatch(reactivateStudent(s.id))}
                            className="rounded-lg border border-emerald-200 bg-emerald-50 px-2 py-1.5 text-xs font-medium text-emerald-800 transition hover:bg-emerald-100 dark:border-emerald-700/50 dark:bg-emerald-950/40 dark:text-emerald-200 dark:hover:bg-emerald-900/40"
                          >
                            {t('students.reactivate')}
                          </button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </GlassPanel>

      {editId && editStudent && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-emerald-950/50 p-4 backdrop-blur-sm dark:bg-black/60">
          <GlassPanel className="relative max-h-[90vh] w-full max-w-md overflow-y-auto p-6">
            <h3 className="text-lg font-semibold text-emerald-950 dark:text-lime-50">{t('students.editTitle')}</h3>
            <p className="mt-1 font-mono text-sm text-emerald-800/80 dark:text-lime-200/70">
              {editStudent.firstName} {editStudent.lastName} · {editStudent.loginId}
            </p>
            <div className="mt-4 grid gap-3">
              <div>
                <label className="mb-1 block text-xs font-medium text-emerald-900/85 dark:text-lime-200/80">
                  {t('students.colKumush')}
                </label>
                <input
                  type="number"
                  min={0}
                  value={gf.kumush}
                  onChange={(e) => setGf({ ...gf, kumush: e.target.value })}
                  className={inputClass}
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-emerald-900/85 dark:text-lime-200/80">
                  {t('students.colXp')}
                </label>
                <input
                  type="number"
                  min={0}
                  value={gf.xp}
                  onChange={(e) => setGf({ ...gf, xp: e.target.value })}
                  className={inputClass}
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-emerald-900/85 dark:text-lime-200/80">
                  {t('students.xpGoalLabel')}
                </label>
                <input
                  type="number"
                  min={1}
                  value={gf.xpGoal}
                  onChange={(e) => setGf({ ...gf, xpGoal: e.target.value })}
                  className={inputClass}
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-emerald-900/85 dark:text-lime-200/80">
                  {t('students.colLevel')}
                </label>
                <input
                  type="number"
                  min={1}
                  value={gf.level}
                  onChange={(e) => setGf({ ...gf, level: e.target.value })}
                  className={inputClass}
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-emerald-900/85 dark:text-lime-200/80">
                  {t('students.colRank')}
                </label>
                <input
                  type="number"
                  min={0}
                  value={gf.rank}
                  onChange={(e) => setGf({ ...gf, rank: e.target.value })}
                  className={inputClass}
                />
              </div>
            </div>
            <div className="mt-6 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={saveGamify}
                className="rounded-xl bg-emerald-900 px-5 py-2.5 font-mono text-sm font-semibold text-lime-100 dark:bg-lime-500 dark:text-emerald-950"
              >
                {t('students.save')}
              </button>
              <button
                type="button"
                onClick={() => setEditId(null)}
                className="rounded-xl border border-emerald-200/80 px-5 py-2.5 text-sm text-emerald-900 dark:border-lime-500/25 dark:text-lime-200"
              >
                {t('students.cancel')}
              </button>
            </div>
          </GlassPanel>
        </div>
      )}
    </div>
  );
}
