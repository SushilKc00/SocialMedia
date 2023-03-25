import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./Pages/Home";
import "./App.css";
import { Login } from "./Pages/Login";
import { Register } from "./Pages/Register";
import { Profile } from "./Pages/Profile";
import { Myprofile } from "./Pages/Myprofile";
import { Alluser } from "./Pages/Alluser";
import { Newspage } from "./Pages/Newspage";
import { Allnews } from "./Pages/Allnews";
import { Messanger } from "./Pages/Messanger";

export const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/profile/:userid" element={<Profile />} />
          <Route path="/profile" element={<Myprofile />} />
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/alluser" element={<Alluser />} />
          <Route path="/allnews" element={<Allnews />} />
          <Route path="/messanger" element={<Messanger />} />
          <Route path="/news/:index/:searchvalue" element={<Newspage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};
