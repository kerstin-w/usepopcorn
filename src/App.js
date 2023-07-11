import { NavBar, Logo, Search, NumResults } from "./components/NavBar";
import { Main, Box } from "./components/Main";
import { WatchedSummary, WatchedMovieList } from "./components/WatchedMovies";
import { MovieList, MovieDetails } from "./components/Movies";
import Loader from "./components/Loader";
import { ErrorMessage } from "./components/ErrorMessage";
import { useEffect, useState, useCallback } from "react";
import { useMovies } from "./components/useMovies";

export const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

/**
 * The `App` function is a React component that handles the state and logic for searching and
 * displaying movies, as well as managing a list of watched movies.
 * @returns The function `App` is returning a JSX element.
 */
export default function App() {
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const handleCloseMovie = useCallback(() => setSelectedId(null), []);
  const { movies, isLoading, error } = useMovies(query, handleCloseMovie);

  const [watched, setWatched] = useState(function () {
    const storedValue = localStorage.getItem("watched");
    return JSON.parse(storedValue);
  });

  /**
   * The function `handleSelectMovie` updates the selected movie ID based on the current selected ID.
   * @param id - The `id` parameter is the unique identifier of the movie that is being selected.
   */
  function handleSelectMovie(id) {
    setSelectedId((selectedId) => (id === selectedId ? null : id));
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

  /* The `useEffect` hook is used to store the `watched` state variable in the browser's local storage
whenever it changes. */
  useEffect(
    function () {
      localStorage.setItem("watched", JSON.stringify(watched));
    },
    [watched]
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
