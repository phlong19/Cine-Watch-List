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

const key = process.env.REACT_APP_KEY;

export default function App() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedID, setSelectedID] = useState(null);

  function handleSelected(id) {
    setSelectedID((selectedId) => (selectedId === id ? null : id));
  }

  function handleAddWatched(movie, id, newRating) {
    if (watched.some((v) => v.imdbID === id)) {
      const newWatched = watched.map((m) =>
        m.imdbID === id ? { ...m, userRating: newRating } : m
      );
      setWatched(newWatched);
    } else {
      setWatched((watched) => [...watched, movie]);
    }
  }

  function handleDeleteWatched(id) {
    setWatched((watched) => watched.filter((m) => m.imdbID !== id));
  }

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        setError("");

        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${key}&s=${query}`
        );

        if (!res.ok) {
          throw new Error("Something went wrong when fetching movies.");
        }

        const data = await res.json();
        if (data.Response === "False") {
          throw new Error(data.Error);
        }

        setMovies(data.Search);
      } catch (err) {
        console.log(err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }
    if (query.length < 3) {
      setMovies([]);
      setError("");
      return;
    }

    fetchData();
  }, [query]);

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
