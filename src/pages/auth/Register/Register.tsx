import React, { useState } from 'react';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

import { userSignUp } from '../../../api/eventListApi';

import './Register.scss';

const Register = () => {
  const [usernameInput, setUsernameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [confirmPasswordInput, setConfirmPasswordInput] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

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

  const handleConfirmPasswordInput = (
    event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setConfirmPasswordInput(event.currentTarget.value);
  };

  const handleSubmit = () => {
    if (
      usernameInput &&
      passwordInput &&
      confirmPasswordInput &&
      passwordInput === confirmPasswordInput
    ) {
      userSignUp({
        username: usernameInput,
        password: passwordInput,
        isAdmin: false
      })
        .then((result) => {
          console.log(result);
          setErrorMessage('');
          setUsernameInput('');
          setPasswordInput('');
          setConfirmPasswordInput('');
          setSuccessMessage(
            'User created. You can now log in to your account.'
          );
        })
        .catch((error) => {
          setErrorMessage(error.response.data.message);
          setSuccessMessage('');
        });
    } else if (passwordInput !== confirmPasswordInput) {
      setErrorMessage('Passwords do not match.');
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

  const successAlert = (
    <Snackbar
      open={successMessage ? true : false}
      autoHideDuration={6000}
      onClose={() => {
        setSuccessMessage('');
      }}
    >
      <Alert
        severity="success"
        onClose={() => {
          setSuccessMessage('');
        }}
      >
        {successMessage}
      </Alert>
    </Snackbar>
  );

  return (
    <>
      <Typography variant="h4" gutterBottom component="div">
        Register
      </Typography>
      <Stack spacing={2} sx={{ mb: 4 }}>
        <form onSubmit={handleSubmit} method="post">
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
            <TextField
              required
              id="outlined-required"
              label="Confirm Password"
              placeholder="Confirm Password"
              value={confirmPasswordInput}
              onChange={handleConfirmPasswordInput}
            />
            <Button variant="contained" onClick={handleSubmit}>
              Register
            </Button>
          </Stack>
        </form>
      </Stack>
      {errorAlert}
      {successAlert}
    </>
  );
};

export default Register;
