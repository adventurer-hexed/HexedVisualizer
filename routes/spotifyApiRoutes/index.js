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
      fetchUserCurrentPlayback } = require("./controllers/spotifyContoller")


router.get("/api/fetch-curr-playback", ensureAuth, spotifyTokenVerification, fetchUserCurrentPlayback)
router.get('/api/get-song-analysis', ensureAuth, spotifyTokenVerification, fetchSongAnalysis);

router.put("/api/pause-playblack", ensureAuth, spotifyTokenVerification, pausePlayersPlayback);
router.put("/api/play-playback", ensureAuth, spotifyTokenVerification, playPlayersPlayback);

router.put("/api/seek-player-position", ensureAuth, spotifyTokenVerification, seekPlayerPosition);
module.exports = router;