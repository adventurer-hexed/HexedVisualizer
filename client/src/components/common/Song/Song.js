import React from "react"
import "./Song.css"
export default ({song, artist, album, timestamp}) => (
    <div className="song_container">
        <div className="song_text">
            <p>{song}</p>
        </div>

        <div className="song_artist_text">
            <p>{artist}</p>
        </div>

        <div className="song_album_text">
            <p>album</p>
        </div>

        <div className="song_time_text">
            <p>{timestamp}</p>
        </div>

    </div>
)