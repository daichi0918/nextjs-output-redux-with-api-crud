import { fetchTodoListApi } from '@/apis/todoApi';
import { TodoType } from '@/interface/Todo';
import { createSlice } from '@reduxjs/toolkit';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export const todoSlice = createSlice({
  name: 'todos',
  initialState: {
    lists: [] as Array<TodoType>,
  },
  reducers: {
    setTodoList: (state, action) => {
      state.lists = action.payload;
    },
    deleteList: (state, action) => {},
  },
});

export const { setTodoList } = todoSlice.actions;

export default todoSlice.reducer;
