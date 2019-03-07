import { CURR_URI } from "../actions/types"

const INITIAL_STATE = {
    URI: "",
    songId: ""
}

export default (state=INITIAL_STATE, action) => {
    switch(action.type) {
        case CURR_URI:
            return { ...state, ...action.payload }
        
        default:
            return state;
    }
}