import { applyMiddleware, createStore, combineReducers } from 'redux';
import logger from 'redux-logger';
import reducer from './reducer';

const rootReducer = combineReducers({reducer});

const myStore = createStore(rootReducer, process.env.NODE_ENV !== 'production' ? applyMiddleware(logger) : undefined);

export default () => {
  return myStore;
};
