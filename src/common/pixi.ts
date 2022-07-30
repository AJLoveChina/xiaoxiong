import * as PIXI from 'pixi.js';

export function initPixi() {
  // The application will create a renderer using WebGL, if possible,
// with a fallback to a canvas render. It will also setup the ticker
// and the root stage PIXI.Container
  const app = new PIXI.Application({
    width: window.innerWidth,
    height: window.innerHeight,
    backgroundColor: 0xFFFFAA
  });

  return {
    app,
    view: app.view,
    loader: app.loader
  }

}