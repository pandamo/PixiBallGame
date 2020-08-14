import { h, defineComponent, reactive, watch } from "@vue/runtime-core";

export default defineComponent({
  props:['x','y'],
  setup(props){
    let point=reactive({
      x:props.x,
      y:props.x,
    })
    watch(props,(value)=>{
      console.log('watch props value: ', value);
      point.x=value.x
      point.y=value.y
    })
    return {
      point
    }
  },
  render(ctx) {
    return h("pillBtn",{x:ctx.point.x,y:ctx.point.y},['开始游戏']);    
  },
});
