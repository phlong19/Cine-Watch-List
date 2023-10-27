import "../../style.css";
import WatchMovie from "./WatchedMovie";

function WatchedMoviesList({ watched, onSetWatched }) {
  return (
    <ul className="list">
      {watched.map((movie) => (
        <WatchMovie
          movie={movie}
          key={movie.imdbID}
          onSetWatched={onSetWatched}
        />
      ))}
    </ul>
  );
}

export default WatchedMoviesList;
