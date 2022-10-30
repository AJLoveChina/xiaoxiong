import { useEffect, useRef, useState } from "react";
import { initFabric } from "../../common/fabric";
import { drawCarBackground, render } from "../../common/render";
import { carDataConfig } from "../../common/data/car.data.config";
import { onClickAudio, supportDrag } from "../../common/event";
import { DataItem } from "../../common/data/data.config";

export function Playground() {
  const div = useRef<HTMLDivElement>(null);
  const data: { items: DataItem[] } = {
    items: [
      {
        img: "",
        text: "",
        audio: "",
        audioShort: "",
      },
    ],
  };
  const [initData, setInitData] = useState(JSON.stringify(data));

  useEffect(() => {
    if (!div.current) {
      return;
    }

    let dom = document.createElement("canvas");
    div.current.appendChild(dom);

    const { fabCanvas } = initFabric(dom, {});
    (window as any).fabCanvas = fabCanvas;
    (window as any).canvas = fabCanvas;

    async function main() {
      supportDrag(fabCanvas);
    }

    main();

    return () => {
      if (div.current) {
        div.current.innerHTML = "";
      }
    };
  }, [div]);

  return (
    <div>
      <textarea
        value={initData}
        onChange={(ev) => {
          setInitData(ev.target.value);
        }}
      ></textarea>
      <div ref={div}></div>
    </div>
  );
}
