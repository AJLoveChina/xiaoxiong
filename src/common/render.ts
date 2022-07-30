import {loadSP} from "./fabric";
import {fabric} from 'fabric'
import {dataConfig} from "./data.config";

export async function render(canvas: fabric.Canvas) {
  await Promise.all(dataConfig.list.map(async item => {
    const sp = await loadSP(item);

    sp.set({
      left: sp.getScaledWidth() / 2 + 100,
      top: sp.getScaledHeight() / 2 + 100,
    })

    canvas.add(sp);
  }))
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