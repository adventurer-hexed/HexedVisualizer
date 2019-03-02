import React, { Component } from "react"
import "./Track.css"
export default ({song, artist, album, timestamp}) => (
    
    <div className="track_item">
        <img src="http://i.imgur.com/sBcQqxQ.jpg" className="track_image" />
        <div className = 'track_info'>
        <p className="track_name">{song}</p>
        <p className="track_artist">{artist}</p> 
        </div>
    </div>
    
)