import { createSlice } from '@reduxjs/toolkit';

import type { RootState } from '../store';

// Define a type for the slice state
interface AuthState {
  userDetails: {
    email: string;
    password: string;
  };
  sessionContext: {
    isAuthenticated: boolean;
    redirectPath: string;
  };
}

// Define the initial state using that type
const initialState: AuthState = {
  userDetails: {
    email: '',
    password: ''
  },
  sessionContext: {
    isAuthenticated: false,
    redirectPath: ''
  }
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    saveUser: (state, action) => {
      state.userDetails = {
        email: action.payload.email,
        password: action.payload.password
      };
      state.sessionContext = {
        isAuthenticated: true,
        redirectPath: action.payload.path
      };
    },
    updateSessionContext: (state, action) => {
      state.sessionContext = {
        isAuthenticated: true,
        redirectPath: action.payload.path
      };
    },
    logOutUser: (state) => {
      state = initialState;
      return state;
    }
  }
});

export const { saveUser, updateSessionContext, logOutUser } = authSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectAuth = (state: RootState) => state.auth.userDetails;

export default authSlice.reducer;
