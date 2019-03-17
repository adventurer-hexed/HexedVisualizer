import { PLAY_STATE_ON, PLAY_STATE_OFF } from '../actions/types';

const INITIAL_STATE = {
  isPlayState: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case PLAY_STATE_ON:
      return { ...state, isPlayState: action.payload };

    case PLAY_STATE_OFF:
      return { ...state, isPlayState: action.payload };

    default:
      return state;
  }
};
