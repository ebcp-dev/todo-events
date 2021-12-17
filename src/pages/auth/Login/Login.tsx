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
  const [usernameInput, setUsernameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
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
      }).then((result) => {
        console.log(result);
        if (result.status === 500) {
          setErrorMessage(result.data.message);
        } else {
          setErrorMessage('');
          dispatch(loginUser({ user: result.data }));
        }
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
      <Stack spacing={2}>
        {errorMessage ? <Alert severity="error">{errorMessage}</Alert> : ''}
        <form onSubmit={handleSubmit}>
          <Stack spacing={2} direction="row">
            <TextField
              required
              id="outlined-required"
              label="Username"
              placeholder="Enter username"
              value={usernameInput}
              onChange={handleTextInput}
            />
            <TextField
              required
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
    </>
  );

  const redirectToEventsPage = <Navigate to="/events" />;

  return authState.sessionContext.isAuthenticated
    ? redirectToEventsPage
    : loginPage;
};

export default Login;
