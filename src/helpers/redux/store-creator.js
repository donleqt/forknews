import {createStore, applyMiddleware, combineReducers, bindActionCreators} from 'redux'
import thunk from 'redux-thunk'
import logger from './redux-logger'
import {config} from '../../config/config';

export function createAppStore(rootReducer, actionList) {
  const initialState = (window && window.SERVER_STATE) || {};
  const reducers = combineReducers(rootReducer);
  const middleWares = config.debug ? applyMiddleware(thunk, logger) : applyMiddleware(thunk);
  const store = createStore(reducers, initialState, middleWares);
  store.actions = {};
  Object.entries(actionList).forEach(arr => {
    store.actions[arr[0]] = bindActionCreators(arr[1], store.dispatch);
  });
  return store;
}
