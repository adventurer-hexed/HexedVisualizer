const express = require('express'),
    router = express.Router(),
    { spotifyClientID, spotifySecret } = require("../../config/keys"),
    spotifyTokenVerification = require("../../middlewares/spotifyRefreshToken"),
    ensureAuth = require("../../middlewares/ensureAuth"),
    axios = require('axios');

router.get('/api/get-song-analysis',
    ensureAuth,
    spotifyTokenVerification,
    (req, res) => {
        axios.get('https://api.spotify.com/v1/audio-analysis/06AKEBrKUckW0KREUWRnvT', {
            headers: {
                Authorization: `Bearer ${req.user.spotifyAccessToken}`
            }
        })
            .then((data) => {
                res.json(data.data.segments);
            })
            .catch((err) => {
                console.log(err);
                res.send('An error occurred')
            })
    });

module.exports = router;