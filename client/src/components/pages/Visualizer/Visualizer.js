import React from "react"
import CompleteRipple from "./vis_one/CompleteRipple"
import music from "./music.json"
import { connect } from "react-redux"

class Visualizer extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            lastTime :null,
            totalElapsedTime :null
        }
        this._canvas = React.createRef()
        this._startingTime = props.progress;
    }

    componentDidMount() {
        document.title = "Visualizer"
        window.addEventListener("resize", this.handleWindowResize)
        this._canvas.current.width = window.innerWidth
        this._canvas.current.height = window.innerHeight
        this._ctx = this._canvas.current.getContext("2d")
        this._completeCircle = new CompleteRipple(this._ctx, this._canvas.current.width, this._canvas.current.height)

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
        if(!this._startingTime) this._startingTime = currentTime;
        if(!this.state.lastTime) this.state.lastTime = currentTime

        this.state.totalElapsedTime = (currentTime - this._startingTime);
        this._animationFrame = requestAnimationFrame(this.animate.bind(this))
        this._ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)

        
        this._completeCircle.update(this.state.totalElapsedTime, music.beats, music.tatums)
        

        // requestAnimationFrame(this.animate.bind(this))
        // this._ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)
        // this._completeCircle.update(this.props.progress, this.props.beats, this.props.tatums)


    }




        
    render() {
        return (
            <div>
                <canvas style={{background:"black"}} ref={this._canvas} />
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    let beats;
    let tatums;
    let progress;
    if(Object.values(state.songAnalysis).length > 0) {
        beats = state.songAnalysis.beats
        tatums = state.songAnalysis.tatums
    } else {
        beats = []
        tatums = []
    }

    if(Object.values(state.currSongPlayback).length > 0) {
        progress = state.currSongPlayback.progress_ms
    } else {
        progress = 0
    }
    return {
        progress,
        beats,
        tatums
    }
}
export default connect(mapStateToProps, {})(Visualizer)