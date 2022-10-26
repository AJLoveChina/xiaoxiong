import { loadSVGString } from "../fabric";
import { diaoche, foodTitle } from "../svg";
import { DataConfig } from "./data.config";

export const carDataConfig: DataConfig = {
  getTitleObj: async () => {
    let svg = await loadSVGString(foodTitle);
    return svg;
  },
  list: [
    {
      img: "car/xiaojiaoche.png",
      text: "小汽车",
      audio: "小汽车.mp3",
      audioShort: "小汽车.mp3",
    },
    {
      svg: [diaoche],
      text: "吊车",
      audio: "吊车.mp3",
      audioShort: "吊车.mp3",
    },

    {
      img: "car/wajueji.png",
      text: "挖掘机",
      audio: "挖掘机.mp3",
      audioShort: "挖掘机.mp3",
    },

    {
      img: "car/tuituji.jpg",
      text: "推土机",
      audio: "推土机.mp3",
      audioShort: "推土机.mp3",
    },

    {
      img: "car/yaluji.jpg",
      text: "压路机",
      audio: "压路机.mp3",
      audioShort: "压路机.mp3",
    },

    {
      img: "car/jiuhuche.png",
      text: "救护车",
      audio: "救护车.mp3",
      audioShort: "救护车.mp3",
    },
    {
      img: "car/huoche.jpg",
      text: "火车",
      audio: "火车.mp3",
      audioShort: "火车.mp3",
    },
    {
      img: "car/feiji.jpg",
      text: "飞机",
      audio: "飞机.mp3",
      audioShort: "飞机.mp3",
    },
    {
      img: "car/feiji2.jpg",
      text: "飞机2",
      audio: "飞机.mp3",
      audioShort: "飞机.mp3",
    },

    {
      img: "car/feiji3.png",
      text: "坐飞机",
      audio: "坐飞机.mp3",
      audioShort: "坐飞机.mp3",
    },

    {
      img: "car/jinche.png",
      text: "警车",
      audio: "警车.mp3",
      audioShort: "警车.mp3",
    },
    {
      img: "car/chuzuche.jpg",
      text: "出租车",
      audio: "出租车.mp3",
      audioShort: "出租车.mp3",
    },
    {
      img: "car/xiaohuoche.jpg",
      text: "小货车",
      audio: "小货车.mp3",
      audioShort: "小货车.mp3",
    },
    {
      img: "car/huolala.jpg",
      text: "货拉拉",
      audio: "货拉拉.mp3",
      audioShort: "货拉拉.mp3",
    },
    {
      img: "car/boli.jpg",
      text: "玻利警车",
      audio: "玻利警车.mp3",
      audioShort: "玻利警车.mp3",
    },
    {
      img: "car/anba.png",
      text: "救护车安吧",
      audio: "救护车安吧.mp3",
      audioShort: "救护车安吧.mp3",
    },
    {
      img: "car/luoyi.jpg",
      text: "消防车罗伊罗伊",
      audio: "消防车罗伊罗伊.mp3",
      audioShort: "消防车罗伊罗伊.mp3",
    },
    {
      img: "car/luoyi2.png",
      text: "消防车罗伊罗伊",
      audio: "消防车罗伊罗伊.mp3",
      audioShort: "消防车罗伊罗伊.mp3",
    },

    {
      img: "car/haili.png",
      text: "直升机海利",
      audio: "直升机海利.mp3",
      audioShort: "直升机海利.mp3",
    },
    {
      img: "car/sanlunche.png",
      text: "三轮车",
      audio: "三轮车.mp3",
      audioShort: "三轮车.mp3",
    },
    {
      img: "car/jiaotache.png",
      text: "脚踏车",
      audio: "脚踏车.mp3",
      audioShort: "脚踏车.mp3",
    },
    {
      img: "car/vv7.png",
      text: "黑猪猪vv7",
      audio: "黑猪猪vv7.mp3",
      audioShort: "黑猪猪vv7.mp3",
    },
  ],
};
