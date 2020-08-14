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
        circle.drawCircle(0, 0, 10);
        circle.endFill();
        return circle
      },
      'rect':()=>{
        let  rect = new Graphics();
        rect.beginFill(0xffffff);
        rect.drawRect(0, 0, 100, 10);
        rect.endFill();
        return rect
      },
      'pillBtn':()=>{
        let  pillBtn = new Graphics();
        pillBtn.beginFill(0x03a9f4);
        pillBtn.drawRect(0, 0, 100, 40);
        pillBtn.drawCircle(0, 20, 20);
        pillBtn.drawCircle(100, 20, 20);
        pillBtn.endFill(0xffffff);
        return pillBtn
      }
    }
     return elements[type]()
  },
  setElementText(node, text) {
    const cText = new Text(text);
    node.addChild(cText);
  },
  createText(text) {
    let textString = new Text(text,{fontSize:18});
    textString.position.set(14, 11)
    return textString
  },
  patchProp(el, key, prevValue, nextValue) {
    switch(key){
      case 'onClick':
        el.on('pointertap',nextValue)
        break
      default:
        el[key] = nextValue;
        break
    }
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
