import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Header from "./components/views/Header/Header.jsx";
import Footer from "./components/views/Footer/Footer.jsx";

import MainPage from './components/views/MainPage/MainPage.jsx';
import UploadPage from "./components/views/UploadPage/UploadPage.jsx";
import ProfilePage from "./components/views/ProfilePage/ProfilePage.jsx";

import "./components/style/var.css";
import MarketPage from "./components/views/MarketPage.js/MarketPage.jsx";

//componet = element, Switch = Routes
function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route exact path="/" element={<MainPage />} />
        <Route exact path="/upload" element={<UploadPage />} />
        <Route exact path="/profile" element={<ProfilePage />} />
        <Route exact path="/market" element={<MarketPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;