/**
 * Get value from local storage
 * @param key - key to get value
 */
export function getLocalStorage(key: string) {
  return JSON.parse(window.localStorage.getItem(key)!);
}

/**
 * Set value in local storage
 * @param key - key to store value
 * @param value - value to store
 */
export function setLocalStorage(key: string, value: number) {
  window.localStorage.setItem(key, JSON.stringify(value));
}
