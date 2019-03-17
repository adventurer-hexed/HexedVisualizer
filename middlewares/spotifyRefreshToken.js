const axios = require('axios');
const qs = require('qs');
const { spotifyClientID, spotifySecret } = require('../config/keys');
const db = require('../models');

module.exports = async (req, res, next) => {
  // next()

  const data = qs.stringify({
    grant_type: 'refresh_token',
    refresh_token: req.user.spotifyRefreshToken,
    client_id: spotifyClientID,
    client_secret: spotifySecret,
  });

  const headers = {
    'Content-type': 'application/x-www-form-urlencoded',
  };

  try {
    // Dummy call to test for login
    await axios.get(
      'https://api.spotify.com/v1/artists/0OdUWJ0sBjDrqHygGUXeCF',
      {
        headers: {
          Authorization: `Bearer ${req.user.spotifyAccessToken}`,
        },
      }
    );
    next();
  } catch (e) {
    try {
      const token = await axios.post(
        'https://accounts.spotify.com/api/token',
        data,
        headers
      );

      await db.user.update(
        { spotifyAccessToken: token.data.access_token },
        {
          where: {
            spotifyId: req.user.spotifyId,
          },
        }
      );
      next();
    } catch (err) {
      res.status(402).send('Unauthorized');
      res.redirect('/login');
    }
  }
};
