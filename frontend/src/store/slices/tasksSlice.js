import { createSlice } from '@reduxjs/toolkit';

// Load saved tasks from localStorage (or default to empty array)
const loadInitialTasks = () => {
  try {
    const stored = localStorage.getItem('tasks');
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState: loadInitialTasks(),
  reducers: {
    addTask: (state, action) => {
      const newTasks = [...state, action.payload];
      localStorage.setItem('tasks', JSON.stringify(newTasks));
      return newTasks;
    },
    deleteTask: (state, action) => {
      const updatedTasks = state.filter((_, index) => index !== action.payload);
      localStorage.setItem('tasks', JSON.stringify(updatedTasks));
      return updatedTasks;
    },
    setTasks: (_, action) => {
      localStorage.setItem('tasks', JSON.stringify(action.payload));
      return action.payload;
    }
  }
});

export const { addTask, deleteTask, setTasks } = tasksSlice.actions;
export const selectAllTasks = (state) => state.tasks;
export default tasksSlice.reducer;

// import { createSlice } from '@reduxjs/toolkit';

// const tasksSlice = createSlice({
//   name: 'tasks',
//   initialState: [],
//   reducers: {
//     addTask: (state, action) => {
//       state.push(action.payload);
//     },
//     deleteTask: (state, action) => {
//       return state.filter((_, index) => index !== action.payload);
//     },
//     setTasks: (state, action) => {
//       return action.payload;
//     }
//   }
// });

// export const { addTask, deleteTask, setTasks } = tasksSlice.actions;
// export const selectAllTasks = (state) => state.tasks;
// export default tasksSlice.reducer;