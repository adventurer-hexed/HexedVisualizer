import RippleCircle from "./RippleCircle"
import RippleDiamond from "./RippleDiamond";

export default class CompleteRipple {
    constructor(ctx, canvasWidth, canvasHeight) {
        this._ctx = ctx
        this._canvasWidth = canvasWidth
        this._canvasHeight = canvasHeight
        this._rippleBeats = []
        this._rippleTatums = []
        this._rippleSections = []
        this._rippleBars = []
        this._currBeatIndex = 0
        this._currTatumIndex = 0
        this._currSectionIndex = 0
        this._currBarIndex = 0
        this._isRnado = false
        this._isFill = true
        this._occurencePos = 4;
    }

    pushArray = (arr, arrToPush, index, progress, total_dur, x, y, opt, isRando, isFill) => {
      if(this[index] < arr.length - 1) {
        if(progress < total_dur) {

        while(progress >= arr[this[index]].start * 1000) {
          if(opt) {

            const quadCirc = [
              {x: 100, y: 100},
              {x: this._canvasWidth - 100, y: 100},
              {x: 100, y: this._canvasHeight - 100},
              {x: this._canvasWidth - 100, y: this._canvasHeight - 100 }
            ]
          

            
            const confidence = arr[this[index]].confidence


            quadCirc.forEach( a => {
              arrToPush.push( new RippleCircle(
                this._ctx,
                a.x, 
                a.y, 
                4, 
                1,
                "black", 
                isFill, 
                confidence, 
                confidence, 
                .01
              ))
            })

    
            this[index]++

          } else if(isRando) {

          const confidence = arr[this[index]].confidence
  
          for(let i = 0; i < 10; i++) {
            arrToPush.push(
              new RippleCircle(
                this._ctx,
                100 + (i * 200),
                this._canvasHeight / 2,
                20,
                1,
                "black", 
                this._isFill,
                confidence, 
                confidence,
                .015
              )
            )
          }

          this[index]++

          } else {
              let ripple_x = x
              let ripple_y = y
              
              // TOP
              if(this._occurencePos % 5 === 0) {
                ripple_y -= 150

                // Left
              } else if(this._occurencePos % 5 === 1) {
                ripple_x -= 150

                // BOTTOM
              } else if(this._occurencePos % 5 === 2) {
                ripple_y += 150

                // RIGHT
              } else if(this._occurencePos % 5 === 3) {
                ripple_x += 150
              } 
              const confidence = arr[this[index]].confidence
              const rippleCircle = new RippleCircle(
                this._ctx,
                ripple_x, 
                ripple_y, 
                4,
                1, 
                "black", 
                this._isFill, 
                confidence, confidence,
                .01
              )
              arrToPush.push(rippleCircle)
              this[index]++

              this._occurencePos++
              this._occurencePos %= 4;

            }
          }
        }
      }
    }


    update(progress = 0, total_dur, beats = [], tatums=[], sections=[], bars=[]) {
  
      if(this._currSectionIndex < sections.length - 1) {
    

        if(progress < total_dur) {

          while(progress >= sections[this._currSectionIndex].start * 1000) {
            this._isFill = !this._isFill
            this._isRando = !this._isRando
            const confidence = sections[this._currSectionIndex].confidence

            const quadCenter = [
              
              {x: 100, y: 100}, // 1

              {x: this._canvasWidth - 100, y: 100}, // 2

              {x: 100, y: this._canvasHeight - 100}, // 3

              {x: this._canvasWidth - 100, y:  this._canvasHeight - 100}, // 4

              {x: this._canvasWidth/ 2, y: this._canvasHeight / 2}, // 5

              {x: this._canvasWidth/2 - 100, y: this._canvasHeight / 2}, // 6

              {x: this._canvasWidth/ 2, y: this._canvasHeight / 2 + 100}, // 7

              {x: this._canvasWidth/ 2 + 100, y: this._canvasHeight/ 2}, // 8

              {x: this._canvasWidth/ 2, y: this._canvasHeight/2 -100} // 9

            ]


            quadCenter.forEach( a => {
              this._rippleSections.push(
                new RippleCircle(
                  this._ctx,
                  a.x,
                  a.y,
                  4,
                  1,
                  "black",
                  true,
                  confidence,
                  confidence,
                  .01
                )
              )
            })
     
              this._currSectionIndex++
            }
          }
      }
   
      if(this._currBarIndex < bars.length - 1) {
        const AMOUNT_OF_DIAMONDS = 5

        if(progress < total_dur) {

          while(progress >= bars[this._currBarIndex].start * 1000) {
            const confidence = bars[this._currBarIndex].confidence

              // top
              for(let i = 0; i < AMOUNT_OF_DIAMONDS; i++) {
                this._rippleBars.push(
                  new RippleDiamond(
                    this._ctx,
                    (this._canvasWidth/2 - 400) + (200 * i),
                    100, 
                    0, 
                    0, 
                    this._isFill, 
                    confidence, 
                    confidence
                  )
                )
              }

              for(let i = 0; i < AMOUNT_OF_DIAMONDS; i++) {
                this._rippleBars.push(
                  new RippleDiamond(
                    this._ctx,
                    (this._canvasWidth/2 - 400) + (200 * i),
                    this._canvasHeight - 100, 
                    0, 
                    0, 
                    this._isFill, 
                    confidence, 
                    confidence
                  )
                )
              }
              
              this._currBarIndex++
            }
          }
      }
   
      this.pushArray(
        beats, 
        this._rippleBeats, 
        "_currBeatIndex", // cannot pass by ref
        progress, 
        total_dur,
        this._canvasWidth / 2,
        this._canvasHeight / 2,
        false,
        !this._isRando,
        this._isFill
      )


      this.pushArray(
        tatums, 
        this._rippleTatums, 
        "_currTatumIndex", // cannot pass by ref
        progress,
        total_dur,
        this._canvasWidth / 2,
        this._canvasHeight / 2,
        true,
        false,
        this._isFill
      )


      // Makes array shrink when ripple circle has a opacity of 0
      this._rippleBeats = this._rippleBeats.filter( a => a._opacity >= 0)
      this._rippleBeats.forEach(element => element.update());
       
      // Makes array shrink when ripple circle has a opacity of 0
      this._rippleTatums = this._rippleTatums.filter( a => a._opacity >= 0)
      this._rippleTatums.forEach(element => element.update());

      // Makes array shrink when ripple circle has a opacity of 0
      this._rippleSections = this._rippleSections.filter( a => a._opacity >= 0)
      this._rippleSections.forEach(element => element.update());
      
      // Makes array shrink when ripple bars has a opacity of 0
      this._rippleBars = this._rippleBars.filter( a => a._opacity >= 0)
      this._rippleBars.forEach(element => element.update());
     
        
    }


}