import {Food} from "./comps/Food";
import {fabric} from 'fabric'

function App() {
  fabric.Object.prototype.originX = "center";
  fabric.Object.prototype.originY = "center";
  fabric.Object.prototype.left = 0;
  fabric.Object.prototype.top = 0;

  return (
      <div>
        <Food />
      </div>
  );
}

export default App;
