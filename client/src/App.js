import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Header from "./components/views/Header/Header";
import Footer from "./components/views/Footer/Footer";

import MainPage from './components/views/MainPage/MainPage';
import UploadPage from "./components/views/UploadPage/UploadPage";
import ProfilePage from "./components/views/ProfilePage/ProfilePage";

//componet = element, Switch = Routes
function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route exact path="/" element={<MainPage />} />
        <Route exact path="/upload" element={<UploadPage />} />
        <Route exact path="/profile" element={<ProfilePage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;