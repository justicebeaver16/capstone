import { createSlice } from '@reduxjs/toolkit';

const loadInitialGuests = () => {
  try {
    const stored = localStorage.getItem('guests');
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

const guestsSlice = createSlice({
  name: 'guests',
  initialState: loadInitialGuests(),
  reducers: {
    addGuest: (state, action) => {
      const updated = [...state, action.payload];
      localStorage.setItem('guests', JSON.stringify(updated));
      return updated;
    },
    setGuests: (_, action) => {
      localStorage.setItem('guests', JSON.stringify(action.payload));
      return action.payload;
    }
  }
});

export const { addGuest, setGuests } = guestsSlice.actions;
export const selectAllGuests = (state) => state.guests;
export default guestsSlice.reducer;