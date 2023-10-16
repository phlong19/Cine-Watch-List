import React, { useState } from "react";
import './style.css'
import Navbar from "./components/Navbar/Navbar";
import Main from "./components/Main/Main";

function App() {

  return (
    <>
      <Navbar movies={movies} />
      <Main/>
    </>
  );
}

export default App;
