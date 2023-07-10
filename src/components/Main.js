import { useState } from "react";

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
