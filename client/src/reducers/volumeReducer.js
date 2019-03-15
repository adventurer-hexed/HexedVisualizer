import { UPDATE_VOLUME } from "../actions/types"

export default (state={}, action) => {
    switch(action.type) {
        case UPDATE_VOLUME:
            return { ...state, level: action.payload }
        default: 
            return state;
    }
}