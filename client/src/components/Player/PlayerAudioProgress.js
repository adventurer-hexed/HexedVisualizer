import React from "react"
import { connect } from "react-redux"
import { updateProgress, seekProgressPlayback } from "../../actions"

const mapStateToProps = (state) => ({ currSongPlayback:state.currSongPlayback })

export default connect(mapStateToProps, { updateProgress, seekProgressPlayback })(

    class AudioProgress extends React.Component {
        constructor(props) {
            super(props)
            this.progressRef = React.createRef()
        }

        handleProgressPoint = (e) => {
            let offSet = this.progressRef.current.getClientRects()[0]
            const widthOfEl = this.progressRef.current.offsetWidth
            const position = (e.clientX - offSet.left) / widthOfEl
            const positionClicked = Math.floor((this.props.currSongPlayback.item.duration_ms * position))

            this.props.seekProgressPlayback(positionClicked)
        }


        componentDidMount() {
            this.progressRef.current.addEventListener("click", this.handleProgressPoint)
        }

        componentWillUnmount() {
            this.progressRef.current.removeEventListener("click", this.handleProgressPoint)
        }
        render() {
            return (
                <div ref={this.progressRef} className="audio_progress_container">
                    <div className="audio_progress_bar"></div>
                    <div 
                        className="progress_icon" 
                        style={{left:`${this.props.currSongPlayback.currentDuration}%`}}
                    />
                </div>
            )
        }
})