import "../../style.css";

function WatchedMovie({ movie, onSetWatched }) {
  function handleDelete(id) {
    onSetWatched(id);
  }
  return (
    <li key={movie.imdbID}>
      <img src={movie.poster} alt={`${movie.title} poster`} />
      <h3>{movie.title}</h3>
      <div>
        <p>
          <span>⭐</span>
          <span>{movie.imdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{movie.userRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{movie.runtime} min</span>
        </p>
      </div>
      <button className="btn-delete" onClick={() => handleDelete(movie.imdbID)}>
        &times;
      </button>
    </li>
  );
}

export default WatchedMovie;
