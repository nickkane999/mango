import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Chart from "./pages/chart/Chart";
import Login from "./pages/login/Login";
import NavMenu from "./components/nav/NavMenu";
import Account from "./pages/account/Account";
import Test from "./pages/Test/Test";

import "../node_modules/bootstrap/dist/css/bootstrap.css";
import "./assets/css/chartist.min.css";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <NavMenu />
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/chart" element={<Chart />} />
            <Route path="/login" element={<Login />} />
            <Route path="/account" element={<Account />} />
            <Route path="/test" element={<Test />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
