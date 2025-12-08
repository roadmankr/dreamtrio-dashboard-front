export const STORE_KEY = 'storeId';
export const BARCODE_KEY = 'barcode';
export const PRODUCT_INPUT_ID = 'product';

export const NOT_PRODUCT_LIST_TEXT = '매장 선택 후 상품을 검색해주세요.';

////// 색상에 관련된 계산식에 해당되는 변수/////
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
///////////////////////////////////////

export const OVER_FACTOR = 2;

/////// action type에 관련된 모델/////////
export const ACTION_KEYS = ['link'] as const;

export type TActionKind = (typeof ACTION_KEYS)[number];

export const ACTION_MAP = {
  LINK: 'link',
} as const satisfies Record<Uppercase<TActionKind>, TActionKind>;

type ActionPayloadMap = {
  [ACTION_MAP.LINK]: { url: string };
};

export type Action = {
  [K in keyof ActionPayloadMap]: { type: K } & ActionPayloadMap[K];
}[keyof ActionPayloadMap];
///////
