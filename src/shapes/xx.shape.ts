import { fabric } from "fabric";
import { IGroupOptions } from "fabric/fabric-impl";
import { nonNullable, playAudio, shapeType } from "../common/common";
import { Howl } from "howler";
import { AudioShape } from "./audio.shape";
import { enlivenObject } from "../common/fabric";

const fabAny: any = fabric;

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
  img?: fabric.Object;
  text?: fabric.Object;
  audioShape?: AudioShape;

  constructor(options?: XXOptions) {
    // options?.audioShape
    const allShapes = options
      ? [options.img, options?.text].filter(nonNullable)
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

    this.img = options?.img;
    this.text = options?.text;
    this.audioShape = options?.audioShape;
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

  toObject() {
    let json = super.toObject();
    delete json.objects;
    return {
      ...json,
      audioShort: this.audioShort,
      img: this.img ? this.img.toObject() : undefined,
      text: this.text ? this.text.toObject() : undefined,
      audioShape: this.audioShape ? this.audioShape.toObject() : undefined,
      hasControls: this.hasControls,
      lockMovementY: this.lockMovementY,
      lockMovementX: this.lockMovementX,
    };
  }

  static async fromObject(object: any, callback: (obj: XX) => void) {
    const options: XXOptions = fabAny.util.object.clone(object, true);

    const img = object.img ? await enlivenObject(object.img) : undefined;
    const text = object.text ? await enlivenObject(object.text) : undefined;
    const audioShape = object.audioShape
      ? await enlivenObject(object.audioShape)
      : undefined;

    Object.assign(options, {
      img: img,
      text: text,
      audioShape: audioShape,
    });

    callback(new XX(options));
  }
}
