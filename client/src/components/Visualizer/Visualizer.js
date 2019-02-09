import React from "react"

export default class Visualizer extends React.Component {
    constructor() {
        this.canvas = React.createRef("music_canvas")
    }

    
    render() {
        return (
            <div>
                <canvas ref="music_canvas"></canvas>
            </div>
        )
    }
}

export default Visualizer