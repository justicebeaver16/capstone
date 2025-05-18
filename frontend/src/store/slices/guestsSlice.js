import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { csrfFetch } from '../csrf';

// Thunk: Fetch guests for current user's primary event
export const fetchGuests = createAsyncThunk(
  'guests/fetchGuests',
  async () => {
    const response = await csrfFetch('/api/guestlist');
    if (!response.ok) throw new Error('Failed to fetch guests');
    const guests = await response.json(); // returns array of guests
    return guests;
  }
);

// Thunk: Add new guest to backend
export const createGuest = createAsyncThunk(
  'guests/createGuest',
  async (guestData) => {
    const response = await csrfFetch('/api/guestlist', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(guestData)
    });
    if (!response.ok) throw new Error('Failed to add guest');
    const newGuest = await response.json(); // returns new guest object
    return newGuest;
  }
);

// Slice
const guestsSlice = createSlice({
  name: 'guests',
  initialState: [],
  reducers: {
    setGuests: (state, action) => action.payload
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGuests.fulfilled, (_, action) => action.payload)
      .addCase(createGuest.fulfilled, (state, action) => {
        state.push(action.payload);
      });
  }
});

export const { setGuests } = guestsSlice.actions;
export const selectAllGuests = (state) => state.guests;
export default guestsSlice.reducer;

// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import { csrfFetch } from '../csrf';

// // Thunk: Fetch guests for current user's primary event
// export const fetchGuests = createAsyncThunk(
//   'guests/fetchGuests',
//   async () => {
//     const response = await fetch('/api/guestlist');
//     if (!response.ok) throw new Error('Failed to fetch guests');
//     return await response.json();
//   }
// );
// // export const fetchGuests = createAsyncThunk(
// //   'guests/fetchGuests',
// //   async (_, thunkAPI) => {
// //     const response = await csrfFetch('/api/guestlist');
// //     if (!response.ok) throw new Error('Failed to fetch guests');
// //     return await response.json(); // returns array of guests
// //   }
// // );

// // Thunk: Add new guest to backend
// export const createGuest = createAsyncThunk(
//   'guests/createGuest',
//   async (guestData) => {
//     const response = await csrfFetch('/api/guestlist', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(guestData)
//     });
//     return await response.json();
//   }
// );
// // export const createGuest = createAsyncThunk(
// //   'guests/createGuest',
// //   async (guestData, thunkAPI) => {
// //     const response = await csrfFetch('/api/guestlist', {
// //       method: 'POST',
// //       headers: { 'Content-Type': 'application/json' },
// //       body: JSON.stringify(guestData)
// //     });
// //     if (!response.ok) throw new Error('Failed to add guest');
// //     return await response.json(); // new guest object
// //   }
// // );

// const guestsSlice = createSlice({
//   name: 'guests',
//   initialState: [],
//   reducers: {
//     setGuests: (state, action) => action.payload
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchGuests.fulfilled, (_, action) => action.payload)
//       .addCase(createGuest.fulfilled, (state, action) => {
//         state.push(action.payload);
//       });
//   }
// });

// export const { setGuests } = guestsSlice.actions;
// export const selectAllGuests = (state) => state.guests;
// export default guestsSlice.reducer;



// import { createSlice } from '@reduxjs/toolkit';

// const loadInitialGuests = () => {
//   try {
//     const stored = localStorage.getItem('guests');
//     return stored ? JSON.parse(stored) : [];
//   } catch {
//     return [];
//   }
// };

// const guestsSlice = createSlice({
//   name: 'guests',
//   initialState: loadInitialGuests(),
//   reducers: {
//     addGuest: (state, action) => {
//       const updated = [...state, action.payload];
//       localStorage.setItem('guests', JSON.stringify(updated));
//       return updated;
//     },
//     setGuests: (_, action) => {
//       localStorage.setItem('guests', JSON.stringify(action.payload));
//       return action.payload;
//     }
//   }
// });

// export const { addGuest, setGuests } = guestsSlice.actions;
// export const selectAllGuests = (state) => state.guests;
// export default guestsSlice.reducer;