import { useEffect, useMemo } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { getDominantColorInfoFromItems } from '../_lib';
import { orderAnalyticsStore } from '../_store';

const useOrderAnalyticsContorl = () => {
  const { orderAnalytics, resetOrderAnalytics, isPending } =
    orderAnalyticsStore(
      useShallow((state) => ({
        orderAnalytics: state.orderAnalytics,
        resetOrderAnalytics: state.resetOrderAnalytics,
        isPending: state.isUploading,
      })),
    );

  useEffect(() => {
    return () => resetOrderAnalytics();
  }, [resetOrderAnalytics]);

  const totalLength = useMemo(
    () => orderAnalytics.length,
    [orderAnalytics.length],
  );

  const totalInfo = orderAnalytics.reduce(
    (acc, curr) => {
      return {
        totalQty: acc.totalQty + curr.quantity,
        totalPrice: acc.totalPrice + curr.price,
      };
    },
    { totalQty: 0, totalPrice: 0 },
  );

  const totalRateStockColorInfo = getDominantColorInfoFromItems(
    orderAnalytics,
    (o) => o.stockRateSignal.score,
  );
  const totalRateSaleColorInfo = getDominantColorInfoFromItems(
    orderAnalytics,
    (o) => o.saleRateSignal.score,
  );
  const totalRateOptimalColorInfo = getDominantColorInfoFromItems(
    orderAnalytics,
    (o) => o.optimalStockSignal.score,
  );
  return {
    orderAnalytics,
    totalLength,
    isPending,
    totalInfo,
    totalRateStockColorInfo,
    totalRateSaleColorInfo,
    totalRateOptimalColorInfo,
  };
};

export default useOrderAnalyticsContorl;
