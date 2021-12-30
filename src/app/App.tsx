import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
// Material UI
// import Container from '@mui/material/Container';
// State management
import { AppDispatch } from './redux/Store';
import { logOutUser, setCurrentUser } from './redux/slices/authSlice';
import { emptyEventsList } from './redux/slices/eventListSlice';
// Components
import ProtectedOutlet from '../utils/routes/ProtectedOutlet';
import Navbar from '../common/Navbar/Navbar';
import Register from '../pages/auth/Register/Register';
import Login from '../pages/auth/Login/Login';
import Events from '../pages/Events/Events';
import NotFound from '../pages/NotFound/NotFound';

import './App.scss';

const App = () => {
  const dispatch = useDispatch<AppDispatch>();
  // check for token in localStorage
  if (localStorage.getItem('session')) {
    // Parse session string into readble JSON object
    const localSession = JSON.parse(`${localStorage.getItem('session')}`);
    dispatch(setCurrentUser(localSession));
    // Compare current time to token expiration
    const loginTime = new Date(localSession.lastLogin);
    const currentTime = new Date();
    const timeDiff = currentTime.getTime() - loginTime.getTime();
    // Divide by 1000 to get milliseconds
    if (localSession.expiresIn < timeDiff / 1000) {
      console.log('token expired');
      // Clear local data
      dispatch(logOutUser());
      dispatch(emptyEventsList());
    }
  }
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* protected routes */}
        <Route path="/events" element={<ProtectedOutlet />}>
          <Route path="/events" element={<Events />} />
        </Route>
        {/* protected routes */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
