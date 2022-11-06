import { fabric } from "fabric";
import {
  ICanvasOptions,
  IObjectOptions,
  loadSVGFromString,
} from "fabric/fabric-impl";
import { audioSVG } from "./svg";
import { AudioShape } from "../shapes/audio.shape";
import { XX, XXOptions } from "../shapes/xx.shape";
import { XXIMG } from "../shapes/xxbg.shape";
import { DataItem } from "./data/data.config";

const fabAny: any = fabric;

export const CustomFab = Object.assign(fabric, {
  XX: XX,
  Xx: XX,
  XXIMG: XXIMG,
  AudioShape: AudioShape,
});

export class CustomFabCanvas extends fabric.Canvas {
  _copyObject: fabric.Object | undefined = undefined;

  constructor(dom: HTMLCanvasElement, options: fabric.ICanvasOptions) {
    super(dom, options);
  }

  toJSON() {
    return this.toObject();
  }

  disableSelectAllObjs() {
    this._objects.forEach(item => item.selectable = false)
  }

  disableMovementAllObjs() {
    this._objects.forEach(item => {
      item.lockMovementX = true;
      item.lockMovementY = true;
    })
  }

  toObject() {
    let json = super.toObject();
    if (json.objects) {
      json.objects = json.objects.filter((item: any) => {
        if (item.bExcludeInExportJSON) {
          return false;
        }
        return true;
      });
    }

    return json;
  }

  mousePosition: fabric.IPoint | undefined = undefined;

  recordMousePosition() {
    this.on("mouse:move", (ev) => {
      this.mousePosition = this.getPointer(ev.e, false);
    });
    this.on("mouse:down", (ev) => {
      this.mousePosition = this.getPointer(ev.e, false);
      console.log("mouse:down recordMousePosition", this.mousePosition);
    });
  }
}

export class CustomFabObj extends fabric.Object {
  originX = "center";
  originY = "center";

  constructor(options?: IObjectOptions) {
    super(options);
  }
}

export function initFabric(dom: HTMLCanvasElement, options: ICanvasOptions) {
  fabAny.XX = XX;
  fabAny.Xx = XX;
  fabAny.XXIMG = XXIMG;
  fabAny.AudioShape = AudioShape;

  fabric.Object.prototype.originX = "center";
  fabric.Object.prototype.originY = "center";

  let fabCanvas = new CustomFabCanvas(dom, {
    width: window.innerWidth,
    height: window.innerHeight,
    selection: true,
    backgroundColor: "rgba(0,0,0,0)",
    ...options,
  });

  return {
    dom,
    fabCanvas,
  };
}

export function loadSVG({ svg }: { svg: string }) {
  return new Promise<fabric.Object>((resolve, reject) => {
    fabric.loadSVGFromURL(`/svg/${svg}`, (objects) => {
      var svgData = fabric.util.groupSVGElements(objects, {});
      resolve(svgData);
    });
  });
}

export function loadIMG(src: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    let img = new Image();
    img.src = src;
    img.onload = () => {
      resolve(img);
    };
    img.onerror = () => {
      reject();
    };
  });
}

export function loadFabImgFromImg(
  img: HTMLImageElement,
  options: { maxWidth?: number }
) {
  let fabImg = new fabric.Image(img);
  let oWidth = fabImg.width;
  let oHeight = fabImg.height;
  if (oWidth && oHeight && options.maxWidth && oWidth > options.maxWidth) {
    let scale = options.maxWidth / oWidth;
    fabImg.set({
      scaleX: scale,
      scaleY: scale,
    });
  }

  return fabImg;
}

export function loadSVGString(svg: string) {
  return new Promise<fabric.Object>((resolve, reject) => {
    fabric.loadSVGFromString(svg, (objects) => {
      var svgData = fabric.util.groupSVGElements(objects, {});
      resolve(svgData);
    });
  });
}

export async function loadSP({ svg, img, text, audio, audioShort }: DataItem) {
  let sp1: fabric.Object;

  if (svg) {
    if (svg instanceof Array) {
      sp1 = await loadSVGString(svg[0]);
    } else {
      sp1 = await loadSVG({ svg });
    }
    const minWidth = 150;
    if (sp1.width && sp1.width < minWidth) {
      sp1.set({
        scaleX: minWidth / sp1.width,
        scaleY: minWidth / sp1.width,
      });
    }
  } else if (img) {
    let modifyIMG = img.replace(/^\//, "");
    let imgEle = await loadIMG(`img/${modifyIMG}`);
    let fabImg = loadFabImgFromImg(imgEle, { maxWidth: 200 });
    sp1 = fabImg;
  } else {
    return null;
  }

  sp1.set({
    left: 0,
    top: 0,
    originX: "center",
    originY: "center",
  });

  const xxOptions: XXOptions = {};

  xxOptions.img = new XXIMG([sp1]);

  if (text !== undefined) {
    let spText = new fabric.Text(text, {
      left: 0,
      top: sp1.getScaledHeight() / 2 + 20,
      fontSize: 20,
      originX: "center",
      originY: "center",
    });

    xxOptions.text = spText;
  }

  if (audio) {
    let audioItem = await loadSVGString(audioSVG);
    audioItem.set({
      originX: "center",
      originY: "center",
      scaleX: (25 / audioItem.getScaledWidth()) * (audioItem.scaleX || 1),
      scaleY: (25 / audioItem.getScaledHeight()) * (audioItem.scaleY || 1),
    });

    let audioShape = new AudioShape([audioItem], {
      audio,
    });
    audioShape.set({
      left: 0,
      top: -sp1.getScaledHeight() / 2 - 20,
    });

    xxOptions.audioShape = audioShape;
  }

  return new XX({
    audioShort,
    ...xxOptions,
  });
}

export function enlivenObject(obj: any): Promise<fabric.Object | undefined> {
  return new Promise((resolve, reject) => {
    fabric.util.enlivenObjects(
      [obj],
      (objs: any) => {
        resolve(objs[0] || undefined);
      },
      ""
    );
  });
}
