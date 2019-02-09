import axios from "axios";
import history from "../history";
import { SIGN_IN,
        SIGN_OUT,
        PLAY_STATE_ON,
        PLAY_STATE_OFF,
        FETCH_SONG_ANALYSIS,
        FETCH_CURR_PLAYBACK,
        CURRENT_PROGRESS,
        SEEK_PLAYER_PROGRESS,
        DEVICE_STATE_LISTENER  } from "./types";


export const signIn = id => async dispatch => {
    getUser();
};


export const signOut = () => async dispatch => {
    const res = await axios.get("/api/logout");
    dispatch({ type: SIGN_OUT, payload: res.data });
    history.push("/login");
};

export const deviceStateListener = (deviceState) => {
    return {
        type: DEVICE_STATE_LISTENER,
        payload: deviceState
    }
}

export const getUser = () => async dispatch => {
    try {
        const res = await axios.get("/current_user");
        dispatch({
            type: SIGN_IN,
            payload: { isSignedIn: true, id: res.data.id, accessToken: res.data.spotifyAccessToken }
        });
        history.push("/");
    } catch(e) {
        history.push("/login");
    }
};

export const fetchCurrPlayback = () => async dispatch => {
    const res = await axios.get("/api/fetch-curr-playback")
    dispatch({ type:FETCH_CURR_PLAYBACK, payload: res.data })
}

export const fetchAnalysis = () => async dispatch => {
    const res = await axios.get("/api/get-song-analysis")
    dispatch({ type:FETCH_SONG_ANALYSIS, payload:res.data })
}

export const playPlayback = () => async (dispatch, getState) => {
    if(!getState().playState.isPlayState) {
        await axios.put("/api/play-playback",{something:"nothinghere"})
        dispatch({ type:PLAY_STATE_ON, payload: true })
    }
}

export const stopPlayback = () => async (dispatch, getState) => {
    if(getState().playState.isPlayState) {
        await axios.put("/api/pause-playblack", {something: "nothing here"})
        dispatch({ type:PLAY_STATE_OFF, payload: false })

    }
}

export const updateProgress = (ms) => {
    return ({type:CURRENT_PROGRESS, payload:ms})
}

export const seekProgressPlayback = (ms) => async dispatch => {
    await axios.put("/api/seek-player-position", {time:ms})
    dispatch({type:SEEK_PLAYER_PROGRESS, payload:ms})
}