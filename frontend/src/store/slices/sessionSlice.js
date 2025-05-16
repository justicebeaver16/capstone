import { csrfFetch } from '../csrf';

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

// Thunk Actions

// Login thunk
export const login = (credential, password) => async (dispatch) => {
  const response = await csrfFetch('/api/session', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ credential, password }),
  });

  const data = await response.json();
  dispatch(setSessionUser(data.user));
  return response;
};

// Signup thunk
export const signup = (user) => async (dispatch) => {
  const { firstName, lastName, email, password } = user;
  const response = await csrfFetch('/api/users', {
    method: 'POST',
    body: JSON.stringify({
      name: `${firstName} ${lastName}`,
      email,
      password,
    }),
  });
  const data = await response.json();
  dispatch(setSessionUser(data.user));
  return response;
};

// Logout thunk
export const logout = () => async (dispatch) => {
  const response = await csrfFetch('/api/session', {
    method: 'DELETE',
  });
  dispatch(removeSessionUser());
  return response;
};

// Restore user thunk
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

// import { csrfFetch } from '../csrf';

// // Action Types
// const SET_SESSION_USER = 'session/SET_SESSION_USER';
// const REMOVE_SESSION_USER = 'session/REMOVE_SESSION_USER';

// // Action Creators
// export const setSessionUser = (user) => ({
//   type: SET_SESSION_USER,
//   payload: user,
// });

// export const removeSessionUser = () => ({
//   type: REMOVE_SESSION_USER,
// });

// // Thunk Actions

// export const login = (credential, password) => async (dispatch) => {
//   const response = await csrfFetch('/api/session', {
//     method: 'POST',
//     body: JSON.stringify({ credential, password }),
//   });

//   const data = await response.json();
//   dispatch(setSessionUser(data.user));
//   return response;
// };

// export const signup = (user) => async (dispatch) => {
//   const { username, firstName, lastName, email, password } = user;
//   const response = await csrfFetch('/api/users', {
//     method: 'POST',
//     body: JSON.stringify({
//       username,
//       firstName,
//       lastName,
//       email,
//       password,
//     }),
//   });
//   const data = await response.json();
//   dispatch(setSessionUser(data.user));
//   return response;
// };

// export const logout = () => async (dispatch) => {
//   const response = await csrfFetch('/api/session', {
//     method: 'DELETE',
//   });
//   dispatch(removeSessionUser());
//   return response;
// };

// export const restoreUser = () => async (dispatch) => {
//   const response = await csrfFetch('/api/session');
//   const data = await response.json();
//   dispatch(setSessionUser(data.user));
//   return response;
// };

// // Initial State
// const initialState = { user: null };

// // Reducer
// const sessionReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case SET_SESSION_USER:
//       return { ...state, user: action.payload };
//     case REMOVE_SESSION_USER:
//       return { ...state, user: null };
//     default:
//       return state;
//   }
// };

// export default sessionReducer;