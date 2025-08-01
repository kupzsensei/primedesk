
import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { selectUser } from '../redux/userSlice';

const ProtectedRoute: React.FC = () => {
  const { token } = useSelector(selectUser);

  return token ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
