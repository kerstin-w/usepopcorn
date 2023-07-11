import { useEffect } from "react";

/**
 * The `useKey` function is a custom hook in JavaScript that listens for a specific key press and
 * triggers a callback function when that key is pressed.
 * @param key - The `key` parameter is a string that represents the keyboard key that you want to
 * listen for. It can be any valid key code or key name. For example, "Enter", "Escape", "ArrowUp",
 * "a", "1", etc.
 * @param action - The `action` parameter is a function that will be called when the specified key is
 * pressed.
 * @returns The `useKey` function returns a cleanup function that removes the event listener for the
 * "keydown" event.
 */
export function useKey(key, action) {
  useEffect(
    function () {
      function callback(e) {
        if (e.code.toLowerCase() === key.toLowerCase()) {
          action();
        }
      }

      document.addEventListener("keydown", callback);

      return function () {
        document.removeEventListener("keydown", callback);
      };
    },
    [key, action]
  );
}
