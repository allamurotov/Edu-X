import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Login from './pages/Login';
import Layout from './components/Layout';
import Landing from './pages/Landing';
import { DocumentThemeLang } from './components/DocumentThemeLang';

import AdminOverview from './pages/Admin/Overview';
import AdminStudents from './pages/Admin/Students';
import AdminTeachers from './pages/Admin/Teachers';
import AdminGroups from './pages/Admin/Groups';
import AdminFinance from './pages/Admin/Finance';
import AdminShop from './pages/Admin/Shop';
import AdminSchedule from './pages/Admin/Schedule';
import AdminAttendance from './pages/Admin/Attendance';
import AdminCourses from './pages/Admin/Courses';
import AdminLeads from './pages/Admin/Leads';
import AdminSettings from './pages/Admin/Settings';

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
        {/* Public landing page */}
        <Route path="/landing" element={<Landing />} />

        {/* Login */}
        <Route
          path="/login"
          element={!isAuthenticated ? <Login /> : <Navigate to="/" replace />}
        />

        {/* Admin / Teacher dashboard */}
        <Route
          path="/"
          element={isAdmin || isTeacher ? <Layout /> : <Navigate to="/landing" replace />}
        >
          {isAdmin && (
            <>
              <Route index element={<AdminOverview />} />
              <Route path="students" element={<AdminStudents />} />
              <Route path="teachers" element={<AdminTeachers />} />
              <Route path="groups" element={<AdminGroups />} />
              <Route path="schedule" element={<AdminSchedule />} />
              <Route path="finance" element={<AdminFinance />} />
              <Route path="attendance" element={<AdminAttendance />} />
              <Route path="courses" element={<AdminCourses />} />
              <Route path="leads" element={<AdminLeads />} />
              <Route path="settings" element={<AdminSettings />} />
              <Route path="shop" element={<AdminShop />} />
            </>
          )}
          {isTeacher && (
            <>
              <Route index element={<TeacherOverview />} />
              <Route path="my-groups" element={<TeacherGroups />} />
              <Route path="my-students" element={<TeacherStudents />} />
            </>
          )}
        </Route>

        {/* Catch-all */}
        <Route
          path="*"
          element={<Navigate to={isAuthenticated ? '/' : '/landing'} replace />}
        />
      </Routes>
    </Router>
  );
}

export default App;
