import { fabric } from "fabric"
import { shapeType } from "../common/common"
import { Howl } from "howler"
import { AudioShape } from "./audio.shape"
import { enlivenObject } from "../common/fabric"
import { XXOptions } from "./xx.shape"

const fabAny: any = fabric

export class XXIMG extends fabric.Group {
  type = shapeType.img

  constructor(objs: fabric.Object[], options?: fabric.IGroupOptions) {
    super(objs, {
      left: 0,
      top: 0,
      originX: "center",
      originY: "center",
      ...options,
    })
  }

  static async fromObject(object: any, callback: (obj: XXIMG) => void) {
    var objects = object.objects,
      options = fabAny.util.object.clone(object, true)

    fabric.util.enlivenObjects(objects, function(enlivenedObjects: any) {
      callback(new XXIMG(enlivenedObjects, options))
    }, "")
  };
}
