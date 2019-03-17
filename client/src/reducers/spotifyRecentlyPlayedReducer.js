import { FETCH_RECENTLY_PLAYED } from '../actions/types';

export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_RECENTLY_PLAYED:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
