import {hanbobo, xuegao} from "./svg";

export interface DataItem {
  svg: string | [string];
  text: string;
  audio: string;
  audioShort: string;
}

export interface DataConfig {
  list: DataItem[]
}

export const dataConfig: DataConfig = {
  list: [
    {
      svg: "regou.svg",
      text: "冰淇淋",
      audio: 'ice-cream.mp3',
      audioShort: "ice-cream-2.mp3",
    },
    {
      svg: [hanbobo],
      text: "汉堡包",
      audio: 'hbb2.mp3',
      audioShort: "hbb.mp3",
    },
    {
      svg: [xuegao],
      text: "雪糕",
      audio: 'xuegao.mp3',
      audioShort: "xuegao2.mp3",
    },
  ]
}
