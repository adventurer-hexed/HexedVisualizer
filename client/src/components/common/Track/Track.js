import React, { Component } from "react"
import "./Track.css"
class Track extends Component{
    generateCards = ()=>{
        const {results, playSong} = this.props

        return results.tracks.items.map((song, i)=>{
            return(
                <div className="track_item" 
                    key={i}
                    onClick={
                        (event)=>{
                            console.log(song.uri)
                            playSong(song.uri, song.id)
                        }
                }>
                <img className="track_image" src={song.album.images[0].url}/>
                <div className="track_info">
                    <p className="track_name">
                        {song.name}
                    </p>
                    <p className="track_artist">
                        {song.artists.reduce((out, artist)=>{
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
            (results.tracks)?
            <div className="track_container">
                {this.generateCards()}
            </div>
            : ""
        )
    }
} 

export default Track
    
   