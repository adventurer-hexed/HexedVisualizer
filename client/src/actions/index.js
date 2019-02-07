import { SIGN_IN, SIGN_OUT, PLAY_STATE_ON, PLAY_STATE_OFF } from "./types";
import axios from "axios";
import history from "../history";


export const signIn = id => async dispatch => {
    getUser();
};


export const signOut = () => async dispatch => {
    const res = await axios.get("/api/logout");
    dispatch({ type: SIGN_OUT, payload: res.data });
    history.push("/login");
};



export const getUser = () => async dispatch => {
    const res = await axios.get("/current_user");
    if (res.data.id) {
        dispatch({
            type: SIGN_IN,
            payload: { isSignedIn: true, id: res.data.id, accessToken: res.data.spotifyAccessToken }
        });
        history.push("/");
    } else {
        history.push("/login");
    }
};




export const playPlayback = () => async (dispatch, getState) => {
    if(!getState().playState.isPlayState) {
        await axios.put("/api/play-playback",{something:"nothinghere"})
        dispatch({type:PLAY_STATE_ON, payload: true})
    }
}

export const stopPlayback = () => async (dispatch, getState) => {
    if(getState().playState.isPlayState) {
        await axios.put("/api/pause-playblack", {something: "nothing here"})
        dispatch({type:PLAY_STATE_OFF, payload: false})
    }
}
