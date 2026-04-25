import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Layers, Users, Plus, BookOpen, CheckSquare, UserCheck } from 'lucide-react';
import { Badge } from '../../components/ui/Badge';
import { GlassPanel } from '../../components/GlassPanel';
import { useT } from '../../i18n/useT';

export default function TeacherGroups() {
  const t = useT();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { groups, students, teachers } = useSelector((state) => state.eduCenter);
  const { user } = useSelector((state) => state.auth);

  // Filter groups where this teacher is assigned
  const teacherGroups = groups.filter(group => group.teacherId === user.id);

  const getGroupStudents = (groupId) => {
    return students.filter(student => student.groupId === groupId);
  };

  const getSupportTeacher = (supportTeacherId) => {
    return teachers.find(teacher => teacher.id === supportTeacherId);
  };

  const handleGroupClick = (groupId) => {
    navigate(`/my-groups/${groupId}`);
  };

  if (teacherGroups.length === 0) {
    return (
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-emerald-950 dark:text-lime-50">
            {t('nav.myGroups')}
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-emerald-900/75 dark:text-lime-100/60">
            {t('teacher.noGroupsAssigned')}
          </p>
        </div>
        <GlassPanel className="p-10 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-50/90 text-emerald-800 dark:bg-emerald-950/70 dark:text-lime-300">
            <Layers size={32} />
          </div>
          <p className="text-lg font-medium text-emerald-950 dark:text-lime-50">
            {t('teacher.noGroups')}
          </p>
          <p className="mt-2 text-sm text-emerald-800/60 dark:text-lime-200/50">
            {t('teacher.askAdminToAssign')}
          </p>
        </GlassPanel>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight text-emerald-950 dark:text-lime-50">
          {t('nav.myGroups')}
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-emerald-900/75 dark:text-lime-100/60">
          {t('teacher.myGroupsSubtitle')}
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {teacherGroups.map((group) => {
          const groupStudents = getGroupStudents(group.id);
          const supportTeacher = getSupportTeacher(group.supportTeacherId);
          
          return (
            <GlassPanel
              key={group.id}
              className="cursor-pointer transition-all hover:shadow-lg hover:-translate-y-1"
              onClick={() => handleGroupClick(group.id)}
            >
              <div className="p-6">
                <div className="mb-4 flex items-start justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50/90 text-emerald-800 shadow-sm ring-1 ring-lime-400/30 dark:bg-emerald-950/70 dark:text-lime-300 dark:ring-lime-500/20">
                    <Layers size={24} />
                  </div>
                  <Badge variant="blue" className="text-xs">
                    {groupStudents.length} {t('teacher.students')}
                  </Badge>
                </div>
                
                <h3 className="mb-2 text-xl font-semibold text-emerald-950 dark:text-lime-50">
                  {group.name}
                </h3>
                
                <div className="mb-4 space-y-2">
                  <div className="flex items-center gap-2 text-sm text-emerald-900/75 dark:text-lime-200/60">
                    <Users size={16} />
                    <span>{groupStudents.length} {t('teacher.students')}</span>
                  </div>
                  
                  {supportTeacher && (
                    <div className="flex items-center gap-2 text-sm text-emerald-900/75 dark:text-lime-200/60">
                      <UserCheck size={16} />
                      <span>{t('teacher.supportTeacher')}: {supportTeacher.firstName} {supportTeacher.lastName}</span>
                    </div>
                  )}
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/my-groups/${groupId}?tab=homework`);
                    }}
                    className="flex-1 rounded-lg border border-emerald-200/80 bg-emerald-50/80 px-3 py-2 text-xs font-medium text-emerald-900 transition hover:bg-emerald-100 dark:border-lime-500/20 dark:bg-emerald-950/60 dark:text-lime-200 dark:hover:bg-emerald-900/70"
                  >
                    <BookOpen size={14} className="inline mr-1" />
                    {t('teacher.homework')}
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/my-groups/${groupId}?tab=attendance`);
                    }}
                    className="flex-1 rounded-lg border border-emerald-200/80 bg-emerald-50/80 px-3 py-2 text-xs font-medium text-emerald-900 transition hover:bg-emerald-100 dark:border-lime-500/20 dark:bg-emerald-950/60 dark:text-lime-200 dark:hover:bg-emerald-900/70"
                  >
                    <CheckSquare size={14} className="inline mr-1" />
                    {t('teacher.attendance')}
                  </button>
                </div>
              </div>
            </GlassPanel>
          );
        })}
      </div>
    </div>
  );
}
