import { useCallback, useEffect, useRef, useState } from "react";
import { CustomFabCanvas, initFabric, loadSP } from "../../common/fabric";
import { drawCarBackground, render } from "../../common/render";
import { carDataConfig } from "../../common/data/car.data.config";
import {
  onClickAudio,
  supportDelete,
  supportDrag,
  useSupportCopyPaste,
} from "../../common/event";
import { DataItem } from "../../common/data/data.config";
import { useUploadPasteFile } from "../../common/uploadPasteFile";
import { nonNullable } from "../../common/common";
import { debounce, Snackbar } from "@mui/material";
import { showCoords } from "../../common/axios";
import { fabric } from "fabric";

interface FabricCanvasJSON {
  objects: fabric.Object[];
}

export function Playground() {
  const div = useRef<HTMLDivElement>(null);
  const [fabCanvas, setFabCanvas] = useState<CustomFabCanvas | null>(null);
  const [bgImgURL, setbgImgURL] = useState("");
  const localStorageKey = "playground-json";
  const localStorageData = localStorage.getItem(localStorageKey);
  let data: FabricCanvasJSON;
  try {
    data = localStorageData ? JSON.parse(localStorageData) : { objects: [] };
  } catch (ex) {
    data = { objects: [] };
  }

  useSupportCopyPaste(fabCanvas);

  const onFileUpload = useCallback(
    async (item: DataItem, ev: MouseEvent | undefined) => {
      if (!fabCanvas) {
        return;
      }
      fabCanvas._copyObject = undefined;
      let sp = await loadSP(item);
      if (sp) {
        sp.hasControls = true;
        sp.lockMovementY = false;
        sp.lockMovementX = false;
        let canvasPoint = { x: 100, y: 100 };
        if (fabCanvas.mousePosition) {
          canvasPoint = fabCanvas.mousePosition;
        }
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
    if (!fabCanvas) {
      return;
    }

    const debounceSave = debounce(function save() {
      if (!fabCanvas) {
        return;
      }
      console.log("auto save");
      let json = fabCanvas.toObject();
      localStorage.setItem(localStorageKey, JSON.stringify(json));
    }, 500);

    fabCanvas.on("mouse:move", debounceSave);
    fabCanvas.on("mouse:up", debounceSave);

    return () => {
      fabCanvas.off("mouse:move", debounceSave);
      fabCanvas.off("mouse:up", debounceSave);
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
      showCoords({ canvas: fabCanvas });
      supportDelete({ canvas: fabCanvas });
      fabCanvas.recordMousePosition();
    });

    return () => {
      bCancel = true;
      setFabCanvas(null);
      if (div.current) {
        div.current.innerHTML = "";
      }
    };
  }, [div]);

  function setBG() {
    fabCanvas?.setBackgroundColor(
      new fabric.Pattern({ source: bgImgURL, repeat: "repeat" }),
      () => {}
    );
  }

  function popMsg(msg: string) {
    window.alert(msg);
  }

  function copyJson() {
    if (fabCanvas) {
      navigator.clipboard.writeText(JSON.stringify(fabCanvas.toJSON()));
      popMsg("copy json success");
    } else {
      popMsg("copy json failed");
    }
  }

  return (
    <div className={"playground"}>
      <div
        style={{
          position: "fixed",
          zIndex: 1001,
          right: 0,
          top: 0,
        }}
      >
        <button
          className={"button"}
          onClick={() => {
            let bClear = window.confirm("clear");
            if (bClear) {
              console.log("clear");
              localStorage.removeItem(localStorageKey);
              location.reload();
            }
          }}
        >
          Clear Local
        </button>

        <button className={"button"} onClick={copyJson}>
          Copy JSON
        </button>
        <br />
        <input type="text" onChange={(ev) => setbgImgURL(ev.target.value)} />
        <button onClick={setBG}>Set BG</button>
      </div>

      <div ref={div} key={"container"} />
    </div>
  );
}
