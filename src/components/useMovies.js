import { useEffect, useState } from "react";

export const KEY = "3b0006a4";

/**
 * The `useMovies` function is a custom hook in JavaScript that fetches movies from the OMDB API based
 * on a given query and returns the movies, loading state, and error message.
 * @param query - The `query` parameter is a string that represents the search query for movies. It is
 * used to fetch movies from the OMDB API based on the provided query.
 * @param callback - The `callback` parameter is a function that will be called before the movies are
 * fetched. It is an optional parameter, denoted by the `?` after the parameter name.
 * @returns The `useMovies` function returns an object with three properties: `movies`, `isLoading`,
 * and `error`.
 */
export function useMovies(query, callback) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  /* The `useEffect` hook is used to fetch movies from the OMDB API based on a given query. */
  useEffect(
    function () {
      callback?.();
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
      fetchMovies();

      return function () {
        controller.abort();
      };
    },
    [query, callback]
  );

  return { movies, isLoading, error };
}
