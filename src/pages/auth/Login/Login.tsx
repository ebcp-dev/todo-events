import React, { useState } from 'react';
import { Navigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
// Material UI
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
// State management
import { AppDispatch, RootState } from '../../../app/redux/Store';
import { loginUser } from '../../../app/redux/slices/AuthSlice';
// API
import { userLoginThunk } from '../../../api/EventListApi';
// Components
import AlertMessage from '../../../common/Alerts/AlertMessage';

import './Login.scss';

const Login = () => {
  // Form values
  const [usernameInput, setUsernameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  // Feedback alerts
  const [errorMessage, setErrorMessage] = useState('');

  const dispatch = useDispatch<AppDispatch>();
  const authState = useSelector((state: RootState) => state.auth);

  const handleTextInput = (
    event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setUsernameInput(event.currentTarget.value);
  };

  const handlePasswordInput = (
    event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setPasswordInput(event.currentTarget.value);
  };

  const handleSubmit = () => {
    if (usernameInput && passwordInput) {
      dispatch(
        userLoginThunk({
          user: {
            username: usernameInput,
            password: passwordInput,
            isAdmin: false
          }
        })
      )
        .then((response) => {
          setErrorMessage('');
          dispatch(loginUser({ session: response.payload.data }));
        })
        .catch((error) => {
          console.log(error);
          setErrorMessage(error.response.data.message);
        });
    } else {
      setErrorMessage('Username and Password required.');
    }
  };

  const loginPage = (
    <Container component="main">
      <AlertMessage
        alertType={'error'}
        alertMessage={errorMessage}
        setAlertMessage={setErrorMessage}
      />
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <Typography variant="h4" gutterBottom component="div">
          Login
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            required
            fullWidth
            label="Username"
            placeholder="Enter username"
            value={usernameInput}
            onChange={handleTextInput}
            sx={{ mb: 1 }}
            error={errorMessage ? true : false}
          />
          <TextField
            required
            fullWidth
            label="Password"
            type={'password'}
            placeholder="Password"
            value={passwordInput}
            onChange={handlePasswordInput}
            sx={{ mb: 1 }}
            error={errorMessage ? true : false}
          />
          <Button fullWidth variant="contained" onClick={handleSubmit}>
            Login
          </Button>
        </Box>
      </Box>
    </Container>
  );

  const redirectToEventsPage = <Navigate to="/events" />;

  return authState.sessionContext.isAuthenticated
    ? redirectToEventsPage
    : loginPage;
};

export default Login;
