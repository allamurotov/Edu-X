import { useSelector } from 'react-redux';
import { BookOpen, Users, CheckSquare, Calendar } from 'lucide-react';
import { useT } from '../../i18n/useT';

export default function TeacherOverview() {
  const t = useT();
  const { groups, students } = useSelector((state) => state.eduCenter);
  const { user } = useSelector((state) => state.auth);

  // Filter groups where this teacher is assigned
  const teacherGroups = groups.filter(group => group.teacherId === user.id);
  
  // Count students in teacher's groups
  const teacherStudents = students.filter(student => 
    student.groupId && teacherGroups.some(group => group.id === student.groupId)
  );

  const stats = [
    {
      title: t('teacher.myGroups'),
      value: teacherGroups.length,
      subtitle: t('teacher.assignedGroups'),
      icon: Users,
      color: 'emerald',
    },
    {
      title: t('teacher.myStudents'),
      value: teacherStudents.length,
      subtitle: t('teacher.totalStudents'),
      icon: BookOpen,
      color: 'blue',
    },
    {
      title: t('teacher.homeworkCount'),
      value: '0',
      subtitle: t('teacher.pendingHomework'),
      icon: CheckSquare,
      color: 'purple',
    },
    {
      title: t('teacher.attendanceRate'),
      value: '0%',
      subtitle: t('teacher.thisMonth'),
      icon: Calendar,
      color: 'orange',
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight text-emerald-950 dark:text-lime-50">
          {t('teacher.dashboard')}
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-emerald-900/75 dark:text-lime-100/60">
          {t('teacher.dashboardSubtitle')}
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          const colorClasses = {
            emerald: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-200',
            blue: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-200',
            purple: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-200',
            orange: 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-200',
          };

          return (
            <div
              key={stat.title}
              className="rounded-2xl border border-emerald-200/60 bg-white/80 p-6 shadow-lg backdrop-blur-sm dark:border-lime-500/20 dark:bg-emerald-950/50"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-sm font-medium text-emerald-600 dark:text-lime-400">
                    {stat.title}
                  </p>
                  <p className="mt-2 text-3xl font-bold text-emerald-950 dark:text-lime-50">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-xs text-emerald-700/60 dark:text-lime-300/60">
                    {stat.subtitle}
                  </p>
                </div>
                <div className={`rounded-xl p-3 ${colorClasses[stat.color]}`}>
                  <Icon size={20} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-emerald-200/60 bg-white/80 p-6 shadow-lg backdrop-blur-sm dark:border-lime-500/20 dark:bg-emerald-950/50">
          <h2 className="mb-4 text-lg font-semibold text-emerald-950 dark:text-lime-50">
            {t('teacher.myGroups')}
          </h2>
          {teacherGroups.length === 0 ? (
            <p className="text-sm text-emerald-800/60 dark:text-lime-200/50">
              {t('teacher.noGroups')}
            </p>
          ) : (
            <div className="space-y-3">
              {teacherGroups.map((group) => (
                <div
                  key={group.id}
                  className="rounded-xl border border-emerald-200/50 bg-emerald-50/50 p-4 dark:border-lime-500/15 dark:bg-emerald-950/40"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-emerald-950 dark:text-lime-50">
                        {group.name}
                      </h3>
                      <p className="text-sm text-emerald-700/60 dark:text-lime-300/60">
                        {group.course}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-mono text-sm text-emerald-800 dark:text-lime-200">
                        {students.filter(s => s.groupId === group.id).length} {t('teacher.students')}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="rounded-2xl border border-emerald-200/60 bg-white/80 p-6 shadow-lg backdrop-blur-sm dark:border-lime-500/20 dark:bg-emerald-950/50">
          <h2 className="mb-4 text-lg font-semibold text-emerald-950 dark:text-lime-50">
            {t('teacher.recentActivity')}
          </h2>
          <p className="text-sm text-emerald-800/60 dark:text-lime-200/50">
            {t('teacher.noActivity')}
          </p>
        </div>
      </div>
    </div>
  );
}
