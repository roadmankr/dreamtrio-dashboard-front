import { analytics } from '@/app/admin/analytics/purchase/_fetchers';
import { performanceAnalyticsStore } from '@/app/admin/analytics/purchase/_store/performance.store';
import { getErrorMessage } from '@/lib/error';
import { showToastError, showToastSuccess } from '@/lib/toast';
import { TAnalyzeSalesGradeReturn } from '@/shared/types/analyze';
import { useMutation } from '@tanstack/react-query';
import { useStore } from 'zustand';

const useVoucherAnalyze = ({ storeName }: { storeName: string }) => {
  const setPerformance = useStore(
    performanceAnalyticsStore,
    (state) => state.setPerformance,
  );

  return useMutation({
    mutationFn: (ids: string[]) => analytics({ slipNoList: ids, storeName }),
    onError: async (error) => {
      const message = await getErrorMessage(error);
      showToastError({
        description: message ?? '전표분석에 실패하였습니다',
        title: '전표분석 실패',
      });
    },
    onSuccess: (data) => {
      const d = {
        profitAnalysis: {
          remainingQty: data.remainingQty,
          remainingCost: data.remainingCost,
          totalSalesProfit: data.totalSalesProfit,
          totalProfitRate: data.totalProfitRate,
          costRecoveryRate: data.costRecoveryRate,
        },
        gradeResult: data.gradeResult,
        salesOverview: {
          inboundQty: data.inboundQty,
          inboundAmount: data.inboundAmount,
          outboundQty: data.outboundQty,
          outboundAmount: data.outboundAmount,
          consumptionRate: data.consumptionRate,
          salesProfit: data.salesProfit,
          profitRate: data.profitRate,
        },
      } satisfies TAnalyzeSalesGradeReturn;

      setPerformance(d);

      showToastSuccess({
        description: '전표분석에 성공하였습니다',
        title: '전표분석 성공',
      });
    },
  });
};

export default useVoucherAnalyze;
