export function toFixed(number) {
  return Math.round(number * 100) / 100;
}

export function fixComma(number) {
  return number.replace(/,/g, '.');
}
