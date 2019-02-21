import React, { Component } from "react"

class ResultsMenu extends Component{
    generateCards = ()=>{
        const {results, playSong} = this.props

        return results.tracks.items.map((song, i)=>{
            return(
                <li className="resultItem" 
                    key={i}
                    onClick={
                        (event)=>{
                            console.log(song.uri)
                            playSong(song.uri)
                        }
                }>
                    <div className="songName">
                        Title: {song.name}
                    </div>
                    <div className="songArtist">
                        Artist: {song.artists.reduce((out, artist)=>{
                            if(out === ""){
                                return artist.name
                            }
                            return out += `, ${artist.name}`
                        }, "")}
                    </div>
                </li>
            )
        })
    }
    render(){
        let { results } = this.props
        return(
            (results.tracks)?
            <ul className="searchResults">
                {this.generateCards()}
            </ul>
            : ""
        )
    }
}

export default ResultsMenu