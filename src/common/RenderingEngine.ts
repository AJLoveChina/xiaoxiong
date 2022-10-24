import {fabric} from "fabric";
import {fetchAssets, loadSVGIcon, svgToObj, TextImageConfig} from "./common";
import {XGroup} from "./Item";

export class RenderingEngine {
  canvas: fabric.Canvas;

  constructor(canvasEl: HTMLCanvasElement) {
    this.canvas = new fabric.Canvas(canvasEl, {});
  }


  destroy() {
    console.log("destroy");
    this.canvas.clear();
  }

  async render(config: TextImageConfig) {
    for (let i = 0; i < config.list.length; i++) {
      const item = config.list[i];

      let svg = await fetchAssets(item.img).then(res => res.text());
      let obj = await svgToObj(svg);

      obj.originX = "center";
      obj.originY = "center";
      obj.top = 0;
      obj.left = 0;

      const objs: fabric.Object[] = [];

      let text = new fabric.Text(item.name, {
        originY: 'center',
        originX: "center",
        top: (obj.height || 0) / 2 + 20,
        left: 0,
        fontSize: 20,
      })


      let audio = await loadSVGIcon("audio.svg");
      if (audio) {
        audio.set({
          top: -obj.getScaledHeight() / 2 - 20,
          left: obj.getScaledWidth() / 2 - 20,
          originY: 'center',
          originX: "center",
          scaleX: 20 / audio.getScaledWidth(),
          scaleY: 20 / audio.getScaledHeight(),
          fill: "#F00",
          stroke: "#F00",
          dirty: true,
        })
        objs.push(audio);
      }

      let xGroup = new XGroup([obj, text, ...objs], {
        left: 100,
        top: 100,
      });
      this.canvas.add(xGroup);
    }
  }
}
