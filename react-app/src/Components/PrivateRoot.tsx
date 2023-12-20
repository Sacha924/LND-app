import React, { ReactElement } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PrivateRoot: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const auth = useAuth();

  // if (!auth || !auth.isAuthenticated) {
  //   return <Navigate to="/" />;                TEMPORARILY DISABLED FOR TESTING
  // }

  return <>{children}</>;
};

export default PrivateRoot;