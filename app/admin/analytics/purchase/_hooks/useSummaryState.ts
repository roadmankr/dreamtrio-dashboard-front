import { analyzeDetailQuery } from '@/app/admin/analytics/purchase/_api/queries';
import { makeRankList } from '@/app/admin/analytics/purchase/_lib/list.lib';
import { analyzeDetailFilterStore } from '@/app/admin/analytics/purchase/_store/analyze-detail.store';
import { useQuery } from '@tanstack/react-query';
import { useStore } from 'zustand';

const useSummaryState = () => {
  const filters = useStore(analyzeDetailFilterStore, (state) => state.filters);
  const q = analyzeDetailQuery(filters);

  const isFilterValid =
    !!filters.storeId && !!filters.range?.from && !!filters.range?.to;

  const result = useQuery({
    ...q,
    enabled: isFilterValid,
    select: (data) => {
      return {
        ...data,
        summary: {
          inboundSum: data.inboundSum,
          anotherSaleRate: data.anotherSaleRate,
          anotherSalesProfit: data.anotherSalesProfit,
          saleRate: data.saleRate,
          salesProfit: data.salesProfit,
          stockSum: data.stockSum,
        },
        ageRanking: makeRankList(data.ageRanking),
        brandRanking: makeRankList(data.brandRanking),
        genderRanking: makeRankList(data.genderRanking),
      };
    },
  });

  return { ...result, isPending: result.isFetching };
};

export default useSummaryState;
