import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootSagas from '.';
import reducer from '../reducers';

let store;

export function initializeStore(initialState) {
  const sagaMiddleware = createSagaMiddleware();

  if (typeof store === 'undefined') {
    store = createStore(reducer, initialState, applyMiddleware(sagaMiddleware));
    sagaMiddleware.run(rootSagas, { ...store });
  }

  return store;
}

export function returnStore() {
  return store;
}
