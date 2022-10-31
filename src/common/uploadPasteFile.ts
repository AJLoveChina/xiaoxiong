import { useEffect } from "react";
import { DataItem } from "./data/data.config";

export function useUploadPasteFile(
  onFileUploaded?: (item: DataItem, ev: MouseEvent | undefined) => void
) {
  useEffect(() => {
    let mouseEvent: MouseEvent | undefined = undefined;

    function onmousemove(ev: MouseEvent) {
      mouseEvent = ev;
    }

    async function onupload(ev: ClipboardEvent) {
      if (!ev.clipboardData) {
        return;
      }
      let file = ev.clipboardData.files[0];
      const formData = new FormData();
      formData.append("file", file);
      const response = await fetch("image/upload", {
        method: "POST",
        body: formData,
      });
      const result: DataItem = await response.json();
      if (onFileUploaded) {
        onFileUploaded(result, mouseEvent);
      }
    }

    document.body.addEventListener("paste", onupload);
    document.body.addEventListener("mousemove", onmousemove);

    return () => {
      document.body.removeEventListener("paste", onupload);
      document.body.removeEventListener("mousemove", onmousemove);
    };
  }, [onFileUploaded]);
}
