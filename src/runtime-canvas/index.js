import { createRenderer } from "@vue/runtime-core";

import { Graphics, Text,Container } from "pixi.js";
const renderer = createRenderer({
  createElement(type) {
    let elements={
      'Container':()=>{
        return new Container()
      },
      'circle':()=>{
        let circle = new Graphics();
        circle.beginFill(0xffff00);
        circle.drawCircle(0, 0, 20);
        circle.endFill();
        return circle
      },
      'rect':()=>{
        let  rect = new Graphics();
        rect.beginFill(0xffffff);
        rect.drawRect(0, 0, 200, 20);
        rect.endFill();
        return rect
      }
    }
     return elements[type]()
  },
  setElementText(node, text) {
    const cText = new Text(text);
    node.addChild(cText);
  },
  createText(text) {
    return new Text(text);
  },
  patchProp(el, key, prevValue, nextValue) {
    el[key] = nextValue;
  },

  insert(el, parent) {
    parent.addChild(el);
  },
  parentNode (node){

  },
  nextSibling(node){

  }
});

export function createApp(rootComponent) {
  return renderer.createApp(rootComponent);
}
