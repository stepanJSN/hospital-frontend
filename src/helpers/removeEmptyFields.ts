export function removeEmptyFields(data: Record<string, any>): Record<string, any> {
  const newObj: Record<string, any> = {};
  for (const key in data) {
    if (data[key] !== undefined && data[key] !== '') {
      newObj[key] = data[key];
    }
  }

  return newObj;
}