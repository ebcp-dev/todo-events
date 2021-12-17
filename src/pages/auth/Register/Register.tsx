import React, { useState } from 'react';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';

import { userSignUp } from '../../../api/eventListApi';

import './Register.scss';

const Register = () => {
  const [usernameInput, setUsernameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

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

  // const dispatch = useDispatch();
  const handleSubmit = () => {
    if (usernameInput && passwordInput) {
      userSignUp({
        username: usernameInput,
        password: passwordInput,
        isAdmin: false
      }).then((result) => {
        console.log(result);
        if (result.status === 500) {
          setErrorMessage(result.data.message);
        } else {
          setErrorMessage('');
        }
      });
    } else {
      setErrorMessage('Username and Password required.');
    }
  };

  return (
    <>
      <Typography variant="h4" gutterBottom component="div">
        Register
      </Typography>
      <Stack spacing={2}>
        {errorMessage ? <Alert severity="error">{errorMessage}</Alert> : ''}
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
            <Button variant="contained" onClick={handleSubmit}>
              Register
            </Button>
          </Stack>
        </form>
      </Stack>
    </>
  );
};

export default Register;
