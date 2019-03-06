import React from "react"
import CompleteRipple from "./vis_one/CompleteRipple"
import { connect } from "react-redux"
import {
    playPlayback,
    fetchCurrPlayback,
    deviceStateListener,
    zeroPlayBack,
    zeroDeviceStateCounter
} from "../../../actions"
import history from "../../../history"
import requreAuth from "../../common/HOC/requireAuth"
import BackBtn from "../../common/BackBtn/BackBtn";

class Visualizer extends React.Component {
    constructor(props) {
        super(props)
        this._canvas = React.createRef()
        this._startingTime = props.progress;
        this._lastTime = null
    }

    componentDidMount() {
        window.addEventListener("resize", this.handleWindowResize)
        this._canvas.current.width = window.innerWidth
        this._canvas.current.height = window.innerHeight
        this._ctx = this._canvas.current.getContext("2d")
        this._completeCircle = new CompleteRipple(
            this._ctx,
            this._canvas.current.width,
            this._canvas.current.height
        )

        this.animate()
    }

    componentWillUnmount() {
        window.cancelAnimationFrame(this._animationFrame)
        window.removeEventListener("resize", this.handleWindowResize)
        this.props.zeroPlayBack()
        this.props.zeroDeviceStateCounter()
    }



    handleWindowResize = (e) => {
        this._canvas.current.width = window.innerWidth
        this._canvas.current.height = window.innerHeight
        this._completeCircle._canvasHeight = this._canvas.current.height
        this._completeCircle._canvasWidth = this._canvas.current.width
    }

    animate = (currentTime) => {
        if (!this._startingTime) this._startingTime = currentTime;
        if (!this._lastTime) this._lastTime = currentTime

        const totalElapsedTime = (currentTime - this._startingTime);
        // this._animationFrame = requestAnimationFrame(this.animate.bind(this))
        // this._ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)


        // this._completeCircle.update(this.state.totalElapsedTime, music.beats, music.tatums)


        this._animationFrame = requestAnimationFrame(this.animate)
        this._ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)
        this._completeCircle.update(
            this.props.progress + (totalElapsedTime),
            this.props.total_dur,
            this.props.beats,
            this.props.tatums,
            this.props.sections
        )

        if (totalElapsedTime >= this.props.total_dur + 10000) {
            window.cancelAnimationFrame(this._animationFrame)
            history.push("/")
            this.props.zeroPlayBack()
            this.props.zeroDeviceStateCounter()
        }
    }

    render() {
        document.title = `${(this.props.currSongPlayback.item) ? this.props.currSongPlayback.item.name : 'No Song Playing'
            } - ${(this.props.currSongPlayback.item) ? this.props.currSongPlayback.item.artists.reduce((final, artist) => {
                return `${final}${(final === '') ? "" : ", "}${artist.name}`
            }, '') : ''
            }`
        return (
            <div style={{ margin: 0, background: "black", padding: 0, position: "relative" }}>
                <canvas style={{ zIndex: 1 }} ref={this._canvas} />
                <BackBtn
                    artist={this.props.artist}
                    song={this.props.songName}
                />
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    let beats = []
    let tatums = []
    let sections = []
    let progress = 0
    let total_dur = 0;
    let isPlayback = false;
    let songName = ""
    let artist = ""

    if (Object.values(state.songAnalysis).length > 0) {
        beats = state.songAnalysis.beats
        tatums = state.songAnalysis.tatums
        sections = state.songAnalysis.sections
    }

    if (Object.values(state.currSongPlayback).length > 0) {
        isPlayback = state.playState.isPlayState
        artist = state.currSongPlayback.item.artists[0].name
        songName = state.currSongPlayback.item.name
    }

    if (Object.values(state.deviceState).length > 0) {
        progress = state.deviceState.position
        total_dur = state.deviceState.duration
    }

    return {
        progress,
        beats,
        tatums,
        sections,
        isPlayback,
        total_dur,
        artist,
        songName,
        deviceCounter: state.deviceCounter.counter,
        currSongPlayback: state.currSongPlayback

    }
}
export default connect(
    mapStateToProps,
    {
        fetchCurrPlayback,
        playPlayback,
        zeroPlayBack,
        zeroDeviceStateCounter,
        deviceStateListener
    })(requreAuth(Visualizer))