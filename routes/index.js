const router = require('express').Router();
const spotifyAuthRoute = require('./spotifyAuthRoute');
const spotifyApiRoutes = require('./spotifyApiRoutes');

router.use(spotifyAuthRoute);
router.use(spotifyApiRoutes);

module.exports = router;
