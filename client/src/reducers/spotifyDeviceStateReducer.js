import { DEVICE_STATE_LISTENER } from '../actions/types';

export default (state = {}, action) => {
  switch (action.type) {
    case DEVICE_STATE_LISTENER:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
