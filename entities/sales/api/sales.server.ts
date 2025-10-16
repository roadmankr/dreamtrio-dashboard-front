'use server';

import { buildQuery } from '@/lib/http';
import { apis } from '@/shared/api/endpoints';
import { requestApiJson } from '@/shared/api/request/request.server';

import { TSalesBreakDownQuery } from '@/shared/types/sales';

export const getSalesBreakDownInServer = async ({
  saleDate,
  storeId,
  dimension,
}: TSalesBreakDownQuery) => {
  const [url, init] = apis.sales.getSalesBreakDown();

  return await requestApiJson(
    ...[`${url}${buildQuery({ saleDate, storeId, dimension })}`, init],
  );
};
