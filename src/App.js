import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/home/Home';
import Chart from './pages/chart/Chart';
import Contact from './pages/contact/Contact';
import NavMenu from './components/nav/NavMenu';

import '../node_modules/bootstrap/dist/css/bootstrap.css';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <NavMenu />
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/chart" element={<Chart />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </div>
      </div>    
    </BrowserRouter>
  );
}

export default App;
