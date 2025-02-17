export function startsWith(value: string) {
  return new RegExp(`^${value}`, "i");
}
