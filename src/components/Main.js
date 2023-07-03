import { useState } from "react";
import { tempMovieData, tempWatchedData, average } from "../App";

/**
 * The Main function returns a JSX element containing a ListBox and a WatchedBox component.
 * @returns The Main component is returning a JSX element. The JSX element represents the main section
 * of the application and includes two child components, ListBox and WatchedBox.
 */
export function Main({ children }) {
  return <main className="main">{children}</main>;
}

/**
 * The ListBox function renders a box with a toggle button that controls the visibility of a MovieList
 * component.
 * @returns The ListBox component is returning a div element with the class name "box". Inside the div,
 * there is a button element with the class name "btn-toggle". The button has an onClick event handler
 * that toggles the value of isOpen1 using the setIsOpen1 function. The text content of the button is
 * determined by the value of isOpen1 - if isOpen1 is true, the button displays "–
 */
export function ListBox({ children }) {
  const [isOpen1, setIsOpen1] = useState(true);

  return (
    <div className="box">
      <button
        className="btn-toggle"
        onClick={() => setIsOpen1((open) => !open)}
      >
        {isOpen1 ? "–" : "+"}
      </button>
      {isOpen1 && children}
    </div>
  );
}

/**
 * The MovieList function returns a list of movies rendered as a series of Movie components.
 * @returns The MovieList component is returning an unordered list (ul) with a className of "list".
 * Inside the ul, it is mapping over the movies array and rendering a Movie component for each movie in
 * the array. The Movie component is passed the movie object as a prop and is given a unique key using
 * the movie's imdbID.
 */
export function MovieList({ movies }) {
  return (
    <ul className="list">
      {movies?.map((movie) => (
        <Movie movie={movie} key={movie.imdbID} />
      ))}
    </ul>
  );
}

/**
 * The Movie function renders a list item with an image, title, and year for a given movie.
 * @returns The Movie component is returning a list item element (<li>) that contains an image, a
 * heading, and a paragraph. The image source is set to the movie's poster URL, the heading displays
 * the movie's title, and the paragraph displays the movie's year.
 */
function Movie({ movie }) {
  return (
    <li key={movie.imdbID}>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>🗓</span>
          <span>{movie.Year}</span>
        </p>
      </div>
    </li>
  );
}

/**
 * The WatchedBox component renders a box that can be toggled open or closed, displaying a summary and
 * a list of watched movies.
 * @returns The WatchedBox component is returning a div with the class name "box". Inside the div,
 * there is a button with the class name "btn-toggle" that toggles the value of isOpen2 when clicked.
 * The button text is "-" when isOpen2 is true and "+" when isOpen2 is false.
 */
export function WatchedBox() {
  const [watched, setWatched] = useState(tempWatchedData);
  const [isOpen2, setIsOpen2] = useState(true);

  return (
    <div className="box">
      <button
        className="btn-toggle"
        onClick={() => setIsOpen2((open) => !open)}
      >
        {isOpen2 ? "–" : "+"}
      </button>
      {isOpen2 && (
        <>
          <WatchedSummary watched={watched} />
          <WatchedMovieList watched={watched} />
        </>
      )}
    </div>
  );
}

/**
 * The WatchedSummary function calculates and displays the average IMDb rating, user rating, and
 * runtime of a list of watched movies.
 * @returns The WatchedSummary component is returning a JSX element that displays a summary of movies
 * watched. The summary includes the number of movies watched, the average IMDb rating, the average
 * user rating, and the average runtime of the movies.
 */
function WatchedSummary({ watched }) {
  const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
  const avgUserRating = average(watched.map((movie) => movie.userRating));
  const avgRuntime = average(watched.map((movie) => movie.runtime));

  return (
    <div className="summary">
      <h2>Movies you watched</h2>
      <div>
        <p>
          <span>#️⃣</span>
          <span>{watched.length} movies</span>
        </p>
        <p>
          <span>⭐️</span>
          <span>{avgImdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{avgUserRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{avgRuntime} min</span>
        </p>
      </div>
    </div>
  );
}

/**
 * The WatchedMovieList function renders a list of watched movies.
 * @returns The WatchedMovieList component is returning an unordered list (ul) with a className of
 * "list". Inside the ul, it is mapping over the "watched" array and rendering a WatchedMovie component
 * for each movie in the array. The key prop is set to the movie's imdbID.
 */
function WatchedMovieList({ watched }) {
  return (
    <ul className="list">
      {watched.map((movie) => (
        <WatchedMovie movie={movie} key={movie.imdbID} />
      ))}
    </ul>
  );
}

/**
 * The WatchedMovie function renders a list item with movie details, including the movie poster, title,
 * IMDb rating, user rating, and runtime.
 * @returns The WatchedMovie component is returning a list item element (<li>) with the following
 * content:
 */
function WatchedMovie({ movie }) {
  return (
    <li key={movie.imdbID}>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>⭐️</span>
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
    </li>
  );
}
