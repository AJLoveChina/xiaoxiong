import {useEffect, useRef} from "react";
import {initPixi} from "../common/pixi";
import * as PIXI from 'pixi.js';
import {SVGScene} from '@pixi-essentials/svg';
import {initFabric, loadSP, loadSVG} from "../common/fabric";


export function Food() {
  const div = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!div.current) {
      return;
    }

    let dom = document.createElement("canvas");
    div.current.appendChild(dom);

    const {fabCanvas} = initFabric(dom);
    (window as any).fabCanvas = fabCanvas;
    (window as any).canvas = fabCanvas;


    async function main() {
      const sp = await loadSP({
        svg: "regou.svg",
        text: "冰淇淋",
      });

      sp.set({
        left: sp.getScaledWidth() / 2 + 100,
        top: sp.getScaledHeight() / 2 + 100,
      })

      fabCanvas.add(sp);
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