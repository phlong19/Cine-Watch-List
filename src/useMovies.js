import { useEffect, useState } from "react";

const key = process.env.REACT_APP_KEY;

export function useMovies(query) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();
    async function fetchData() {
      try {
        setIsLoading(true);
        setError("");

        const res = await fetch(
          `https://www.omdbapi.com/?apikey=${key}&s=${query}`,
          { signal: controller.signal }
        );

        if (!res.ok) {
          throw new Error("Something went wrong when fetching movies.");
        }

        const data = await res.json();
        if (data.Response === "False") {
          throw new Error(data.Error);
        }

        setMovies(data.Search);
        setError("");
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message);
        }
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
    // handleSelected();

    return function () {
      controller.abort();
    };
  }, [query]);
  return { movies, isLoading, error };
}
