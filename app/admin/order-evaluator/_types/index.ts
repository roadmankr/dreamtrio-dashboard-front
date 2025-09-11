import { TAnalytisSignal } from '@/entities/commerce-analytics/model/type';
import { TProduct } from '@/entities/product/model/type';

export type TAnalyticsProduct = TProduct & {
  stockRateSignal: TAnalytisSignal;
  saleRateSignal: TAnalytisSignal;
  optimalStockSignal: TAnalytisSignal;
};

export type TAnalyticsGroup = {
  key: { productName: string; barcode: string };
  items: TAnalyticsProduct[];
};
