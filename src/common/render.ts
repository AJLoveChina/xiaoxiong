import {loadSP} from "./fabric";
import {hanbobo} from "./svg";

interface DataItem {
  svg: string | [string];
  text: string;
  audio: string;
  audioShort: string;
}

interface DataConfig {
  list: DataItem[]
}
export async function render(canvas: fabric.Canvas) {

  const config:DataConfig = {
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
    ]
  }

  await Promise.all(config.list.map(async item => {
    const sp = await loadSP(item);

    sp.set({
      left: sp.getScaledWidth() / 2 + 100,
      top: sp.getScaledHeight() / 2 + 100,
    })

    canvas.add(sp);
  }))
}