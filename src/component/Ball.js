import { h, defineComponent, reactive } from "@vue/runtime-core";

export default defineComponent({
  setup(props,ctx){
    let position=reactive({
     x: props.x,
     y:props.y
    })
    return {position}
  },
  render(ctx) {
    return h("circle", { x: ctx.position.x, y: ctx.position.y });
  },
});
