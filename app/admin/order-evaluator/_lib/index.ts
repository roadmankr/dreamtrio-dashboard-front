import {
  COLOR_SCORE,
  colorConfig,
  TColorScore,
} from '@/entities/commerce-analytics/ui/tokens';
import { TAnalyticsGroup, TAnalyticsProduct } from '../_types';

export const groupByComposite = (
  rows: TAnalyticsProduct[],
): TAnalyticsGroup[] => {
  const m = new Map<string, TAnalyticsGroup>();
  for (const r of rows) {
    const keyObj = {
      productName: r.productName,
      barcode: r.barcode,
    };
    const keyStr = JSON.stringify(keyObj); // 내부용 식별자 (프로퍼티 순서 고정)
    let g = m.get(keyStr);
    if (!g) {
      g = { key: keyObj, items: [] };
      m.set(keyStr, g);
    }
    g.items.push(r);
  }
  return [...m.values()];
};

export const getMostScoreColor = (data: Record<TColorScore, number>) => {
  const entries = Object.entries(data);
  const maxKey = +entries.reduce(
    (acc, curr) => (acc[1] > curr[1] ? acc : curr),
    entries[0],
  )[0] as TColorScore;

  const colorKey = (
    Object.keys(COLOR_SCORE) as (keyof typeof COLOR_SCORE)[]
  ).find((key) => COLOR_SCORE[key] === maxKey);

  if (!colorKey) return null;

  return colorConfig[colorKey];
};

export function getDominantColorInfoFromItems<T>(
  items: T[],
  pickScore: (item: T) => TColorScore,
) {
  if (!items.length) return colorConfig.gray;

  const counts = items.reduce(
    (acc, item) => {
      const s = pickScore(item);
      acc[s] = (acc[s] ?? 0) + 1;
      return acc;
    },
    {} as Record<TColorScore, number>,
  );

  return getMostScoreColor(counts) ?? colorConfig.gray;
}
