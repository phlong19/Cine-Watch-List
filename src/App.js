import React, { useEffect, useState } from "react";
import "./style.css";
import Navbar from "./components/Navbar/Navbar";
import Main from "./components/Main/Main";
import Search from "./components/Navbar/Search";
import NumResutls from "./components/Navbar/NumResults";
import Box from "./components/UI/Box";
import MovieList from "./components/Main/MovieList";
import WatchedSummary from "./components/Main/WatchedSummary";
import WatchedMoviesList from "./components/Main/WatchedMoviesList";
import Loader from "./components/UI/Loader";
import ErrorMessage from "./components/UI/ErrorMessage";
import SelectedMovie from "./components/Main/SelectedMovie";
import { useMovies } from "./useMovies";
import { useLocalStorageState } from "./useLocalStorageState";

export default function App() {
  const [query, setQuery] = useState("");
  const [selectedID, setSelectedID] = useState(null);
  const { movies, isLoading, error } = useMovies(query);

  const [watched, setWatched] = useLocalStorageState([], "watched");

  function handleSelected(id) {
    setSelectedID((selectedId) => (selectedId === id ? null : id));
  }

  function handleAddWatched(movie) {
    setWatched((watched) => [...watched, movie]);
  }

  function handleDeleteWatched(id) {
    setWatched((watched) => watched.filter((m) => m.imdbID !== id));
  }

  return (
    <>
      <Navbar>
        <Search query={query} setQuery={setQuery} />
        <NumResutls movies={movies} />
      </Navbar>

      <Main>
        <Box>
          {isLoading && <Loader />}
          {!isLoading && !error && (
            <MovieList movies={movies} onSelectedMovie={handleSelected} />
          )}
          {error && <ErrorMessage message={error} />}
        </Box>

        <Box>
          {selectedID ? (
            <SelectedMovie
              id={selectedID}
              onSetSelectedID={setSelectedID}
              onAddWatched={handleAddWatched}
              watched={watched}
            />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchedMoviesList
                watched={watched}
                onSetWatched={handleDeleteWatched}
              />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}

// function Test() {
//   const [rating, setRating] = useState(0);
//   return (
//     <div>
//       <StarRating maxRating={5} size={28} messages={["Suck", "Bad", "Fine", "Good", "Amazing"]} />
//       <p>This movie has {rating} star rating.</p>
//     </div>
//   );
// }
