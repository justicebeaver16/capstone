import { createSlice } from '@reduxjs/toolkit';

const tasksSlice = createSlice({
  name: 'tasks',
  initialState: [],
  reducers: {
    addTask: (state, action) => {
      state.push(action.payload);
    },
    deleteTask: (state, action) => {
      return state.filter((_, index) => index !== action.payload);
    },
    setTasks: (state, action) => {
      return action.payload;
    }
  }
});

export const { addTask, deleteTask, setTasks } = tasksSlice.actions;
export const selectAllTasks = (state) => state.tasks;
export default tasksSlice.reducer;