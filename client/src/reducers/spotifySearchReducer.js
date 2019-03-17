import { FETCH_SEARCH_RESULTS } from '../actions/types';

export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_SEARCH_RESULTS:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
