import { useEffect, useRef } from "react";
import { carDataConfig } from "../../common/data/car.data.config";
import { onClickAudio, supportDrag } from "../../common/event";
import { initFabric } from "../../common/fabric";
import {
  drawCarBackground,
  drawFoodBackground,
  render,
} from "../../common/render";
import {
  getTouchObj,
  playTapObject,
  supportTouchDrag,
} from "../../common/touch";
import { drawBackgroundByFabric } from "../../common/background";
import { renderByJson } from "../../common/renderByJson";

export function Christmas() {
  const div = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!div.current) {
      return;
    }
    const touch = getTouchObj({ div: div.current });
    let dom = document.createElement("canvas");
    div.current.appendChild(dom);

    const { fabCanvas } = initFabric(dom, {});
    (window as any).fabCanvas = fabCanvas;
    (window as any).canvas = fabCanvas;

    fabCanvas.selection = false;

    async function main() {
      let json = await fetch("/json/christmas.json").then((res) => res.json());
      await renderByJson(fabCanvas, json);
      fabCanvas.disableMovementAllObjs();
      onClickAudio(fabCanvas);
      supportTouchDrag({
        canvas: fabCanvas,
        touch,
      });
      playTapObject({
        canvas: fabCanvas,
        touch: touch,
      });
    }

    main();

    return () => {
      if (div.current) {
        div.current.innerHTML = "";
      }
      touch.destroy();
    };
  }, [div]);

  return (
    <div>
      <div ref={div}></div>
    </div>
  );
}
