/**
 * Selects random key from given object
 * @param obj Object from which a random key is needed
 */
export function getRandomKey<T extends Record<string, any>>(
  obj: T,
): keyof T | undefined {
// export function getRandomKey(obj: Record<string, any>): string | undefined {
  const keys = Object.keys(obj);
  if (keys.length === 0) return undefined;
  const randomIndex = Math.floor(Math.random() * keys.length);
  return keys[randomIndex];
}

/**
 * Selects random value from given object
 * @param obj Object from which a random value is needed
 */
export function getRandomValue<T extends Record<string, any>>(
  obj: T,
): T[keyof T] | undefined {
// export function getRandomValue(obj: Record<string, any>): string | undefined {
  const keys = Object.keys(obj);
  if (keys.length === 0) return undefined;
  const randomIndex = Math.floor(Math.random() * keys.length);
  const randomKey = keys[randomIndex] as string;
  return obj[randomKey];
}
