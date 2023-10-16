import React, { useState } from "react";

function Search() {
  const [query, setQuery] = useState("");

  return (
    <input
      type="text"
      className="search"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
  );
}

export default Search;
