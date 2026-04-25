import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Login from './pages/Login';
import Layout from './components/Layout';
import { DocumentThemeLang } from './components/DocumentThemeLang';

import AdminOverview from './pages/Admin/Overview';
import AdminStudents from './pages/Admin/Students';
import AdminTeachers from './pages/Admin/Teachers';
import AdminGroups from './pages/Admin/Groups';
import AdminFinance from './pages/Admin/Finance';
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
        <Route
          path="/login"
          element={!isAuthenticated ? <Login /> : <Navigate to="/" replace />}
        />

        <Route
          path="/"
          element={isAdmin || isTeacher ? <Layout /> : <Navigate to="/login" replace />}
        >
          {isAdmin && (
            <>
              <Route index element={<AdminOverview />} />
              <Route path="students" element={<AdminStudents />} />
              <Route path="teachers" element={<AdminTeachers />} />
              <Route path="groups" element={<AdminGroups />} />
              <Route path="finance" element={<AdminFinance />} />
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

        <Route
          path="*"
          element={<Navigate to={isAuthenticated ? '/' : '/login'} replace />}
        />
      </Routes>
    </Router>
  );
}

export default App;
