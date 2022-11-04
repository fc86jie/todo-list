/**
 * @Author: wangrenjie86@gmail.com
 * @Date: 2022-11-04 15:52:48
 * @LastEditors: wangrenjie86@gmail.com
 * @LastEditTime: 2022-11-04 18:47:48
 * @FilePath: \react\react-learn\todo-list\src\reducers\todo.js
 * @Description:
 */

import { createSlice } from '@reduxjs/toolkit';
const todoSlice = createSlice({
  name: 'todo',
  initialState: {
    list: [],
  },
  reducers: {
    add(state, action) {
      const { id, text } = action.payload;
      state.list.push({
        id,
        text,
        completed: false,
      });
    },
    update(state, action) {
      const { id, text } = action.payload;
      state.list.forEach(item => {
        if (item.id === id) {
          item.text = text;
        }
      });
    },
    del(state, action) {
      const id = action.payload;
      state.list = state.list.filter(item => item.id !== id);
    },
    clear(state, action) {
      state.list = state.list.filter(item => !item.completed);
    },
    toggle(state, action) {
      const { id, completed } = action.payload;
      state.list.forEach(item => {
        if (item.id === id) {
          item.completed = completed;
        }
      });
    },
  },
});

export const { add, del, toggle, update, clear } = todoSlice.actions;
export default todoSlice.reducer;
