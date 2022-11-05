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

export function Car() {
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
      await drawCarBackground(fabCanvas);
      await render(fabCanvas, carDataConfig);
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
