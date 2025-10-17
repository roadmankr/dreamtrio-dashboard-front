import { buildQuery } from '@/lib/http';
import { requestApiForActions } from '@/shared/api/request/request.client';

import {
  TSalesBreakDownQuery,
  TSalesBreakDownResponse,
} from '@/shared/types/sales';

export const getSalesBreakDown = async ({
  saleDate,
  storeId,
  dimension,
}: TSalesBreakDownQuery) => {
  return await requestApiForActions<TSalesBreakDownResponse[]>(
    `/api/sales${buildQuery({ saleDate, storeId, dimension })}`,
    { method: 'get' },
  );
};
