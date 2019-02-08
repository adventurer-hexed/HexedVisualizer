import React, { Component } from "react";
import SpotifyScript from "../SpotifyScript"
import requireAuth from "../HOC/requireAuth";
import { connect } from "react-redux"
import { playPlayback, stopPlayback, updateProgress, fetchCurrPlayback } from "../../actions"
import { FaPlay, FaPause, FaChessRook } from 'react-icons/fa';
import AudioProgress from "./AudioProgress"

class HomePage extends Component {

    playPlayback = () => {
        this.props.playPlayback()
        this.playSongProgression()
    }

    stopPlayback = () => {
        this.props.stopPlayback()
        console.log("clearing interval before")
        clearInterval(this.progressInterval)
        console.log("clearing interval after")
    }

    playSongProgression() {
        this.progressInterval = setInterval(() => {
            this.props.fetchCurrPlayback()            
            if(Object.keys(this.props.currSongPlayback).length !== 0) {
                const progressMs = this.props.currSongPlayback.progress_ms
                const durMin = this.props.currSongPlayback.item.duration_ms
                this.props.updateProgress(progressMs/durMin * 100)
            }
        }, 1500)
    }

    onProgressChange(e) {
        console.log(e)
    }

    componentWillUnmount() {
        clearInterval(this.progressInterval)
    }

    renderPlayer() {
        const { isPlayback } = this.props
        return (
            <button className="btn_reset" onClick={ isPlayback ? this.stopPlayback : this.playPlayback }>
               { isPlayback
                ? <FaPause size="3em" color="red" />
                : <FaPlay size="3em" color="#4285f4" />
                }
            </button>
        )
    }
    
    
    render() {
        return (
            <div>
                <SpotifyScript 
                    token={this.props.auth.accessToken}
                />

                <h1>Home Page</h1>
                { this.renderPlayer() }
                <AudioProgress />

            </div>
        );
    }
}

const mapStateToProps = (state) => ({isPlayback:state.playState.isPlayState, currSongPlayback:state.currSongPlayback})

export default connect(mapStateToProps, { playPlayback, stopPlayback, updateProgress, fetchCurrPlayback })//(HomePage)
(requireAuth(HomePage));
