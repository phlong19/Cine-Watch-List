import "../../style.css";

const avarage = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

function WatchedSummary({ watched }) {
  const avgImbdRating = avarage(watched.map((movie) => movie.imdbRating));
  const avgUserRating = avarage(watched.map((movie) => movie.userRating));
  const avgRuntime = avarage(watched.map((movie) => movie.runtime));

  return (
    <div className="summary">
      <h2>Movies you watched</h2>
      <div>
        <p>
          <span>#️⃣</span>
          <span>{watched.length} movies</span>
        </p>
        <p>
          <span>⭐</span>
          <span>{avgImbdRating.toFixed(2)} </span>
        </p>
        <p>
          <span>🌟</span>
          <span>{avgUserRating.toFixed(2)}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{avgRuntime} min </span>
        </p>
      </div>
    </div>
  );
}

export default WatchedSummary;
