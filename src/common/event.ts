import {shapeType} from "./common";
import {fabric} from 'fabric'
import {AudioShape} from "../shapes/audio.shape";
import {XX} from "../shapes/xx.shape";


export function onClickAudio(canvas: fabric.Canvas) {
  canvas.on("mouse:up", (ev) => {
    const pos = canvas.getPointer(ev.e, false);
    const mousePosCanvasSpace = new fabric.Point(pos.x, pos.y);
    console.log("mousePosCanvasSpace", mousePosCanvasSpace);
    const activeObj = canvas.getActiveObject();
    if (activeObj && activeObj.type === shapeType.xx) {
      let xx = activeObj as XX;
      let matrix = fabric.util.invertTransform(xx.calcOwnMatrix());
      let mousePosInObject = fabric.util.transformPoint(new fabric.Point(pos.x, pos.y), matrix);
      console.log("mousePosInObject", mousePosInObject);
      let foundItem = xx._objects.find(item => {
        if (item.containsPoint(mousePosInObject, null, true)) {
          return item;
        }
      });

      if (foundItem) {
        console.log("foundItem", foundItem);
        let audioShape = foundItem as AudioShape;
        if (foundItem.type === shapeType.audio) {
          xx.play();
        }

        if (foundItem.type === shapeType.img) {
          xx.playShort();
        }
      }
    }
  })
}