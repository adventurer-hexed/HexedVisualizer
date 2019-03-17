import {
  INCREMENT_DEVICE_STATE_COUNTER,
  ZERO_DEVICE_STATE_COUNTER,
} from '../actions/types';

const INITIAL_STATE = {
  counter: 0,
};
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case INCREMENT_DEVICE_STATE_COUNTER:
      return { ...state, counter: (state.counter += 1) };

    case ZERO_DEVICE_STATE_COUNTER:
      return { ...state, counter: 0 };

    default:
      return state;
  }
};
