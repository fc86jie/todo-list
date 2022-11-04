/**
 * @Author: wangrenjie86@gmail.com
 * @Date: 2022-11-04 11:38:58
 * @LastEditors: wangrenjie86@gmail.com
 * @LastEditTime: 2022-11-04 20:34:29
 * @FilePath: \react\react-learn\todo-list\src\store\index.js
 * @Description:
 */
import { configureStore } from '@reduxjs/toolkit';

import todoReducer from '../reducers/todo';

const store = configureStore({
  reducer: {
    todo: todoReducer,
  },
});

export default store;
