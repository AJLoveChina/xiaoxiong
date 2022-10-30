import { fabric } from "fabric";
import { IGroupOptions } from "fabric/fabric-impl";
import { playAudio, shapeType } from "../common/common";
import { Howl } from "howler";

export class AudioShape extends fabric.Group {
  type = shapeType.audio;
  audio?: string;

  constructor(
    objs: fabric.Object[],
    options?: IGroupOptions & { audio: string }
  ) {
    super(objs, {
      left: 0,
      top: 0,
      originX: "center",
      originY: "center",
      ...options,
    });
    this.audio = options?.audio;
  }

  play() {
    let file = this.audio;

    if (file) {
      return playAudio(`/audio/${file}`);
    }
  }
}
