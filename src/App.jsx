import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import Navbar from './components/shared/Navbar';
import Footer from './components/shared/Footer';
import AdminDashboard from './components/admin/Dashboard';
import StudentDashboard from './components/student/Dashboard';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import AdminProfile from './components/admin/profile/AdminProfile';
import StudentProfile from './components/student/profile/StudentProfile';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user } = useAuth();
  
  if (!user) {
    return <Navigate to="/login" />;
  }

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/" />;
  }

  return children;
};

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
            <Navbar />
            <main className="flex-grow">
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                
                {/* Admin Routes */}
                <Route 
                  path="/admin/*" 
                  element={
                    <ProtectedRoute allowedRoles={['admin']}>
                      <AdminDashboard />
                    </ProtectedRoute>
                  } 
                />
                
                <Route 
                  path="/admin/profile" 
                  element={
                    <ProtectedRoute allowedRoles={['admin']}>
                      <AdminProfile />
                    </ProtectedRoute>
                  } 
                />
                
                {/* Student Routes */}
                <Route 
                  path="/student/*" 
                  element={
                    <ProtectedRoute allowedRoles={['student']}>
                      <StudentDashboard />
                    </ProtectedRoute>
                  } 
                />
                
                <Route 
                  path="/student/profile" 
                  element={
                    <ProtectedRoute allowedRoles={['student']}>
                      <StudentProfile />
                    </ProtectedRoute>
                  } 
                />
                
                <Route path="/" element={<Navigate to="/login" />} />
              </Routes>
            </main>
            <Footer />
            <Toaster position="top-right" />
          </div>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;