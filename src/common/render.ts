import { loadIMG, loadSP, loadSVGString } from "./fabric";
import { fabric } from "fabric";
import { DataConfig } from "./data/data.config";
import { ceshiIcon, refreshIcon } from "./svg";
import { nonNullable, scaleObjTo, shapeType } from "./common";
import { startTest } from "./event";
import { locate1, locate2 } from "./shapes.locate";

export async function addTestButton(
  canvas: fabric.Canvas,
  options: { left: number; top: number; width: number; height: number },
  dataConfig: DataConfig
) {
  const ceshiButton = await loadSVGString(ceshiIcon);
  scaleObjTo(ceshiButton, options.width, options.height);
  ceshiButton.set({
    fill: "#ee6f0b",
    left: options.left,
    top: options.top,
    selectable: false,
  });

  canvas.add(ceshiButton);

  let bTesting = false;
  ceshiButton.on("mouseup", () => {
    if (!bTesting) {
      bTesting = true;
      startTest(canvas, dataConfig);
    }
  });

  return ceshiButton;
}

export async function addRefreshButton(
  canvas: fabric.Canvas,
  options: { left: number; top: number; width: number; height: number }
) {
  const button = await loadSVGString(refreshIcon);
  scaleObjTo(button, options.width, options.height);
  button.set({
    fill: "#ee6f0b",
    left: options.left,
    top: options.top,
    selectable: false,
  });

  canvas.add(button);

  button.on("mouseup", () => {
    window.location.reload();
  });
}

export async function addShapes(
  canvas: fabric.Canvas,
  options: { left: number; top: number },
  dataConfig: DataConfig
) {
  let shapes = (
    await Promise.all(
      dataConfig.list.map(async (item, idx) => {
        return await loadSP(item);
      })
    )
  ).filter(nonNullable);

  locate1({ shapes, canvas, ...options });

  canvas.add(...shapes);
}

export async function render(canvas: fabric.Canvas, dataConfig: DataConfig) {
  // const titleObj = await dataConfig.getTitleObj();
  // titleObj.set({
  //   left: canvas.getWidth() / 2,
  //   top: titleObj.getScaledHeight() / 2 + 40,
  //   selectable: false,
  // });
  //
  // canvas.add(titleObj);
  //
  // const titleObjBBOX = titleObj.getBoundingRect(true);
  // const btnOptions = {
  //   width: 30,
  //   height: 30,
  // };
  // await addTestButton(
  //   canvas,
  //   {
  //     ...btnOptions,
  //     left: titleObjBBOX.left + titleObjBBOX.width + btnOptions.width + 10,
  //     top: titleObjBBOX.top + titleObjBBOX.height - btnOptions.height / 2,
  //   },
  //   dataConfig
  // );
  //
  // await addRefreshButton(canvas, {
  //   ...btnOptions,
  //   left:
  //     titleObjBBOX.left + titleObjBBOX.width + btnOptions.width * 2 + 10 * 2,
  //   top: titleObjBBOX.top + titleObjBBOX.height - btnOptions.height / 2,
  // });

  await addShapes(
    canvas,
    {
      left: 0,
      top: 0,
    },
    dataConfig
  );
}

export async function drawFoodBackground(canvas: fabric.Canvas) {
  let img = await loadIMG(`img/food-bg2.jpg`);
  await drawBackground(canvas, img);
}

export async function drawCarBackground(canvas: fabric.Canvas) {
  let img = await loadIMG(`img/car-bg.jpg`);
  await drawBackground(canvas, img);
}

export async function drawBackground(
  canvas: fabric.Canvas,
  img: HTMLImageElement
) {
  let xTotal = Math.floor(canvas.getWidth() / img.width) + 1;
  let yTotal = Math.floor(canvas.getHeight() / img.height) + 1;

  let objs: fabric.Object[] = [];
  for (let i = 0; i < xTotal; i++) {
    for (let j = 0; j < yTotal; j++) {
      let imgObj = new fabric.Image(img, {
        left: (i - xTotal / 2) * img.width,
        top: (j - yTotal / 2) * img.height,
        originX: "center",
        originY: "center",
        flipX: i % 2 === 1,
        flipY: j % 2 === 1,
      });

      objs.push(imgObj);
    }
  }

  let group = new fabric.Group(objs, {
    type: shapeType.backgroundIMG,
    selectable: false,
    left: 0,
    top: 0,
    originX: "left",
    originY: "top",
    opacity: 0.6,
  });
  canvas.add(group);
  canvas.sendToBack(group);
}
