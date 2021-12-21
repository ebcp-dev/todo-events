import React, { useState } from 'react';
import { Navigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
// Material UI
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
// State management
import { AppDispatch, RootState } from '../../../app/redux/store';
import { loginUser } from '../../../app/redux/slices/authSlice';
// API
import { userLogin } from '../../../api/eventListApi';

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
      userLogin({
        username: usernameInput,
        password: passwordInput
      })
        .then((response) => {
          setErrorMessage('');
          dispatch(loginUser({ session: response.data }));
        })
        .catch((error) => {
          console.log(error);
          setErrorMessage(error.response.data.message);
        });
    } else {
      setErrorMessage('Username and Password required.');
    }
  };

  const errorAlert = (
    <Snackbar
      open={errorMessage ? true : false}
      autoHideDuration={6000}
      onClose={() => {
        setErrorMessage('');
      }}
    >
      <Alert
        severity="error"
        onClose={() => {
          setErrorMessage('');
        }}
      >
        {errorMessage}
      </Alert>
    </Snackbar>
  );

  const loginPage = (
    <Container component="main">
      {errorAlert}
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
            fullWidth
            label="Username"
            placeholder="Enter username"
            value={usernameInput}
            onChange={handleTextInput}
            sx={{ mb: 1 }}
          />
          <TextField
            fullWidth
            label="Password"
            type={'password'}
            placeholder="Password"
            value={passwordInput}
            onChange={handlePasswordInput}
            sx={{ mb: 1 }}
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
