export function splice(array, start, deleteCount, item) {
  return [...array.slice(0, start), item, ...array.slice(start + deleteCount)];
}
