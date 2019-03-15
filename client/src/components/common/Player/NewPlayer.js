import React, { Component } from 'react'
import { connect } from "react-redux"
import { playPlayback, stopPlayback, updateProgress, fetchCurrPlayback, seekProgressPlayback, updateVolume } from "../../../actions"
import { FaBackward, FaForward, FaPlay, FaPause, FaVolume } from 'react-icons/fa'
import './Player.css'

class Player extends Component {
    constructor() {
        super()
        this.state = {
            inc: 0,
            volume: 100
        }
    }

    handleProgressMouseDown = ( event ) => {
        clearInterval(this._progressInterval)
    }

    handleProgressDrag = ( event ) => {
        let newProgress = event.target.value
        this.setState({inc: newProgress})
    }

    handleProgressMouseUp = ( event ) => {
        let newProgress = event.target.value
        this.setState({inc: newProgress})
        this.playSongProgression()
        this.props.seekProgressPlayback( newProgress )
    }

    handleVolumeChange = ( event ) => {
        let newVolume = event.target.value
        this.setState({volume: newVolume})
    }

    handleVolumeRelease = ( event ) => {
        let newVolume = event.target.value
        this.setState({volume: newVolume})
        this.props.updateVolume(newVolume)
    }

    handlePlayButtonClick = ( event ) => {
        if ( this.props.isPlayback ) {
            clearInterval( this._progressInterval )
            this.props.fetchCurrPlayback()
            this.props.stopPlayback()
        } else {
            this.props.fetchCurrPlayback()
            this.props.playPlayback( false )
            this.playSongProgression()
        }
    }

    playSongProgression = () => {
        let start = new Date().getTime();
        this._progressInterval = setInterval( () => {
            let now = new Date().getTime();
            var curr = this.props.currentTime
            this.setState( {
                inc: ( ( curr + ( now - start ) ) )
            } )
        }, 1 );
    }


    componentWillUnmount () {
        clearInterval( this._progressInterval )
    }

    componentDidMount () {
        clearInterval( this._progressInterval )
        if ( this.props.isPlayback ) {
            this.props.fetchCurrPlayback()
            this.playSongProgression()
        }
    }

    render () {
        let { albumCover, songName, artistName, isPlayback, totalTime, currentVolume } = this.props
        return (
            <div className="player_container">
                <div className="player">
                    <div className="playbackInfo">
                        <div className="songImage">
                            {( albumCover ) ? <img src={albumCover} className="albumCover" alt="Album Cover" /> : null}
                        </div>
                        <div className="songInfo">
                            <div className="songName">{songName}</div>
                            <div className="songArtist">{artistName}</div>
                        </div>
                    </div>
                    <div className="playbackControls">
                        <div className="lastButton"><FaBackward /></div>
                        <div className="playButton" onClick={this.handlePlayButtonClick}>{( isPlayback ) ? <FaPause /> : <FaPlay />}</div>
                        <div className="nextButton"><FaForward /></div>
                        <div className="progress">
                            <input
                                className="slider"
                                type="range"
                                min="0"
                                max={totalTime}
                                onMouseDown={this.handleProgressMouseDown}
                                onMouseUp={this.handleProgressMouseUp}
                                onChange={this.handleProgressDrag}
                                value={this.state.inc}
                            />
                        </div>
                    </div>
                    <div className="volume">

                        <FaVolume />
                        <input
                            className="slider"
                            type="range"
                            min="0"
                            max="100"
                            value={this.state.volume}
                            onChange={this.handleVolumeChange}
                            onMouseUp={this.handleVolumeRelease}
                        />

                    </div>
                </div >
            </div>
        )
    }
}

const mapStateToProps = ( state ) => {
    if ( state.currSongPlayback.item ) {
        if ( Object.keys( state.currSongPlayback.item ).length > 0 ) {
            return {
                albumCover: state.currSongPlayback.item.album.images[2].url,
                songName: state.currSongPlayback.item.name,
                artistName: state.currSongPlayback.item.artists.reduce( ( out, artist ) => {
                    if ( out === "" ) {
                        out = artist.name
                    } else {
                        out += `, ${artist.name}`
                    }
                    return out
                }, "" ),
                isPlayback: state.playState.isPlayState,
                currentTime: state.currSongPlayback.progress_ms,
                totalTime: state.currSongPlayback.item.duration_ms,
                currSongPlayback: state.currSongPlayback
            }
        }
    }
    return {
        albumCover: null,
        songName: "Unknown",
        artistName: "Unknown",
        isPlayback: state.playState.isPlayState,
        currentTime: 0,
        totalTime: 100,
        currSongPlayback: state.currSongPlayback
    }
};


export default connect( mapStateToProps, {
    playPlayback,
    stopPlayback,
    updateProgress,
    fetchCurrPlayback,
    seekProgressPlayback,
    updateVolume
} )( Player );