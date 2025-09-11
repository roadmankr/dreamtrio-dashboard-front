import { TAnalytisSignal } from '@/entities/commerce-analytics/model/type';
import { TProduct } from '@/entities/product/model/type';

export type TOrderAnalyze = {
  storeId: number;
  saleDate: string;
  productInfo: TProduct[];
  stockRateSignal: TAnalytisSignal;
  saleRateSignal: TAnalytisSignal;
  optimalStockSignal: TAnalytisSignal;
};
