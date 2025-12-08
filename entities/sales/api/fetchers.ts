import { salesApis } from '@/entities/sales/api/endpoints';
import { buildQuery } from '@/lib/http';
import { requestApiInClient } from '@/shared/api/request/request.client';

import {
  TSalesBreakDownQuery,
  TSalesBreakDownResponse,
} from '@/shared/types/sales';

export const getSalesBreakDown = async ({
  saleDate,
  storeId,
  dimension,
}: TSalesBreakDownQuery) => {
  const [url, init] = salesApis.breakdownInClient;

  return await requestApiInClient<TSalesBreakDownResponse[]>(
    `${url}${buildQuery({ saleDate, storeId, dimension })}`,
    { ...init, mode: 'route' },
  );
};
