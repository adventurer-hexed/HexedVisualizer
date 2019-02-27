import React from "react"
import { Rectangle, Circle } from "./Shapes"

export default class Visualizer extends React.Component {
    constructor() {
        super()
        this.state = {
            circlesArr: [],
            rectangleArr: []
        }
        this._canvas = React.createRef()
    }

    componentDidMount() {
        window.addEventListener("resize", this.listenForWindowResize.bind(this))

        this._canvas.current.width = window.innerWidth
        this._canvas.current.height = window.innerHeight
        this._context = this._canvas.current.getContext("2d")

        this.createRectangle(this._context)

        this.animate()
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.listenForWindowResize.bind(this))
    }


    listenForWindowResize(e) {
        this._canvas.current.width = window.innerWidth
        this._canvas.current.height = window.innerHeight
    }

    animate() {
        requestAnimationFrame(this.animate.bind(this))
        this._context.clearRect(0, 0, window.innerWidth, window.innerHeight)
        for(let i = 0; i < this.state.rectangleArr.length; i++) {
            this.state.rectangleArr[i].update()
        }
    }

    createCircles(context) {
        const circlesArr = this.state.circlesArr
        for(let i = 0; i < 10; i++) {
            const x = Math.random() * window.innerWidth
            const y = Math.random() * window.innerHeight
            circlesArr.push(new Circle(context, x, y, 30, 4, 4))
        }
        this.setState({circlesArr})
    }

    createRectangle(context) {
        const { rectangleArr } = this.state
        for(let i = 0; i < 12; i++) {
            const x = (i) * 100
            const y = window.innerHeight
            rectangleArr.push(new Rectangle(context, x, y, 50, -(Math.random() * y), -12, -6))            
        }
        this.setState({rectangleArr})
    }

        
    render() {
        console.log(this.state)
        console.log(this.props)
        return (
            <div>
                <canvas 
                    ref={this._canvas} 
                />
            </div>
        )
    }
}
