import React, { ReactElement } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PrivateRoot: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const auth = useAuth();

  if (!auth || !auth.isAuthenticated) {
    console.log("here in private", auth?.isAuthenticated)
    return <Navigate to="/" />;
  }

  return <>{children}</>;
};

export default PrivateRoot;