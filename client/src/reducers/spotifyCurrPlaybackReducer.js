import {
  FETCH_CURR_PLAYBACK,
  CURRENT_PROGRESS,
  SEEK_PLAYER_PROGRESS,
  ZERO_CURR_PLAYBACK,
} from '../actions/types';

export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_CURR_PLAYBACK:
      return { ...state, ...action.payload };

    case CURRENT_PROGRESS:
      return { ...state, currentDuration: action.payload };

    case SEEK_PLAYER_PROGRESS:
      return { ...state, currentDuration: action.payload };

    case ZERO_CURR_PLAYBACK:
      return {};

    default:
      return state;
  }
};
