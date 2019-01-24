const passport = require("passport");
const SpotifyStrategy = require("passport-spotify").Strategy;
const { spotifyClientID, spotifySecret } = require("../config/keys");
const uuid = require("uuid/v1");
const refresh = require("passport-oauth2-refresh");
const axios = require("axios");
const db = require("../models");

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser(async (id, done) => {
    const user = await db.user.findOne({ where: { id } });
    done(null, user);
});

passport.use(
    new SpotifyStrategy(
        {
            clientID: spotifyClientID,
            clientSecret: spotifySecret,
            callbackURL: "/auth/spotify/callback"
        },
        async (accessToken, refreshToken, profile, done) => {
            const foundUser = await db.user.findOne({
                where: {
                    spotifyId: profile.id
                }
            });

            if (!foundUser) {
                const newUser = await db.user.create({
                    id: uuid(),
                    spotifyId: profile.id,
                    spotifyAccessToken: accessToken,
                    spotifyRefreshToken: refreshToken
                });
                done(null, newUser);
            } else {
                done(null, foundUser);
            }
        }
    )
);

// refresh.use()
