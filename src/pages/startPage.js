import { defineComponent, h, reactive } from "@vue/runtime-core";
import Ball from "../component/Ball.js";
import BottomBox from '../component/BottomBar.js'
export default defineComponent({
  setup(props,ctx){
    let ballPositon=reactive({
      x:Math.random()*360 | 0,
      y:20,
      
    })
    let speed=5
    let xDirection = 1
    let yDirection = 1
    const move=()=>{      
      if(ballPositon.y>380){
        yDirection= -1
      }
      if(ballPositon.y<20){
        yDirection= 1
      }
      if(ballPositon.x>380){
        xDirection= -1
      }
      if(ballPositon.x<20){
        xDirection= 1
      }      
      ballPositon.y =  ballPositon.y + (yDirection * speed)
      ballPositon.x =  ballPositon.x + (xDirection * speed)
      requestAnimationFrame(move)
    }
    move()
    return {ballPositon}
  },
  render(ctx) {   
    const vnode = h("Container",{}, [
      h(Ball,{x:ctx.ballPositon.x,y:ctx.ballPositon.y})
    ]);
    return vnode;
  },
});