// src/App.jsx
import React from "react";
import Navside from "./layouts/Navside";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TempMail from "./features/Temp/Tempmail";
import Home from "./features/Home/Home"

const App = () => {
  return (
    <>
 <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navside />}>
          <Route path="home" element={<Home/>} />
          <Route path="tempmail" element={<TempMail />} />
          {/* Thêm route khác nếu có */}
        </Route>
      </Routes>
    </BrowserRouter>
    </>
  );
};

export default App;
