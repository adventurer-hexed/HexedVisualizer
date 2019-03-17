import { FETCH_SONG_ANALYSIS, ZERO_ANALYSIS } from '../actions/types';

export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_SONG_ANALYSIS:
      return { ...state, ...action.payload };

    case ZERO_ANALYSIS:
      return {};

    default:
      return state;
  }
};
