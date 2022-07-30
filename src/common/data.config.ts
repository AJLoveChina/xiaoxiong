import {
  bangbangtang,
  binkuai, foodTitle,
  hanbobo, hebaodan,
  huafubin,
  huoguo,
  juzizhi, kuangquanshui, lajiao, niunai,
  regou, roujiamo,
  sanminzhi,
  shizi, shutiao,
  xuegao,
  youtiao
} from "./svg";
import {loadSVGString} from "./fabric";

export interface DataItem {
  svg: string | [string];
  text: string;
  audio: string;
  audioShort: string;
}

export interface DataConfig {
  list: DataItem[],
  getTitleObj: () => Promise<fabric.Object>;
}

export const dataConfig: DataConfig = {
  getTitleObj: async () => {
    let svg = await loadSVGString(foodTitle);
    return svg;
  },
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
    {
      svg: [sanminzhi],
      text: "三明治",
      audio: "",
      audioShort: "三明治.mp3",
    },
    {
      svg: [binkuai],
      text: "冰块",
      audio: "",
      audioShort: "冰块.mp3",
    },
    {
      svg: [huafubin],
      text: "华夫饼",
      audio: "",
      audioShort: "华夫饼.mp3",
    },
    {
      svg: [shizi],
      text: "柿子",
      audio: "",
      audioShort: "柿子.mp3",
    },
    {
      svg: [bangbangtang],
      text: "棒棒糖",
      audio: "",
      audioShort: "棒棒糖.mp3",
    },
    {
      svg: [juzizhi],
      text: "橘子汁",
      audio: "",
      audioShort: "橘子汁.mp3",
    },
    {
      svg: [youtiao],
      text: "油条",
      audio: "",
      audioShort: "油条.mp3",
    },
    {
      svg: [huoguo],
      text: "火锅",
      audio: "",
      audioShort: "火锅.mp3",
    },
    {
      svg: [regou],
      text: "热狗",
      audio: "",
      audioShort: "热狗.mp3",
    },
    {
      svg: [niunai],
      text: "牛奶",
      audio: "",
      audioShort: "牛奶.mp3",
    },
    {
      svg: [kuangquanshui],
      text: "矿泉水",
      audio: "",
      audioShort: "矿泉水.mp3",
    },
    {
      svg: [roujiamo],
      text: "肉夹馍",
      audio: "",
      audioShort: "肉夹馍.mp3",
    },
    {
      svg: [hebaodan],
      text: "荷包蛋",
      audio: "",
      audioShort: "荷包蛋.mp3",
    },
    {
      svg: [shutiao],
      text: "薯条",
      audio: "",
      audioShort: "薯条.mp3",
    },
    {
      svg: [lajiao],
      text: "辣椒",
      audio: "",
      audioShort: "辣椒.mp3",
    },
  ]
}
