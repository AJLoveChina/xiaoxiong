import { useCallback, useEffect, useRef, useState } from "react";
import { initFabric, loadSP } from "../../common/fabric";
import { drawCarBackground, render } from "../../common/render";
import { carDataConfig } from "../../common/data/car.data.config";
import { onClickAudio, supportDrag } from "../../common/event";
import { DataItem } from "../../common/data/data.config";
import { useUploadPasteFile } from "../../common/uploadPasteFile";
import { nonNullable } from "../../common/common";

interface FabricCanvasJSON {
  objects: fabric.Object[];
}

export function Playground() {
  const div = useRef<HTMLDivElement>(null);
  const [fabCanvas, setFabCanvas] = useState<fabric.Canvas | null>(null);
  const localStorageKey = "playground-json";
  const localStorageData = localStorage.getItem(localStorageKey);
  let data: FabricCanvasJSON;
  try {
    data = localStorageData ? JSON.parse(localStorageData) : { objects: [] };
  } catch (ex) {
    data = { objects: [] };
  }

  const onFileUpload = useCallback(
    async (item: DataItem, ev: MouseEvent | undefined) => {
      if (!fabCanvas) {
        return;
      }
      let sp = await loadSP(item);
      if (sp) {
        sp.hasControls = true;
        sp.lockMovementY = false;
        sp.lockMovementX = false;
        let canvasPoint = { x: 100, y: 100 };
        if (ev) {
          canvasPoint = fabCanvas.getPointer(ev, false);
        }
        sp.set({
          left: canvasPoint.x,
          top: canvasPoint.y,
        });
        fabCanvas.add(sp);
      }
    },
    [fabCanvas]
  );
  useUploadPasteFile(onFileUpload);

  useEffect(() => {
    function save() {
      if (!fabCanvas) {
        return;
      }
      let json = fabCanvas.toJSON();
      localStorage.setItem(localStorageKey, JSON.stringify(json));
    }

    document.body.addEventListener("mousemove", save);

    return () => {
      document.body.removeEventListener("mousemove", save);
    };
  }, [fabCanvas]);

  useEffect(() => {
    if (!div.current) {
      return;
    }

    let bCancel = false;
    let dom = document.createElement("canvas");
    div.current.appendChild(dom);

    const { fabCanvas } = initFabric(dom, {
      backgroundColor: "rgba(0, 0, 0, 0.1)",
    });

    fabCanvas.loadFromJSON(data, () => {
      if (bCancel) return;
      console.log("fabric load data", data);
      setFabCanvas(fabCanvas);
      (window as any).fabCanvas = fabCanvas;
      (window as any).canvas = fabCanvas;
      supportDrag(fabCanvas);
    });

    return () => {
      bCancel = true;
      setFabCanvas(null);
      if (div.current) {
        div.current.innerHTML = "";
      }
    };
  }, [div]);

  return (
    <div>
      <div
        style={{
          position: "fixed",
          zIndex: 1001,
          right: 0,
          top: 0,
        }}
      >
        <button
          onClick={() => {
            console.log("clear");
            localStorage.removeItem(localStorageKey);
            location.reload();
          }}
        >
          Clear Local
        </button>
      </div>

      <div ref={div} key={"container"} />
    </div>
  );
}
