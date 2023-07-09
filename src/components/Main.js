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
 * The Box component is a toggleable container that displays its children when open and hides them when
 * closed.
 * @returns The Box component is returning a div element with the class name "box". Inside the div,
 * there is a button element with the class name "btn-toggle". The button has an onClick event handler
 * that toggles the isOpen state using the setIsOpen function. The text content of the button is
 * determined by the isOpen state - if isOpen is true, the button displays "–" (minus sign), otherwise
 */
export function Box({ children }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="box">
      <button className="btn-toggle" onClick={() => setIsOpen((open) => !open)}>
        {isOpen ? "–" : "+"}
      </button>
      {isOpen && children}
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
export function MovieList({ movies, onSelectMovie }) {
  return (
    <ul className="list list-movies">
      {movies?.map((movie) => (
        <Movie movie={movie} key={movie.imdbID} onSelectMovie={onSelectMovie} />
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
function Movie({ movie, onSelectMovie }) {
  return (
    <li key={movie.imdbID} onClick={() => onSelectMovie(movie.imdbID)}>
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

export function MovieDetails({ selectedId, onCloseMovie }) {
  return (
    <div className="detail">
      <button className="btn-back" onClick={onCloseMovie}>
        &larr;
      </button>
      {selectedId}
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
export function WatchedSummary({ watched }) {
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
export function WatchedMovieList({ watched }) {
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
