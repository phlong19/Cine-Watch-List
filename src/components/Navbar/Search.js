import React, { useEffect, useRef } from "react";

function Search({ query, setQuery }) {
  // step 1: init useRef hook, use 'null' for DOM selection
  const inputEl = useRef(null);

  // step 3: useEffect hook to use ref
  useEffect(function () {
    // inputEl.current is the DOM input element, log it to see
    inputEl.current.focus();
  });
  return (
    <input
      type="text"
      className="search"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      // step 2: use ref props to connect
      ref={inputEl}
    />
  );
}

export default Search;
