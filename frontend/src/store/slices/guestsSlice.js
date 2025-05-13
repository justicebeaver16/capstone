import { csrfFetch } from '../csrf';

const GET_ALL_GUESTS = 'guests/getAllGuests';
const CREATE_GUEST = 'guests/createGuest';
const UPDATE_GUEST = 'guests/updateGuest';
const DELETE_GUEST = 'guests/deleteGuest';

// Action Creators
const getAllGuests = (guests) => ({ type: GET_ALL_GUESTS, guests });
const createGuest = (guest) => ({ type: CREATE_GUEST, guest });
const updateGuest = (guest) => ({ type: UPDATE_GUEST, guest });
const deleteGuest = (guestId) => ({ type: DELETE_GUEST, guestId });

// Thunks
export const getAllGuestsThunk = () => async (dispatch) => {
  const response = await csrfFetch('/api/guests');
  if (response.ok) {
    const data = await response.json();
    dispatch(getAllGuests(data.guests || []));
    return data.guests;
  }
};

export const createGuestThunk = (guestData) => async (dispatch) => {
  const response = await csrfFetch('/api/guests', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(guestData),
  });
  if (response.ok) {
    const newGuest = await response.json();
    dispatch(createGuest(newGuest));
    return newGuest;
  }
};

export const updateGuestThunk = (guestData, guestId) => async (dispatch) => {
  const response = await csrfFetch(`/api/guests/${guestId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(guestData),
  });
  if (response.ok) {
    const updatedGuest = await response.json();
    dispatch(updateGuest(updatedGuest));
    return updatedGuest;
  }
};

export const deleteGuestThunk = (guestId) => async (dispatch) => {
  const response = await csrfFetch(`/api/guests/${guestId}`, { method: 'DELETE' });
  if (response.ok) {
    dispatch(deleteGuest(guestId));
    return guestId;
  }
};

// Initial State & Reducer
const initialState = { allGuests: {} };

const guestsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_GUESTS: {
      const newState = { allGuests: {} };
      if (Array.isArray(action.guests)) {
        action.guests.forEach((guest) => {
          newState.allGuests[guest.id] = guest;
        });
      }
      return newState;
    }
    case CREATE_GUEST:
    case UPDATE_GUEST: {
      return {
        ...state,
        allGuests: { ...state.allGuests, [action.guest.id]: action.guest },
      };
    }
    case DELETE_GUEST: {
      const newState = { ...state, allGuests: { ...state.allGuests } };
      delete newState.allGuests[action.guestId];
      return newState;
    }
    default:
      return state;
  }
};

export default guestsReducer;