import NavBar from "./components/NabBar";
import Home from "./components/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DataList from "./components/DataList";

function App() {

  return (
    <>
      <NavBar />
      <BrowserRouter>
        <Routes>
          <Route path="/list" element={<DataList />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
