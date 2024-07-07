'use client';

import { configureStore } from '@reduxjs/toolkit';
import todosSlice from './Features/todos/todosSlice';
import usersSlice from './Features/users/usersSlice';

export const store = configureStore({
  reducer: {
    todos: todosSlice,
    users: usersSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
