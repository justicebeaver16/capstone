import { csrfFetch } from './csrf';

// Action Types
const SET_SESSION_USER = 'session/SET_SESSION_USER';
const REMOVE_SESSION_USER = 'session/REMOVE_SESSION_USER';

// Action Creators
export const setSessionUser = (user) => ({
  type: SET_SESSION_USER,
  payload: user,
});

export const removeSessionUser = () => ({
  type: REMOVE_SESSION_USER,
});

// Optional reusable setter for components (e.g. after user edit)
export const setUser = (user) => setSessionUser(user);

// Thunk Actions

export const login = (credential, password) => async (dispatch) => {
  const response = await csrfFetch('/api/session', {
    method: 'POST',
    body: JSON.stringify({ credential, password }),
  });

  const data = await response.json();
  dispatch(setSessionUser(data.user));
  return response;
};

export const signup = (user) => async (dispatch) => {
  const { firstName, lastName, email, password, eventId } = user;

  const response = await csrfFetch('/api/users', {
    method: 'POST',
    body: JSON.stringify({
      firstName,
      lastName,
      email,
      password,
      eventId,
    }),
  });

  const data = await response.json();
  dispatch(setSessionUser(data.user));
  return response;
};

export const logout = () => async (dispatch) => {
  const response = await csrfFetch('/api/session', {
    method: 'DELETE',
  });
  dispatch(removeSessionUser());
  return response;
};

export const restoreUser = () => async (dispatch) => {
  const response = await csrfFetch('/api/session');
  const data = await response.json();
  dispatch(setSessionUser(data.user));
  return response;
};

// Initial State
const initialState = { user: null };

// Reducer
const sessionReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SESSION_USER:
      return { ...state, user: action.payload };
    case REMOVE_SESSION_USER:
      return { ...state, user: null };
    default:
      return state;
  }
};

export default sessionReducer;