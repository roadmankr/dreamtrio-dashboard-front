import { COLOR_SCORE } from '../ui/tokens';

export type TAnalytisSignal = {
  colorInfo: { bg: string; text: string; border: string };
  data: string | number | null;
  score: (typeof COLOR_SCORE)[keyof typeof COLOR_SCORE];
};
