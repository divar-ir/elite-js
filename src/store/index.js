import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import { isServerSide, getEnv } from 'src/utils/env';

import rootReducer from './reducer';

const preloadedStateString = isServerSide()
  ? undefined
  : window[getEnv('PRELOADED_STATE_KEY')];
const preLoadedState = typeof preloadedStateString !== 'undefined'
  ? JSON.parse(preloadedStateString)
  : undefined;

const middlewares = [thunk];

export function createNewStore() {
  return createStore(
    rootReducer,
    preLoadedState,
    applyMiddleware(...middlewares),
  );
}

const clientSideStore = createNewStore();

export default clientSideStore;
