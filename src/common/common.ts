import {Howl} from "howler";

export enum shapeType {
  group = "group",
  audio = "audio",
  xx = "xx",
  img = "img",
}

export function playAudio(url:string) {
  let how = new Howl({
    src: [url],
    loop: false,
    volume: 0.5,
  });
  how.play();
  return how;
}

export function scaleObjTo(obj: fabric.Object, width: number, height: number) {
  obj.set({
    scaleX: width / obj.getScaledWidth() * (obj.scaleX || 1),
    scaleY: height / obj.getScaledHeight() * (obj.scaleY || 1),
  })
}