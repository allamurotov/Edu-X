import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Plus, Upload, FileText, Clock, CheckCircle, XCircle } from 'lucide-react';
import { useT } from '../../i18n/useT';

export default function TeacherHomework() {
  const t = useT();
  const dispatch = useDispatch();
  const { groups, students } = useSelector((state) => state.eduCenter);
  const { user } = useSelector((state) => state.auth);

  const [showCreateForm, setShowCreateForm] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState('');
  const [homeworkForm, setHomeworkForm] = useState({
    title: '',
    description: '',
    file: null,
    lessonTopic: '',
    lessonNumber: '',
    dueDate: '', // Will be set dynamically
  });

  // Filter groups where this teacher is assigned
  const teacherGroups = groups.filter(group => group.teacherId === user.id);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Use provided due date or auto 1 day if empty
    const finalDueDate = homeworkForm.dueDate || 
      new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    
    const homeworkData = {
      ...homeworkForm,
      dueDate: finalDueDate,
      groupId: selectedGroup
    };
    
    // TODO: Add homework to store
    console.log('Creating homework:', homeworkData);
    setHomeworkForm({
      title: '',
      description: '',
      file: null,
      lessonTopic: '',
      lessonNumber: '',
      dueDate: '', // Reset to empty for auto 1-day calculation
    });
    setShowCreateForm(false);
    setSelectedGroup('');
  };

  const inputClass = 'w-full rounded-xl border border-emerald-200/80 bg-white/80 px-4 py-2.5 font-mono text-sm text-emerald-950 outline-none transition focus:border-lime-500 focus:ring-2 focus:ring-lime-500/20 dark:border-lime-500/20 dark:bg-emerald-950/50 dark:text-lime-100';

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-emerald-950 dark:text-lime-50">
            {t('teacher.homework')}
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-emerald-900/75 dark:text-lime-100/60">
            {t('teacher.homeworkSubtitle')}
          </p>
        </div>
        <button
          onClick={() => setShowCreateForm(true)}
          className="inline-flex items-center gap-2 rounded-xl bg-emerald-900 py-3 px-6 font-mono text-sm font-semibold text-lime-100 shadow-lg transition hover:bg-emerald-800 dark:bg-lime-500 dark:text-emerald-950 dark:hover:bg-lime-400"
        >
          <Plus size={18} />
          {t('teacher.createHomework')}
        </button>
      </div>

      {showCreateForm && (
        <div className="rounded-2xl border border-emerald-200/60 bg-white/80 p-6 shadow-lg backdrop-blur-sm dark:border-lime-500/20 dark:bg-emerald-950/50">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-emerald-950 dark:text-lime-50">
              {t('teacher.newHomework')}
            </h2>
            <button
              onClick={() => setShowCreateForm(false)}
              className="rounded-lg border border-emerald-200/80 bg-white px-3 py-1.5 text-xs font-medium text-emerald-900 transition hover:bg-emerald-50 dark:border-lime-500/20 dark:bg-emerald-950/60 dark:text-lime-100 dark:hover:bg-emerald-900/70"
            >
              {t('teacher.cancel')}
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-xs font-medium text-emerald-900/85 dark:text-lime-200/80">
                  {t('teacher.selectGroup')}
                </label>
                <select
                  value={selectedGroup}
                  onChange={(e) => setSelectedGroup(e.target.value)}
                  className={inputClass}
                  required
                >
                  <option value="">{t('teacher.chooseGroup')}</option>
                  {teacherGroups.map((group) => (
                    <option key={group.id} value={group.id}>
                      {group.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-medium text-emerald-900/85 dark:text-lime-200/80">
                  {t('teacher.lessonNumber')}
                </label>
                <input
                  type="number"
                  value={homeworkForm.lessonNumber}
                  onChange={(e) => setHomeworkForm({ ...homeworkForm, lessonNumber: e.target.value })}
                  className={inputClass}
                  placeholder={t('teacher.lessonNumberPlaceholder')}
                  required
                />
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-medium text-emerald-900/85 dark:text-lime-200/80">
                {t('teacher.lessonTopic')}
              </label>
              <input
                type="text"
                value={homeworkForm.lessonTopic}
                onChange={(e) => setHomeworkForm({ ...homeworkForm, lessonTopic: e.target.value })}
                className={inputClass}
                placeholder={t('teacher.lessonTopicPlaceholder')}
                required
              />
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-medium text-emerald-900/85 dark:text-lime-200/80">
                {t('teacher.homeworkTitle')}
              </label>
              <input
                type="text"
                value={homeworkForm.title}
                onChange={(e) => setHomeworkForm({ ...homeworkForm, title: e.target.value })}
                className={inputClass}
                placeholder={t('teacher.homeworkTitlePlaceholder')}
                required
              />
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-medium text-emerald-900/85 dark:text-lime-200/80">
                {t('teacher.homeworkDescription')}
              </label>
              <textarea
                rows={3}
                value={homeworkForm.description}
                onChange={(e) => setHomeworkForm({ ...homeworkForm, description: e.target.value })}
                className={`${inputClass} resize-none`}
                placeholder={t('teacher.homeworkDescriptionPlaceholder')}
                required
              />
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-medium text-emerald-900/85 dark:text-lime-200/80">
                {t('teacher.fileUpload')}
              </label>
              <input
                type="file"
                onChange={(e) => setHomeworkForm({ ...homeworkForm, file: e.target.files[0] })}
                className={inputClass}
                accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png"
              />
              {homeworkForm.file && (
                <p className="mt-1 text-xs text-emerald-800/60 dark:text-lime-200/50">
                  {t('teacher.fileSelected')}: {homeworkForm.file.name}
                </p>
              )}
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-medium text-emerald-900/85 dark:text-lime-200/80">
                {t('teacher.dueDate')}
              </label>
              <input
                type="datetime-local"
                value={homeworkForm.dueDate}
                onChange={(e) => setHomeworkForm({ ...homeworkForm, dueDate: e.target.value })}
                className={inputClass}
                required
              />
            </div>

            <div className="flex items-center gap-3">
              <button
                type="submit"
                className="inline-flex items-center gap-2 rounded-xl bg-emerald-900 py-3 px-6 font-mono text-sm font-semibold text-lime-100 shadow-lg transition hover:bg-emerald-800 dark:bg-lime-500 dark:text-emerald-950 dark:hover:bg-lime-400"
              >
                <Upload size={18} />
                {t('teacher.publishHomework')}
              </button>
              <button
                type="button"
                onClick={() => setShowCreateForm(false)}
                className="rounded-lg border border-emerald-200/80 bg-white px-4 py-2 text-sm font-medium text-emerald-900 transition hover:bg-emerald-50 dark:border-lime-500/20 dark:bg-emerald-950/60 dark:text-lime-100 dark:hover:bg-emerald-900/70"
              >
                {t('teacher.cancel')}
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="space-y-6">
        <h2 className="text-lg font-semibold text-emerald-950 dark:text-lime-50">
          {t('teacher.homeworkList')}
        </h2>
        
        <div className="text-center py-12 text-sm text-emerald-800/60 dark:text-lime-200/50">
          <FileText size={48} className="mx-auto mb-4 text-emerald-600/30 dark:text-lime-400/30" />
          {t('teacher.noHomework')}
        </div>
      </div>
    </div>
  );
}
