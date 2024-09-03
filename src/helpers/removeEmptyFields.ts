// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function removeEmptyFields<T extends Record<string, any>>(data: T): T {
  const newObj: Partial<T> = {};
  for (const key in data) {
    if (data[key] !== (undefined || '')) {
      newObj[key] = data[key];
    }
  }

  return newObj as T;
}
