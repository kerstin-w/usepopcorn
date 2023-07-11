import { useEffect, useState } from "react";

/**
 * The `useLocalStorageState` function is a custom hook in JavaScript that allows you to store and
 * retrieve state in the browser's local storage.
 * @param initialState - The `initialState` parameter is the initial value that will be used if there
 * is no stored value in the local storage for the given key. It can be any valid JavaScript value,
 * such as a string, number, boolean, object, or array.
 * @param key - The `key` parameter is a string that represents the key under which the value will be
 * stored in the browser's local storage. It is used to identify the specific value that needs to be
 * retrieved or stored.
 * @returns The `useLocalStorageState` function returns an array with two elements: the current value
 * and a function to update the value.
 */
export function useLocalStorageState(initialState, key) {
  const [value, setValue] = useState(function () {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : initialState;
  });

  /* The `useEffect` hook is used to store the `watched` state variable in the browser's local storage
whenever it changes. */
  useEffect(
    function () {
      localStorage.setItem(key, JSON.stringify(value));
    },
    [value, key]
  );

  return [value, setValue];
}
