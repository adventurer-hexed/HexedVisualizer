import { UPDATE_CURR_DEVICE_ID } from '../actions/types';

export default (state = { id: '' }, action) => {
  switch (action.type) {
    case UPDATE_CURR_DEVICE_ID:
      return { ...state, id: action.payload };

    default:
      return state;
  }
};
