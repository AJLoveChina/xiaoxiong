import {loadSP} from "./fabric";
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