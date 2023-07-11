import { useEffect, useRef } from "react";
import { useKey } from "./useKey";
/**
 * The function exports a NavBar component that renders a navigation bar with a logo, search input, and
 * number of results.
 * @returns The NavBar component is being returned.
 */
export function NavBar({ children }) {
  return <nav className="nav-bar">{children}</nav>;
}

/**
 * The `Logo` function returns a JSX element representing a logo with a popcorn emoji and the text
 * "usePopcorn".
 * @returns The Logo component is returning a div element with the class name "logo". Inside the div,
 * there is a span element with the role "img" and the emoji "🍿", and an h1 element with the text
 * "usePopcorn".
 */
export function Logo() {
  return (
    <div className="logo">
      <span role="img">🍿</span>
      <h1>usePopcorn</h1>
    </div>
  );
}

/**
 * The Search function is a React component that renders an input field for searching movies and
 * updates the query state when the input value changes.
 * @returns The code is returning an input element with the following properties:
 * - className: "search"
 * - type: "text"
 * - placeholder: "Search movies..."
 * - value: the value of the `query` variable
 * - onChange: a function that updates the `query` variable with the value of the input element
 * - ref: a reference to the input element, assigned to the `inputEl`
 */
export function Search({ query, setQuery }) {
  const inputEl = useRef(null);

  /* The `useEffect` hook in the code snippet is used to add an event listener to the document for the
"keydown" event. */
  useKey("Enter", function () {
    if (document.activeElement === inputEl.current) return;
    inputEl.current.focus();
    setQuery("");
  });

  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      ref={inputEl}
    />
  );
}

/**
 * The NumResults function returns a paragraph element displaying the number of results found based on
 * the length of the movies array.
 * @returns The NumResults component is returning a paragraph element with a className of
 * "num-results". Inside the paragraph, it displays the number of movies found by accessing the length
 * property of the movies array. The number is wrapped in a strong element for emphasis.
 */
export function NumResults({ movies }) {
  return (
    <p className="num-results">
      Found <strong>{movies.length}</strong> results
    </p>
  );
}
