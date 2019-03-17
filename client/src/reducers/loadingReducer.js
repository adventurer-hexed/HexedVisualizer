import { LOADING_ON, LOADING_OFF } from '../actions/types';

const INITIAL_STATE = false;
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOADING_ON:
      return true;

    case LOADING_OFF:
      return false;

    default:
      return state;
  }
};
