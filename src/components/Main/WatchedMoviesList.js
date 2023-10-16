import "../../style.css";
import WatchMovie from "./WatchedMovie";

function WatchedMoviesList({ watched }) {
  return (
    <ul className="list">
      {watched.map((movie) => (
        <WatchMovie movie={movie} key={movie.imdbID} />
      ))}
    </ul>
  );
}

export default WatchedMoviesList;
