import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../utils/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useContext(AuthContext);

  // Если пользователь не авторизован, перенаправляем на главную страницу
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  // Если пользователь авторизован, отображаем дочерние компоненты
  return children;
};

export default ProtectedRoute;
