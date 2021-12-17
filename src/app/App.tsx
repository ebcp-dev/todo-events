import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Container from '@mui/material/Container';

import Navbar from '../common/Navbar/Navbar';
// import Footer from '../common/Footer/Footer';

import Register from '../pages/auth/Register/Register';
import Login from '../pages/auth/Login/Login';
import EventList from '../pages/EventList/EventList';
import NotFound from '../pages/NotFound/NotFound';

import './App.scss';

import ProtectedOutlet from '../utils/ProtectedOutlet';

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Container component="main" maxWidth="xs">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {/* protected routes */}
          <Route path="/events" element={<ProtectedOutlet />}>
            <Route path="/events" element={<EventList />} />
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
