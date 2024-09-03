/* eslint-disable @typescript-eslint/no-explicit-any */
export function replaceEmptyFieldsWithNull<T extends Record<string, any>>(
  data: T,
): T {
  const newObj: Partial<T> = {};
  for (const key in data) {
    if (data[key] === '') {
      newObj[key] = null as any;
    } else if (data[key] !== undefined) {
      newObj[key] = data[key];
    }
  }

  return newObj as T;
}
