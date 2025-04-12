import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AdminRoute: React.FC = () => {
  const { user, isAuthenticated } = useAuth();

  return isAuthenticated && user?.role === 'admin' ? <Outlet /> : <Navigate to="/" />;
};

export default AdminRoute;