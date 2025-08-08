export function isValidEmail(email) {
  return /\S+@\S+\.\S+/.test(email);
}

export function isNonEmptyString(str) {
  return typeof str === "string" && str.trim().length > 0;
}
