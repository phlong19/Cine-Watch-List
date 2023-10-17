import React, { useState } from "react";
import "../../style.css";
import ListBox from "./ListBox";
import WatchedBox from "./WatchedBox";
import MovieList from "./MovieList";

function Main({ movies }) {
  return (
    <main className="main">
      <ListBox>
        <MovieList movies={movies} />
      </ListBox>
      <WatchedBox />
    </main>
  );
}

export default Main;
