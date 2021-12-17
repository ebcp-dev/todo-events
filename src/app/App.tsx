import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Navbar from '../common/Navbar/Navbar';
import Footer from '../common/Footer/Footer';

import Register from '../pages/auth/Register/Register';
import Login from '../pages/auth/Login/Login';
import TodoList from '../pages/TodoList/TodoList';
import Route1 from '../pages/Route1/Route1';
import SubRoute1 from '../pages/Route1/SubRoute1/SubRoute1';
import NotFound from '../pages/NotFound/NotFound';

import './App.scss';

import ProtectedRoute, { ProtectedRouteProps } from '../utils/ProtectedRoute';
import { RootState } from './redux/store';
import { updateSessionContext } from './redux/slices/authSlice';

const App = () => {
  const authState = useSelector((state: RootState) => state.auth);

  const setRedirectPath = (path: string) => {
    console.log('updating session:');
    console.log(authState);

    updateSessionContext({
      email: authState.userDetails.email,
      password: authState.userDetails.password,
      path
    });
  };

  const defaultProtectedRouteProps: ProtectedRouteProps = {
    isAuthenticated: authState.sessionContext.isAuthenticated,
    authenticationPath: '/login',
    redirectPath: authState.sessionContext.redirectPath,
    setRedirectPath: setRedirectPath
  };

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* protected routes */}
        <Route
          element={
            <ProtectedRoute {...defaultProtectedRouteProps} path="/todos" />
          }
        >
          <Route path="/todos" element={<TodoList />} />
        </Route>
        <Route
          element={
            <ProtectedRoute {...defaultProtectedRouteProps} path="/route1" />
          }
        >
          <Route path="/route1" element={<Route1 />}>
            <Route path="subroute1" element={<SubRoute1 />} />
          </Route>
        </Route>
        {/* protected routes */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
