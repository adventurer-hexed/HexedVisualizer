import React, { Component } from 'react'
import {FaBackward, FaForward, FaPlay, FaPause} from 'react-icons/fa'

class Player extends Component {

    render() {
        let {albumCover, songName, artistName, isPlayback, currentTime, totalTime, currentVolume, playPlayback, stopPlayback, fetchCurrPlayback, updateProgress, currSongPlayback, updateVolume} = this.props
        return (
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
                    <div className="playButton">{(isPlayback) ? <FaPause /> : <FaPlay />}</div>
                    <div className="nextButton"><FaForward /></div>
                    <div className="progress">
                        <input type="range" min="0" max={totalTime} value={currentTime} class="slider" />
                    </div>
                    <div className="volume">
                        <i className="fas fa-volume-up"></i>
                        <input type="range" min="1" max="100" value={currentVolume} className="slider" />
                    </div>
                </div>
            </div>
                    )
                }
            }
            
export default Player;