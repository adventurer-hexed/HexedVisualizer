const express = require('express'),
    router = express.Router(),
    { spotifyClientID, spotifySecret } = require("../../config/keys"),
    spotifyTokenVerification = require("../../middlewares/spotifyRefreshToken"),
    ensureAuth = require("../../middlewares/ensureAuth"),
    axios = require('axios'),
    { fetchSongAnalysis, pausePlayersPlayback, playPlayersPlayback } = require("./controllers/spotifyContoller")


router.get('/api/get-song-analysis', ensureAuth, spotifyTokenVerification, fetchSongAnalysis);
router.put("/api/pause-playblack", ensureAuth, spotifyTokenVerification, pausePlayersPlayback);
router.put("/api/play-playback", ensureAuth, spotifyTokenVerification, playPlayersPlayback);
module.exports = router;