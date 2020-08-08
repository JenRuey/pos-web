import React from "react";
import logo from "../logo.svg";
import Path from "../navigation/Path";

export default function Home() {
  return (
    <div className="App">
      <img src={logo} className="App-logo" alt="logo" />
      <div className="title">Welcome to POS</div>

      <div className="links">
        <a href={Path.login}>Login</a>
        <a href={Path.register}>Register</a>
      </div>
    </div>
  );
}
