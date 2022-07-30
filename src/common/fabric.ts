import {fabric} from 'fabric'


export function initFabric(dom: HTMLCanvasElement) {


  let fabCanvas = new fabric.Canvas(dom, {
    width: window.innerWidth,
    height: window.innerHeight,
    selection: true,
  });

  return {
    dom,
    fabCanvas,
  };
}

export function loadSVG({svg}: { svg: string }) {
  return new Promise<fabric.Object>((resolve, reject) => {
    fabric.loadSVGFromURL(`/svg/${svg}`, (objects) => {
      var svgData = fabric.util.groupSVGElements(objects, {});
      resolve(svgData);
    })
  })
}


export async function loadSP({svg, text}: { svg: string, text: string }) {
  let sp1 = await loadSVG({svg});
  sp1.set({
    left:0,
    top: 0,
    originX: "center",
    originY: "center",
  })

  let spText = new fabric.Text(text, {
    left: 0,
    top: sp1.getScaledHeight() / 2 + 20,
    fontSize: 20,
    originX: "center",
    originY: "center",
  })

  const objs: fabric.Object[] = [sp1, spText];

  return new fabric.Group(objs, {
    originX: "center",
    originY: "center",
  });
}