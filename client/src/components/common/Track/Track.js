import React, { Component } from "react"
import "./Track.css"
class Track extends Component{
    generateCards = ()=>{
        const {results, playSong} = this.props

        return results.items.map((song, i)=>{
            return(
                <div className="track_containe">
                <div className="track_item" style={{backgroundImage: `url('${song.track.album.images[0].url}')`}}
                    key={i}
                    onClick={
                        (event)=>{
                            console.log(song.track.uri)
                            playSong(song.track.uri, song.track.id)
                        }
                }>
                </div>
                <div className="track_info">
                <p className="track_name">
                    {song.track.name}
                </p>
                <p className="track_artist">
                    {song.track.artists.reduce((out, artist)=>{
                        if(out === ""){
                            return artist.name
                        }
                        return out += `, ${artist.name}`
                    }, "")}
                </p>
            </div>
            </div>
            )
        })
    }
    render(){
        let { results } = this.props
        return(
            (results.items)?
            <div className="track_container">
                {this.generateCards()}
            </div>
            : ""
        )
    }
} 

export default Track
    
   