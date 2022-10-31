import { fabric } from "fabric"
import { IGroupOptions } from "fabric/fabric-impl"
import { playAudio, shapeType } from "../common/common"
import { Howl } from "howler"

const fabAny: any = fabric;
export interface IAudioShapeOptions extends fabric.IGroupOptions {
  audio: string
}

export class AudioShape extends fabric.Group {
  type = shapeType.audio
  audio?: string

  constructor(
    objs: fabric.Object[],
    options?: IAudioShapeOptions,
  ) {
    super(objs, {
      left: 0,
      top: 0,
      originX: "center",
      originY: "center",
      ...options,
    })
    this.audio = options?.audio
  }

  play() {
    let file = this.audio

    if (file) {
      return playAudio(`/audio/${file}`)
    }
  }

  toObject() {
    let json = super.toObject()
    return {
      ...json,
      audio: this.audio,
    }
  }

  static fromObject(object: any, callback: (obj: AudioShape) => void) {
    var objects = object.objects,
      options = fabAny.util.object.clone(object, true)

    fabric.util.enlivenObjects(objects, function(enlivenedObjects: any) {
      callback(new AudioShape(enlivenedObjects, options))
    }, "")
  };
}
