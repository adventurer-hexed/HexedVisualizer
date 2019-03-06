import { SEARCH_CHANGE } from "../actions/types"

const INITIAL_STATE = { chars: "" }
export default (state=INITIAL_STATE, action) => {
    switch(action.type) {
        case SEARCH_CHANGE:
            return { ...state, chars: action.payload }
        
        default:
            return state;
    }
}