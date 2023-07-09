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
