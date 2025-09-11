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
