import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Container from '@mui/material/Container';

import Navbar from '../common/Navbar/Navbar';
// import Footer from '../common/Footer/Footer';
import Register from '../pages/auth/Register/Register';
import Login from '../pages/auth/Login/Login';
import Events from '../pages/Events/Events';
import NotFound from '../pages/NotFound/NotFound';

import { logOutUser, setCurrentUser } from './redux/slices/authSlice';
import { emptyEventsList } from './redux/slices/eventListSlice';
import ProtectedOutlet from '../utils/routes/ProtectedOutlet';

import './App.scss';

const App = () => {
  const dispatch = useDispatch();
  // check for token in localStorage
  if (localStorage.getItem('session')) {
    const localSession = JSON.parse(`${localStorage.getItem('session')}`);

    dispatch(setCurrentUser(localSession));

    // Compare current time to token expiration
    const loginTime = new Date(localSession.lastLogin);
    const currentTime = new Date();

    const timeDiff = currentTime.getTime() - loginTime.getTime();

    if (localSession.expiresIn < timeDiff / 1000) {
      console.log('token expired');

      dispatch(logOutUser());
      dispatch(emptyEventsList());
    }
  }
  return (
    <BrowserRouter>
      <Navbar />
      <Container component="main" maxWidth="md">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {/* protected routes */}
          <Route path="/events" element={<ProtectedOutlet />}>
            <Route path="/events" element={<Events />} />
          </Route>
          {/* protected routes */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        {/* <Footer /> */}
      </Container>
    </BrowserRouter>
  );
};

export default App;
