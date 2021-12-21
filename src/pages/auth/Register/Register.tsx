import React, { useState } from 'react';
// Material UI
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
// API
import { userSignUp } from '../../../api/eventListApi';

import './Register.scss';

const Register = () => {
  // Form values
  const [usernameInput, setUsernameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [confirmPasswordInput, setConfirmPasswordInput] = useState('');
  // Feedback alerts
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
          setSuccessMessage(
            'User created. You can now log in to your account.'
          );
          setUsernameInput('');
          setPasswordInput('');
          setConfirmPasswordInput('');
          setErrorMessage('');
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
    <Container component="main">
      {errorAlert}
      {successAlert}
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Register
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            required
            fullWidth
            label="Username"
            placeholder="Enter username"
            value={usernameInput}
            onChange={handleTextInput}
            sx={{ mb: 1 }}
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
          />
          <TextField
            required
            fullWidth
            label="Confirm Password"
            type={'password'}
            placeholder="Confirm Password"
            value={confirmPasswordInput}
            onChange={handleConfirmPasswordInput}
            sx={{ mb: 1 }}
          />
          <Button fullWidth variant="contained" onClick={handleSubmit}>
            Register
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Register;
