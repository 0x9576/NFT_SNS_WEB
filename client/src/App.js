import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import MainPage from './components/views/MainPage/MainPage';
import UploadPage from "./components/views/UploadPage/UploadPage";

//componet = element, Switch = Routes
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<MainPage />} />
        <Route exact path="/upload" element={<UploadPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;