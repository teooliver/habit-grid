import { createStore, applyMiddleware } from 'redux';
import thunk, { ThunkMiddleware } from 'redux-thunk';
import { reducers, StoreState } from './reducers';
import { Actions } from './actions';
import { logger } from '../utils/redux-logger';

const initialState = {};
const middleWares = [thunk as ThunkMiddleware<StoreState, Actions>];

if (process.env.NODE_ENV !== 'production') {
  middleWares.push(logger);
}

export const store = createStore(
  reducers,
  initialState,
  applyMiddleware(...middleWares)
);
