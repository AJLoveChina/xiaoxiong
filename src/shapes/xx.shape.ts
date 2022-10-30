import { fabric } from "fabric";
import { IGroupOptions } from "fabric/fabric-impl";
import { nonNullable, playAudio, shapeType } from "../common/common";
import { Howl } from "howler";
import { AudioShape } from "./audio.shape";

export interface XXOptions extends IGroupOptions {
  audioShort?: string;
  img?: fabric.Object;
  text?: fabric.Object;
  audioShape?: AudioShape;
}

export class XX extends fabric.Group {
  type = shapeType.xx;
  audio?: AudioShape;
  audioShort?: string;
  currentPlayHow?: Howl;

  constructor(options?: XXOptions) {
    const allShapes = options
      ? [options.img, options?.text, options?.audioShape].filter(nonNullable)
      : [];

    super(allShapes, {
      left: 0,
      top: 0,
      originX: "center",
      originY: "center",
      lockMovementY: true,
      lockMovementX: true,
      hasControls: false,
      ...options,
    });
    this.audio = options?.audioShape;
    this.audioShort = options?.audioShort;
  }

  play() {
    this.clearSound();
    if (this.audio) {
      this.currentPlayHow = this.audio.play();
    }
    return this.currentPlayHow;
  }

  playShort() {
    this.clearSound();
    if (this.audioShort) {
      this.currentPlayHow = playAudio(`/audio/${this.audioShort}`);
      return this.currentPlayHow;
    }
  }

  clearSound() {
    if (this.currentPlayHow) {
      this.currentPlayHow.stop();
      this.currentPlayHow = undefined;
    }
  }
}
