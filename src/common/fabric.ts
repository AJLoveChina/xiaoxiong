import { fabric } from "fabric";
import { ICanvasOptions, loadSVGFromString } from "fabric/fabric-impl";
import { audioSVG } from "./svg";
import { AudioShape } from "../shapes/audio.shape";
import { XX } from "../shapes/xx.shape";
import { XXIMG } from "../shapes/xxbg.shape";
import { DataItem } from "./data/data.config";

export function initFabric(dom: HTMLCanvasElement, options: ICanvasOptions) {
  let fabCanvas = new fabric.Canvas(dom, {
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
    let imgEle = await loadIMG(`img/${img}`);
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

  let xximg = new XXIMG([sp1]);

  let spText = new fabric.Text(text, {
    left: 0,
    top: sp1.getScaledHeight() / 2 + 20,
    fontSize: 20,
    originX: "center",
    originY: "center",
  });

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

  const objs: [XXIMG, fabric.Object, AudioShape] = [xximg, spText, audioShape];

  return new XX(objs, {
    audioShort,
  });
}
