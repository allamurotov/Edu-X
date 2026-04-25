import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Users, Search, UserCheck } from 'lucide-react';
import { Badge } from '../../components/ui/Badge';
import { GlassPanel } from '../../components/GlassPanel';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../components/ui/Table';
import { useT } from '../../i18n/useT';

export default function TeacherStudents() {
  const t = useT();
  const dispatch = useDispatch();
  const { groups, students } = useSelector((state) => state.eduCenter);
  const { user } = useSelector((state) => state.auth);

  // Get all students from teacher's groups
  const teacherGroupIds = groups
    .filter(group => group.teacherId === user.id)
    .map(group => group.id);

  const teacherStudents = students.filter(student => 
    teacherGroupIds.includes(student.groupId)
  );

  const sortedStudents = useMemo(
    () => [...teacherStudents].sort((a, b) => a.firstName.localeCompare(b.firstName)),
    [teacherStudents]
  );

  const getStudentGroup = (student) => {
    return groups.find(group => group.id === student.groupId);
  };

  if (teacherStudents.length === 0) {
    return (
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-emerald-950 dark:text-lime-50">
            {t('nav.myStudents')}
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-emerald-900/75 dark:text-lime-100/60">
            {t('teacher.myStudentsSubtitle')}
          </p>
        </div>
        <GlassPanel className="p-10 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-50/90 text-emerald-800 dark:bg-emerald-950/70 dark:text-lime-300">
            <Users size={32} />
          </div>
          <p className="text-lg font-medium text-emerald-950 dark:text-lime-50">
            {t('teacher.noStudents')}
          </p>
          <p className="mt-2 text-sm text-emerald-800/60 dark:text-lime-200/50">
            {t('teacher.noStudentsInGroups')}
          </p>
        </GlassPanel>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight text-emerald-950 dark:text-lime-50">
          {t('nav.myStudents')}
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-emerald-900/75 dark:text-lime-100/60">
          {t('teacher.myStudentsSubtitle')}
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <GlassPanel className="p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50/90 text-emerald-800 dark:bg-emerald-950/70 dark:text-lime-300">
              <Users size={20} />
            </div>
            <div>
              <p className="text-2xl font-semibold text-emerald-950 dark:text-lime-50">
                {teacherStudents.length}
              </p>
              <p className="text-xs text-emerald-800/60 dark:text-lime-200/50">
                {t('teacher.totalStudents')}
              </p>
            </div>
          </div>
        </GlassPanel>
        
        <GlassPanel className="p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50/90 text-blue-800 dark:bg-blue-950/70 dark:text-blue-300">
              <UserCheck size={20} />
            </div>
            <div>
              <p className="text-2xl font-semibold text-emerald-950 dark:text-lime-50">
                {teacherGroupIds.length}
              </p>
              <p className="text-xs text-emerald-800/60 dark:text-lime-200/50">
                {t('teacher.totalGroups')}
              </p>
            </div>
          </div>
        </GlassPanel>
      </div>

      <GlassPanel className="overflow-hidden p-0">
        <div className="border-b border-emerald-200/50 px-6 py-4 dark:border-lime-500/15">
          <h2 className="text-lg font-semibold text-emerald-950 dark:text-lime-50">
            {t('teacher.studentsList')}
          </h2>
          <p className="text-xs text-emerald-800/60 dark:text-lime-200/50">
            {sortedStudents.length} {t('teacher.students')}
          </p>
        </div>
        
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-emerald-200/50 hover:bg-transparent dark:border-lime-500/15">
                <TableHead>{t('teachers.colId')}</TableHead>
                <TableHead>{t('teachers.colName')}</TableHead>
                <TableHead>{t('teachers.colPhone')}</TableHead>
                <TableHead>{t('teacher.group')}</TableHead>
                <TableHead>{t('teachers.colStatus')}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedStudents.map((student) => {
                const group = getStudentGroup(student);
                return (
                  <TableRow key={student.id} className="border-emerald-200/50 dark:border-lime-500/15">
                    <TableCell className="font-mono text-xs font-medium text-emerald-900 dark:text-lime-200">
                      {student.loginId}
                    </TableCell>
                    <TableCell>
                      <div className="font-medium text-emerald-950 dark:text-lime-50">
                        {student.firstName} {student.lastName}
                      </div>
                      <div className="text-xs text-emerald-800/65 dark:text-lime-200/55">
                        {student.fatherName}
                      </div>
                    </TableCell>
                    <TableCell className="text-xs text-emerald-900/80 dark:text-lime-100/70">
                      {student.phone || '—'}
                    </TableCell>
                    <TableCell>
                      {group ? (
                        <Badge variant="blue" className="text-xs">
                          {group.name}
                        </Badge>
                      ) : (
                        <span className="text-xs text-emerald-700/40 dark:text-lime-500/35">
                          {t('teacher.noGroup')}
                        </span>
                      )}
                    </TableCell>
                    <TableCell>
                      <Badge variant="primary">
                        {t('teachers.active')}
                      </Badge>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </GlassPanel>
    </div>
  );
}
