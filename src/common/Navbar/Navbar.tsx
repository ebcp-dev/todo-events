import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
// Material UI
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
// State management
import { AppDispatch, RootState } from '../../app/redux/Store';
import { logOutUser } from '../../app/redux/slices/authSlice';

import './Navbar.scss';

const Navbar = () => {
  const authState = useSelector((state: RootState) => state.auth);

  const dispatch = useDispatch<AppDispatch>();

  const handleLogout = (event: React.FormEvent) => {
    event.preventDefault();
    dispatch(logOutUser());
  };

  const nonAuthLinks = (
    <>
      <Button color="inherit">
        <Link to="/login">Login</Link>
      </Button>
      <Button color="inherit">
        <Link to="/register">Register</Link>
      </Button>
    </>
  );

  const authLinks = (
    <>
      <Typography variant="h6" component="div">
        Welcome, {authState.sessionContext.session.username}
      </Typography>
      <Button color="inherit">
        <Link to={'#'} onClick={handleLogout}>
          Logout
        </Link>
      </Button>
    </>
  );

  return (
    <AppBar position="static" sx={{ mb: 4 }}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Link to="/events">Event List</Link>
        </Typography>
        {authState.sessionContext.isAuthenticated ? authLinks : nonAuthLinks}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
