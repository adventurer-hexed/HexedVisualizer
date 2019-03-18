import axios from 'axios';
import history from '../history';
import {
  SIGN_IN,
  SIGN_OUT,
  SEARCH_CHANGE,
  PLAY_STATE_ON,
  PLAY_STATE_OFF,
  FETCH_SONG_ANALYSIS,
  FETCH_CURR_PLAYBACK,
  CURRENT_PROGRESS,
  SEEK_PLAYER_PROGRESS,
  DEVICE_STATE_LISTENER,
  FETCH_AVAILABLE_DEVICES,
  UPDATE_CURR_DEVICE_ID,
  FETCH_SEARCH_RESULTS,
  INCREMENT_DEVICE_STATE_COUNTER,
  ZERO_CURR_PLAYBACK,
  ZERO_DEVICE_STATE_COUNTER,
  FETCH_RECENTLY_PLAYED,
  ZERO_ANALYSIS,
  CURR_URI,
  LOADING_OFF,
  LOADING_ON,
  UPDATE_VOLUME
} from './types';

export const signIn = id => async dispatch => {
  getUser();
};

export const signOut = () => async dispatch => {
  const res = await axios.get('/api/logout');
  dispatch({ type: SIGN_OUT, payload: res.data });
  history.push('/login');
};

export const searchChange = char => ({ type: SEARCH_CHANGE, payload: char });

export const getUser = path => async (dispatch, getState) => {
  try {
    const res = await axios.get('/current_user');
    dispatch({
      type: SIGN_IN,
      payload: {
        isSignedIn: true,
        id: res.data.id,
        accessToken: res.data.spotifyAccessToken,
      },
    });
    history.push(path);
  } catch (e) {
    history.push('/login');
  }
};

export const fetchAvailableDevices = () => async dispatch => {
  const res = await axios.get('/api/available-devices');
  dispatch({ type: FETCH_AVAILABLE_DEVICES, payload: res.data });
};

export const fetchCurrPlayback = () => async dispatch => {
  const res = await axios.get('/api/fetch-curr-playback');
  dispatch({ type: FETCH_CURR_PLAYBACK, payload: res.data });
};

export const fetchAnalysis = currentSongID => async (dispatch, getState) => {
  const res = await axios.get(`/api/get-song-analysis/${currentSongID}`);
  dispatch({ type: FETCH_SONG_ANALYSIS, payload: res.data });
};

export const playPlayback = (triggerLoading, songURI, songId) => async (
  dispatch,
  getState
) => {
  if (!getState().playState.isPlayState || songURI) {
    dispatch({ type: ZERO_ANALYSIS });
    if (triggerLoading) {
      dispatch({ type: LOADING_ON });
    }
    if (songId) {
      const res = await axios.get(`/api/get-song-analysis/${songId}`);
      dispatch({ type: FETCH_SONG_ANALYSIS, payload: res.data });
    }
    await axios.put(
      `/api/play-playback?deviceid=${getState().device.id}`,
      songURI ? { uris: JSON.stringify([songURI]) } : {}
    );
    dispatch(fetchCurrPlayback());
    if(songURI) {
      dispatch(updateCurrSongInfo({ URI: songURI, songId }));
    }
    dispatch({ type: PLAY_STATE_ON, payload: true });
  }
};

export const stopPlayback = () => async (dispatch, getState) => {
  if (getState().playState.isPlayState) {
    await axios.put('/api/pause-playblack', { something: 'nothing here' });
    dispatch({ type: PLAY_STATE_OFF, payload: false });
  }
};

export const updateProgress = ms => ({ type: CURRENT_PROGRESS, payload: ms });

export const seekProgressPlayback = ms => async dispatch => {
  await axios.put('/api/seek-player-position', { time: ms });
  dispatch({ type: SEEK_PLAYER_PROGRESS, payload: ms });
  dispatch(fetchCurrPlayback());
};

export const updateCurrentDeviceId = id => ({
  type: UPDATE_CURR_DEVICE_ID,
  payload: id,
});

export const fetchSearchResults = searchterms => async dispatch => {
  const res = await axios.get(`/api/search/${encodeURIComponent(searchterms)}`);
  dispatch({ type: FETCH_SEARCH_RESULTS, payload: res.data });
};

export const deviceStateListener = deviceState => (dispatch, getState) => {
  if (Object.values(getState().deviceState).length <= 0) {
    dispatch({ type: DEVICE_STATE_LISTENER, payload: deviceState });
  }

  if (deviceState.position === 0 && !deviceState.paused) {
    dispatch({ type: INCREMENT_DEVICE_STATE_COUNTER });
    if (getState().deviceCounter.counter >= 2) {
      dispatch(fetchCurrPlayback());
      dispatch({ type: ZERO_DEVICE_STATE_COUNTER });
      dispatch({ type: LOADING_OFF });

      history.push('/visualizer');
    }
  }
};

export const zeroDeviceStateCounter = () => ({
  type: ZERO_DEVICE_STATE_COUNTER,
});

export const zeroPlayBack = () => ({ type: ZERO_CURR_PLAYBACK });

export const getRecentlyPlayed = () => async dispatch => {
  try {
    const res = await axios.get(`/api/get-recent`);
    dispatch({ type: FETCH_RECENTLY_PLAYED, payload: res.data });
  } catch (e) {
    console.log(e);
  }
};

export const updateCurrSongInfo = songInfo => ({
  type: CURR_URI,
  payload: songInfo,
});

export const updateVolume = newVolume => async (dispatch, getState) => {
  try {
    await axios.put(`/api/update-volume`, {
      newVolume,
      deviceid: getState().device.id,
    });
    dispatch({ type: UPDATE_VOLUME, payload: newVolume });
  } catch (e) {
    console.log(e);
  }
};
