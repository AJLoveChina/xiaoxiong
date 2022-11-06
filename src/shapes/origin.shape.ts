import { fabric } from "fabric";
import { ICustomObjOptions } from "./obj.common";

export interface IOriginShapeOptions
  extends fabric.ICircleOptions,
    ICustomObjOptions {}

export class OriginShape extends fabric.Circle implements ICustomObjOptions {
  bExcludeInExportJSON = true;

  constructor(options?: IOriginShapeOptions) {
    super({
      ...options,
      radius: 4,
      fill: "red",
      left: 0,
      top: 0,
    });
  }

  toObject() {
    return super.toObject(["bExcludeInExportJSON"]);
  }
}
