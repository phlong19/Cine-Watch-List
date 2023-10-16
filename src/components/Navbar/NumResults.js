import "../../style.css";

function NumResults({ movie }) {
  return (
    <p className="num-results">
      Found <strong>{movie.length}</strong> results
    </p>
  );
}

export default NumResults;
