// import logo from "./logo.svg";
import "./App.css";
import Compo2 from "./Components/Compo2";
import Compo3 from "./Components/Compo3";
import Compo4 from "./Components/Compo4";
import { Routes, Route } from "react-router-dom";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Compo2 />} />
        <Route path="/compo3" element={<Compo3 />} />
        <Route path="/compo4" element={<Compo4 />} />
      </Routes>
    </div>
  );
}

export default App;
