import { Food } from "./comps/Food"
import { fabric } from "fabric"
import { Dashboard } from "./comps/dashboard/dashboard"
import "./App.scss"

function App() {
  fabric.Object.prototype.originX = "center"
  fabric.Object.prototype.originY = "center"
  fabric.Object.prototype.left = 0
  fabric.Object.prototype.top = 0

  return (
    <div className={"app"}>
      <Dashboard />
    </div>
  )
}

export default App
