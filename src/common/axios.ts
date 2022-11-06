import { fabric } from "fabric";
import { OriginShape } from "../shapes/origin.shape";

export function showCoords(options: { canvas: fabric.Canvas }) {
  options.canvas.add(new OriginShape());
}
