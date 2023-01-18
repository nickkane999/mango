import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import ChartD3 from "./pages/chart/ChartD3";
import ChartChartist from "./pages/chart/ChartChartist";
import Contact from "./pages/contact/Contact";
import Login from "./pages/login/Login";
import ProcessLogin from "./pages/login/ProcessLogin";
import NavMenu from "./components/nav/NavMenu";

import "../node_modules/bootstrap/dist/css/bootstrap.css";
import "./chartist.min.css";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <NavMenu />
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/chart/d3" element={<ChartD3 />} />
            <Route path="/chart/chartist" element={<ChartChartist />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/login/processing" element={<ProcessLogin />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
