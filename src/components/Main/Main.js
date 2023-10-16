import React, { useState } from "react";
import "../../style.css";
import ListBox from "./ListBox";
import WatchedBox from "./WatchedBox";

function Main() {
  return (
    <main className="main">
      <ListBox />
      <WatchedBox />
    </main>
  );
}

export default Main;
