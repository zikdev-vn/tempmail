// src/App.jsx
import React from "react";
import Navside from "./layouts/Navside";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TempMail from "./features/Temp/Tempmail";
import Home from "./features/Home/Home"
import ModelsPage from "./features/ModelPage";
import Portfolio from "./features/Portfolio/Portfolio";
const App = () => {
  return (
    <>
<BrowserRouter>
  <Routes>
    <Route path="/" element={<Navside />}>
      <Route index element={<ModelsPage />} />
      <Route path="home" element={<Home />} />
      <Route path="tempmail" element={<TempMail />} />
     
    </Route>
     <Route path="portfolio" element={<Portfolio />} />
  </Routes>
</BrowserRouter>

    </>
  );
};

export default App;
