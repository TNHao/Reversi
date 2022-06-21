import React, { useEffect, useRef, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./Layouts/Home/Home";
import PlayGround from "./Layouts/PlayGround/PlayGround";
import UserProfile from "./Layouts/User/UserProfile/UserProfile";

function App() {
  const data = {
    size: 5,
    diffNumChess: 0,
    color: "blue",
  }
  return (
    <div>
      {/* <Home /> */}
      {/* <UserProfile /> */}
      <PlayGround {...data}/>
    </div>
  );
}

export default App;
