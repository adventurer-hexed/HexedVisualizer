import RippleCircle from "./RippleCircle"

export default class CompleteRipple {
    constructor(ctx, canvasWidth, canvasHeight) {
        this._ctx = ctx
        this._canvasWidth = canvasWidth
        this._canvasHeight = canvasHeight
        this._rippleBeats = []
        this._rippleTatums = []
        this._currBeatIndex = 0
        this._currTatumIndex = 0
        this._currSectionIndex = 0
    }

    update(progress = 0, beats = [], tatums=[]) {

      // beats
      if(this._currBeatIndex < beats.length) {
        const ripple_x = Math.random() * this._canvasWidth
        const ripple_y = Math.random() * this._canvasHeight
        while(progress >= beats[this._currBeatIndex].start * 1000) {
          const confidence = beats[this._currBeatIndex].confidence
            const rippleCircle = new RippleCircle(
                this._ctx,
              ripple_x, ripple_y, 5, "black", false, 
              confidence, confidence
            )
            this._rippleBeats.push(rippleCircle)
            this._currBeatIndex++
          }
      }

      // tatums
      if(this._currTatumIndex < tatums.length) {
        // debugger
        const ripple_x = this._canvasWidth/2
        const ripple_y = this._canvasHeight/2

        while(progress >= tatums[this._currTatumIndex].start * 1000) {
          const confidence = tatums[this._currTatumIndex].confidence
          const rippleCircle = new RippleCircle(
            this._ctx,
            ripple_x, ripple_y, 5, "black", false, 
            confidence, confidence
          )
          this._rippleTatums.push(rippleCircle)
          this._currTatumIndex++
          }
      }


      // Makes array shrink when ripple circle has a opacity of 0
      this._rippleBeats = this._rippleBeats.filter( a => a._opacity >= 0)
      for(let i = 0 ; i < this._rippleBeats.length; i++) {
          this._rippleBeats[i].update()
      }

      
      // Makes array shrink when ripple circle has a opacity of 0
      this._rippleTatums = this._rippleTatums.filter( a => a._opacity >= 0)
      for(let i = 0 ; i < this._rippleTatums.length; i++) {
          this._rippleTatums[i].update()
      }
        
    }
}