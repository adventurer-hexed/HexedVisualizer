import React, { Component } from "react"
import requireAuth from "../HOC/requireAuth"
import SpotifyScript from '../SpotifyScript'
import { connect } from "react-redux"
import { compose } from "redux"
import { playPlayback, stopPlayback, updateProgress, fetchCurrPlayback } from "../../actions"
import { FaPlay, FaPause, FaGrinBeamSweat } from 'react-icons/fa';
import PlayerAudioProgress from "./PlayerAudioProgress"
import Search from "../Search/Search";
import Visualizer from "../Visualizer/Visualizer"

class Player extends Component {

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
        }, 250)
    }

    onProgressChange(e) {
        console.log(e)
    }

    componentWillUnmount() {
        clearInterval(this.progressInterval)
    }

    componentDidMount(){
        if(this.props.isPlayback){
            this.playSongProgression()
        }
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
        let {beats, segments} = this.props.currSongAnalysis;
        return (
            <div>
                <SpotifyScript 
                    token={this.props.auth.accessToken}
                />
                <h1>Home Page</h1>
                <Search />
                { this.renderPlayer() }
                <PlayerAudioProgress />
                <Visualizer 
                    beats={beats}
                    beatAvgLength={
                        (beats) ? beats.reduce((sum, beat)=> sum += (beat.duration*1000), 0) / beats.length : 0
                    }
                    segments={segments}
                    segmentAvgLength={
                        (segments) ? segments.reduce((sum, segment)=> sum += (segment.duration*1000), 0) / segments.length : 0
                    }
                />
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    isPlayback:state.playState.isPlayState, 
    currSongPlayback:state.currSongPlayback,
    currSongAnalysis:state.songAnalysis
})

const enhance = compose(
    requireAuth
)

const EnhancedComponent = connect(mapStateToProps,
     { 
        playPlayback, 
        stopPlayback,
        updateProgress,
        fetchCurrPlayback 
    })(Player)

export default enhance(EnhancedComponent)
