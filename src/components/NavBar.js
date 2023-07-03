import { useState } from "react";

/**
 * The function exports a NavBar component that renders a navigation bar with a logo, search input, and
 * number of results.
 * @returns The NavBar component is being returned.
 */
export default function NavBar() {
  return (
    <nav className="nav-bar">
      <Logo />
      <Search />
      <NumResults />
    </nav>
  );
}

/**
 * The `Logo` function returns a JSX element representing a logo with a popcorn emoji and the text
 * "usePopcorn".
 * @returns The Logo component is returning a div element with the class name "logo". Inside the div,
 * there is a span element with the role "img" and the emoji "🍿", and an h1 element with the text
 * "usePopcorn".
 */
function Logo() {
  return (
    <div className="logo">
      <span role="img">🍿</span>
      <h1>usePopcorn</h1>
    </div>
  );
}

/**
 * The Search function is a React component that renders an input field for searching movies and
 * updates the query state based on user input.
 * @returns The Search function is returning an input element with the following properties:
 * - className: "search"
 * - type: "text"
 * - placeholder: "Search movies..."
 * - value: the value of the query state variable
 * - onChange: a function that updates the query state variable with the value of the input field when
 * it changes.
 */
function Search() {
  const [query, setQuery] = useState("");

  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
  );
}

/**
 * The NumResults function returns a paragraph element displaying the number of results found, with the
 * number represented by the placeholder "X".
 * @returns a JSX element. Specifically, it is returning a paragraph element with a class name of
 * "num-results". Inside the paragraph, there is a strong element that will display the value of X.
 */
function NumResults() {
  return (
    <p className="num-results">
      Found <strong>X</strong> results
    </p>
  );
}
