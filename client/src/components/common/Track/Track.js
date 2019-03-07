import React, { Component } from "react"
import "./Track.css"
class Track extends Component {

    artistManip = (out, artist) => {
        if(out === "") return artist.name
        return out += `, ${artist.name}`
    }
    
    generateCards = () => {
        const { results, playSong } = this.props
        return results.items.map((song)=>{
            return(
                <div key={song.track.id} className="track_object">
                    <div 
                        className="track_item" 
                        style={{backgroundImage: `url('${song.track.album.images[0].url}')`}}
                        onClick={ () => playSong(song.track.uri, song.track.id) }
                    >
                    </div>
                    <div className="track_info">
                        <p className="track_name">
                            {song.track.name}
                        </p>
                        <p className="track_artist">
                            {song.track.artists.reduce(this.artistManip, "")}
                        </p>
                    </div>
                </div>
            )
        })
    }
    render() {
        let { results } = this.props
        return(
            (results.items)
            ?
            <div className="track_container">
                {this.generateCards()}
            </div>
            : ""
        )
    }
}

export default Track

