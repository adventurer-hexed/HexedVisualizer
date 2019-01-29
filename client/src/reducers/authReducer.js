import { SIGN_IN, SIGN_OUT } from "../actions/types";
const INITIAL_STATE = {
    isSignedIn: false,
    id: ""
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SIGN_IN:
            return {
                ...state,
                ...action.payload
            };

        case SIGN_OUT:
            return { ...state, ...action.payload };

        default:
            return state;
    }
};
