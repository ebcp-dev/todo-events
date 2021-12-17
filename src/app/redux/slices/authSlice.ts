import { createSlice } from '@reduxjs/toolkit';

import type { RootState } from '../store';

// Define a type for the slice state
interface AuthState {
  userDetails: {
    username: string;
    password: string;
    isAdmin: boolean;
  };
  sessionContext: {
    isAuthenticated: boolean;
    user: Record<string, unknown>;
  };
}

// Define the initial state using that type
const initialState: AuthState = {
  userDetails: {
    username: '',
    password: '',
    isAdmin: false
  },
  sessionContext: {
    isAuthenticated: false,
    user: {}
  }
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginUser: (state, action) => {
      state.userDetails = {
        username: action.payload.username,
        password: action.payload.password,
        isAdmin: false
      };
      state.sessionContext = {
        isAuthenticated: true,
        user: action.payload.user
      };
    },
    registerUser: (state, action) => {
      state.userDetails = {
        ...state.userDetails,
        username: action.payload.username
      };
    },
    logOutUser: (state) => {
      state = initialState;
      return state;
    }
  }
});

export const { loginUser, registerUser, logOutUser } = authSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectAuth = (state: RootState) => state.auth.userDetails;

export default authSlice.reducer;
