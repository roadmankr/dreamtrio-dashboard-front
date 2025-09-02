export const STORE_KEY = 'storeId';
export const BARCODE_KEY = 'barcode';
export const PRODUCT_INPUT_ID = 'product';

export const NOT_PRODUCT_LIST_TEXT = '매장 선택 후 상품을 검색해주세요.';

export const COLOR_THRESHOLD = {
  BRAND: {
    GREEN: 0.15,
    YELLOW: 0.5,
  },
  AGE: {
    GREEN: 0.3,
    YELLOW: 0.6,
  },
  OPTIMAL: {
    GREEN: 0.9,
  },
} as const;

export type Category = keyof typeof COLOR_THRESHOLD;

export enum SearchStatus {
  IDLE = 'idle',
  PENDING = 'pending',
  SUCCESS = 'success',
  FAIL = 'FAIL',
}

export const OVER_FACTOR = 2;
