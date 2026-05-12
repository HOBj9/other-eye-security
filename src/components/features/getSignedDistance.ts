export function getSignedDistance(index: number, activeIndex: number, total: number): number {
  let diff = index - activeIndex;
  if (total <= 1) return diff;
  const half = total / 2;
  if (diff > half) diff -= total;
  if (diff < -half) diff += total;
  return diff;
}
