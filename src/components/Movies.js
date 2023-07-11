import { KEY } from "./useMovies";
import StarRating from "./StarRating";
import Loader from "./Loader";
import { useKey } from "./useKey";
import { useEffect, useState, useRef } from "react";

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
 * The Movie function is a React component that renders a movie item with its poster, title, and year.
 * @returns The Movie component is returning a list item (li) element that displays information about a
 * movie. It includes an image of the movie poster, the movie title, and the year the movie was
 * released. The li element has a key attribute set to the imdbID of the movie, and an onClick event
 * handler that calls the onSelectMovie function with the imdbID as an argument.
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

/**
 * The `MovieDetails` function is a React component that displays details of a selected movie,
 * including its title, year, poster, runtime, IMDb rating, plot, release date, actors, and director,
 * and allows the user to add the movie to a watched list and rate it.
 * @returns The `MovieDetails` component returns a JSX element that represents the movie details. It
 * includes a header section with a back button, movie poster, and movie details such as title, release
 * date, runtime, genre, and IMDb rating. It also includes a section for user rating, where users can
 * rate the movie using a star rating component and add it to their watched list. The section also
 * displays the
 */
export function MovieDetails({
  selectedId,
  onCloseMovie,
  onAddWatched,
  watched,
}) {
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [userRating, setUserRating] = useState("");
  const countRef = useRef(0);
  const isWatched = watched.map((movie) => movie.imdbID).includes(selectedId);
  const watchedUserRating = watched.find(
    (movie) => movie.imdbID === selectedId
  )?.userRating;

  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
  } = movie;

  /**
   * The function `handleAdd` adds a new watched movie to a list of watched movies.
   */
  function handleAdd() {
    const newWatchedMovie = {
      imdbID: selectedId,
      title,
      poster,
      year,
      imdbRating: Number(imdbRating),
      runtime: Number(runtime.split(" ").at(0)),
      userRating,
      countRatingDecisions: countRef.current,
    };
    onAddWatched(newWatchedMovie);
    onCloseMovie();
  }

  /* The `useEffect` hook in the code snippet is used to update the `countRef.current` value whenever the
`userRating` state changes. */
  useEffect(
    function () {
      if (userRating) countRef.current++;
    },
    [userRating]
  );

  /* The `useKey("Escape", onCloseMovie)` is a custom hook that listens for the "Escape" key press event
and calls the `onCloseMovie` function when the "Escape" key is pressed. This hook is used to handle
the functionality of closing the movie details when the "Escape" key is pressed. */
  useKey("Escape", onCloseMovie);

  /* The `useEffect` hook in the code snippet is used to fetch movie details from the OMDB API when the
`selectedId` prop changes. */
  useEffect(
    function () {
      async function getMovieDetails() {
        setIsLoading(true);
        const res = await fetch(
          `https://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`
        );
        const data = await res.json();
        setMovie(data);
        setIsLoading(false);
      }
      getMovieDetails();
    },
    [selectedId]
  );

  /* The `useEffect` hook in the code snippet is used to update the document title based on the selected
movie's title. */
  useEffect(
    function () {
      if (!title) return;
      document.title = `Movie | ${title}`;

      return function () {
        document.title = "🍿 usePopcorn";
      };
    },
    [title]
  );

  return (
    <div className="details">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <header>
            <button className="btn-back" onClick={onCloseMovie}>
              &larr;
            </button>
            <img src={poster} alt={`${movie} poster`} />
            <div className="details-overview">
              <h2>{title}</h2>
              <p>
                {released} &bull; {runtime}
              </p>
              <p>{genre}</p>
              <p>
                <span>⭐️</span>
                {imdbRating} IMBdb rating
              </p>
            </div>
          </header>
          <section>
            <div className="rating">
              {!isWatched ? (
                <>
                  <StarRating
                    maxRating={10}
                    size={24}
                    onSetRating={setUserRating}
                  />
                  {userRating > 0 && (
                    <button className="btn-add" onClick={handleAdd}>
                      + Add to list
                    </button>
                  )}
                </>
              ) : (
                <p>
                  You rated this movie {watchedUserRating} <span>⭐️</span>
                </p>
              )}
            </div>
            <p>
              <em>{plot}</em>
            </p>
            <p>Starring: {actors}</p>
            <p>Directed by {director}</p>
          </section>
        </>
      )}
    </div>
  );
}
