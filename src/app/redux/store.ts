import { configureStore } from '@reduxjs/toolkit';

import todoListReducer from './slices/eventListSlice';
import authReducer from './slices/authSlice';

export const store = configureStore({
  reducer: {
    eventList: todoListReducer,
    auth: authReducer
  }
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
