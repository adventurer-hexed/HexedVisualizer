import React, { Component } from 'react'
import { connect } from "react-redux"
import { playPlayback, stopPlayback, updateProgress, fetchCurrPlayback, seekProgressPlayback } from "../../actions"
import { FaBackward, FaForward, FaPlay, FaPause, FaVolume } from 'react-icons/fa'
import './Player.css'

class Player extends Component {

    handleProgressChange = (event) => {
        let newProgress = event.target.value
        this.props.seekProgressPlayback(newProgress)
    }

    handleVolumeChange = (event) => {
        let newVolume = event.target.value
        console.log(newVolume)
    }

    handlePlayButtonClick = (event) => {
        if (this.props.isPlayback) {
            clearInterval(this.progressInterval)
            this.props.stopPlayback()
        }
        this.props.playPlayback()
        this.playSongProgression()
    }

    playSongProgression = () => {
        this.progressInterval = setInterval(() => {
            this.props.fetchCurrPlayback()
            if (this.props.currSongPlayback) {
                if (Object.keys(this.props.currSongPlayback).length > 0) {
                    const progressMs = this.props.currSongPlayback.progress_ms
                    const durMs = this.props.currSongPlayback.item.duration_ms
                    this.props.updateProgress(progressMs / durMs * 100)
                }
            }
        }, 250)
    }

    componentWillUnmount() {
        clearInterval(this.progressInterval)
    }

    componentDidMount() {
        this.playSongProgression()
    }

    render() {
        let { albumCover, songName, artistName, isPlayback, currentTime, totalTime, currentVolume } = this.props
        return (
            <div className="player_container">
                <div className="player">
                    <div className="playbackInfo">
                        <div className="songImage">
                            {(albumCover) ? <img src={albumCover} className="albumCover" alt="Album Cover" /> : null}
                        </div>
                        <div className="songInfo">
                            <div className="songName">{songName}</div>
                            <div className="songArtist">{artistName}</div>
                        </div>
                    </div>
                    <div className="playbackControls">
                        <div className="lastButton"><FaBackward /></div>
                        <div className="playButton" onClick={this.handlePlayButtonClick}>{(isPlayback) ? <FaPause /> : <FaPlay />}</div>
                        <div className="nextButton"><FaForward /></div>
                        <div className="progress">
                            <input type="range" min="0" max={totalTime} value={currentTime} className="slider" onChange={this.handleProgressChange} />
                        </div>
                    </div>
                    <div className="volume">
                        <FaVolume />
                        <input type="range" min="0" max="100" value={currentVolume} className="slider" onChange={this.handleVolumeChange} />
                    </div>
                </div >
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    if (Object.keys(state.currSongPlayback).length > 0) {
        return {
            albumCover: state.currSongPlayback.item.album.images[2].url,
            songName: state.currSongPlayback.item.name,
            artistName: state.currSongPlayback.item.artists.reduce((out, artist) => {
                if(out === ""){
                    out = artist.name
                }else{
                    out += `, ${artist.name}`
                }
                return out
            }, ""),
            isPlayback: state.playState.isPlayState,
            currentTime: state.currSongPlayback.progress_ms,
            totalTime: state.currSongPlayback.item.duration_ms,
            currentVolume: 100
        }
    }
    return {
        albumCover: null,
        songName: "Unknown",
        artistName: "Unknown",
        isPlayback: state.playState.isPlayState,
        currentTime: 0,
        totalTime: 100,
        currentVolume: 100,
        currSongPlayback: state.currSongPlayback
    }
};


export default connect(mapStateToProps, {
    playPlayback,
    stopPlayback,
    updateProgress,
    fetchCurrPlayback,
    seekProgressPlayback
})(Player);