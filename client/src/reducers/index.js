import { combineReducers } from "redux";
import authReducer from "./authReducer";

export default combineReducers({
    test: () => 5,
    auth: authReducer
});
