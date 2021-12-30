import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
// Material UI
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
// State management
import { AppDispatch } from '../../../app/redux/Store';
// API
import { userSignUpThunk } from '../../../api/EventListApi';
// Components
import AlertMessage from '../../../common/Alerts/AlertMessage';

import './Register.scss';

const Register = () => {
  // Form values
  const [usernameInput, setUsernameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [confirmPasswordInput, setConfirmPasswordInput] = useState('');
  // Feedback alerts
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const dispatch = useDispatch<AppDispatch>();

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
      dispatch(
        userSignUpThunk({
          user: {
            username: usernameInput,
            password: passwordInput,
            isAdmin: false
          }
        })
      )
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
      setSuccessMessage('');
      setErrorMessage('Passwords do not match.');
    } else {
      setSuccessMessage('');
      setErrorMessage('Username and Password required.');
    }
  };

  return (
    <Container component="main">
      <AlertMessage
        alertType={errorMessage ? 'error' : 'success'}
        alertMessage={errorMessage ? errorMessage : successMessage}
        setAlertMessage={errorMessage ? setErrorMessage : setSuccessMessage}
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
          <TextField
            required
            fullWidth
            label="Confirm Password"
            type={'password'}
            placeholder="Confirm Password"
            value={confirmPasswordInput}
            onChange={handleConfirmPasswordInput}
            sx={{ mb: 1 }}
            error={errorMessage ? true : false}
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
