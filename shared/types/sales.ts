import { TStoreDateFilter } from '@/widgets/store-date-filter/model/schema';

export enum DIMENSION {
  GENDER = 'typeGender',
  AGE = 'typeAge',
  BRAND = 'typeBrand',
  ANIMATION = 'typeAnimation',
  PRODUCT = 'typeProduct',
  LAGE_CATEGORY = 'categoryLarge',
  MEDIUM_CATEGORY = 'categoryMedium',
  SMALL_CATEGORY = 'categorySmall',
}

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
  totalPrice: number;
  profitPrice: number;
  profitRate: number;
};

export type TSalesBreakDownQuery = TStoreDateFilter & { dimension: DIMENSION };

export type TChartMap = {
  [Chart.BAR]: (data?: TSalesBreakDownResponse[]) => TBarChartData[];
  [Chart.PIE]: (data?: TSalesBreakDownResponse[]) => TPieChartData[];
};
