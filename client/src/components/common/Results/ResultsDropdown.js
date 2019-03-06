import React, { Component } from "react"
import "./ResultsDropdown.css"

class ResultsDropdown extends Component {
    generateCards = () => {
        const { results, playSong } = this.props

        return results.tracks.items.map((song, i) => {
            return (
                <li className="resultItem"
                    key={i}
                    onClick={
                        (event) => {
                            playSong(song.uri, song.id)
                        }
                    }>

                    <div className="songImage">
                        <img src={song.album.images[2].url} alt="Album Cover" />
                    </div>
                    <div className="songInfo">
                        <div className="songName">
                            Title: {song.name}
                        </div>
                        <div className="songArtist">
                            Artist: {song.artists.reduce((out, artist) => {
                                if (out === "") {
                                    return artist.name
                                }
                                return out += `, ${artist.name}`
                            }, "")}
                        </div>
                    </div>
                </li>
            )
        })
    }
    render() {
        let { results } = this.props
        return (
            (results.tracks) ?
                <ul className="searchResults">
                    {this.generateCards()}
                </ul>
                : ""
        )
    }
}

export default ResultsDropdown