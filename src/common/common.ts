import {fabric} from "fabric";

export function speak(text: string) {
  return new Promise((resolve, reject) => {
    var msg = new SpeechSynthesisUtterance();
    var voices = window.speechSynthesis.getVoices();
    let zhcnIdx = voices.findIndex(item => item.name.toLowerCase().indexOf("普通话") !== -1);
    zhcnIdx = zhcnIdx === -1 ? 0 : zhcnIdx;
    console.log(zhcnIdx);
    msg.voice = voices[zhcnIdx];
    // msg.volume = 1; // 0 to 1
    // msg.rate = 1; // 0.1 to 10
    // msg.pitch = 2; //0 to 2
    msg.text = text;

    msg.onend = function (e) {
      resolve(true);
    };

    speechSynthesis.speak(msg);
  });
}

export interface TextImageConfig {
  list: {
    img: string,
    name: string,
    audio: string,
  }[]
}

export function svgToObj(svg: string): Promise<fabric.Object> {
  return new Promise((resolve, reject) => {
    fabric.loadSVGFromString(svg, (results, options) => {
      var shape = fabric.util.groupSVGElements(results, options);
      resolve(shape);
    })
  });
}

export function fetchAssets(pathUnderAssetsDir: string) {
  let newpath = pathUnderAssetsDir.startsWith("/") ? pathUnderAssetsDir : `/${pathUnderAssetsDir}`;
  return fetch(`/assets${newpath}`);
}

export async function loadSVGIcon(svgName: string) {
  let path = /svg\//.test(svgName) ? svgName : `/svg/${svgName}`;
  return fetchAssets(path).then(res => res.text()).then(svgString => {
    return svgToObj(svgString);
  })
}
