import { XX } from "../shapes/xx.shape";

export function locate1({
  shapes,
  canvas,
  left,
  top,
}: {
  shapes: XX[];
  canvas: fabric.Canvas;
  left: number;
  top: number;
}) {
  const margin = 30;
  const options = { left, top };
  let widthCount: number = margin;
  let heightCount: number = margin + options.top;
  shapes = shapes.sort(() => {
    return Math.random() - 0.5;
  });

  const shapesArea = shapes.reduce<number>((area, item) => {
    return (
      area +
      (item.getScaledWidth() + margin) * (item.getScaledHeight() + margin)
    );
  }, 0);

  const totalArea =
    (canvas.getWidth() - options.left - 20) *
    (canvas.getHeight() - options.top - 20);
  const scaleTotal = Math.min(1, totalArea / shapesArea);
  const scale = Math.pow(scaleTotal, 1 / 2);

  console.log("scaleTotal", scaleTotal);
  shapes.forEach((sp) => {
    sp.set({
      scaleX: (sp.scaleX || 1) * scale,
      scaleY: (sp.scaleY || 1) * scale,
    });

    const scaledMargin = margin * scale;

    if (widthCount + sp.getScaledWidth() < canvas.getWidth()) {
      widthCount += sp.getScaledWidth();
      widthCount += scaledMargin;
    } else {
      widthCount = scaledMargin + sp.getScaledWidth();
      heightCount += sp.getScaledHeight();
      heightCount += scaledMargin;
    }

    sp.set({
      left: widthCount - sp.getScaledWidth() / 2,
      top: heightCount + sp.getScaledHeight() / 2,
    });
  });
}

export function locate2({
  shapes,
  canvas,
  left,
  top,
}: {
  shapes: XX[];
  canvas: fabric.Canvas;
  left: number;
  top: number;
}) {
  const margin = 30;
  let x = 0;
  let y = 0;
  const width = canvas.getWidth();
  const height = canvas.getHeight();
  let maxObjH = 0;
  shapes.forEach((item) => {
    maxObjH = Math.max(maxObjH, item.getScaledHeight());
    if (x + item.getScaledWidth() < width) {
      item.set({
        left: x + item.getScaledWidth() / 2,
        top: y + item.getScaledHeight() / 2,
      })
      x = x + item.getScaledWidth() + margin;
    } else {
      x = 0;
      y += maxObjH;
      maxObjH = 0;
      item.set({
        left: x,
        top: y,
      })
    }
  })
}
