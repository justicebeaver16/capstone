import { csrfFetch } from '../csrf';

const GET_SEATING = 'seating/getSeating';
const UPDATE_SEAT = 'seating/updateSeat';
const RESET_SEATING = 'seating/resetSeating';

// Action Creators
const getSeating = (seating) => ({ type: GET_SEATING, seating });
const updateSeat = (seat) => ({ type: UPDATE_SEAT, seat });
const resetSeating = () => ({ type: RESET_SEATING });

// Thunks
export const getSeatingThunk = (eventId) => async (dispatch) => {
  const response = await csrfFetch(`/api/events/${eventId}/seating`);
  if (response.ok) {
    const data = await response.json();
    dispatch(getSeating(data.seating || []));
    return data.seating;
  }
};

export const updateSeatThunk = (seatData, seatId) => async (dispatch) => {
  const response = await csrfFetch(`/api/seating/${seatId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(seatData),
  });
  if (response.ok) {
    const updatedSeat = await response.json();
    dispatch(updateSeat(updatedSeat));
    return updatedSeat;
  }
};

export const resetSeatingThunk = () => async (dispatch) => {
  dispatch(resetSeating());
};

// Initial State & Reducer
const initialState = { seating: {} };

const seatingReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SEATING: {
      const newState = { seating: {} };
      if (Array.isArray(action.seating)) {
        action.seating.forEach((seat) => {
          newState.seating[seat.id] = seat;
        });
      }
      return newState;
    }
    case UPDATE_SEAT: {
      return {
        ...state,
        seating: { ...state.seating, [action.seat.id]: action.seat },
      };
    }
    case RESET_SEATING:
      return { seating: {} };
    default:
      return state;
  }
};

export default seatingReducer;