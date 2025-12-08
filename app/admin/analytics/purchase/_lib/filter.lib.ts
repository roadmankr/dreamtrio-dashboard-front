import { TPurchaseAnalyticsInputFilter } from '@/app/admin/analytics/purchase/_schema/filter.schema';
import { apis } from '@/shared/api/endpoints';
import { Options } from 'ky';

export const makeAnalyzeDetailFilter = (
  apiMode: 'server' | 'client' = 'server',
  filter: TPurchaseAnalyticsInputFilter,
): [url: string, options: Options] => {
  const [url, init] =
    apiMode === 'server'
      ? apis.analytics.getAnalyzeDetailInServer
      : apis.analytics.getAnalyzeDetailInClient;

  const f = {
    ...(filter.storeId ? { storeId: Number(filter.storeId) } : {}),
    startDate: String(filter.range.from),
    endDate: String(filter.range.to),
  };

  return [url, { ...init, searchParams: f }];
};
