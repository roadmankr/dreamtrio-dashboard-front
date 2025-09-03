export const DIMENSION_VALUES = [
  'typeGender',
  'typeAge',
  'typeBrand',
  'typeAnimation',
  'typeProduct',
  'categoryLarge',
  'categoryMedium',
  'categorySmall',
] as const;
export type Dimension = (typeof DIMENSION_VALUES)[number];

export const DIMENSION_KEYS = [
  'GENDER',
  'AGE',
  'BRAND',
  'ANIMATION',
  'PRODUCT',
  'LARGE_CATEGORY',
  'MEDIUM_CATEGORY',
  'SMALL_CATEGORY',
] as const;
export type DimensionKey = (typeof DIMENSION_KEYS)[number];

export const DIMENSION = {
  GENDER: 'typeGender',
  AGE: 'typeAge',
  BRAND: 'typeBrand',
  ANIMATION: 'typeAnimation',
  PRODUCT: 'typeProduct',
  LARGE_CATEGORY: 'categoryLarge',
  MEDIUM_CATEGORY: 'categoryMedium',
  SMALL_CATEGORY: 'categorySmall',
} satisfies Record<DimensionKey, Dimension>;

export const isDimension = (v: string): v is Dimension =>
  (DIMENSION_VALUES as readonly string[]).includes(v);
