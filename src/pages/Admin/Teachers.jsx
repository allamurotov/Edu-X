import { useEffect, useMemo, useState } from 'react';
import { allocateFiveDigitLogin } from '../../utils/credentials';
import { useDispatch, useSelector } from 'react-redux';
import {
  addTeacher,
  updateTeacher,
  deleteTeacher,
} from '../../store/eduCenterSlice';
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
import { UserPlus, KeyRound, Copy, Check, Pencil, Trash2 } from 'lucide-react';
import { useT } from '../../i18n/useT';

const emptyForm = {
  firstName: '',
  lastName: '',
  fatherName: '',
  phone: '',
  password: '',
};

const inputClass =
  'w-full rounded-xl border border-emerald-200/80 bg-white/80 px-4 py-2.5 font-mono text-sm text-emerald-950 outline-none transition focus:border-lime-500 focus:ring-2 focus:ring-lime-500/20 dark:border-lime-500/20 dark:bg-emerald-950/50 dark:text-lime-100';

export default function Teachers() {
  const t = useT();
  const dispatch = useDispatch();
  const { teachers, groups } = useSelector((s) => s.eduCenter);
  const [form, setForm] = useState(emptyForm);
  const [editId, setEditId] = useState(null);
  const [createdCreds, setCreatedCreds] = useState(null);
  const [copied, setCopied] = useState({ id: false, password: false });

  const sorted = useMemo(
    () => [...teachers].sort((a, b) => a.firstName.localeCompare(b.firstName)),
    [teachers]
  );

  const submit = (e) => {
    e.preventDefault();
    const _issuedLogin = allocateFiveDigitLogin(
      teachers.map((x) => x.loginNumericId)
    );
    dispatch(addTeacher({ ...form, _issuedLogin }));
    setCreatedCreds({
      loginId: _issuedLogin.loginId,
      password: form.password,
    });
    setForm(emptyForm);
  };

  const handleCopy = async (text, type) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied({ ...copied, [type]: true });
      setTimeout(() => setCopied({ ...copied, [type]: false }), 2000);
    } catch {
      // Fallback for browsers that don't support clipboard API
    }
  };

  const editTeacher = (teacher) => {
    setEditId(teacher.id);
    setForm({
      firstName: teacher.firstName,
      lastName: teacher.lastName,
      fatherName: teacher.fatherName,
      phone: teacher.phone,
    });
  };

  const saveEdit = () => {
    dispatch(updateTeacher({ id: editId, ...form }));
    setEditId(null);
    setForm(emptyForm);
  };

  const cancelEdit = () => {
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
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight text-emerald-950 dark:text-lime-50">
          {t('teachers.title')}
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-emerald-900/75 dark:text-lime-100/60">
          {t('teachers.subtitle')}
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,480px)_1fr]">
        <GlassPanel className="p-6 md:p-8">
          <div className="mb-6 flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-lime-400/20 text-emerald-800 dark:bg-lime-500/15 dark:text-lime-300">
              <UserPlus size={20} />
            </div>
            <h2 className="text-lg font-semibold text-emerald-950 dark:text-lime-50">
              {t('teachers.newTitle')}
            </h2>
          </div>
          <form onSubmit={submit} className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-xs font-medium text-emerald-900/85 dark:text-lime-200/80">
                  {t('teachers.firstName')}
                </label>
                <input
                  value={form.firstName}
                  onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                  className={inputClass}
                  required
                />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-medium text-emerald-900/85 dark:text-lime-200/80">
                  {t('teachers.lastName')}
                </label>
                <input
                  value={form.lastName}
                  onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                  className={inputClass}
                  required
                />
              </div>
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-emerald-900/85 dark:text-lime-200/80">
                {t('teachers.fatherName')}
              </label>
              <input
                value={form.fatherName}
                onChange={(e) => setForm({ ...form, fatherName: e.target.value })}
                className={inputClass}
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-emerald-900/85 dark:text-lime-200/80">
                {t('teachers.phone')}
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
                {t('teachers.password')}
              </label>
              <input
                required
                type="password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className={inputClass}
                autoComplete="new-password"
              />
              <p className="mt-1 text-[11px] text-emerald-800/55 dark:text-lime-200/45">
                {t('teachers.passwordHint')}
              </p>
            </div>
            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-900 py-3 font-mono text-sm font-semibold text-lime-100 shadow-lg shadow-emerald-900/25 transition hover:-translate-y-px hover:bg-emerald-800 sm:w-auto sm:px-8 dark:bg-lime-500 dark:text-emerald-950 dark:shadow-lime-500/20 dark:hover:bg-lime-400"
            >
              <UserPlus size={18} />
              {t('teachers.submit')}
            </button>
          </form>
        </GlassPanel>

        <GlassPanel className="p-6 md:p-8">
          <div className="mb-4 flex items-center gap-2 text-emerald-950 dark:text-lime-50">
            <KeyRound size={20} className="text-emerald-700 dark:text-lime-400" />
            <h2 className="text-lg font-semibold">{t('teachers.credsTitle')}</h2>
          </div>
          {!createdCreds && (
            <p className="text-sm text-emerald-800/65 dark:text-lime-200/55">
              {t('teachers.credsEmpty')}
            </p>
          )}
          {createdCreds && (
            <div className="space-y-3 rounded-xl border border-lime-400/40 bg-emerald-50/70 p-4 dark:border-lime-500/25 dark:bg-emerald-950/50">
              <p className="text-xs font-medium text-emerald-900 dark:text-lime-300">
                {t('teachers.loginId')}
              </p>
              <div className="flex items-center gap-2">
                <p className="font-mono text-lg font-semibold text-emerald-950 dark:text-lime-50">
                  {createdCreds.loginId}
                </p>
                <button
                  onClick={() => handleCopy(createdCreds.loginId, 'id')}
                  className="rounded-lg border border-emerald-200/80 bg-white/80 p-1.5 text-emerald-700 transition hover:bg-emerald-100 dark:border-lime-500/20 dark:bg-emerald-950/60 dark:text-lime-300 dark:hover:bg-emerald-900/70"
                >
                  {copied.id ? <Check size={14} /> : <Copy size={14} />}
                </button>
              </div>
              {createdCreds.password && (
                <>
                  <p className="mt-3 text-xs font-medium text-emerald-900 dark:text-lime-300">
                    {t('teachers.password')}
                  </p>
                  <div className="flex items-center gap-2">
                    <p className="font-mono text-lg font-semibold text-emerald-950 dark:text-lime-50">
                      {createdCreds.password}
                    </p>
                    <button
                      onClick={() => handleCopy(createdCreds.password, 'password')}
                      className="rounded-lg border border-emerald-200/80 bg-white/80 p-1.5 text-emerald-700 transition hover:bg-emerald-100 dark:border-lime-500/20 dark:bg-emerald-950/60 dark:text-lime-300 dark:hover:bg-emerald-900/70"
                    >
                      {copied.password ? <Check size={14} /> : <Copy size={14} />}
                    </button>
                  </div>
                </>
              )}
            </div>
          )}
        </GlassPanel>
      </div>

      <GlassPanel className="overflow-hidden p-0">
        <div className="border-b border-emerald-200/50 px-6 py-4 dark:border-lime-500/15">
          <h2 className="text-lg font-semibold text-emerald-950 dark:text-lime-50">
            {t('teachers.listTitle')}
          </h2>
          <p className="text-xs text-emerald-800/60 dark:text-lime-200/50">
            {sorted.length} {t('teachers.total')}
          </p>
        </div>
        {sorted.length === 0 ? (
          <div className="p-10 text-center text-sm text-emerald-800/60 dark:text-lime-200/50">
            {t('teachers.empty')}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-emerald-200/50 hover:bg-transparent dark:border-lime-500/15">
                  <TableHead>{t('teachers.colId')}</TableHead>
                  <TableHead>{t('teachers.colName')}</TableHead>
                  <TableHead>{t('teachers.colPhone')}</TableHead>
                  <TableHead>{t('teachers.colGroups')}</TableHead>
                  <TableHead>{t('teachers.colStatus')}</TableHead>
                  <TableHead>{t('teachers.colActions')}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sorted.map((teacher) => {
                  const teacherGroups = getTeacherGroups(teacher.id);
                  return (
                    <TableRow key={teacher.id} className="border-emerald-200/50 dark:border-lime-500/15">
                      <TableCell className="font-mono text-xs font-medium text-emerald-900 dark:text-lime-200">
                        {teacher.loginId}
                      </TableCell>
                      <TableCell>
                        <div className="font-medium text-emerald-950 dark:text-lime-50">
                          {teacher.firstName} {teacher.lastName}
                        </div>
                        <div className="text-xs text-emerald-800/65 dark:text-lime-200/55">
                          {teacher.phone}
                        </div>
                      </TableCell>
                      <TableCell className="text-xs text-emerald-900/80 dark:text-lime-100/70">
                        {teacher.phone || '—'}
                      </TableCell>
                      <TableCell>
                        {teacherGroups.length === 0 ? (
                          <span className="text-xs text-emerald-700/40 dark:text-lime-500/35">
                            {t('teachers.noGroups')}
                          </span>
                        ) : (
                          <div className="flex flex-wrap gap-1">
                            {teacherGroups.map((group) => (
                              <Badge key={group.id} variant="blue" className="text-xs">
                                {group.name}
                              </Badge>
                            ))}
                          </div>
                        )}
                      </TableCell>
                      <TableCell>
                        <Badge variant="primary">{t('teachers.active')}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap items-center gap-2">
                          <button
                            type="button"
                            onClick={() => editTeacher(teacher)}
                            className="inline-flex items-center gap-1 rounded-lg border border-lime-400/50 bg-emerald-50/80 px-2 py-1.5 font-mono text-xs font-medium text-emerald-900 transition hover:bg-emerald-100 dark:border-lime-500/25 dark:bg-emerald-950/60 dark:text-lime-200 dark:hover:bg-emerald-900/70"
                          >
                            <Pencil size={12} />
                            {t('teachers.edit')}
                          </button>
                          <button
                            type="button"
                            onClick={() => deleteTeacherItem(teacher.id)}
                            className="rounded-lg border border-rose-200/80 bg-rose-50 px-2 py-1.5 text-xs font-medium text-rose-700 transition hover:bg-rose-100 dark:border-rose-500/30 dark:bg-rose-950/40 dark:text-rose-300 dark:hover:bg-rose-900/40"
                          >
                            <Trash2 size={12} />
                            {t('teachers.delete')}
                          </button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        )}
      </GlassPanel>

      {editId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-full max-w-md rounded-2xl border border-emerald-200/80 bg-white/80 p-6 shadow-2xl backdrop-blur-2xl dark:border-lime-500/20 dark:bg-emerald-950/50">
            <h3 className="mb-4 text-lg font-semibold text-emerald-950 dark:text-lime-50">
              {t('teachers.editTitle')}
            </h3>
            <div className="space-y-4">
              <div>
                <label className="mb-1.5 block text-xs font-medium text-emerald-900/85 dark:text-lime-200/80">
                  {t('teachers.firstName')}
                </label>
                <input
                  value={form.firstName}
                  onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                  className={inputClass}
                  required
                />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-medium text-emerald-900/85 dark:text-lime-200/80">
                  {t('teachers.lastName')}
                </label>
                <input
                  value={form.lastName}
                  onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                  className={inputClass}
                  required
                />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-medium text-emerald-900/85 dark:text-lime-200/80">
                  {t('teachers.fatherName')}
                </label>
                <input
                  value={form.fatherName}
                  onChange={(e) => setForm({ ...form, fatherName: e.target.value })}
                  className={inputClass}
                />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-medium text-emerald-900/85 dark:text-lime-200/80">
                  {t('teachers.phone')}
                </label>
                <input
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className={inputClass}
                  placeholder="+998 …"
                />
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={saveEdit}
                  className="flex-1 rounded-xl bg-emerald-900 py-3 font-mono text-sm font-semibold text-lime-100 shadow-lg transition hover:bg-emerald-800 dark:bg-lime-500 dark:text-emerald-950 dark:hover:bg-lime-400"
                >
                  {t('teachers.save')}
                </button>
                <button
                  onClick={cancelEdit}
                  className="flex-1 rounded-lg border border-emerald-200/80 bg-white px-4 py-3 text-sm font-medium text-emerald-900 transition hover:bg-emerald-50 dark:border-lime-500/20 dark:bg-emerald-950/60 dark:text-lime-100 dark:hover:bg-emerald-900/70"
                >
                  {t('teachers.cancel')}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
