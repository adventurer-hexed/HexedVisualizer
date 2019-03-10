import Circle from "./Circle";
// rgb(250,250,250)
// rgb(0,212,103)
// rgb(234,92,144)
// rgb(25,176,221)
const colorOpacity = (opacity) => [
    `rgba(250,250,250, ${opacity})`, // Grey
    `rgba(0,212,103, ${opacity})`, // Green
    `rgba(234,92,144, ${opacity})`, // Pinkish Red
    `rgba(25,176,221,${opacity})` // Light Blue
]

export default class RippleCircle extends Circle {
    constructor(ctx, x, y, rad, color, isFill, opacity, confidence) {
      super(ctx, x, y, rad, color, isFill)
      this._ctx = ctx
      this._opacity = opacity
      this._confidence = confidence
      this._isFill = isFill
    }
      draw() {
          this._ctx.beginPath()
          let color;
          if(this._confidence > .80) {
            color = colorOpacity(this._opacity)[1]
          } else if(this._confidence > .50) {
            color = colorOpacity(this._opacity)[2]
          } else if(this._confidence > .4) {
            color = colorOpacity(this._opacity)[3]
          } else {
            color = colorOpacity(this._opacity)[0]
          }

          this._ctx.strokeStyle = color
          
          if(this._isFill) {
            this._ctx.fillStyle = color
          }
          this._ctx.lineWidth = 10
          this._ctx.arc(this._x, this._y, this._rad, 0, Math.PI * 2, false)
          this._ctx.stroke()
          if(this._isFill) {
            this._ctx.fill()
          }
      }
  
      update() {
          this._rad += 1
          this._opacity -= .005
          if(this._opacity <= 0) {
            this._opacity = 0
          }
          
          this.draw()
      }
}


