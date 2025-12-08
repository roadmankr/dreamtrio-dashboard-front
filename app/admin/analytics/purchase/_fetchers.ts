import { makeAnalyzeDetailFilter } from '@/app/admin/analytics/purchase/_lib/filter.lib';
import { TPurchaseAnalyticsInputFilter } from '@/app/admin/analytics/purchase/_schema/filter.schema';
import { apis } from '@/shared/api/endpoints';
import { requestApiInClient } from '@/shared/api/request/request.client';
import {
  TAnalyzeDetail,
  TAnalyzeSalesGrade,
  TAnalyzeSalesGradeRequest,
} from '@/shared/types/analyze';

export const analytics = async (request: TAnalyzeSalesGradeRequest) => {
  return await requestApiInClient<TAnalyzeSalesGrade>(
    ...apis.analytics.analytics(request),
  );
};

export const getAnalyzeDetail = async (
  filter: TPurchaseAnalyticsInputFilter,
) => {
  const [url, init] = makeAnalyzeDetailFilter('client', filter);

  return await requestApiInClient<TAnalyzeDetail>(url, {
    ...init,
    mode: 'route',
  });
};
