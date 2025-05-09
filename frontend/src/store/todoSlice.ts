import { fetchTodoListApi } from '@/apis/todoApi';
import { TodoType } from '@/interface/Todo';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { type RootState } from './index';

const apiUrl = 'http://localhost:8080/api/todo';
// const token = localStorage.localJWT;

export const fetchAsyncGetAll = createAsyncThunk('todo/get', async () => {
  const res = await axios.get(apiUrl, {
    // headers: {
    //   Authorization: `Bearer ${token}`,
    // },
  });
  return res.data;
});

export const fetchAsyncGetById = createAsyncThunk<TodoType, number>(
  'todo/get/detail',
  async (id) => {
    const res = await axios.get(`${apiUrl}/${id}`);
    return res.data;
  }
);

export const fetchAsyncCreate = createAsyncThunk<
  TodoType,
  { title: string; content: string | undefined }
>('task/post', async (task) => {
  const res = await axios.post(apiUrl, task, {
    // headers: {
    //   "Content-Type": "application/json",
    //   Authorization: `Bearer ${token}`,
    // },
  });
  return res.data;
});

export const fetchAsyncUpdate = createAsyncThunk<
  TodoType, // 成功時に返ってくるデータの型
  TodoType // 引数として受け取る task の型
>('task/put', async (task) => {
  const res = await axios.patch(`${apiUrl}/${task.id}/`, task, {
    // headers: {
    //   'Content-Type': 'application/json',
    //   Authorization: `Bearer ${token}`,
    // },
  });
  return res.data;
});

export const fetchAsyncDelete = createAsyncThunk<number, number>(
  'task/delete',
  async (id) => {
    await axios.delete(`${apiUrl}/${id}/`, {
      // headers: {
      //   "Content-Type": "application/json",
      //   Authorization: `Bearer ${token}`,
      // },
    });
    return id;
  }
);

export const todoSlice = createSlice({
  name: 'todos',
  initialState: {
    todos: [] as Array<TodoType>,
    editedTodo: {} as TodoType,
    selectedTodo: {} as TodoType,
  },
  reducers: {
    editTodo(state, action) {
      state.editedTodo = action.payload;
    },
    selectedTodo(state, action) {
      state.selectedTodo = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAsyncGetAll.fulfilled, (state, action) => {
      return {
        ...state,
        todos: action.payload,
      };
    });
    builder.addCase(fetchAsyncGetById.fulfilled, (state, action) => {
      return {
        ...state,
        editedTodo: action.payload,
      };
    });
    builder.addCase(fetchAsyncCreate.fulfilled, (state, action) => {
      return {
        ...state,
        tasks: [...state.todos, action.payload],
      };
    });
    builder.addCase(fetchAsyncUpdate.fulfilled, (state, action) => {
      return {
        ...state,
        tasks: state.todos.map((t) =>
          t.id === action.payload.id ? action.payload : t
        ),
        selectedTodo: action.payload,
      };
    });
    builder.addCase(fetchAsyncDelete.fulfilled, (state, action) => {
      return {
        ...state,
        tasks: state.todos.filter((t) => t.id !== Number(action.payload)),
        selectedTask: { id: 0, title: '', content: '' },
      };
    });
  },
});

export const { editTodo, selectedTodo } = todoSlice.actions;

export const selectedTodos = (state: RootState) => state.todos.selectedTodo;
export const selectEditedTodo = (state: RootState) => state.todos.editedTodo;
export const selectTodo = (state: RootState) => state.todos.todos;

export default todoSlice.reducer;
