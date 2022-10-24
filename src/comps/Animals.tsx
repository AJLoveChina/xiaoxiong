import {Link} from "react-router-dom";
import {useEffect, useRef} from "react";
import {RenderingEngine} from "../common/RenderingEngine";
import {TextImageConfig} from "../common/common";

export function Animals() {
  const divRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!divRef.current) {
      return;
    }

    let canvas = document.createElement("canvas");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    divRef.current.append(canvas);

    const config: TextImageConfig = {
      list: [
        {
          img: "svg/huafubin.svg",
          name: "华夫饼",
          audio: "audio/music1.mp3"
        }
      ]
    }

    let re = new RenderingEngine(canvas);
    re.render(config);
    (window as any).re = re;


    return () => {
      if (re) {
        re.destroy();
      }
      if (divRef.current) {
        divRef.current.innerHTML = "";
      }
    }
  }, [divRef]);


  return <div>
    <Link to="/">Home</Link>
    <div ref={divRef}></div>
  </div>
}
