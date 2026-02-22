export function percentualVariation(a: number, b: number): number {
  if (!a || !b) {
    return 0;
  }
  const variation = ((a - b) / a) * -100;
  return variation
}