export const colorConfig = {
  green: {
    bg: 'bg-green-500',
    text: 'text-green-600',
    border: 'border-green-500',
  },
  yellow: {
    bg: 'bg-yellow-500',
    text: 'text-yellow-600',
    border: 'border-yellow-500',
  },
  red: { bg: 'bg-red-500', text: 'text-red-600', border: 'border-red-500' },
  gray: { bg: 'bg-gray-300', text: 'text-gray-600', border: 'border-gray-300' }, // 검색 전
} as const;

export const COLOR_SCORE = {
  green: 3,
  yellow: 2,
  red: 1,
  gray: 0,
} as const satisfies Record<keyof typeof colorConfig, number>;

export type TColorScore = (typeof COLOR_SCORE)[keyof typeof COLOR_SCORE];
