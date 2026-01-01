import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import LoginPage from './pages/LoginPage';

export default function App() {
    const { isAuthenticated } = useAuth();

    return (
      <Routes>
        {/* Public routes */}
        <Route
          path="/login"
          element={
            isAuthenticated ? <Navigate to="/dashboard" /> : <LoginPage />
          }
        />

        {/* Protected routes with sidebar layout */}
        <Route path="/template-designer" element={<ProtectedRoute><Layout><TemplateDesigner /></Layout></ProtectedRoute>}/>

        
        {/* Default redirect */}
        <Route
          path="*"
          element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} />}
        />
      </Routes>
    );
}
