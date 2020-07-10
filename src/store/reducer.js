import { combineReducers } from 'redux';

const INITIAL_STATE = {
  counter: 0,
};

function appReducer(state = INITIAL_STATE, { type, payload }) {
  switch (type) {
    case 'ADD':
      return {
        ...state,
        counter: state.counter + payload.count,
      };
    default:
      return state;
  }
}

const baseReducers = {
  app: appReducer,
};

const reducer = combineReducers(baseReducers);

export default reducer;
