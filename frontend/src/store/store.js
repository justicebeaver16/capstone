import { legacy_createStore as createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { thunk } from 'redux-thunk';
import sessionReducer from './slices/sessionReducer';
import eventsReducer from './slices/eventsSlice';
import guestsReducer from './slices/guestsSlice';
import vendorsReducer from './slices/vendorsSlice';
import seatingReducer from './slices/seatingSlice';

// Reducers
const rootReducer = combineReducers({
  session: sessionReducer,
  events: eventsReducer,
  guests: guestsReducer,
  vendors: vendorsReducer,
  seating: seatingReducer,
});

let enhancer;
if (import.meta.env.MODE === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = (await import('redux-logger')).default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;