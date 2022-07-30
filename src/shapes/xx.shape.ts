import {fabric} from 'fabric'
import {IGroupOptions} from "fabric/fabric-impl";
import {playAudio, shapeType} from "../common/common";
import {Howl} from "howler";
import {AudioShape} from "./audio.shape";


export class XX extends fabric.Group {
  type =  shapeType.xx;
  audio: AudioShape;
  audioShort?: string;
  currentPlayHow?: Howl;

  constructor(objs: [fabric.Object, fabric.Object, AudioShape], options?: IGroupOptions & {audioShort: string}) {
    super(objs, {
      left: 0,
      top: 0,
      originX: "center",
      originY: "center",
      ...options
    });
    this.audio = objs[2];
    this.audioShort = options?.audioShort;
  }

  play() {
    this.clearSound();
    this.currentPlayHow = this.audio.play();
  }

  playShort() {
    this.clearSound();
    if (this.audioShort) {
      this.currentPlayHow = playAudio(`/audio/${this.audioShort}`);
    }
  }

  clearSound() {
    if (this.currentPlayHow) {
      this.currentPlayHow.stop();
      this.currentPlayHow = undefined;
    }
  }
}