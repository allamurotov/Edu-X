import { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Camera, Users, Check, X, Clock, UserCheck } from 'lucide-react';
import { useT } from '../../i18n/useT';

export default function TeacherAttendance() {
  const t = useT();
  const dispatch = useDispatch();
  const { groups, students } = useSelector((state) => state.eduCenter);
  const { user } = useSelector((state) => state.auth);
  
  const [selectedGroup, setSelectedGroup] = useState('');
  const [attendance, setAttendance] = useState({});
  const [capturedImage, setCapturedImage] = useState(null);

  // Filter groups where this teacher is assigned
  const teacherGroups = groups.filter(group => group.teacherId === user.id);
  
  // Get students in selected group
  const groupStudents = selectedGroup 
    ? students.filter(student => student.groupId === selectedGroup)
    : [];

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Save attendance to store
    console.log('Submitting attendance:', {
      groupId: selectedGroup,
      attendance: attendance
    });
    alert(t('teacher.attendanceSubmitted'));
    setAttendance({});
    setSelectedGroup('');
  };

  const handleAttendanceChange = (studentId, status) => {
    setAttendance(prev => ({
      ...prev,
      [studentId]: status
    }));
  };

  
  const getAttendanceStatus = (studentId) => {
    return attendance[studentId] || 'pending';
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'present': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200';
      case 'absent': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-200';
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight text-emerald-950 dark:text-lime-50">
          {t('teacher.attendance')}
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-emerald-900/75 dark:text-lime-100/60">
          {t('teacher.attendanceSubtitle')}
        </p>
      </div>

      <div className="rounded-2xl border border-emerald-200/60 bg-white/80 p-6 shadow-lg backdrop-blur-sm dark:border-lime-500/20 dark:bg-emerald-950/50">
        <div className="mb-6">
          <label className="mb-1.5 block text-xs font-medium text-emerald-900/85 dark:text-lime-200/80">
            {t('teacher.selectGroup')}
          </label>
          <select
            value={selectedGroup}
            onChange={(e) => setSelectedGroup(e.target.value)}
            className="w-full rounded-xl border border-emerald-200/80 bg-white/80 px-4 py-2.5 font-mono text-sm text-emerald-950 outline-none transition focus:border-lime-500 focus:ring-2 focus:ring-lime-500/20 dark:border-lime-500/20 dark:bg-emerald-950/50 dark:text-lime-100"
          >
            <option value="">{t('teacher.chooseGroup')}</option>
            {teacherGroups.map((group) => (
              <option key={group.id} value={group.id}>
                {group.name}
              </option>
            ))}
          </select>
        </div>

        {selectedGroup && (
          <>
            <div className="mb-6">
              <h3 className="mb-4 text-lg font-semibold text-emerald-950 dark:text-lime-50">
                {t('teacher.teacherVerification')}
              </h3>
              
              {!capturedImage ? (
                <div className="space-y-4">
                  {showCamera ? (
                    <div className="space-y-4">
                      <div className="relative overflow-hidden rounded-xl border border-emerald-200/60 dark:border-lime-500/20">
                        <video
                          ref={videoRef}
                          autoPlay
                          playsInline
                          className="w-full h-64 object-cover"
                        />
                      </div>
                      <div className="flex items-center gap-3">
                        <button
                          onClick={capturePhoto}
                          className="inline-flex items-center gap-2 rounded-xl bg-emerald-900 py-3 px-6 font-mono text-sm font-semibold text-lime-100 shadow-lg transition hover:bg-emerald-800 dark:bg-lime-500 dark:text-emerald-950 dark:hover:bg-lime-400"
                        >
                          <Camera size={18} />
                          {t('teacher.capturePhoto')}
                        </button>
                        <button
                          onClick={stopCamera}
                          className="rounded-lg border border-emerald-200/80 bg-white px-4 py-2 text-sm font-medium text-emerald-900 transition hover:bg-emerald-50 dark:border-lime-500/20 dark:bg-emerald-950/60 dark:text-lime-100 dark:hover:bg-emerald-900/70"
                        >
                          {t('teacher.cancel')}
                        </button>
                      </div>
                    </div>
                  ) : (
                    <button
                      onClick={startCamera}
                      className="inline-flex items-center gap-2 rounded-xl border-2 border-dashed border-emerald-300/60 bg-emerald-50/50 py-8 px-12 font-mono text-sm font-medium text-emerald-700 transition hover:bg-emerald-100 dark:border-lime-500/25 dark:bg-emerald-950/40 dark:text-lime-300 dark:hover:bg-emerald-900/60"
                    >
                      <Camera size={24} />
                      {t('teacher.startCamera')}
                    </button>
                  )}
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="relative overflow-hidden rounded-xl border border-emerald-200/60 dark:border-lime-500/20">
                    <img
                      src={capturedImage}
                      alt="Teacher verification"
                      className="w-full h-64 object-cover"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="text-green-600" size={20} />
                    <span className="text-sm font-medium text-green-800 dark:text-green-200">
                      {t('teacher.photoCaptured')}
                    </span>
                    <button
                      onClick={() => setCapturedImage(null)}
                      className="ml-auto text-sm text-emerald-600 hover:text-emerald-800 dark:text-lime-400 dark:hover:text-lime-200"
                    >
                      {t('teacher.retake')}
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className="mb-6">
              <h3 className="mb-4 text-lg font-semibold text-emerald-950 dark:text-lime-50">
                {t('teacher.markAttendance')}
              </h3>
              
              {groupStudents.length === 0 ? (
                <p className="text-sm text-emerald-800/60 dark:text-lime-200/50">
                  {t('teacher.noStudentsInGroup')}
                </p>
              ) : (
                <div className="space-y-3">
                  {groupStudents.map((student) => (
                    <div
                      key={student.id}
                      className="flex items-center justify-between rounded-xl border border-emerald-200/50 bg-emerald-50/50 p-4 dark:border-lime-500/15 dark:bg-emerald-950/40"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-200">
                          <UserCheck size={20} />
                        </div>
                        <div>
                          <p className="font-medium text-emerald-950 dark:text-lime-50">
                            {student.firstName} {student.lastName}
                          </p>
                          <p className="text-sm text-emerald-700/60 dark:text-lime-300/60">
                            ID: {student.loginId}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleAttendanceChange(student.id, 'present')}
                          className={`rounded-lg px-3 py-1.5 text-xs font-medium transition ${
                            getAttendanceStatus(student.id) === 'present'
                              ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200'
                              : 'border border-emerald-200/80 bg-white text-emerald-900 hover:bg-emerald-50 dark:border-lime-500/20 dark:bg-emerald-950/60 dark:text-lime-100 dark:hover:bg-emerald-900/70'
                          }`}
                        >
                          <Check size={14} className="inline mr-1" />
                          {t('teacher.present')}
                        </button>
                        <button
                          onClick={() => handleAttendanceChange(student.id, 'absent')}
                          className={`rounded-lg px-3 py-1.5 text-xs font-medium transition ${
                            getAttendanceStatus(student.id) === 'absent'
                              ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-200'
                              : 'border border-emerald-200/80 bg-white text-emerald-900 hover:bg-emerald-50 dark:border-lime-500/20 dark:bg-emerald-950/60 dark:text-lime-100 dark:hover:bg-emerald-900/70'
                          }`}
                        >
                          <X size={14} className="inline mr-1" />
                          {t('teacher.absent')}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="flex items-center justify-between">
              <div className="text-sm text-emerald-700/60 dark:text-lime-300/60">
                {Object.keys(attendance).filter(id => attendance[id] === 'present').length} / {groupStudents.length} {t('teacher.markedPresent')}
              </div>
              <button
                onClick={submitAttendance}
                disabled={!capturedImage || Object.keys(attendance).length === 0}
                className="inline-flex items-center gap-2 rounded-xl bg-emerald-900 py-3 px-6 font-mono text-sm font-semibold text-lime-100 shadow-lg transition hover:bg-emerald-800 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-lime-500 dark:text-emerald-950 dark:hover:bg-lime-400"
              >
                <Clock size={18} />
                {t('teacher.submitAttendance')}
              </button>
            </div>
          </>
        )}
      </div>

      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
}
