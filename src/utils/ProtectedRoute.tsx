// solution from: https://github.com/openscript/react-router-private-protected-routes/blob/react-router-6/src/components/ProtectedRoute.tsx
import React, { useEffect } from 'react';
import { Outlet, RouteProps, useLocation } from 'react-router';
import { Navigate } from 'react-router-dom';

export type ProtectedRouteProps = {
  isAuthenticated: boolean;
  authenticationPath: string;
  redirectPath: string;
  setRedirectPath: (path: string) => void;
} & RouteProps;

const ProtectedRoute = ({
  isAuthenticated,
  authenticationPath,
  redirectPath,
  setRedirectPath,
  ...routeProps
}: ProtectedRouteProps) => {
  const currentLocation = useLocation();

  useEffect(() => {
    if (!isAuthenticated) {
      setRedirectPath(currentLocation.pathname);
    }
  }, [isAuthenticated, setRedirectPath, currentLocation]);

  if (isAuthenticated && redirectPath === currentLocation.pathname) {
    return <Outlet {...routeProps} />;
  } else {
    return (
      <Navigate
        to={{ pathname: isAuthenticated ? redirectPath : authenticationPath }}
      />
    );
  }
};

export default ProtectedRoute;
