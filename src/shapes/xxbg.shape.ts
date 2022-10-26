import { fabric } from 'fabric'
import { shapeType } from "../common/common";
import { Howl } from "howler";
import { AudioShape } from "./audio.shape";


export class XXIMG extends fabric.Group {
  type = shapeType.img;

  constructor(objs: fabric.Object[], options?: fabric.IGroupOptions) {
    super(objs, {
      left: 0,
      top: 0,
      originX: "center",
      originY: "center",
      ...options
    });
  }
}