import { combineReducers } from "redux";
import authReducer from "./authReducer";
import spotifyPlayerReducer from "./spotifyPlayerReducer";

export default combineReducers({
    auth: authReducer,
    playState: spotifyPlayerReducer
});
