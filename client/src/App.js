import React, { useEffect, useRef, useState } from "react";
import { BrowserRouter as Router, Routes, Route, } from "react-router-dom";
import Home from "./Layouts/Home/Home";
import PlayGround from "./Layouts/PlayGround/PlayGround";
import UserProfile from "./Layouts/User/UserProfile/UserProfile";

function App() {
  let data = {
    size: 5,
    diffNumChess: 0,
    color: "blue",
  };

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home {...data}/>} />
          <Route path="/user" element={<UserProfile />} />
          <Route path="/play" element={<PlayGround {...data}/>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
