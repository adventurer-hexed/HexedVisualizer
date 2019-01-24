const router = require("express").Router();
const path = require("path");
const spotifyAuthRoute = require("./spotifyAuthRoute");

router.use(spotifyAuthRoute);

router.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
});

module.exports = router;
