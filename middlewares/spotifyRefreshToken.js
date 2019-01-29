const axios = require("axios");
const { spotifyClientID, spotifySecret } = require("../config/keys");
const qs = require("qs");
const db = require("../models");

module.exports = async (req, res, next) => {
    const data = qs.stringify({
        grant_type: "refresh_token",
        refresh_token: req.user.spotifyRefreshToken,
        client_id: spotifyClientID,
        client_secret: spotifySecret
    });

    const headers = {
        "Content-type": "application/x-www-form-urlencoded"
    };

    try {
        const token = await axios.post(
            "https://accounts.spotify.com/api/token",
            data,
            headers
        );

        await db.user.update(
            { spotifyAccessToken: token.data.access_token },
            {
                where: {
                    spotifyId: req.user.spotifyId
                }
            }
        );

        next();
    } catch (e) {
        res.status(402).send("Cant log in");
    }
};
