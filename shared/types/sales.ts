import { TStoreDateFilter } from '@/app/admin/dashboard/_schema/dashboard.schema';
import { TBaseSales } from '@/entities/sales/model/types';
import type { Dimension } from '@/shared/model/dimension';

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

export type TSalesBreakDownResponse = TBaseSales & {
  name: string;
  base: number;
  profitPriceForChart: number; // 차트에 그려질 이익가격. 마이너스이면 0처리
};

export type TSalesBreakDownQuery = TStoreDateFilter & { dimension: Dimension };

export type TChartMap = {
  [Chart.BAR]: (data?: TSalesBreakDownResponse[]) => TBarChartData[];
  [Chart.PIE]: (data?: TSalesBreakDownResponse[]) => TPieChartData[];
};
