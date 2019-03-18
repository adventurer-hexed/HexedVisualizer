export default class RippleDiamond {
  constructor(ctx, x, y, w, h, isFill, opacity, confidence) {
    this._ctx = ctx;
    this._x = x;
    this._y = y;
    this._w = w;
    this._h = h;
    this._opacity = opacity;
    this._confidence = confidence;
    this._isFill = isFill;
    this._deg = 95;
  }

  colorOpacity = opacity => [
    `rgba(250,250,250, ${opacity})`, // Grey
    `rgba(0,212,103, ${opacity})`, // Green
    `rgba(234,92,144, ${opacity})`, // Pinkish Red
    `rgba(25,176,221,${opacity})`, // Light Blue
    `rgba(131,0,173,${opacity}`, // Purple
    `rgba(251,133,95,${opacity})`, // Coral
  ];

  draw() {
    this._ctx.beginPath();
    let color;
    if (this._confidence > 0.8) {
      color = this.colorOpacity(this._opacity)[1];
    } else if (this._confidence > 0.5) {
      color = this.colorOpacity(this._opacity)[2];
    } else if (this._confidence > 0.4) {
      color = this.colorOpacity(this._opacity)[3];
    } else {
      color = this.colorOpacity(this._opacity)[0];
    }

    this._ctx.save();
    this._ctx.beginPath();
    // move the rotation point to the center of the rect
    this._ctx.translate(this._x, this._y);
    this._ctx.rotate(this._deg);
    this._ctx.rect(-this._w / 2, -this._h / 2, this._w, this._h);
    this._ctx.strokeStyle = color;
    this._ctx.stroke();
    if (this._isFill) {
      this._ctx.fillStyle = color;
      this._ctx.fill();
    }
    this._ctx.restore();
  }

  update() {
    this._w += 0.5;
    this._h += 0.5;
    this._deg += 0.01;
    this.draw();
    this._opacity -= 0.005;
    if (this._opacity <= 0) {
      this._opacity = 0;
    }

    this.draw();
  }
}
