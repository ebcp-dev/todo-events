import React, { useState } from 'react';
import { Navigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';

import { RootState } from '../../../app/redux/store';
import { userLogin } from '../../../api/eventListApi';
import { loginUser } from '../../../app/redux/slices/authSlice';

import './Login.scss';

const Login = () => {
  const [usernameInput, setUsernameInput] = useState('testemail');
  const [passwordInput, setPasswordInput] = useState('testpass');
  const [errorMessage, setErrorMessage] = useState('');

  const dispatch = useDispatch();
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

  const loginPage = (
    <>
      <Typography variant="h4" gutterBottom component="div">
        Login
      </Typography>
      <Stack spacing={2} sx={{ mb: 4 }}>
        <form onSubmit={handleSubmit}>
          <Stack spacing={2} direction="row">
            <TextField
              id="outlined-required"
              label="Username"
              placeholder="Enter username"
              value={usernameInput}
              onChange={handleTextInput}
            />
            <TextField
              id="outlined-required"
              label="Password"
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
      {errorMessage ? (
        <Alert
          severity="error"
          onClose={() => {
            setErrorMessage('');
          }}
        >
          {errorMessage}
        </Alert>
      ) : (
        ''
      )}
    </>
  );

  const redirectToEventsPage = <Navigate to="/events" />;

  return authState.sessionContext.isAuthenticated
    ? redirectToEventsPage
    : loginPage;
};

export default Login;
