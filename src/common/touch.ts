import Hammer from "hammerjs";
import { getInitMatrix, invertPoint, pointASubB, shapeType } from "./common";
import { XX } from "../shapes/xx.shape";
import { fabric } from "fabric";
import { IPoint } from "fabric/fabric-impl";

export function getTouchObj({ div }: { div: HTMLElement }) {
  var hammertime = new Hammer(div, {});
  return hammertime;
}

export function playTapObject({
  canvas,
  touch,
}: {
  canvas: fabric.Canvas;
  touch: HammerManager;
}) {
  touch.on("tap", (ev) => {
    const obj = canvas.findTarget(ev.srcEvent, false);
    if (obj && obj.type === shapeType.xx) {
      const xx = obj as XX;
      // console.log("tap", xx, xx.text, (xx as any).img._objects[0].src);
      //TODO remove
      // navigator.clipboard.writeText(JSON.stringify((xx as any).img._objects[0].src));
      xx.playShort();
    }
  });
}

export function supportTouchDrag({
  canvas,
  touch,
}: {
  canvas: fabric.Canvas;
  touch: HammerManager;
}) {
  touch.get("pan").set({
    pointers: 0,
  });
  let cacheMatrix: number[] = getInitMatrix();
  touch.on("panstart", (ev) => {
    if (canvas.viewportTransform) {
      cacheMatrix = [...canvas.viewportTransform];
    }
  });
  touch.on("panmove", (ev) => {
    canvas.setViewportTransform(
      fabric.util.multiplyTransformMatrices(cacheMatrix, [
        1,
        0,
        0,
        1,
        ev.deltaX,
        ev.deltaY,
      ])
    );
  });
}
