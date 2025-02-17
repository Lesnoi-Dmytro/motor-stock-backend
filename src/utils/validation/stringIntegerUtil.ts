export function validateStringInteger(value: string | undefined): boolean {
  return value === undefined || !isNaN(parseInt(value));
}

export function validateStringPositiveInteger(
  value: string | undefined
): boolean {
  return value === undefined || parseInt(value) > 0;
}
