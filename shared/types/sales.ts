import type { Dimension } from '@/shared/model/dimension';
import { TStoreDateFilter } from '@/widgets/store-date-filter/model/schema';

export enum Chart {
  BAR = 'bar',
  PIE = 'pie',
}

export type TBarChartData = {
  name: string;
  uv: number;
  pv: number;
  amt: number;
};

export type TPieChartData = {
  name: string;
  value: number;
};

export type TSalesBreakDownResponse = {
  key: string;
  name: string;
  count: number;
  base: number;
  totalPrice: number;
  profitPrice: number;
  profitRate: number;
  profitPriceForChart: number; // 차트에 그려질 이익가격. 마이너스이면 0처리
};

export type TSalesBreakDownQuery = TStoreDateFilter & { dimension: Dimension };

export type TChartMap = {
  [Chart.BAR]: (data?: TSalesBreakDownResponse[]) => TBarChartData[];
  [Chart.PIE]: (data?: TSalesBreakDownResponse[]) => TPieChartData[];
};
