import RippleCircle from "./RippleCircle"

export default class CompleteRipple {
    constructor(ctx, canvasWidth, canvasHeight) {
        this._ctx = ctx
        this._canvasWidth = canvasWidth
        this._canvasHeight = canvasHeight
        this._rippleBeats = []
        this._rippleTatums = []
        this._rippleSections = []
        this._currBeatIndex = 0
        this._currTatumIndex = 0
        this._currSectionIndex = 0
        this._currSectionIndex = 0
        this._isRnado = false
        this._isFill = true
        this._occurencePos = 5;
    }

    // update(progress = 0, beats = [], tatums=[]) {

    //   // beats
    //   if(this._currBeatIndex < beats.length) {
    //     const ripple_x = Math.random() * this._canvasWidth
    //     const ripple_y = Math.random() * this._canvasHeight
    //     while(progress >= beats[this._currBeatIndex].start * 1000) {
    //       const confidence = beats[this._currBeatIndex].confidence
    //         const rippleCircle = new RippleCircle(
    //             this._ctx,
    //           ripple_x, ripple_y, 4, "black", false, 
    //           confidence, confidence
    //         )
    //         this._rippleBeats.push(rippleCircle)
    //         this._currBeatIndex++
    //       }
    //   }

    //   // tatums
    //   if(this._currTatumIndex < tatums.length) {
    //     // debugger
    //     const ripple_x = this._canvasWidth/2
    //     const ripple_y = this._canvasHeight/2

    //     while(progress >= tatums[this._currTatumIndex].start * 1000) {
    //       const confidence = tatums[this._currTatumIndex].confidence
    //       const rippleCircle = new RippleCircle(
    //         this._ctx,
    //         ripple_x, ripple_y, 4, "black", false, 
    //         confidence, confidence
    //       )
    //       this._rippleTatums.push(rippleCircle)
    //       this._currTatumIndex++
    //       }
    //   }


    //   // Makes array shrink when ripple circle has a opacity of 0
    //   this._rippleBeats = this._rippleBeats.filter( a => a._opacity >= 0)
    //   for(let i = 0 ; i < this._rippleBeats.length; i++) {
    //       this._rippleBeats[i].update()
    //   }

      
    //   // Makes array shrink when ripple circle has a opacity of 0
    //   this._rippleTatums = this._rippleTatums.filter( a => a._opacity >= 0)
    //   for(let i = 0 ; i < this._rippleTatums.length; i++) {
    //       this._rippleTatums[i].update()
    //   }
        
    // }

    // update(progress = 0, beats = [], tatums=[]) {

    //   // beats
    //   if(this._currBeatIndex < beats.length) {
    //     const ripple_x = Math.random() * this._canvasWidth
    //     const ripple_y = Math.random() * this._canvasHeight
    //     while(progress >= beats[this._currBeatIndex].start * 1000) {
    //       const confidence = beats[this._currBeatIndex].confidence
    //         const rippleCircle = new RippleCircle(
    //             this._ctx,
    //           ripple_x, ripple_y, 4, "black", false, 
    //           confidence, confidence
    //         )
    //         this._rippleBeats.push(rippleCircle)
    //         this._currBeatIndex++
    //       }
    //   }

    //   // tatums
    //   if(this._currTatumIndex < tatums.length) {
    //     // debugger
    //     const ripple_x = this._canvasWidth/2
    //     const ripple_y = this._canvasHeight/2

    //     while(progress >= tatums[this._currTatumIndex].start * 1000) {
    //       const confidence = tatums[this._currTatumIndex].confidence
    //       const rippleCircle = new RippleCircle(
    //         this._ctx,
    //         ripple_x, ripple_y, 4, "black", false, 
    //         confidence, confidence
    //       )
    //       this._rippleTatums.push(rippleCircle)
    //       this._currTatumIndex++
    //       }
    //   }


    //   // Makes array shrink when ripple circle has a opacity of 0
    //   this._rippleBeats = this._rippleBeats.filter( a => a._opacity >= 0)
    //   for(let i = 0 ; i < this._rippleBeats.length; i++) {
    //       this._rippleBeats[i].update()
    //   }

      
    //   // Makes array shrink when ripple circle has a opacity of 0
    //   this._rippleTatums = this._rippleTatums.filter( a => a._opacity >= 0)
    //   for(let i = 0 ; i < this._rippleTatums.length; i++) {
    //       this._rippleTatums[i].update()
    //   }
        
    // }

