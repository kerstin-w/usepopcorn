import { average } from "../App";

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
