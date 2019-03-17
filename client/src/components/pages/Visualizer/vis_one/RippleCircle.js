import Circle from './Circle';
// rgb(250,250,250)
// rgb(0,212,103)
// rgb(234,92,144)
// rgb(25,176,221)
const colorOpacity = opacity => [
  `rgba(250,250,250, ${opacity})`, // Grey
  `rgba(0,212,103, ${opacity})`, // Green
  `rgba(234,92,144, ${opacity})`, // Pinkish Red
  `rgba(25,176,221,${opacity})`, // Light Blue
];

export default class RippleCircle extends Circle {
    constructor(ctx, x, y, rad, dRad, color, isFill, opacity, confidence, dOpacity) {
      super(ctx, x, y, rad, color, isFill)
      this._ctx = ctx
      this._opacity = opacity
      this._confidence = confidence
      this._isFill = isFill
      this._dRad = dRad
      this._dOpacity = dOpacity
    }

          this._ctx.strokeStyle = color
          
          if(this._isFill) {
            this._ctx.fillStyle = color
          }
          this._ctx.lineWidth = 5
          this._ctx.arc(this._x, this._y, this._rad, 0, Math.PI * 2, false)
          this._ctx.stroke()
          if(this._isFill) {
            this._ctx.fill()
          }
      }
  
      update() {
          this._rad += this._drad
          this._opacity -= this._dOpacity
          if(this._opacity <= 0) {
            this._opacity = 0
          }
          
          this.draw()


          // this._rad += 4
          // this._opacity -= .02
          // if(this._opacity <= 0) {
          //   this._opacity = 0
          // }


          // this._rad += this.dRad
          // this._opactiy -= this.dOpacity
      }
}

    if (this._isFill) {
      this._ctx.fillStyle = color;
    }
    this._ctx.lineWidth = 10;
    this._ctx.arc(this._x, this._y, this._rad, 0, Math.PI * 2, false);
    this._ctx.stroke();
    if (this._isFill) {
      this._ctx.fill();
    }
  }

