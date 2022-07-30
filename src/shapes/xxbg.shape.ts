import {fabric} from 'fabric'
import {IGroupOptions} from "fabric/fabric-impl";
import {shapeType} from "../common/common";
import {Howl} from "howler";
import {AudioShape} from "./audio.shape";


export class XXIMG extends fabric.Group {
  type =  shapeType.img;

  constructor(objs: fabric.Object[], options?: IGroupOptions) {
    super(objs, {
      left: 0,
      top: 0,
      originX: "center",
      originY: "center",
      ...options
    });
  }
}