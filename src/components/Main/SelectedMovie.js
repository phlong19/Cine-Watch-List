import "../../style.css";
import React, { useEffect, useState } from "react";
import Loader from "../UI/Loader";
import StarRating from "../UI/StarRating";

const key = process.env.REACT_APP_KEY;

function SelectedMovie({ id, onSetSelectedID, onAddWatched, watched }) {
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [rating, setRating] = useState(0);

  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
  } = movie;

  function handleAddNewWatched() {
    const newWatchedMovie = {
      imdbID: id,
      title,
      year,
      poster,
      imdbRating: Number(imdbRating),
      runtime: Number(runtime.split(" ")[0]),
      userRating: rating,
    };

    onAddWatched(newWatchedMovie, id, rating);
    onSetSelectedID(null);
  }

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${key}&i=${id}`
        );
        if (!res.ok) {
          throw new Error("fetch movie failed");
        }
        const data = await res.json();

        setMovie(data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, [id]);

  // one effect for one thing, like each effect for just ONE purpose
  useEffect(
    function () {
      if (!title) return;
      document.title = "Movie: " + title;

      // cleanup func
      return function () {
        document.title = "Cine Watch List";
      };
    },
    [title]
  );

  let check = watched.find((v) => v.imdbID === id);
  let userRating;
  if (check) {
    userRating = check.userRating;
  }

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="details">
          <header>
            <button className="btn-back" onClick={() => onSetSelectedID(null)}>
              ⬅
            </button>
            <img src={poster} alt={title} />
            <div className="details-overview">
              <h2>{title}</h2>
              <p>
                {released} &bull; {runtime}
              </p>
              <p>{genre}</p>
              <p>
                <span>⭐</span>
                <span>{imdbRating} Imdb Rating</span>
              </p>
            </div>
          </header>
          <section>
            <div className="rating">
              <StarRating onSetRating={setRating} initStar={userRating} />
              {rating > 0 && (
                <button className="btn-add" onClick={handleAddNewWatched}>
                  {!check ? `+ Add to watched list` : "Update your rating"}
                </button>
              )}
            </div>
            <p>
              <em>{plot}</em>
            </p>
            <p>Starring {actors}</p>
            <p>Director by {director}</p>
          </section>
        </div>
      )}
    </>
  );
}

export default SelectedMovie;
