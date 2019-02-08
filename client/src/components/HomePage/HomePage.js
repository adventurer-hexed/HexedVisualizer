import React, { Component } from "react";
import requireAuth from "../HOC/requireAuth";
import { connect } from "react-redux"
import { compose } from "redux"
import { playPlayback, stopPlayback, updateProgress, fetchCurrPlayback } from "../../actions"
import { FaPlay, FaPause, FaChessRook } from 'react-icons/fa';
import AudioProgress from "./AudioProgress"
import withDevice from "../HOC/withDevice"

class HomePage extends Component {

    playPlayback = () => {
        this.props.playPlayback()
        this.playSongProgression()
    }

    stopPlayback = () => {
        this.props.stopPlayback()
        clearInterval(this.progressInterval)
    }

    playSongProgression() {
        this.progressInterval = setInterval(() => {
            this.props.fetchCurrPlayback()            
            if(Object.keys(this.props.currSongPlayback).length > 0) {
                const progressMs = this.props.currSongPlayback.progress_ms
                const durMs = this.props.currSongPlayback.item.duration_ms
                this.props.updateProgress(progressMs/durMs * 100)
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
                <h1>Home Page</h1>
                { this.renderPlayer() }
                <AudioProgress />
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    isPlayback:state.playState.isPlayState, 
    currSongPlayback:state.currSongPlayback
})

const enhance = compose(
    requireAuth,
    withDevice
)

const EnhancedComponent = connect(mapStateToProps,
     { 
        playPlayback, 
        stopPlayback,
        updateProgress,
        fetchCurrPlayback })(HomePage)

export default enhance(EnhancedComponent)