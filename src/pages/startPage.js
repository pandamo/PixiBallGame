import {
  defineComponent,
  h,
  reactive,
  ref,
  computed,
  watch
} from "@vue/runtime-core";
import Ball from "../component/Ball.js";
import BottomBar from '../component/BottomBar.js'
import startBtn from '../component/startBtn.js'
import {
  game
} from './../Game.js'
export default defineComponent({
  setup(props, ctx) {
    let ballSatte = reactive({
      x: Math.random() * 360 | 0,
      y: 20,
      speed:5,
      isMoving:false
    })
    let started = ref(false)
    
    const {
      ticker,
      ballStart,
      ballStop,
      isMoving
    } = ballMov(ballSatte)
    ballStop()

    const ballProps = () => {
      return {
        x: ballSatte.x,
        y: ballSatte.y
      }
    }
    
    const startBtnProps = reactive({      
        x: 140,
        y: 160      
    })

    const gameStart=()=>{
      //console.log('start function',started.value);
      //started.value=true  
      ballSatte.isMoving=true
      ballSatte.x=Math.random() * 360 | 0
      ballSatte.y=20
      startBtnProps.x=1000   
      startBtnProps.y=1000   
      //ballStart()
    }
    const gameOver=()=>{ 
      ballSatte.isMoving=false
      startBtnProps.x=140   
      startBtnProps.y=160   
      //ballStop()
    }

    watch(ballSatte,((val)=>{
      //console.log('val: ', val);
      if(!val.isMoving){
        startBtnProps.x=140   
        startBtnProps.y=160 
        ballStop()
      }else{
        
        ballStart()
      }
    }))


    return {
      started,
      ballProps,
      startBtnProps,
      gameStart
    }
  },
  render(ctx) {
    const vnode = h("Container", {}, [
      h(Ball, ctx.ballProps()),
      h(BottomBar, {
        x: 100,
        y: 380
      }),
      h(startBtn,{
        x:ctx.startBtnProps.x,
        y:ctx.startBtnProps.y,
        interactive:true,
        onClick(){
          ctx.gameStart()
        }
      })
    ]);
    return vnode;
  },
})





const ballMov = (ballState) => {
  let isMoving=false
  let xDirection = 1
  let yDirection = 1
  let ticker = game.ticker;
  ticker.speed = ballState.speed
  ticker.autoStart = false;

  ticker.add(() => {
    //监听ball的y，ball的x在BottomBar访问内，则反弹
    if(ballState.y >= 370){
      //到达BottomBar的顶边
      if(ballState.x>=95 && ballState.x<=205){
        //碰到BottomBar
        yDirection = -1
      }
    }
    if (ballState.y >= 380) 
      ballState.isMoving=false
    if (ballState.y <= 10) 
      yDirection = 1
    if (ballState.x >= 390) 
      xDirection = -1
    if (ballState.x <= 10) 
      xDirection = 1
    ballState.y = ballState.y + (yDirection * ticker.speed)
    ballState.x = ballState.x + (xDirection * ticker.speed)
  })

  const ballStart = () => {
    ballState.isMoving=true
    ticker.start();
  }
  const ballStop = () => {
    ticker.stop();
    //先start一下，渲染界面，再停止。
    ticker.start();
    setTimeout(()=>{
      ballState.isMoving=false
      ticker.stop();
    },60)
  }
  
  return {
    ticker,
    ballStart,
    ballStop
  }
}