import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Footer from "./components/views/Footer/Footer";
import MainPage from './components/views/MainPage/MainPage';

//componet = element, Switch = Routes
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<MainPage />} />
        <Route exact path="/footer" element={<Footer />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
