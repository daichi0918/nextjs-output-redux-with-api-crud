import { createSlice } from '@reduxjs/toolkit';

export const todoSlice = createSlice({
  name: 'todos',
  initialState: {
    lists: [],
  },
  reducers: {
    setTodoList: (state, action) => {
      state.lists = action.payload;
    },
  },
});

export const { setTodoList } = todoSlice.actions;

export default todoSlice.reducer;
