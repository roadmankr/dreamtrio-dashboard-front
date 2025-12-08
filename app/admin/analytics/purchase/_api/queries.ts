import { getAnalyzeDetail } from '@/app/admin/analytics/purchase/_fetchers';
import { TPurchaseAnalyticsInputFilter } from '@/app/admin/analytics/purchase/_schema/filter.schema';
import { TSelectedAnalyticsId } from '@/app/admin/analytics/purchase/_store/analytics.store';
import dayjs from '@/lib/dayjs'; // dayjs 임포트 추가
import { createQueryKeys } from '@lukemorales/query-key-factory';
import { queryOptions } from '@tanstack/react-query';

export const analyticsQueries = createQueryKeys('analytics', {
  getAnalyzeDetail: (filter: TPurchaseAnalyticsInputFilter) =>
    [
      String(filter.storeId), // storeId는 number | undefined 이므로 String()으로 변환
      filter.range.from
        ? dayjs(filter.range.from as string).toISOString()
        : undefined, // dayjs로 변환 후 toISOString
    ] as const,
  getAnalytics: (ids: TSelectedAnalyticsId[]) =>
    [ids.slice().sort().join('|')] as const,
});

export const analyzeDetailQuery = (filters: TPurchaseAnalyticsInputFilter) =>
  queryOptions({
    queryKey: analyticsQueries.getAnalyzeDetail(filters).queryKey,
    queryFn: () => getAnalyzeDetail(filters),
  });
