const express = require('express'),
    router = express.Router(),
    { spotifyClientID, spotifySecret } = require("../../config/keys"),
    spotifyTokenVerification = require("../../middlewares/spotifyRefreshToken"),
    ensureAuth = require("../../middlewares/ensureAuth"),
    axios = require('axios'),
    { fetchSongAnalysis, 
      pausePlayersPlayback, 
      playPlayersPlayback, 
      seekPlayerPosition,
      fetchUserCurrentPlayback,
      fetchUsersAvailableDevices,
      searchAll } = require("./controllers/spotifyContoller")


router.get("/api/fetch-curr-playback", ensureAuth, spotifyTokenVerification, fetchUserCurrentPlayback)
router.get('/api/get-song-analysis/:songid', ensureAuth, spotifyTokenVerification, fetchSongAnalysis)
router.get("/api/available-devices", ensureAuth, spotifyTokenVerification,fetchUsersAvailableDevices)
router.get("/api/search/:searchterms", ensureAuth, spotifyTokenVerification,searchAll)

router.put("/api/pause-playblack", ensureAuth, spotifyTokenVerification, pausePlayersPlayback);
router.put("/api/play-playback", ensureAuth, spotifyTokenVerification, playPlayersPlayback);

router.put("/api/seek-player-position", ensureAuth, spotifyTokenVerification, seekPlayerPosition);
module.exports = router;