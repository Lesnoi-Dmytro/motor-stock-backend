export function stringToArray(str: string): string[] {
  return str.split(",");
}

export function stringOrUndefinedToArray(str: string | undefined) {
  if (!str) return undefined;
  return stringToArray(str);
}

export function arrayToString(arr: string[]): string {
  return arr.join(",");
}
