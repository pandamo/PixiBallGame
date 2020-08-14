import { Application } from "pixi.js";
// setup canvas
export const game = new Application({
  width: 400,
  height: 400,
});

document.body.append(game.view);

// game.stage
export function getRootContainer() {
  return game.stage;
}
