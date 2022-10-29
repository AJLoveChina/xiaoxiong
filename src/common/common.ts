import { IPoint } from "fabric/fabric-impl"
import { Howl } from "howler"

export enum shapeType {
  group = "group",
  audio = "audio",
  xx = "xx",
  img = "img",
  backgroundIMG = "backgroundIMG",
}

export function playAudio(url: string) {
  let how = new Howl({
    src: [url],
    loop: false,
    volume: 0.5,
  })
  how.play()
  return how
}

export function scaleObjTo(obj: fabric.Object, width: number, height: number) {
  obj.set({
    scaleX: (width / obj.getScaledWidth()) * (obj.scaleX || 1),
    scaleY: (height / obj.getScaledHeight()) * (obj.scaleY || 1),
  })
}

export function pointASubB(a: IPoint, b: IPoint) {
  return {
    x: a.x - b.x,
    y: a.y - b.y,
  }
}

export function invertPoint(a: IPoint) {
  return {
    x: -a.x,
    y: -a.y,
  }
}

export function getInitMatrix() {
  return [1, 0, 0, 1, 0, 0]
}

export enum CategoryEnum {
  FOOD,
  CAR,
}

export function nonNullable<T>(value: T): value is NonNullable<T> {
  return value !== null && value !== undefined
}
