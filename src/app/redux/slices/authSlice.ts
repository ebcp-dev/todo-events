import { createSlice } from '@reduxjs/toolkit';

import type { RootState } from '../store';

// Define a type for the slice state
export interface IAuthState {
  sessionContext: {
    isAuthenticated: boolean;
    session: Record<string, unknown>;
  };
}

// Define the initial state using that type
const initialState: IAuthState = {
  sessionContext: {
    isAuthenticated: localStorage.getItem('token') ? true : false,
    session: {}
  }
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginUser: (state, action) => {
      state.sessionContext = {
        isAuthenticated: action.payload.session.token,
        session: action.payload.session
      };

      localStorage.setItem('token', action.payload.session.token);
    },
    registerUser: (state, action) => {
      state.sessionContext = {
        ...state.sessionContext,
        session: action.payload.session
      };
    },
    logOutUser: (state) => {
      state.sessionContext.isAuthenticated = false;
      localStorage.removeItem('token');
    }
  }
});

export const { loginUser, registerUser, logOutUser } = authSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectAuth = (state: RootState) => state.auth;

export default authSlice.reducer;