    pushArray = (arr, arrToPush, index, progress, total_dur, x, y, opt, isRando, isFill) => {
      if(this[index] < arr.length - 1) {
        if(progress < total_dur) {

        while(progress >= arr[this[index]].start * 1000) {
          if(opt) {
            const ripple_x1 = 100
            const ripple_y1 = 100

            const ripple_x2 = this._canvasWidth - 100
            const ripple_y2 = 100

            const ripple_x3 = 100
            const ripple_y3 = this._canvasHeight -100

            const ripple_x4 = this._canvasWidth - 100
            const ripple_y4 = this._canvasHeight - 100

            const ripple_x5 = this._canvasWidth / 2
            const ripple_y5 = this._canvasHeight / 2

            
            const confidence = arr[this[index]].confidence
            const rippleCircle1 = new RippleCircle(
                this._ctx,
              ripple_x1, ripple_y1, 4, "black", isFill, 
              confidence, confidence
            )

            const rippleCircle2 = new RippleCircle(
                this._ctx,
              ripple_x2, ripple_y2, 4, "black", isFill, 
              confidence, confidence
            )

            const rippleCircle3 = new RippleCircle(
                this._ctx,
              ripple_x3, ripple_y3, 4, "black", isFill, 
              confidence, confidence
            )

            const rippleCircle4 = new RippleCircle(
                this._ctx,
              ripple_x4, ripple_y4, 4, "black", isFill, 
              confidence, confidence
            )

            // const rippleCircle5 = new RippleCircle(
            //     this._ctx,
            //   ripple_x5, ripple_y5, 4, "black", isFill, 
            //   confidence, confidence
            // )
            
            arrToPush.push(rippleCircle1)
            arrToPush.push(rippleCircle2)
            arrToPush.push(rippleCircle3)
            arrToPush.push(rippleCircle4)
            // arrToPush.push(rippleCircle5)
            this[index]++

          } else if(isRando) {
            const ripple_xRando = Math.random() * this._canvasWidth
            const ripple_yRando = Math.random() * this._canvasHeight

            const confidence = arr[this[index]].confidence
            const rippleCircleRando = new RippleCircle(
                this._ctx,
              ripple_xRando, ripple_yRando, 4, "black", this._isFill, 
              confidence, confidence
            )



            const ripple_x = x
            const ripple_y = y
            const rippleCircle = new RippleCircle(
                this._ctx,
              ripple_x, ripple_y, 4, "black", this._isFill, 
              confidence, confidence
            )

            arrToPush.push(rippleCircle)
            arrToPush.push(rippleCircleRando)
            this[index]++

          } else {
              let ripple_x = x
              let ripple_y = y
              
              if(this._occurencePos % 5 === 0) {
                ripple_x -= 200
                // ripple_y -= 100
              } else if(this._occurencePos % 5 === 1) {
                ripple_x -= 100
                // ripple_y -= 100
              } else if(this._occurencePos % 5 === 2) {
                ripple_x += 0
                // ripple_y += 100
              } else if(this._occurencePos % 5 === 3) {
                ripple_x += 100
                // ripple_y += 100
              } else if(this._occurencePos % 5 === 4) {
                ripple_x += 200
              }

              const confidence = arr[this[index]].confidence
              const rippleCircle = new RippleCircle(
                this._ctx,
                ripple_x, 
                ripple_y, 
                4, 
                "black", 
                this._isFill, 
                confidence, confidence
              )
              arrToPush.push(rippleCircle)
              this[index]++

              this._occurencePos++
              this._occurencePos %= 5;

            }
          }
        }
      }
    }


