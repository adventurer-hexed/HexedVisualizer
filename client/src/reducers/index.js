import { combineReducers } from "redux";
import authReducer from "./authReducer";
import spotifyPlayerReducer from "./spotifyPlayerReducer";
import spotifySongReducer from "./spotifySongReducer";
import spotifyCurrPlaybackReducer from "./spotifyCurrPlaybackReducer";

export default combineReducers({
    auth: authReducer,
    playState: spotifyPlayerReducer,
    songAnalysis: spotifySongReducer,
    currSongPlayback: spotifyCurrPlaybackReducer
});
