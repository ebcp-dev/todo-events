import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

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
  console.log(authState.sessionContext.user);

  return (
    <>
      <AppBar position="static" sx={{ mb: 4 }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Event List
          </Typography>
          {authState.sessionContext.isAuthenticated ? (
            ''
          ) : (
            <>
              <Button color="inherit">
                <Link to="/login">Login</Link>
              </Button>
              <Button color="inherit">
                <Link to="/register">Register</Link>
              </Button>
            </>
          )}

          {authState.sessionContext.isAuthenticated ? (
            <>
              <Typography variant="h6" component="div">
                Welcome, {authState.sessionContext.user.username}
              </Typography>
              <Button color="inherit">
                <Link to="/events">Events</Link>
              </Button>
              <Button color="inherit">
                <Link to={'#'} onClick={handleLogout}>
                  Logout
                </Link>
              </Button>
            </>
          ) : (
            ''
          )}
        </Toolbar>
      </AppBar>
    </>
  );
}

export default Navbar;
