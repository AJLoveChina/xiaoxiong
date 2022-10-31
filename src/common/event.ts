import { getInitMatrix, invertPoint, pointASubB, shapeType } from "./common";
import { fabric } from "fabric";
import { AudioShape } from "../shapes/audio.shape";
import { XX } from "../shapes/xx.shape";
import { Howl } from "howler";
import { DataConfig } from "./data/data.config";
import { IPoint } from "fabric/fabric-impl";

export function supportDrag(canvas: fabric.Canvas) {
  let mouseDownPosition: IPoint | undefined = undefined;
  let matrix = canvas.viewportTransform || getInitMatrix();
  canvas.on("mouse:down", (evt) => {
    if (
      !evt.target ||
      (evt.target.lockMovementX && evt.target.lockMovementY) ||
      !evt.target.selectable
    ) {
      mouseDownPosition = evt.pointer;
      matrix = canvas.viewportTransform || getInitMatrix();
    }
  });
  canvas.on("mouse:move", (evt) => {
    let curPos = evt.pointer;
    if (mouseDownPosition && curPos) {
      let offset = pointASubB(curPos, mouseDownPosition);

      canvas.absolutePan(
        invertPoint(
          fabric.util.transformPoint(
            new fabric.Point(offset.x, offset.y),
            matrix
          )
        )
      );
    }
  });

  canvas.on("mouse:up", (evt) => {
    mouseDownPosition = undefined;
  });
}

export function findItem(pointer: IPoint, canvas: fabric.Canvas) {
  const pos = pointer;
  const mousePosCanvasSpace = new fabric.Point(pos.x, pos.y);
  console.log("mousePosCanvasSpace", mousePosCanvasSpace);
  const activeObj = canvas.getActiveObject();
  if (activeObj && activeObj.type === shapeType.xx) {
    let xx = activeObj as XX;
    let matrix = fabric.util.invertTransform(xx.calcOwnMatrix());
    let mousePosInObject = fabric.util.transformPoint(
      new fabric.Point(pos.x, pos.y),
      matrix
    );
    console.log("mousePosInObject", mousePosInObject);
    let foundItem = xx._objects.find((item) => {
      if (item.containsPoint(mousePosInObject, null, true)) {
        return item;
      }
    });

    if (!foundItem) {
      foundItem = xx._objects[0];
    }

    return {
      child: foundItem,
      parent: xx,
    };
  }
  return undefined;
}

export function onClickAudio(canvas: fabric.Canvas) {
  let currentPlayHow: Howl | undefined = undefined;

  canvas.on("mouse:down", (ev) => {
    const pos = canvas.getPointer(ev.e, false);
    const result = findItem(pos, canvas);

    if (!result) {
      return;
    }

    const { child: foundItem, parent: xx } = result;
    console.log("foundItem", foundItem);
    let audioShape = foundItem as AudioShape;
    if (foundItem.type === shapeType.audio) {
      currentPlayHow?.stop();
      currentPlayHow = xx.play();
    }

    if (foundItem.type === shapeType.img) {
      currentPlayHow?.stop();
      currentPlayHow = xx.playShort();
    }
  });
}

export function startTest(canvas: fabric.Canvas, data: DataConfig) {
  let maxQ = Math.min(10, data.list.length);
}
