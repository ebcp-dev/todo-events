import { configureStore } from '@reduxjs/toolkit';

import todoListReducer from './slices/EventListSlice';
import authReducer from './slices/AuthSlice';

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