    update(progress = 0, total_dur, beats = [], tatums=[], sections=[]) {
      // this._isFill = false;
      // this._isRando = false;
      if(this._currSectionIndex < sections.length - 1) {
        const ripple_x1 = 100
        const ripple_y1 = 100

        const ripple_x2 = this._canvasWidth - 100
        const ripple_y2 = 100

        const ripple_x3 = 100
        const ripple_y3 = this._canvasHeight - 100

        const ripple_x4 = this._canvasWidth - 100
        const ripple_y4 = this._canvasHeight - 100

        const ripple_x5 = this._canvasWidth / 2
        const ripple_y5 = this._canvasHeight /2

        // Left
        const ripple_x6 = this._canvasWidth/ 2 - 100
        const ripple_y6 = this._canvasHeight / 2

        // top
        const ripple_x7 = this._canvasWidth / 2
        const ripple_y7 = this._canvasHeight / 2 + 100

        // right
        const ripple_x8 = this._canvasWidth/2 + 100
        const ripple_y8 = this._canvasHeight/2

        // bottom
        const ripple_x9 = this._canvasWidth / 2
        const ripple_y9 = this._canvasHeight/2 - 100

        

        if(progress < total_dur) {

        while(progress >= sections[this._currSectionIndex].start * 1000) {
          this._isFill = !this._isFill
          this._isRando = !this._isRando
          const confidence = sections[this._currSectionIndex].confidence

            const rippleCircle1 = new RippleCircle(
                this._ctx,
              ripple_x1, ripple_y1, 4, "black", true, 
              confidence, confidence
            )


            const rippleCircle2 = new RippleCircle(
                this._ctx,
              ripple_x2, ripple_y2, 4, "black", true, 
              confidence, confidence
            )



            const rippleCircle3 = new RippleCircle(
                this._ctx,
              ripple_x3, ripple_y3, 4, "black", true, 
              confidence, confidence
            )



            const rippleCircle4 = new RippleCircle(
                this._ctx,
              ripple_x4, ripple_y4, 4, "black", true, 
              confidence, confidence
            )


            const rippleCircle5 = new RippleCircle(
                this._ctx,
              ripple_x5, ripple_y5, 4, "black", true, 
              confidence, confidence
            )


            const rippleCircle6 = new RippleCircle(
                this._ctx,
              ripple_x6, ripple_y6, 4, "black", true, 
              confidence, confidence
            )


            const rippleCircle7 = new RippleCircle(
                this._ctx,
              ripple_x7, ripple_y7, 4, "black", true, 
              confidence, confidence
            )


            const rippleCircle8 = new RippleCircle(
                this._ctx,
              ripple_x8, ripple_y8, 4, "black", true, 
              confidence, confidence
            )

            const rippleCircle9 = new RippleCircle(
                this._ctx,
              ripple_x9, ripple_y9, 4, "black", true, 
              confidence, confidence
            )


            this._rippleSections.push(rippleCircle1)
            this._rippleSections.push(rippleCircle2)
            this._rippleSections.push(rippleCircle3)
            this._rippleSections.push(rippleCircle4)
            this._rippleSections.push(rippleCircle5)
            this._rippleSections.push(rippleCircle6)
            this._rippleSections.push(rippleCircle7)
            this._rippleSections.push(rippleCircle8)
            this._rippleSections.push(rippleCircle9)
            this._currSectionIndex++
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

      // this.pushArray(
      //   sections,
      //   this._rippleSections,
      //   "_currSectionIndex",
      //   progress,
      //   this._canvasWidth / 2,
      //   this._canvasHeight / 2,
      //   isRando,
      //   false
      // )

      

      // Makes array shrink when ripple circle has a opacity of 0
      this._rippleBeats = this._rippleBeats.filter( a => a._opacity >= 0)
      this._rippleBeats.forEach(element => element.update());
       
      // Makes array shrink when ripple circle has a opacity of 0
      this._rippleTatums = this._rippleTatums.filter( a => a._opacity >= 0)
      this._rippleTatums.forEach(element => element.update());

      // Makes array shrink when ripple circle has a opacity of 0
      this._rippleSections = this._rippleSections.filter( a => a._opacity >= 0)
      this._rippleSections.forEach(element => element.update());
     
        
    }



    // update(progress = 0, beats = [], tatums=[]) {

    //   // beats
    //   if(this._currBeatIndex < beats.length) {
    //     const ripple_x1 = 100
    //     const ripple_y1 = 100

    //     const ripple_x2 = this._canvasWidth - 100
    //     const ripple_y2 = 100

    //     const ripple_x3 = 100
    //     const ripple_y3 = this._canvasHeight - 100

    //     const ripple_x4 = this._canvasWidth - 100
    //     const ripple_y4 = this._canvasHeight - 100


    //     while(progress >= beats[this._currBeatIndex].start * 1000) {
    //       const confidence = beats[this._currBeatIndex].confidence



    //         const rippleCircle1 = new RippleCircle(
    //             this._ctx,
    //           ripple_x1, ripple_y1, 4, "black", false, 
    //           confidence, confidence
    //         )


    //         const rippleCircle2 = new RippleCircle(
    //             this._ctx,
    //           ripple_x2, ripple_y2, 4, "black", false, 
    //           confidence, confidence
    //         )



    //         const rippleCircle3 = new RippleCircle(
    //             this._ctx,
    //           ripple_x3, ripple_y3, 4, "black", false, 
    //           confidence, confidence
    //         )



    //         const rippleCircle4 = new RippleCircle(
    //             this._ctx,
    //           ripple_x4, ripple_y4, 4, "black", false, 
    //           confidence, confidence
    //         )
    //         this._rippleBeats.push(rippleCircle1)
    //         this._rippleBeats.push(rippleCircle2)
    //         this._rippleBeats.push(rippleCircle3)
    //         this._rippleBeats.push(rippleCircle4)
    //         this._currBeatIndex++
    //       }
    //   }

    //   // tatums
    //   if(this._currTatumIndex < tatums.length) {
    //     // debugger
    //     const ripple_x = this._canvasWidth/2
    //     const ripple_y = this._canvasHeight/2

    //     while(progress >= tatums[this._currTatumIndex].start * 1000) {
    //       const confidence = tatums[this._currTatumIndex].confidence
    //       const rippleCircle = new RippleCircle(
    //         this._ctx,
    //         ripple_x, ripple_y, 4, "black", false, 
    //         confidence, confidence
    //       )
    //       this._rippleTatums.push(rippleCircle)
    //       this._currTatumIndex++
    //       }
    //   }


    //   // Makes array shrink when ripple circle has a opacity of 0
    //   this._rippleBeats = this._rippleBeats.filter( a => a._opacity >= 0)
    //   for(let i = 0 ; i < this._rippleBeats.length; i++) {
    //       this._rippleBeats[i].update()
    //   }

      
    //   // Makes array shrink when ripple circle has a opacity of 0
    //   this._rippleTatums = this._rippleTatums.filter( a => a._opacity >= 0)
    //   for(let i = 0 ; i < this._rippleTatums.length; i++) {
    //       this._rippleTatums[i].update()
    //   }
        
    // }
}