'use server';

import { getErrorMessage } from '@/lib/error';
import { apis } from '@/shared/api/endpoints';
import { serverKy } from '@/shared/api/ky/ky.server';
import {
  TSalesBreakDownQuery,
  TSalesBreakDownResponse,
} from '@/shared/types/sales';

export const getSalesBreakDown = async ({
  saleDate,
  storeName,
  dimension,
}: TSalesBreakDownQuery) => {
  try {
    const result = (
      await serverKy(
        ...apis.sales.getSalesBreakDown({
          saleDate,
          storeName,
          dimension,
        }),
      ).json
    )<TSalesBreakDownResponse[]>();
    return result;
  } catch (err: unknown) {
    throw new Error(await getErrorMessage(err));
  }
};
