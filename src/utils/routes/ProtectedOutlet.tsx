import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router';

import { RootState } from '../../app/redux/store';

const ProtectedOutlet = () => {
  const authState = useSelector((state: RootState) => state.auth);
  return authState.sessionContext.isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate to="/login" />
  );
};

export default ProtectedOutlet;
