const express = require('express');

const router = express.Router();
const spotifyTokenVerification = require('../../middlewares/spotifyRefreshToken');
const ensureAuth = require('../../middlewares/ensureAuth');
const {
  fetchSongAnalysis,
  pausePlayersPlayback,
  playPlayersPlayback,
  seekPlayerPosition,
  fetchUserCurrentPlayback,
  fetchUsersAvailableDevices,
  searchAll,
  getRecent,
  updateVolume,
} = require('./controllers/spotifyContoller');

router.get(
  '/api/fetch-curr-playback',
  ensureAuth,
  spotifyTokenVerification,
  fetchUserCurrentPlayback
);
router.get(
  '/api/get-song-analysis/:songid',
  ensureAuth,
  spotifyTokenVerification,
  fetchSongAnalysis
);
router.get(
  '/api/available-devices',
  ensureAuth,
  spotifyTokenVerification,
  fetchUsersAvailableDevices
);
router.get(
  '/api/search/:searchterms',
  ensureAuth,
  spotifyTokenVerification,
  searchAll
);
router.get('/api/get-recent', ensureAuth, spotifyTokenVerification, getRecent);

router.put(
  '/api/pause-playblack',
  ensureAuth,
  spotifyTokenVerification,
  pausePlayersPlayback
);
router.put(
  '/api/play-playback',
  ensureAuth,
  spotifyTokenVerification,
  playPlayersPlayback
);

router.put(
  '/api/seek-player-position',
  ensureAuth,
  spotifyTokenVerification,
  seekPlayerPosition
);

router.put(
  '/api/update-volume',
  ensureAuth,
  spotifyTokenVerification,
  updateVolume
);
module.exports = router;
