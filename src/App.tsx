import './App.scss';
import {Link} from "react-router-dom";

function App() {
  return (
    <div>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/Animals">Animals</Link>
        </li>
      </ul>
      Home
    </div>
  )
}

export default App;
