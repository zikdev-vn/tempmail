// src/App.jsx
import React from "react";
import Navside from "./layouts/Navside";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TempMail from "./features/Temp/Tempmail";
import Home from "./features/Home/Home"
import ModelsPage from "./features/ModelPage";
import Portfolio from "./features/Portfolio/Portfolio";
import MyTracker from "./features/Profile/MyTracker";
import { GoogleOAuthProvider } from "@react-oauth/google";



const App = () => {
  return (
    <>
    <GoogleOAuthProvider clientId="472136523798-njate5d2pd2lqh57vmfs5l9gqt6foasu.apps.googleusercontent.com">
<BrowserRouter>
  <Routes>
    <Route path="/" element={<Navside />}>
      <Route index element={<ModelsPage />} />
      <Route path="home" element={<Home />} />
      <Route path="tempmail" element={<TempMail />} />
     
    </Route>
     <Route path="mycontact" element={<Portfolio />} />
     <Route path="mytraker" element={<MyTracker />} />
     
  </Routes>
</BrowserRouter>
</GoogleOAuthProvider>
    </>
  );
};

export default App;
