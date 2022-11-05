import { fabric } from "fabric";

export async function drawBackgroundByFabric({
  canvas,
  img,
}: {
  canvas: fabric.Canvas;
  img: string;
}) {
  canvas.setBackgroundColor(
    new fabric.Pattern({ source: img, repeat: "repeat" }),
    () => {}
  );
}
