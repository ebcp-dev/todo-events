import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { RootState } from '../../../app/redux/store';
import { saveUser } from '../../../app/redux/slices/authSlice';

import './Login.scss';

const Login = () => {
  const [emailInput, setUsernameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');

  const loginState = useSelector((state: RootState) => state.auth);

  const handleTextInput = (event: React.FormEvent<HTMLInputElement>) => {
    setUsernameInput(event.currentTarget.value);
  };

  const handlePasswordInput = (event: React.FormEvent<HTMLInputElement>) => {
    setPasswordInput(event.currentTarget.value);
  };

  const dispatch = useDispatch();
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (emailInput && passwordInput) {
      dispatch(
        saveUser({ email: emailInput, password: passwordInput, path: '/todos' })
      );
    }
  };

  return (
    <>
      <h1>Login Page</h1>
      <form onSubmit={handleSubmit}>
        <input
          name="emailInput"
          type="text"
          placeholder="Enter email"
          value={emailInput}
          onChange={handleTextInput}
        />
        <input
          name="passwordInput"
          // change type to "password" when ready
          // workaround to prevent chrome from saving passwords
          type="text"
          placeholder="Enter password"
          value={passwordInput}
          onChange={handlePasswordInput}
        />
        <button onClick={handleSubmit}>Login</button>
      </form>
      <p>Logged In as: {loginState.userDetails.email}</p>
    </>
  );
};

export default Login;
