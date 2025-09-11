import { useEffect, useMemo } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { getAvgScoreColor } from '../_lib';
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

  const totalInfo = useMemo(() => {
    return orderAnalytics.reduce(
      (acc, curr) => {
        return {
          totalQty: acc.totalQty + curr.quantity,
          totalPrice: acc.totalPrice + curr.price,
        };
      },
      { totalQty: 0, totalPrice: 0 },
    );
  }, [orderAnalytics]);

  const totalAvgsScore = useMemo(() => {
    const count = orderAnalytics.length;
    const { stockRateScore, saleRateScore, optimalStockScore } =
      orderAnalytics.reduce(
        (acc, curr) => {
          acc.optimalStockScore += curr.optimalStockSignal.score;
          acc.saleRateScore += curr.saleRateSignal.score;
          acc.stockRateScore += curr.stockRateSignal.score;
          return acc;
        },
        { stockRateScore: 0, saleRateScore: 0, optimalStockScore: 0 },
      );
    return {
      stockRateScore: stockRateScore / count,
      saleRateScore: saleRateScore / count,
      optimalStockScore: optimalStockScore / count,
    };
  }, [orderAnalytics]);

  const totalRateStockColorInfo = useMemo(
    () => getAvgScoreColor(totalAvgsScore.stockRateScore),
    [totalAvgsScore.stockRateScore],
  );

  const totalRateSaleColorInfo = useMemo(
    () => getAvgScoreColor(totalAvgsScore.saleRateScore),
    [totalAvgsScore.saleRateScore],
  );

  const totalRateOptimalColorInfo = useMemo(
    () => getAvgScoreColor(totalAvgsScore.optimalStockScore),
    [totalAvgsScore.optimalStockScore],
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
