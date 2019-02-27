export default class Circle {
    constructor(ctx, x, y, rad, color, isFill) {
        this._ctx = ctx
        this._x = x
        this._y = y
        this._rad = rad
        this._color = color
        this._isFill = isFill
    
        this._drad = 1;
    }


    draw() {
       this._ctx.beginPath()
       this._ctx.strokeStyle = this._color
       this._ctx.fillStyle = this._color
       this._ctx.arc(this._x, this._y, this._rad, 0, Math.PI * 2, false) 

       if(this._isFill) {
           this._ctx.fill()
       }

       this._ctx.stroke()
    }

    update() {
        if(this._rad + this._drad  > 70 || this._rad + this._drad < 50) {
            this._drad = -3
        }

        if(this._rad + this._drad < 50) {
            this._drad = 3
        }
        
        this._rad += this._drad
        this.draw()
    }
}
