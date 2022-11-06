import { fabric } from "fabric";
import { CustomFabCanvas } from "./fabric";

export function renderByJson(
  canvas: CustomFabCanvas,
  json: Record<string, any>
): Promise<CustomFabCanvas> {
  return new Promise((resolve, reject) => {
    canvas.loadFromJSON(json, () => {
      resolve(canvas);
    });
  });
}
