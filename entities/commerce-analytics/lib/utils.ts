import { Category, COLOR_THRESHOLD } from '../model/thresholds';

export function getThreshold<
  C extends Category,
  L extends keyof (typeof COLOR_THRESHOLD)[C],
>(cat: C, level: L) {
  return COLOR_THRESHOLD[cat][level];
}
