'use client';

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BACKEND_URL } from '@/lib/constants';
import type { Todo } from '@/lib/types';

export const fetchTodosByCreatorId = createAsyncThunk(
  'todos/fetchAll',
  async (creatorId: string) => {
    try {
      const res = await axios.get(
        BACKEND_URL + '/todos/byCreator/' + creatorId,
      );

      return res.data;
    } catch (error) {
      console.log('error fetch all todos');
      return error;
    }
  },
);

export const deleteTodo = createAsyncThunk(
  'todos/deleteTodo',
  async (todoId: string) => {
    try {
      await axios.delete(BACKEND_URL + '/todos/' + todoId);

      return todoId;
    } catch (error) {
      console.log('error delete todo');
    }
  },
);

export const createTodo = createAsyncThunk(
  'todos/createTodo',
  async ({ todoText, creatorId }: { todoText: string; creatorId: string }) => {
    try {
      const res = await axios.post(BACKEND_URL + '/todos', {
        creatorId,
        todoText,
      });

      return res.data;
    } catch (error) {
      console.log('error create todo');
    }
  },
);

type Todos = {
  todos: Todo[];
};

const initialState: Todos = {
  todos: [],
};

export const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    removeTodo: (state, action) => {
      state.todos = state.todos.filter(
        (todo: Todo) => todo.id !== action.payload.id,
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodosByCreatorId.fulfilled, (state, action) => {
        state.todos = action.payload;
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.todos = state.todos.filter(
          (todo: Todo) => todo.id !== action.payload,
        );
      })
      .addCase(createTodo.fulfilled, (state, action) => {
        state.todos.push(action.payload);
      });
  },
});

export default todosSlice.reducer;
