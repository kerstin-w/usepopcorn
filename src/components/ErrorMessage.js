/**
 * The ErrorMessage function is a React component that displays an error message with an icon.
 * @returns The ErrorMessage component is returning a paragraph element with a class name of "error".
 * Inside the paragraph, there is a span element with a "⛔️" emoji and the message prop value.
 */
export function ErrorMessage({ message }) {
  return (
    <p className="error">
      <span>⛔️</span>
      {message}
    </p>
  );
}
