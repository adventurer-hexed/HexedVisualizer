export default class Circle {
    constructor(context, x, y, r, dx, dy) {
        this._context = context
        this._x = x;
        this._y = y;
        this._r = r;
        this._velocity = { dx, dy }
    }

    draw() {
        this._context.beginPath()
        this._context.arc(this._x, this._y, this._r, 0, Math.PI *2, false)
        this._context.strokeStyle = "blue"
        this._context.stroke()
        // this._context.fill()
    }

    update() {
        if(this._x + this._r > window.innerWidth || this._x - this._r < 0) {
            this._velocity.dx = -this._velocity.dx
        }
        if(this._y + this._r > window.innerHeight || this._y - this._r < 0) {
            this._velocity.dy = -this._velocity.dy
        }

        this._x += this._velocity.dx
        this._y += this._velocity.dy

        this.draw()
    }
}