import React from "react"
import CompleteRipple from "./vis_one/CompleteRipple"
import music from "./music.json"
import { connect } from "react-redux"
import { playPlayback, fetchAnalysis, fetchCurrPlayback, deviceStateListener } from "../../../actions"

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
    }

    render() {
        document.title = `Hexed | Visualizer | ${(this.props.currSongPlayback.item) ? this.props.currSongPlayback.item.name : ''
            }`
        return (
            <div>
                <canvas style={{ background: "black" }} ref={this._canvas} />
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
    if (Object.values(state.songAnalysis).length > 0) {
        beats = state.songAnalysis.beats
        tatums = state.songAnalysis.tatums
        sections = state.songAnalysis.sections
    }

    if (Object.values(state.currSongPlayback).length > 0) {
        isPlayback = state.playState.isPlayState
    }

    if (Object.values(state.deviceState).length > 0) {
        progress = state.deviceState.position
        total_dur = state.deviceState.duration
        // ms = state.deviceState.ms
    }
    // if(Object.values(state.currSongPlayback).length > 0) {
    //     // total_dur = state.currSongPlayback.item.duration_ms
    // } 

    return {
        progress,
        beats,
        tatums,
        sections,
        isPlayback,
        total_dur,
        deviceCounter: state.deviceCounter.counter,
        currSongPlayback: state.currSongPlayback
    }
}
export default connect(mapStateToProps, { fetchCurrPlayback, playPlayback, fetchAnalysis, deviceStateListener })(Visualizer)