const axios = require("axios")
const applyHeader = (token) => ({ headers: {Authorization: `Bearer ${token}`} })
const querystring = require('querystring');

module.exports = {
    async fetchSongAnalysis(req, res) {
        try {
            const response = await axios.get(`https://api.spotify.com/v1/audio-analysis/${req.params.songid}`, 
            applyHeader(req.user.spotifyAccessToken))
            res.status(200).json(response.data)
        } catch(e) {
            res.status(401).json({err:e})
        }
    },

    async pausePlayersPlayback(req, res) {
        try {
            await axios.put("https://api.spotify.com/v1/me/player/pause",{}, applyHeader(req.user.spotifyAccessToken))
            res.status(200).json({success:"Successfully paused"})
        } catch(e) {
            // console.log(e)
            res.status(401).json({err: "Unauthorized"})
        }
    },
    
    async playPlayersPlayback(req, res) {
        try {
            await axios.put(`https://api.spotify.com/v1/me/player/play?device_id=${req.query.deviceid}`,(req.body.uris)?{uris: JSON.parse(req.body.uris)}: {}, applyHeader(req.user.spotifyAccessToken))
            res.status(200).json({success:"Successfully played"})
        } catch(e) {
            // console.log(e)
            res.status(401).json({err: "Unauthorized"})
        }
    },    
    
    async playPlayersPlaybackSpecific(req, res) {
        try {
            await axios.put("https://api.spotify.com/v1/me/player/play",{}, applyHeader(req.user.spotifyAccessToken))
            res.status(200).json({success:"Successfully played"})
        } catch(e) {
            // console.log(e)
            res.status(401).json({err: "Unauthorized"})
        }
    },

    async fetchUserCurrentPlayback(req, res) {
      try {
        const response = await axios.get("https://api.spotify.com/v1/me/player/currently-playing", applyHeader(req.user.spotifyAccessToken))
        res.status(200).json(response.data)
      }  catch(e) {
        //   console.log(e)
          res.status(401).json({err:"Unauthorized"})
      }
    },

    async seekPlayerPosition(req, res) {
        try {
            await axios.put(`https://api.spotify.com/v1/me/player/seek?position_ms=${req.body.time}`,{},
            applyHeader(req.user.spotifyAccessToken))
            res.status(200).json({msg:"Success"})

        } catch(e) {
            res.status(401).json({err: "Failed to relay song"})
        }
    },

    async fetchUsersAvailableDevices(req, res) {
        try {
            const response = await axios.get("https://api.spotify.com/v1/me/player/devices", applyHeader(req.user.spotifyAccessToken))
            res.status(200).json(response.data)
        } catch(e) {
            res.status(401).json({err: "Failed to fetch users devices"})
        }
    },

    async searchAll(req, res) {
        try {
            const response = await axios.get(`https://api.spotify.com/v1/search?q=${req.params.searchterms}&type=album,artist,playlist,track&limit=10`, applyHeader(req.user.spotifyAccessToken))
            res.status(200).json(response.data)
        } catch(e) {
            res.status(401).json({err: "Failed to find results for your search terms"})
        }
    }
}
