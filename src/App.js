import { NavBar, Logo, Search, NumResults } from "./components/NavBar";
import { Main, Box } from "./components/Main";
import { WatchedSummary, WatchedMovieList } from "./components/WatchedMovies";
import { MovieList, MovieDetails } from "./components/Movies";
import Loader from "./components/Loader";
import { ErrorMessage } from "./components/ErrorMessage";
import { useEffect, useState } from "react";

export const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

export const KEY = "3b0006a4";

/**
 * The `App` function is a React component that handles the state and logic for searching and
 * displaying movies, as well as managing a list of watched movies.
 * @returns The function `App` is returning a JSX element.
 */
export default function App() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedId, setSelectedId] = useState(null);

  /**
   * The function `handleSelectMovie` updates the selected movie ID based on the current selected ID.
   * @param id - The `id` parameter is the unique identifier of the movie that is being selected.
   */
  function handleSelectMovie(id) {
    setSelectedId((selectedId) => (id === selectedId ? null : id));
  }

  /**
   * The function handleCloseMovie sets the selectedId variable to null.
   */
  function handleCloseMovie() {
    setSelectedId(null);
  }

  /**
   * The function `handleAddWatch` adds a movie to the `watched` array.
   * @param movie - The "movie" parameter is the movie object that you want to add to the "watched" list.
   */
  function handleAddWatch(movie) {
    setWatched((watched) => [...watched, movie]);
  }

  /**
   * The function `handleDeleteWatched` removes a movie from the `watched` array based on its `imdbID`.
   * @param id - The `id` parameter is the unique identifier of the movie that needs to be deleted from
   * the `watched` array.
   */
  function handleDeleteWatched(id) {
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
  }

  /* The `useEffect` hook is used to perform side effects in a functional component. In this case, the
`useEffect` hook is used to fetch movies from the OMDB API based on the `query` state variable. */
  useEffect(
    function () {
      const controller = new AbortController();

      async function fetchMovies() {
        try {
          setIsLoading(true);
          setError("");
          const res = await fetch(
            `https://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
            { signal: controller.signal }
          );

          if (!res.ok) throw new Error("Something went wrong");

          const data = await res.json();

          if (data.Response === "False") throw new Error("Movie not found 🤷‍♀️");

          setMovies(data.Search);
          setError("");
        } catch (err) {
          console.log(err.message);

          if (err.name !== "AbortError") {
            setError(err.message);
          }
        } finally {
          setIsLoading(false);
        }
      }

      if (query.length < 3) {
        setMovies([]);
        setError("");
        return;
      }
      handleCloseMovie();
      fetchMovies();

      return function () {
        controller.abort();
      };
    },
    [query]
  );

  return (
    <>
      <NavBar>
        <Logo />
        <Search query={query} setQuery={setQuery} />
        <NumResults movies={movies} />
      </NavBar>
      <Main>
        <Box>
          {isLoading && <Loader />}
          {!isLoading && !error && (
            <MovieList movies={movies} onSelectMovie={handleSelectMovie} />
          )}
          {error && <ErrorMessage message={error} />}
        </Box>
        <Box>
          {selectedId ? (
            <MovieDetails
              selectedId={selectedId}
              onCloseMovie={handleCloseMovie}
              onAddWatched={handleAddWatch}
              watched={watched}
            />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchedMovieList
                watched={watched}
                onDeleteWatched={handleDeleteWatched}
              />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}
