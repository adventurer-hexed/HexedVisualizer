import { FETCH_SONG_ANALYSIS } from "../actions/types"

export default (state={}, action) => {
    switch(action.type) {
        case FETCH_SONG_ANALYSIS:
            return { ...state, ...action.payload }
        default: 
            return state;
    }
}