export default class Rectangle {
    constructor(context, x, y, w, h,dx, dy) {
        this._context = context
        this._x = x;
        this._y = y;
        this._w = w;
        this._h = h;
        this._velocity = { dx, dy }
    }


    draw() {
        this._context.beginPath()
        this._context.fillStyle = "rgba(255, 0, 255, 0.9)"
        this._context.fillRect(this._x, this._y, this._w, this._h)
    }


    // make the start from beats the keys
    // find avg of duration from beats
    // confidence will be how much power beat presents
    update() {
        if(this._h < -window.innerHeight || this._h > 0) {
            this._velocity.dy *= -1
        }
        // console.log(this._velocity.dy)
        this._h += this._velocity.dy
        this.draw()

    }


}