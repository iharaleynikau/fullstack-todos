'use client';

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { BACKEND_URL } from '@/lib/constants';
import axios from 'axios';
import type { User } from '@/lib/types';

export const fetchUsers = createAsyncThunk(
  'users/fetchAll',
  async (currentUserId: string) => {
    try {
      const res = await axios.get(BACKEND_URL + '/user');

      return res.data.filter((user: User) => user.id !== currentUserId);
    } catch (error) {
      console.log('error fetch all users');
      return error;
    }
  },
);

type Users = {
  users: User[];
};

const initialState: Users = {
  users: [],
};

export const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.users = action.payload;
    });
  },
});

export default todosSlice.reducer;
