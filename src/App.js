// 根组件

import { defineComponent, h } from "@vue/runtime-core";
import StarPage from './pages/startPage.js'

export default defineComponent({
  render() {   
    const vnode = h("Container",{}, [
      h(StarPage),
    ]);
    return vnode;
  },
});
