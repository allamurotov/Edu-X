import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { DocumentThemeLang } from './components/DocumentThemeLang';

// Public pages
import PublicLanding from './pages/Public/PublicLandingIT';
import StudentLogin from './pages/Student/StudentLogin';
import CourseDetails from './pages/Public/CourseDetails';

// Admin pages
import AdminLogin from './pages/Admin/AdminLogin';
import AdminLayout from './components/Admin/AdminLayout';
import AdminOverview from './pages/Admin/Overview';
import AdminStudents from './pages/Admin/Students';
import AdminTeachers from './pages/Admin/Teachers';
import AdminGroups from './pages/Admin/Groups';
import AdminFinance from './pages/Admin/Finance';
import AdminSchedule from './pages/Admin/Schedule';
import AdminAttendance from './pages/Admin/Attendance';
import AdminCourses from './pages/Admin/Courses';
import AdminLeads from './pages/Admin/Leads';
import AdminSettings from './pages/Admin/Settings';
import AdminShop from './pages/Admin/Shop';

import TeacherOverview from './pages/Teacher/Overview';
import TeacherGroups from './pages/Teacher/Groups';
import TeacherStudents from './pages/Teacher/Students';

function App() {
  const { isAuthenticated, role } = useSelector((state) => state.auth);
  const isAdmin = isAuthenticated && role === 'admin';
  const isTeacher = isAuthenticated && role === 'teacher';

  return (
    <Router>
      <DocumentThemeLang />
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<PublicLanding />} />
        <Route path="/student" element={<PublicLanding />} />
        <Route path="/student/login" element={<StudentLogin />} />
        <Route path="/course-details" element={<CourseDetails />} />

        {/* Admin routes */}
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* Protected admin routes */}
        <Route
          path="/admin/dashboard"
          element={isAdmin ? <AdminLayout /> : <Navigate to="/admin/login" replace />}
        >
          <Route index element={<AdminOverview />} />
          <Route path="students" element={<AdminStudents />} />
          <Route path="teachers" element={<AdminTeachers />} />
          <Route path="groups" element={<AdminGroups />} />
          <Route path="schedule" element={<AdminSchedule />} />
          <Route path="finance" element={<AdminFinance />} />
          <Route path="homework" element={<AdminOverview />} />
          <Route path="attendance" element={<AdminAttendance />} />
          <Route path="courses" element={<AdminCourses />} />
          <Route path="leads" element={<AdminLeads />} />
          <Route path="settings" element={<AdminSettings />} />
          <Route path="shop" element={<AdminShop />} />
        </Route>

        {/* Protected teacher routes */}
        <Route
          path="/teacher"
          element={isTeacher ? <AdminLayout /> : <Navigate to="/admin/login" replace />}
        >
          <Route index element={<TeacherOverview />} />
          <Route path="my-groups" element={<TeacherGroups />} />
          <Route path="my-students" element={<TeacherStudents />} />
        </Route>

        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
