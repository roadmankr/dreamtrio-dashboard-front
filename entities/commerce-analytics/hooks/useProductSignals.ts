import { useMemo } from 'react';
import {
  getOptimalStockColor,
  getSalePriceColor,
  getSaleRateColor,
  getStockRateColor,
} from '../lib/metrics';

const useProductSignals = (p?: {
  quantity?: number;
  optimalStock?: number;
  stockRate?: number;
  saleRate?: number;
}) => {
  return useMemo(() => {
    const stockRateSignal = getStockRateColor(p?.stockRate);
    const saleRateSignal = getSaleRateColor(p?.saleRate);
    const optimalSignal = getOptimalStockColor({
      quantity: p?.quantity,
      optimalStock: p?.optimalStock,
    });
    const priceSignal = getSalePriceColor();
    return {
      stockRateSignal,
      saleRateSignal,
      optimalSignal,
      priceSignal,
    };
  }, [p?.quantity, p?.optimalStock, p?.stockRate, p?.saleRate]);
};

export default useProductSignals;
