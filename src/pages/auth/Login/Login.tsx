import React, { useState } from 'react';
import { Navigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
// Material UI
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
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
    <>
      <Typography variant="h4" gutterBottom component="div">
        Login
      </Typography>
      <Stack spacing={2} sx={{ mb: 4 }}>
        <form onSubmit={handleSubmit}>
          <Stack spacing={2} direction="row">
            <TextField
              label="Username"
              placeholder="Enter username"
              value={usernameInput}
              onChange={handleTextInput}
            />
            <TextField
              label="Password"
              type={'password'}
              placeholder="Password"
              value={passwordInput}
              onChange={handlePasswordInput}
            />
            <Button variant="contained" onClick={handleSubmit}>
              Login
            </Button>
          </Stack>
        </form>
      </Stack>
      {errorAlert}
    </>
  );

  const redirectToEventsPage = <Navigate to="/events" />;

  return authState.sessionContext.isAuthenticated
    ? redirectToEventsPage
    : loginPage;
};

export default Login;
