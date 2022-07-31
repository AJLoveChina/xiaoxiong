import {loadSP, loadSVGString} from "./fabric";
import {fabric} from 'fabric'
import {DataConfig, dataConfig} from "./data.config";
import {ceshiIcon} from "./svg";
import {scaleObjTo} from "./common";
import {startTest} from "./event";

export async function addTestButton(canvas: fabric.Canvas, options: { left: number, top: number }) {
  const ceshiButton = await loadSVGString(ceshiIcon);
  scaleObjTo(ceshiButton, 30, 30);
  ceshiButton.set({
    left: options.left,
    top: options.top - ceshiButton.getScaledHeight() / 2,
  })

  canvas.add(ceshiButton);

  let bTesting = false;
  ceshiButton.on('mouse:up', () => {
    if (!bTesting) {
      bTesting = true;
      startTest(canvas, dataConfig);
    }
  })
}

export async function addShapes(canvas: fabric.Canvas, data: DataConfig, options: { left: number, top: number }) {
  const margin = 30;
  let widthCount: number = margin;
  let heightCount: number = margin + options.top;

  const shapes = await Promise.all(dataConfig.list.map(async (item, idx) => {
    return await loadSP(item);
  }))

  const shapesArea = shapes.reduce<number>((area, item) => {
    return area + (item.getScaledWidth() + margin) * (item.getScaledHeight() + margin);
  }, 0)

  const totalArea = (canvas.getWidth() - options.left - 20) * (canvas.getHeight() - options.top - 20);
  const scaleTotal = Math.min(1, totalArea / shapesArea);
  const scale = Math.pow(scaleTotal, 1 / 2);

  console.log("scaleTotal", scaleTotal);
  shapes.forEach(sp => {
    sp.set({
      scaleX: (sp.scaleX || 1) * scale,
      scaleY: (sp.scaleY || 1) * scale,
    })

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
    })

    canvas.add(sp);
  })
}

export async function render(canvas: fabric.Canvas) {
  const titleObj = await dataConfig.getTitleObj();
  titleObj.set({
    left: canvas.getWidth() / 2,
    top: titleObj.getScaledHeight() / 2 + 40,
    selectable: false,
  });

  canvas.add(titleObj);

  const titleObjBBOX = titleObj.getBoundingRect(true);
  await addTestButton(canvas, {
    left: titleObjBBOX.left + titleObjBBOX.width + 30,
    top: titleObjBBOX.top + titleObjBBOX.height,
  })

  await addShapes(canvas, dataConfig, {
    left: 0,
    top: titleObjBBOX.top + titleObj.getScaledHeight(),
  });

}


export async function drawFoodBackground(canvas: fabric.Canvas) {
  let img = new Image();
  img.src = `img/food-bg2.jpg`;
  img.onload = () => {

    let xTotal = Math.floor(canvas.getWidth() / img.width) + 1;
    let yTotal = Math.floor(canvas.getHeight() / img.height) + 1;

    let objs: fabric.Object[] = [];
    for (let i = 0; i < xTotal; i++) {
      for (let j = 0; j < yTotal; j++) {
        let imgObj = new fabric.Image(img, {
          left: (i - (xTotal / 2)) * img.width,
          top: (j - (yTotal / 2)) * img.height,
          originX: "center",
          originY: "center",
          flipX: i % 2 === 1,
          flipY: j % 2 === 1,
        });

        objs.push(imgObj);
      }
    }

    let group = new fabric.Group(objs, {
      selectable: false,
      left: 0,
      top: 0,
      originX: "left",
      originY: "top",
      opacity: 0.6,
    })
    canvas.add(group);
    canvas.sendToBack(group);
  }


}