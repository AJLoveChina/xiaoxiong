import {useEffect, useRef} from "react";
import {initPixi} from "../common/pixi";
import * as PIXI from 'pixi.js';
import {SVGScene} from '@pixi-essentials/svg';
import {initFabric, loadSP, loadSVG} from "../common/fabric";
import {onClickAudio} from "../common/event";
import {drawFoodBackground, render} from "../common/render";


export function Food() {
  const div = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!div.current) {
      return;
    }

    let dom = document.createElement("canvas");
    div.current.appendChild(dom);

    const {fabCanvas} = initFabric(dom, {});
    (window as any).fabCanvas = fabCanvas;
    (window as any).canvas = fabCanvas;


    async function main() {
      await drawFoodBackground(fabCanvas);
      await render(fabCanvas);
      onClickAudio(fabCanvas);
    }

    main();


    return () => {
      if (div.current) {
        div.current.innerHTML = "";
      }
    }

  }, [div])

  return <div>
    <div ref={div}></div>
  </div>
}