import React, { useRef } from "react";
import { useKey } from "../../useKey";

function Search({ query, setQuery }) {
  // step 1: init useRef hook, use 'null' for DOM selection
  const inputEl = useRef(null);

  // step 3: useEffect hook to use ref
  useKey("Enter", function () {
    // inputEl.current is the DOM input element, log it to see
    if (document.activeElement === inputEl.current) return;
    inputEl.current.focus();
    setQuery("");
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
