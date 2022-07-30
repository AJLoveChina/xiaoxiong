import {fabric} from 'fabric'
import {loadSVGFromString} from "fabric/fabric-impl";
import {audioSVG} from "./svg";
import {AudioShape} from "../shapes/audio.shape";
import {XX} from "../shapes/xx.shape";
import {XXIMG} from "../shapes/xxbg.shape";


export function initFabric(dom: HTMLCanvasElement) {


  let fabCanvas = new fabric.Canvas(dom, {
    width: window.innerWidth,
    height: window.innerHeight,
    selection: true,
  });

  return {
    dom,
    fabCanvas,
  };
}

export function loadSVG({svg}: { svg: string }) {
  return new Promise<fabric.Object>((resolve, reject) => {
    fabric.loadSVGFromURL(`/svg/${svg}`, (objects) => {
      var svgData = fabric.util.groupSVGElements(objects, {});
      resolve(svgData);
    })
  })
}

export function loadSVGString(svg: string) {
  return new Promise<fabric.Object>((resolve, reject) => {
    fabric.loadSVGFromString(svg, (objects) => {
      var svgData = fabric.util.groupSVGElements(objects, {});
      resolve(svgData);
    })
  })
}


export async function loadSP({
                               svg,
                               text,
                               audio,
                               audioShort
                             }: { svg: string | [string], text: string, audio: string, audioShort: string }) {
  let sp1;
  if (svg instanceof Array) {
    sp1 = await loadSVGString(svg[0]);
  } else {
    sp1 = await loadSVG({svg});
  }
  sp1.set({
    left: 0,
    top: 0,
    originX: "center",
    originY: "center",
  });

  let xximg = new XXIMG([sp1])

  let spText = new fabric.Text(text, {
    left: 0,
    top: sp1.getScaledHeight() / 2 + 20,
    fontSize: 20,
    originX: "center",
    originY: "center",
  })

  let audioItem = await loadSVGString(audioSVG);
  audioItem.set({
    originX: "center",
    originY: "center",
    scaleX: 25 / audioItem.getScaledWidth() * (audioItem.scaleX || 1),
    scaleY: 25 / audioItem.getScaledHeight() * (audioItem.scaleY || 1),
  })
  let audioShape = new AudioShape([audioItem], {
    audio,

  });
  audioShape.set({
    left: 0,
    top: -sp1.getScaledHeight() / 2 - 20,
  })

  const objs: [XXIMG, fabric.Object, AudioShape] = [xximg, spText, audioShape];


  return new XX(objs, {
    audioShort,
  });
}