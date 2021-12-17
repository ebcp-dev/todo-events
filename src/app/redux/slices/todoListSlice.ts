import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import type { RootState } from '../store';

// Define a type for the slice state
interface TodoListState {
  value: Array<string>;
}

// Define the initial state using that type
const initialState: TodoListState = {
  value: []
};

export const todoListSlice = createSlice({
  name: 'todoList',
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<string>) => {
      state.value.push(action.payload);
    },
    removeTodo: (state, action: PayloadAction<string>) => {
      const todoIndex = state.value.indexOf(action.payload);

      if (todoIndex > -1) {
        state.value.splice(todoIndex, 1);
      }
    },
    removeLastTodo: (state) => {
      state.value.pop();
    }
  }
});

export const { addTodo, removeTodo, removeLastTodo } = todoListSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectTodoList = (state: RootState) => state.todoList.value;

export default todoListSlice.reducer;
