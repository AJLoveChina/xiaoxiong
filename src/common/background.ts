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

export function loadBG(canvas?: HTMLCanvasElement) {
  window.bubbly({
    gradientStart: "#fff4e6",
    gradientStop: "#ffe9e4",
    shadowBlur: 1,
    compose: "source-over",
    canvas: canvas,
    fillFunc: () => `hsla(${Math.random() * 50}, 100%, 50%, .3)`,
  });
}
