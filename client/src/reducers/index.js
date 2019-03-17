import { combineReducers } from 'redux';
import authReducer from './authReducer';
import spotifyPlayerReducer from './spotifyPlayerReducer';
import spotifySongReducer from './spotifySongReducer';
import spotifyCurrPlaybackReducer from './spotifyCurrPlaybackReducer';
import spotifyDeviceStateReducer from './spotifyDeviceStateReducer';
import availableDeviceReducer from './availableDeviceReducer';
import spotifyCurrIdReducer from './spotifyCurrIdReducer';
import spotifySearchReducer from './spotifySearchReducer';
import deviceListener from './deviceListener';
import deviceStateConter from './deviceStateConter';
import spotifyRecentlyPlayedReducer from './spotifyRecentlyPlayedReducer';
import spotifyCurrInfo from './spotifyCurrInfo';
import searchChange from './searchChange';
import loadingReducer from './loadingReducer';
import volumeReducer from './volumeReducer';

export default combineReducers({
  auth: authReducer,
  searchText: searchChange,
  playState: spotifyPlayerReducer,
  songAnalysis: spotifySongReducer,
  currSongPlayback: spotifyCurrPlaybackReducer,
  deviceState: spotifyDeviceStateReducer,
  availableDevices: availableDeviceReducer,
  device: spotifyCurrIdReducer,
  searchResults: spotifySearchReducer,
  currDeviceState: deviceListener,
  deviceCounter: deviceStateConter,
  recentlyPlayed: spotifyRecentlyPlayedReducer,
  currSongInfo: spotifyCurrInfo,
  isLoading: loadingReducer,
  volume: volumeReducer,
});
