import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./page/Login.jsx";
import Home from "./page/Home.jsx";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
