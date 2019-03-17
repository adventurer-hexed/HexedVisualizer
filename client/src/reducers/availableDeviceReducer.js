import _ from 'lodash';
import { FETCH_AVAILABLE_DEVICES } from '../actions/types';

const INITIAL_STATE = {
  Visualizer: {
    is_active: false,
  },
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_AVAILABLE_DEVICES:
      return { ...state, ..._.mapKeys(action.payload.devices, 'name') };

    default:
      return state;
  }
};
