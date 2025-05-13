import { csrfFetch } from '../csrf';

// Action Types
const GET_ALL_EVENTS = 'events/getAllEvents';
const GET_SINGLE_EVENT = 'events/getSingleEvent';
const CREATE_EVENT = 'events/createEvent';
const UPDATE_EVENT = 'events/updateEvent';
const DELETE_EVENT = 'events/deleteEvent';

// Action Creators
const getAllEvents = (events) => ({
  type: GET_ALL_EVENTS,
  events,
});

const getSingleEvent = (event) => ({
  type: GET_SINGLE_EVENT,
  event,
});

const createEvent = (event) => ({
  type: CREATE_EVENT,
  event,
});

const updateEvent = (event) => ({
  type: UPDATE_EVENT,
  event,
});

const deleteEvent = (eventId) => ({
  type: DELETE_EVENT,
  eventId,
});

// Thunks
export const getAllEventsThunk = () => async (dispatch) => {
  const response = await csrfFetch('/api/events');
  if (response.ok) {
    const data = await response.json();
    dispatch(getAllEvents(data.events || []));
    return data.events;
  }
};

export const getSingleEventThunk = (eventId) => async (dispatch) => {
  const response = await csrfFetch(`/api/events/${eventId}`);
  if (response.ok) {
    const event = await response.json();
    dispatch(getSingleEvent(event));
    return event;
  }
};

export const createEventThunk = (eventData) => async (dispatch) => {
  const response = await csrfFetch('/api/events', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(eventData),
  });

  if (response.ok) {
    const newEvent = await response.json();
    dispatch(createEvent(newEvent));
    return newEvent;
  }
};

export const updateEventThunk = (eventData, eventId) => async (dispatch) => {
  const response = await csrfFetch(`/api/events/${eventId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(eventData),
  });

  if (response.ok) {
    const updatedEvent = await response.json();
    dispatch(updateEvent(updatedEvent));
    return updatedEvent;
  }
};

export const deleteEventThunk = (eventId) => async (dispatch) => {
  const response = await csrfFetch(`/api/events/${eventId}`, {
    method: 'DELETE',
  });

  if (response.ok) {
    dispatch(deleteEvent(eventId));
    return eventId;
  }
};

// Initial State
const initialState = {
  allEvents: {},
  singleEvent: null,
};

// Reducer
const eventsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_EVENTS: {
      const newState = { ...state, allEvents: {} };
      if (Array.isArray(action.events)) {
        action.events.forEach((event) => {
          newState.allEvents[event.id] = event;
        });
      }
      return newState;
    }
    case GET_SINGLE_EVENT: {
      return { ...state, singleEvent: action.event };
    }
    case CREATE_EVENT: {
      return {
        ...state,
        allEvents: { ...state.allEvents, [action.event.id]: action.event },
      };
    }
    case UPDATE_EVENT: {
      return {
        ...state,
        allEvents: { ...state.allEvents, [action.event.id]: action.event },
      };
    }
    case DELETE_EVENT: {
      const newState = { ...state, allEvents: { ...state.allEvents } };
      delete newState.allEvents[action.eventId];
      return newState;
    }
    default:
      return state;
  }
};

export default eventsReducer;