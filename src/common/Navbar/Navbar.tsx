import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '../../app/redux/store';
import { logOutUser } from '../../app/redux/slices/authSlice';

import './Navbar.scss';

function Navbar() {
  const authState = useSelector((state: RootState) => state.auth);

  const dispatch = useDispatch();
  const handleLogout = (event: React.FormEvent) => {
    event.preventDefault();
    dispatch(logOutUser());
  };

  return (
    <>
      <ul>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/register">Register</Link>
        </li>
        <li>
          <Link to="/todos">Todo List Home</Link>
        </li>
        {authState.sessionContext.isAuthenticated ? (
          <>
            <li>
              <Link to="/route1">Route1</Link>
            </li>
            <li>
              <Link to={'#'} onClick={handleLogout}>
                Logout
              </Link>
            </li>
          </>
        ) : (
          ''
        )}
      </ul>
    </>
  );
}

export default Navbar;
