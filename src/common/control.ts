import {fabric} from "fabric";

const dummyControl = new fabric.Control({ visible: false });

export const ItemControls = {
  tl: dummyControl,
  tr: dummyControl,
  bl: dummyControl,
  br: dummyControl,
  mb: dummyControl,
  mt: dummyControl,
  mtr: dummyControl,
};
